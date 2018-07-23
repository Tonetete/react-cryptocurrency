module.exports = {
  "extends": ["eslint:recommended", "plugin:prettier/recommended"],
  "plugins": ["prettier"],
  "parser": "babel-eslint",
  "rules": {
    "no-undef": 0,
    "no-console": ["warn", { allow: ["warn"] }],
    "prettier/prettier": ["error", {
      "singleQuote": true
    }]
  }
};


// const { Neutrino } = require('neutrino');

// module.exports = Neutrino()
//   .use('neutrinorc.js')
//   .call('eslintrc');

// module.exports = {
//   "extends": "eslint:recommended",
//   "rules": {
//       // enable additional rules
//       "indent": ["error", 4],
//       "linebreak-style": ["error", "unix"],
//       "quotes": ["error", "double"],
//       "semi": ["error", "always"],

//       // override default options for rules from base configurations
//       "comma-dangle": ["error", "always"],
//       "no-cond-assign": ["error", "always"],

//       // disable rules from base configurations
//       "no-console": "off",
//   }
// }

// module.exports = {
//   "extends": "airbnb",
//   "rules": {}
// };