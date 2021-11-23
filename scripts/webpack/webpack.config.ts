import path from 'path';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { getEntryPoints } from './get-entry-points';
import { getDirectories } from './get-directories';
import { Configuration, config } from 'webpack';
import nodeExternals from 'webpack-node-externals';
import { getEnv } from '../../env';

const packagesRoot = "packages/";

const packageDistFolder = "dist/";

const packageBypassFolder = "src/";

const packageFolders = getDirectories(packagesRoot);

const derivedConfig = (
  packageDir: string,
  packageDistDir: string,
  bypassPaths: string
): ReturnType<typeof config.getNormalizedWebpackOptions> => {
  return config.getNormalizedWebpackOptions({
    // Set webpack with the same mode as defined on commands
    // TODO: see diferences between different modes
    mode: getEnv("NODE_ENV") as Configuration["mode"],
    // TODO: remove
    devtool: false,
    //Entry point
    entry: getEntryPoints(`${packageDir}/`, "src/*.tsx", bypassPaths),
    // Dist or lib TODO: check with Abel
    output: {
      publicPath: "./",
      path: path.resolve(process.cwd(), `./${packageDir}/${packageDistDir}`),
      chunkFormat: "commonjs",
      library: {
        type: "commonjs"
      },
      filename:"[name].js",
    },

    //Module resolution
    // TODO: lookup
    resolve: {
      extensions:[".ts", ".tsx", "./js"],
      preferRelative: true,
      //Search only for modules inside each package
      modules: [path.resolve(process.cwd(), `./${packageDir}/node_modules`)],
    },
    target: "node",
    //https:github.com/liady/webpack-node-externals
    // TODO: lookup
    externalsPresets: { node: true }, // in order to ignore built-in modules like path, fs, etc
    // TODO: lookup
    externals: [
      // in order to ignore all modules in node_modules folder
      nodeExternals({
        // Allow bundling library modules
        // allowlist: (name) => name.includes("@advicefront"), --> advicefront specific
        // Exclude all remaining modules
        additionalModuleDirs: [
          //in order to ignore all modules in packages/**/node_modules folder
          path.resolve(process.cwd(), `./${packageDir}/node_modules`)
        ],
      }),
    ],
    // Rules
    // TODO: search how rules/loaders work
    module: {
      rules: [
        {
          // Compile typescript
          test: /\.(ts)x?$/,
          use: [
            {
              // https://github.com/TypeStrong/ts-loader
              loader: "ts-loader",
              options: {},
            },
          ],
        },
        {
          // Compile Sass
          test: /\.scss$/,
          use: ["style-loader", "css-loader", "sass-loader"]
        }
      ]
    },
    // TODO: search how plugins work
    plugins: [new CleanWebpackPlugin()],
  });
};


const webpackEntries = packageFolders.map((folder) =>
  derivedConfig(
    `${packagesRoot}${folder}`,
    packageDistFolder,
    packageBypassFolder
  )
);

export default [webpackEntries]