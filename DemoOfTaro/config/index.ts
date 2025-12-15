import { type UserConfigExport } from "@tarojs/cli";
import { UnifiedWebpackPluginV5 } from "weapp-tailwindcss/webpack";
import path from "node:path";

export default (function (merge, env) {
  const config: UserConfigExport<"webpack5"> = {
    projectName: "DemoOfTaro",
    alias: {
      "@": path.resolve(__dirname, "../src"),
    },
    sass: {
    },
    designWidth: 750,
    deviceRatio: {
      375: 2,
      640: 2.34 / 2,
      750: 1,
      828: 1.81 / 2,
    },
    sourceRoot: "src",
    outputRoot: "dist",
    plugins: [],
    defineConstants: {},
    copy: {
      patterns: [],
      options: {},
    },
    framework: "react",
    compiler: {
      type: "webpack5",
      prebundle: {
        exclude: [],
      },
    },
    cache: {
      enable: false, // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
    },
    mini: {
      postcss: {
        pxtransform: {
          enable: true,
          config: {},
        },
        cssModules: {
          enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: "module", // 转换模式，取值为 global/module
            generateScopedName: "[name]_[local]_[hash:base64:5]",
          },
        },
      },
      webpackChain(chain) {
        chain.merge({
          plugin: {
            install: {
              plugin: UnifiedWebpackPluginV5,
              args: [{
                // 这里可以传参数
                rem2rpx: true,
                cssEntries: [
                  // 你 @import "weapp-tailwindcss"; 那个文件绝对路径
                  path.resolve(__dirname, '../src/app.css'),
                ],
              }],
            },
          },
        })
      },
    },
  };
  if (env.mode === "development") {
    config.logger = {
      quiet: false,
      stats: true,
    };
  }
  return config
}) satisfies UserConfigExport<"webpack5">;
