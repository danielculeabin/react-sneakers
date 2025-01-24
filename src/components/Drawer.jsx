import React, { useState,useContext } from 'react'
import axios from 'axios'

import Info from './Info'
import AppContext from '../context'

function Drawer({ onClose, onRemove, items = [] }) {
  const {cartItems, setCartItems} = useContext(AppContext);
  const [orderId, setOrderId] = useState(null);
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  
  const onClickOrder = async () => {
    try {
      const { data } = await axios.post("https://678e1e80a64c82aeb11f1402.mockapi.io/orders", cartItems);
      setOrderId(data.id);
      setIsOrderComplete(true);
      if(cartItems) setCartItems([]);
    } 
    catch (error) {
      alert("Не удалось создать заказ :(");
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
                <button onClick={onClickOrder} className="greenButton">
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

