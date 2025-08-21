  // App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from './src/screens/WelcomeScreen';
import LiveCamsScreen from './src/screens/LiveCamsScreen';
import AlertHost from './src/ui/AlertHost'; // popup alert overlay

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* Global in-app popup alert overlay */}
      <AlertHost />

      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="LiveCams" component={LiveCamsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
