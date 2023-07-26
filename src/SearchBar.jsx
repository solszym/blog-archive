import { useState } from "react";
import styled from "styled-components";
import { lightTheme, darkTheme } from "./ThemeModes";

const SearchBox = styled.input`
  background-color: ${(props) => props.theme.searchBarColor};
  color: ${(props) => props.theme.placeholderColor};
  border: 1px solid transparent;
  height: 20px;
  border-radius: 20px;
  font-size: 1em;
  padding: 10px;
  font-size: 16px;
  width: 100%;
  // min-width: 100%;
  // max-width: 100%;
  box-sizing: border-box;
  height: 80%;
  &:focus {
    outline: none;
    color: ${(props) => props.theme.placeholderColor};
  }
`;

const SearchBar = ({ onSearch, isDarkMode }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
    onSearch(query);
  };

  return (
    <div style={{ width: "40%" }}>
      <SearchBox
        type="text"
        value={query}
        onChange={handleInputChange}
        theme={isDarkMode ? darkTheme : lightTheme}
      />
    </div>
  );
};

export default SearchBar;
