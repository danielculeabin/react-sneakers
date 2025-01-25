import React, { useState,useContext } from 'react'
import axios from 'axios'

import Info from './Info'
import AppContext from '../context'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({ onClose, onRemove, items = [] }) {
  const {cartItems, setCartItems} = useContext(AppContext);
  const [orderId, setOrderId] = useState(null);
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      
      const { data } = await axios
        .post("https://678e1e80a64c82aeb11f1402.mockapi.io/orders", {
        items: cartItems
      });

      setOrderId(data.id);
      setIsOrderComplete(true);
      
      // Удаление товаров из корзины (асинхронно)
      await Promise.all(
        cartItems.map((item) => 
          axios.delete(`https://678e1e80a64c82aeb11f1402.mockapi.io/cart/${item.id}`)
        )
      );
      setCartItems([]); // Очистка корзины после удаления всех товаров
    }catch (error) {
      alert("Ошибка при создании заказа :(");
      console.log(error);
    } finally{
      setIsLoading(false);
    }
  };

  return (
    <div className="overlay">
      <div className="drawer">
        <h2 className="d-flex justify-between mb-30 ">
          Корзина
          <img
            onClick={onClose}
            className="cu-p"
            src="/img/btn-remove.svg"
            alt="Close"
          />
        </h2>

        {/* Тернарный Оператор - Есть товар в корзине ? => Покажи вёрстку: Нет? => Не показывай*/}
        {items.length > 0 ? (
          <div className="d-flex flex-column"> 
            <div className="items">
              {items.map((obj) => (
                <>
                  <div key={obj.id} className="cartItem d-flex align-center mb-20">
                    <div
                      style={{ backgroundImage: `url(${obj.imageUrl})` }}
                      className="cartItemImg"
                    ></div>

                    <div className="mr-20 flex">
                      <p className="mb-5">{obj.title}</p>
                      <b>{obj.price} руб.</b>
                    </div>
                    <img
                      onClick={() => onRemove(obj.id)}
                      className="removeBtn"
                      src="/img/btn-remove.svg"
                      alt="Remove"
                    />
                  </div>
                </>
              ))}
              <div className="cartTotalBlock">
                <ul>
                  <li>
                    <span>Итого:</span>
                    <div></div>
                    <b>21 498 руб. </b>
                  </li>
                  <li>
                    <span>Налог 5%:</span>
                    <div></div>
                    <b>1074 руб. </b>
                  </li>
                </ul>
                <button disabled={isLoading} onClick={onClickOrder} className="greenButton">
                  Оформить заказ <img src="/img/arrow.svg" alt="Arrow" />
                </button>
              </div>
            </div>
          </div>
          
        ) : (
          <Info 
            title={isOrderComplete ? "Заказ оформлен!" : "Корзина Пустая"} 
            description={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`: "Добавьте минимум одну пару кроссовок для оформления заказа"} 
            image={isOrderComplete ? "/img/complete-order.jpg" : "/img/empty-cart.jpg"}
          />
        )}
      </div>
    </div>
  );
}

export default Drawer;

/**
|--------------------------------------------------
| const onClickOrder = async () => {
    try {
      setIsLoading(true);
      
      const { data } = await axios
        .post("https://678e1e80a64c82aeb11f1402.mockapi.io/orders", {
        items: cartItems
      });

      setOrderId(data.id);
      setIsOrderComplete(true);
      if(cartItems) setCartItems([]);
      
      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(`https://678e1e80a64c82aeb11f1402.mockapi.io/cart/${item.id}`);
        await delay(1000);
      }
    }catch (error) {
      alert("Ошибка при создании заказа :(");
      console.log(error);
    }
    setIsLoading(false);
  };
|--------------------------------------------------
*/