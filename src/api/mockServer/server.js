import POSTS from "./GET/POSTS";

const respones = {
  ["get_posts"]: POSTS,
  ["post_new_blog"]: POSTS,
};

// mock axios post/get api call
export const apiCall = async (path, values, id) => {
  document.body.classList.add("loading-spinner");
  return new Promise((resolve) => {
    setTimeout(() => {
      document.body.classList.remove("loading-spinner");
      let finalResponse = respones[path];
      if (path === "post_new_blog") {
        finalResponse.data.push(values);
      }
      resolve({ data: { ...finalResponse } });
    }, 1000);
  });
};
