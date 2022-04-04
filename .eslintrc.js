module.exports = {
    "root": true,
    "env": {
        "node": true,
        "es2021": true
    },
    "extends": ["prettier"],
    "plugins": ["no-only-tests", "import", "jest"],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module",
    },
    overrides: [
        {
            files: ['*.ts'],
            extends: ["airbnb-typescript/base", "plugin:@typescript-eslint/recommended",],

            parserOptions: {
                project: './tsconfig.json',
                tsconfigRootDir: __dirname
            },
            rules: {
                "@typescript-eslint/comma-dangle": "off",
                "@typescript-eslint/indent": "off",
                "@typescript-eslint/restrict-plus-operands": "warn",
                "@typescript-eslint/no-floating-promises": "warn",
                "@typescript-eslint/require-await": "warn",
                "@typescript-eslint/await-thenable": "warn",
                "@typescript-eslint/unbound-method": "warn",
                "@typescript-eslint/no-unsafe-call": "warn",
                "@typescript-eslint/no-unsafe-return": "warn",
                "@typescript-eslint/no-unsafe-member-access": "warn",
                "@typescript-eslint/no-unsafe-assignment": "warn",
                "@typescript-eslint/no-unused-vars": "off",
                "@typescript-eslint/restrict-template-expressions": "warn",
                "@typescript-eslint/no-misused-promises": "warn",
                "@typescript-eslint/prefer-regexp-exec": "warn",
                "@typescript-eslint/no-redeclare": ["error"],
                "@typescript-eslint/no-use-before-define": [1],
                "no-shadow": "off",
                "@typescript-eslint/no-shadow": ["error"],
                "@typescript-eslint/no-explicit-any": "off",
                "@typescript-eslint/member-delimiter-style": 0,
                "@typescript-eslint/explicit-function-return-type": "off",
                "@typescript-eslint/no-empty-interface": "off",
                "@typescript-eslint/explicit-module-boundary-types": ["warn"],
                "@typescript-eslint/ban-ts-comment": ["error", {
                    "ts-ignore": "allow-with-description",
                    "ts-expect-error": "allow-with-description",
                    "ts-nocheck": "allow-with-description"
                }],
                "@typescript-eslint/dot-notation": "off",
                "@typescript-eslint/consistent-type-imports": ["warn", {
                    prefer: "type-imports"
                }],
                "@typescript-eslint/array-type": ["error", {
                    "default": "array"
                }],
            }
        },
    ],
    "rules": {
        "max-len": ["warn", {
            "code": 120
        }],
        "no-undef": "off",
        "no-unused-vars": "off",
        "no-redeclare": "off",
        "no-use-before-define": [0],
        "react/prop-types": "off",
        "import/named": "off",
        "import/namespace": "off",
        "import/default": "off",
        "import/no-named-as-default-member": "off",
        "dot-notation": ["error"],
        "indent": ["error", 4],
        "import/default": "error",
        "import/prefer-default-export": "off",
        "import/no-extraneous-dependencies": ["error", {
            devDependencies: ["**/*.spec.*", "**/*.stories.*", "**/__fixtures__/**/*"]
        }],
        "import/extensions": "off",
        "import/named": "error",
        "import/namespace": "error",
        "import/first": ["error"],
        "import/no-unresolved": ["error", {
            ignore: ["@abcaustralia", "@storybook", "storybook-include", "react"]
        }],
        "import/order": ["error", {
            groups: ["builtin", "external", "parent", "sibling", "index"],
            pathGroups: [{
                pattern: "react",
                group: "builtin",
                position: "before"
            }, {
                pattern: "classnames",
                group: "builtin",
                position: "after"
            }, {
                pattern: "@abcaustralia/**",
                group: "external",
                position: "after"
            }, {
                pattern: "../*.types",
                group: "parent",
                position: "after"
            }, {
                pattern: "../*.css",
                group: "parent",
                position: "after"
            }, {
                pattern: "./*.types",
                group: "sibling",
                position: "after"
            }, {
                pattern: "./*.css",
                group: "sibling",
                position: "after"
            }],
            pathGroupsExcludedImportTypes: ["react", "classnames", "@abcaustralia/**", "../*.types", "../*.css", "./*.types", "./*.css"],
            alphabetize: {
                order: "asc"
            },
            "newlines-between": "never"
        }],
        "no-only-tests/no-only-tests": ["error", {
            block: ["test", "it", "describe"],
            focus: ["only"]
        }],
        "comma-dangle": "off",
        "consistent-return": ["off", {
            treatUndefinedAsUnspecified: true
        }],
        "class-methods-use-this": "off",
        "max-classes-per-file": "off",
        "lines-between-class-members": "off",
        "prefer-destructuring": "off",
        "no-case-declarations": "off",
        "no-console": [// allow console in development
            process.env.NODE_ENV === "development" ? "warn" : "error", {
                allow: ["warn", "info", "error"]
            }],
        "no-unused-vars": ["error", {
            varsIgnorePattern: "styles",
            ignoreRestSiblings: true
        }],
        "no-underscore-dangle": "off",
        "no-continue": "off",
        "no-plusplus": "error",
    },
    "settings": {
        "import/resolver": {
            "typescript": {}
        }
    }
};
