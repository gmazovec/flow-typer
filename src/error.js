// @flow
import { getType } from './utils.js'
import type { TypeValidator } from './'

export class TypeValidatorError extends Error {
  expectedType: string
  valueType: string
  value: string
  typeScope: string
  sourceFile: string

  constructor (
    message: string,
    expectedType: string,
    valueType: string,
    value: string,
    typeName: string = '',
    typeScope: ?string = '',
  ) {
    super(message)
    this.expectedType = expectedType
    this.valueType = valueType
    this.value = value
    this.typeScope = typeScope || ''
    this.sourceFile = this.getSourceFile()
    this.message = `${message}\n${this.getErrorInfo()}`
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, TypeValidatorError)
    }
  }

  getSourceFile (): string {
    const fileNames = this.stack.match(/(\/[\w_\-.]+)+(\.\w+:\d+:\d+)/g) || []
    return fileNames.find(fileName => fileName.indexOf('/flow-typer-js/dist/') === -1) || ''
  }

  getErrorInfo (): string {
    return `
    file     ${this.sourceFile}
    scope    ${this.typeScope}
    expected ${this.expectedType.replace(/\n/g, '')}
    type     ${this.valueType}
    value    ${this.value}
`
  }
}

TypeValidatorError.prototype.name = 'TypeValidatorError'

export const validatorError = <T>(
  typeFn: TypeValidator<T>,
  value: mixed,
  scope: ?string,
  message?: string,
  expectedType?: string,
  valueType?: string
): TypeValidatorError => {
    valueType = valueType !== null && valueType !== undefined && valueType !== '' ? valueType : typeof value;
    expectedType = expectedType !== null && expectedType !== undefined && expectedType !== '' ? expectedType : getType(typeFn);
    message = message !== null && message !== undefined && message !== '' ? message : `invalid "${valueType}" value type; ${typeFn.name || expectedType} type expected`;
    return new TypeValidatorError(
      message,
      expectedType,
      valueType,
      typeof value === 'string' ? JSON.stringify(value) : '',
      typeFn.name,
      scope
    )
  }
