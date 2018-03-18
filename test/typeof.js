// @flow
import test from 'ava'
import typer from '../src'

const {
  objectOf,
  arrayOf,
  string,
  number,
  boolean,
  typeOf,
} = typer

/*::
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
*/

test('should return correct flow type', t => {
  const DOMElement = objectOf({
    type: string,
    name: string,
    id: string,
    visible: boolean,
    children: number
  })
  const domElementT /*: DOMElementT */ = typeOf(DOMElement)

  const schema = objectOf({
    head: arrayOf(DOMElement),
    body: arrayOf(DOMElement)
  })
  const htmlDomElementT /*: HtmlDOMElementT */ = typeOf(schema)
  t.true(Array.isArray(htmlDomElementT.head))
})
