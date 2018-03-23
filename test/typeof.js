// @flow
import test from 'ava'
import typer from '../src'

const {
  objectOf,
  arrayOf,
  tupleOf,
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

test('should infer object type', t => {
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
  t.true(Array.isArray(htmlDomElementT.head))
})

type TypeT = [string]

test('shoud infer tuple type (cardinality 1)', t => {
  const type = tupleOf(string)
  const typeT: TypeT = typeOf(type)
  t.true(Array.isArray(typeT))
  t.is(typeT.length, 1)
  t.true(isString(typeT[0]))
})

type CoordinateT = [number, number]

test('should infer tuple type (cardinality 2)', t => {
  const coordinate = tupleOf(number, number)
  const coordinateT: CoordinateT = typeOf(coordinate)
  t.true(Array.isArray(coordinateT))
  t.is(coordinateT.length, 2)
  t.true(isNumber(coordinateT[0]))
  t.true(isNumber(coordinateT[1]))
})

type LocationT = [number, number, string]

test('should infer tuple type (cardinality 3)', t => {
  const location = tupleOf(number, number, string)
  const locationT: LocationT = typeOf(location)
  t.true(Array.isArray(locationT))
  t.is(locationT.length, 3)
  t.true(isNumber(locationT[0]))
  t.true(isNumber(locationT[1]))
  t.true(isString(locationT[2]))
})

type VectorT = [number, number, number, number]

test('should infer tuple type (cardinality 4)', t => {
  const vector = tupleOf(number, number, number, number)
  const vectorT: VectorT = typeOf(vector)
  t.true(Array.isArray(vectorT))
  t.is(vectorT.length, 4)
  t.true(isNumber(vectorT[0]))
  t.true(isNumber(vectorT[1]))
  t.true(isNumber(vectorT[2]))
  t.true(isNumber(vectorT[3]))
})

type ListOfBoolT = [boolean, boolean, boolean, boolean, boolean]

test('should infer tuple type (cardinality 5)', t => {
  const listOfBool = tupleOf(boolean, boolean, boolean, boolean, boolean)
  const listOfBoolT: ListOfBoolT = typeOf(listOfBool)
  t.true(Array.isArray(listOfBoolT))
  t.is(listOfBoolT.length, 5)
  t.true(isBoolean(listOfBoolT[0]))
  t.true(isBoolean(listOfBoolT[1]))
  t.true(isBoolean(listOfBoolT[2]))
  t.true(isBoolean(listOfBoolT[3]))
  t.true(isBoolean(listOfBoolT[4]))
})
