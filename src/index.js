// @flow

export type LiteralValue = boolean | number | string
export type ObjectRecord<T> = { [key: string]: T }
/*:: export type TypeValidatorMap<T> = { [key in keyof T]: $Call<T[key], mixed> } */
export type TypeChecker<T> = (mixed, _?:string) => T
export type TypeValidator<T> = { (mixed, _?:string): T, type: (?{ noVoid: boolean }) => string, ... }
export type TypeMaybeValidator<T> = { (mixed, _?:string): ?T, type: () => string, ... }
export type TypeArrayValidator<T> = { (mixed, _?:string): T[], type: () => string, ... }
export type TypeValidatorRecord<T> = ObjectRecord<TypeValidator<T>>
export type $Literal<T: LiteralValue> = TypeValidator<T>

export type TypeValidatorsOf2<T, U> = [
  TypeValidator<T>,
  TypeValidator<U>
]

export type TypeValidatorsOf3<T, U, V> = [
  TypeValidator<T>,
  TypeValidator<U>,
  TypeValidator<V>
]

export type TypeValidatorsOf4<T, U, V, Z> = [
  TypeValidator<T>,
  TypeValidator<U>,
  TypeValidator<V>,
  TypeValidator<Z>,
]

export type TypeValidatorsOf5<T, U, V, Z, X> = [
  TypeValidator<T>,
  TypeValidator<U>,
  TypeValidator<V>,
  TypeValidator<Z>,
  TypeValidator<X>
]

const is = require('./is')

exports.isNil = is.isNil
exports.isUndef = is.isUndef
exports.isBoolean = is.isBoolean
exports.isNumber = is.isNumber
exports.isString = is.isString
exports.isObject = is.isObject

const utils = require('./utils')

exports.isType = utils.isType
exports.typeOf = utils.typeOf
exports.getType = utils.getType

const error = require('./error')

exports.TypeValidatorError = error.TypeValidatorError
exports.validatorError = error.validatorError

const primitives = require('./types/primitives')

exports.nil = primitives.nil
exports.undef = primitives.undef
exports.boolean = primitives.boolean
exports.number = primitives.number
exports.string = primitives.string

const literals = require('./types/literals')

exports.literalOf = literals.literalOf

const maybe = require('./types/maybe')

exports.maybe = maybe.maybe

const mixed = require('./types/mixed')

exports.mixed = mixed.mixed

const object = require('./types/object')

exports.object = object.object
exports.objectOf = object.objectOf
exports.optional = object.optional

const array = require('./types/array')

exports.arrayOf = array.arrayOf

const tuple = require('./types/tuple')

exports.tupleOf = tuple.tupleOf

const union = require('./types/union')

exports.unionOf = union.unionOf

const map = require('./types/map')

exports.mapOf = map.mapOf
