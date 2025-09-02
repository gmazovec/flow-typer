// @flow
import assert from 'assert'
// $FlowExpectedError
import { test } from 'node:test'
import * as typer from '../src/index.js'

const { TypeValidatorError } = typer

test('TypeValidatorError', async (t) => {
  const error = new TypeValidatorError('', 'personT', 'boolean', 'true')

  await t.test('should return custom message', () => {
    assert.equal(error.message.split('\n')[0], 'invalid "boolean" value type; personT type expected')
  })

  await t.test('should return source file', () => {
    try {
      throw error
    } catch (err) {
      err.stack = '';
      const sourceFile = err.getSourceFile()
      assert.equal(sourceFile.split('/').slice(-1)[0], '')
    }
  })
})
