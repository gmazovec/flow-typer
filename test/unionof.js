// @flow
import test from 'ava-spec'
import typer from '../src'

const { unionOf, literalOf } = typer

test.group('primitive types', test => {
  const validator = unionOf(literalOf('foo'), literalOf(12345))

  test('should validate an union', t => {
    t.is(validator('foo'), 'foo')
    t.is(validator(12345), 12345)
  })
})
