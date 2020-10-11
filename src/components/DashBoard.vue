<template>
<div>
    <h3 for="name">掲示板に投稿する</h3>
    <label for="name">ニックネーム：</label>
    <input id="name" type="text" v-model="name">
    <br><br>
    <label for="comment">コメント：</label>
    <textarea id="comment" v-model="comment"></textarea>
    <br><br>
    <button @click="createComment">コメントをサーバーに送る</button>
    <h2>掲示板</h2>
    <div v-for="post in posts" :key="post.name">
        <br>
        <div>名前：{{post.fields.name.stringValue}}</div>
        <div>コメント：{{post.fields.comment.stringValue}}</div>
    </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            name: '',
            comment: '',
            posts: []
        }
    },
    created() {
        //1:サーバーurl 2:設定
        axios.get("/comments").then(response => {
            this.posts = response.data.documents;
            console.log(response.data.documents);
        });
    },
    methods: {
        createComment() {
            //axiosはプロミス非同期
            //http通信の種類(getは受け取る postは送りたい)
            //1:url 2:name 3:その他の設定

            //最後の名前はdatabaseのコレクションに入る
            //urlは共通部分＋vue-test-540d4（オリジナル部分）
            axios.post("/comments", {
                    //cloudfireの場合の送る時に必要なのはfields
                    fields: {
                        name: {
                            stringValue: this.name
                        },
                        comment: {
                            stringValue: this.comment
                        },
                    }
                })
                //この中身は非同期なので遅かったら飛ばして通信
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                });
            this.name = '';
            this.comment = '';
        }
    }
}
</script>

<style>

</style>
