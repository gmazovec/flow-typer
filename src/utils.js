// @flow
const { EMPTY_VALUE } = require('./const')
const { isEmpty } = require('./is')

import type { LiteralValue, TypeValidator } from './'

exports.isType =
  <T, F: TypeValidator<T>>(typeFn: F): TypeValidator<boolean> =>
    (v: mixed): boolean => {
      try {
        typeFn(v)
        return true
      } catch (_) {
        return false
      }
    }

// This function will return value based on schema with inferred types. This
// value can be used to define type in Flow with 'typeof' utility.

exports.typeOf =
  <T>(schema: TypeValidator<T>): T =>
    schema(EMPTY_VALUE)

exports.error = function error (expected: string, actual: string): TypeError {
  return new TypeError(`invalid '${actual}' value type; '${expected}' type expected`)
}
