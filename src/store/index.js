import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import firebase from '@/firebase/firestore'

Vue.use(Vuex)

export default new Vuex.Store({
  strict:true,
  state: {
    userInfo:{email:null, name:null, wallet:null, docId:null},
    otherWallet: 0,
    latestMyWallet: 0,
    showContentWallet: false,
    showContentSubmit: false,
    allUser:null,
  },
  getters: {
    myName(state){
      return state.userInfo.name;
    },
    myWallet(state){
      return state.userInfo.wallet;
    },
    myDocId(state){
      return state.userInfo.docId;
    },
    allUser(state){
      return state.allUser;
    },
    otherWallet(state){
      return state.otherWallet;
    },
    latestMyWallet(state){
      return state.latestMyWallet;
    },
    showContentWallet(state){
      return state.showContentWallet;
    },
    showContentSubmit(state){
      return state.showContentSubmit;
    }
  },
  mutations: {
    setUserInfo(state, doc){
      //doc = ログインしたユーザのdocument(firestoreのcollectionに格納)
      state.userInfo.email = doc.email
      state.userInfo.name = doc.name
      state.userInfo.wallet = doc.wallet
      state.userInfo.docId = doc.docId
    },
    setMyWallet(state, updateMyWallet){
      state.userInfo.wallet = updateMyWallet
    },
    setOtherWallet(state, otherWallet){
      state.otherWallet = otherWallet
    },
    setLatestmyWallet(state, myWallet){
      state.latestMyWallet = myWallet
    },
    setAllUser(state, allUserContainer){
      state.allUser = allUserContainer
    },
    setContentWallet(state){
      state.showContentWallet = true
    },
    setCloseContentWallet(state){
      state.showContentWallet = false
    },
    setContentSubmit(state){
      state.showContentSubmit = true
    },
    setCloseContentSubmit(state){
      state.showContentSubmit = false
    },
  },
  actions: {
    registerUserInfo(context, payload){
      //payload=(email, password, name)
      firebase.auth().createUserWithEmailAndPassword(payload.userInfo.email, payload.userInfo.password).then(() => {
        firebase.firestore().collection('users').add({
          email:payload.userInfo.email,
          password:payload.userInfo.password,
          name:payload.userInfo.name,
          wallet:payload.userInfo.wallet,
        }).then((doc) => {
          firebase.firestore().collection('users').doc(doc.id).update({
            docId:doc.id,
          })
        }).then(() => {
          context.dispatch('matchUser', payload)
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
    login(context, payload){
      //payload = (email,password)
      firebase.auth().signInWithEmailAndPassword(payload.userInfo.email, payload.userInfo.password).then(() => {
        context.dispatch('matchUser', payload)
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
    logout(){
      firebase.auth().signOut().then(()=>{
        router.push('/login');
      })
      .catch( (error)=>{
        console.log(error);
      });
    }
    ,
    matchUser(context, payload){
      //payload = (email,password)
      firebase.firestore().collection('users').where('email', '==', payload.userInfo.email)
      .get().then((querySnapshot) => {
         querySnapshot.forEach( (doc) => {
           context.commit('setUserInfo', doc.data())
           localStorage.setItem('loginUser', JSON.stringify(doc.data()))
          });
      }).then(()=>{
        router.push('/dashBoard')
      })
      .catch( (error) => {
         console.log(error);
      });
    },
    getAllUser(context){
      const allUserContainer = [];
      firebase.firestore().collection('users').get().then((querySnapshot)=>{
        querySnapshot.forEach( (doc) => {
          if(!(this.getters.myDocId == doc.data().docId)){
          allUserContainer.push(doc.data())
          }
      })}).then(()=>{
        context.commit('setAllUser', allUserContainer);
      })
    },
    redirectToLogin(context, next){
      firebase.auth().onAuthStateChanged(function(user) {
        if (!user) {
          next('/login');} 
          else {
          next();}
      });
    },
    otherWallet(context, otherDocId){
      firebase.firestore().collection('users').doc(otherDocId).get().then(function(doc){
        context.commit('setOtherWallet' ,doc.data().wallet)
      })
    },
    latestMyWallet(context, myDocId){
      firebase.firestore().collection('users').doc(myDocId).get().then(function(doc){
        context.commit('setLatestmyWallet' ,doc.data().wallet)
      })
    },
    submitMoney(context, payload){
      //payload = (email, updateOtherWallet, updateMyWallet, selectUserWallet, docId)
      firebase.firestore().collection('users').doc(payload.userInfo.docId).update({
        wallet: payload.userInfo.updateOtherWallet
      }).then(() => {
        firebase.firestore().collection('users').doc(this.getters.myDocId).update({
          wallet: payload.userInfo.updateMyWallet 
      })
    })
    .then(()=>{
      firebase.firestore().collection('users').doc(this.getters.myDocId)
      .get().then((doc) => {
        localStorage.setItem('loginUser', JSON.stringify(doc.data()))
      })
      context.commit('setMyWallet', payload.userInfo.updateMyWallet)
    })
    .catch((error) => {
         console.log(error)
      })
    },
    contentWallet(context){
      setTimeout(() => { context.commit('setContentWallet') }, 1000) 
    },
    contentSubmit(context){
      setTimeout(() => { context.commit('setContentSubmit') }, 1000) 
    },
    getLocalStorage(context){
      const jsonObj = localStorage.getItem('loginUser');
      const jsObj = JSON.parse(jsonObj);
      if(localStorage){
        context.commit('setUserInfo', jsObj)
      }
    }
  },
})
