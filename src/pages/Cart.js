import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
//components
import CartItem from "../components/CartItem";
//scss file
import "../assets/scss/Cart.scss";
function Cart(props) {
  const [total, setTotal] = useState(0); //total price
  //set total price
  useEffect(() => {
    if (props.cartItems) {
      const total = props.cartItems.reduce((sum, elem) => {
        return (sum += elem.price * elem.qtyInCart);
      }, 0);
      setTotal(total);
    }
  }, [props.cartItems]);

  return (
    <div className='cart'>
      {/* Cart Products */}
      <div className='cart-wrapper'>
        <h1>Cart</h1>
        <hr />
        {props.cartItems.length !== 0 ? (
          props.cartItems
            .sort((a, b) => b._id - a._id)
            .map((item) => {
              return (
                <div className='cart-item' key={item._id}>
                  <CartItem item={item} />
                  <hr />
                </div>
              );
            })
        ) : (
          <div className='empty-cart'>
            <div className='m-button'>
              <Link to='/' style={{ textDecoration: "none", color: "white" }}>
                ADD PRODUCTS
              </Link>
            </div>
          </div>
        )}
      </div>
      {/* Billing Section */}
      <div className='billing'>
        <h2>Checkout</h2>
        <div className='promocode'>
          <input type='text' placeholder='Promocode'></input>
          <Button variant='contained'>Apply</Button>
        </div>
        <hr />
        <div className='subtotal'>
          <div>
            <span>Cost</span>
            <span>₹{total}</span>
          </div>
          <div>
            <span>Tax(18%)</span>
            <span>₹{total * 0.18}</span>
          </div>
          <div>
            <span>Discount(5%)</span>
            <span>-₹{total * 0.05}</span>
          </div>
          <div>
            <span>Delivery</span>
            <span style={{ color: "green" }}>Free</span>
          </div>
        </div>
        <hr />
        <div className='total'>
          <span>Total</span>
          <span>₹{Math.floor(total * 1.13)}</span>
        </div>
        <div className='cart-btn'>
          <Button
            variant='contained'
            style={{ width: "180px", height: "40px", fontSize: "12px" }}
          >
            Proceed to Checkout
          </Button>
          <button className='cancel-billing'>Cancel</button>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return { cartItems };
};

export default connect(mapStateToProps)(Cart);
