const webpack = require("webpack"),
    config = require("../webpack.config");

delete config.customConfig;

webpack(
  config,
  function (err) { if (err) throw err; }
);
