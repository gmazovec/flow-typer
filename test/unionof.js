// @flow
import test from 'ava-spec'
import typer from '../src'

const { unionOf2, literalOf } = typer

test.group('primitive types', test => {
  const validator = unionOf2(
    literalOf(('foo' /*: 'foo' */)),
    literalOf((12345 /*: 12345 */))
  )

  test('should validate an union', t => {
    t.is(validator('foo'), 'foo')
    t.is(validator(12345), 12345)
  })
})
