import React from 'react';
import {  StyleSheet, Linking,ToastAndroid } from 'react-native';
import { Button, Card, Paragraph } from 'react-native-paper';
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

      articleInTab(tab){
        let a=false
        tab.forEach(element => {
          if(element.title === this.props.article.title){
            a=true
          }
        });
        return a;
      }
    
      async addtoStorage(storage){
        //storing data
        try {
          const value =await AsyncStorage.getItem(storage)
          //deja des elements
          if(value!=null){
            let tab = JSON.parse(value)

            //si tableau contient déja l'article
            if(this.articleInTab(tab)){
              ToastAndroid.show('déja ajouté !', ToastAndroid.SHORT);
            }else{
              
              tab.unshift(this.props.article)
              await AsyncStorage.setItem(storage, JSON.stringify(tab))
            }
          }
          //pas encore d'elements
          else{
            let tab = [this.props.article]
            await AsyncStorage.setItem(storage, JSON.stringify(tab))
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
            <Button onPress={() => this.viewWebPressed(this.props.article.url)}>Voir +</Button>
            <Button onPress={() => this.addtoStorage('favorites')}>Ajouter au favoris</Button>
            <Button onPress={() => this.addtoStorage('later')}>Lire plus tard</Button>
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