import { combineReducers, createStore } from "redux";
import { authReducer } from "./reducers/authReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { postsReducer } from "./reducers/postsReducer";

const rootReducers = combineReducers({
  auth: authReducer,
  posts: postsReducer,
});

export const store = createStore(rootReducers, composeWithDevTools());
