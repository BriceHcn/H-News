import React, { Component } from 'react';
import { ActivityIndicator, FlatList, View,StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Article from './Article';

export default class List extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            isLoading: true
        };
    }
    componentDidMount() {
      this.focusListener = this.props.navigation.addListener('focus',
       () => { 
               //alert('focus is called'); 
               if(this.props.route.name==="Favorites"){
                 this.getFavorites();
              }else{
                this.getNewsFromApi(this.props.route.name);
              }
       }
     );
    }
 

    

    async getNewsFromApi(category) {
        try {
            const response = await fetch('https://newsapi.org/v2/top-headlines?category='+category.toLowerCase()+'&country=fr&apiKey=c5362b90a1e54df5a3fc3f381ce21edc');
            const json = await response.json();
            this.setState({ 
              data: json.articles,
              isLoading:true});
        } catch (error) {
            console.log(error);
        } finally {
            this.setState({ isLoading: false });
            
        }
    }

    async getFavorites(){
        try {
          const value = await AsyncStorage.getItem('favorites')
          if(value !== null){
            this.setState({ 
              data: JSON.parse(value),
              isLoading:true});
          }

      } catch (error) {
          console.log(error);
      } finally {
          this.setState({ isLoading: false });
          
      }
      }
    

    
    render() {
        return ( 
        <View style = {styles.container}>
          {this.state.isLoading ? <ActivityIndicator/> : 
          <FlatList data = { this.state.data }
                    keyExtractor = {(item, index) => index.toString() }
                    renderItem = {({ item }) => (
                      //<TouchableOpacity onPress={() => this.onArticlePressed(item)}>
                        <View>
                          <Article article = { item }></Article>
                        </View>
                      //</TouchableOpacity>
                    )}/>
          }
        </View>
        );
    }
};
const styles = StyleSheet.create({
  container: { 
    flex: 1, paddingTop: 0, backgroundColor: '#FFFFFF',
  }
});




