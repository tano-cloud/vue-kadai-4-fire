<template>
<div id="register">
    <div id="register-column">
        <h2>新規登録画面</h2>
        <label for="name">ユーザ名</label>
        <input id="name" v-model="name">
        <br><br>
        <label for="email">メールアドレス</label>
        <input id="email" type="email" v-model="email">
        <br><br>
        <label for="password">パスワード</label>
        <input id="password" type="password" v-model="password">
        <br><br>
        <button @click="onClickRegisterBtn">新規登録</button>
        <br>
        <a>ログインはこちらから</a>
    </div>
    <footer>Copyright ©2019 ○○ Inc All rights reserved</footer>
</div>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: '',
            name: '',
        }
    },
    methods: {
        onClickRegisterBtn() {
            this.$store.dispatch('actionRegisterUserInfo', {
                userInfo: {
                    email: this.email,
                    password: this.password,
                    name: this.name
                }
            })
        },
    }
}
</script>

<style scoped>
#register-column button {
    background-color: white;
    color: #84BDEC;
    border: 1px #84BDEC solid;
    padding: 10px;
}

#register-column a {
    color: #84BDEC;
}

#register footer {
    margin-top: 100px;
}
</style>
