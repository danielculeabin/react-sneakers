function Card() {
  return (
    <div className="card">
      <div className="favorite">
        <img src="/img/heart-unliked.svg" alt="Unlicked" />
      </div>
      <img width={133} height={112} src="img\sneakers\1.jpg" alt="Sneakers" />
      <p>Мужские Кроссовки Nike Blazer Mid Suede</p>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена:</span>
          <b>12 999 руб.</b>
        </div>
        <button className="button">
          <img width={11} height={11} src="/img/plus.svg" alt="Plus" />
        </button>
      </div>
    </div>
  );
}

export default Card;

{/* <div className="card">
          <div className="favorite">
            <img src="/img/heart-unliked.svg" alt="Unlicked" />
          </div>
          <img width={133} height={112} src="img\sneakers\1.jpg" alt="Sneakers" />
          <p>Мужские Кроссовки Nike Blazer Mid Suede</p>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <b>12 999 руб.</b>
            </div>
            <button className="button">
              <img width={11} height={11} src="/img/plus.svg" alt="Plus" />
            </button>
          </div>
        </div>


        <div className="card">
          <img width={133} height={112} src="img\sneakers\2.jpg" alt="Sneakers" />
          <p>Мужские Кроссовки Nike Air Max 270 </p>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <b>12 999 руб.</b>
            </div>
            <button className="button">
              <img width={11} height={11} src="/img/plus.svg" alt="Plus" />
            </button>
          </div>
        </div>


        <div className="card">
          <img width={133} height={112} src="img\sneakers\3.jpg" alt="Sneakers" />
          <p>Мужские Кроссовки Nike Blazer Mid Suede</p>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <b>8 499 руб.</b>
            </div>
            <button className="button">
              <img width={11} height={11} src="/img/plus.svg" alt="Plus" />
            </button>
          </div>
        </div>


        <div className="card">
          <img width={133} height={112} src="img\sneakers\4.jpg" alt="Sneakers" />
          <p>Кроссовки Puma X Aka Boku Future Rider</p>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <b>8 499 руб.</b>
            </div>
            <button className="button">
              <img width={11} height={11} src="/img/plus.svg" alt="Plus" />
            </button>
          </div>
        </div> */}