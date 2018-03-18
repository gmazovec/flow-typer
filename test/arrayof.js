// @flow
import test from 'ava-spec'
import typer from '../src'

const { arrayOf, nil, undef, boolean, number, string } = typer

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
    t.throws(() => { arrayOfNull(null) }, TypeError)
    t.throws(() => { arrayOfNull(undefined) }, TypeError)
    t.throws(() => { arrayOfNull(false) }, TypeError)
    t.throws(() => { arrayOfNull(12345) }, TypeError)
    t.throws(() => { arrayOfNull('foo') }, TypeError)
    t.throws(() => { arrayOfNull({}) }, TypeError)

    t.throws(() => { arrayOfNull([undefined]) }, TypeError)
    t.throws(() => { arrayOfNull([true]) }, TypeError)
    t.throws(() => { arrayOfNull([12345]) }, TypeError)
    t.throws(() => { arrayOfNull(['foo']) }, TypeError)
    t.throws(() => { arrayOfNull([{}]) }, TypeError)
    t.throws(() => { arrayOfNull([[]]) }, TypeError)
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
    t.throws(() => { arrayOfVoid(null) }, TypeError)
    t.throws(() => { arrayOfVoid(false) }, TypeError)
    t.throws(() => { arrayOfVoid(12345) }, TypeError)
    t.throws(() => { arrayOfVoid('foo') }, TypeError)
    t.throws(() => { arrayOfVoid({}) }, TypeError)

    t.throws(() => { arrayOfVoid([null]) }, TypeError)
    t.throws(() => { arrayOfVoid([true]) }, TypeError)
    t.throws(() => { arrayOfVoid([12345]) }, TypeError)
    t.throws(() => { arrayOfVoid(['foo']) }, TypeError)
    t.throws(() => { arrayOfVoid([{}]) }, TypeError)
    t.throws(() => { arrayOfVoid([[]]) }, TypeError)
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
    t.throws(() => { arrayOfBool(null) }, TypeError)
    t.throws(() => { arrayOfBool(undefined) }, TypeError)
    t.throws(() => { arrayOfBool(false) }, TypeError)
    t.throws(() => { arrayOfBool(12345) }, TypeError)
    t.throws(() => { arrayOfBool('foo') }, TypeError)
    t.throws(() => { arrayOfBool({}) }, TypeError)

    t.throws(() => { arrayOfBool([null]) }, TypeError)
    t.throws(() => { arrayOfBool([undefined]) }, TypeError)
    t.throws(() => { arrayOfBool([12345]) }, TypeError)
    t.throws(() => { arrayOfBool(['foo']) }, TypeError)
    t.throws(() => { arrayOfBool([{}]) }, TypeError)
    t.throws(() => { arrayOfBool([[]]) }, TypeError)
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
    t.throws(() => { arrayOfNumber(null) }, TypeError)
    t.throws(() => { arrayOfNumber(undefined) }, TypeError)
    t.throws(() => { arrayOfNumber(false) }, TypeError)
    t.throws(() => { arrayOfNumber(12345) }, TypeError)
    t.throws(() => { arrayOfNumber('foo') }, TypeError)
    t.throws(() => { arrayOfNumber({}) }, TypeError)

    t.throws(() => { arrayOfNumber([null]) }, TypeError)
    t.throws(() => { arrayOfNumber([undefined]) }, TypeError)
    t.throws(() => { arrayOfNumber([false]) }, TypeError)
    t.throws(() => { arrayOfNumber(['foo']) }, TypeError)
    t.throws(() => { arrayOfNumber([{}]) }, TypeError)
    t.throws(() => { arrayOfNumber([[]]) }, TypeError)
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
    t.throws(() => { arrayOfString(null) }, TypeError)
    t.throws(() => { arrayOfString(undefined) }, TypeError)
    t.throws(() => { arrayOfString(false) }, TypeError)
    t.throws(() => { arrayOfString(12345) }, TypeError)
    t.throws(() => { arrayOfString('foo') }, TypeError)
    t.throws(() => { arrayOfString({}) }, TypeError)

    t.throws(() => { arrayOfString([null]) }, TypeError)
    t.throws(() => { arrayOfString([undefined]) }, TypeError)
    t.throws(() => { arrayOfString([true]) }, TypeError)
    t.throws(() => { arrayOfString([12345]) }, TypeError)
    t.throws(() => { arrayOfString([{}]) }, TypeError)
    t.throws(() => { arrayOfString([[]]) }, TypeError)
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
    t.throws(() => { arrayOfarrayOfString(null) }, TypeError)
    t.throws(() => { arrayOfarrayOfString(undefined) }, TypeError)
    t.throws(() => { arrayOfarrayOfString(false) }, TypeError)
    t.throws(() => { arrayOfarrayOfString(12345) }, TypeError)
    t.throws(() => { arrayOfarrayOfString('foo') }, TypeError)
    t.throws(() => { arrayOfarrayOfString({}) }, TypeError)

    t.throws(() => { arrayOfarrayOfString([null]) }, TypeError)
    t.throws(() => { arrayOfarrayOfString([undefined]) }, TypeError)
    t.throws(() => { arrayOfarrayOfString([true]) }, TypeError)
    t.throws(() => { arrayOfarrayOfString([12345]) }, TypeError)
    t.throws(() => { arrayOfarrayOfString([{}]) }, TypeError)
    t.throws(() => { arrayOfarrayOfString([[12345]]) }, TypeError)
  })
})
