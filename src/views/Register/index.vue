<template>
  <!-- 注册页面 -->
  <div class="register-page">
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm login-form"
    >
      <el-form-item class="form-field" label="昵称" prop="nickname" required>
        <el-input v-model="ruleForm.nickname" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item class="form-field" label="手机号码" prop="phone" required>
        <el-input v-model="ruleForm.phone" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item class="form-field" label="验证码" prop="captcha">
        <div style="display: flex;">
          <el-input v-model.number="ruleForm.captcha" />
          <el-button size="small" type="primary" @click="handleSendCaptcha">发送验证码</el-button>
        </div>
      </el-form-item>
      <el-form-item class="form-field" label="密码" prop="pass">
        <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item class="form-field" label="确认密码" prop="checkPass">
        <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item class="form-field">
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      phoneTest: /^1[3456789]\d{9}$/,
      ruleForm: {
        pass: '',
        nickname: '',
        checkPass: '',
        captcha: '',
        phone: ''
      },
      rules: {
        pass: [{
          validator: validatePass,
          trigger: 'blur'
        }],
        checkPass: [{
          validator: validatePass2,
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    // 验证手机好嘛是否被注册
    checkPhone(phone) {
      return new Promise((resolve, reject) => {
        this.$http
          .checkPhoneNumber(phone)
          .then(resp => {
            resolve(resp)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    jumpToLogin() {
      const { phone } = this.ruleForm
      this.$router.push({
        path: '/login',
        params: { phone }
      })
    },
    // 点击发送验证码按钮
    async handleSendCaptcha() {
      const {
        phone
      } = this.ruleForm
      const {
        phoneTest,
        checkPhone
      } = this
      if (!phoneTest.test(phone)) {
        // 手机号码不正确
        this.$message({
          type: 'warning',
          message: '手机号码不符合规范,请检测输入'
        })
      } else {
        let isRegister = false
        // 判断手机号是否注册，注册则提示并退出
        await checkPhone(phone).then(resp => {
          if (resp.exist === 1) {
            isRegister = true
            // 号码已经存在
            this.$alert('该手机号已经注册', '系统提示', {
              confirmButtonText: '确定',
              callback: action => {
                // 存在就跳转到登陆页面
                this.jumpToLogin()
              }
            })
            return
          }
        })
        console.log(isRegister)
        if (isRegister) return
        this.$http.sendCaptcha(phone).then(resp => {
          if (resp.code !== 200) return
          this.$message({
            type: 'success',
            message: '验证码发送成功!'
          })
        })
      }
    },
    // 开始注册
    startRegister() {
      const { nickname, checkPass, captcha, phone } = this.ruleForm
      this.$http.register({ nickname, password: checkPass, captcha, phone })
        .then(resp => {
          if (resp.token) {
            this.$message({
              type: 'success',
              message: '创建成功,用户名为: ' + phone
            })

            setTimeout(() => {
              // 跳转到登陆页
              this.jumpToLogin()
            }, 5000)
            return
          }

          if (resp.code === 503) {
            this.$message({
              type: 'error',
              message: resp.message
            })
          }
        })
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.ruleForm)
          // 表单没有问题, 开始注册
          this.startRegister()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}

</script>
<style lang='scss' scoped>
.register-page {
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  font-family: Lato, sans-serif;
  background: url("~@/assets/image/login-background.jpg") 0 / cover fixed;
}

.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3em;
  color: white;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 10px;
  box-shadow: 0 0.4px 0.6px rgba(0, 0, 0, 0.141),
    0 1px 1.3px rgba(0, 0, 0, 0.202), 0 1.9px 2.5px rgba(0, 0, 0, 0.25),
    0 3.4px 4.5px rgba(0, 0, 0, 0.298), 0 6.3px 8.4px rgba(0, 0, 0, 0.359),
    0 15px 20px rgba(0, 0, 0, 0.5);

  h1 {
    margin: 0 0 0.3em 0;
    padding: 12px 0;
    font-size: 2.5em;
  }

  .form-fieldd {
    position: relative;
    margin: 22px 0 8px 0;
    font-size: 20px;
    border-bottom: 1px solid white;
    transition: 0.4s;

    &::after {
      position: absolute;
      content: "";
      bottom: -1px;
      left: 0;
      width: 100%;
      height: 2px;
      background: #3498db;
      transform-origin: left;
      transform: scaleX(0);
      transition: 0.4s ease;
    }

    &:focus-within::after {
      transform: scaleX(1);
    }

    input {
      padding-left: 10px;
      color: white;
      background: transparent;
      border: none;
      outline: none;

      // label will float in 2 situations based on its sibling input:
      // 1. input get focus
      // 2. input has text filled
      &:focus ~ label,
      &:not(:placeholder-shown) ~ label {
        transform: translateY(-24px) scale(0.75);
      }

      &:valid ~ label {
        color: #3498db;
      }

      &:invalid ~ label {
        color: #e74c3c;
      }
    }

    label {
      position: absolute;
      left: 32px;
      top: 22px;
      transform-origin: left;
      transition: 0.4s;
    }
  }

  .btn {
    position: relative;
    width: 100%;
    padding: 6px 0;
    margin: 36px 0 18px 0;
    font-size: 1.2em;
    color: white;
    background: transparent;
    border: 2px solid hsla(204, 70%, 53%, 1);
    outline: none;
    cursor: pointer;
    overflow: hidden;
    transition: 0.5s;

    &::before {
      position: absolute;
      content: "";
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        120deg,
        transparent,
        hsla(204, 70%, 53%, 0.5),
        transparent
      );
      transform: translateX(-100%);
      transition: 0.5s;
    }

    &:hover {
      box-shadow: 0 0 20px 10px hsla(204, 70%, 53%, 0.5);
    }

    &:hover::before {
      transform: translateX(100%);
    }
  }
}
</style>
