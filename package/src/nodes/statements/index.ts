import { Keyword } from '@parser/constants/keyword'
import { Parser } from '@parser/parser'
import { BlockStatement } from './block'
import { ExpressionStatement } from './expression'
import { ReturnStatement } from './return'

export class Statement {
  constructor(parser: Parser) {
    switch (parser.nextToken?.type) {
      case '{': {
        Object.assign(this, new BlockStatement(parser))
        break
      }
      case Keyword.RETURN: {
        Object.assign(this, new ReturnStatement(parser))
        break
      }
      default: {
        Object.assign(this, new ExpressionStatement(parser))
        break
      }
    }
  }
}