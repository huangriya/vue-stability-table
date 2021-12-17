function clientTextUser (fn) {
  // 调用skd的逻辑
  
  let result
  xxx.then(function(data) {

    // 处理result的逻辑
    

    // 调用fn函数并传入result
    fn && fn(result)
  }, function(e) {
    // 你的逻辑


    // 调用fn函数并传入result
    fn && fn(result)
  })
  
}


clientTextUser(function(result) {

  // 这里获取result
  console.log(result)
})