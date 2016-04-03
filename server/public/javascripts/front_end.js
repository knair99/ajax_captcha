var draggedID = null;
var drag_data = null;

//target ondragenter/over
function allowDrop(ev){
    ev.preventDefault();
}

//target ondrop
function drop(ev){
    var newElem = document.getElementById(draggedID).cloneNode(false);
    var target = document.getElementById("target");
    target.innerHTML = "";
    target.appendChild(newElem);

    ev.preventDefault();
    var data=ev.dataTransfer.getData("Text");
    drag_data = data;
    console.log(data);

}

//source  dragstart
function drag(ev){
    ev.dataTransfer.setData("Text",ev.target.id);
    draggedID = ev.target.id;
    ev.target.classList.add("dragged");

}

//source ondragend
function src_dragend(){
    var elems = document.querySelectorAll(".dragged");
    for (var i = 0; i < elems.length; i++) {
        elems[i].classList.remove("dragged");
    }

}

function passwordChanged() {

    //setup regex for password matches
    var lower = /[A-Za-z]{4,}/;
    var number = /[0-9]/;
    var special = /[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]{1,}/;
    var count = 0;
    var strength = document.getElementById('strength');
    var prog_value = document.getElementById('password-strength-meter');


    var pwd = document.getElementById("password");
    if (pwd.value.length == 0) {
        strength.innerHTML = 'Start typing your password';
    } else {


        if (lower.test(pwd.value)) {
            count = count + 1;
        }
        if (number.test(pwd.value)) {
            count = count + 1;
        }
        if (special.test(pwd.value)) {
            count = count + 1;
        }
        prog_value.value = count / 3 * 100;

        if (count !== 3 || pwd.value.length <= 7) {
            strength.innerHTML = '<span style="color:Orange">A password should have 4 alpha, 1 number and 1 special character and must be at least 7 chars long!</span>';
            s            }
        else{
            strength.innerHTML = '<span style="color:Green">Password strong enough!!</span>';
        }
    }
}


//send stuff to the node server
function submitStuff(){

    var data = {};
    data.username = document.getElementById("username").value;
    data.password = document.getElementById("password").value;
    data.email = document.getElementById("email").value;
    data.security_question_1 = document.getElementById("security_question_1").value;
    data.answer_1 = document.getElementById("answer_1").value;
    data.security_question_2 = document.getElementById("security_question_2").value;
    data.answer_2 = document.getElementById("answer_2").value;
    data.phone = document.getElementById("phone").value;
    data.chosen_image = drag_data;

    $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: 'http://localhost:3000/register',
        success: function(data) {
            console.log('success');
            console.log(JSON.stringify(data));
        }
    });

}
