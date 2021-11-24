import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "./screens/Home"
import Profile from "./screens/Profile"
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

