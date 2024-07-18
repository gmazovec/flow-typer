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
    t.throws(() => { arrayOfNull(null) })
    t.throws(() => { arrayOfNull(undefined) })
    t.throws(() => { arrayOfNull(false) })
    t.throws(() => { arrayOfNull(12345) })
    t.throws(() => { arrayOfNull('foo') })
    t.throws(() => { arrayOfNull({}) })

    t.throws(() => { arrayOfNull([undefined]) })
    t.throws(() => { arrayOfNull([true]) })
    t.throws(() => { arrayOfNull([12345]) })
    t.throws(() => { arrayOfNull(['foo']) })
    t.throws(() => { arrayOfNull([{}]) })
    t.throws(() => { arrayOfNull([[]]) })
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
    t.throws(() => { arrayOfVoid(null) })
    t.throws(() => { arrayOfVoid(false) })
    t.throws(() => { arrayOfVoid(12345) })
    t.throws(() => { arrayOfVoid('foo') })
    t.throws(() => { arrayOfVoid({}) })

    t.throws(() => { arrayOfVoid([null]) })
    t.throws(() => { arrayOfVoid([true]) })
    t.throws(() => { arrayOfVoid([12345]) })
    t.throws(() => { arrayOfVoid(['foo']) })
    t.throws(() => { arrayOfVoid([{}]) })
    t.throws(() => { arrayOfVoid([[]]) })
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
    t.throws(() => { arrayOfBool(null) })
    t.throws(() => { arrayOfBool(undefined) })
    t.throws(() => { arrayOfBool(false) })
    t.throws(() => { arrayOfBool(12345) })
    t.throws(() => { arrayOfBool('foo') })
    t.throws(() => { arrayOfBool({}) })

    t.throws(() => { arrayOfBool([null]) })
    t.throws(() => { arrayOfBool([undefined]) })
    t.throws(() => { arrayOfBool([12345]) })
    t.throws(() => { arrayOfBool(['foo']) })
    t.throws(() => { arrayOfBool([{}]) })
    t.throws(() => { arrayOfBool([[]]) })
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
    t.throws(() => { arrayOfNumber(null) })
    t.throws(() => { arrayOfNumber(undefined) })
    t.throws(() => { arrayOfNumber(false) })
    t.throws(() => { arrayOfNumber(12345) })
    t.throws(() => { arrayOfNumber('foo') })
    t.throws(() => { arrayOfNumber({}) })

    t.throws(() => { arrayOfNumber([null]) })
    t.throws(() => { arrayOfNumber([undefined]) })
    t.throws(() => { arrayOfNumber([false]) })
    t.throws(() => { arrayOfNumber(['foo']) })
    t.throws(() => { arrayOfNumber([{}]) })
    t.throws(() => { arrayOfNumber([[]]) })
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
    t.throws(() => { arrayOfString(null) })
    t.throws(() => { arrayOfString(undefined) })
    t.throws(() => { arrayOfString(false) })
    t.throws(() => { arrayOfString(12345) })
    t.throws(() => { arrayOfString('foo') })
    t.throws(() => { arrayOfString({}) })

    t.throws(() => { arrayOfString([null]) })
    t.throws(() => { arrayOfString([undefined]) })
    t.throws(() => { arrayOfString([true]) })
    t.throws(() => { arrayOfString([12345]) })
    t.throws(() => { arrayOfString([{}]) })
    t.throws(() => { arrayOfString([[]]) })
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
    t.throws(() => { arrayOfarrayOfString(null) })
    t.throws(() => { arrayOfarrayOfString(undefined) })
    t.throws(() => { arrayOfarrayOfString(false) })
    t.throws(() => { arrayOfarrayOfString(12345) })
    t.throws(() => { arrayOfarrayOfString('foo') })
    t.throws(() => { arrayOfarrayOfString({}) })

    t.throws(() => { arrayOfarrayOfString([null]) })
    t.throws(() => { arrayOfarrayOfString([undefined]) })
    t.throws(() => { arrayOfarrayOfString([true]) })
    t.throws(() => { arrayOfarrayOfString([12345]) })
    t.throws(() => { arrayOfarrayOfString([{}]) })
    t.throws(() => { arrayOfarrayOfString([[12345]]) })
  })
})
