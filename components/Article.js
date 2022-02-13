import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';

export default class Article extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return ( 
        <View style={styles.container}>
            <Image source = {{ uri: this.props.article.urlToImage }}
            style={styles.img}/> 
            <Text style={styles.text}>{this.props.article.title}, {this.props.article.author} </Text> 
        </View>
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
    img: {
        width: 70, 
        height: 70,
    },
    text:{
        flex:1,
        flexWrap:'wrap',
    }
  })