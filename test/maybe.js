// @flow
import test from 'ava-spec'
import typer from '../src'

const { maybe, nil, undef, boolean, number, string, arrayOf } = typer

test.group('null type', test => {
  const maybeNull = maybe(nil)

  test('should validate values', t => {
    const valueA = maybeNull(undefined)
    const valueB = maybeNull(null)
    t.is(valueA, undefined)
    t.is(valueB, null)
  })

  test('should throw an error', t => {
    t.throws(() => { maybeNull(true) }, TypeError)
    t.throws(() => { maybeNull(12345) }, TypeError)
    t.throws(() => { maybeNull('foo') }, TypeError)
    t.throws(() => { maybeNull({}) }, TypeError)
    t.throws(() => { maybeNull([]) }, TypeError)
  })
})

test.group('undefined type', test => {
  const maybeVoid = maybe(undef)

  test('should validate values', t => {
    const valueA = maybeVoid(undefined)
    const valueB = maybeVoid(null)
    t.is(valueA, undefined)
    t.is(valueB, null)
  })

  test('should throw an error', t => {
    t.throws(() => { maybeVoid(true) }, TypeError)
    t.throws(() => { maybeVoid(12345) }, TypeError)
    t.throws(() => { maybeVoid('foo') }, TypeError)
    t.throws(() => { maybeVoid({}) }, TypeError)
    t.throws(() => { maybeVoid([]) }, TypeError)
  })
})

test.group('boolean type', test => {
  const maybeBool = maybe(boolean)

  test('should validate values', t => {
    const valueA = maybeBool(undefined)
    const valueB = maybeBool(null)
    const valueC = maybeBool(true)
    t.is(valueA, undefined)
    t.is(valueB, null)
    t.is(valueC, true)
  })

  test('should throw an error', t => {
    t.throws(() => { maybeBool(12345) }, TypeError)
    t.throws(() => { maybeBool('foo') }, TypeError)
    t.throws(() => { maybeBool({}) }, TypeError)
    t.throws(() => { maybeBool([]) }, TypeError)
  })
})

test.group('number type', test => {
  const maybeNumber = maybe(number)

  test('should validate values', t => {
    const valueA = maybeNumber(undefined)
    const valueB = maybeNumber(null)
    const valueC = maybeNumber(12345)
    t.is(valueA, undefined)
    t.is(valueB, null)
    t.is(valueC, 12345)
  })

  test('should throw an error', t => {
    t.throws(() => { maybeNumber(true) }, TypeError)
    t.throws(() => { maybeNumber('foo') }, TypeError)
    t.throws(() => { maybeNumber({}) }, TypeError)
    t.throws(() => { maybeNumber([]) }, TypeError)
  })
})

test.group('string type', test => {
  const maybeString = maybe(string)

  test('should validate values', t => {
    const valueA = maybeString(undefined)
    const valueB = maybeString(null)
    const valueC = maybeString('foo')
    t.is(valueA, undefined)
    t.is(valueB, null)
    t.is(valueC, 'foo')
  })

  test('should throw an error', t => {
    t.throws(() => { maybeString(true) }, TypeError)
    t.throws(() => { maybeString(12345) }, TypeError)
    t.throws(() => { maybeString({}) }, TypeError)
    t.throws(() => { maybeString([]) }, TypeError)
  })
})

test.group('array type', test => {
  const maybeArrayOfString = maybe(arrayOf(string))

  test('should validate values', t => {
    const valueA = maybeArrayOfString(undefined)
    const valueB = maybeArrayOfString(null)
    const valueC = maybeArrayOfString(['foo', 'bar'])
    t.is(valueA, undefined)
    t.is(valueB, null)
    t.deepEqual(valueC, ['foo', 'bar'])
  })

  test('should throw an error', t => {
    t.throws(() => { maybeArrayOfString(true) }, TypeError)
    t.throws(() => { maybeArrayOfString(12345) }, TypeError)
    t.throws(() => { maybeArrayOfString('foo') }, TypeError)
    t.throws(() => { maybeArrayOfString({}) }, TypeError)
    t.throws(() => { maybeArrayOfString([12345]) }, TypeError)
  })
})
