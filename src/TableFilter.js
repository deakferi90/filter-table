import axios from "axios";
import React, { useState, useEffect } from "react";
//import FilterList from "./FilterList";

const TableFilter = () => {
  const [data, setData] = useState([]);
  const [val, setVal] = useState("");
  const [val2, setVal2] = useState("");

  const getData = async () => {
    await axios
      .get(`https://fakestoreapi.com/products`)
      .then((response) => setData(response.data));
  };

  const filterTableList = (data) => {
    if (data.price > val && data.price <= val2) {
      return data;
    } else if (val === "" || val2 === "") {
      return data;
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="d-flex">
      <div className="filter-table">
        <h1 className="filter-title">Filter Table</h1>
        <form action="/form/submit" method="post">
          <div className="filter-container">
            <label className="input-label">From: </label>
            <input
              className="input-field"
              onChange={(e) => setVal(e.target.value)}
              type="number"
            />
          </div>
          <div className="filter-container">
            <label className="input-label">To: </label>
            <input
              className="input-field"
              onChange={(e) => setVal2(e.target.value)}
              type="number"
            />
          </div>
        </form>
      </div>
      <table className="product-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Image</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {data
            .filter((d) => filterTableList(d))
            .map((d) => (
              <tr key={d.id}>
                <td className="products">{d.title}</td>
                <td className="products">{d.description}</td>
                <td className="products">
                  <img className="product-img" src={d.image} alt="" />
                </td>
                <td className="products">
                  {d.price}
                  {`$`}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableFilter;
