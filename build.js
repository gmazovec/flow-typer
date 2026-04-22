// @flow

// $FlowExpectedError[cannot-resolve-module]
import fs from "fs";

// $FlowExpectedError[cannot-resolve-module]
import flowRemoveTypes from "flow-remove-types";

export function build (src /*: string */, dest /*: string */, copySrcFile /*: boolean */ = false, srcFileExt /*: string */ = "", replaceArgs /*: [string, string] */ = ["", ""]) {
  buildLog("build: building " + src + " -> " + dest);
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest);
  }
  fs.readdirSync(src)
    .filter((name) => name.endsWith(".js"))
    .filter((name) => !fs.existsSync(dest + "/" + name) || fs.statSync(src + "/" + name).mtime > fs.statSync(dest + "/" + name).mtime).forEach((name) => {
      if (copySrcFile) {
        fs.copyFileSync(src + "/" + name, dest + "/" + name + srcFileExt);
        buildLog("build: @copy:", src + "/" + name, "->", dest + "/" + name + srcFileExt);
      }
      fs.writeFileSync(dest + "/" + name,
      flowRemoveTypes(fs.readFileSync(src + "/" + name).toString()).toString().replaceAll(...replaceArgs));
      buildLog("build: @copy:", src + "/" + name, "->", dest + "/" + name);
    });
}

export function buildDist () {
  ["/", "/types"].forEach((sub) => build("src" + sub, "dist" + sub, true, ".flow"));
}

let logI = 0;
export function buildLog (...m /*: Array<mixed> */) {
  console.log(...m);
  if (logI === 0) {
    logI += 1;
    fs.writeFileSync("./build.log", "");
  }
  fs.appendFileSync("./build.log", m.join(" ") + "\n");
}

global.buildDist = buildDist;

