import { configureStore } from '@reduxjs/toolkit';
import watchlistReducer from './watchlistSlice';
// import { createStore, combineReducers } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';

// const rootReducer = combineReducers({
//   watchlist: watchlistReducer
// });

const store = configureStore({
    reducer: {
        watchlist: watchlistReducer,
    },
});

// const store = createStore(rootReducer, composeWithDevTools());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { store };
