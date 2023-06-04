import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { View, Image, Text } from 'react-native'

import { React } from 'react';

import Account from "./screens/Accounts";
import Plaza from "./screens/Plaza"
import NotesScreen from "./screens/NotesScreen";


Tab = createBottomTabNavigator();

export default function App (){
    const user = 5269507;

    return(
      <NavigationContainer>
        <Tab.Navigator screenOptions={{backgroundColor: '#78909C'}}>
          <Tab.Screen name="Home" component={Plaza}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                <Image
                source={'https://www.iconsdb.com/icons/preview/white/home-3-xxl.png'}
                resizeMode='contain'
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? 'white' : 'gray'
                }}/>
                <Text style={{color: focused ? 'white' : 'gray', fontSize: 12}}>Home</Text>
              </View>
            )
          }}/>
          <Tab.Screen name="Account" component={Account} options={{
            tabBarIcon: ({focused}) => (
              <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                <Image
                source={'https://cdn-icons-png.flaticon.com/512/61/61205.png'}
                resizeMode='contain'
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? 'white' : 'gray'
                }}/>
                <Text style={{color: focused ? 'white' : 'gray', fontSize: 12}}>Account</Text>
              </View>
            )
          }}/>
          <Tab.Screen name="NotesScreen" component={NotesScreen} options={{
            tabBarIcon: ({focused}) => (
              <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                <Image
                source={'https://simpleicon.com/wp-content/uploads/note-2.png'}
                resizeMode='contain'
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? 'white' : 'gray'
                }}/>
                <Text style={{color: focused ? 'white' : 'gray', fontSize: 12}}>Notes</Text>
              </View>
            )
          }}/>
        </Tab.Navigator>
    </NavigationContainer>
  );
  
};