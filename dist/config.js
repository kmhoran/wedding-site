"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var config = {
  googleApiEmail: process.env.GOOGLE_API_EMAIL,
  googleApiKey: process.env.GOOGLE_API_KEY,
  guestSheetId: process.env.GOOGLE_SHEET_PAGE_ID,
  guestSpreadsheetId: process.env.GOOGLE_SHEET_PROJECT_ID,
  port: process.env.PORT || 3000
};
var _default = config;
exports.default = _default;