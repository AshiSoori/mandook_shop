import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import SearchIcon from "@mui/icons-material/Search";
import classes from "./SearchBox.module.css";
import SearchModal from "./SearchModal";
function SearchBox({ query, setQuery, setCategories }) {
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim()) {
        fetch(
          `http://localhost/backend/search.php?q=${encodeURIComponent(query)}`
        )
          .then((res) => res.json())
          .then((data) => setCategories(data))
          .catch((err) => console.error(err));
      } else {
        setCategories([]);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(delayDebounce);
  }, [query, setCategories]);

  return (
    <div className="searchBox">
      <InputGroup>
        <InputGroup.Text id="btnGroupAddon">
          <SearchIcon fontSize="medium" />
        </InputGroup.Text>

        <Form.Control
          type="text"
          placeholder="جستجو بر اساس عنوان محصول..."
          aria-label="Input group example"
          aria-describedby="btnGroupAddon"
          className={classes["form-placeholder"]["input-form"]}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </InputGroup>
    </div>
  );
}

export default SearchBox;
