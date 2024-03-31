import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

                                    // base type
const fetchUsers = createAsyncThunk('users/fetch', async () => {
    const response = await axios.get("http://localhost:3005/users");
    
    // DEV ONLY!!!
    await pause(1000);

    // return 的值自動變成 action.payload
    return response.data;
});

// 自動被 assign 
// fetchUsers.pending === 'users/fetch/pending' 代表 request 開始了
// fetchUsers.fulfilled === 'users/fetch/fulfilled' 代表 request 成功結束
// fetchUsers.rejected === 'users/fetch/rejected' 代表有錯誤

// 以下為 DEV ONLY!!!
const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
}

export { fetchUsers };