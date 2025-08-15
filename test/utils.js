// @flow
import test from 'ava-spec'
import typer from '../src'

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
} = typer

test.group('isType', test => {
  const schema = objectOf({
    type: string,
    name: string,
    disabled: boolean
  })

  test('should check for type', t => {
    const input = {
      type: 'text',
      name: 'username',
      disabled: false
    }
    const hasTypeOfSchema = isType(schema)

    t.true(hasTypeOfSchema(input))
    t.false(hasTypeOfSchema(undefined))
    t.false(hasTypeOfSchema(null))
    t.false(hasTypeOfSchema(false))
    t.false(hasTypeOfSchema(12345))
    t.false(hasTypeOfSchema('foo'))
    t.false(hasTypeOfSchema({}))
    t.false(hasTypeOfSchema([]))
    t.false(hasTypeOfSchema([], 'personT'))
  })
})

test.group("getType", test => {
  test('should return type', t => {
    t.deepEqual(getType(number), "number");
    t.deepEqual(getType(string), "string");
    t.deepEqual(getType(boolean), "boolean");
    t.is(getType(mixed), "mixed");
    t.deepEqual(getType(maybe(number)), "?number");
    t.deepEqual(getType(tupleOf(number, number)), "[number, number]");
    t.deepEqual(getType(arrayOf(string, "Id")), "Array<string>");
    t.deepEqual(getType(objectOf({ name: string, age: number, active: optional(boolean) }, "personT")), "{|\n name: string,\n  age: number,\n  active?: boolean \n|}");
    t.deepEqual(getType(mapOf(string, boolean)), "{ [_:string]: boolean }");
  });

  test('should return type for user-defined validator', t => {
    function validator () {}
    validator.type = () => "personT";
    t.deepEqual(getType(validator), "personT");
  });
})

