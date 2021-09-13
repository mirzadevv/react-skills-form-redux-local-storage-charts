import { combineReducers, createStore } from "redux";
import formDataReducer from "./formData/formDataReducer";
const reducers = combineReducers({
  formData: formDataReducer,
});

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
