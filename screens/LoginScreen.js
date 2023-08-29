import React, { useState , useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Alert } from 'react-native';
import { UNSTABLE_usePreventRemove, useNavigation } from '@react-navigation/native';
import { useUser } from '../Context/UserContext';


function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState('');
  const { userId, setUserId , } = useUser();

  const navigation=useNavigation();
  useEffect(() => {
    setUserId(userId)
    console.log(userId)
    // This will log the updated userId when it changes.
  }, [userId]); 

  const handleLogin = async () => {
    try {
      // Fetch the list of users from your backend
      const response = await fetch('http://192.168.1.39:8084/api/v1/ecommerce/users');
      if (!response.ok) {
        throw new Error('Unable to fetch user data');
      }
      const users = await response.json();
      //console.log(users) //I test user object
      console.log(users)
      // Check if the entered username and password match any user in the backend
      const user = users.find((user) => user.userName === username && user.password === password);
       
      
      if (user) {
        
        setUserId(user.userid);
        
        
        Alert.alert('Success', 'You have successfully logged in.', [{ text: 'OK' }]);
        // You can navigate to another screen here or perform other actions
        
        navigation.navigate('Home');
      } else {
        setLoginStatus('Invalid username or password');
      }
    } catch (err) {
      console.error(err);
      setLoginStatus('Error: Unable to login');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login</Text>
      {loginStatus ? <Text style={styles.status}>{loginStatus}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry 
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  status: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'red', // Change the color as needed
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
