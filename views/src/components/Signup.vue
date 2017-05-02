<template lang="html">
  <section class="signup center-block">
    <header class="form-header">
      <span>注册</span>
    </header>
    <div class="form-container center-block">
      <el-form :model="signData" :rules="rule" ref="signData" label-width="100px">
        <el-form-item label="用户名" prop="username" :required="true">
          <el-input type="text" v-model="signData.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="nickname" :required="true">
          <el-input type="text" v-model="signData.nickname" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass" :required="true">
          <el-input type="password" v-model="signData.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass" :required="true">
          <el-input type="password" v-model="signData.checkPass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="个人简介" prop="introduction">
          <el-input type="textarea" :rows="5" v-model.number="signData.introduction"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('signData')">提交</el-button>
          <el-button @click="resetForm('signData')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    const context = this
    // 验证用户名是否为空
    const validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    // 验证姓名是否为空
    const validateNickname = (rule, value, callback) => {
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
      } else if (value.length < 6) {
        callback(new Error('密码长度必须大于 6 位'))
      } else {
        if (context.signData.checkPass !== '') {
          context.$refs.signData.validateField('checkPass')
        }
        callback()
      }
    }
    // 验证确认密码的函数
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value.length < 6) {
        callback(new Error('密码长度必须大于 6 位'))
      } else if (value !== context.signData.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      signData: {
        username: '',
        nickname: '',
        pass: '',
        checkPass: '',
        introduction: ''
      },
      rule: {
        username: [
          { validator: validateUsername, trigger: 'blur' }
        ],
        nickname: [
          { validator: validateNickname, trigger: 'blur' }
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      const context = this
      context.$refs[formName].validate((valid) => {
        if (valid) { // 如果表单信息有效
          context.$http.post('http://localhost:3000/signup', {
            username: context.signData.username,
            nickname: context.signData.nickname,
            password: context.signData.pass,
            introduction: context.signData.introduction
          }).then(response => {
            if (response.body.resultCode !== '001') {
              context.$toasted.error(response.body.resultContent)
              return
            }
            context.$toasted.success(response.body.resultContent)
            context.$router.push('/login')
          }).catch(e => {
            context.$toasted.error(e)
            return false
          })
        } else {
          context.$toasted.error('无效的注册信息')
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
