import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ShoppingCartContext = createContext(null);

function ShoppingCartProvider({ children }) {

  const [loading, setLoading] = useState(true);
  const [listOfProducts, setListOfProducts] = useState([]);
  const [productDetails, setProductDetails] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  async function fetchListOfProducts() {
    const apiResponse = await fetch('https://dummyjson.com/products');
    const result = await apiResponse.json();
    // console.log(result);

    if (result && result?.products) {
      setListOfProducts(result.products);
      setLoading(false);
    }
  }

  function handleAddToCart(getProductDetails) {
    // console.log(getProductDetails);

    let copyExistingCartItems = [...cartItems];
    const findIndexOfCurrentItem = copyExistingCartItems.findIndex(cartItem => cartItem.id === getProductDetails.id);

    // console.log(findIndexOfCurrentItem);

    if(findIndexOfCurrentItem === -1) {
      copyExistingCartItems.push({
        ...getProductDetails,
        quantity: 1,
        totalPrice: getProductDetails?.price
      })
    } else {
      // console.log('its coming here');
      copyExistingCartItems[findIndexOfCurrentItem] = {
        ...copyExistingCartItems[findIndexOfCurrentItem],
        quantity: copyExistingCartItems[findIndexOfCurrentItem].quantity + 1,
        totalPrice: (copyExistingCartItems[findIndexOfCurrentItem].quantity + 1) * copyExistingCartItems[findIndexOfCurrentItem].price
      }
    }

    // console.log(copyExistingCartItems);
    setCartItems(copyExistingCartItems);
    localStorage.setItem('cartItems', JSON.stringify(copyExistingCartItems));
    // navigate('/cart');
  }

  function handleRemoveFromCart(getProductDetails, isFullyRemovedFromCart) {
    let copyExistingCartItems = [...cartItems];
    const findIndexOfCurrentCartItem = copyExistingCartItems.findIndex(item => item.id === getProductDetails.id);

    if (isFullyRemovedFromCart) {
      copyExistingCartItems.splice(findIndexOfCurrentCartItem, 1)
    } else {
      copyExistingCartItems[findIndexOfCurrentCartItem] = {
        ...copyExistingCartItems[findIndexOfCurrentCartItem],
        quantity: copyExistingCartItems[findIndexOfCurrentCartItem].quantity - 1,
        totalPrice: (copyExistingCartItems[findIndexOfCurrentCartItem].quantity - 1) * copyExistingCartItems[findIndexOfCurrentCartItem].price,
      }
    }

    localStorage.setItem('cartItems', JSON.stringify(copyExistingCartItems));
    setCartItems(copyExistingCartItems);
  }

  useEffect(() => {
    fetchListOfProducts();
    const storedItems = localStorage.getItem('cartItems');
    setCartItems(storedItems ? JSON.parse(storedItems) : []);
  }, []);

  // console.log(cartItems);

  return (
    <ShoppingCartContext.Provider value={{
      listOfProducts, 
      loading, 
      setLoading, 
      productDetails, 
      setProductDetails, 
      handleAddToCart,
      cartItems,
      handleRemoveFromCart,
    }}>
      {children}
    </ShoppingCartContext.Provider>
  )
}

export default ShoppingCartProvider