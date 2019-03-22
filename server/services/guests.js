import config from "../config";
import { google } from "googleapis";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

export async function saveGuests(request) {
  try {
    const { guests } = request;
    const errors = [];
    const rows = guests
      .filter(guest => {
        if (typeof guest.isAttending != "boolean") {
          errors.push({ message: "Invalid Model: bad isAttending", guest });
          return false;
        }
        if (
          typeof guest.firstName != "string" ||
          typeof guest.lastName != "string"
        ) {
          errors.push({ message: "Invalid Model: bad name", guest });
          return false;
        }
        if (guest.comments !== null && typeof guest.comments != "string") {
          errors.push({ message: "Invalid Model: bad comments", guest });
          return false;
        }
        return true;
      })
      .map(guest => {
        return {
          values: [
            {
              userEnteredValue: {
                stringValue: guest.id
              }
            },
            {
              userEnteredValue: {
                numberValue: getSerialDate()
              },
              userEnteredFormat: {
                numberFormat: {
                  type: "DATE",
                  pattern: "yyyy-mm-ddThh:mm:ss"
                }
              }
            },
            {
              userEnteredValue: {
                stringValue: `${guest.firstName} ${guest.lastName}`
              }
            },
            {
              userEnteredValue: {
                stringValue: guest.isAttending ? "Attending" : "Not Attending"
              }
            },
            {
              userEnteredValue: {
                stringValue: guest.isAttending ? guest.comments : null
              }
            }
          ]
        };
      });
    const requests = [
      {
        appendCells: {
          sheetId: config.guestSheetId,
          fields: "*",
          rows
        }
      }
    ];

    return await new Promise((resolve, reject) => {
      const sheets = google.sheets("v4");
      withAuth((authErr, authClient) => {
        if (authErr) reject(authErr);
        const request = {
          spreadsheetId: config.guestSpreadsheetId,
          resource: {
            //responseIncludeGridData: true,
            includeSpreadsheetInResponse: true,
            requests
          },
          auth: authClient
        };
        sheets.spreadsheets.batchUpdate(request, (updateErr, response) => {
          if (updateErr) {
            reject(updateErr);
          }
          resolve({ context: guests, errors });
        });
      });
    });
  } catch (e) {
    console.error("guest error:  ", e);
    return { success: false, error: e };
  }
}

function getSerialDate() {
  var oneDay = 24 * 60 * 60 * 1000;
  var firstDate = new Date("1899-12-30T08:00:00Z");
  var secondDate = new Date();
  return Math.abs((firstDate.getTime() - secondDate.getTime()) / oneDay);
}

function withAuth(callback) {
  const client_email = config.googleApiEmail;
  const private_key = config.googleApiKey;
  const jwtClient = new google.auth.JWT(
    client_email,
    null,
    private_key,
    SCOPES
  );

  jwtClient.authorize((err, tokens) => {
    if (err) {
      callback(err);
    } else {
      callback(null, jwtClient);
    }
  });
}
