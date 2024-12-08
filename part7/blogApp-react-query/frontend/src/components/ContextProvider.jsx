import { useReducer } from "react";
import blogReducer from "../reducers/blogReducer";
import userReducer from "../reducers/userReducer";
import { BlogContext, queryClient, UserContext } from "../services/blogService";
import { QueryClientProvider } from "@tanstack/react-query";






const ContextProvider = (props) => {

  const [blogs, blogsDispatch] = useReducer(blogReducer, [])
  const [user, userDispatch] = useReducer(userReducer, '')

  return (
    <QueryClientProvider client={queryClient}>
      <BlogContext.Provider value={[blogs, blogsDispatch]}>
          <UserContext.Provider value={[user, userDispatch]}>
            {props.children}
          </UserContext.Provider>
      </BlogContext.Provider>
    </QueryClientProvider>
  )
}

export default ContextProvider