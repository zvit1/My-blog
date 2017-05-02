<template lang="html">
  <section class="posts">
    <my-post :post="post" v-for="(post, i) in posts" key="'post' + i"></my-post>
    <el-pagination class="posts-pagination" :total="211" :layout="'prev, pager, next, jumper, total'"></el-pagination>
  </section>
</template>

<script>
// 文章列表页的单个文章模块
const Post = {
  template: `
    <article class="post">
      <div class="post-header">
        <el-tag title="分类" class="post-category" type="primary">{{post.category}}</el-tag>
        <span title="标题" class="post-title">{{post.title}}</span>
      </div>
      <p class="post-meta">
        <span title="作者" class="post-author">{{post.author}}</span>
        <span title="创建时间" class="post-time">{{post.createdTime}}</span>
      </p>
      <p class="post-body">{{post.content.slice(0,30) + '...'}}</p>
    </article>
  `,
  props: ['post']
}
export default {
  data () {
    return {
      posts: [{
        title: '标题1标题1标题1标题1标题1标题1标题1标题1标题1标题1标题1',
        category: '分类1',
        createdTime: '2017-04-30 16:36:00',
        author: 'zvit',
        content: '正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容'
      }, {
        title: '标题2',
        category: '分类2',
        createdTime: '2017-04-30 16:36:00',
        author: 'zvit',
        content: '正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容'
      }]
    }
  },
  components: {
    'my-post': Post
  }
}
</script>

<style lang="css">
.post-category {
  font-size: 14px;
}
</style>
