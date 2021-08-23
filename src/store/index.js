import { applyMiddleware, createStore } from "redux";
import { persistStore } from "redux-persist";
import thunkMiddleware from "redux-thunk";
import rootReducers from "../reducers";

const store = createStore(rootReducers, applyMiddleware(thunkMiddleware));
const persistor = persistStore(store);

export  { store, persistor };
