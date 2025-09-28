import { configureStore } from '@reduxjs/toolkit'
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

import BaseQuery from "./rtk/api/BaseQuery";

const ReduxStore = configureStore({
    reducer: {
        'API': BaseQuery.reducer,
    },
    middleware: (getdefaultMiddlewars) => getdefaultMiddlewars({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }).concat(BaseQuery.middleware)
});

export const persistor = persistStore(ReduxStore);

export default ReduxStore;