import Taro from '@tarojs/taro';
import queryString from 'query-string';

import { HTTP_STATUS } from '../constants/statusCode';

const METHOD_GET = 'get';
const METHOD_POST = 'post';
const TRY_AGAIN_COUNT = 3; // 请求失败后重试次数

const getApi = (url, params) => {
  let thisParam = { ...params };
  if (!thisParam._timestamp) {
    thisParam._timestamp = Date.now();
  }
  let requestUrl = genUrl(url, thisParam);

  let config = {
    method: METHOD_GET,
    url: requestUrl
  };

  return requestApi(config);
};

const postApi = (url, params) => {
  let config = {
    method: METHOD_POST,
    header: {
      'Content-Type': 'application/json' // x-www-form-urlencoded
    },
    data: JSON.stringify(params),
    url: url
  };

  return requestApi(config);
};

const postFormApi = (url, params) => {
  let config = {
    method: METHOD_POST,
    header: {
      'Content-Type': 'application/x-www-form-urlencoded' // x-www-form-urlencoded
    },
    data: encodeParams(params),
    url: url
  };

  return requestApi(config);
};

const requestApi = (config, tryAgainCount = TRY_AGAIN_COUNT) => {
  // 失败后重试 3次
  // 添加 token
  const token = Taro.getStorageSync('token');
  const header = Object.assign({}, config.header, { token });

  return Taro.request({ ...config, header })
    .then(res => {
      if (res.statusCode === HTTP_STATUS.SUCCESS) {
        return res.data;
      } else {
        if (tryAgainCount) {
          requestApi(config, tryAgainCount - 1);
        }
      }
    })
    .catch(e => {
      if (tryAgainCount) {
        requestApi(config, tryAgainCount - 1);
      }
      // error('request_api_err'); // 上报日志、打印控制台
    });
};

const genUrl = (url, params) => {
  let paramStr = queryString.stringify(params);
  let splitChar = url.indexOf('?') === -1 ? '?' : '&';
  return url + splitChar + paramStr;
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

export { getApi, postApi, postFormApi };
