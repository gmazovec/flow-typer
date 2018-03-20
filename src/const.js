// @flow

// This symbol can be passed to validators to indicate empty value. Validators
// will return default value for specific type. The default values are used to
// construct inferred types.

exports.EMPTY_VALUE = Symbol('@@empty')
