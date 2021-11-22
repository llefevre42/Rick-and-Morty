import React, { useState, useRef } from 'react';
import { Text, View, Image, ImageBackground, Dimensions, FlatList, StyleSheet, SafeAreaView, TouchableHighlight, TouchableOpacity } from 'react-native';
import GlobalStyle from "../GlobalStyle"
const styles = {
    ...GlobalStyle, ...{
     
    }
};

import {
    useQuery,
    gql
} from "@apollo/client";

const FETCH_ALL_PRODUCT = gql`
  query ($id : ID!){
    character(id: $id){
        id
        name
        status
        species
        type
        gender
        image
        origin{
            name
        }
        location{
            name
        }
        episode{
            episode
        }
    }
  }
`;



const { height } = Dimensions.get("window");
const { width } = Dimensions.get("window");


export default function Profile({ navigation, route }) {
    const { id } = route.params;
    console.log(id)
    const { loading, error, data, fetchMore } = useQuery(FETCH_ALL_PRODUCT, {
        variables: { id: id },
    });
    if (loading) {
        console.log("loading...")
        return (null)
    }
    if (error) {
        console.log("error...")
        return (null)
    }
    console.log(data.character)

    let perso = []
    if (data && data.character && data.character)
        perso = data.character

    console.log(perso.id)
    return (
        <SafeAreaView style={{ backgroundColor: "black", flex: 1 }}>
            <TouchableOpacity onPress={() => navigation.goBack(null)}>
                <Image style={{ height: 30, width: 30, marginLeft: 10, marginBottom: 20}} source={require('../img/Picto_precedent.png')}></Image>
            </TouchableOpacity>
            <View style={{ backgroundColor: "green", marginBottom: 10 }}>
                <View style={{ backgroundColor: "green", marginTop: 10 }}>
                    <View style={{ flexDirection: "row", }}>
                        <Text style={styles.pref}>Nom : </Text>
                        <Text style={styles.info}>{perso.name}</Text>
                    </View>
                    <View style={{ flexDirection: "row", }}>
                        <Text style={styles.pref}>Status : </Text>
                        <Text style={styles.info}>{perso.status}</Text>
                    </View>
                    <View style={{ flexDirection: "row", }}>
                        <Text style={styles.pref}>Espece : </Text>
                        <Text style={styles.info}>{perso.species}</Text>
                    </View>
                    <View style={{ flexDirection: "row", }}>
                        <Text style={styles.pref}>Type : </Text>
                        <Text style={styles.info}>{perso.type} </Text>
                    </View>
                    <View style={{ flexDirection: "row", }}>
                        <Text style={styles.pref}>Genre : </Text>
                        <Text style={styles.info}>{perso.gender}</Text>
                    </View>
                    <View style={{ flexDirection: "row", }}>
                        <Text style={styles.pref}>Origine : </Text>
                        <Text style={styles.info}>{perso.origin.name}</Text>
                    </View>
                    <View style={{ flexDirection: "row", }}>
                        <Text style={styles.pref}>Position : </Text>
                        <Text style={styles.info}>{perso.location.name}</Text>
                    </View>
                    <View style={{ flexDirection: "row", }}>
                        <Text style={styles.pref}>Nombre de D'episode : </Text>
                        <Text style={styles.info}>{perso.episode.length}</Text>
                    </View>
                </View>
                <View style={{ alignItems: "center", margin: 20 }}>
                    <Image source={{ uri: perso.image }}
                        style={{
                            width: 300,
                            height: 300,
                            resizeMode: 'cover',
                            justifyContent: 'space-between',
                        }}></Image>
                </View>
            </View>
        </SafeAreaView>
    )
}