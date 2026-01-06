// @flow
import { assert, test } from './index.js'
import * as typer from '../src/index.js'

const {
  objectOf,
  arrayOf,
  tupleOf1,
  tupleOf2,
  tupleOf3,
  tupleOf4,
  tupleOf5,
  string,
  number,
  boolean,
  typeOf,
  isBoolean,
  isNumber,
  isString
} = typer

type DOMElementT = {|
  type: string,
  name: string,
  id: string,
  visible: boolean,
  children: number
|}

type HtmlDOMElementT = {|
  head: DOMElementT[],
  body: DOMElementT[]
|}

test('should infer object type', () => {
  const DOMElement = objectOf({
    type: string,
    name: string,
    id: string,
    visible: boolean,
    children: number
  })
  const domElementT: DOMElementT = typeOf(DOMElement)

  const schema = objectOf({
    head: arrayOf(DOMElement),
    body: arrayOf(DOMElement)
  })
  const htmlDomElementT: HtmlDOMElementT = typeOf(schema)
  assert.ok(Array.isArray(htmlDomElementT.head))
})

type TypeT = [string]

test('should infer tuple type (cardinality 1)', () => {
  const type = tupleOf1(string)
  const typeT: TypeT = typeOf(type)
  assert.ok(Array.isArray(typeT))
  assert.equal(typeT.length, 1)
  assert.ok(isString(typeT[0]))
})

type CoordinateT = [number, number]

test('should infer tuple type (cardinality 2)', () => {
  const coordinate = tupleOf2(number, number)
  const coordinateT: CoordinateT = typeOf(coordinate)
  assert.ok(Array.isArray(coordinateT))
  assert.equal(coordinateT.length, 2)
  assert.ok(isNumber(coordinateT[0]))
  assert.ok(isNumber(coordinateT[1]))
})

type LocationT = [number, number, string]

test('should infer tuple type (cardinality 3)', () => {
  const location = tupleOf3(number, number, string)
  const locationT: LocationT = typeOf(location)
  assert.ok(Array.isArray(locationT))
  assert.equal(locationT.length, 3)
  assert.ok(isNumber(locationT[0]))
  assert.ok(isNumber(locationT[1]))
  assert.ok(isString(locationT[2]))
})

type VectorT = [number, number, number, number]

test('should infer tuple type (cardinality 4)', () => {
  const vector = tupleOf4(number, number, number, number)
  const vectorT: VectorT = typeOf(vector)
  assert.ok(Array.isArray(vectorT))
  assert.equal(vectorT.length, 4)
  assert.ok(isNumber(vectorT[0]))
  assert.ok(isNumber(vectorT[1]))
  assert.ok(isNumber(vectorT[2]))
  assert.ok(isNumber(vectorT[3]))
})

type ListOfBoolT = [boolean, boolean, boolean, boolean, boolean]

test('should infer tuple type (cardinality 5)', () => {
  const listOfBool = tupleOf5(boolean, boolean, boolean, boolean, boolean)
  const listOfBoolT: ListOfBoolT = typeOf(listOfBool)
  assert.ok(Array.isArray(listOfBoolT))
  assert.equal(listOfBoolT.length, 5)
  assert.ok(isBoolean(listOfBoolT[0]))
  assert.ok(isBoolean(listOfBoolT[1]))
  assert.ok(isBoolean(listOfBoolT[2]))
  assert.ok(isBoolean(listOfBoolT[3]))
  assert.ok(isBoolean(listOfBoolT[4]))
})
