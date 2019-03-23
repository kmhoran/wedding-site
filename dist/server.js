"use strict";

require("babel-polyfill");

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _path = _interopRequireDefault(require("path"));

var _cluster = _interopRequireDefault(require("cluster"));

var _os = _interopRequireDefault(require("os"));

var _routes = _interopRequireDefault(require("./routes"));

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var numCPUs = _os.default.cpus().length;

var PORT = _config.default.port; // Multi-process to utilize all CPU cores.

if (_cluster.default.isMaster) {
  console.error("Node cluster master ".concat(process.pid, " is running")); // Fork workers.

  for (var i = 0; i < numCPUs; i++) {
    _cluster.default.fork();
  }

  _cluster.default.on("exit", function (worker, code, signal) {
    console.error("Node cluster worker ".concat(worker.process.pid, " exited: code ").concat(code, ", signal ").concat(signal));
  });
} else {
  // serever
  var app = (0, _express.default)();
  app.use(_bodyParser.default.urlencoded({
    extended: true
  }));
  app.use(_bodyParser.default.json());
  app.use("/api/v1/", _routes.default); // remaining requests are sent to the react app

  app.use("/static", _express.default.static(_path.default.join(__dirname, "ui", "static")));
  app.get("*", function (request, response) {
    response.sendFile(_path.default.resolve(__dirname, "ui", "index.html"));
  });
  app.listen(PORT, function () {
    console.error("Node cluster worker ".concat(process.pid, ": listening on port ").concat(PORT));
  });
}