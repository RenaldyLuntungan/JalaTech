import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import JalaLogo from '../images/logoclean.png';
import Icon from 'react-native-vector-icons/Entypo';

class HomePage extends Component {
  HomepageForm = () => {
    this.props.navigation.navigate('ShrimpPrice');
  };
  render() {
    return (
      <View style={styles.contentContainer}>
        <Image source={JalaLogo} style={styles.imageContainer} />

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={this.HomepageForm}>
          <Icon name="credit" color="#1f9fff" size={20} />
          <Text style={styles.textContent}>Harga Udang</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
export default HomePage;
const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5965ff',
  },
  imageContainer: {width: 140, height: 40, marginBottom: 40},
  buttonContainer: {
    width: 150,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#5915ff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContent: {marginLeft: 10, color: 'white'},
});
