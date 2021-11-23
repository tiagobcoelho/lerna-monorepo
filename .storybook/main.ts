// module.exports = {
//   core: {
//     builder: "webpack5"
//   },
//   "stories": [
//     "../packages/**/*.stories.mdx",
//     "../packages/**/*.stories.@(js|jsx|ts|tsx)"
//   ],
//   "addons": [
//     "@storybook/addon-links",
//     "@storybook/addon-essentials"
//   ],
//   typescript: {
//     check: false,
//     checkOptions: {},
//     reactDocgen: 'react-docgen-typescript',
//     reactDocgenTypescriptOptions: {
//       shouldExtractLiteralValuesFromEnum: true,
//       propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
//     },
//   },
// }

import { WebpackOptionsNormalized } from "webpack";

import path from "path";

export default {
  stories: ["../**/*.mdx", "../**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  core: {
    builder: "webpack5",
  },
  webpackFinal: async (config: WebpackOptionsNormalized) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    config.module.rules.push({
      test: /\.scss$/,
      use: ["style-loader", "css-loader", "sass-loader"],
      include: path.resolve(__dirname, "../"),
    });

    // Return the altered config
    return config;
  },
};
