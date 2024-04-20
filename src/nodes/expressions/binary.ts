import { Parser } from '@parser/parser'
import { Identifier } from '../identifier'
import { Expression } from '.'
import { Keyword } from '@parser/constants/keyword'

export class BinaryExpression {
  type = 'BinaryExpression'

  left: Identifier | Expression

  operator: string | undefined

  right: Identifier | Expression

  constructor(parser: Parser, identifier?: Identifier) {
    this.left =
      identifier ?? (parser.nextToken?.type === Keyword.IDENTIFIER ? new Identifier(parser) : new Expression(parser))

    switch (parser.nextToken?.type) {
      case '+':
      case '-':
      case '*':
      case '/':
      case '%':
      case '**':
      case '^':
      case '>':
      case '>>':
      case '>>>':
      case '<':
      case '<<':
      case '<<<':
      case '>=':
      case '<=':
      case '==':
      case '===': {
        this.operator = String(parser.validate(parser.nextToken?.type).value)
        break
      }
    }

    this.right = parser.nextToken?.type === Keyword.IDENTIFIER ? new Identifier(parser) : new Expression(parser)
  }
}