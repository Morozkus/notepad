import { combineReducers, configureStore } from "@reduxjs/toolkit";
import NoteSlice from "./reducers/NoteSlice";
import { noteApi } from "../Services/NoteService";


const rootReducer = combineReducers({
    NoteSlice,
    [noteApi.reducerPath]: noteApi.reducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware()
                .concat(noteApi.middleware)
    })
}

// Типизация редусеров
export type RootState = ReturnType<typeof rootReducer>

// Тип стора
export type AppStore = ReturnType<typeof setupStore>

// Использование только определенных типов
export type AppDispatch = AppStore['dispatch']