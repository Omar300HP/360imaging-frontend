import useCollection from "../../../../custom-hooks/useCollection";
import { Post } from "../Post";

function PostsList(props) {
  const posts = useCollection({ path: "get_posts" }).state.docs;
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
