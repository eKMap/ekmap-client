module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "commonjs": true,
        "es6": true
    },
    "plugins": ["import"],
    "root": true,
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module"
    },
    "extends": ["eslint:recommended"],
    "rules": {
        "indent": ["off", 8, {"SwitchCase": 1}],
        "no-extra-semi": "warn",
        "linebreak-style": ["warn", "windows"],
        "brace-style": ["warn", "1tbs", {"allowSingleLine": true}],
        "comma-dangle": ["error", "never"],
        "quotes": "off",
        "curly": "warn",
        "no-console": "off",
        "no-redeclare": "warn",
        "no-unused-vars": "warn",
        "constructor-super": "off",
        "no-inner-declarations": "off",
        "array-callback-return": "error",
        "no-undef": "error",
        "no-shadow-restricted-names": "error",
        "no-useless-escape": "off",
        "no-fallthrough": "warn",
        "no-eval": ["error", {"allowIndirect": true}],
        "no-prototype-builtins":"off",
        "no-useless-catch":"off",
        //Ensure imports point to a file/module that can be resolved
        "import/no-unresolved": [2, {commonjs: true, amd: true}],
        //Ensure named imports correspond to a named export in the remote file
        "import/named": 2,
        //Ensure a default export is present, given a default import
        "import/default": 2,
        //Restrict which files can be imported in a given folder
        "import/no-restricted-paths": 2,
        //Forbid import of modules using absolute paths
        "import/no-absolute-path": 2,
        //Forbid require() calls with expressions
        "import/no-dynamic-require": 2,
        //Forbid named default exports
        "import/no-named-default": 2,
        //Forbid anonymous values as default exports
        "import/no-anonymous-default-export": 2,
        //Report repeated import of the same module in multiple places
        "import/no-duplicates": 1,
        //Ensure consistent use of file extension within the import path
        "import/extensions": 1,
        //Ensure all imports appear before other statements
        "import/first": 1,
        //Enforce a newline after import statements
        "import/newline-after-import": 1,
        //Prevent importing the submodules of other modules
        "import/no-internal-modules": 0,
        //Forbid unassigned imports
        "import/no-unassigned-import": 0


    },
};