// @flow
import test from 'ava-spec'
import typer from '../src'

const { arrayOf, nil, undef, boolean, number, string, TypeValidatorError } = typer

test.group('null type', test => {
  const arrayOfNull = arrayOf(nil)

  test('should validate array of nulls', t => {
    const input = [null, null, null]
    const valueA = arrayOfNull([])
    const valueB = arrayOfNull(input)
    t.is(valueA.length, 0)
    t.is(valueB.length, 3)
    t.deepEqual(valueB, input)
  })

  test('should throw an error', t => {
    t.throws(() => { arrayOfNull(null) }, TypeValidatorError)
    t.throws(() => { arrayOfNull(undefined) }, TypeValidatorError)
    t.throws(() => { arrayOfNull(false) }, TypeValidatorError)
    t.throws(() => { arrayOfNull(12345) }, TypeValidatorError)
    t.throws(() => { arrayOfNull('foo') }, TypeValidatorError)
    t.throws(() => { arrayOfNull({}) }, TypeValidatorError)

    t.throws(() => { arrayOfNull([undefined]) }, TypeValidatorError)
    t.throws(() => { arrayOfNull([true]) }, TypeValidatorError)
    t.throws(() => { arrayOfNull([12345]) }, TypeValidatorError)
    t.throws(() => { arrayOfNull(['foo']) }, TypeValidatorError)
    t.throws(() => { arrayOfNull([{}]) }, TypeValidatorError)
    t.throws(() => { arrayOfNull([[]]) }, TypeValidatorError)
  })
})

test.group('void type - unit array', test => {
  const arrayOfVoid = arrayOf(undef)

  test('should validate array of undefined values', t => {
    const input = [undefined, undefined]
    const valueA = arrayOfVoid([])
    const valueB = arrayOfVoid(input)
    t.is(valueA.length, 0)
    t.is(valueB.length, 2)
    t.deepEqual(valueB, input)
  })

  test('should throw an error', t => {
    t.throws(() => { arrayOfVoid(null) }, TypeValidatorError)
    t.throws(() => { arrayOfVoid(false) }, TypeValidatorError)
    t.throws(() => { arrayOfVoid(12345) }, TypeValidatorError)
    t.throws(() => { arrayOfVoid('foo') }, TypeValidatorError)
    t.throws(() => { arrayOfVoid({}) }, TypeValidatorError)

    t.throws(() => { arrayOfVoid([null]) }, TypeValidatorError)
    t.throws(() => { arrayOfVoid([true]) }, TypeValidatorError)
    t.throws(() => { arrayOfVoid([12345]) }, TypeValidatorError)
    t.throws(() => { arrayOfVoid(['foo']) }, TypeValidatorError)
    t.throws(() => { arrayOfVoid([{}]) }, TypeValidatorError)
    t.throws(() => { arrayOfVoid([[]]) }, TypeValidatorError)
  })
})

test.group('boolean type', test => {
  const arrayOfBool = arrayOf(boolean)

  test('should validate array of booleans', t => {
    const input = [true, true, false, true]
    const valueA = arrayOfBool([])
    const valueB = arrayOfBool(input)
    t.is(valueA.length, 0)
    t.is(valueB.length, 4)
    t.deepEqual(valueB, input)
  })

  test('should throw an error', t => {
    t.throws(() => { arrayOfBool(null) }, TypeValidatorError)
    t.throws(() => { arrayOfBool(undefined) }, TypeValidatorError)
    t.throws(() => { arrayOfBool(false) }, TypeValidatorError)
    t.throws(() => { arrayOfBool(12345) }, TypeValidatorError)
    t.throws(() => { arrayOfBool('foo') }, TypeValidatorError)
    t.throws(() => { arrayOfBool({}) }, TypeValidatorError)

    t.throws(() => { arrayOfBool([null]) }, TypeValidatorError)
    t.throws(() => { arrayOfBool([undefined]) }, TypeValidatorError)
    t.throws(() => { arrayOfBool([12345]) }, TypeValidatorError)
    t.throws(() => { arrayOfBool(['foo']) }, TypeValidatorError)
    t.throws(() => { arrayOfBool([{}]) }, TypeValidatorError)
    t.throws(() => { arrayOfBool([[]]) }, TypeValidatorError)
  })
})

