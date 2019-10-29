import Taro from '@tarojs/taro';

import { BASE_URL } from '../constants/config';

const TRY_AGAIN_COUNT = 3; // 请求失败后重试次数

const request = (
  options = {
    url: '', // *
    method: 'GET', // *
    params: {}, // *
    tryAgainCount: TRY_AGAIN_COUNT,
    type: 'json' // json / form
  }
) => {
  const { url, method, tryAgainCount, type } = options;
  let { params } = options;
  const token = Taro.getStorageSync('token');

  let header = {
    'Content-Type':
      type === 'form' ? 'application/x-www-form-urlencoded' : 'application/json'
  };

  if (token) {
    header = {
      ...header,
      token
    };
  }
  if (method === 'GET') {
    // 加入时间戳，放置浏览器缓存
    params = {
      ...params,
      _timestamp: Date.now()
    };
  }
  if (type === 'form') {
    params = encodeParams(params);
  }

  return Taro.request({
    url: BASE_URL + url,
    data: params,
    header,
    method: method.toUpperCase()
  }).then(res => {
    const { statusCode, data } = res;
    const { code, message } = data;

    if (statusCode >= 200 && statusCode < 300) {
      if (code !== '0') {
        // 业务处理失败
        Taro.showToast({
          title: `${message}~` || code,
          icon: 'none',
          mask: true
        });
      }
      return data;
    } else {
      if (tryAgainCount > 0) {
        // 重试机制
        request({
          ...options,
          tryAgainCount: tryAgainCount - 1
        });
      } else {
        throw new Error(`网络请求错误，状态码${statusCode}`);
      }
    }
  });
};

const encodeParams = params => {
  let paramArr = [];

  Object.keys(params).forEach(key => {
    if (typeof params[key] !== 'undefined') {
      paramArr.push(`${key}=${encodeURIComponent(params[key])}`);
    }
  });

  return paramArr.join('&');
};

export default request;
