// @flow
const { error } = require('../utils')

import type {
  TypeValidator,
  TypeValidatorsOf2,
  TypeValidatorsOf3,
  TypeValidatorsOf4,
  TypeValidatorsOf5
} from '..'

exports.unionOf2 =
  <T, U>(...typeFuncs: TypeValidatorsOf2<T, U>): TypeValidator<T | U> =>
    (v: mixed) => {
      try { return typeFuncs[0](v) } catch (_) {}
      try { return typeFuncs[1](v) } catch (_) {}
      throw error('union', typeof v)
    }

exports.unionOf3 =
  <T, U, V>(...typeFuncs: TypeValidatorsOf3<T, U, V>): TypeValidator<T | U | V> =>
    (v: mixed) => {
      try { return typeFuncs[0](v) } catch (_) {}
      try { return typeFuncs[1](v) } catch (_) {}
      try { return typeFuncs[2](v) } catch (_) {}
      throw error('union', typeof v)
    }

exports.unionOf4 =
  <T, U, V, Z>(...typeFuncs: TypeValidatorsOf4<T, U, V, Z>): TypeValidator<T | U | V | Z> =>
    (v: mixed) => {
      try { return typeFuncs[0](v) } catch (_) {}
      try { return typeFuncs[1](v) } catch (_) {}
      try { return typeFuncs[2](v) } catch (_) {}
      try { return typeFuncs[3](v) } catch (_) {}
      throw error('union', typeof v)
    }

exports.unionOf5 =
  <T, U, V, Z, X>(...typeFuncs: TypeValidatorsOf5<T, U, V, Z, X>): TypeValidator<T | U | V | Z | X> =>
    (v: mixed) => {
      try { return typeFuncs[0](v) } catch (_) {}
      try { return typeFuncs[1](v) } catch (_) {}
      try { return typeFuncs[2](v) } catch (_) {}
      try { return typeFuncs[3](v) } catch (_) {}
      try { return typeFuncs[4](v) } catch (_) {}
      throw error('union', typeof v)
    }
