// start.js
require("babel-register")({
  presets: [
    "es2015",
    "stage-0"
  ],
  plugins: ["transform-runtime"]
});
require("babel-polyfill")

require('./main.js');