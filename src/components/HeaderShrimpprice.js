import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

class HeaderShrimpprice extends Component {
  render() {
    return (
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View
          style={{
            flex: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 20, fontWeight: '600'}}>Harga Udang</Text>
          <Text style={{fontSize: 11, color: 'grey'}}>Ukuran 50</Text>
        </View>
        <View style={{flex: 1}}></View>
      </View>
    );
  }
}
export default HeaderShrimpprice;
