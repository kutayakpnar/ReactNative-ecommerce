import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useCart } from '../Context/CartContext';

function CheckoutScreen({ route }) {
  // Extract the totalPrice parameter from the route
  const { totalPrice } = route.params;
  const { clearCart } = useCart();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [creditCardNo, setCreditCardNo] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const handleCheckout = () => {
    // Validate user input
    if (!name || !address || !creditCardNo || creditCardNo.length !== 10) {
      setErrorMessage('Please enter valid information.');
      setConfirmationMessage('');
    } else {
      // Perform the checkout logic here (e.g., send user information and payment details to the server)
      // For this example, let's simulate a successful order by displaying a confirmation message
      setErrorMessage('');
      setConfirmationMessage('Order successfully placed!');
      clearCart();

      // You can clear the input fields if needed
      // setName('');
      // setAddress('');
      // setCreditCardNo('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Checkout</Text>

      {/* Total Price */}
      <Text style={styles.totalPrice}>Total Price: ${totalPrice.toFixed(2)}</Text>

      {/* User Information */}
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
      />

      <Text style={styles.label}>Address:</Text>
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={setAddress}
        placeholder="Enter your address"
      />

      <Text style={styles.label}>Credit Card No:</Text>
      <TextInput
        style={styles.input}
        value={creditCardNo}
        onChangeText={setCreditCardNo}
        placeholder="Enter your 10-digit credit card number"
        keyboardType="numeric"
      />

      {/* Error Message */}
      {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}

      {/* Confirmation Message */}
      {confirmationMessage ? (
        <Text style={styles.confirmationMessage}>{confirmationMessage}</Text>
      ) : null}

      {/* Checkout Button */}
      <View style={styles.checkoutButton}>
  <Button title="Complete Order" onPress={handleCheckout} color="white"/>
</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
    color: 'blue',
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: 'green',
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 12,
    marginBottom: 24,
  },
  checkoutButton: {
    backgroundColor: 'black',
    borderRadius: 8,
    padding: 12,
    width: '80%',
    alignItems: 'center',
  },
  checkoutButtonText: {
    color:'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  errorMessage: {
    color: 'red',
    fontSize: 16,
    marginBottom: 16,
  },
  confirmationMessage: {
    color: 'green',
    fontSize: 16,
    marginBottom: 16,
  },
});

export default CheckoutScreen;
