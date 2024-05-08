import { Keyword } from '@parser/constants/keyword'
import { Parser } from '@parser/parser'
import { Identifier } from '../identifier'
import { Literal } from '../literal'
import { AssignmentExpression } from './assignment'
import { BinaryExpression } from './binary'
import { CallExpression } from './call'
import { MemberExpression } from './member'

export class Expression {
  [key: string]: any

  constructor(parser: Parser) {
    switch (parser.nextToken?.type as string) {
      case Keyword.NUMBER:
      case Keyword.STRING:
      case Keyword.BOOLEAN:
      case Keyword.NAN:
      case Keyword.NULL:
      case Keyword.UNDEFINED: {
        Object.assign(this, new Literal(parser))
        break
      }

      case Keyword.IDENTIFIER: {
        const identifier = new Identifier(parser)
        console.log(identifier, parser.nextToken)
        switch (parser.nextToken?.type as string) {
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
            Object.assign(this, new BinaryExpression(parser, identifier))
            break
          }
          case '=': {
            Object.assign(this, new AssignmentExpression(parser, identifier))
            break
          }
          case '.': {
            const memberExpression = new MemberExpression(parser, identifier)

            switch (parser.nextToken?.type) {
              case '=': {
                Object.assign(this, new AssignmentExpression(parser, memberExpression))
                break
              }
              case '(': {
                console.log('go here')
                Object.assign(this, new CallExpression(parser, memberExpression))
                break
              }
              default: {
                Object.assign(this, memberExpression)
                break
              }
            }
            break
          }
          case '(': {
            Object.assign(this, new CallExpression(parser, identifier))
            break
          }
          default: {
            Object.assign(this, identifier)
            break
          }
        }

        break
      }
    }
  }
}
