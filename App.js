import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomePage from './src/pages/HomePage';
import ShrimPrice from './src/pages/ShrimpPrice';
import PriceDetail from './src/pages/PriceDetail';
import HeaderShrimpprice from './src/components/HeaderShrimpprice';
import HeaderPricedetail from './src/components/HeaderPricedetail';
import Icon from 'react-native-vector-icons/Entypo';
const Stack = createStackNavigator();

function MyActivity() {
  return (
    <Stack.Navigator initialRouteName="HomePage">
      <Stack.Screen
        name="HomePage"
        component={HomePage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ShrimpPrice"
        component={ShrimPrice}
        options={{
          headerTitle: props => <HeaderShrimpprice {...props} />,
          headerLeft: ({canGoBack, onPress}) =>
            canGoBack && (
              <Icon
                name="chevron-small-left"
                onPress={onPress}
                color="grey"
                size={30}
                style={{position: 'absolute', left: 15}}
              />
            ),
        }}
      />
      <Stack.Screen
        name="PriceDetail"
        component={PriceDetail}
        options={{
          headerTitle: props => <HeaderPricedetail {...props} />,
          headerLeft: ({canGoBack, onPress}) =>
            canGoBack && (
              <Icon
                name="chevron-small-left"
                onPress={onPress}
                color="grey"
                size={30}
                style={{position: 'absolute', left: 15}}
              />
            ),
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyActivity />
    </NavigationContainer>
  );
}
