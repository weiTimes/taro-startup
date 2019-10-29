## 目录设计
创建目录
`mkdir -p src/asset/{libs,image} src/utils`

## 特点
 * 状态管理使用Dva
 * UI库使用Taro-ui
 * 样式管理使用Scss
 * 封装request get请求，给url添加时间戳防止浏览器缓存
 * 弱网请求失败时自动发起api重试
 * 异常日志上报封装，五种级别输出。
    1. 设备信息
    2. 用户信息
    3. name 错误名称
    4. option 错误输出内容
 * 上报收集日志
   sentry
   fundebug