import Editor from '@monaco-editor/react'
import { Button, Card, Col, Row } from 'antd'
import { parser, transpiler } from '@vielang/parser'
import { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const [program, setProgram] = useState('')
  const [result, setResult] = useState('')
  const onCompile = () => {
    const code = 'khai báo tên = "Viên";'
    const ast = parser.parse(code)
    console.log(ast, '\n', '=======================')
    const _program = transpiler.compile(program)
    console.log(_program)
    setResult(_program.target)
  }
  function handleEditorChange(value: any, event: any) {
    setProgram(value)
    // here is the current value
  }

  return (
    <Card>
      <Row>
        <Col span={12}>
          <Editor
            onChange={handleEditorChange}
            height='90vh'
            defaultLanguage='javascript'
            defaultValue='// some comment'
          />
        </Col>
        <Col span={2}>
          <Button onClick={onCompile}>compile</Button>
        </Col>
        <Col span={10}>{JSON.parse(JSON.stringify(result))}</Col>
      </Row>
      {/* {routeElements} */}
      <ToastContainer
        position='top-right'
        autoClose={5000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        theme='light'
      />
    </Card>
  )
}

export default App
