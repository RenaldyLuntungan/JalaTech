import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

class HeaderPricedetail extends Component {
  render() {
    return (
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View
          style={{
            flex: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 20, fontWeight: '600'}}>
            Detail Harga Udang
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}>
          <Icon
            name="share"
            size={20}
            color={'grey'}
            style={{marginRight: 5}}
          />
        </View>
      </View>
    );
  }
}
export default HeaderPricedetail;
