## 目录设计
创建目录
`mkdir -p src/asset/{libs,image} src/utils`

## 特点
 * 封装request get请求，给url添加时间戳防止浏览器缓存
 * 封装request post Content-Type 分类请求
 * 弱网请求失败时自动发起api重试
 * 异常日志上报封装，五种级别输出。
    1. 设备信息
    2. 用户信息
    3. name 错误名称
    4. option 错误输出内容
 * 上报收集日志
   sentry
   fundebug
 * 深度序列化错误error控制台上报
 * 登录流程
 * 用户授权后更新用户信息流程
 * 设计createApiAction自动dispatch优化开发体验
 * 改造actionType支持庞大业务
 * Action三种ActionType的集合
 * 简化reducers的swich繁琐操作
 * 增加request的状态