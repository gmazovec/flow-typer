// @flow
import { getType } from '../utils.js'
import { validatorError, validatorTypeError } from '../error.js'
import { deprwarn, string, number } from '../index.js'

import type { TypeValidator } from '..'

export const unionOf: Union2TypeValidator = function unionOf_ (va, vb) {
  deprwarn('calling unionOf is deprecated; fallback to unionOf2; use validators with arity, ex. unionOf2, ... unionOf6', 'FT003')
  return union2(va, vb)
}

type Union2TypeValidator = <A, B> (TypeValidator<A>, TypeValidator<B>) => TypeValidator<A | B>

export const union2: Union2TypeValidator = function (va, vb) {
  const type = () => `(${getType(va)} | ${getType(vb)})`;
  function union (value: mixed, _scope: string = '') {
    try {
      return va(value, _scope)
    } catch (_) {
      try {
        return vb(value, _scope)
      } catch (_) {
        throw validatorTypeError('union', type(), value, _scope)
      }
    }
  }
  union.type = type;
  union.value = () => va.value() ?? vb.value();
  return union
}

type Union3TypeValidator = <A, B, C> (TypeValidator<A>, TypeValidator<B>, TypeValidator<C>) => TypeValidator<A | B | C>

export const union3: Union3TypeValidator = function (va, vb, vc) {
  function union (value: mixed, _scope: string = '') {
    try {
      return va(value, _scope)
    } catch (_) {
      try {
        return vb(value, _scope)
      } catch (_) {
        try {
          return vc(value, _scope)
        } catch (_) {
          throw validatorTypeError('union', type(), value, _scope)
        }
      }
    }
  }
  union.type = () => `${getType(va)} | ${getType(vb)} | ${getType(vc)}`
  union.value = () => va.value() ?? vb.value() ?? vc.value();
  return union
}

type Union4TypeValidator = <A, B, C, D> (TypeValidator<A>, TypeValidator<B>, TypeValidator<C>, TypeValidator<D>) => TypeValidator<A | B | C | D>

export const union4: Union4TypeValidator = function (va, vb, vc, vd) {
  function union (value: mixed, _scope: string = '') {
    try {
      return va(value, _scope)
    } catch (_) {
      try {
        return vb(value, _scope)
      } catch (_) {
        try {
          return vc(value, _scope)
        } catch (_) {
          try {
            return vd(value, _scope)
          } catch (_) {
            throw validatorTypeError('union', type(), value, _scope)
          }
        }
      }
    }
  }
  union.type = () => `${getType(va)} | ${getType(vb)} | ${getType(vc)} | ${getType(vd)}`
  union.value = () => va.value() ?? vb.value() ?? vc.value() ?? vd.value();
  return union
}

type Union5TypeValidator = <A, B, C, D, E> (TypeValidator<A>, TypeValidator<B>, TypeValidator<C>, TypeValidator<D>, TypeValidator<E>) => TypeValidator<A | B | C | D | E>

export const union5: Union5TypeValidator = function (va, vb, vc, vd, ve) {
  function union (value: mixed, _scope: string = '') {
    try {
      return va(value, _scope)
    } catch (_) {
      try {
        return vb(value, _scope)
      } catch (_) {
        try {
          return vc(value, _scope)
        } catch (_) {
          try {
            return vd(value, _scope)
          } catch (_) {
            try {
              return ve(value, _scope)
            } catch (_) {
              throw validatorTypeError('union', type(), value, _scope)
            }
          }
        }
      }
    }
  }
  union.type = () => `${getType(va)} | ${getType(vb)} | ${getType(vc)} | ${getType(vd)} | ${getType(ve)}`
  union.value = () => va.value() ?? vb.value() ?? vc.value() ?? vd.value() ?? ve.value();
  return union
}

type Union6TypeValidator = <A, B, C, D, E, F> (TypeValidator<A>, TypeValidator<B>, TypeValidator<C>, TypeValidator<D>, TypeValidator<E>, TypeValidator<F>) => TypeValidator<A | B | C | D | E | F>

export const union6: Union6TypeValidator = function (va, vb, vc, vd, ve, vf) {
  function union (value: mixed, _scope: string = '') {
    try {
      return va(value, _scope)
    } catch (_) {
      try {
        return vb(value, _scope)
      } catch (_) {
        try {
          return vc(value, _scope)
        } catch (_) {
          try {
            return vd(value, _scope)
          } catch (_) {
            try {
              return ve(value, _scope)
            } catch (_) {
              try {
                return vf(value, _scope)
              } catch (_) {
                throw validatorTypeError('union', type(), value, _scope)
              }
            }
          }
        }
      }
    }
  }
  union.type = () => `(${getType(va)} | ${getType(vb)}) | ${getType(vc)} | ${getType(vd)} | ${getType(ve)} | ${getType(vf)}`
  union.value = () => va.value() ?? vb.value() ?? vc.value() ?? vd.value() ?? ve.value() ?? vf.value();
  return union
}

