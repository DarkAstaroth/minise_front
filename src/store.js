import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const persistConfig = {
  key: "main-root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(
  persistedReducer,
  compose(
    applyMiddleware(thunk),
    typeof window === "object" &&
      typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== "undefined"
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f
  )
);
const Persistor = persistStore(store);

export { Persistor };
export default store;

// const store =
// createStore(
//   reducer,
//   compose(
//     applyMiddleware(thunk),

//     typeof window === "object" &&
//       typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== "undefined"
//       ? window.__REDUX_DEVTOOLS_EXTENSION__()
//       : (f) => f
//   )
// );

// export default store;
