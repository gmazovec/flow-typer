// @flow
import test from 'ava-spec'
import typer from '../src'

const { maybe, nil, undef, boolean, number, string, arrayOf } = typer

test.group('null type', test => {
  const validator = (v) => maybe(nil)(v)

  test('should validate values', t => {
    const valueA = validator(undefined)
    const valueB = validator(null)
    t.is(valueA, undefined)
    t.is(valueB, null)
  })

  test('should throw an error', t => {
    t.throws(() => { validator(true) }, TypeError)
    t.throws(() => { validator(12345) }, TypeError)
    t.throws(() => { validator('foo') }, TypeError)
    t.throws(() => { validator({}) }, TypeError)
    t.throws(() => { validator([]) }, TypeError)
  })
})

test.group('undefined type', test => {
  const validator = (v) => maybe(undef)(v)

  test('should validate values', t => {
    const valueA = validator(undefined)
    const valueB = validator(null)
    t.is(valueA, undefined)
    t.is(valueB, null)
  })

  test('should throw an error', t => {
    t.throws(() => { validator(true) }, TypeError)
    t.throws(() => { validator(12345) }, TypeError)
    t.throws(() => { validator('foo') }, TypeError)
    t.throws(() => { validator({}) }, TypeError)
    t.throws(() => { validator([]) }, TypeError)
  })
})

test.group('boolean type', test => {
  const validator = (v) => maybe(boolean)(v)

  test('should validate values', t => {
    const valueA = validator(undefined)
    const valueB = validator(null)
    const valueC =  validator(true)
    t.is(valueA, undefined)
    t.is(valueB, null)
    t.is(valueC, true)
  })

  test('should throw an error', t => {
    t.throws(() => { validator(12345) }, TypeError)
    t.throws(() => { validator('foo') }, TypeError)
    t.throws(() => { validator({}) }, TypeError)
    t.throws(() => { validator([]) }, TypeError)
  })
})

test.group('number type', test => {
  const validator = (v) => maybe(number)(v)

  test('should validate values', t => {
    const valueA = validator(undefined)
    const valueB = validator(null)
    const valueC = validator(12345)
    t.is(valueA, undefined)
    t.is(valueB, null)
    t.is(valueC, 12345)
  })

  test('should throw an error', t => {
    t.throws(() => { validator(true) }, TypeError)
    t.throws(() => { validator('foo') }, TypeError)
    t.throws(() => { validator({}) }, TypeError)
    t.throws(() => { validator([]) }, TypeError)
  })
})

test.group('string type', test => {
  const validator = (v) => maybe(string)(v)

  test('should validate values', t => {
    const valueA = validator(undefined)
    const valueB = validator(null)
    const valueC = validator('foo')
    t.is(valueA, undefined)
    t.is(valueB, null)
    t.is(valueC, 'foo')
  })

  test('should throw an error', t => {
    t.throws(() => { validator(true) }, TypeError)
    t.throws(() => { validator(12345) }, TypeError)
    t.throws(() => { validator({}) }, TypeError)
    t.throws(() => { validator([]) }, TypeError)
  })
})

test.group('array type', test => {
  const validator = (v) => maybe(arrayOf(string))(v)

  test('should validate values', t => {
    const valueA = validator(undefined)
    const valueB = validator(null)
    const valueC = validator(['foo', 'bar'])
    t.is(valueA, undefined)
    t.is(valueB, null)
    t.deepEqual(valueC, ['foo', 'bar'])
  })

  test('should throw an error', t => {
    t.throws(() => { validator(true) }, TypeError)
    t.throws(() => { validator(12345) }, TypeError)
    t.throws(() => { validator('foo') }, TypeError)
    t.throws(() => { validator({}) }, TypeError)
    t.throws(() => { validator([12345]) }, TypeError)
  })
})
