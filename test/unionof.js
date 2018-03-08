// @flow
import test from 'ava-spec'
import typer from '../src'

const { unionOf } = typer

test.group('primitive types', test => {
  const validator = unionOf((v, t) =>
    t.literalOf('foo')(v) || t.literalOf(12345)(v)
  )

  test('should validate an union', t => {
    t.is(validator('foo'), 'foo')
    t.is(validator(12345), 12345)
  })
})
