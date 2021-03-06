import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Card from "./Card";
import { getCategories, getFilteredProducts } from "./ApiCore";
import Checkbox from "./Checkbox";
import Radiobox from "./Radiobox";
import { prices } from "./fixedPrices";

const Shop = () => {
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] },
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(4);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filteredResults, setFilteredResults] = useState([]);

  const init = () => {
    getCategories().then((data) => {
      if (data.err) {
        setError(data.err);
      } else {
        setCategories(data);
      }
    });
  };

  const loadFilterResults = (newFilters) => {
    // console.log(newFilters);
    getFilteredProducts(skip, limit, newFilters).then((data) => {
      // console.log(data.data);
      if (data.err) {
        setError(data.err);
        setLoading(false);
      } else {
        setFilteredResults(data.data);
        setSize(data.size);
        setSkip(0);
        setLoading(false);
      }
    });
  };

  const loadMore = () => {
    let toSkip = skip + limit;
    getFilteredProducts(toSkip, limit, myFilters.filters).then((data) => {
      console.log(data.data);
      if (data.err) {
        setError(data.err);
      } else {
        console.log(filteredResults);

        setFilteredResults([...filteredResults, ...data.data]);
        setSize(data.size);
        setSkip(toSkip);
        console.log(filteredResults);
      }
    });
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <div className="loadMoreButtonShop">
          <button onClick={loadMore} className="btn btn-warning mb-5">
            Load more
          </button>
        </div>
      )
    );
  };

  useEffect(() => {
    init();
    loadFilterResults(skip, limit, myFilters.filters);

    console.log(filteredResults);
  }, []);

  const handleFilters = (filters, filterBy) => {
    // console.log("shop", filters, filterBy);
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;

    if (filterBy == "price") {
      let priceValues = handlePrice(filters);
      newFilters.filters[filterBy] = priceValues;
    }

    loadFilterResults(myFilters.filters);
    setMyFilters(newFilters);
  };

  const handlePrice = (value) => {
    const data = prices;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        array = data[key].array;
      }
    }
    return array;
  };
  const showLoading = (loading) =>
    loading && (
      <div className="alert alert-info">
        <h2>Loading...</h2>
      </div>
    );
  return (
    <>
      <div className="container-fluid shopMain">
        {showLoading(loading)}

        <div className="row">
          <div className="col-md-3">
            <div className="colmd3">
              <h5>Categories</h5>
              <ul>
                <Checkbox
                  categories={categories}
                  handleFilters={(filters) =>
                    handleFilters(filters, "category")
                  }
                />
              </ul>

              <h5>Price range</h5>
              <div>
                <Radiobox
                  prices={prices}
                  handleFilters={(filters) => handleFilters(filters, "price")}
                />
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <div className="colmd9">
              <h5 className="mb-4">Products</h5>
              <div className="row">
                {filteredResults.map((product, i) => (
                  <div key={i} className="col-md-4 col-sm-12 mb-3">
                    <Card product={product} />
                  </div>
                ))}
              </div>
              {loadMoreButton()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
