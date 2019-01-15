const exec = require("child_process").exec;
const fs = require("fs");
const path = require("path");
const rimraf = require("rimraf");

// const steps = [buildCRA, prepareDistDirectory];
// let err;

  prepareDistDirectory().then(() => executeScripts());


function buildCRA() {
  return new Promise((resolve, reject) => {
    exec("yarn react-build", function(err, stdout, stderr) {
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

function copyUiElements() {
  return new Promise((resolve, reject) => {
    exec("cp -rT ./build/ ./dist/ui", function(err, stdout, stderr) {
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
