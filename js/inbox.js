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
var numOfQues = 0
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
        var databaseRef = firebase.database().ref('questions/' + currentUser.key);
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
            if(a.length == 0){ // display unanswered questions
                addQuestions(q, childSnapshot.key, sender);
                numOfQues+=1;
            }
        });

    }).then(() =>{
      var qCount = document.getElementById('question-count');
      qCount.innerHTML = numOfQues
    });

}
function wow(id) {
  alert(id)
}

function addQuestions(questionStr, qId, sender){
    var qContainer = document.createDocumentFragment();
    var articleContainer = document.createElement("article");
    articleContainer.className = "item streamItem streamItem-question"
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
    var buttons = document.createElement("div")
    buttons.className = "streamItem_footer"
    buttons.id = qId
    var del = document.createElement("a")
    var ans = document.createElement("a")
    del.className = "btn-secondary"
    del.innerHTML = "Delete"
    del.onclick = function(){delQuestion(qId)}
    ans.innerHTML = "Answer"
    ans.className = "btn-secondary"
    ans.onclick = function(){ answer(qId)}

    buttons.appendChild(del)
    buttons.appendChild(ans)



    articleContainer.appendChild(q);
    articleContainer.appendChild(buttons)

    qContainer.appendChild(articleContainer);

    document.getElementById("questions").appendChild(qContainer);
}


function answer(id) {
    window.location = "question.html?user="+currentUser.key+"?id="+ id
}
function delQuestion(id) {
  var x = confirm("Are you sure you want to delete this QUESTION??")
  if(x == true){
    // delete
    var databaseRef = firebase.database().ref('questions/' + currentUser.key);
    databaseRef.child(id).remove()
    alert('Deleting Question')
    window.location = "inbox.html"
  }
}
function deleteAll(){
  var x = confirm("Are you sure you want to delete ALL QUESTIONS??")
  if(x == true && numOfQues != 0){
    // delete
    var databaseRef = firebase.database().ref('questions/' + currentUser.key);
    databaseRef.remove()
    alert('Deleting')
    window.location = "inbox.html"
  }
}

function signout(){
    firebase.auth().signOut()
    alert('Logging out')
}

function relocate(a){
    window.location = a
  }
