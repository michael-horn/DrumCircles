define(['dart_sdk'], function(dart_sdk) {
  'use strict';
  const core = dart_sdk.core;
  const dart = dart_sdk.dart;
  const dartx = dart_sdk.dartx;
  const audio_tools = Object.create(dart.library);
  const CT = Object.create(null);
  dart.trackLibraries("packages/audio_tools/audio_tools", {
    "package:audio_tools/audio_tools.dart": audio_tools
  }, {
  }, '{"version":3,"sourceRoot":"","sources":[],"names":[],"mappings":"","file":"audio_tools.ddc.js"}');
  // Exports:
  return {
    audio_tools: audio_tools
  };
});

//# sourceMappingURL=audio_tools.ddc.js.map
