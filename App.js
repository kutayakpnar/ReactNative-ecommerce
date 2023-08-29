import {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'; // Import createStackNavigator
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import CartScreen from './screens/CartScreen';
import { CartProvider } from './Context/CartContext'; // Import the CartProvider
import { UserProvider } from './Context/UserContext'; 
import CheckoutScreen from './screens/CheckoutScreen';
import CartStackNavigator from './screens/CartStackNavigator';
const Tab = createBottomTabNavigator();




function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Set an initial value here

  return (
    <UserProvider>
    <CartProvider>
      <NavigationContainer>
      
        
        
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'black',
          tabBarStyle: {
            display: 'flex',
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Icon name="ios-home" size={size} color={color} />
            ),
          }}
        />
       
        <Tab.Screen
          name="Login"
          options={{
            
            tabBarLabel: 'Login',
            tabBarIcon: ({ color, size }) => (
              <Icon name="ios-log-in" size={size} color={color} />
            ),
          }}
        >
          {() => <LoginScreen isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
        </Tab.Screen>
        <Tab.Screen
          name="Cart"
          component={CartStackNavigator} // Use CartStackScreen here
          options={{
            tabBarLabel: 'Cart',
            tabBarIcon: ({ color, size }) => (
              <Icon name="ios-cart" size={size} color={color} />
            ),
          }}
        />
        
      </Tab.Navigator>
        
      </NavigationContainer>
      
    </CartProvider>
    </UserProvider>
  );
}

export default App;

/*
<NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'black',
          tabBarStyle: {
            display: 'flex',
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Icon name="ios-home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Login"
          options={{
            tabBarLabel: 'Login',
            tabBarIcon: ({ color, size }) => (
              <Icon name="ios-log-in" size={size} color={color} />
            ),
          }}
        >
          {() => <LoginScreen isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
        </Tab.Screen>
        <Tab.Screen
          name="CartScreen"
          component={CartScreen}
          options={{
            tabBarLabel: 'Cart',
            tabBarIcon: ({ color, size }) => (
              <Icon name="ios-cart" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer> */