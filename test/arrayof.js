// @flow
import { assert, test } from './index.js'
import * as typer from '../src/index.js'

const { arrayOf, nil, undef, boolean, number, string } = typer

test('null type', async (t) => {
  const arrayOfNull = arrayOf(nil)

  await t.test('should validate array of nulls', () => {
    const input = [null, null, null]
    const valueA: Array<null> = arrayOfNull([])
    const valueB = arrayOfNull(input)
    assert.equal(valueA.length, 0)
    assert.equal(valueB.length, 3)
    assert.deepEqual(valueB, input)
  })

  await t.test('should throw an error', () => {
    assert.throws(() => { arrayOfNull(null) })
    assert.throws(() => { arrayOfNull(undefined) })
    assert.throws(() => { arrayOfNull(false) })
    assert.throws(() => { arrayOfNull(12345) })
    assert.throws(() => { arrayOfNull('foo') })
    assert.throws(() => { arrayOfNull({}) })

    assert.throws(() => { arrayOfNull([undefined]) })
    assert.throws(() => { arrayOfNull([true]) })
    assert.throws(() => { arrayOfNull([12345]) })
    assert.throws(() => { arrayOfNull(['foo']) })
    assert.throws(() => { arrayOfNull([{}]) })
    assert.throws(() => { arrayOfNull([[]]) })
  })
})

test('void type - unit array', async (t) => {
  const arrayOfVoid = arrayOf(undef)

  await t.test('should validate array of undefined values', t => {
    const input = [undefined, undefined]
    const valueA: Array<void> = arrayOfVoid([])
    const valueB = arrayOfVoid(input)
    assert.equal(valueA.length, 0)
    assert.equal(valueB.length, 2)
    assert.deepEqual(valueB, input)
  })

  await t.test('should throw an error', () => {
    assert.throws(() => { arrayOfVoid(null) })
    assert.throws(() => { arrayOfVoid(false) })
    assert.throws(() => { arrayOfVoid(12345) })
    assert.throws(() => { arrayOfVoid('foo') })
    assert.throws(() => { arrayOfVoid({}) })

    assert.throws(() => { arrayOfVoid([null]) })
    assert.throws(() => { arrayOfVoid([true]) })
    assert.throws(() => { arrayOfVoid([12345]) })
    assert.throws(() => { arrayOfVoid(['foo']) })
    assert.throws(() => { arrayOfVoid([{}]) })
    assert.throws(() => { arrayOfVoid([[]]) })
  })
})

test('boolean type', async (t) => {
  const arrayOfBool = arrayOf(boolean)

  await t.test('should validate array of booleans', t => {
    const input = [true, true, false, true]
    const valueA: Array<boolean> = arrayOfBool([])
    const valueB = arrayOfBool(input)
    assert.equal(valueA.length, 0)
    assert.equal(valueB.length, 4)
    assert.deepEqual(valueB, input)
  })

  await t.test('should throw an error', () => {
    assert.throws(() => { arrayOfBool(null) })
    assert.throws(() => { arrayOfBool(undefined) })
    assert.throws(() => { arrayOfBool(false) })
    assert.throws(() => { arrayOfBool(12345) })
    assert.throws(() => { arrayOfBool('foo') })
    assert.throws(() => { arrayOfBool({}) })

    assert.throws(() => { arrayOfBool([null]) })
    assert.throws(() => { arrayOfBool([undefined]) })
    assert.throws(() => { arrayOfBool([12345]) })
    assert.throws(() => { arrayOfBool(['foo']) })
    assert.throws(() => { arrayOfBool([{}]) })
    assert.throws(() => { arrayOfBool([[]]) })
  })
})

test('number type', async (t) => {
  const arrayOfNumber = arrayOf(number)

  await t.test('should validate array of numbers', t => {
    const input = [12345, 67890, 123.45]
    const valueA: Array<number> = arrayOfNumber([])
    const valueB = arrayOfNumber(input)
    assert.equal(valueA.length, 0)
    assert.equal(valueB.length, 3)
    assert.deepEqual(valueB, input)
  })

  await t.test('should throw an error', () => {
    assert.throws(() => { arrayOfNumber(null) })
    assert.throws(() => { arrayOfNumber(undefined) })
    assert.throws(() => { arrayOfNumber(false) })
    assert.throws(() => { arrayOfNumber(12345) })
    assert.throws(() => { arrayOfNumber('foo') })
    assert.throws(() => { arrayOfNumber({}) })

    // assert.throws(() => { arrayOfNumber([null]) })
    assert.throws(() => { arrayOfNumber([undefined]) })
    assert.throws(() => { arrayOfNumber([false]) })
    assert.throws(() => { arrayOfNumber(['foo']) })
    assert.throws(() => { arrayOfNumber([{}]) })
    assert.throws(() => { arrayOfNumber([[]]) })
  })
})

test('string type', async (t) => {
  const arrayOfString = arrayOf(string)

  await t.test('should validate array of strings', () => {
    const input = ['foo', 'bar']
    const valueA: Array<string> = arrayOfString([])
    const valueB = arrayOfString(input)
    assert.equal(valueA.length, 0)
    assert.equal(valueB.length, 2)
    assert.deepEqual(valueB, input)
  })

  await t.test('should throw an error', () => {
    assert.throws(() => { arrayOfString(null) })
    assert.throws(() => { arrayOfString(undefined) })
    assert.throws(() => { arrayOfString(false) })
    assert.throws(() => { arrayOfString(12345) })
    assert.throws(() => { arrayOfString('foo') })
    assert.throws(() => { arrayOfString({}) })

    assert.throws(() => { arrayOfString([null]) })
    assert.throws(() => { arrayOfString([undefined]) })
    assert.throws(() => { arrayOfString([true]) })
    assert.throws(() => { arrayOfString([{}]) })
    assert.throws(() => { arrayOfString([[]]) })
  })
})

test('array type', async (t) => {
  const arrayOfarrayOfString = arrayOf(arrayOf(string))

  await t.test('should validate array of array of strings', () => {
    const input = [['foo'], ['bar']]
    const valueA: Array<Array<string>> = arrayOfarrayOfString([])
    const valueB = arrayOfarrayOfString(input)
    assert.equal(valueA.length, 0)
    assert.equal(valueB.length, 2)
    assert.deepEqual(valueB, input)
  })

  await t.test('should throw an error', () => {
    assert.throws(() => { arrayOfarrayOfString(null) })
    assert.throws(() => { arrayOfarrayOfString(undefined) })
    assert.throws(() => { arrayOfarrayOfString(false) })
    assert.throws(() => { arrayOfarrayOfString(12345) })
    assert.throws(() => { arrayOfarrayOfString('foo') })
    assert.throws(() => { arrayOfarrayOfString({}) })

    assert.throws(() => { arrayOfarrayOfString([null]) })
    assert.throws(() => { arrayOfarrayOfString([undefined]) })
    assert.throws(() => { arrayOfarrayOfString([true]) })
    assert.throws(() => { arrayOfarrayOfString([12345]) })
    assert.throws(() => { arrayOfarrayOfString([{}]) })
  })
})
