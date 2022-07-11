import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
//images
import bag from "../assets/images/bag.svg";

// functional component to display Navbar
function Navbar(props) {
  let [showFilter, setShowFilter] = useState(0);
  let [windowWidth, setWindowWidth] = useState(window.innerWidth); //control to display aside section
  let [count, setCount] = useState(false); //count of cart
  let { pathname } = useLocation();

  //check for cart count
  useEffect(() => {
    if (props.cartItems) {
      let sum = 0;
      props.cartItems.map((elem) => (sum = sum + elem.qtyInCart));

      setCount(sum); //set cart count
    }
  }, [props.cartItems]);

  //toggle filter section //MOBILE VIEW
  useEffect(() => {
    //TOGGLE ON
    if (showFilter) {
      document.querySelector(".toggle-btn").style.boxShadow =
        " 0px 0px 2px 1px rgb(181, 177, 177) inset";
      document.querySelector("aside").style.transform = "translate(0vw)";
    }
    //TOGGLE OFF and window size < 900
    else if (showFilter === false && window.innerWidth < 700) {
      document.querySelector(".toggle-btn").style.boxShadow = "none";
      document.querySelector("aside").style.transform = "translate(-100vw)";
    }
  }, [showFilter]);

  //show Filter if //DESKTOP VIEW
  useEffect(() => {
    if (pathname === "/") {
      window.addEventListener("resize", () => {
        setWindowWidth(window.innerWidth);
      });
      //window > 700 display aside section
      if (windowWidth > 700) {
        document.querySelector(".toggle-btn").style.boxShadow =
          " 0px 0px 2px 1px rgb(181, 177, 177) inset";
        document.querySelector("aside").style.transform = "translate(0vw)";
      }
    }
  }, [windowWidth, pathname]);

  return (
    <nav>
      <div className='navbar'>
        {pathname === "/" ? (
          <div
            className='toggle-btn'
            onClick={() => {
              setShowFilter((prev) => !prev);
            }}
          >
            <img
              src='https://cdn-icons-png.flaticon.com/512/1828/1828551.png'
              alt='toggle-filter'
            ></img>
          </div>
        ) : null}
        <div className='logo'>
          <img
            src='https://www.collinsdictionary.com/images/full/tshirt_204029461_1000.jpg'
            alt='Tunica India'
          ></img>
          {/* Link to Home page Link */}
          <div>
            <Link to='/' style={{ textDecoration: "none", color: "black" }}>
              Tunica India
            </Link>
          </div>
        </div>
        <div className='cart-ico'>
          <div className='cart-count'>{count}</div>
          {/* Link to Cart Page  */}
          <Link to='/cart'>
            <img
              src={bag}
              alt='bag'
              data-toggle='tooltip'
              data-placement='bottom'
              title='cart'
            />
          </Link>
        </div>
      </div>
    </nav>
  );
}

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return { cartItems };
};

export default connect(mapStateToProps)(Navbar);
