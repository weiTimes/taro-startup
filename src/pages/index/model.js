import { getUser } from './service';

export default {
  namespace: 'index',
  state: {
    isShowPanel: false,
    name: ''
  },

  effects: {
    *getUser({}, { call, put }) {
      const data = yield call(getUser);

      if (data.result) {
        yield put({
          type: 'save',
          payload: {
            name: data.result.name
          }
        });
      }
    }
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    }
  }
};
