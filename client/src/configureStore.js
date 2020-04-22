import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { verifyAuth } from "./actions/";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import rootReducer from "./reducers";

const persistConfig = {
  key: "root",
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default function configureStore(persistedState) {
  const store = createStore(
    persistedReducer,
    persistedState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
  let persistor = persistStore(store);
  store.dispatch(verifyAuth());
  return { store, persistor };
}
