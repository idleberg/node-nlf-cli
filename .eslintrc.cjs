module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:json/recommended'
  ],
	ignorePatterns: ['node_modules/**', 'bin/*'],
  overrides: [
    {
      files: ["tsconfig.json"],
      rules: {
        "json/*": ["error", "allowComments"]
      }
    }
  ]
};
