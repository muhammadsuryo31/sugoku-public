import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Provider } from 'react-redux'
import React from 'react'
import Home from './pages/Home'
import Game from './pages/Game'
import Ending from './pages/Ending'
import store from './store'


const Stack = createStackNavigator()

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Game" component={Game} />
            <Stack.Screen name="Ending" component={Ending} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
