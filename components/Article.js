import React from 'react';
import { Text, View, Image, StyleSheet, Linking } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
export default class Article extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    onArticlePressed(item){
        Linking.canOpenURL(item).then(supported => {
          if (supported) {
            Linking.openURL(item);
          } else {
            console.log("Don't know how to open URI: " + item);
          }
        });
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
            <Button onPress={() => this.onArticlePressed(this.props.article.url)}>Voir en ligne</Button>
            <Button onPress={() => alert("ajouter au favoris")}>Ajouter au favoris</Button>
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