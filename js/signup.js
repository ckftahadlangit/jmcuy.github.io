var config = {
  apiKey: "AIzaSyCld-zlyyysUfAOw5CYj0Cn8w0QJAF0qPU",
  authDomain: "cmsc127-926a8.firebaseapp.com",
  databaseURL: "https://cmsc127-926a8.firebaseio.com",
  projectId: "cmsc127-926a8",
  storageBucket: "cmsc127-926a8.appspot.com",
  messagingSenderId: "421673909250"
};
firebase.initializeApp(config);
var email = '';
var name = '';
var username = '';
var password = '';
var day = '';
var month = '';
var year = '';
var gender = '';
function checkvalidity () {
	if(!email.includes('@') || !email.includes('.com') ||
		email.length < 7){
        alert('Invalid email');

        return false;
	}
	if(name.length == 0) {
	   alert('Name cannot be blank');
	   return false;
	}
	if(username.length == 0 || username.includes(' ')) {
	   alert('User name cannot use spaces or be empty');
	   return false;
	}
	if(password.length < 6  ) {
		console.log(password);
	   alert('Password must be greater than or equal to 6 characters');
	   return false;
	}
	if(day.length == 0 || month.length == 0 || year.length == 0){
		console.log(day + month + year);
	  	alert('DATE CANNOT BE EMPTY');
	  	return false;
	}
	if(gender == 0){
	  alert('must select a gender');
	  return false;
	}
	return true
};

function getTime(){
    var now = new Date();
    // 11-29 08:03:29 PM
    var pm = false;
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    var m = now.getMonth();
    var d = now.getDate();
    var y = now.getYear() + 1900;
    if(hours > 12){
        hours -= 12;
        pm = true;
    }
    if(hours < 10){
        hours = "0" + hours;
    }
    if(minutes < 10){
        minutes = "0" + minutes
    }
    if(seconds < 10){
        seconds = "0" + seconds;
    }
    if(d < 10){
        d = "0" + d;
    }
    if(m < 10){
        m = "0" + m;
    }
    var time = m + 1 + "-" + d + "-" + y + " " + hours + ":"+ minutes + ":" + seconds;
    if(pm){
        time += " PM";
    } else {
        time += " AM";
    }
    console.log(time);
    return time;
}

function signUp () {
    valid_account = true;
    email = document.getElementById('user_email').value
    name = document.getElementById('user_name').value
    username = document.getElementById('user_login').value.trim()
    password = document.getElementById('user_password').value
    day = document.getElementById('date_day').value
    month = document.getElementById('date_month').value
    year = document.getElementById('date_year').value
    gender = document.getElementById('user_gender_id').value
    if (checkvalidity()){
      	var g =''
    	if(gender = 1){
    		g = 'Female';
    	} else {
    		g = 'Male';
    	}
    	var time = getTime();

        var databaseRef = firebase.database().ref('accounts');
        databaseRef.once('value', function(snapshot) {
            console.log("in progress: checking if username is still available");
	    console.log(snapshot.exists());
	    if(snapshot.exists(){
	        var arr = snapshot.val();
	        var arr2 = Object.keys(arr);
	        for (i = 0; i < arr2.length; i++){
		    console.log(username + " " + arr2[i]);
		    if(username == arr2[i]){
		        valid_account = false;
		        alert("Invalid!!! Username " + username + " is already taken");
		    }
	        }
	    }
        }).then(() =>{
            if(valid_account){
                console.log("on progress: register account in authentication");
                firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
                    alert("Email already have an acount");
                    valid_account = false;
                }).then(() => {
                    if(valid_account){
                        console.log("on progress: adding account in database");
                        databaseRef.child(username).set({
                            name: name,
                            email: email,
                            password: password,
                            birthday: month + '/' + day + '/' + year,
                            gender: g,
                            created_at: time
                        });
                         window.location = 'wall.html';
                    }
                });
            }
        });



    }

}


