// @flow
const { getType } = require('./utils')
import type { TypeValidator } from './'

class TypeValidatorError extends Error {
  expectedType: string
  valueType: string
  value: string
  typeScope: string
  sourceFile: string

  constructor (
    message: ?string,
    expectedType: string,
    valueType: string,
    value: string,
    typeName: string = '',
    typeScope: ?string = '',
  ) {
    const errMessage = message ||
      `invalid "${valueType}" value type; ${typeName || expectedType} type expected`
    super(errMessage)
    this.expectedType = expectedType
    this.valueType = valueType
    this.value = value
    this.typeScope = typeScope || ''
    this.sourceFile = this.getSourceFile()
    this.message = `${errMessage}\n${this.getErrorInfo()}`
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
exports.TypeValidatorError = TypeValidatorError

exports.validatorError = <T>(
  typeFn: TypeValidator<T>,
  value: mixed,
  scope: ?string,
  message?: string,
  expectedType?: string,
  valueType?: string
): TypeValidatorError => {
    return new TypeValidatorError(
      message,
      expectedType || getType(typeFn),
      valueType || typeof value,
      typeof value === 'string' ? JSON.stringify(value) : '',
      typeFn.name,
      scope
    )
  }
