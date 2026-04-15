// @flow

import * as array from "./array.js";
import * as literals from "./literals.js";
import * as map from "./map.js";
import * as _maybe from "./maybe.js";
import * as _mixed from "./mixed.js";
import * as _object from "./object.js";
import * as primitives from "./primitives.js";
import * as tuple from "./tuple.js";
import * as union from "./union.js";

export const nil = primitives.nil;
export const null_t = primitives.nil;
export const undef = primitives.undef;
export const undefined_t = primitives.undef;
export const boolean = primitives.boolean;
export const number = primitives.number;
export const string = primitives.string;

export const literalOf = literals.literalOf;
export const literal = literals.literal;

export const maybe = _maybe.maybe;

export const mixed = _mixed.mixed;

export const object = _object.object;
export const objectOf = _object.objectOf;
export const optional = _object.optional;

export const arrayOf = array.arrayOf;

export const tupleOf = tuple.tupleOf;
export const tupleOf1 = tuple.tuple1;
export const tupleOf2 = tuple.tuple2;
export const tupleOf3 = tuple.tuple3;
export const tupleOf4 = tuple.tuple4;
export const tupleOf5 = tuple.tuple5;
export const tupleOf6 = tuple.tuple6;

export const unionOf = union.unionOf;
export const unionOf2 = union.union2;
export const unionOf3 = union.union3;
export const unionOf4 = union.union4;
export const unionOf5 = union.union5;
export const unionOf6 = union.union6;

export const mapOf = map.mapOf;

