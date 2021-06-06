import { usePostsContext } from "../../postsContext";
import { Post } from "../Post";

function PostsList(props) {
  const { actualPosts } = usePostsContext();

  return (
    <div className="posts-list">
      {actualPosts?.length > 0 &&
        actualPosts.map((post, index) => {
          return <Post key={index} postData={{ ...post, id: index }} />;
        })}
    </div>
  );
}

export default PostsList;
