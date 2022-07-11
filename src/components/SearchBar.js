import React, { useState } from "react";
import { connect } from "react-redux";
import { searchState, setfilteredState, setSearchStatus } from "../actions";
import { search } from "../utils";

import "../assets/scss/SearchBar.scss"; //scss

//images
import searchIco from "../assets/images/search.svg";
import close from "../assets/images/close.svg";

//search bar function
function SearchBar(props) {
  let [value, setValue] = useState("");

  //handle input change
  const handleChange = (event) => {
    props.setSearchStatus(true);
    //check if input is empty
    if (event.target.value === "") {
      handleResetSearch();
      return;
    }
    //else if input is not empty
    setValue((value = event.target.value));
    let output = search(value, props.products);
    props.searchState(output); //set search results to state
    setTimeout(() => {
      props.setSearchStatus(false);
    }, 1000);
  };
  //reset search
  function handleResetSearch() {
    setValue((value = "")); //reset input value
    props.searchState([]); //reset search state
    props.setfilteredState([], false); //reset filter state
  }

  return (
    <div className='search-bar'>
      <input
        type='text'
        value={value}
        onChange={handleChange}
        placeholder='Search Tees..'
      ></input>
      {value !== "" ? (
        // reset Button
        <img
          src={close}
          onClick={() => {
            handleResetSearch();
          }}
          alt='reset'
          data-toggle='tooltip'
          data-placement='right'
          title='reset'
          style={{ cursor: "pointer" }}
        ></img>
      ) : (
        <img src={searchIco} alt=''></img>
      )}
    </div>
  );
}

export const mapStateToProps = (state) => {
  const { products, cartItems } = state;
  return {
    products,
    cartItems,
  };
};

export default connect(mapStateToProps, {
  searchState,
  setfilteredState,
  setSearchStatus,
})(SearchBar);
