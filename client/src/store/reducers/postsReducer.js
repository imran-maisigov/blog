const initialState = {
  posts: [],
  post: {},
};

export const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD":
      return {
        posts: action.payload.posts,
      };

    case "VIEW":
      return {
        post: action.payload.post,
      };

    default: {
      return state;
    }
  }
};
