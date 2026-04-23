// @flow

// $FlowExpectedError[cannot-resolve-module]
import test from "node:test";

import { buildDist, build, buildLog } from "./build.js";

const env = global.process.env;
const skip = env.hasOwnProperty("NODE_TEST_CONTEXT")
  ? !Boolean(env.NODE_TEST_CONTEXT)
  : false;

test("build test files", { skip }, () => {
  buildDist();
  build("src-test", "dist-test", false, "", ["../src", "../dist"]);
  buildLog("---------------------------------------------------")
  buildLog("-- test files built. run 'node --test dist-test' --");
  buildLog("---------------------------------------------------\n")
})
