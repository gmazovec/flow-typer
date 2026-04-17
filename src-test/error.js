// @flow
import { assert, test } from "./index.js";
import * as typer from "../src/index.js";

const { boolean, validatorError } = typer;

test("TypeValidatorError", async (t) => {
  const error = validatorError(boolean, true, "", "", "personT", "boolean")

  await t.test("should return empty message", () => {
    assert.equal(error.message.split("\n")[0], "");
  });

  await t.test("should return source file", () => {
    try {
      throw error;
    } catch (err) {
      err.stack = "";
      const sourceFile = err.getSourceFile();
      assert.equal(sourceFile.split("/").slice(-1)[0], "");
    }
  });
});
