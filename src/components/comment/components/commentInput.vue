<template>
  <div>
    <div v-if="isLogin">
      <div class="comment-input">
        <Textarea
          ref="inputTextarea"
          v-model="commentValue"
          class="input-textarea"
          :autofocus="autofocus"
          placeholder="说点什么..."
        />
        <div class="input-control clearfix">
          <button class="control-commit" @click="newCommentClick">
            评论
          </button>
        </div>
      </div>
    </div>
    <div v-else>
      评论，请
      <a @click="login">登录</a>
    </div>
  </div>
</template>

<script>
import Textarea from "@/components/Textarea";
import { SaveFollowComment, SaveComment } from "@/api/comment";

export default {
  name: "CommentInput",
  components: {
    Textarea
  },
  props: {
    articleId: {
      type: String,
      default: ""
    },
    articleTitle: {
      type: String,
      default: ""
    },
    currentFollowId: {
      type: String,
      default: ""
    },
    currentFollowUser: {
      type: String,
      default: ""
    },
    autofocus: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      commentValue: "",
      isLogin: false
    };
  },
  mounted() {
    if (this.currentFollowId) {
      this.$refs.inputTextarea.focus();
    }
  },
  methods: {
    login() {},
    // 发表一级评论
    newCommentClick() {
      const userInfo = this.$store.state.userInfo;
      if (!userInfo.id) {
        this.$store.dispatch("uodateIsLoginModalShow", true);
        return;
      }
      const commentData = {
        user: userInfo.name,
        avatar_url: userInfo.avatar_url,
        comment_content: this.commentValue
      };
      let requestFn;
      if (this.currentFollowId) {
        requestFn = SaveFollowComment;
        commentData.follow_id = this.currentFollowId;
        commentData.follow_user = this.currentFollowUser;
      } else {
        requestFn = SaveComment;
        commentData.article_title = this.articleTitle;
        commentData.article_id = this.articleId;
        commentData.comment_follow = [];
      }
      requestFn(commentData)
        .then(() => {
          this.$Message.success("评论成功！");
          // 清空输入框 触发输入框失焦事件
          this.commentValue = "";
          this.textareaBlur();
          this.$emit("getComments");
        })
        .catch(() => {
          this.$Message.error("评论失败！请稍后再试。");
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.comment-input {
  margin: 10px 0;
  padding: 14px 10px;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.02);
  .input-textarea {
    overflow-x: hidden;
  }
  .input-textarea > textarea {
    resize: none;
    overflow-x: hidden;
  }
  .input-control {
    margin-top: 10px;
    .control-commit {
      float: right;
      width: 60px;
      height: 30px;
      border: none;
      border-radius: 4px;
      background-color: $color-main;
      color: #fff;
      cursor: pointer;
    }
    .control-commit[disabled] {
      opacity: 0.6;
      cursor: default;
    }
  }
}
</style>
