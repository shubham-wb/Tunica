import React from "react";
import { removeFromCart, increaseQty, decreaseQty } from "../actions";
import { connect } from "react-redux";
import { Button } from "@mui/material";
//images

//component to handle cart products
function CartItem(props) {
  const { item } = props;
  return (
    <div className='cart-item-i'>
      <div className='cart-item-tumb'>
        <img src={item.imageURL} alt='cart-img' />
      </div>
      <div className='item-desc-wrapper'>
        <div className='cart-item-desc'>
          <div>{item.name}</div>
          <div>
            <span>₹{item.price}</span>
            <span>|</span>
            {item.quantity ? (
              <span>In Stock :{item.quantity}</span>
            ) : (
              <span style={{ color: "red" }}>Out of Stock</span>
            )}
          </div>
          <div>
            {/* decrease quantity  */}
            <button
              onClick={() => {
                if (item.qtyInCart != 1) {
                  props.decreaseQty(item.id);
                }
              }}
              disabled={item.qtyInCart == 1}
            >
              -
            </button>
            <span>{item.qtyInCart}</span>
            {/* increase quantity  */}
            <button
              onClick={() => {
                if (item.quantity) {
                  props.increaseQty(item.id);
                }
              }}
              disabled={!item.quantity}
            >
              +
            </button>
          </div>
        </div>
        <div className='cart-item-options'>
          <div>₹{item.price}</div>
          <div>
            {/* remove from cart  */}
            <Button
              variant='contained'
              onClick={() => {
                props.removeFromCart(item.id);
              }}
            >
              <span>Remove</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps, {
  removeFromCart,
  increaseQty,
  decreaseQty,
})(CartItem);
