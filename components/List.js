import React, { useEffect,useState } from 'react';
import { ActivityIndicator, FlatList, View,StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Article from './Article';

function List({ route, ...props }){

  const [data,setData] = useState('');
  const [isLoading,setIsLoading] = useState(false);

//first load
useEffect(()=>{
       getData()   
},[]);

//when screen focused
useFocusEffect(
  React.useCallback(() => {
    getData();
  }, [])
);

//all my function used 
    const getData = () =>{
      if(route.name==="Favorites"){
        getStorage("favorites");
     }
     else if(route.name==="For later"){
       getStorage("later");
     }
     else{
       getNewsFromApi(route.params.category);
     }
    }

    const getNewsFromApi = async (category) => {
        try {
            const response = await fetch('https://newsapi.org/v2/top-headlines?category='+category.toLowerCase()+'&country=fr&apiKey=c5362b90a1e54df5a3fc3f381ce21edc');
            const json = await response.json();
            setData(json.articles);
            setIsLoading(true);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
            
        }
    }

const getStorage = async (storage) => {
        try {
          const value = await AsyncStorage.getItem(storage)
          if(value !== null){
            setData(JSON.parse(value));
            setIsLoading(true);
          }
      } catch (error) {
          console.log(error);
      } finally {
        setIsLoading(false); 
      }
}
  
const styles = StyleSheet.create({
  container: { 
    flex: 1, paddingTop: 0, backgroundColor: '#FFFFFF',
  }
});

//rendered part
return ( 
  <View style = {styles.container}>
    {
    isLoading ? <ActivityIndicator/> : 
    <FlatList data = { data }
              keyExtractor = {(item, index) => index.toString() }
              renderItem = {({ item }) => (
                  <View>
                    <Article article = { item }></Article>
                  </View>
              )}/>
    }
  </View>
  );
}
export default List;



