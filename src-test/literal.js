// @flow

import { assert, test } from "./index.js";
import * as typer from "../src/index.js";

const { literal } =  typer;

test("literal type - primitive type", async (t) => {
  const name = literal("ada");

  await t.test("should return a string literal value", () => {
    assert.equal(name("ada"), "ada");
  });
  await t.test("should return 'undefined' literal type value", () => {
    assert.equal(literal(undefined).type(), "void");
  });
});

