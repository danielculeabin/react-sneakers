/**
|--------------------------------------------------
| //* App.jsx
//? Главный компонент - вся логика тут
|--------------------------------------------------
*/

import React, { useState, useEffect, createContext } from "react";
import { Route, Routes } from "react-router";

  
import axios from "axios";
  /**
  |--------------------------------------------------
  //? Axios is a popular JavaScript library used for making HTTP(hyper text transfer protocol) requests (e.g., GET, POST, PUT, DELETE) to interact with APIs(application programming interface)
  | API - Application Programming Interface, is a set of protocols that enable different software components to communicate and transfer data.
  |--------------------------------------------------
  */

import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import AppContext from "./context";

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [cartOpened, setCartOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data on mount
  useEffect(() => {
    async function fetchData() {
      const cartResponse = await axios
        .get("https://678e1e80a64c82aeb11f1402.mockapi.io/cart");
      const favoritesResponse = await axios
        .get("https://678e1e80a64c82aeb11f1402.mockapi.io/favorites");
      const itemsResponse = await axios
        .get("https://678e1e80a64c82aeb11f1402.mockapi.io/items");

      setIsLoading(false);

      setCartItems(cartResponse.data);
      setFavorites(favoritesResponse.data); 
      setItems(itemsResponse.data);
    }

    fetchData();
  }, []);

  // Add item to cart
  const onAddToCart = (obj) => {
      if (cartItems.find((item) => Number(item.id) === Number(obj.id))){
        axios.delete(`https://678e1e80a64c82aeb11f1402.mockapi.io/cart/${obj.id}`)
        setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)))
      } else {
        axios.post("https://678e1e80a64c82aeb11f1402.mockapi.io/cart", obj);
        setCartItems((prev) => [...prev, obj]);  
      }
  };

  // Remove item from cart
  const onRemoveItem = (id) => {
    axios.delete(`https://678e1e80a64c82aeb11f1402.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Handle search input change
  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  // Add item to favorites
  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))){
        await axios.delete(`https://678e1e80a64c82aeb11f1402.mockapi.io/favorites/${obj.id}`);
        setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
      } 
      else {
        const { data } = await axios.post("https://678e1e80a64c82aeb11f1402.mockapi.io/favorites", obj);
        setFavorites((prev) => [...prev, data]);  
      }
    }
    catch (error) {
      alert('Не удалось добавить в закладки');
    }
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id))
  };

  // return Mark Up (page layout)
  return (
    <AppContext.Provider 
      value={{items, cartItems, favorites, isItemAdded, onAddToFavorite, setCartOpened, setCartItems}}>
      <div className="wrapper clear"> 
        {cartOpened && (
          <Drawer
            items={cartItems}
            onClose={() => setCartOpened(false)}
            onRemove={onRemoveItem}
          />
        )}

        <Header onClickCart={() => setCartOpened(true)} />

        <Routes>
          <Route
            path="/"
            element={
              <Home
                items={items}
                cartItems={cartItems}
                searchValue={searchValue}
                setSearchValue={setSearchValue} 
                onChangeSearchInput={onChangeSearchInput}
                onAddToCart={onAddToCart}
                onAddToFavorite={onAddToFavorite}
                isLoading={isLoading}
              />
            }
          />
          <Route 
            path="/favorites" 
            element={<Favorites/>} 
          />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;

