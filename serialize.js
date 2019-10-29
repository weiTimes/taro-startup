/*
 * @Author: yewei
 * @Date: 2019-10-28 16:05:27
 * @Last Modified by: yewei
 * @Last Modified time: 2019-10-28 17:04:37
 *
 * 控制台信息序列化
 */

const stringifyError = value => {
  const err = {
    stack: value.stack,
    message: value.message,
    name: value.name
  };

  for (const i in value) {
    if (Object.prototype.hasOwnProperty.call(value, i)) {
      err[i] = value[i];
    }
  }

  return err;
};

export { stringifyError };
