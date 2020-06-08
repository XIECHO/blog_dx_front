import service from "@/utils/request";

export function GetComments(id) {
  return service.request({
    url: `/comment/get_comments?article_id=${id}`,
    method: "get"
  });
}

/**
 * 新增一级评论
 * @param {Object} data 评论数据
 */
export function SaveComment(data) {
  return service.request({
    url: "comment/save_comment",
    method: "post",
    data
  });
}

/**
 * 新增二级评论
 * @param {Object} data 评论数据
 */
export function SaveFollowComment(data) {
  return service.request({
    url: "comment/save_follow_comment",
    method: "post",
    data
  });
}

/**
 * 删除一级评论
 * @param {Object} data 评论数据
 */
export function RemoveComment(data) {
  return service.request({
    url: "comment/remove_comment",
    method: "post",
    data
  });
}

/**
 * 删除二级评论
 * @param {Object} data 评论数据
 */
export function RemoveFollowComment(data) {
  return service.request({
    url: "comment/remove_follow_comment",
    method: "post",
    data
  });
}
