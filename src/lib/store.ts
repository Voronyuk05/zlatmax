import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from 'react-redux'
import storage from "redux-persist/lib/storage";
import { likedReducers } from "./features/liked/likedSlice";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer } from 'redux-persist';
import { basketReducers } from "./features/basket/basketSlice";
import { comparisonReducers } from "./features/comparison/comparisonSlice";

const reducers = combineReducers({
  liked: likedReducers,
  basket: basketReducers,
  comparison: comparisonReducers
})

const persistConfig = {
    key: "root",
    storage,
};

const makeConfiguredStore = () => {
   return configureStore({
      reducer: reducers,
      devTools: process.env.NODE_ENV !== 'production',
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),
    })
}

export const makeStore = () => {
    const isServer = typeof window === 'undefined'
    if (isServer) {
      return makeConfiguredStore()
    } else {
      const persistedReducer = persistReducer(persistConfig, reducers)
      const store = configureStore({
        reducer: persistedReducer,
        devTools: process.env.NODE_ENV !== 'production',
        middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware({
            serializableCheck: {
              ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
          }),
      })
      return store
    }
}
export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()