import POSTS from "./GET/POSTS";

const respones = {
  ["get_posts"]: POSTS,
};

// mock axios post/get api call
export const apiCall = async (path) => {
  document.body.classList.add("loading-spinner");
  return new Promise((resolve) => {
    setTimeout(() => {
      document.body.classList.remove("loading-spinner");
      resolve({ data: { ...respones[path] } });
    }, 1000);
  });
};
