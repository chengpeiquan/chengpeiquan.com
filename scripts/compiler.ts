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
  const parsed = parse(fileContent)
  // console.log(parsed.descriptor.styles);

  const id = 'temp'

  // 编译模板
  const { code: template } = compileTemplate({
    id,
    filename: `${id}.vue`,
    source: parsed.descriptor.template.content,
    // ssr: true,
  })
  // console.log('compileTemplate', template)

  // 编译脚本
  const { content: script } = compileScript(parsed.descriptor, { id })
  // console.log('compileScript', script)

  // 编译样式
  // const r = compileStyle({

  //   id,
  //   filename: `${id}.vue`,
  //   source: parsed.descriptor.styles[0].content,
  // })
  // console.log('compileStyle', r)

  return {
    template,
    script,
  }
}
