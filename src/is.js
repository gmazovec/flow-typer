// @flow
const { EMPTY_VALUE } = require('./const')

exports.isEmpty =
  (v: mixed): boolean %checks =>
    v === EMPTY_VALUE

exports.isNil =
  (v: mixed): boolean %checks =>
    v === null

exports.isUndef =
  (v: mixed): boolean %checks =>
    typeof v === 'undefined'

exports.isBoolean =
  (v: mixed): boolean %checks =>
    typeof v === 'boolean'

exports.isNumber =
  (v: mixed): boolean %checks =>
    typeof v === 'number'

exports.isString =
  (v: mixed): boolean %checks =>
    typeof v === 'string'

exports.isObject =
  (v: mixed): boolean %checks =>
    !exports.isNil(v) && typeof v === 'object'

exports.isFunction =
  (v: mixed): boolean %checks =>
    typeof v === 'function'
