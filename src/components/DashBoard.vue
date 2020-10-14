<template>
<div id="dashBoard">
    <header>
        <p>{{getUserName}}さんようこそ！！</p>
        <div class="header-right-column">
            <p>残高：{{getUserWallet}}</p>
            <button>ログアウト</button>
        </div>
    </header>
    <br>
    <div id="dashBoard-column">
        <h2>ユーザ一覧</h2>
    </div>
    <footer>Copyright ©2019 ○○ Inc All rights reserved</footer>
</div>
</template>

<script>
import {
    mapGetters
} from 'vuex'
export default {
    computed: mapGetters(['getUserName', 'getUserWallet'])
}
</script>

<style scoped>
#dashBoard header {
    display: flex;
    justify-content: space-around;
}

#dashBoard header button {
    background-color: white;
    color: #84BDEC;
    border: 1px #84BDEC solid;
    cursor: pointer;
    padding: 10px;
}

#dashBoard header .header-right-column {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 200px;
}

#dashBoard-column a {
    color: #84BDEC;
    text-decoration: none;
}

#dashBoard footer {
    margin-top: 100px;
}
</style>
