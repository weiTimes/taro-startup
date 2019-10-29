/*
 * @Author: yewei
 * @Date: 2019-10-28 14:50:46
 * @Last Modified by: yewei
 * @Last Modified time: 2019-10-28 15:23:04
 *
 * 上报日志
 * 五种级别输出 debug/info/warn/error/fatal
 */
import Taro from '@tarojs/taro';

// 用户调试的详细信息
const debug = (name, option) => {
  report(name, option, 'debug');
};
// 感兴趣的信息
const info = (name, option) => {
  report(name, option, 'info');
};
// 警告信息
const warn = (name, option) => {
  report(name, option, 'warn');
};
// 错误信息
const error = (name, option) => {
  report(name, option, 'error');
};
// 致命信息 会导致应用无法运行
const fatal = (name, option) => {
  report(name, option, 'fatal');
};

const report = (name, option, type = 'info') => {
  try {
    const deviceInfo = JSON.stringify(Taro.getSystemInfoSync());
    const time = new Date();
    // const userInfo = Taro.getStorageInfoSync('userInfo'); // 用户信息

    if (type === 'info') {
      console.log(time, name, option, deviceInfo);
    } else {
      console.error(time, name, option, deviceInfo);
    }
  } catch (e) {
    console.log('not support sysinfo', e.message);
  }
};

export default {
  debug,
  info,
  warn,
  error,
  fatal
};
