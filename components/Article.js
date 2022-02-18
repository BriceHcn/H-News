import React from 'react';
import { Text, View, Image, StyleSheet, Linking } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default class Article extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    viewWebPressed(item){
        Linking.canOpenURL(item).then(supported => {
          if (supported) {
            Linking.openURL(item);
          } else {
            console.log("Don't know how to open URI: " + item);
          }
        });
      }

    
      async addFavorite(){
        //storing data
        try {
          const value =await AsyncStorage.getItem('favorites')
          //deja des elements
          if(value!=null){
            let tab = JSON.parse(value)
            let set = new Set(tab)
            set.add(this.props.article)
            await AsyncStorage.setItem('favorites', JSON.stringify(Array.from(set)))
          }
          //pas encore d'elements
          else{
            let set = new Set()
            set.add(this.props.article)
            await AsyncStorage.setItem('favorites', JSON.stringify(Array.from(set)))
          }
        } catch (e) {
          alert(e)
        }
      }

      

    render() {
        return (
    <Card style={styles.container}>
        <Card.Title title={this.props.article.source.name} subtitle={ this.props.article.author}/>
        <Card.Content>
            {/* <Title></Title> */}
        </Card.Content>
        <Card.Cover source={{ uri: this.props.article.urlToImage == null ? "https://cdn.iconscout.com/icon/free/png-256/news-1661516-1410317.png" : this.props.article.urlToImage }} />
        <Paragraph>{this.props.article.title}</Paragraph>
        <Card.Actions styles={styles.cardActions}>
            <Button onPress={() => this.viewWebPressed(this.props.article.url)}>Voir en ligne</Button>
            <Button onPress={() => this.addFavorite()}>Ajouter au favoris</Button>
        </Card.Actions>
  </Card>      
        );
    }

}

const styles = StyleSheet.create({
    container: {
    flexDirection:"row",
      marginTop: 10,
      marginLeft: 5,
      marginRight : 5,
    },
    cardActions: {
    }
  })