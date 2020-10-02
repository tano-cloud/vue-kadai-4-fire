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
        <button @click="register">新規登録</button>
        <br>
        <a>ログインはこちらから</a>
    </div>
    <footer>Copyright ©2019 ○○ Inc All rights reserved</footer>
</div>
</template>

<script>
import firebase from '@/firebase/firestore'

export default {
    data() {
        return {
            email: '',
            password: '',
            name: '',
        }
    },
    methods: {
        register: function () {
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then((result) => {
                    result.user.updateProfile({
                        displayName: this.name
                    }).then(() => {
                        alert('アカウントの新規作成が完了しました！')
                    })
                },
                (error) => {
                    if (error.toString() === 'Error: The email address is badly formatted.') {
                        alert('適切なメールアドレスの形ではありません');
                    }
                    if (error.toString() === 'Error: The email address is already in use by another account.') {
                        alert('既に登録済みのメールアドレスです');
                    }
                }
            )
        }
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
