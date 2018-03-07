// @flow
import test from 'ava-spec'
import typer from '../src'

const { arrayOf, nil, undef, boolean, number, string } = typer

test.group('null type', test => {
  const validator = (v) => arrayOf(nil)(v)

  test('should validate array of nulls', t => {
    const input = [null, null, null]
    const valueA = validator([])
    const valueB = validator(input)
    t.is(valueA.length, 0)
    t.is(valueB.length, 3)
    t.deepEqual(valueB, input)
  })

  test('should throw an error', t => {
    t.throws(() => { validator(null) }, TypeError)
    t.throws(() => { validator(undefined) }, TypeError)
    t.throws(() => { validator(false) }, TypeError)
    t.throws(() => { validator(12345) }, TypeError)
    t.throws(() => { validator('foo') }, TypeError)
    t.throws(() => { validator({}) }, TypeError)

    t.throws(() => { validator([undefined]) }, TypeError)
    t.throws(() => { validator([true]) }, TypeError)
    t.throws(() => { validator([12345]) }, TypeError)
    t.throws(() => { validator(['foo']) }, TypeError)
    t.throws(() => { validator([{}]) }, TypeError)
    t.throws(() => { validator([[]]) }, TypeError)
  })
})

test.group('void type - unit array', test => {
  const schema = ({ arrayOf, undef }) => (v) => arrayOf(undef)(v)
  const validator = schema(typer)

  test('should validate array of undefined values', t => {
    const input = [undefined, undefined]
    const valueA = validator([])
    const valueB = validator(input)
    t.is(valueA.length, 0)
    t.is(valueB.length, 2)
    t.deepEqual(valueB, input)
  })

  test('should throw an error', t => {
    t.throws(() => { validator(null) }, TypeError)
    t.throws(() => { validator(undefined) }, TypeError)
    t.throws(() => { validator(false) }, TypeError)
    t.throws(() => { validator(12345) }, TypeError)
    t.throws(() => { validator('foo') }, TypeError)
    t.throws(() => { validator({}) }, TypeError)

    t.throws(() => { validator([null]) }, TypeError)
    t.throws(() => { validator([true]) }, TypeError)
    t.throws(() => { validator([12345]) }, TypeError)
    t.throws(() => { validator(['foo']) }, TypeError)
    t.throws(() => { validator([{}]) }, TypeError)
    t.throws(() => { validator([[]]) }, TypeError)
  })
})

test.group('boolean type', test => {
  const schema = ({ arrayOf, boolean }) => (v) => arrayOf(boolean)(v)
  const validator = schema(typer)

  test('should validate array of booleans', t => {
    const input = [true, true, false, true]
    const valueA = validator([])
    const valueB = validator(input)
    t.is(valueA.length, 0)
    t.is(valueB.length, 4)
    t.deepEqual(valueB, input)
  })

  test('should throw an error', t => {
    t.throws(() => { validator(null) }, TypeError)
    t.throws(() => { validator(undefined) }, TypeError)
    t.throws(() => { validator(false) }, TypeError)
    t.throws(() => { validator(12345) }, TypeError)
    t.throws(() => { validator('foo') }, TypeError)
    t.throws(() => { validator({}) }, TypeError)

    t.throws(() => { validator([null]) }, TypeError)
    t.throws(() => { validator([undefined]) }, TypeError)
    t.throws(() => { validator([12345]) }, TypeError)
    t.throws(() => { validator(['foo']) }, TypeError)
    t.throws(() => { validator([{}]) }, TypeError)
    t.throws(() => { validator([[]]) }, TypeError)
  })
})

test.group('number type', test => {
  const validator = (v) => arrayOf(number)(v)

  test('should validate array of numbers', t => {
    const input = [12345, 67890, 123.45]
    const valueA = validator([])
    const valueB = validator(input)
    t.is(valueA.length, 0)
    t.is(valueB.length, 3)
    t.deepEqual(valueB, input)
  })

  test('should throw an error', t => {
    t.throws(() => { validator(null) }, TypeError)
    t.throws(() => { validator(undefined) }, TypeError)
    t.throws(() => { validator(false) }, TypeError)
    t.throws(() => { validator(12345) }, TypeError)
    t.throws(() => { validator('foo') }, TypeError)
    t.throws(() => { validator({}) }, TypeError)

    t.throws(() => { validator([null]) }, TypeError)
    t.throws(() => { validator([undefined]) }, TypeError)
    t.throws(() => { validator([false]) }, TypeError)
    t.throws(() => { validator(['foo']) }, TypeError)
    t.throws(() => { validator([{}]) }, TypeError)
    t.throws(() => { validator([[]]) }, TypeError)
  })
})

test.group('string type', test => {
  const validator = (v) => arrayOf(string)(v)

  test('should validate array of strings', t => {
    const input = ['foo', 'bar']
    const valueA = validator([])
    const valueB = validator(input)
    t.is(valueA.length, 0)
    t.is(valueB.length, 2)
    t.deepEqual(valueB, input)
  })

  test('should throw an error', t => {
    t.throws(() => { validator(null) }, TypeError)
    t.throws(() => { validator(undefined) }, TypeError)
    t.throws(() => { validator(false) }, TypeError)
    t.throws(() => { validator(12345) }, TypeError)
    t.throws(() => { validator('foo') }, TypeError)
    t.throws(() => { validator({}) }, TypeError)

    t.throws(() => { validator([null]) }, TypeError)
    t.throws(() => { validator([undefined]) }, TypeError)
    t.throws(() => { validator([true]) }, TypeError)
    t.throws(() => { validator([12345]) }, TypeError)
    t.throws(() => { validator([{}]) }, TypeError)
    t.throws(() => { validator([[]]) }, TypeError)
  })
})

test.group('array type', test => {
  const validator = (v) => arrayOf(arrayOf(string))(v)

  test('should validate array of array of strings', t => {
    const input = [['foo'], ['bar']]
    const valueA = validator([])
    const valueB = validator(input)
    t.is(valueA.length, 0)
    t.is(valueB.length, 2)
    t.deepEqual(valueB, input)
  })

  test('should throw an error', t => {
    t.throws(() => { validator(null) }, TypeError)
    t.throws(() => { validator(undefined) }, TypeError)
    t.throws(() => { validator(false) }, TypeError)
    t.throws(() => { validator(12345) }, TypeError)
    t.throws(() => { validator('foo') }, TypeError)
    t.throws(() => { validator({}) }, TypeError)

    t.throws(() => { validator([null]) }, TypeError)
    t.throws(() => { validator([undefined]) }, TypeError)
    t.throws(() => { validator([true]) }, TypeError)
    t.throws(() => { validator([12345]) }, TypeError)
    t.throws(() => { validator([{}]) }, TypeError)
    t.throws(() => { validator([[12345]]) }, TypeError)
  })
})
