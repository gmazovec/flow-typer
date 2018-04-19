// @flow
import test from 'ava-spec'
import typer from '../src'

const {
  maybe,
  nil,
  undef,
  boolean,
  number,
  string,
  arrayOf,
  objectOf,
  TypeValidatorError
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
    t.throws(() => { maybeNull(true) }, TypeValidatorError)
    t.throws(() => { maybeNull(12345) }, TypeValidatorError)
    t.throws(() => { maybeNull('foo') }, TypeValidatorError)
    t.throws(() => { maybeNull({}) }, TypeValidatorError)
    t.throws(() => { maybeNull([]) }, TypeValidatorError)
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
    t.throws(() => { maybeVoid(true) }, TypeValidatorError)
    t.throws(() => { maybeVoid(12345) }, TypeValidatorError)
    t.throws(() => { maybeVoid('foo') }, TypeValidatorError)
    t.throws(() => { maybeVoid({}) }, TypeValidatorError)
    t.throws(() => { maybeVoid([]) }, TypeValidatorError)
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
    t.throws(() => { maybeBool(12345) }, TypeValidatorError)
    t.throws(() => { maybeBool('foo') }, TypeValidatorError)
    t.throws(() => { maybeBool({}) }, TypeValidatorError)
    t.throws(() => { maybeBool([]) }, TypeValidatorError)
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
    t.throws(() => { maybeNumber(true) }, TypeValidatorError)
    t.throws(() => { maybeNumber('foo') }, TypeValidatorError)
    t.throws(() => { maybeNumber({}) }, TypeValidatorError)
    t.throws(() => { maybeNumber([]) }, TypeValidatorError)
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
    t.throws(() => { maybeString(true) }, TypeValidatorError)
    t.throws(() => { maybeString(12345) }, TypeValidatorError)
    t.throws(() => { maybeString({}) }, TypeValidatorError)
    t.throws(() => { maybeString([]) }, TypeValidatorError)
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
    t.throws(() => { maybeArrayOfString(true) }, TypeValidatorError)
    t.throws(() => { maybeArrayOfString(12345) }, TypeValidatorError)
    t.throws(() => { maybeArrayOfString('foo') }, TypeValidatorError)
    t.throws(() => { maybeArrayOfString({}) }, TypeValidatorError)
    t.throws(() => { maybeArrayOfString([12345]) }, TypeValidatorError)
  })
})

test.group('object type', test => {
  const maybeObjectOf = maybe(objectOf({ name: string }))

  test('should validate values', t => {
    const valueA = maybeObjectOf(undefined)
    const valueB = maybeObjectOf(null)
    const valueC = maybeObjectOf({ name: 'foo' })
    t.is(valueA, undefined)
    t.is(valueB, null)
    t.deepEqual(valueC, { name: 'foo' })
  })

  test('should throw an error', t => {
    t.throws(() => { maybeObjectOf(true) }, TypeValidatorError)
    t.throws(() => { maybeObjectOf(12345) }, TypeValidatorError)
    t.throws(() => { maybeObjectOf('foo') }, TypeValidatorError)
    t.throws(() => { maybeObjectOf(['bar']) }, TypeValidatorError)
  })
})
