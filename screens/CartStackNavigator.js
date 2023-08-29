// CartStackNavigator.js

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CartScreen from './CartScreen';
import CheckoutScreen from './CheckoutScreen';

const CartStack = createStackNavigator();

const CartStackNavigator = () => (
  <CartStack.Navigator>
    <CartStack.Screen
      name="CartScreen"
      component={CartScreen}
      options={{ headerShown: false }} // Hide the header for CartScreen
    />
    <CartStack.Screen
      name="CheckoutScreen"
      component={CheckoutScreen}
      options={{ title: 'Checkout' }} // Customize the header for CheckoutScreen
    />
  </CartStack.Navigator>
);

export default CartStackNavigator;
