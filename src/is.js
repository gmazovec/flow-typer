// @flow

const isNil =
  (v: mixed) /*: v is null */ =>
    v === null

exports.isNil = isNil

exports.isUndef =
  (v: mixed) /*: v is void */ =>
    typeof v === 'undefined'

exports.isBoolean =
  (v: mixed) /*: v is boolean */ =>
    typeof v === 'boolean'

exports.isNumber =
  (v: mixed) /*: v is number */ =>
    typeof v === 'number'

exports.isString =
  (v: mixed) /*: v is string */ =>
    typeof v === 'string'

exports.isObject =
  (v: mixed) /*: v is {...} */ =>
    v !== null && typeof v === 'object'
