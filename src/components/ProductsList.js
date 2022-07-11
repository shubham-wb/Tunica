import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
//components
import Product from "./Product";

//Functional Component  to handle list of products
function ProductList(props) {
  let [list, setList] = useState([]); //list to be rendered

  //set list as per condition
  useEffect(() => {
    //CONDITION 1 :- search products enabled
    if (props.searchItems.length !== 0) {
      //CONDITION 1(a) :-  and filter is ON
      if (props.filter) {
        setList(props.filteredState);
      }
      //CONDITION 1(b) :-  filter is OFF
      else {
        setList(props.searchItems);
      }
    }

    //CONDITION 2 - Filtering on all products
    else if (props.filteredState.length !== 0) {
      setList(props.filteredState);
    }
    //CONDITION 3 - SEARCH == false and FILTER == false
    else {
      setList(props.products);
    }
  }, [props.filteredState, props.products, props.searchItems, props.filter]);

  return (
    <div className='product-list'>
      {/* sort  by id and display products  */}
      {list
        .sort((a, b) => a.id - b.id)
        .map((prod) => {
          return <Product product={prod} key={prod.id} />;
        })}
    </div>
  );
}

const mapStateToProps = (state) => {
  const { filteredState, products, searchItems, filter } = state;
  return { filteredState, products, searchItems, filter };
};

export default connect(mapStateToProps)(ProductList);
