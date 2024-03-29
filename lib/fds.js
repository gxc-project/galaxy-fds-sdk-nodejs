
const getAuthorization = require('./authorization')
const Common = require('./common')
const request = require('axios')
class FDS {
  constructor(id,key,url) {
    this.id = id
    this.key = key
    this.url = url
    this.request = request
    this.request.interceptors.request.use((req) => {
      req.headers[Common.DATE] = new Date().toGMTString()
      let authorization = getAuthorization(id, key, req)
      req.headers[Common.AUTHORIZATION] = authorization
      return req
    })
    this.request.interceptors.response.use(res => {
      return res
    },err => {
      return Promise.reject(err)
    })

  }
  listBuckets(cb) {
    return this.request.get(`http://${this.url}`).then(cb)
  }
  listObjects(bucket_name,cb){
    return this.request.get(`http://${this.url}/${bucket_name}?prefix=&delimiter=/`).then(cb)
  }
  renameObject(bucket_name,src_object_name,dst_object_name,cb) {
    return this.request({
      url: `http://${this.url}/${bucket_name}/${src_object_name}?renameTo=${dst_object_name}`,
      method: 'put',
      headers:{
        "content-type":'application/octet-stream'
      }
    }).then(cb)
  }
  putObject(bucket_name,object_name,data,cb) {
    return this.request({
      url: `http://${this.url}/${bucket_name}/${object_name}`,
      data,
      method: 'put',
      headers:{
        "content-type":'application/octet-stream'
      }
    }).then(cb)

  }
  deleteObject(bucket_name,object_name,cb) {
    return this.request({
      url: `http://${this.url}/${bucket_name}/${object_name}`,
      method: 'delete',
    }).then(cb)
  }
}
module.exports = FDS
