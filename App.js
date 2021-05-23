import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ListPeople from './components/ListPeople';
import DetailPeople from './components/DetailPeople';

const Stack = createStackNavigator();

class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="List People"
            component={ListPeople}
          />
          <Stack.Screen
            name="Detail People"
            component={DetailPeople}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;