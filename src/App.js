import React from 'react';
import { Text, View, Image, ImageBackground, Alert, Dimensions, FlatList, TextInput, StyleSheet, StatusBar, SafeAreaView, TouchableHighlight, ScrollView, TouchableOpacity, Pressable, NativeModules } from 'react-native';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "./screens/Home"
import Profile from "./screens/Profile"

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontFamily: 'Roboto-Bold',
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
};

const Stack = createNativeStackNavigator();



const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache()
});

export default function App() {



  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="launch"
          screenOptions={{ gestureEnabled: false }}>
          <Stack.Screen name="Home" component={Home} options={{
            headerShown: false,
          }} />
           <Stack.Screen name="Profile" component={Profile} options={{
            headerShown: false,
          }} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}

