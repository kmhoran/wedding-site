const exec = require("child_process").exec;
const fs = require("fs");
const path = require("path");
const rimraf = require("rimraf");

// const steps = [buildCRA, prepareDistDirectory];
// let err;

  prepareDistDirectory().then(() => executeScripts()).catch(e => {console.log(e)});

function prepareDistDirectory() {
  return new Promise((resolve, reject) => {
    try {
      const dist = path.join(__dirname, "dist");
      const ui = path.join(dist, "ui");

      if (fs.existsSync(dist)) {
        console.log("### dist exists, let's delete ###");
        rimraf.sync(dist);
      }
      fs.mkdirSync(dist);
      fs.mkdirSync(ui);
      resolve();
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
}


function executeScripts(){
    return new Promise((resolve, reject) => {
        exec("yarn react-build && cp -rT ./build/ ./dist/ui && babel ./server -d ./dist", function(err, stdout, stderr) {
          if (err) {
            console.log(stderr);
            reject(err);
          } else {
            console.log(stdout);
            resolve();
          }
        });
      });
}

//buildCRA(prepareDistDirectory);

// "yarn react-build && mkdir dist && cp -rT ./build/ ./dist/ui && babel ./server -d ./dist",
