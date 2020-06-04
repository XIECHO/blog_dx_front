import service from "@/utils/request";

export function GetList(params) {
  return service.request({
    method: "get",
    url: "/article/list",
    params
  });
}

export function GetSingle(id) {
  return service.request({
    url: `/article/single?_id=${id}`,
    method: "get"
  });
}

export function GetPrev(date) {
  return service.request({
    url: `/article/prev?date=${date}`,
    method: "get"
  });
}

export function GetNext(date) {
  return service.request({
    url: `/article/next?date=${date}`,
    method: "get"
  });
}

export function GetListByType(type, params) {
  return service.request({
    url: `/article/${type}`,
    method: "get",
    params
  });
}
