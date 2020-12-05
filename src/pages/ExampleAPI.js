import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Axios from 'axios';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      isLoading: true,
      isError: false,
    };
  }

  // Mount User Method
  componentDidMount() {
    this.getGithubUser();
  }

  //   Get Api Users
  getGithubUser = async () => {
    try {
      const response = await Axios.get(
        'https://app.jala.tech/api/shrimp_prices/7',
      );
      this.setState({isError: false, isLoading: false, data: response.data});
    } catch (error) {
      this.setState({isLoading: false, isError: true});
    }
  };

  renderItem(data) {
    console.log('render');
    console.log(this.data);
    return (
      <View style={styles.viewList}>
        <View style={{backgroundColor: 'red'}}>
          <Text>tanggal</Text>
          <Text style={styles.textItemLogin}>{item.remark}</Text>
        </View>
      </View>
    );
  }
  render() {
    //  If load data
    if (this.state.isLoading) {
      return (
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
          <ActivityIndicator size="large" color="red" />
        </View>
      );
    }
    // If data not fetch
    else if (this.state.isError) {
      return (
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
          <Text>Terjadi Error Saat Memuat Data</Text>
        </View>
      );
    }
    console.log(this.state.data);
    // If data finish load
    return (
      <View>
        <Text>ayam</Text>

        <FlatList
          data={this.state.data}
          keyExtractor={item => item.id.toString()}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewList: {
    height: 100,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#DDD',
    alignItems: 'center',
  },
  textItemLogin: {
    fontWeight: 'bold',
    textTransform: 'capitalize',
    marginLeft: 20,
    fontSize: 16,
  },
  textItemUrl: {
    fontWeight: 'bold',
    marginLeft: 20,
    fontSize: 12,
    marginTop: 10,
    color: 'blue',
  },
});
