define(['dart_sdk'], function(dart_sdk) {
  'use strict';
  const core = dart_sdk.core;
  const math = dart_sdk.math;
  const dart = dart_sdk.dart;
  const dartx = dart_sdk.dartx;
  var uuid_util = Object.create(dart.library);
  var $floor = dartx.floor;
  var $toInt = dartx.toInt;
  var $_set = dartx._set;
  var ListOfintL = () => (ListOfintL = dart.constFn(core.List$(core.int)))();
  const CT = Object.create(null);
  var L0 = "package:uuid/uuid_util.dart";
  uuid_util.UuidUtil = class UuidUtil extends core.Object {
    static mathRNG(opts) {
      let seed = opts && 'seed' in opts ? opts.seed : -1;
      let rand = null;
      let b = ListOfintL().new(16);
      let _rand = seed === -1 ? math.Random.new() : math.Random.new(seed);
      for (let i = 0; i < 16; i = i + 1) {
        if ((i & 3) === 0) {
          rand = (dart.notNull(_rand.nextDouble()) * 4294967296)[$floor]()[$toInt]();
        }
        b[$_set](i, core.int.as(dart.dsend(dart.dsend(rand, '>>', [(i & 3) << 3]), '&', [255])));
      }
      return b;
    }
    static cryptoRNG() {
      let b = ListOfintL().new(16);
      let rand = math.Random.secure();
      for (let i = 0; i < 16; i = i + 1) {
        b[$_set](i, rand.nextInt(1 << 8));
      }
      return b;
    }
  };
  (uuid_util.UuidUtil.new = function() {
    ;
  }).prototype = uuid_util.UuidUtil.prototype;
  dart.addTypeTests(uuid_util.UuidUtil);
  dart.addTypeCaches(uuid_util.UuidUtil);
  dart.setLibraryUri(uuid_util.UuidUtil, L0);
  dart.trackLibraries("packages/uuid/uuid_util", {
    "package:uuid/uuid_util.dart": uuid_util
  }, {
  }, '{"version":3,"sourceRoot":"","sources":["uuid_util.dart"],"names":[],"mappings":";;;;;;;;;;;;;;;UAMgC;AACxB;AAAM,cAAI,iBAAU;AAEpB,kBAAS,AAAK,IAAD,KAAI,CAAC,IAAK,oBAAW,gBAAO,IAAI;AACjD,eAAS,IAAI,GAAG,AAAE,CAAD,GAAG,IAAI,IAAA,AAAC,CAAA;AACvB,YAAe,CAAV,AAAE,CAAD,GAAG,OAAS;AACyC,UAAzD,OAA0C,AAAQ,CAAvB,aAAnB,AAAM,KAAD,iBAAgB;;AAEQ,QAAvC,AAAC,CAAA,QAAC,CAAC,cAA8B,WAArB,WAAL,IAAI,SAAgB,CAAV,AAAE,CAAD,GAAG,MAAS,WAAK;;AAGrC,YAAO,EAAC;IACV;;AAIM,cAAI,iBAAU;AACd,iBAAc;AAClB,eAAS,IAAI,GAAG,AAAE,CAAD,GAAG,IAAI,IAAA,AAAC,CAAA;AACI,QAA3B,AAAC,CAAA,QAAC,CAAC,EAAI,AAAK,IAAD,SAAS,AAAE,KAAG;;AAE3B,YAAO,EAAC;IACV;;;;EACF","file":"uuid_util.ddc.js"}');
  // Exports:
  return {
    uuid_util: uuid_util
  };
});

//# sourceMappingURL=uuid_util.ddc.js.map
