import Vue from 'vue'
import Vuex from 'vuex'
import firebase from '@/firebase/firestore'

Vue.use(Vuex)

export default new Vuex.Store({
  strict:true,
  state: {
    userInfo:[]
  },
  mutations: {
    mutationsRegisterUserInfo(state, payload){
      state.userInfo.push({
        email:payload.userInfo.email,
        password:payload.userInfo.password,
        name:payload.userInfo.name
      })
    }
  },
  actions: {
    actionRegisterUserInfo(context, payload){
      //payload=(email,password,name)
      firebase.auth().createUserWithEmailAndPassword(payload.userInfo.email, payload.userInfo.password).then((result) => {
        result.user.updateProfile({
            displayName: payload.userInfo.name
        }).then(() => {
            alert('アカウントの新規作成が完了しました！')
            context.commit('mutationsRegisterUserInfo', payload)
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
})
