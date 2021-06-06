import React from "react";
import PropTypes from "prop-types";
import { Post } from "../Post";

function PostsList(props) {
  const posts = [
    {
      id: "1",
      poster: "User Muliplayer",
      textContent: "dfjghdsfgjdfjgjdfgj",
      images: [
        "https://st.depositphotos.com/1428083/2946/i/600/depositphotos_29460297-stock-photo-bird-cage.jpg",
        "https://media.istockphoto.com/photos/child-hands-formig-heart-shape-picture-id951945718?k=6&m=951945718&s=612x612&w=0&h=ih-N7RytxrTfhDyvyTQCA5q5xKoJToKSYgdsJ_mHrv0=",
      ],
      comments: [
        { user: "User 2", textContent: "dfsxajfsdijfsijfisj" },
        { user: "User 2", textContent: "dfsxajfsdijfsijfisj" },
      ],
    },
    {
      id: "2",
      poster: "User Muliplayer",
      textContent: "dfjghdsfgjdfjgjdfgj",
      images: [
        "https://st.depositphotos.com/1428083/2946/i/600/depositphotos_29460297-stock-photo-bird-cage.jpg",
        "https://media.istockphoto.com/photos/child-hands-formig-heart-shape-picture-id951945718?k=6&m=951945718&s=612x612&w=0&h=ih-N7RytxrTfhDyvyTQCA5q5xKoJToKSYgdsJ_mHrv0=",
      ],
      comments: [{ user: "User 2", textContent: "dfsxajfsdijfsijfisj" }],
    },
  ];
  return (
    <div className="posts-list">
      {posts?.length > 0 &&
        posts.map((post, index) => {
          return <Post key={index} postData={post} />;
        })}
    </div>
  );
}

PostsList.propTypes = {};

export default PostsList;
