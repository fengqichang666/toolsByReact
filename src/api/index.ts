import { get, post } from "@/axios/http";

export const getDirectory = () => {
  return get(
    "https://api.github.com/repos/fengqichang666/filesManage/contents"
  );
};
export const getBrand = () => {
  return get("/api/selectAll");
};
