// @flow

import * as error from "./error.js";
import * as is from "./is.js";
import * as utils from "./utils.js";

export * from "./types/index.js";

export type LiteralValue = boolean | number | string;
export type ObjectRecord<T> = { [key: string]: T };
/*:: export type TypeValidatorMap<T> = { [key in keyof T]: ReturnType<T[key]> }; */
export type TypeChecker<T> = (mixed, _?:string) => T;
export type TypeValidator<T> = { (mixed, _?:string, _: ?TypeAssertError[], _?: AssertionContext, _?: boolean): T, type: (?{ noVoid: boolean }) => string, value: () => T, ... };
export type TypeMaybeValidator<T> = { (mixed, _?:string, _: ?TypeAssertError[], _?: AssertionContext, _?: boolean): ?T, type: () => string, value: () => ?T, ... };
export type TypeArrayValidator<T> = { (mixed, _?:string, _: ?TypeAssertError[], _?: AssertionContext, _?:boolean): T[], type: () => string, value: () => T[], ... };
export type TypeCallbackValidator<T> = { (mixed, _?:string): ReturnType<T>, type: (?{ noVoid: boolean }) => string, ... };
export type TypeValidatorRecord<T> = ObjectRecord<TypeValidator<T>>;
export type $Literal<T: LiteralValue> = TypeValidator<T>;

export type NullValidator = TypeValidator<null>;
export type VoidValidator = TypeValidator<void>;
export type BooleanValidator = TypeValidator<boolean>;
export type NumberValidator = TypeValidator<number>;
export type StringValidator = TypeValidator<string>;
export type MixedValidator = TypeValidator<mixed>;

export type TypeAssertError = { expected: string, actual: string, scope: string };
export type AssertionContext = { assertion?: boolean };

export type TypeValidatorsOf2<T, U> = [
  TypeValidator<T>,
  TypeValidator<U>
];

export type TypeValidatorsOf3<T, U, V> = [
  TypeValidator<T>,
  TypeValidator<U>,
  TypeValidator<V>
];

export type TypeValidatorsOf4<T, U, V, Z> = [
  TypeValidator<T>,
  TypeValidator<U>,
  TypeValidator<V>,
  TypeValidator<Z>,
];

export type TypeValidatorsOf5<T, U, V, Z, X> = [
  TypeValidator<T>,
  TypeValidator<U>,
  TypeValidator<V>,
  TypeValidator<Z>,
  TypeValidator<X>
];


export const isNil = is.isNil;
export const isNull = is.isNull;
export const isUndef = is.isUndef;
export const isBoolean = is.isBoolean;
export const isNumber = is.isNumber;
export const isString = is.isString;
export const isObject = is.isObject;

export const isType = utils.isType;
export const typeOf = utils.typeOf;
export const getType = utils.getType;
export const type = utils.type;

export const TypeValidatorError = error.TypeValidatorError;
export const validatorError = error.validatorError;
