export default {
  namespace: 'index',
  state: {
    isShowPanel: false
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    }
  }
};
