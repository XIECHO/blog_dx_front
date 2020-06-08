import service from "@/utils/request";

export const GetInfo = function(params) {
  return service.request({
    url: "/github",
    method: "get",
    params
  });
};
