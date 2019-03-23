const exec = require("child_process").exec;
const fs = require("fs");
const path = require("path");
const rimraf = require("rimraf");

prepareDistDirectory()
  .then(() => executeScripts())
  .catch(e => {
    console.error(e);
  });

function prepareDistDirectory() {
  return new Promise((resolve, reject) => {
    try {
      const dist = path.join(__dirname, "dist");
      const ui = path.join(dist, "ui");

      if (fs.existsSync(dist)) {
        console.info("### replace existing dist/ ###");
        rimraf.sync(dist);
      }
      fs.mkdirSync(dist);
      fs.mkdirSync(ui);
      resolve();
    } catch (err) {
      console.error(err);
      reject(err);
    }
  });
}

function executeScripts() {
  return new Promise((resolve, reject) => {
    exec(
      "yarn react-build && cp -rT ./build/ ./dist/ui && cp ./dist/ui/favicon.ico ./dist/ui/static/favicon.ico && babel ./server -d ./dist",
      function(err, stdout, stderr) {
        if (err) {
          console.error(stderr);
          reject(err);
        } else {
          console.info(stdout);
          resolve();
        }
      }
    );
  });
}

//buildCRA(prepareDistDirectory);

// "yarn react-build && mkdir dist && cp -rT ./build/ ./dist/ui && babel ./server -d ./dist",
