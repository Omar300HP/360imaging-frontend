import { useEffect } from "react";
import "./BlogPage.scss";
import { NewBlog, PostsList } from "./components";
import { apiCall } from "../../api/mockServer/server";

function BlogPage(props) {
  return (
    <div className="blog-page">
      <NewBlog />
      <PostsList />
    </div>
  );
}

export default BlogPage;
