import axios from "axios";
import React, { useState, useEffect } from "react";

const TableFilter = () => {
  const [data, setData] = useState([]);
  const [val, setVal] = useState("");
  const [val2, setVal2] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const postData = () => {
    axios
      .post(`https://fakestoreapi.com/products`, {
        id: 21,
        title: "test product",
        price: 13.5,
        description: "lorem ipsum set",
        image: "https://i.pravatar.cc",
        category: "electronic",
        rating: { rate: 3.9, count: 145 },
      })
      .then((res) => {
        console.log(res.data);
      });
  };

  const getData = async () => {
    postData();
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

  // const reducedArray = data.reduce((accumulator, currentObject) => {
  //   accumulator.push(currentObject.title); // Replace 'property' with the actual property name you want to extract
  //   return accumulator.sort();
  // }, []);

  // console.log(reducedArray);
  // const sortTableByProperty = () => {
  //   const reducedArray = data.map((object) => object.title).sort();
  //   console.log(data);
  // };

  const sortTableByProperty = (property) => {
    const sortedData = [...data].sort((a, b) => {
      if (a[property] < b[property]) {
        return sortOrder === "asc" ? -1 : 1;
      }
      if (a[property] > b[property]) {
        return sortOrder === "asc" ? 1 : -1;
      }
      return 0;
    });

    setData(sortedData);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  useEffect(() => {
    getData();
  }, []);

  // useEffect(() => {
  //   setData(sorted);
  // }, []);
  return (
    <div className="d-flex">
      <div className="filter-table">
        <h1 className="filter-title">Filter Table</h1>
        <form>
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
          <button>Post new data</button>
        </form>
      </div>
      <div>
        <button
          onClick={() => sortTableByProperty("title")}
          className="sort-table"
        >
          Sort table by title
        </button>
        <button
          onClick={() => sortTableByProperty("price")}
          className="sort-table"
        >
          Sort table by price
        </button>
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
