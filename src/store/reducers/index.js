import { blogReducer } from "./blogReducer";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
   blog:blogReducer
  });
 
