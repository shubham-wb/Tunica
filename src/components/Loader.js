import React from "react";
//scss
import "../assets/scss/Loader.scss";

//loader dummy products
export const LoadingProducts = () => {
  return (
    <div className='product-card-loader'>
      <div className='product-tumb-loader'></div>
      <div className='product-bottom-loader'>
        <div className='product-details-loader'>
          <span className='product-catagory-loader'></span>

          <div className='product-bottom-details-loader'>
            <div className='product-price-loader'>
              <small></small>
            </div>
          </div>
        </div>
        <div className='add_cart-loader'></div>
      </div>
    </div>
  );
};

//handle loading  dummy components
function Loader() {
  return (
    <div className='product-list'>
      {[...Array(30)].map((elem, index) => {
        return <LoadingProducts key={`loading-${index}`} />;
      })}
    </div>
  );
}

export default Loader;
