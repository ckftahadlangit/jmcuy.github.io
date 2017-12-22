  // Initialize Firebase
var config = {
  apiKey: "AIzaSyCld-zlyyysUfAOw5CYj0Cn8w0QJAF0qPU",
  authDomain: "cmsc127-926a8.firebaseapp.com",
  databaseURL: "https://cmsc127-926a8.firebaseio.com",
  projectId: "cmsc127-926a8",
  storageBucket: "cmsc127-926a8.appspot.com",
  messagingSenderId: "421673909250"
};
firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(user => {
  console.log("Auth state changed")
  if(user){
    window.location = "html/wall.html"

  }
});
