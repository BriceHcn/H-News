import React, { Component } from 'react';
import { ActivityIndicator, FlatList, View,StyleSheet, Linking,Text } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Article from './Article';

export default class List extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            isLoading: true
        };
    }

    async getNewsFromApi() {
        try {
            const response = await fetch('https://newsapi.org/v2/top-headlines?category='+this.props.route.name.toLowerCase()+'&country=fr&apiKey=c5362b90a1e54df5a3fc3f381ce21edc');
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

    componentDidMount() {
        this.getNewsFromApi();
    }
    
    onArticlePressed(item){
      Linking.canOpenURL(item.url).then(supported => {
        if (supported) {
          Linking.openURL(item.url);
        } else {
          console.log("Don't know how to open URI: " + this.props.url);
        }
      });
    }

    
  

    render() {
        return ( 
        <View style = {styles.container}>
          {this.state.isLoading ? <ActivityIndicator/> : 
          <FlatList data = { this.state.data }
                    keyExtractor = {(item, index) => index.toString() }
                    renderItem = {({ item }) => (
                      <TouchableOpacity onPress={() => this.onArticlePressed(item)}>
                        <View>
                          <Article article = { item }></Article>
                        </View>
                      </TouchableOpacity>
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



