import React, { Component } from 'react';
import Axios from 'axios';
import { StyleSheet, FlatList, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';

class ListPeople extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      isLoading: true,
      isError: false
    };
  }

  componentDidMount() {
    this.getGithubUser()
  }

  getGithubUser = async () => {
    try {            
      let alldata;
      const response = await Axios.get('https://swapi.dev/api/people/');
      const countdata = Math.ceil(response.data.count / 10);
      const datatotal = response.data.results;
      alldata = datatotal;

      for(let i=1; i < countdata; i++){
        let x = i+1;
        const response2 = await Axios.get('https://swapi.dev/api/people/?page='+x);
        alldata = alldata.concat(response2.data.results);        
      }            
      
      this.setState({ 
        isError: false, 
        isLoading: false, 
        data: alldata
      })
      
    } catch (error) {
      this.setState({ isLoading: false, isError: true })
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View
          style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}
        >
          <ActivityIndicator size='large' color='red' />
        </View>
      )
    } else if (this.state.isError) {
      return (
        <View
          style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}
        >
          <Text>Terjadi Error Saat Memuat Data</Text>
        </View>
      )
    }

    return (
      <FlatList
        data={this.state.data}
        renderItem={({ item, index }) =>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Detail People', { id: index + 1 })}>
            <View style={styles.viewList}>
              <View>
                <Text style={styles.textItemLogin}> {item.name}</Text>
              </View>
            </View>
          </TouchableOpacity>
        }
        keyExtractor={({ name }, index) => index}
      />
    );
  }
}

const styles = StyleSheet.create({
  viewList: {
    height: 100,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#DDD',
    alignItems: 'center'
  },
  textItemLogin: {
    fontWeight: 'bold',
    textTransform: 'capitalize',
    marginLeft: 20,
    fontSize: 16
  },
  textOther: {
    fontWeight: 'bold',
    textTransform: 'capitalize',
    marginLeft: 20,
    fontSize: 14,
    color: '#555555'
  },
  textItemUrl: {
    fontWeight: 'bold',
    marginLeft: 20,
    fontSize: 12,
    marginTop: 10,
    color: 'blue'
  }, 
  detaiiView: {
    flex: 1,
    alignItems: 'center',
  },
  ImageDetail: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 20
  },
  viewContent: {
    marginTop: 50,
  },
})

export default ListPeople;