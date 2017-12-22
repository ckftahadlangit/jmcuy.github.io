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

function redirect() {
  window.location = "../index.html"
}
function signIn(){
    var succesfulLogin = true;
    var username = document.getElementById('user_login').value.trim()
    var password = document.getElementById('user_password').value
    var email = "";
    if(username.length != 0 && password.length != 0){
      firebase.database().ref('accounts/'+username).once('value', function(snapshot) {
          email = snapshot.child('email').val();
      }).then(() => {

        firebase.auth().signInWithEmailAndPassword(email, password).catch(function( error) {
          succesfulLogin = false;
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
        });
      });
      alert("Logging in")
    } else {
      alert("Invalid Username or Password")
    }

};

firebase.auth().onAuthStateChanged(user => {
  console.log("Auth state changed")
  if(user){
    window.location = "wall.html"

  }
});
