<template>
<div id="dashBoard">

    <div id="overlay" v-show="showContent">
        <div id="content">
            <p>{{userName}}さんの残高</p>
            <p>{{userWallet}}</p>
            <div>
                <button v-on:click="closeModal">Close</button>
            </div>
        </div>
    </div>

    <header>
        <p>{{getUserName}}さんようこそ！！</p>
        <div class="header-right-column">
            <p>残高：{{getUserWallet}}</p>
            <button @click="logoutBtn">ログアウト</button>
        </div>
    </header>
    <br>
    <div id="dashBoard-column">
        <h2>ユーザ一覧</h2>
        <ul>
            <li id="dashBoard-column-username">ユーザ名</li>
            <li>
                <ul v-for="(getuser, index) in getAllUser" v-bind:key="index">
                    <li>{{getuser.name}}</li>
                    <li id="dashBoard-column-money">
                        <div>
                            <button v-on:click="openModal(getuser.wallet, getuser.name)">walletを見る</button>
                            <button>送る</button>
                        </div>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
    <footer>Copyright ©2019 ○○ Inc All rights reserved</footer>
</div>
</template>

<script>
import {
    mapGetters
} from 'vuex'
export default {
    data() {
        return {
            showContent: false,
            userWallet: null,
            userName: null,
        }
    },
    computed: mapGetters(['getUserName', 'getUserWallet', 'getAllUser']),
    methods: {
        logoutBtn() {
            this.$store.dispatch('logout')
        },
        openModal: function (userWallet, userName) {
            this.showContent = true
            this.userWallet = userWallet
            this.userName = userName
        },
        closeModal: function () {
            this.showContent = false
        }
    },
    beforeMount: function () {
        this.$store.dispatch('getAllUser')
    }
}
</script>

<style scoped>
#dashBoard {
    width: 100%;
}

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

#dashBoard-column {
    width: 60%;
    margin: 0 auto;
}

#dashBoard-column ul {
    list-style: none;
    width: 100%;
}

#dashBoard-column ul li {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
}

#dashBoard-column-username {
    font-size: 20px;
    font-weight: bold;
}

#dashBoard-column ul li ul {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 15px;
}

#dashBoard-column ul li ul li {
    margin: 0 auto;
}

#dashBoard-column ul li ul li div {
    width: 100%;
}

#dashBoard-column ul li ul li div button {
    color: white;
    border: none;
    background-color: #16A0B6;
    margin-right: 10px;
    cursor: pointer;
}

#dashBoard footer {
    margin-top: 100px;
}

#overlay {
    z-index: 1;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
}

#content {
    z-index: 2;
    width: 17%;
    padding: 0px;
    background: #fff;
}

#content div {
    padding: 10px;
    background: #C9CAC9;
}

#content div button {
    color: white;
    border: none;
    padding: 8px;
    margin-left: 60%;
    background: #D83748;
    cursor: pointer;
}
</style>
