import { useState, useEffect } from "react";
import axios from "axios";
import styled, { ThemeProvider } from "styled-components";
import SearchBar from "./SearchBar";
import PostList from "./PostList";
import { lightTheme, darkTheme } from "./ThemeModes";

const AppWrapper = styled.div`
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.color};

  transition: background-color 0.3s, color 0.3s;
  min-height: 100vh;

  padding: 40px 100px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 480px) {
    /* Styles for smartphone screens */
    padding: 5px;
  }
`;

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-bottom: 20px;
  flex-wrap: nowrap;
  gap: 10px;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const DarkModeButton = styled.button`
  background-color: ${(props) => props.theme.darkButtonColor};
  color: ${(props) => props.theme.color};
  height: 80%;
`;

const SortButton = styled.button`
  background-color: ${(props) => props.theme.sortButtonColor};
  color: ${(props) => props.theme.color};
  height: 80%;
`;

const App = () => {
  const [posts, setPosts] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    fetchAllPosts();
  }, []);

  const fetchAllPosts = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
    }
  };

  const handleSearch = async (query) => {
    if (!query) {
      fetchAllPosts();
      return;
    }

    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const filteredPosts = response.data.filter(
        (post) => post.title.includes(query) || post.body.includes(query)
      );
      setPosts(filteredPosts);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
    }
  };

  const handleSortByLength = () => {
    const sortedPosts = [...posts].sort(
      (a, b) => b.title.length - a.title.length
    );
    setPosts(sortedPosts);
  };

  const handleThemeToggle = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <div style={{ minWidth: "100vw", minHeight: "100vh" }}>
        <AppWrapper>
          <Menu>
            <SortButton onClick={handleSortByLength}>
              Sort by Title Length
            </SortButton>
            <SearchBar onSearch={handleSearch} isDarkMode={isDarkMode} />
            <DarkModeButton onClick={handleThemeToggle}>
              {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            </DarkModeButton>
          </Menu>
          <PostList posts={posts} isDarkMode={isDarkMode} />
        </AppWrapper>
      </div>
    </ThemeProvider>
  );
};

export default App;
