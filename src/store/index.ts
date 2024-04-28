import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user";
// 注册
const store = configureStore({
    // 合并多个Slice
  reducer: {
    user: userSlice
  },
}
);
// 导出
export default store;
