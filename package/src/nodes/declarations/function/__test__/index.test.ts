import { parserNode } from '@parser/test'
import toPlainObject from '@parser/utils/toPlainObject'
import { FunctionDeclaration } from '../index'

describe('Test for function declaration', () => {
  it('should parse the function declaration syntax normally', () => {
    const result = parserNode.parse(
      `hàm thực thi() {
        khai báo a = 1
    }`,
      FunctionDeclaration
    )
    expect(toPlainObject(result)).toStrictEqual({
      async: false,
      type: 'FunctionDeclaration',
      id: {
        type: 'Identifier',
        name: 'th_7921c_thi'
      },
      params: [],
      body: {
        type: 'BlockStatement',
        body: [
          {
            type: 'VariableDeclaration',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: {
                  type: 'NumericLiteral',
                  value: 1,
                  extra: {
                    rawValue: 1,
                    raw: '1'
                  },
                  start: 38,
                  end: 39
                },
                id: {
                  type: 'Identifier',
                  name: 'a'
                }
              }
            ],
            kind: 'let'
          }
        ]
      }
    })
  })
})
