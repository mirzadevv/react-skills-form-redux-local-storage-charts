import { combineReducers, createStore } from "redux";
import formDataReducer from "./formData/formDataReducer";
import { saveState, loadState } from "../utils/localStorage";

const persistedState = loadState();

const reducers = combineReducers({
  formData: formDataReducer,
});

const store = createStore(
  reducers,
  persistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
  saveState({
    formData: store.getState().formData,
  });
});

export default store;
