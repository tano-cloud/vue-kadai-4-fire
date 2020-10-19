<template>
<div id="dashBoard">

    <div class="overlay" v-show="this.$store.getters.showContentWallet" @click.self="closeModal">
        <div class="content">
            <p>{{otherName}}さんの残高</p>
            <p>{{otherWallet}}</p>
            <div>
                <button v-on:click="closeModal">Close</button>
            </div>
        </div>
    </div>

    <div class="overlay" v-show="this.$store.getters.showContentSubmit" @click.self="closeSubmitModal">
        <div class="content">
            <p>あなたの残高：{{latestMyWallet}}</p>
            <p>送る金額</p>
            <input @input="validate" v-model=" inputAmount">
            <div>
                <button v-on:click="submitMoneyBtn">送信</button>
            </div>
        </div>
    </div>

    <header>
        <p>{{myName}}さんようこそ！！</p>
        <div class="header-right-column">
            <p>残高：{{myWallet}}</p>
            <button @click="logoutBtn">ログアウト</button>
        </div>
    </header>
    <br>
    <div id="dashBoard-column">
        <h2>ユーザ一覧</h2>
        <ul>
            <li id="dashBoard-column-username">ユーザ名</li>
            <li>
                <ul v-for="(allUser, index) in allUser" v-bind:key="index">
                    <li>{{allUser.name}}</li>
                    <li id="dashBoard-column-money">
                        <div>
                            <button v-on:click="openModalWallet(allUser.docId, allUser.name)">walletを見る</button>
                            <button v-on:click="openModalSubmit(allUser.docId, allUser.wallet, allUser.email)">送る</button>
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
            otherName: null,
            otherDocId: null,
            otherEmail: null,
            inputAmount: '',
        }
    },
    computed: mapGetters(['myName', 'myWallet', 'allUser', 'otherWallet', 'myDocId', 'latestMyWallet', 'showContentWallet', 'showContentSubmit']),
    methods: {
        logoutBtn() {
            this.$store.dispatch('logout')
        },
        submitMoneyBtn: function () {
            const updateOtherWallet = Number(this.inputAmount) + Number(this.$store.getters.otherWallet)
            const updateMyWallet = Number(this.$store.getters.latestMyWallet) - Number(this.inputAmount)
            this.inputAmount = ''
            this.$store.commit('setCloseContentSubmit')
            this.$store.dispatch('submitMoney', {
                userInfo: {
                    email: this.otherEmail,
                    updateOtherWallet: updateOtherWallet,
                    updateMyWallet: updateMyWallet,
                    inputAmount: this.inputAmount,
                    docId: this.otherDocId,
                }
            })
        },
        openModalWallet: function (userDocId, userName) {
            this.otherName = userName
            this.$store.dispatch('otherWallet', userDocId)
            this.$store.dispatch('contentWallet')
        },
        openModalSubmit: function (userDocId, userWallet, userEmail) {
            this.otherDocId = userDocId
            this.otherEmail = userEmail
            this.$store.dispatch('latestMyWallet', this.$store.getters.myDocId)
            this.$store.dispatch('otherWallet', userDocId)
            this.$store.dispatch('contentSubmit')
        },
        closeModal: function () {
            this.$store.commit('setCloseContentWallet')
        },
        closeSubmitModal: function () {
            this.$store.commit('setCloseContentSubmit')
        },
        validate() {
            this.inputAmount = this.inputAmount.replace(/\D/g, '')
            const rep = new RegExp("^0+0?");
            this.inputAmount = this.inputAmount.replace(rep, "")
        }
    },
    beforeMount: function () {
        this.$store.dispatch('getAllUser')
        this.$store.dispatch('getLocalStorage')
    },
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

.overlay {
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

.content {
    z-index: 2;
    width: 17%;
    padding: 0px;
    background: #fff;
}

.content div {
    padding: 10px;
    background: #C9CAC9;
}

.content div button {
    color: white;
    border: none;
    padding: 8px;
    margin-left: 60%;
    background: #D83748;
    cursor: pointer;
}
</style>
