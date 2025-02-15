// eslint-define-config可以幫助我們做語法提示
const { defineConfig } = require('eslint-define-config')

module.exports = defineConfig({
  // ESLint 一旦發現配置文件中有 "root": true，它就會停止往父級目錄中尋找。
  root: true,
  env: {
    browser: true,
    amd: true,
    node: true,
    es2021: true,
  },
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly',
    $: 'readonly',
    jQuery: 'readonly',
    _: 'readonly',
    lodash: 'readonly',
  },
  // 引用的插件  下載的插件去掉eslint-plugin-前綴引入
  plugins: ['vue', 'react', 'tailwindcss', 'import', 'node', 'promise', '@typescript-eslint'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: require.resolve('@typescript-eslint/parser'),
    extraFileExtensions: ['.vue'],
    ecmaFeatures: {
      jsx: true
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:tailwindcss/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  settings: {
    tailwindcss: {
      removeDuplicates: true,
      officialSorting: true,
      prependCustom: true,
    }
  },
  rules: {
    eqeqeq: ['warn'],
    semi: ['error', 'never', { beforeStatementContinuationChars: 'always' }],
    'comma-dangle': ['error', 'only-multiline'],
    camelcase: ['warn'],
    'no-unused-vars': ['warn'],
    'no-undef': ['warn'],
    '@typescript-eslint/no-unused-vars': ['warn'],
    '@typescript-eslint/no-explicit-any': ['warn'],
    'no-new': ['warn'],
    // 'prefer-const': ['error', {
    // ignoreReadBeforeAssign: true
    // }],
    // 'no-useless-return': ['off'],
    'import/no-absolute-path:': 'off', // 不知為何無作用
    // 'import/no-unresolved': 'off',
    // 'import/extensions': 'off',
    // 'import/no-extraneous-dependencies': 'off',

    quotes: ['warn', 'single', { allowTemplateLiterals: true }],
    'quote-props': ['error', 'as-needed'],

    'function-call-argument-newline': ['error', 'consistent'],
    'function-paren-newline': ['error', 'consistent'],

    'space-before-function-paren': [
      'error', {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always'
      }
    ],
    'space-before-blocks': ['error', 'never'],
    'padded-blocks': ['off'],
    'arrow-spacing': ['error', { before: false, after: false }],
    'template-curly-spacing': ['off'],
    // 'object-property-newline': [
    //     'error',
    //     { allowAllPropertiesOnSameLine: true },
    // ],
    'array-element-newline': ['error', 'consistent'],

    'object-curly-newline': [
      'error',
      {
        multiline: true,
        consistent: true
      }
    ],
    'array-bracket-newline': ['error', 'consistent'],

    // 'array-bracket-spacing': ['error', 'always'],
    // 'object-curly-spacing': ['error', 'always'],

    // 'key-spacing': ['error', { afterColon: true }],
    // 'keyword-spacing': [
    //     'error',
    //     {
    //         before: false,
    //         after: false,
    //     }
    // ],

    indent: [
      'warn',
      2,
      {
        ignoredNodes: ['JSXAttribute', 'JSXSpreadAttribute', 'TemplateLiteral'],
        SwitchCase: 1,
        VariableDeclarator: 'first',
        MemberExpression: 0,
        // FunctionDeclaration: { body: 1, parameters: 1 },
        // FunctionExpression: { body: 1, parameters: 1 },
        // CallExpression: { arguments: 1 },
      },
    ],
    'operator-linebreak': ['warn', 'before'],

    // from eslint-plugin-vue
    '@typescript-eslint/no-empty-object-type': ['warn'],
    'vue/valid-attribute-name': ['off'],
    'vue/max-attributes-per-line': ['off'],
    'vue/prop-name-casing': ['off'],
    'vue/order-in-components': ['off'],
    'vue/return-in-computed-property': ['off'],
    'vue/one-component-per-file': ['off'],
    'vue/multi-word-component-names': ['off'],
    'vue/html-self-closing': [
      'error', {
        html: {
          void: 'always',
          normal: 'never',
          component: 'always',
        },
      },
    ],
    'vue/singleline-html-element-content-newline': ['off'],
    'vue/html-indent': [
      'warn',
      2,
      {
        attribute: 0,
        alignAttributesVertically: false,
        // baseIndent: 1,
        // closeBracket: 1,
        // ignores: ['pre', 'textarea', 'span'],
      },
    ],
    'vue/html-closing-bracket-newline': [
      'error', {
        singleline: 'never',
        multiline: 'never'
      }
    ],
    'vue/first-attribute-linebreak': ['off'],
    'vue/no-mutating-props': ['warn'],
    'vue/attribute-hyphenation': ['off'],
    'vue/multiline-html-element-content-newline': ['off'],

    // from eslint-plugin-react
    'react/jsx-uses-react': ['off'],
    'react/jsx-indent-props': ['error', 0],
    'react/jsx-closing-bracket-location': ['error', 'after-props'],
    'react/jsx-tag-spacing': ['error', {
      beforeSelfClosing: 'always',
    }],
    'react/jsx-curly-spacing': ['error', { when: 'never' }],
    'react/jsx-equals-spacing': ['error', 'never'],
    'react/jsx-curly-newline': [
      'error', {
        multiline: 'consistent',
        singleline: 'forbid',
      }
    ],

    // from eslint-plugin-tailwind
    'tailwindcss/no-custom-classname': 'off',
    'tailwindcss/classnames-order': ['warn']
  },
})
