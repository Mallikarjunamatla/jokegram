import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import storageSession from 'redux-persist/lib/storage/session'



import userReducer from "./userReducer";
import articleReducer from "./articleReducer";



const persistConfig = {
	key : 'root',
	storage : storageSession,
	whitelist : ['articleState']
}

const rootReducer = combineReducers({
	userState: userReducer,
	articleState: articleReducer,
});




export default persistReducer(persistConfig,rootReducer);
