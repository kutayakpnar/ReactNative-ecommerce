import {useState ,useEffect} from 'react';
import { View, Text, /* other imports */ } from 'react-native';
import { useCart } from '../Context/CartContext'; // Import the useCart hook
import { StyleSheet, FlatList ,TouchableOpacity} from 'react-native';


function HomeScreen() {
  const { addToCart } = useCart();
  //const navigation = useNavigation();
  const [cart, setCart] = useState([]); 
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.1.39:8084/api/v1/ecommerce/product');

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);

      }
    };

    fetchData();
  }, []);
/*
  const addToCart = (productId) => {
    const selectedProduct = products.find((product) => product.id === productId);

    if (selectedProduct) {
      const updatedCart = [...cart, selectedProduct];
      setCart(updatedCart);
      console.log(`Product with ID ${productId} added to the cart.`);
      //navigation.navigate('CartScreen', { cart: updatedCart });
    }
  };*/

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>PRODUCTS</Text>
      </View>
      <FlatList
        data={products}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            <Text style={styles.productName}>{item.productName}</Text>
            <Text style={styles.productDescription}>{item.productDescription}</Text>
            <Text style={styles.productPrice}>Price: ${item.price.toFixed(2)}</Text>
            <TouchableOpacity
              style={styles.addToCartButton}
              onPress={() => addToCart(item)}
            >
              <Text style={styles.addToCartButtonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  headingContainer: {
    backgroundColor: 'black', // Background color for the heading container
    paddingVertical: 15, // Adjust vertical padding as needed
    paddingHorizontal: 20, // Adjust horizontal padding as needed
    borderRadius: 8, // Adjust border radius as needed
    marginBottom: 16,
    alignItems: 'center', // Center content horizontally
    justifyContent: 'center', // Center content vertically
    elevation: 4, // Add elevation (shadow) for a raised effect
  },
  heading: {
    fontSize: 28, // Increase the font size for a more impressive look
    fontWeight: 'bold',
    color: 'white', // Text color for the heading
  },
  productContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    flexBasis: '48%', // Set the width of each product container to 48%
    marginRight: '2%', // Add a small margin between products
    flexDirection: 'column', // Arrange children in a column
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  productDescription: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
  },
  addToCartButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 8,
    marginTop: 8,
  },
  addToCartButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomeScreen;
