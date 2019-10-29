import Request from '../../utils/request';

export const getUser = (data = {}) =>
  Request({
    url: '/v2/data',
    method: 'POST',
    data
  });
