import React from "react";
import { FaSearch } from "react-icons/fa";
import { BsX } from "react-icons/bs";
import MyInput from "./UI/Input/MyInput";
import MySelect from "./UI/Select/MySelect";

function Filter({ filter, setFilter, select, setSelect }) {
  const clearInput = () => {
    setFilter({ ...filter, query: "" });
  };

  return (
    <form>
        <div className="form blog-container d-flex flex-wrap justify-content-lg-between justify-content-md-between justify-content-sm-between justify-content-center">
          <FaSearch className="position-absolute search-icon" />
          {filter.query.length ? (
            <BsX onClick={clearInput} className="clear-icon" />
          ) : null}
          <MyInput
            value={filter.query}
            onChange={(e) => setFilter({ ...filter, query: e.target.value })}
            className="form-control pl-5 mt-5 search-input"
            placeholder="Search for a country"
          />
          <MySelect
            value={select.option}
            onChange={(selected) => setSelect({ ...select, option: selected })}
            defaultValue="Sorted by Region"
            options={[
              { id: 1, region: "Africa" },
              { id: 2, region: "Americas" },
              { id: 3, region: "Asia" },
              { id: 4, region: "Europe" },
              { id: 5, region: "Oceania" },
            ]}
          />
        </div>
    </form>
  );
}

export default Filter;
