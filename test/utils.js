// @flow
import test from 'ava-spec'
import typer from '../src'

/*:: import type { $Literal } from '../src' */

const {
  objectOf,
  string,
  boolean,
  isType,
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
  })
})
