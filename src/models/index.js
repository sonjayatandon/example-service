(function(){
  'use strict';

  var logger = require('winston'),
      path = require('path'),
      _ = require('lodash'),
      fs = require('fs'),
      when = require('when');

  /// Bootstrap models
  var modelsPath = __dirname,
      cacheWarming = [],
      filesAlreadyInCache = [],
      successfulModelsLoaded = [];

  fs.readdirSync(modelsPath).forEach(function (file) {
    if (/(.*)\.(js$|coffee$)/.test(file) && path.join(modelsPath, file) !== __filename) {
      successfulModelsLoaded.push(path.join(modelsPath, file) + '\n');
      var m = require(modelsPath + '/' + file);
      if(m.warmCache !== undefined && typeof m.warmCache === 'function'){
        filesAlreadyInCache.push(path.join(modelsPath, file) + '\n');
        cacheWarming.push(m.warmCache);
      }
    }
  });

  logger.info('Models Path: %s', modelsPath);
  logger.info('Successful Models Loaded: %s\r\n%s', successfulModelsLoaded.length, successfulModelsLoaded.join(''));
  logger.info('Found Cache Warming For: %s\r\n%s', filesAlreadyInCache.length, filesAlreadyInCache.join(''));

  module.exports.warmCache = function(){
    return when
      .settle(_.map(cacheWarming, function(f){
        return f();
      }))
      .then(function(cacheWarmingResults){
        _.forEach(cacheWarmingResults, function(desc){
          if(desc.state !== 'fulfilled')
            logger.error('Cache warming error: %j', desc.reason, {});
        });

        return true;
      });
  };
})();
