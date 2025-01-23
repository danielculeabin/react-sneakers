import Card from "../components/Card";

function Favorites({ items, onAddToFavorite }) {
  return (

    <div className="content p-40">
      {/* Favorites section */}
      <div className="d-flex justify-center align-center mb-40">
        <img
          height={85}
          weight={85}
          src="/img/checkmark.svg"
          alt="Checkmark"
          className="mr-30"
        />
        <h1 className="text-uppercase opacity-6">мои закладки:</h1>
      </div>

      {/* Main content */}
        <div className="d-flex align-center justify-between mb-40">
          {/* Items displayed as cards */}
          <div className="card-container d-flex flex-wrap">
            {items
              .map((item, index) => (
                <Card
                  key={index}
                  favorited={true}
                  onFavorite={onAddToFavorite}
                  {... item}
                  // id={item.id}
                  // title={item.title}
                  // price={item.price}
                  // imageUrl={item.imageUrl}
                />
            ))}
          </div>
        </div>
      
    </div>
  );
}

export default Favorites;
