//* App.jsx
//? Главный компонент - вся логика тут

import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router";
import ReactDOM from "react-dom/client";

//? 1. Axios is a popular JavaScript library used for making HTTP(hyper text transfer protocol) requests (e.g., GET, POST, PUT, DELETE) to interact with APIs(application programming interface)
import axios from "axios";
//* 2. Application Programming Interface, is a set of protocols that enable different software components to communicate and transfer data.

import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import "./App.css"; 

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [cartOpened, setCartOpened] = useState(false);

  // Fetch data on mount
  useEffect(() => {
    axios
      .get("https://678e1e80a64c82aeb11f1402.mockapi.io/items")
      .then((res) => setItems(res.data))
      .catch((err) => console.error("Error fetching 'items':", err));

    axios
      .get("https://678e1e80a64c82aeb11f1402.mockapi.io/cart")
      .then((res) => setCartItems(res.data))
      .catch((err) => console.error("Error fetching 'cart':", err));

    axios
      .get("https://678e1e80a64c82aeb11f1402.mockapi.io/favorites")
      .then((res) => setFavorites(res.data))
      .catch((err) => console.error("Error fetching 'favorites':", err));
  }, []);

  // Add item to cart
  const onAddToCart = (obj) => {
    axios.post("https://678e1e80a64c82aeb11f1402.mockapi.io/cart", obj);
    setCartItems((prev) => [...prev, obj]);
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

  //? Add item to favorites
  //? 1)
  const onAddToFavorite = async (obj) => {
    if (favorites.find((favObj) => favObj.id === obj.id)){
      axios.delete(`https://678e1e80a64c82aeb11f1402.mockapi.io/favorites/${obj.id}`);
      // setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
    } 
    else {
      const { data } = await axios.post("https://678e1e80a64c82aeb11f1402.mockapi.io/favorites", obj);
      setFavorites((prev) => [...prev, data]);  
    }
  };

  //? 2)
  // const onAddToFavorite = (obj) => {
  //   const existingFavorite = favorites.find((item) => item.id === obj.id);
    
  //   if (existingFavorite) {
  //     axios 
  //       .delete(`https://678e1e80a64c82aeb11f1402.mockapi.io/favorites/${obj.id}`)
  //       .then(() => {
  //         setFavorites((prev) => prev.filter((item) => item.id !== obj.id))
  //       })
  //       .catch((error) => {
  //         console.error("Error deleting favorite: ", error);
  //       });
  //   } else {
  //     axios 
  //       .post("https://678e1e80a64c82aeb11f1402.mockapi.io/favorites", obj)
  //       .then((response) => {
  //         setFavorites((prev) => [...prev, response.data]);
  //       })
  //       .catch((error) => {
  //         console.error("Error adding favorite: ", error);
  //       });
  //   }
  // };

  return (
    <>
      <div className="wrapper clear">

        {/* Drawer component */}
        {cartOpened && (
          <Drawer
            items={cartItems}
            onClose={() => setCartOpened(false)}
            onRemove={onRemoveItem}
          />
        )}

        {/* Header component */}
        <Header onClickCart={() => setCartOpened(true)} />

        {/* Routes */}
        <Routes>
          <Route
            path="/"
            element={
              <Home
                items={items}
                searchValue={searchValue}
                setSearchValue={setSearchValue} 
                onChangeSearchInput={onChangeSearchInput}
                onAddToCart={onAddToCart}
                onAddToFavorite={onAddToFavorite}
              />
            }
          />
          <Route 
            path="/favorites" 
            element={<Favorites items={favorites} onAddToFavorite={onAddToFavorite}/>} 
          />

          {/* Тест */}
          <Route
            path="/test"
            element={
            <div className="d-flex flex-column align-center">
              <h1 className="text-center text-capitalize opacity-6">
                Это тестовая страница
              </h1>
              <img width={200} height={250} src="/img/test.jpg" alt="Test" />
            </div>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
