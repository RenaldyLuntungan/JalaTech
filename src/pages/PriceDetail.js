import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import moment from 'moment';

class PriceDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      isLoading: true,
    };
  }

  componentDidMount = () => {
    this.fetchItem();
  };

  fetchItem = () => {
    const {itemId} = this.props.route.params;
    return fetch(
      'https://app.jala.tech/api/shrimp_prices/' +
        itemId +
        '?search&with=creator,species,region',
    )
      .then(response => response.json())
      .then(responseJson => {
        var currencyList = [];
        for (var i = 0; i < 1; i++) {
          var currency = responseJson;
          currencyList.push(currency);
        }
        console.log(currencyList);
        this.setState({
          isLoading: false,
          dataSource: currencyList,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  itemCoponent = ({item}) => {
    const formatDate = moment(item.data.updated_at).format('DD MMMM, YYYY');
    return (
      <View style={styles.contentContainer}>
        <View style={styles.contentSeparator} />
        <View style={styles.contentSpecies}>
          <Text style={styles.textTitle}>
            Spesies : {item.data.species.name}
          </Text>
          <Text style={styles.textPlace}>{item.data.region.full_name}</Text>
        </View>
        <View style={styles.contentSeparator} />
        <View style={styles.priceContainer}>
          <View style={styles.priceWrapper}>
            <Text>Harga ukuran 120</Text>
            <Text style={styles.textPrice}>Rp.{item.data.size_120}</Text>
          </View>
          <View style={styles.priceWrapper}>
            <Text>Harga ukuran 110</Text>
            <Text style={styles.textPrice}>Rp.{item.data.size_110}</Text>
          </View>
          <View style={styles.priceWrapper}>
            <Text>Harga ukuran 100</Text>
            <Text style={styles.textPrice}>Rp.{item.data.size_100}</Text>
          </View>
          <View style={styles.priceWrapper}>
            <Text>Harga ukuran 90</Text>
            <Text style={styles.textPrice}>Rp.{item.data.size_90}</Text>
          </View>

          <View style={styles.priceWrapper}>
            <Text>Harga ukuran 80</Text>
            <Text style={styles.textPrice}>Rp.{item.data.size_80}</Text>
          </View>
          <View style={styles.priceWrapper}>
            <Text>Harga ukuran 70</Text>
            <Text style={styles.textPrice}>Rp.{item.data.size_70}</Text>
          </View>
          <View style={styles.priceWrapper}>
            <Text>Harga ukuran 60</Text>
            <Text style={styles.textPrice}>Rp.{item.data.size_60}</Text>
          </View>
          <View style={styles.priceWrapper}>
            <Text>Harga ukuran 50</Text>
            <Text style={styles.textPrice}>Rp.{item.data.size_50}</Text>
          </View>
          <View style={styles.priceWrapper}>
            <Text>Harga ukuran 40</Text>
            <Text style={styles.textPrice}>Rp.{item.data.size_40}</Text>
          </View>
          <View style={styles.priceWrapper}>
            <Text>Harga ukuran 30</Text>
            <Text style={styles.textPrice}>Rp.{item.data.size_30}</Text>
          </View>
        </View>
        <View style={styles.contentSeparator} />
        <View style={styles.tableContainer}>
          <Text style={styles.titleTable}>Perkembangan Harga Udang</Text>
          <LineChart
            data={{
              labels: [
                '120',
                '110',
                '100',
                '90',
                '80',
                '70',
                '60',
                '50',
                '40',
                '30',
              ],
              datasets: [
                {
                  data: [
                    item.data.size_120,
                    item.data.size_110,
                    item.data.size_100,
                    item.data.size_90,
                    item.data.size_80,
                    item.data.size_70,
                    item.data.size_60,
                    item.data.size_50,
                    item.data.size_40,
                    item.data.size_30,
                  ],
                },
              ],
            }}
            width={350} // from react-native
            height={300}
            yAxisLabel={'Rp'}
            chartConfig={{
              backgroundColor: 'white',
              backgroundGradientFrom: 'white',
              backgroundGradientTo: 'white',
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => 'blue',
              labelColor: (opacity = 1) => 'black',
              style: {
                borderRadius: 16,
              },
            }}
            bezier
            style={styles.chartStyle}
          />
        </View>
        <View style={styles.contentSeparator} />
        <View style={styles.contentContact}>
          <Text style={styles.textTitle}>Kontak :</Text>
          <Text>{item.data.contact}</Text>
        </View>
        <View style={styles.contentSeparator} />
        <View style={styles.contentNote}>
          <Text style={styles.textTitle}>Catatan :</Text>
          <Text>{item.data.remark}</Text>
        </View>
        <View style={styles.contentSeparator} />
        <View style={styles.contentDate}>
          <Text style={styles.textTitle}>Diedit pada :</Text>
          <Text>
            {formatDate} oleh {item.data.creator.name}
          </Text>
        </View>
        <View style={styles.contentSeparator} />
      </View>
    );
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      );
    } else if (this.state.isError) {
      return (
        <View style={styles.loadingContainer}>
          <Text>Terjadi Error Saat Memuat Data</Text>
        </View>
      );
    }
    return (
      <View>
        <FlatList
          data={this.state.dataSource}
          renderItem={this.itemCoponent}
          keyExtractor={(item, index) => index.toString()}
          onRefresh={this.fetchItem}
          refreshing={this.state.isLoading}
        />
      </View>
    );
  }
}
export default PriceDetail;

const styles = StyleSheet.create({
  contentContainer: {flex: 1, backgroundColor: 'white'},
  loadingContainer: {alignItems: 'center', justifyContent: 'center', flex: 1},
  contentSeparator: {backgroundColor: '#e6ebff', height: 10},
  contentSpecies: {
    width: '100%',
    height: 70,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  textTitle: {fontSize: 12, color: '#95979e', paddingBottom: 3},
  textPlace: {fontSize: 14, fontWeight: 'bold', color: '#5965ff'},
  priceContainer: {width: '100%', height: 500},
  priceWrapper: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
  },
  textPrice: {fontWeight: 'bold'},
  tableContainer: {
    width: '100%',
    height: 350,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  titleTable: {alignSelf: 'flex-start', fontWeight: 'bold', marginBottom: 5},
  tableContent: {
    width: '100%',
    height: 300,
    backgroundColor: 'red',
  },
  contentContact: {
    width: '100%',
    height: 70,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  contentNote: {
    width: '100%',
    height: 150,
    paddingTop: 5,
    paddingHorizontal: 20,
  },
  contentDate: {
    width: '100%',
    height: 70,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  chartStyle: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'grey',
  },
});
