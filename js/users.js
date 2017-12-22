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
firebase.auth().onAuthStateChanged(user => {
  if(user){
    var databaseRef = firebase.database().ref('accounts');
    databaseRef.once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            if(user.email == childSnapshot.child('email').val()){
                currentUser = childSnapshot
            } else {
              addUser(childSnapshot.key, childSnapshot.child('name').val())
            }
        });

    });

  } else {
    alert('Login to Continue')
    window.location = '../index.html'
  }
});


function addUser(username, name){
  var userContainer = document.createElement("div");
  userContainer.className = "item userItem"
  var askButton = document.createElement("a")
  askButton.className = "btn-secondary"
  askButton.innerHTML = "Ask"
  askButton.onclick = function() {askProfile(username)}
  var userImg = document.createElement("a")
  userImg.style="background-image:url(https://image.flaticon.com/icons/svg/61/61205.svg)"
  userImg.className = "userAvatar"
  var userDetails = document.createElement("a")
  userDetails.className = "userItem_content"
  userDetails.onclick = function () {goToProfile(username)}
  var n =document.createElement("span")
  n.className = "userName"
  n.innerHTML = name
  var un = document.createElement("span")
  un.className = "userName"
  un.dir = "ltr"
  un.innerHTML = "@" + username
  userDetails.appendChild(n)
  userDetails.appendChild(un)


  userContainer.appendChild(askButton)
  userContainer.appendChild(userImg)
  userContainer.appendChild(userDetails)
  document.getElementById("users").appendChild(userContainer);
}
function goToProfile(username) {
  window.location = "user_profile.html?user="+username
}

function askProfile(username) {
  alert(username)
  window.location = "ask.html?user="+username
}

function signout(){
    firebase.auth().signOut()
    alert('Logging out')
}


function relocate(a){
    window.location = a
  }
