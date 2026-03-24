import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import feedReducer from './slices/feedSlice'
import connectionReducer from './slices/feedSlice'
const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connection : connectionReducer
  }
})

export default appStore