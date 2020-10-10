<template>
<div id="login">
    <div id="login-column">
        <h2>ログイン画面</h2>
        <label for="email">メールアドレス</label>
        <input id="email" type="email" placeholder="例）info@example.com" v-model="email">
        <br><br>
        <label for="password">パスワード</label>
        <input id="password" type="password" placeholder="6文字以上でお願いします" v-model="password">
        <br><br>
        <button @click="onClickLoginBtn">ログイン</button>
        <br>
        <router-link to="/">新規登録はこちらから</router-link>
        <router-view />
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
        }
    },
    methods: {
        onClickLoginBtn() {
            this.$store.dispatch('actionLoginUserInfo', {
                userInfo: {
                    email: this.email,
                    password: this.password,
                }
            })
        },
    }
}
</script>

<style scoped>
#login-column button {
    background-color: white;
    color: #84BDEC;
    border: 1px #84BDEC solid;
    cursor: pointer;
    padding: 10px;
}

#login-column a {
    color: #84BDEC;
    text-decoration: none;
}

#login footer {
    margin-top: 100px;
}
</style>
