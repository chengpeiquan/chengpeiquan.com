import fs from 'fs-extra'
import {
  parse,
  compileScript,
  // compileStyle,
  compileTemplate,
} from '@vue/compiler-sfc'

export default function compiler(filePath: string) {
  // console.log('filePath', filePath)
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  // console.log('fileContent', fileContent)

  // 解析文件
  const ast = parse(fileContent)
  // console.log('ast', ast)
  // console.log(ast.descriptor.styles);

  const id = 'temp'

  // 编译模板
  const { code: template } = compileTemplate({
    id,
    filename: `${id}.vue`,
    source: ast.descriptor.template.content,
    // ssr: true,
  })
  // console.log('compileTemplate', template)

  // 编译脚本
  const { content: script } = compileScript(ast.descriptor, { id })
  // console.log('compileScript', script)

  // 编译样式
  // const r = compileStyle({

  //   id,
  //   filename: `${id}.vue`,
  //   source: ast.descriptor.styles[0].content,
  // })
  // console.log('compileStyle', r)

  return {
    fileContent,
    ast,
    template,
    script,
  }
}
