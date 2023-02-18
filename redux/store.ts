import { createStore, applyMiddleware, combineReducers } from "redux";
// import { configureStore } from '@reduxjs/toolkit'
import TasksReducer from "./reducers/tasks";
import CurrentTaskReducer from "./reducers/currentTask";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";

const allReducers = combineReducers({
  tasks: TasksReducer,
  currentTask: CurrentTaskReducer,
});

export default createStore(
  allReducers,
  composeWithDevTools(applyMiddleware(thunk))
);
