// @flow

// $FlowExpectedError[cannot-resolve-module]
import * as _assert from 'node:assert'
// $FlowExpectedError[cannot-resolve-module]
import { test as _test } from 'node:test'

export const assert = _assert
export const test = _test
