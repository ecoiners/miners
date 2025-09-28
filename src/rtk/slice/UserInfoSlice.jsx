import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userId: "",
    _id: "",
    userName: "",
    gameStartTime: null, // Store the game start time
};

const UserInfoSlice = createSlice({
    name: "UserInfo",
    initialState: initialState,
    reducers: {
        setUser(state, action) {
            if (action?.payload?.userId) {
                state.userId = action?.payload?.userId;
            }
            if (action?.payload?.userName) {
                state.userName = action?.payload?.userName;
            }
        },
        setMongooseId(state, action) {
            if (action?.payload?._id) {
                state._id = action?.payload?._id;
            }
        },
        setGameStartTime(state, action) {
            state.gameStartTime = action.payload; // Store the start time
        },
        setClearUser(state) {
            return initialState; // Reset state to the initial values
        }
    }
});

export const { setUser, setClearUser, setMongooseId, setGameStartTime } = UserInfoSlice.actions;
export default UserInfoSlice;