test.group('number type', test => {
  const arrayOfNumber = arrayOf(number)

  test('should validate array of numbers', t => {
    const input = [12345, 67890, 123.45]
    const valueA = arrayOfNumber([])
    const valueB = arrayOfNumber(input)
    t.is(valueA.length, 0)
    t.is(valueB.length, 3)
    t.deepEqual(valueB, input)
  })

  test('should throw an error', t => {
    t.throws(() => { arrayOfNumber(null) }, TypeValidatorError)
    t.throws(() => { arrayOfNumber(undefined) }, TypeValidatorError)
    t.throws(() => { arrayOfNumber(false) }, TypeValidatorError)
    t.throws(() => { arrayOfNumber(12345) }, TypeValidatorError)
    t.throws(() => { arrayOfNumber('foo') }, TypeValidatorError)
    t.throws(() => { arrayOfNumber({}) }, TypeValidatorError)

    t.throws(() => { arrayOfNumber([null]) }, TypeValidatorError)
    t.throws(() => { arrayOfNumber([undefined]) }, TypeValidatorError)
    t.throws(() => { arrayOfNumber([false]) }, TypeValidatorError)
    t.throws(() => { arrayOfNumber(['foo']) }, TypeValidatorError)
    t.throws(() => { arrayOfNumber([{}]) }, TypeValidatorError)
    t.throws(() => { arrayOfNumber([[]]) }, TypeValidatorError)
  })
})

test.group('string type', test => {
  const arrayOfString = arrayOf(string)

  test('should validate array of strings', t => {
    const input = ['foo', 'bar']
    const valueA = arrayOfString([])
    const valueB = arrayOfString(input)
    t.is(valueA.length, 0)
    t.is(valueB.length, 2)
    t.deepEqual(valueB, input)
  })

  test('should throw an error', t => {
    t.throws(() => { arrayOfString(null) }, TypeValidatorError)
    t.throws(() => { arrayOfString(undefined) }, TypeValidatorError)
    t.throws(() => { arrayOfString(false) }, TypeValidatorError)
    t.throws(() => { arrayOfString(12345) }, TypeValidatorError)
    t.throws(() => { arrayOfString('foo') }, TypeValidatorError)
    t.throws(() => { arrayOfString({}) }, TypeValidatorError)

    t.throws(() => { arrayOfString([null]) }, TypeValidatorError)
    t.throws(() => { arrayOfString([undefined]) }, TypeValidatorError)
    t.throws(() => { arrayOfString([true]) }, TypeValidatorError)
    t.throws(() => { arrayOfString([12345]) }, TypeValidatorError)
    t.throws(() => { arrayOfString([{}]) }, TypeValidatorError)
    t.throws(() => { arrayOfString([[]]) }, TypeValidatorError)
  })
})

test.group('array type', test => {
  const arrayOfarrayOfString = arrayOf(arrayOf(string))

  test('should validate array of array of strings', t => {
    const input = [['foo'], ['bar']]
    const valueA = arrayOfarrayOfString([])
    const valueB = arrayOfarrayOfString(input)
    t.is(valueA.length, 0)
    t.is(valueB.length, 2)
    t.deepEqual(valueB, input)
  })

  test('should throw an error', t => {
    t.throws(() => { arrayOfarrayOfString(null) }, TypeValidatorError)
    t.throws(() => { arrayOfarrayOfString(undefined) }, TypeValidatorError)
    t.throws(() => { arrayOfarrayOfString(false) }, TypeValidatorError)
    t.throws(() => { arrayOfarrayOfString(12345) }, TypeValidatorError)
    t.throws(() => { arrayOfarrayOfString('foo') }, TypeValidatorError)
    t.throws(() => { arrayOfarrayOfString({}) }, TypeValidatorError)

    t.throws(() => { arrayOfarrayOfString([null]) }, TypeValidatorError)
    t.throws(() => { arrayOfarrayOfString([undefined]) }, TypeValidatorError)
    t.throws(() => { arrayOfarrayOfString([true]) }, TypeValidatorError)
    t.throws(() => { arrayOfarrayOfString([12345]) }, TypeValidatorError)
    t.throws(() => { arrayOfarrayOfString([{}]) }, TypeValidatorError)
    t.throws(() => { arrayOfarrayOfString([[12345]]) }, TypeValidatorError)
  })
})
