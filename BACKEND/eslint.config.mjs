import globals from 'globals'
import pluginJs from '@eslint/js'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import eslintConfigPrettier from 'eslint-config-prettier'
export default [
    {
        files: ['**/*.js'],
        rules: { 'no-console': 'error', 'no-useless-catch': 0, quotes: ['error', 'single', { allowTemplateLiterals: true }] },
        languageOptions: { sourceType: 'commonjs' }
    },
    { languageOptions: { globals: globals.browser } },
    eslintConfigPrettier,
    eslintPluginPrettierRecommended,
    pluginJs.configs.recommended
]
