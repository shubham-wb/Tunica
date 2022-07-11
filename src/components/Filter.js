import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
//material-ui components
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { filterByQuery } from "../utils";
import { setfilteredState } from "../actions";
//component -> filter products

function Filter(props) {
  let { searchItems, products, search, setfilteredState } = props;
  let [filters, setFilters] = useState([]);

  useEffect(() => {
    if (filters.length >= 1) {
      let data = [];
      //if search is enabled
      if (searchItems.length !== 0) {
        data = searchItems;
      }
      //if search is  disabled
      else {
        data = products;
      }
      setfilteredState(filterByQuery(filters, data), true); //sending data and isFiltering ---> true
    }
  }, [filters, searchItems, products]);

  //reset filters if search is enabled
  useEffect(() => {
    if (search !== 0) {
      resetFilter();
      setFilters([]);
    }
  }, [search]);

  //function to handle filters

  function handleFilter(filter_id) {
    //add filter indexes to filters state
    let index = filters.indexOf(filter_id);
    if (index === -1) {
      setFilters([...filters, filter_id]);
    } else {
      let newFilter = filters;
      newFilter.splice(index, 1);

      if (newFilter.length === 0) {
        resetFilter();
      }
      setFilters([...newFilter]);
    }
    //update root with filtered Products
  }

  //reset filtered state if no filters selected and isFiltering --> false
  function resetFilter() {
    setFilters([]);
    if (props.searchItems.length !== 0) {
      props.setfilteredState(props.searchItems, false);
    } else {
      props.setfilteredState(props.products, false);
    } //if all the filter are removed
  }

  return (
    <div className='filter'>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Filter</h1>
        {/* clear all filters */}
        <div
          className='reset-filter-btn'
          onClick={() => {
            resetFilter();
          }}
        >
          Clear All
        </div>
      </div>
      <hr />
      <ul className='filter-list'>
        <li className='filter-list-item'>
          {/* filter by colour */}
          <h3>Colour</h3>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={filters.indexOf(1) !== -1} />}
              label='Red'
              onChange={() => {
                handleFilter(1);
              }}
            />
            <FormControlLabel
              control={<Checkbox checked={filters.indexOf(2) !== -1} />}
              label='Blue'
              onChange={() => {
                handleFilter(2);
              }}
            />
            <FormControlLabel
              control={<Checkbox checked={filters.indexOf(3) !== -1} />}
              label='Green'
              onChange={() => {
                handleFilter(3);
              }}
            />
          </FormGroup>
        </li>
        <li className='filter-list-item'>
          {/* filter by Gender */}

          <h3>Gender</h3>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={filters.indexOf(4) !== -1} />}
              label='Men'
              onChange={() => {
                handleFilter(4);
              }}
            />
            <FormControlLabel
              control={<Checkbox checked={filters.indexOf(5) !== -1} />}
              label='Women'
              onChange={() => {
                handleFilter(5);
              }}
            />
          </FormGroup>
        </li>

        <li className='filter-list-item'>
          {/* filter by Price */}

          <h3>Price</h3>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={filters.indexOf(6) !== -1} />}
              label='₹0-₹250'
              onChange={() => {
                handleFilter(6);
              }}
            />
            <FormControlLabel
              control={<Checkbox checked={filters.indexOf(7) !== -1} />}
              label='₹250-₹450'
              onChange={() => {
                handleFilter(7);
              }}
            />
            <FormControlLabel
              control={<Checkbox checked={filters.indexOf(8) !== -1} />}
              label='₹451+'
              onChange={() => {
                handleFilter(8);
              }}
            />
          </FormGroup>
        </li>
        <li className='filter-list-item'>
          {/* filter by Type */}

          <h3>Type</h3>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={filters.indexOf(9) !== -1} />}
              label='Polo'
              onChange={() => {
                handleFilter(9);
              }}
            />
            <FormControlLabel
              control={<Checkbox checked={filters.indexOf(10) !== -1} />}
              label='Hoodie'
              onChange={() => {
                handleFilter(10);
              }}
            />
            <FormControlLabel
              control={<Checkbox checked={filters.indexOf(11) !== -1} />}
              label='Basic'
              onChange={() => {
                handleFilter(11);
              }}
            />
          </FormGroup>
        </li>
      </ul>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { products, filteredState, searchItems, search } = state;
  return {
    products,
    filteredState,
    searchItems,
    search,
  };
};

export default connect(mapStateToProps, { setfilteredState })(Filter);
