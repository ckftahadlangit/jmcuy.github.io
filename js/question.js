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
  if(!user){
    alert('Login to Continue')
    window.location = '../index.html'
  }
});

var x = window.location.href
var user = x.slice((x.indexOf('=') + 1),x.lastIndexOf('?'))
var messageid = x.slice(x.lastIndexOf('=') + 1)

var databaseRef = firebase.database().ref('questions/'+ user + "/" +messageid);
databaseRef.once('value', function(snapshot) {
  document.getElementById("ques").innerHTML = snapshot.child('q').val()
});

function signout(){
    firebase.auth().signOut()
    alert('Logging out')
}

function answer() {
  var text = document.getElementById('question_answer_text').value.trim()
  if(text.length == 0){
    alert("Answer cannot be empty")
  } else{
    databaseRef.child('a').set(text)
    window.location = "inbox.html"
  }

}


function relocate(a){
    window.location = a
  }
