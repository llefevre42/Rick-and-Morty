import * as React from 'react';
import { StyleSheet, StatusBar, Dimensions } from 'react-native';

const { height } = Dimensions.get("window");
const { width } = Dimensions.get("window");

export default StyleSheet.create({
  info: {
    fontSize: 20,
    width: 200,
    textAlign: "center"
  },
  pref: {
    fontSize: 18,
    width: 100
  },
  buttonGenreActif: {
    backgroundColor: "red",
    width: 60,
    height: 30,
    marginHorizontal: 10,
    borderRadius: 20,
    justifyContent: "center"
  },
  buttonGenrePassif: {
    backgroundColor: "yellow",
    width: 60,
    height: 30,
    marginHorizontal: 10,
    borderRadius: 20,
    justifyContent: "center"
  },
  textGenre: {
    textAlign: "center",
    fontSize: 10
  }
});