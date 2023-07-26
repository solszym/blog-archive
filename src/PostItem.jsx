import { lightTheme, darkTheme } from "./ThemeModes";
import styled from "styled-components";

const PostBox = styled.li`
  background-color: ${(props) => props.theme.postColor};
  list-style-type: none;
  padding: 0 20px;
  border-radius: 10px;
  box-shadow: 8px 8px 24px -15px rgba(66, 68, 90, 1);
`;

const PostItem = ({ post, isDarkMode }) => {
  return (
    <PostBox theme={isDarkMode ? darkTheme : lightTheme}>
      <h3 style={{ fontStyle: "italic" }}>{post.title}</h3>
      <p>{post.body}</p>
    </PostBox>
  );
};

export default PostItem;
