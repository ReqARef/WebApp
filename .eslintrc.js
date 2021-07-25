module.exports = {
    env: {
        browser: true,
        es2021: true,
        es6: true
    },
    extends: ['plugin:react/recommended'],
    parser: 'babel-eslint',
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 12,
        sourceType: 'module'
    },
    plugins: ['react'],
    rules: {
        'no-tabs': 0,
        'react/prop-types': 0
    }
}
