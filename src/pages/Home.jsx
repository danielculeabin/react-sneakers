import React, { useContext } from "react";
import Card from "../components/Card";

function Home({
  items,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddToFavorite,
  onAddToCart,
  isLoading
}) {

  const renderItems = () =>{
    const filteredItems = items.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()));

    return (isLoading ? [...Array(12)] : filteredItems).map((item, index) => (
      <Card
        key={index}
        onFavorite={(obj) => onAddToFavorite(obj)}
        onPlus={(obj) => onAddToCart(obj)}
        loading={isLoading}
        {...item}
      />
    ))
  }


  return (
    <>
      {/* Main content */}
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-25 opacity-6">
          <h1>
            {searchValue
              ? `Поиск по запросу: "${searchValue}"`
              : "Все Кроссовки"}
          </h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            {searchValue && (
              <img
                onClick={() => setSearchValue('')}
                className="clear cu-p"
                src="/img/btn-remove.svg"
                alt="Clear"
              />
            )}
            <input
              onChange={onChangeSearchInput}
              value={searchValue}
              placeholder="Поиск..."
            />
          </div>
        </div>
        
        {/* Items displayed as cards */}
        <div className="card-container d-flex flex-wrap">
          {renderItems()}
        </div>
      </div>
    </>
  );
}

export default Home;

//1) В React если вы используете булево значение, вам необязательно делать [added={true}], вам достаточно передать просто свойство [added]
//2) Если в JSX Вы передаёте свойство - оно автоматически становится 'true'.