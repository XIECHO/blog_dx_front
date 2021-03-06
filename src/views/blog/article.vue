<template>
  <div
    v-if="articleData"
    class="main article"
    :class="{ smallScreen: isSmallScreen }"
  >
    <div class="article-content">
      <h1 class="title">{{ articleData.title }}</h1>
      <div class="info">
        <div class="info-row tags">
          <div
            v-for="(tag, index) in articleData.tags"
            :key="index"
            class="item-tags"
          >
            <svg-icon icon-class="tag" class-name="icon" />
            <span class="text">
              <router-link :to="{ name: 'tagArchive', params: { tag: tag } }">
                {{ tag }}
              </router-link>
            </span>
          </div>
        </div>
        <div class="info-row clearfix">
          <div v-show="articleData.lastDate" class="date">
            最后编辑于：<span>{{ articleData.lastDate | formatDate }}</span>
          </div>
          <div v-show="articleData.readCount" class="read-count">
            阅读量：<span>{{ articleData.readCount }}</span>
          </div>
        </div>
      </div>
      <!--内容-->
      <div
        v-show="articleData.content"
        ref="content"
        class="content md2html"
        v-html="articleData.content"
      />
      <!--其他-->
      <div class="more clearfix">
        <div v-if="prev" class="more-item more-prev">
          <template v-if="prev._id">
            <router-link
              :to="{ name: 'article', params: { articleId: prev._id } }"
              replace
            >
              上一篇：{{ prev.title }}
            </router-link>
          </template>
        </div>

        <div v-if="next" class="more-item more-next">
          <template v-if="next._id">
            <router-link
              :to="{ name: 'article', params: { articleId: next._id } }"
              replace
            >
              下一篇：{{ next.title }}
            </router-link>
          </template>
        </div>
      </div>
      <!--评论-->
      <comment
        ref="comment"
        :article-id="articleId"
        :article-title="articleData.title"
      />
    </div>
    <div class="article-catalog">
      <div class="catalog-title">目录</div>
      <div class="catalog-list">
        <a
          v-for="(item, index) in articleData.catalog"
          :key="index"
          class="list-item"
          :data-lev="item.lev"
          :href="'#' + item.id"
        >
          {{ item.text }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { GetSingle, GetPrev, GetNext } from "@/api/article";
import { formatDate } from "@/utils";
import comment from "@/components/comment/comment";

export default {
  name: "ArticlePage",
  components: {
    comment
  },
  data() {
    return {
      articleId: "",
      articleData: "",
      prev: {},
      next: {}
    };
  },
  computed: {
    isSmallScreen() {
      return this.$store.state.isSmallScreen;
    }
  },
  created() {
    this.articleId = this.$route.params.articleId;
    this.getData();
  },
  // keep-alive 命中缓存时 如果文章 id 改变，则更新内容
  activated() {
    const articleId = this.$route.params.articleId;
    if (articleId !== this.articleId) {
      this.articleId = articleId;
      this.getData();
    }
  },
  methods: {
    getData() {
      this.isArticlePageShow = false;
      GetSingle(this.articleId)
        .then(res => {
          this.articleData = res.data.resData[0];

          const date = this.articleData.date;
          GetPrev(date).then(res => {
            this.prev = res.data.resData[0];
          });

          GetNext(date).then(res => {
            this.next = res.data.resData[0];
          });

          // 获取评论
          this.$nextTick(() => {
            console.log(this.$refs.comment);
            this.$refs.comment.getComments();
          });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  beforeRouteUpdate(to, from, next) {
    const articleId = to.params.articleId;
    if (articleId !== this.articleId) {
      this.articleId = articleId;
      this.getData();
    }
    next();
  },
  filters: {
    formatDate(time) {
      return formatDate(new Date(time), "yyyy-MM-dd hh:mm");
    }
  }
};
</script>

<style lang="scss">
.article {
  text-align: left;
  flex-wrap: nowrap;
  &.smallScreen {
    .article-content {
      margin-left: 100px;
    }
    .article-catalog {
      width: 100px;
    }
  }
  /*主体部分*/
  .article-content {
    margin-left: 220px;
  }
  .title {
    margin: 20px 0;
    font-size: $font-size-lg;
    font-weight: bold;
  }
  .info {
    padding: 6px;
  }
  .info-row {
    padding: 4px 0;
    color: $color-tint;
  }
  .tags {
    margin-bottom: 10px;
    font-size: $font-size-sm;
    line-height: 1;
    .item-tags {
      display: inline;
      & + .item-tags {
        margin-left: 10px;
      }
    }
    .text {
      color: $color-link;
      cursor: pointer;
    }
    .icon {
      margin-right: 6px;
    }
  }
  .date {
    float: left;
  }
  .read-count {
    margin-right: 4px;
    float: right;
  }
  .content {
    margin-top: 20px;
    padding-bottom: 20px;
    border-top: 1px solid $color-border;
    border-bottom: 1px solid $color-border;
  }
  .more {
    margin-top: 10px;
    line-height: 30px;
    .more-item {
      max-width: 48%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .more-prev {
      float: left;
    }
    .more-next {
      float: right;
    }
  }
  /*目录*/
  .article-catalog {
    position: fixed;
    top: 60px;
    // left: 10px;
    width: 200px;
    .catalog-title {
      margin-bottom: 10px;
      color: $color-tint;
      font-size: $font-size-md;
      font-weight: bold;
    }
    .list-item {
      display: block;
      line-height: 2;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: $color-base;
      &:hover {
        background-color: rgba(0, 0, 0, 0.06);
      }
      &[data-lev="2"] {
        padding-left: 4px;
        font-weight: bold;
      }
      &[data-lev="3"] {
        padding-left: 10px;
        font-weight: bold;
      }
      &[data-lev="4"] {
        padding-left: 16px;
      }
      &[data-lev="5"] {
        padding-left: 22px;
      }
    }
  }
}
</style>
