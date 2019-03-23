"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveGuests = saveGuests;

var _config = _interopRequireDefault(require("../config"));

var _googleapis = require("googleapis");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

function saveGuests(_x) {
  return _saveGuests.apply(this, arguments);
}

function _saveGuests() {
  _saveGuests = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(request) {
    var guests, errors, rows, requests;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            guests = request.guests;
            errors = [];
            rows = guests.filter(function (guest) {
              if (typeof guest.isAttending != "boolean") {
                errors.push({
                  message: "Invalid Model: bad isAttending",
                  guest: guest
                });
                return false;
              }

              if (typeof guest.firstName != "string" || typeof guest.lastName != "string") {
                errors.push({
                  message: "Invalid Model: bad name",
                  guest: guest
                });
                return false;
              }

              if (guest.comments !== null && typeof guest.comments != "string") {
                errors.push({
                  message: "Invalid Model: bad comments",
                  guest: guest
                });
                return false;
              }

              return true;
            }).map(function (guest) {
              return {
                values: [{
                  userEnteredValue: {
                    stringValue: guest.id
                  }
                }, {
                  userEnteredValue: {
                    numberValue: getSerialDate()
                  },
                  userEnteredFormat: {
                    numberFormat: {
                      type: "DATE",
                      pattern: "yyyy-mm-ddThh:mm:ss"
                    }
                  }
                }, {
                  userEnteredValue: {
                    stringValue: "".concat(guest.firstName, " ").concat(guest.lastName)
                  }
                }, {
                  userEnteredValue: {
                    stringValue: guest.isAttending ? "Attending" : "Not Attending"
                  }
                }, {
                  userEnteredValue: {
                    stringValue: guest.isAttending ? guest.comments : null
                  }
                }]
              };
            });
            requests = [{
              appendCells: {
                sheetId: _config.default.guestSheetId,
                fields: "*",
                rows: rows
              }
            }];
            _context.next = 7;
            return new Promise(function (resolve, reject) {
              var sheets = _googleapis.google.sheets("v4");

              withAuth(function (authErr, authClient) {
                if (authErr) reject(authErr);
                var request = {
                  spreadsheetId: _config.default.guestSpreadsheetId,
                  resource: {
                    //responseIncludeGridData: true,
                    includeSpreadsheetInResponse: true,
                    requests: requests
                  },
                  auth: authClient
                };
                sheets.spreadsheets.batchUpdate(request, function (updateErr, response) {
                  if (updateErr) {
                    reject(updateErr);
                  }

                  resolve({
                    context: guests,
                    errors: errors
                  });
                });
              });
            });

          case 7:
            return _context.abrupt("return", _context.sent);

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](0);
            console.error("guest error:  ", _context.t0);
            return _context.abrupt("return", {
              success: false,
              error: _context.t0
            });

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 10]]);
  }));
  return _saveGuests.apply(this, arguments);
}

function getSerialDate() {
  var oneDay = 24 * 60 * 60 * 1000;
  var firstDate = new Date("1899-12-30T08:00:00Z");
  var secondDate = new Date();
  return Math.abs((firstDate.getTime() - secondDate.getTime()) / oneDay);
}

function withAuth(callback) {
  var client_email = _config.default.googleApiEmail;
  var private_key = _config.default.googleApiKey;
  var jwtClient = new _googleapis.google.auth.JWT(client_email, null, private_key, SCOPES);
  jwtClient.authorize(function (err, tokens) {
    if (err) {
      callback(err);
    } else {
      callback(null, jwtClient);
    }
  });
}