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

const { height } = Dimensions.get("window");
const { width } = Dimensions.get("window");

const FETCH_ALL_PRODUCT = gql`
query ($page : Int!, $status : String = "", $gender : String = "") {
  characters(page : $page, filter: { status: $status, gender: $gender }) {
      info {
        count
        next
      }
      results {
        id
        name
        status
        species
        type
        gender
        image
      }
    }
  }
`;


export default function Home({navigation}) {
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");
  const flatListRef = useRef()
  const { loading, error, data, fetchMore } = useQuery(FETCH_ALL_PRODUCT, {
    variables: { page: 0 },
  });
  if (loading) {
    console.log("loading...")
    return (null)
  }
  if (error) {
    console.log("error...")
    return (null)
  }
  console.log(data.characters.info.next)

  let perso = []
  if (data && data.characters && data.characters.results)
    perso = data.characters.results

  const changeFilter = (genders, statuss) => {
    console.log(statuss)
    console.log(genders)
    return fetchMore({
      variables: {
        page: 0,
        status: statuss,
        gender: genders
      },
      updateQuery: (previousResult, { fetchMoreResult, queryVariables }) => {
        return {
          ...fetchMoreResult
        };
      },
    })
  }

  const handleOnEndReached = () => {
    console.log(status)
    console.log(gender)
    return fetchMore({
      variables: {
        page: data.characters.info.next,
        status: status,
        gender: gender
      },
      updateQuery: (previousResult, { fetchMoreResult, queryVariables }) => {
        if (!(fetchMoreResult)) {
          previousResult
        }
        const rest = previousResult.characters.results.concat(fetchMoreResult.characters.results)
        fetchMoreResult.characters.results = rest
        return {
          ...fetchMoreResult

        };
      },
    })
  }

  const Genre = (genders) => {
    changeFilter(genders, status)
    flatListRef.current.scrollToOffset({ animated: true, offset: 0 })
  }

  const Status = (statuss) => {
    changeFilter(gender, statuss)
    flatListRef.current.scrollToOffset({ animated: true, offset: 0 })
  }

  console.log("teste :", gender)
  console.log(status)

  return (
    <SafeAreaView style={{ backgroundColor: "black", flex: 1 }}>
      <View style={{ flexDirection: "row", width: width, justifyContent: "space-around", marginBottom: 10 }}>
        <TouchableOpacity style={styles.buttonGenre, gender == "" ? styles.buttonGenreActif : styles.buttonGenrePassif} onPress={() => { setGender(""), Genre("") }}>
          <Text style={styles.textGenre}>None</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonGenre, gender == "Male" ? styles.buttonGenreActif : styles.buttonGenrePassif} onPress={() => { setGender("Male"), Genre("Male") }}>
          <Text style={styles.textGenre}>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonGenre, gender == "Female" ? styles.buttonGenreActif : styles.buttonGenrePassif} onPress={() => { setGender("Female"), Genre("Female") }}>
          <Text style={styles.textGenre}>Female</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonGenre, gender == "Genderless" ? styles.buttonGenreActif : styles.buttonGenrePassif} onPress={() => { setGender("Genderless"), Genre("Genderless") }}>
          <Text style={styles.textGenre}>Genderless</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonGenre, gender == "unknown" ? styles.buttonGenreActif : styles.buttonGenrePassif} onPress={() => { setGender("unknown", Genre("unknown")) }}>
          <Text style={styles.textGenre}>unknown</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row", width: width, justifyContent: "space-around", marginBottom: 10 }}>
        <TouchableOpacity style={styles.buttonGenre, status == "" ? styles.buttonGenreActif : styles.buttonGenrePassif} onPress={() => { setStatus(""), Status("") }}>
          <Text style={styles.textGenre}>None</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonGenre, status == "Alive" ? styles.buttonGenreActif : styles.buttonGenrePassif} onPress={() => { setStatus("Alive"), Status("Alive") }}>
          <Text style={styles.textGenre}>Alive</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonGenre, status == "Dead" ? styles.buttonGenreActif : styles.buttonGenrePassif} onPress={() => { setStatus("Dead"), Status("Dead") }}>
          <Text style={styles.textGenre}>Dead</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonGenre, status == "unknown" ? styles.buttonGenreActif : styles.buttonGenrePassif} onPress={() => { setStatus("unknown", Status("unknown")) }}>
          <Text style={styles.textGenre}>unknown</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={perso}
        ref={flatListRef}
        onEndReachedThreshold={1}
        onEndReached={handleOnEndReached}
        renderItem={({ item }) =>
          <TouchableOpacity onPress={() => navigation.push('Profile', {id: item.id})}>
            <View style={{ flexDirection: "row", backgroundColor: "green", marginBottom: 10 }}>
              <View style={{ width: 300 }}>
                <View style={{ flexDirection: "row", }}>
                  <Text style={styles.pref}>Nom :</Text>
                  <Text style={styles.info}>{item.name}</Text>
                </View>
                <View style={{ flexDirection: "row", }}>
                  <Text style={styles.pref}>Status :</Text>
                  <Text style={styles.info}>{item.status}</Text>
                </View>
                <View style={{ flexDirection: "row", }}>
                  <Text style={styles.pref}>Espece :</Text>
                  <Text style={styles.info}>{item.species}</Text>
                </View>
                <View style={{ flexDirection: "row", }}>
                  <Text style={styles.pref}>Type :</Text>
                  <Text style={styles.info}>{item.type} </Text>
                </View>
                <View style={{ flexDirection: "row", }}>
                  <Text style={styles.pref}>Genre :</Text>
                  <Text style={styles.info}>{item.gender}</Text>
                </View>
              </View>
              <Image source={{ uri: item.image }}
                style={{
                  width: null,
                  height: null,
                  resizeMode: 'contain',
                  flex: 1,
                  justifyContent: 'space-between',
                }}></Image>
            </View>
          </TouchableOpacity>
        }
      ></FlatList>
    </SafeAreaView>
  )
}