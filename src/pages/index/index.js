import Taro, { Component } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { AtButton } from 'taro-ui';

import './index.scss';

@connect(({ index, loading }) => ({
  ...index,
  ...loading
}))
class Index extends Component {
  config = {
    navigationBarTitleText: '首页'
  };

  componentWillMount() {
    // 登录
    // const token = Taro.getStorageSync('token');
    // if(!token) {
    //   login().then(res => {
    // 查询、存储用户信息
    // });
    // }
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  toggleShow = () => {
    const { dispatch, isShowPanel } = this.props;

    dispatch({
      type: 'index/save',
      payload: {
        isShowPanel: !isShowPanel
      }
    });
    dispatch({
      type: 'index/getUser'
    });
  };

  render() {
    const { isShowPanel, name } = this.props;

    return (
      <View className='index'>
        <View>
          <Text>Hello, World</Text>
        </View>
        <Button onClick={this.toggleShow}>切换</Button>
        {isShowPanel && <View>我显示了</View>}
        <Text>{name}</Text>
        <Button
          className='dec_btn'
          onGetUserInfo={data => {
            console.log(data.detail.userInfo, '保存用户信息data');
          }}
          open-type='getUserInfo'
        >
          更新用户信息
        </Button>
        <AtButton type='primary'>我是taro-ui的按钮</AtButton>
      </View>
    );
  }
}

export default Index;
