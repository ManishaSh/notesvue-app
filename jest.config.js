module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/no-babel',
  //... // your previous configurations
  extensionsToTreatAsEsm: ['.ts'],
  globals: {
    'ts-jest': {
      //... // your other configurations here
      useESM: true,
    },
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  }
  }