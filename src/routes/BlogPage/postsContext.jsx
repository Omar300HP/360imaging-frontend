import { createContext, useContext } from "react";

export const PostsContext = createContext();

export function usePostsContext() {
  return useContext(PostsContext);
}
