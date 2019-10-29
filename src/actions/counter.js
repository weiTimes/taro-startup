import Taro from '@tarojs/taro';

import { ADD, MINUS, LIST } from '../constants/counter';
import { getApi, postApi, postFormApi } from '../utils/request';
import log from '../utils/log';

export const add = () => {
  return {
    type: ADD
  };
};
export const minus = () => {
  return {
    type: MINUS
  };
};

// 异步的action
export function asyncAdd() {
  return dispatch => {
    setTimeout(() => {
      dispatch(add());
    }, 2000);
  };
}

const dataList = data => {
  return {
    type: LIST,
    payload: data
  };
};

export const getData = () => {
  return dispatch => {
    postFormApi('http://yapi.banmt.com/mock/89/v2/data', { page: 1 }).then(
      res => {
        log.info('api-data', res.result);
        dispatch(dataList(res.result));
      }
    );
  };
};

export const login = () => {
  return new Promise((resolve, reject) => {
    Taro.login({
      success: res => {
        if (res.code) {
          Taro.setStorageSync('token', 'xioa-32sfsf');
          resolve('xioa-32sfsf');
        }
      }
    });
  });
};
