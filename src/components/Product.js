import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { addToCart } from "../actions";
import { Toaster, toast } from "react-hot-toast"; //use for notifications
//scss file
import "../assets/scss/Product.scss";
//images
import bag from "../assets/images/bag.svg";

//functional component to display product
function Product(props) {
  const { product, cartItems } = props;
  let [add, setAdd] = useState(true); //display add if not available in cart otherwise right

  useEffect(() => {
    let a = cartItems.find((elem) => elem.id === product.id);

    if (a) {
      setAdd(false);
    } //check if item is in cart
  }, [cartItems, product.id]);
  return (
    <>
      <Toaster position='top-center' reverseOrder={false} />
      <div className='product-card'>
        <div className='product-tumb'>
          <img src={product.imageURL} alt='' />
        </div>
        <div className='product-bottom'>
          <div className='product-details'>
            <span className='product-catagory'>{product.gender}</span>
            <h4>{product.name}</h4>
            <div className='product-bottom-details'>
              <div className='product-price'>
                <small>₹{product.price}</small>
              </div>
            </div>
          </div>
          {/* if not in cart display add button otherwise in cart  */}
          {add ? (
            <div
              className='add_cart'
              data-toggle='tooltip'
              data-placement='right'
              title='add to cart'
            >
              <img
                src={bag}
                alt='add_to_cart'
                onClick={() => {
                  props.addToCart(product.id);
                  toast.success("added to cart", {
                    style: { boxShadow: "0px 0px 1px 1px lightgray" },
                  });
                }}
              ></img>
            </div>
          ) : (
            <img
              src='https://cdn-icons-png.flaticon.com/512/443/443138.png'
              style={{ height: "20px", width: "20px" }}
              data-toggle='tooltip'
              data-placement='right'
              title='Added to Cart'
              alt='Added To Cart'
            ></img>
          )}
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems,
  };
};

export default connect(mapStateToProps, { addToCart })(Product);
