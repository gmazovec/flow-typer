// @flow
const { EMPTY_VALUE } = require('./const')
const { isEmpty } = require('./is')

import type { LiteralValue, TypeValidator } from './'

exports.isType =
  <T, F: TypeValidator<T>>(typeFn: F): TypeValidator<boolean> =>
    (v: mixed, _scope? = ''): boolean => {
      try {
        typeFn(v, _scope)
        return true
      } catch (_) {
        return false
      }
    }

// This function will return value based on schema with inferred types. This
// value can be used to define type in Flow with 'typeof' utility.

exports.typeOf =
  <T>(schema: TypeValidator<T>): T =>
    schema(EMPTY_VALUE, '')

exports.getType = (
  function getType (typeFn) {
    if (typeof typeFn.type === 'function') return typeFn.type()
    return typeFn.name || '?'
  }
  : <T>(TypeValidator<T>) => string
)
