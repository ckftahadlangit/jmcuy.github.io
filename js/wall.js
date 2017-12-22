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
function redirect(){
    window.location = "wall.html"
}
var currentUser = null
firebase.auth().onAuthStateChanged(user => {
  if(user){
    var databaseRef = firebase.database().ref('accounts');
    databaseRef.once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            if(user.email == childSnapshot.child('email').val()){
                currentUser = childSnapshot
            }
        });

    }).then(() => {
        var name = currentUser.child('name').val().toUpperCase()
        var username = currentUser.key
        document.getElementById('name').innerHTML = name
        document.getElementById('username').innerHTML = "@"+username
        initializeQuestions()
    });
  } else {
    alert('Login to Continue')
    window.location = '../index.html'
  }
});
function initializeQuestions(){
    var databaseRef = firebase.database().ref('questions/' + currentUser.key);
    databaseRef.once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot){
            var q = childSnapshot.child('q').val();
            var a = (childSnapshot.child('a').val()).toString().trim();
            var sender = childSnapshot.child('sender').val()
            if(a.length != 0){ // dont display unanswered questions
                addQuestions(q, a, sender);
            }
        });

    })

}

function addQuestions(questionStr, answerStr, sender){
    var added_element = document.getElementById('questions');
    var qContainer = document.createDocumentFragment();

    var articleContainer = document.createElement("article");
    articleContainer.className = "item streamItem streamItem-answer"
    var q = document.createElement("header");
    q.className = "streamItem_header"
    var question = document.createElement("h1")
    question.innerHTML = questionStr;
    question.display = "inline"
    var name = document.createElement("h6")
    name.innerHTML = "by: " + sender
    name.style = "display:inline"
    q.appendChild(question);
    q.appendChild(name)


    var a = document.createElement("div")
    a.className = "streamItem_content"
    a.innerHTML =  answerStr;

    articleContainer.appendChild(q);
    articleContainer.appendChild(a);
    var space = document.createElement("p")
    space.appendChild(document.createElement("br"));
    articleContainer.appendChild(space);
    qContainer.appendChild(articleContainer);

    document.getElementById("questions").appendChild(qContainer);
}

function signout(){
    firebase.auth().signOut()
    alert('Logging out')
}

function relocate(a){
    window.location = a
  }
