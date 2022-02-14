import React, { Component } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { View,StyleSheet,Text } from 'react-native';
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
              CatList.map((item) => {
                return (
                  <Drawer.Screen key={item} category={item} name={item} component={List}/>
                  //TODO voir pourquoi category ne marche pas 
                )
            }) 
            }
          </Drawer.Navigator>
        </NavigationContainer>
        </View>
        );
    }
};
const styles = StyleSheet.create({
  container: { 
    flex: 1, paddingTop: 0, backgroundColor: '#FFFFFF',
  }
});




