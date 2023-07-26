import PostItem from "./PostItem";

const PostList = ({ posts, isDarkMode }) => {
  return (
    <div style={{ minWidth: "100%" }}>
      {posts.length > 0 ? (
        <ul
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr)",
            gap: "20px",
            padding: "0",
          }}
        >
          {posts.map((post) => (
            <PostItem key={post.id} post={post} isDarkMode={isDarkMode} />
          ))}
        </ul>
      ) : (
        <p>No matching posts found.</p>
      )}
    </div>
  );
};

export default PostList;
