import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { getProducts } from "../utils";
import { addTeesToState } from "../actions";

//components
import Filter from "../components/Filter";
import SearchBar from "../components/SearchBar";
import ProductList from "../components/ProductsList";
import Loader from "../components/Loader";

//scss
import "../assets/scss/Home.scss";
function Home(props) {
  let [loading, setLoading] = useState(false);

  //set loading/loaded status
  useEffect(() => {
    setLoading(true);
    async function getTees() {
      let data = await getProducts();
      if (data) {
        props.addTeesToState(data);
        setLoading(false);
      }
    }
    getTees();
  }, [props.prducts]);

  return (
    <div className='home'>
      <aside>
        <Filter />
      </aside>
      <main>
        <SearchBar />
        {loading ? <Loader /> : <ProductList />}
      </main>
    </div>
  );
}

const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps, { addTeesToState })(Home);
