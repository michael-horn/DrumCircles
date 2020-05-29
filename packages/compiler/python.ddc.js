define(['dart_sdk'], function(dart_sdk) {
  'use strict';
  const core = dart_sdk.core;
  const dart = dart_sdk.dart;
  const dartx = dart_sdk.dartx;
  var python = Object.create(dart.library);
  const CT = Object.create(null);
  dart.trackLibraries("packages/compiler/python", {
    "package:compiler/python.dart": python
  }, {
  }, '{"version":3,"sourceRoot":"","sources":[],"names":[],"mappings":"","file":"python.ddc.js"}');
  // Exports:
  return {
    python: python
  };
});

//# sourceMappingURL=python.ddc.js.map
