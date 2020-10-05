import Vue from 'vue'
import Vuex from 'vuex'
import firebase from '@/firebase/firestore'

Vue.use(Vuex)

export default new Vuex.Store({
  strict:true,
  state: {
  },
  mutations: {
    mutationsRegisterUserInfo(state,payload){
      firebase.auth().createUserWithEmailAndPassword(payload.userInfo.email, payload.userInfo.password).then((result) => {
        result.user.updateProfile({
            displayName: payload.userInfo.name
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
  },
  actions: {
    actionRegisterUserInfo(context,payload){
      //payload=(email,password,name)
      context.commit('mutationsRegisterUserInfo',payload)
    }
  },
})
