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
var x = window.location.href
var username = x.slice(x.indexOf('=') + 1)
var currname = ""
var userProfile = null
firebase.auth().onAuthStateChanged(user => {
  if(user){
    var databaseRef = firebase.database().ref('accounts');
    databaseRef.once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            if(user.email == childSnapshot.child('email').val()){
                currname = childSnapshot.child('name').val()
            }
            if(childSnapshot.key == username){
                userProfile = childSnapshot
            }

        });
    }).then(() => {
        var name = userProfile.child('name').val()
        var username = "@" + userProfile.key
        var gender = userProfile.child('gender').val()
        var birthday = userProfile.child('birthday').val()
        document.getElementsByClassName('name')[0].innerHTML = name
        document.getElementsByClassName('name')[1].innerHTML = name

        document.getElementsByClassName('uname')[0].innerHTML = username
        document.getElementsByClassName('uname')[1].innerHTML = username
        document.getElementById('birthday').innerHTML = "Birthday: " + birthday
        document.getElementById('gender').innerHTML = "Gender: " + gender
        if(gender == 'Female'){
            document.getElementById('profileImg').style="background-image:url(https://image.flaticon.com/icons/svg/149/149070.svg)"
        }
        initializeQuestions()
    });
  } else {
    alert('Login to Continue')
    window.location = '../index.html'
  }
});
function initializeQuestions(){
    var databaseRef = firebase.database().ref('questions/' + userProfile.key);
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

function submitQues(){
    var text = document.getElementById('question_text').value.trim()
    var r = document.getElementsByClassName("btn-toggle-mini")[0].checked ? 1 : 0
    if(text.length == 0){
        alert('Question should not be empty')
    } else {
        if(r == 1){
            senderName = "Anonymous"
        } else {
            senderName = currname
        }
        var databaseRef = firebase.database().ref('questions/'+ userProfile.key);
        databaseRef.push().set({
            q:text,
            a:"",
            sender:senderName
        })
        document.getElementById('question_text').value = " "
        alert("Question Sent")
    }
}


function relocate(a){
    window.location = a
  }
