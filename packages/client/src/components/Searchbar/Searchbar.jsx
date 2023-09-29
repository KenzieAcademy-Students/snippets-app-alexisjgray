import React from "react";
import { useState } from "react";

const SearchBar = ({ keywords, setKeywords }) => {
  const handleSearchInputChange = (e) => {
    e.preventDefault();
    setKeywords(e.target.value);
  };

  const handleClearSearchInput = (e) => {
    setKeywords("");
  };

  return (
    <form action="/search">
      <input
        type="text"
        placeholder="Search here"
        onChange={handleSearchInputChange}
        value={keywords}
      />
      <input
        type="reset"
        value="X"
        alt="Clear the search form"
        onClick={handleClearSearchInput}
      />
      <input type="submit" value="Search" />
    </form>
  );
};

export default SearchBar;
