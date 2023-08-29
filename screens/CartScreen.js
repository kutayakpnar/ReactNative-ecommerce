import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useCart } from '../Context/CartContext'; // Import the useCart hook
import { useNavigation } from '@react-navigation/native';
import CheckoutScreen from './CheckoutScreen';



function CartScreen() {
  const { cart, removeFromCart } = useCart(); // Add removeFromCart from your CartContext

  const navigation = useNavigation();

  const handleCheckout = () => {
    navigation.navigate('CheckoutScreen', {
      totalPrice: totalCartPrice, // Pass the totalCartPrice as a parameter
    });
  };
  // Create a map to group cart items by product ID
  const cartItemsMap = new Map();

  // Populate the cartItemsMap and count the quantity
  cart.forEach((item) => {
    const { id, productName, productDescription, price } = item;
  
    if (cartItemsMap.has(id)) {
      // Increment the quantity if the item already exists in the map
      const existingItem = cartItemsMap.get(id);
      existingItem.quantity += 1;
    } else {
      // Initialize a new entry if the item is not in the map
      cartItemsMap.set(id, {
        id, // Store the product ID
        productName,
        productDescription,
        price,
        quantity: 1,
      });
    }
  });

  // Calculate the total price of the cart
  let totalCartPrice = 0;
  Array.from(cartItemsMap.values()).forEach((item) => {
    totalCartPrice += item.price * item.quantity;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Cart Items</Text>
      {Array.from(cartItemsMap.values()).map((item , index) => (
        <View style={styles.cartItemContainer} key={index}>
          <Text style={styles.cartItemName}>
           {item.productName}
          </Text>
          <Text style={styles.cartItemDescription}>
            {item.productDescription}
          </Text>
          <Text style={styles.cartItemPrice}>
            {item.price !== undefined ? `$${item.price.toFixed(2)}` : 'Price not available'}
          </Text>
          <Text style={styles.cartItemQuantity}>
             Quantity: {item.quantity}
          </Text>
          
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => {
              removeFromCart(item);
              console.log(item.id);
            }}
            
            
          >
            <Text style={styles.removeButtonText}>Remove</Text>
          </TouchableOpacity>
        </View>
      ))}
      <Text style={styles.totalPrice}>Total Price: ${totalCartPrice.toFixed(2)}</Text>
      <TouchableOpacity
        style={styles.checkoutButton}
        onPress={handleCheckout}
      >
        <Text style={styles.checkoutButtonText}>Checkout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  checkoutButton: {
    backgroundColor: 'green', // Change the background color to your desired color
    padding: 16, // Adjust the padding as needed
    borderRadius: 8,
    alignItems: 'center', // Center the content horizontally
    justifyContent: 'center', // Center the content vertically
    marginTop: 16, // Add some space between the items
  },
  checkoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18, // Adjust the font size as needed
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  cartItemContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cartItemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cartItemDescription: {
    fontSize: 16,
    color: 'gray',
  },
  cartItemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
  },
  cartItemQuantity: {
    fontSize: 16,
    color: 'blue',
  },
  removeButton: {
    backgroundColor: 'black',
    padding: 8,
    borderRadius: 8,
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
  },
});

export default CartScreen;