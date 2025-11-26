// @flow
import { assert, test } from './index.js'
import * as typer from '../src/index.js'

import type { $Literal } from '../src'

const {
  objectOf,
  tupleOf,
  arrayOf,
  mapOf,
  number,
  string,
  boolean,
  mixed,
  maybe,
  optional,
  isType,
  getType,
  type,
} = typer

test('isType', async (t) => {
  const schema = objectOf({
    type: string,
    name: string,
    disabled: boolean
  })

  await t.test('should check for type', t => {
    const input = {
      type: 'text',
      name: 'username',
      disabled: false
    }
    const hasTypeOfSchema = isType(schema)

    assert.ok(hasTypeOfSchema(input))
    assert.ok(!hasTypeOfSchema(undefined))
    assert.ok(!hasTypeOfSchema(null))
    assert.ok(!hasTypeOfSchema(false))
    assert.ok(!hasTypeOfSchema(12345))
    assert.ok(!hasTypeOfSchema('foo'))
    assert.ok(!hasTypeOfSchema({}))
    assert.ok(!hasTypeOfSchema([]))
    assert.ok(!hasTypeOfSchema([], 'personT'))
  })
})

test("getType", async (t) => {
  await t.test('should return type', t => {
    assert.deepEqual(getType(number), "number");
    assert.deepEqual(getType(string), "string");
    assert.deepEqual(getType(boolean), "boolean");
    assert.equal(getType(mixed), "mixed");
    assert.deepEqual(getType(maybe(number)), "?(number)");
    assert.deepEqual(getType(tupleOf(number, number)), "[number, number]");
    assert.deepEqual(getType(arrayOf(string, "Id")), "Array<string>");
    assert.deepEqual(getType(objectOf({ name: string, age: number, active: optional(boolean) }, "personT")), "{\n name: string,\n  age: number,\n  active?: boolean \n}");
    assert.deepEqual(getType(mapOf(string, boolean)), "{ [_:string]: boolean }");
  });

  await t.test('should return type for user-defined validator', t => {
    function validator () {}
    validator.type = () => "personT";
    assert.deepEqual(getType(validator), "personT");
  });
})

test("type", async (t) => {
  class Time {}

  await t.test('should return validator', t => {
    const validator = type((v: mixed) => {
      if (v instanceof Time) return v;
       throw new TypeError();
    })
    const v = new Time();

    assert.equal(validator(v), v)
    assert.throws(() => validator(0))
  })
})
