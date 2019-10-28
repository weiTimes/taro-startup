import Taro, { Component } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';

import { add, minus, asyncAdd, getData } from '@/actions/counter';
import { sum } from '@/utils/index';

import './index.scss';

@connect(
  ({ counter }) => ({
    counter
  }),
  dispatch => ({
    add() {
      dispatch(add());
    },
    dec() {
      dispatch(minus());
    },
    asyncAdd() {
      dispatch(asyncAdd());
    },
    getData() {
      dispatch(getData());
    }
  })
)
class Index extends Component {
  config = {
    navigationBarTitleText: '首页'
  };

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const { counter } = this.props;
    const { list } = counter;

    console.log(list, 'list');

    return (
      <View className='index'>
        <Button className='add_btn' onClick={this.props.add}>
          +
        </Button>
        <Button className='dec_btn' onClick={this.props.dec}>
          -
        </Button>
        <Button className='dec_btn' onClick={this.props.asyncAdd}>
          async
        </Button>
        <View>
          <Text>{this.props.counter.num}</Text>
        </View>
        <View>
          <Text>Hello, World</Text>
          <Text>{sum(3, 4)}</Text>
        </View>
        <Button onClick={this.props.getData}>获取数据</Button>
        <View>{list.name}</View>
      </View>
    );
  }
}

export default Index;
