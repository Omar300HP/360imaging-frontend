import { Post } from "../Post";

function PostsList(props) {
  const { posts } = props;
  return (
    <div className="posts-list">
      {posts?.length > 0 &&
        posts.map((post, index) => {
          return <Post key={index} postData={post} />;
        })}
    </div>
  );
}

export default PostsList;
