import Vue from 'vue'
import Vuex from 'vuex'
import firebase from '@/firebase/firestore'

Vue.use(Vuex)

export default new Vuex.Store({
  strict:true,
  state: {
    userInfo:{email:null, name:null},
  },
  mutations: {
    mutationsRegisterUserInfo(state, doc){
      //doc = ログインしたユーザのdocument(firestoreのcollectionに格納)
      state.userInfo.email = doc.data().email
      state.userInfo.name = doc.data().name
    },
  },
  actions: {
    actionRegisterUserInfo(context, payload){
      //payload = (email, password, name)
      firebase.auth().createUserWithEmailAndPassword(payload.userInfo.email, payload.userInfo.password).then(() => {
        firebase.firestore().collection('users').add({
          email:payload.userInfo.email,
          password:payload.userInfo.password,
          name:payload.userInfo.name
        }).then(() => {
            context.dispatch('actionMatchUser', payload)
        })
    },
    (error) => {
        if (error.toString() === 'Error: The email address is badly formatted.') {
            alert('適切なメールアドレスの形ではありません');
        }
        else if(error.toString() === 'Error: The email address is already in use by another account.') {
            alert('既に登録済みのメールアドレスです');
        }
        else{
          console.log('エラーです');
        }
      }
      )
    },
    actionLoginUserInfo(context, payload){
      //payload = (email,password)
      firebase.auth().signInWithEmailAndPassword(payload.userInfo.email, payload.userInfo.password).then(() => {
            context.dispatch('actionMatchUser', payload)
      },
    (error)=>{
      if (error.code === 'auth/invalid-email') {
        alert('適切なメールアドレスの形ではありません');
      }
      else if(error.code === 'auth/wrong-password') {
        alert('パスワードが誤っているか、入力されていません');
      }
      else if(error.code === 'auth/user-not-found') {
        alert('登録されていないユーザーです');
      }
      else{
        console.log('エラーです');
      }
    }
    )}
    ,
    actionMatchUser(context, payload){
      //payload = (email,password)
      firebase.firestore().collection('users').where('email', '==', payload.userInfo.email)
      .get().then((querySnapshot) => {
         querySnapshot.forEach( (doc) => {
           context.commit('mutationsRegisterUserInfo', doc)
         });
      })
      .catch( (error) => {
         console.log(error);
      });
    },
  },
})
