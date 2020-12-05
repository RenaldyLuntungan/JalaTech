import React, {Component} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Entypo';
import IconFilter from 'react-native-vector-icons/Ionicons';
import IconSort from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';

class ShrimpPrice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      dataRegion: [],
      isLoading: true,
      idRegion: 11,
      nameRegion: 'ACEH',
      page: 1,
      pageRegion: 1,
      isModalVisible: false,
    };
    this.arrayholder = [];
  }

  componentDidMount = () => {
    this._fetchItem(this.state.page, this.state.idRegion);
    this._fetchRegion(this.state.pageRegion);
    this._fetchMoreRegion(this.state.pageRegion);
  };

  _fetchMore = () => {
    this.setState(
      prevState => ({
        page: prevState.page + 1,
      }),
      () => {
        this._fetchItem();
      },
    );
  };

  _fetchMoreRegion = () => {
    this.setState(
      prevStateRegion => ({
        pageRegion: prevStateRegion.pageRegion + 1,
      }),
      () => {
        this._fetchRegion();
      },
    );
  };

  _fetchItem = () => {
    const {page} = this.state;
    const {idRegion} = this.state;

    console.log(idRegion);
    return fetch(
      'https://app.jala.tech/api/shrimp_prices?search&with=creator,species,region&sort=size_50|creator.name,desc&region_id=' +
        idRegion +
        '&page=' +
        page +
        '',
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false,
          dataSource: this.state.dataSource.concat(responseJson.data),
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  _fetchRegion = () => {
    const {pageRegion} = this.state;
    return fetch(
      'https://app.jala.tech/api/regions?&scope=province&page=' +
        pageRegion +
        '',
    )
      .then(res => res.json())
      .then(resJson => {
        this.setState(
          {
            isLoading: false,
            dataRegion: this.state.dataRegion.concat(resJson.data),
          },
          () => {
            this.arrayholder = this.arrayholder.concat(resJson.data);
          },
        );
      })
      .catch(error => {
        console.error(error);
      });
  };

  searchData(text) {
    const newData = this.arrayholder.filter(item => {
      const itemData = item.name.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    this.setState({
      dataRegion: newData,
      text: text,
    });
  }

  refreshItem() {
    this.setState(
      {
        dataSource: [],
        page: 1,
        isLoading: true,
        isModalVisible: false,
      },
      () => {
        this._fetchItem();
      },
    );
  }
  _itemCoponent = ({item}) => {
    const formatDate = moment(item.updated_at).format('DD MMMM, YYYY');
    return (
      <View style={styles.contentContainer}>
        <View style={styles.leftContent}>
          <Text style={styles.textPrice}>Rp.{item.size_50}</Text>
          <Text style={styles.textPlace}>{item.region.full_name}</Text>
          <Text style={styles.textDate}>
            {formatDate} oleh {item.creator_name}
          </Text>
        </View>

        <View style={styles.rightContent}>
          <Icon name="share" size={20} color={'#95979e'} />
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('PriceDetail', {
                itemId: item.id,
              });
            }}>
            <Text style={styles.textDate}>Harga Lengkap ></Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  _itemCoponentRegion = ({item}) => {
    return (
      <View style={styles.mainContainer}>
        <TouchableOpacity
          style={styles.regionWrapper}
          onPress={() => {
            this.refreshItem(),
              this.setState({idRegion: item.id, nameRegion: item.full_name});
          }}>
          <Text style={styles.text}>{item.full_name}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  _separatorComponent = () => {
    return <View style={styles.contentSeparator} />;
  };

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
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
      <View style={styles.mainContainer}>
        <View style={styles.flatPriceContainer}>
          <FlatList
            data={this.state.dataSource}
            renderItem={this._itemCoponent}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={this._separatorComponent}
            onEndReached={this._fetchMore}
            onEndReachedThreshold={0.5}
          />
        </View>

        <View style={styles.contentContainer}>
          <TouchableOpacity
            style={styles.filterContainer}
            activeOpacity={0.8}
            underlayColor="navy"
            onPress={this.toggleModal}>
            <IconFilter name="filter" size={20} color={'#4d50f0'} />
            <View style={styles.filterSortingWrapper}>
              <Text style={{color: 'white', fontSize: 19}}>Filter Lokasi</Text>
              <Text style={{color: 'white', fontSize: 10}}>
                {this.state.nameRegion}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sortingContainer}
            activeOpacity={0.8}
            underlayColor="navy">
            <IconSort name="sort" size={20} color={'#2e30b0'} />
            <View style={styles.filterSortingWrapper}>
              <Text style={{color: 'white', fontSize: 19}}>Urutkan</Text>
              <Text style={{color: 'white', fontSize: 10}}>Termurah</Text>
            </View>
          </TouchableOpacity>
        </View>

        <Modal
          isVisible={this.state.isModalVisible}
          onBackdropPress={() => this.setState({isModalVisible: false})}
          style={styles.modalContainer}>
          <View style={styles.modalWrapper}>
            <KeyboardAvoidingView behavior="height" style={styles.contentModal}>
              <View style={{flexDirection: 'row', paddingHorizontal: 20}}>
                <TextInput
                  style={styles.inputModal}
                  onChangeText={text => this.searchData(text)}
                  value={this.state.text}
                  underlineColorAndroid="transparent"
                  placeholder="Cari Daerah"
                  placeholderTextColor="#95979e"
                />
                <Text
                  style={{paddingLeft: 20, paddingTop: 7, color: '#95979e'}}>
                  Batal
                </Text>
              </View>
              <Text style={styles.chooseContainer}>Pilih Daerah :</Text>
              <View style={{height: 300, width: '100%', paddingHorizontal: 20}}>
                <FlatList
                  data={this.state.dataRegion}
                  renderItem={this._itemCoponentRegion}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
              <View style={styles.resetContainer}>
                <TouchableOpacity
                  style={styles.resetWrapper}
                  onPress={() => {
                    this.refreshItem(),
                      this.setState({idRegion: 11, nameRegion: 'ACEH'});
                  }}>
                  <Text style={{color: 'white'}}>Reset Filter</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </View>
        </Modal>
      </View>
    );
  }
}
export default ShrimpPrice;

const styles = StyleSheet.create({
  mainContainer: {flex: 1},
  flatPriceContainer: {flex: 10},
  regionWrapper: {flex: 1, height: 30},
  contentContainer: {flex: 1, flexDirection: 'row'},
  filterContainer: {
    flex: 1,
    backgroundColor: '#2e30b0',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterSortingWrapper: {flexDirection: 'column', paddingLeft: 10},
  sortingContainer: {
    flex: 1,
    backgroundColor: '#4d50f0',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftContent: {
    backgroundColor: 'white',
    flex: 5,
    height: 115,
    justifyContent: 'space-around',
    paddingLeft: 20,
    flexDirection: 'column',
  },

  rightContent: {
    flex: 2,
    backgroundColor: 'white',
    paddingRight: 20,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingVertical: 10,
  },

  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  },
  modalWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
  },
  contentModal: {
    height: 450,
    backgroundColor: '#2e3099',
    paddingTop: 20,
  },
  inputModal: {
    width: '80%',
    height: 40,
    backgroundColor: '#2e3084',
    borderRadius: 4,
    marginBottom: 20,
    color: 'white',
    paddingLeft: 20,
  },
  chooseContainer: {
    marginBottom: 5,
    paddingHorizontal: 20,
    color: 'white',
  },
  resetContainer: {
    width: '100%',
    height: 50,
    backgroundColor: '#2e3084',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  resetWrapper: {
    width: '100%',
    height: 40,
    borderWidth: 0.5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
  },
  text: {color: '#95979e'},

  textPrice: {fontSize: 20, fontWeight: '600'},

  textPlace: {fontSize: 11, color: '#4d50f0', fontWeight: '600'},

  textDate: {fontSize: 11, color: '#95979e'},

  contentSeparator: {backgroundColor: 'grey', height: 0.5},

  loadingContainer: {alignItems: 'center', justifyContent: 'center', flex: 1},
});
