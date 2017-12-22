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
var currentUser = null
var askToUser =""
firebase.auth().onAuthStateChanged(user => {
  if(user){
    var databaseRef = firebase.database().ref('accounts');
    databaseRef.once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            if(user.email == childSnapshot.child('email').val()){
                currentUser = childSnapshot
            }
        });

    });
    var x = window.location.href
    askToUser = x.slice(x.indexOf('=') + 1)

  } else {
    alert('Login to Continue')
    window.location = 'index.html'
  }
});


function submitQues() {
    var text = document.getElementById('question_text').value.trim()
    var r = document.getElementsByClassName("btn-toggle-mini")[0].checked ? 1 : 0
    var senderName = currentUser.child('name').val()
    if(text.length == 0){
        alert('Question should not be empty')
    } else {
        if(r == 1){
            senderName = "Anonymous"
        }
        var databaseRef = firebase.database().ref('questions/'+ askToUser);
        databaseRef.push().set({
            q:text,
            a:"",
            sender:senderName
        })
        alert("Question Sent")
        window.location = "users.html"
    }
}

function signout(){
    firebase.auth().signOut()
    alert('Logging out')
}

function relocate(a){
    window.location = a
  }
