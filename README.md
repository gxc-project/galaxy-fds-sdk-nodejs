# galaxy-fds-sdk-nodejs
## demo 
```
const id = 'your id'
const key = 'your secrect key'
let fds = new FDS(id,key, url) // url 机房

// 查看buckets列表
fds.list_buckets((data) => {
  console.log(data)
}).catch(a => {
  console.log('error happend')
})

// 查看某buckect下所有objects
fds.list_objects(bucket_name,(res) => {
  console.log(res.data)
})

// 文件重命名
fds.rename_object(bucket_name,src_object_name,dst_object_name,cb)

// 上传文件
fds.put_object(bucket_name,object_name,'file content',cb)

// 删除文件
fds.delete_objects(bucket_name,object_name,cb)
```
