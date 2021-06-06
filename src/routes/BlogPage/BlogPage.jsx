import { useEffect, useState } from "react";
import "./BlogPage.scss";
import { NewBlog, PostsList } from "./components";
import useCollection from "../../custom-hooks/useCollection";
import { PostsContext } from "./postsContext";

function BlogPage(props) {
  const [actualPosts, setActualPosts] = useState([]);
  const posts = useCollection({ path: "get_posts" }).state.docs;

  useEffect(() => {
    if (posts?.length > 0) {
      setActualPosts(posts);
    }
  }, [posts]);

  const addNewPost = (newPost) => {
    setActualPosts([newPost, ...actualPosts]);
  };

  const deletePost = (id) => {
    const temp = [...actualPosts];
    // temp.filter(el => el.id != id)
    temp.splice(id, 1);
    document.body.classList.add("loading-spinner");
    return new Promise((resolve) => {
      setTimeout(() => {
        document.body.classList.remove("loading-spinner");
        resolve(setActualPosts(temp));
      }, 1000);
    });
  };

  const updatePost = (id, newpost) => {
    const temp = [...actualPosts];
    temp[id] = newpost;
    document.body.classList.add("loading-spinner");
    return new Promise((resolve) => {
      setTimeout(() => {
        document.body.classList.remove("loading-spinner");
        resolve(setActualPosts(temp));
      }, 1000);
    });
  };

  return (
    <PostsContext.Provider
      value={{ actualPosts, addNewPost, deletePost, updatePost }}
    >
      <div className="blog-page">
        <NewBlog />
        <PostsList />
      </div>
    </PostsContext.Provider>
  );
}

export default BlogPage;
