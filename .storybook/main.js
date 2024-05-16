/** @type { import('@storybook/vue3-webpack5').StorybookConfig } */
const config = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-webpack5-compiler-swc",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
    "@storybook/addon-styling-webpack",
    "@storybook/addon-mdx-gfm"
  ],
  framework: {
    name: "@storybook/vue3-webpack5",
    options: {},
  },
  docs: {},
};
export default config;
