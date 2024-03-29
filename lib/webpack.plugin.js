let FDS = require('./fds')

class MiFdsWebpackPlugin {
  constructor(config){
    this.id = config.id
    this.key = config.key
    this.url = config.url
    this.bucket = config.bucket
    this.fds = new FDS(this.id,this.key,this.url)
  }
  apply(compiler){
    console.log('hello world dsds')
    compiler.plugin('emit', (compilation, callback) => {
      for (let filename in compilation.assets) {
        let content = compilation.assets[filename]['_value']
        this.fds.putObject(this.bucket,filename,content, res => {
          console.log(res.data)
        })
      }
      // compilation.assets['filelist.md'] = {
      //   source: function() {
      //     return filelist;
      //   },
      //   size: function() {
      //     return filelist.length;
      //   }
      // };
      callback();
    });

  }
}


module.exports = MiFdsWebpackPlugin
