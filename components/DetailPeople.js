import React from 'react';
import Axios from 'axios';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';

class DetailPeople extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      isLoading: true,
      isError: false
    };
  }

  componentDidMount() {
    this.getDetailGithubUser()
  }

  getDetailGithubUser = async () => {
    try {
      const id = this.props.route.params.id;
      const response = await Axios.get('https://swapi.dev/api/people/'+id);
      const resDetail = response.data;
      //get service HOMEWORLD
      if(resDetail.homeworld.length > 0 ){
        const homeworld = await Axios.get(resDetail.homeworld);
        resDetail['homeworld'] = homeworld.data.name;
      }

      //get service FILMS
      if(resDetail.films.length > 0 ){
        let arrFilm = "";
        for(let i=0; i < resDetail.films.length ; i++){
          const filmapi = await Axios.get(resDetail.films[i]);
          arrFilm += '- ' + filmapi.data.title + '\n';
        }
        resDetail['films'] = arrFilm; 
      }    

      //get service species
      if(resDetail.species.length > 0 ){
        let arrSpecies = "";
        for(let i=0; i < resDetail.species.length ; i++){
          const speciesApi = await Axios.get(resDetail.species[i]);
          arrSpecies += '- ' + speciesApi.data.name + '\n';
        }
        resDetail['species'] = arrSpecies; 
      }  

      //get service starships
      if(resDetail.starships.length > 0 ){
        let arrStarship = "";
        for(let i=0; i < resDetail.starships.length ; i++){
          const starshipApi = await Axios.get(resDetail.starships[i]);
          arrStarship += '- ' + starshipApi.data.name + '\n';
        }
        resDetail['starships'] = arrStarship; 
      }  

      //get service vehicles
      if(resDetail.vehicles.length > 0 ){
        let arrVehicles = "";
        for(let i=0; i < resDetail.vehicles.length ; i++){
          const vehiclesApi = await Axios.get(resDetail.vehicles[i]);
          arrVehicles += '- ' + vehiclesApi.data.name + '\n';
        }
        resDetail['vehicles'] = arrVehicles; 
      }  

      this.setState({ 
        isError: false,
        isLoading: false,
        data: resDetail
      })
    } catch (error) {
      this.setState({
        isLoading: false,
        isError: true
      })
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
    }else if (this.state.isError) {
      return (
        <View
          style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}
        >
          <Text>Terjadi Error Saat Memuat Data</Text>
        </View>
      )
    }

    return (
      <View style={styles.detaiiView}>
        <View style={styles.viewContent}>
          <Text style={styles.textItemLogin}>Character</Text>
          <Text style={styles.textOther}>Name : {this.state.data.name}</Text>
          <Text style={styles.textOther}>Height : {this.state.data.height}</Text>
          <Text style={styles.textOther}>Mass : {this.state.data.mass}</Text>
          <Text style={styles.textOther}>Hair Color : {this.state.data.hair_color}</Text>
          <Text style={styles.textOther}>Skin Color : {this.state.data.skin_color}</Text>
          <Text style={styles.textOther}>Birth Year : {this.state.data.birth_year}</Text>
          <Text style={styles.textOther}>Gender : {this.state.data.gender}</Text>
          
          <Text></Text>

          <Text style={styles.textItemLogin}>Homeworld</Text>
          <Text style={styles.textOther}>{this.state.data.homeworld}</Text>

          <Text></Text>

          <Text style={styles.textItemLogin}>Films</Text>
          <Text style={styles.textOther}>{this.state.data.films}</Text>

          <Text></Text>

          <Text style={styles.textItemLogin}>Species</Text>
          <Text style={styles.textOther}>{this.state.data.species}</Text>

          <Text></Text>

          <Text style={styles.textItemLogin}>Star Ships</Text>
          <Text style={styles.textOther}>{this.state.data.starships}</Text>

          <Text></Text>

          <Text style={styles.textItemLogin}>Vehicles</Text>
          <Text style={styles.textOther}>{this.state.data.vehicles}</Text>

          <Text></Text>

          <Text style={styles.textOther} >Created : {this.state.data.created}</Text>
          <Text style={styles.textOther} >Edited : {this.state.data.edited}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textItemLogin: {
    fontWeight: 'bold',
    textTransform: 'capitalize', 
    fontSize: 16
  },
  textOther: {
    fontWeight: 'bold',
    textTransform: 'capitalize', 
    fontSize: 14,
    color: '#555555'
  },
  textItemUrl: {
    fontWeight: 'bold', 
    fontSize: 12,
    marginTop: 10,
    color: 'blue'
  },
  detaiiView: {
    flex: 1,
    marginLeft: 20
  },
  viewContent: {
    marginTop: 20,
  },
})
export default DetailPeople;