// @flow
import test from 'ava-spec'
import * as typer from '../src/index.js'

const {
  maybe,
  nil,
  undef,
  boolean,
  number,
  string,
  arrayOf,
  objectOf
} = typer

test.group('null type', test => {
  const maybeNull = maybe(nil)

  test('should validate values', t => {
    const valueA = maybeNull(undefined)
    const valueB = maybeNull(null)
    t.is(valueA, undefined)
    t.is(valueB, null)
  })

  test('should throw an error', t => {
    t.throws(() => { maybeNull(true) })
    t.throws(() => { maybeNull(12345) })
    t.throws(() => { maybeNull('foo') })
    t.throws(() => { maybeNull({}) })
    t.throws(() => { maybeNull([]) })
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
    t.throws(() => { maybeVoid(true) })
    t.throws(() => { maybeVoid(12345) })
    t.throws(() => { maybeVoid('foo') })
    t.throws(() => { maybeVoid({}) })
    t.throws(() => { maybeVoid([]) })
  })
})

test.group('boolean type', test => {
  const maybeBool = maybe(boolean)

  test('should validate values', t => {
    const valueA: ?boolean = maybeBool(undefined)
    const valueB = maybeBool(null)
    const valueC = maybeBool(true)
    t.is(valueA, undefined)
    t.is(valueB, null)
    t.is(valueC, true)
  })

  test('should throw an error', t => {
    t.throws(() => { maybeBool(12345) })
    t.throws(() => { maybeBool('foo') })
    t.throws(() => { maybeBool({}) })
    t.throws(() => { maybeBool([]) })
  })
})

test.group('number type', test => {
  const maybeNumber = maybe(number)

  test('should validate values', t => {
    const valueA: ?number = maybeNumber(undefined)
    const valueB = maybeNumber(null)
    const valueC = maybeNumber(12345)
    t.is(valueA, undefined)
    t.is(valueB, null)
    t.is(valueC, 12345)
  })

  test('should throw an error', t => {
    t.throws(() => { maybeNumber(true) })
    t.throws(() => { maybeNumber('foo') })
    t.throws(() => { maybeNumber({}) })
    t.throws(() => { maybeNumber([]) })
  })
})

test.group('string type', test => {
  const maybeString = maybe(string)

  test('should validate values', t => {
    const valueA: ?string = maybeString(undefined)
    const valueB = maybeString(null)
    const valueC = maybeString('foo')
    t.is(valueA, undefined)
    t.is(valueB, null)
    t.is(valueC, 'foo')
  })

  test('should throw an error', t => {
    t.throws(() => { maybeString(true) })
    t.throws(() => { maybeString(12345) })
    t.throws(() => { maybeString({}) })
    t.throws(() => { maybeString([]) })
  })
})

test.group('array type', test => {
  const maybeArrayOfString = maybe(arrayOf(string))

  test('should validate values', t => {
    const valueA: ?Array<string> = maybeArrayOfString(undefined)
    const valueB = maybeArrayOfString(null)
    const valueC = maybeArrayOfString(['foo', 'bar'])
    t.is(valueA, undefined)
    t.is(valueB, null)
    t.deepEqual(valueC, ['foo', 'bar'])
  })

  test('should throw an error', t => {
    t.throws(() => { maybeArrayOfString(true) })
    t.throws(() => { maybeArrayOfString(12345) })
    t.throws(() => { maybeArrayOfString('foo') })
    t.throws(() => { maybeArrayOfString({}) })
    t.throws(() => { maybeArrayOfString([12345]) })
  })
})

test.group('object type', test => {
  const maybeObjectOf = maybe(objectOf({ name: string }))

  test('should validate values', t => {
    const valueA: ?{ name: string, ... } = maybeObjectOf(undefined)
    const valueB = maybeObjectOf(null)
    const valueC = maybeObjectOf({ name: 'foo' })
    t.is(valueA, undefined)
    t.is(valueB, null)
    t.deepEqual(valueC, { name: 'foo' })
  })

  test('should throw an error', t => {
    t.throws(() => { maybeObjectOf(true) })
    t.throws(() => { maybeObjectOf(12345) })
    t.throws(() => { maybeObjectOf('foo') })
    t.throws(() => { maybeObjectOf(['bar']) })
  })
})
