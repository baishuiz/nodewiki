register = function(plugin, options, next){

  if (!options.wiki){
    return next('need a nodewiki object at options.wiki');
  } 

  select = plugin.select('api');

  /* POST /api/dir */
  select.route({
    method: 'POST',
    path: '/api/dir',
    config: {
      payload: {
        allow: 'application/json'
      }
    },
    handler: function(req, rep){
      var dir = req.payload.dir;

      if (!dir) return rep({});

      options.wiki.listFiles(dir, function(err, files){
        if (err){
          return rep({});
        } else {
          return rep(files)
        }
      });
    }
  });


  /* GET /api/raw */
  select.route({
    method: 'GET',
    path: '/api/raw/{path*}',
    handler: {
      directory: {
        path: process.cwd(), //TODO: change this
        index: false,
        listing: false
      }
    }
  });

  return next();

};

register.attributes = {
  name: 'nodewiki-api',
  version: '1.0.0'
}

exports.register = register;