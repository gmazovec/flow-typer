// @flow
import test from 'ava-spec'
import typer from '../src'

const { nil, undef, boolean, number, string, literalOf } = typer

test.group('nil type', test => {
  const validator = nil

  test('should return an nil value', t => {
    t.is(validator(null), null)
  })

  test('should throw an error', t => {
    t.throws(() => { validator(undefined) }, TypeError)
    t.throws(() => { validator(true) }, TypeError)
    t.throws(() => { validator(12345) }, TypeError)
    t.throws(() => { validator('foo') }, TypeError)
    t.throws(() => { validator({}) }, TypeError)
    t.throws(() => { validator([]) }, TypeError)
  })
})

test.group('void type', test => {
  const validator = undef

  test('should return an undefined value', t => {
    t.is(validator(undefined), undefined)
  })

  test('should throw an error', t => {
    t.throws(() => { validator(null) }, TypeError)
    t.throws(() => { validator(true) }, TypeError)
    t.throws(() => { validator(12345) }, TypeError)
    t.throws(() => { validator('foo') }, TypeError)
    t.throws(() => { validator({}) }, TypeError)
    t.throws(() => { validator([]) }, TypeError)
  })
})

test.group('boolean type', test => {
  const validator = boolean

  test('should return a boolean value', t => {
    t.is(validator(true), true)
    t.is(validator(false), false)
  })

  test('should throw an error', t => {
    t.throws(() => { validator(null) }, TypeError)
    t.throws(() => { validator(undefined) }, TypeError)
    t.throws(() => { validator(12345) }, TypeError)
    t.throws(() => { validator('foo') }, TypeError)
    t.throws(() => { validator({}) }, TypeError)
    t.throws(() => { validator([]) }, TypeError)
  })
})

test.group('number type', test => {
  const validator = number

  test('should return a number value', t => {
    t.is(validator(12345), 12345)
    t.is(validator(123.45), 123.45)
  })

  test('should throw an error', t => {
    t.throws(() => { validator(null) }, TypeError)
    t.throws(() => { validator(undefined) }, TypeError)
    t.throws(() => { validator(true) }, TypeError)
    t.throws(() => { validator('foo') }, TypeError)
    t.throws(() => { validator({}) }, TypeError)
    t.throws(() => { validator([]) }, TypeError)
  })
})

test.group('string type', test => {
  const validator = string

  test('should returna a string value', t => {
    t.is(validator('foo'), 'foo')
  })

  test('should throw an error', t => {
    t.throws(() => { validator(null) }, TypeError)
    t.throws(() => { validator(undefined) }, TypeError)
    t.throws(() => { validator(false) }, TypeError)
    t.throws(() => { validator(12345) }, TypeError)
    t.throws(() => { validator({}) }, TypeError)
    t.throws(() => { validator([]) }, TypeError)
  })
})

test.group('literal null type', test => {
  const validator = literalOf(null)

  test(`should return a 'null' literal`, t => {
    t.is(validator(null), null)
  })

  test('should throw an error', t => {
    t.throws(() => { validator(undefined) }, TypeError)
    t.throws(() => { validator(false) }, TypeError)
    t.throws(() => { validator(12345) }, TypeError)
    t.throws(() => { validator('foo') }, TypeError)
    t.throws(() => { validator({}) }, TypeError)
    t.throws(() => { validator([]) }, TypeError)
  })
})

test.group('literal undefined type', test => {
  const validator = literalOf(undefined)

  test(`should return a 'undefined' literal`, t => {
    t.is(validator(undefined), undefined)
  })

  test('should throw an error', t => {
    t.throws(() => { validator(null) }, TypeError)
    t.throws(() => { validator(false) }, TypeError)
    t.throws(() => { validator(12345) }, TypeError)
    t.throws(() => { validator('foo') }, TypeError)
    t.throws(() => { validator({}) }, TypeError)
    t.throws(() => { validator([]) }, TypeError)
  })
})

test.group('literal boolean type', test => {
  const validator = literalOf(true)

  test(`should return a 'true' literal`, t => {
    t.is(validator(true), true)
  })

  test('should throw an error', t => {
    t.throws(() => { validator(null) }, TypeError)
    t.throws(() => { validator(undefined) }, TypeError)
    t.throws(() => { validator(false) }, TypeError)
    t.throws(() => { validator(12345) }, TypeError)
    t.throws(() => { validator('foo') }, TypeError)
    t.throws(() => { validator({}) }, TypeError)
    t.throws(() => { validator([]) }, TypeError)
  })
})

test.group('literal number type', test => {
  const validator = literalOf(12345)

  test('should return a number literal', t => {
    t.is(validator(12345), 12345)
  })

  test('should throw an error', t => {
    t.throws(() => { validator(null) }, TypeError)
    t.throws(() => { validator(undefined) }, TypeError)
    t.throws(() => { validator(false) }, TypeError)
    t.throws(() => { validator(123.45) }, TypeError)
    t.throws(() => { validator('foo') }, TypeError)
    t.throws(() => { validator({}) }, TypeError)
    t.throws(() => { validator([]) }, TypeError)
  })
})

test.group('literal string type', test => {
  const validator = literalOf(('foo' /*: 'foo' */))

  test('should return a string literal', t => {
    t.is(validator('foo'), 'foo')
  })

  test('should throw an error', t => {
    t.throws(() => { validator(null) }, TypeError)
    t.throws(() => { validator(undefined) }, TypeError)
    t.throws(() => { validator(false) }, TypeError)
    t.throws(() => { validator(12345) }, TypeError)
    t.throws(() => { validator('fooo') }, TypeError)
    t.throws(() => { validator({}) }, TypeError)
    t.throws(() => { validator([]) }, TypeError)
  })
})
