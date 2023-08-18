import {createSlice} from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage for web


const initialState={name:'',email:'',id:'',liked:[],isLoggedIn:false};

const userSlice=createSlice({
    name:'currentUser',
    initialState,
    reducers:{
        changeCurrentUser(state,action){
            if(action.payload==='reset'){
                return initialState;
            }
            state.email=action.payload.email;
            state.name=action.payload.name;
            state.id=action.payload.id;
            state.liked=action.payload.liked;
            state.isLoggedIn=true;
        },
        changeCurrentUserEmail(state,action){
            state.email=action.payload;
        },
        changeCurrentUserName(state,action){
            state.name=action.payload;
        },
        changeCurrentUserId(state,action){
            state.id=action.payload;
        },
        changeCurrentUserLiked(state,action){
            state.liked=action.payload;
        },
        changeCurrentUserLoggedIn(state,action){
            state.isLoggedIn=action.payload;
        }
        
    }
})
const persistConfig = {
    key: 'root', // key for the persisted data in storage
    storage,
  };
  
  const persistedReducer = persistReducer(persistConfig, userSlice.reducer);
  
  export const store = configureStore({
    reducer: persistedReducer, // Use the persisted reducer
  });
  
  export const actions = userSlice.actions;
