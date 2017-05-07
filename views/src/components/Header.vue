<template lang="html">
  <header class="site-header">
    <div class="container clearfix header-container">
      <router-link class="site-name text-black" to="/">
        <h1 class="pull-left">我的博客</h1>
      </router-link>
      <div class="logo inline-block">
        <span>LOGO</span>
      </div>
      <el-menu ref="header" :default-active="activeIndex" class="site-menus pull-right" mode="horizontal" :router="true">
        <el-menu-item index="/" class="site-menu" :route="{path: '/'}">首页</el-menu-item>
        <el-menu-item index="/me" class="site-menu">我</el-menu-item>
        <el-submenu index="login/signup" class="site-menu">
          <template slot="title">
            <span class="submenu-title">登录/注册</span>
          </template>
          <el-menu-item index="/login" class="text-center" :route="{path: '/login'}">登陆</el-menu-item>
          <el-menu-item index="/signup" class="text-center" :route="{path: '/signup'}">注册</el-menu-item>
        </el-submenu>
        <el-menu-item index="/signout" class="site-menu"><span @click="signout">退出</span></el-menu-item>
        <a href="https://github.com/zvit1" target="_blank">
          <img src="../assets/imgs/github.png" class="github">
        </a>
      </el-menu>
    </div>
  </header>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: '/'
    }
  },
  methods: {
    signout () {
      const context = this
      context.$http.get('/api/signout').then(response => {
        if (response.body.resultCode !== '001') {
          context.$toasted.error(response.body.resultContent)
          return
        }
        context.$toasted.success(response.body.resultContent)
        context.$router.push({ name: 'home' })
      }).catch(e => {
        throw new Error(e)
      })
    }
  }
}
</script>

<style lang="css" scoped>
.site-header {
  border-bottom: 1px solid #bebebe;
  box-shadow: 0 0 2px 0 #bebebe;
}
.site-name:focus {
  outline: none;
}
.site-name:active {
  color: #1F2D3D;
}
h1 {
  height: 60px;
  margin: 0;
  padding-right: 0.6em;
  line-height: 60px;
  font-size: 1.6em;
  display: inline-block;
}
.logo {
  height: 60px;
  padding-left: 0.6em;
  line-height: 60px;
  font-size: 1.6em;
}
.site-menus {
  background-color: #fff;
}
.site-menu {
  font-size: 16px;
}
.submenu-title {
  font-size: 16px;
}
.github {
  width: 30px;
  position: relative;
  top: 12px;
}
</style>
