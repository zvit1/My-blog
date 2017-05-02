<template lang="html">
  <section class="signup center-block">
    <header class="form-header">
      <span>登录</span>
    </header>
    <div class="form-container center-block">
      <el-form :model="loginData" :rules="rule" ref="loginData" label-width="100px">
        <el-form-item label="用户名" prop="username" :required="true">
          <el-input type="text" v-model="loginData.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass" :required="true">
          <el-input type="password" v-model="loginData.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginData')">登录</el-button>
          <el-button @click="resetForm('loginData')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    // 验证用户名是否为空
    const validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    // 验证密码的函数
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      loginData: {
        username: '',
        pass: ''
      },
      rule: {
        username: [
          { validator: validateUsername, trigger: 'blur' }
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="css">
.signup {
  max-width: 700px;
  margin-top: 5em;
  border: 1px solid #ddd;
}
.form-header {
  padding: 0.5em 1em;
  border-bottom: 1px solid #ddd;
  margin-bottom: -1px;
}
.form-container {
  max-width: 500px;
  padding-top: 22px;
}
</style>
