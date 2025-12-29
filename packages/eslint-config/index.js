import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import configPrettier from 'eslint-config-prettier'

/**
 * 这是一个通用的 ESLint 配置工厂函数
 */
export const factory = (options = {}) => {
  const { react = false, vue = false } = options
  
  return tseslint.config(
    // 1. 基础 JS/TS 规则
    js.configs.recommended,
    ...tseslint.configs.recommended,
    
    // 2. 忽略文件
    {
      ignores: ['**/dist/**', '**/node_modules/**', '**/.turbo/**'],
    },
    
    // 3. Vue 逻辑 (仅当 vue 选项为 true 时生效)
    ...(vue ? [
      ...pluginVue.configs['flat/recommended'],
      {
        files: ['**/*.vue'],
        languageOptions: {
          parserOptions: {
            parser: tseslint.parser,
            extraFileExtensions: ['.vue'],
            sourceType: 'module',
          },
        },
      }
    ] : []),
    
    // 4. React 逻辑
    ...(react ? [
      {
        files: ['**/*.{tsx,jsx}'],
        plugins: {
          'react': pluginReact,
          'react-hooks': pluginReactHooks,
        },
        settings: { react: { version: 'detect' } },
        rules: {
          ...pluginReact.configs.recommended.rules,
          ...pluginReactHooks.configs.recommended.rules,
          'react/react-in-jsx-scope': 'off', // React 17+ 不需要引入 React
        },
      }
    ] : []),
    
    // 5. 强制关闭与 Prettier 冲突的规则 (必须放在最后)
    configPrettier
  )
}