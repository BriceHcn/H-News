import React, { Component } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { View,StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import List from './components/List';

const Drawer = createDrawerNavigator();

const CatList = ["General","Entertainment","Business","Health","Science","Sports","Technology"]
export default class App extends Component {
  
    constructor(props) {
        super(props);

    }

    componentDidMount() {
    }
    
    render() {
        return ( 
        <View style = {styles.container}>
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="General">
            {
              //category drawer screen
              CatList.map((item) => {
                return (
                  <Drawer.Screen key={item} name={item} component={List} initialParams={{category : item }}/>
                  //TODO voir pourquoi category ne marche pas 
                )
            })
          }
            <Drawer.Screen key={"favorites"} name={"Favorites"} component={List} initialParams={{category : 'item' }}/>
            <Drawer.Screen key={"later"} name={"For later"} component={List} initialParams={{category : 'item2'}}/>
            
          </Drawer.Navigator>
        </NavigationContainer>
        <StatusBar></StatusBar>
        </View>
        );
    }
};
const styles = StyleSheet.create({
  container: { 
    flex: 1, paddingTop: 0, backgroundColor: '#FFFFFF',
  }
});




