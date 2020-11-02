console.log(process.versions.node);

module.exports = {
  env: {
    development: {
      sourceMaps: 'inline',
      plugins: ['source-map-support'],
    },
  },
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: process.versions.node,
          esmodules: true,
        },
      },
    ],
  ],
};
