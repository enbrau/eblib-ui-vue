import * as fs from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import eblib from '@eblib/core'

import consola from 'consola'
import chalk from 'chalk'

// ============================================================================================ 

const pwd = dirname(fileURLToPath(import.meta.url))

const iconRootDir   = resolve(pwd, '../icons')
const targetRootDir = resolve(pwd, '../src/icons')

fs.rmSync(targetRootDir, { force: true, recursive: true })
fs.mkdirSync(targetRootDir)
consola.info(chalk.green(targetRootDir, 'cleared!'))

const globalExports = []
const subIconDirs = fs.readdirSync(iconRootDir)
for (const subIconDir of subIconDirs) {
  const path = resolve(iconRootDir, subIconDir)
  const stat = fs.statSync(path)

  if (stat.isDirectory()) {
    consola.info(chalk.green('Generating icons of', subIconDir + ':'))
    const iconFiles = fs.readdirSync(path)
    const targetDir = resolve(targetRootDir, subIconDir.toLowerCase())
    fs.mkdirSync(targetDir)

    const exports = []
    for (const iconFile of iconFiles) {
      if (iconFile.endsWith('.svg')) {
        const iconFilePath = resolve(iconRootDir, subIconDir, iconFile)
        const iconFileContent = fs.readFileSync(iconFilePath, { encoding: 'utf-8' })
        const iconCamelName = eblib.format.toCamelCase(iconFile.replace('.svg', ''), true)
        const code = 
`
<template>
  ${iconFileContent}
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: '${iconCamelName}'
})
</script>
`
        const iconCmptPath = resolve(targetDir, iconCamelName + '.vue')
        fs.writeFileSync(iconCmptPath, code)
        consola.info(chalk.green(iconCmptPath, 'created!'))

        exports.push(`export { default as ${iconCamelName} } from './${iconCamelName}.vue'`)
      }
    }

    const exportFilePath = resolve(targetDir, 'index.js')
    fs.writeFileSync(exportFilePath, exports.join('\n'))

    globalExports.push(`export * from './${subIconDir.toLowerCase()}'`)
  }
}

const globalExportFilePath = resolve(targetRootDir, 'index.js')
fs.writeFileSync(globalExportFilePath, globalExports.join('\n'))
