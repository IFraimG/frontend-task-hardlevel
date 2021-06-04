module.exports = {
  root: true,
  env: {
    node: true,
    browser: true
  },
  extends: [
    "plugin:vue/vue3-recommended", 
    "eslint:recommended", 
    "@vue/typescript/recommended", 
    "@vue/prettier", 
    "@vue/prettier/@typescript-eslint"
  ],
  plugins: ["vue", "prettier"],
  rules: {
    // "vue/attributes-order": 0,
    // "@typescript-eslint/explicit-module-boundary-types": 0,
    // "explicit-module-boundary-types": 0,
    // "vue/no-multiple-template-root": 0,
    "prefer-const": 0,
    "issing-whitespace-between-attributes": 0
  }
}
