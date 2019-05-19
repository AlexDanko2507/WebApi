const uri = "/api/theme/";
const urireg = "/api/account/Register";
const uripost = "/api/posts/";
const uricat = "/api/category/";
const urilike = "/api/like/"
var UID;

//var testOrg = (function(){
//    function logOff() {
//        var request = new XMLHttpRequest();
//        request.open("POST", "api/account/logoff");
//        request.onload = function () {
//            var msg = JSON.parse(this.responseText);
//            document.getElementById("modalMsg").innerHTML = "";
//            var mydiv = document.getElementById('formError');
//            while (mydiv.firstChild) {
//                mydiv.removeChild(mydiv.firstChild);
//            }
//            document.getElementById("modalMsg").innerHTML = msg.message;
//        };
//        request.setRequestHeader("Content-Type",
//            "application/json;charset=UTF-8");
//        request.send();
//    };
//    return {
//        logOff: logOff
//    };

//})();


var btn = document.getElementById("registerButton");
var btn2 = document.getElementById("loginBtn");
var btn1 = document.getElementById("buttonOK");
var btn3 = document.getElementById("logoffBtn");
var btn4 = document.getElementById("addTheme");
var btn5 = document.getElementById("postButton");
var btn6 = document.getElementById("postText");
var check;

//document.addEventListener("DOMContentLoaded", function (event) {
//    getCurrentUser();
//});

btn6.onclick = function () {
    getCurrentUser();
    createPost();
}

//btn5.onclick = function () {
//    createPost();
//}

btn4.onclick = function () {
    getCurrentUser();
    document.getElementById("saveexTheme").style.display = "none";
    document.getElementById("saveTheme").style.display = "block";
}

btn3.onclick = function () {
    document.getElementById("logoutTab").style.display = "none";
    document.getElementById("loginregPanel").style.display = "block";
    document.getElementById("loginregTab").style.display = "block";
    logOff();
    $('.user').hide();
}

btn2.onclick = function () {
    logIn();
    getCurrentUser();
    if (document.getElementById("loginregTab").style.display == "none") {
        $('#myModal').modal("show");
    }
}

btn.onclick = function () {
    document.querySelector("#modalMsg").innerHTML = "";
    Register();
    $('#myModal').modal("show");
}

btn1.onclick = function () {
        $('#myModal').on('hidden.hidden.bs.modal', function (event) {
            document.querySelector("#modalMsg").innerHTML = "";
    });
    //if (check == 0) {
    //    document.getElementById("logoutTab").style.display = "block";
    //}
}

function getCurrentUser() {
    let request = new XMLHttpRequest();
    request.open("POST", "/api/Account/isAuthenticated", true);
    request.onload = function () {
        let myObj = "";
        myObj = request.responseText !== "" ?
            JSON.parse(request.responseText) : {};
        //document.getElementById("modalMsg").textContent = myObj.message;
        if (myObj.message == "Вы Гость. Пожалуйста, выполните вход") {
            $('.user').hide();
            $('.userlike').hide();
            document.getElementById("logoutTab").style.display = "none";
            document.getElementById("loginregPanel").style.display = "block";
            document.getElementById("loginregTab").style.display = "block";
            document.getElementById("guest").textContent = myObj.message;
        }
        else {
            var arr = myObj.message.split("+");
            document.getElementById("loginregTab").style.display = "none";
            document.getElementById("loginregPanel").style.display = "none";
            document.getElementById("logoutTab").style.display = "block";
            document.getElementById("userID").textContent = arr[0];
            document.getElementById("userID").dataset.id = arr[1];
            UID = arr[1];
            if (arr[0] == "admin@mail.com") {
                $('.user').show();
            }
            else {
                $('.user').hide();
                $('.userlike').show();
                $('.usercomment').show();
                $('.user' + arr[0].split('@')[0] + arr[0].split('@')[1].split('.')[0]).show();
            }
            //var check = document.getElementById("userID").dataset.id;
        }
    };
    request.send();
}

function logOff() {
    var request = new XMLHttpRequest();
    request.open("POST", "api/account/logoff");
    request.onload = function () {
        var msg = JSON.parse(this.responseText);
        document.getElementById("modalMsg").innerHTML = "";
        var mydiv = document.getElementById('formError');
        while (mydiv.firstChild) {
            mydiv.removeChild(mydiv.firstChild);
        }
        document.getElementById("modalMsg").innerHTML = msg.message;
    };
    request.setRequestHeader("Content-Type",
        "application/json;charset=UTF-8");
    request.send();
}

function logIn() {
    check = 0;
    var email, password = "";
    // Считывание данных с формы
    email = document.getElementById("email1").value;
    password = document.getElementById("password1").value;
    var request = new XMLHttpRequest();
    request.open("POST", "/api/Account/Login");
    request.setRequestHeader("Content-Type",
        "application/json;charset=UTF-8");
    request.onreadystatechange = function () {
        // Очистка контейнера вывода сообщений
        document.querySelector("#modalMsg").innerHTML = "";
        var formError = document.querySelector("#formError");
        while (formError.firstChild) {
            formError.removeChild(formError.firstChild);
        }
        // Обработка ответа от сервера​
        if (request.responseText !== "") {
            var msg = null;
            msg = JSON.parse(request.responseText);
            document.getElementById("modalMsg").textContent = msg.message;
            // Вывод сообщений об ошибках​
            if (typeof msg.error !== "undefined" && msg.error.length >
                0) {
                for (var i = 0; i < msg.error.length; i++) {
                    let ul = document.querySelector("#formError");
                    let li = document.createElement("li");
                    li.appendChild(document.createTextNode(msg.error[i]));
                    ul.appendChild(li);
                }
            }
            else {
                document.getElementById("loginregTab").style.display = "none";
                document.getElementById("loginregPanel").style.display = "none";
                document.getElementById("logoutTab").style.display = "block";
                document.getElementById("userID").textContent = msg.message;
                if (msg.message == "admin@mail.com")
                    $('.user').show();
                else {
                    $('.usercomment').show();
                    $('.userlike').show();
                    $('.user' + msg.message.split('@')[0] + msg.message.split('@')[1].split('.')[0]).show();
                }
            }
            document.getElementById("password1").value = "";
        }
    };
    // Запрос на сервер
    request.send(JSON.stringify({
        email: email,
        password: password
    }));
    getCurrentUser();
}

function Register() {
    // Считывание данных с формы
    check = 1;
    var email = document.querySelector("#email").value;
    var password = document.querySelector("#password").value;
    var passwordConfirm = document.querySelector("#passwordConfirm").value;

    let request = new XMLHttpRequest();
    request.open("POST", urireg);
    request.setRequestHeader("Accepts", "application/json;charset=UTF-8");
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    // Обработка ответа
    request.onload = function () {
        ParseResponse(this);
    };
    // Запрос на сервер
    request.send(JSON.stringify({
        email: email,
        password: password,
        passwordConfirm: passwordConfirm
    }));
}

// Разбор ответа
function ParseResponse(e) {
    // Очистка контейнера вывода сообщений
    document.querySelector("#modalMsg").innerHTML = "";
    var formError = document.querySelector("#formError");
    while (formError.firstChild) {
        formError.removeChild(formError.firstChild);
    }
    // Обработка ответа от сервера
    var response = JSON.parse(e.responseText);
    document.querySelector("#modalMsg").innerHTML = response.message;
    // Вывод сообщений об ошибках
    if (response.error.length > 0) {
        for (var i = 0; i < response.error.length; i++) {
            let ul = document.querySelector("#formError");
            let li = document.createElement("li");
            li.appendChild(document.createTextNode(response.error[i]));
            ul.appendChild(li);
        }
    }
    // Очистка полей паролей
    document.querySelector("#password").value = "";
    document.querySelector("#passwordConfirm").value = "";
}

//document.querySelector("#registerButton").addEventListener("click", Register);

function readTheme(points) {
    window.open('index2.html?&' + points,'_self');
}

function checkTheme() {
    var score = decodeURIComponent(location.search.substr(1)).split('&');
    score.splice(0, 1);
    var result = score[0];
    loadOneTheme(result);
}

function loadOneTheme(id) {
    document.getElementById("readTheme").style.display = "block";
    document.getElementById("blog").style.display = "none";
    document.getElementById("postButton").dataset.id = id;
    var i;
    var request = new XMLHttpRequest();
    request.open("GET", uri, false);
    request.onload = function () {
        items = JSON.parse(request.responseText);
        for (i in items) {
            if (items[i].id == id) {
                document.getElementById("themeName").innerHTML = items[i].name + "<span type='button' class='btn btn-link' data-dismiss='modal' id='backTheme' onclick='loadThemes()'>Вернуться назад</span>";
                document.getElementById("themeMessage").textContent = items[i].message;
                document.getElementById("oneThemeAut").textContent = items[i].author;
                document.getElementById("oneThemeDate").textContent = items[i].dateTheme;
                document.getElementById("imgTheme").src = items[i].img;
            }
        }
    }
    request.send();
    loadPosts(id);
    getCurrentUser();
}

function loadThemes() {
    document.getElementById("logoutTab").style.display = "none";
    document.getElementById("readTheme").style.display = "none";
    document.getElementById("loginregTab").style.display = "block";
    document.getElementById("loginregPanel").style.display = "block";
    document.getElementById("blog").style.display = "block";
    var i, x = "";
    var request = new XMLHttpRequest();
    request.open("GET", uri, false);
    request.onload = function () {
        items = JSON.parse(request.responseText);
        for (i in items) {
            x += "<div class='card mb-4'>";
            x += "<img class='card-img-top' src='" + items[i].img + "' alt='Card image cap'>";
            x += "<div class='card-body'>";
            x += "<h2 class='card-title' id='namebl" + items[i].id + "'>" + items[i].name + "</h2>";
            //x += "<p class='card-text' id='textbl" + items[i].id + "'>" + items[i].message + "</p>";
            x += "<div class='d-flex'>";
            x += "<button type='button' class='btn btn-primary mr-auto' onclick='loadOneTheme(" + items[i].id + ")'>Читать полностью &rarr;</button>";
            x += "<button type='button' class='btn btn-link user user" + items[i].author.split('@')[0] + items[i].author.split('@')[1].split('.')[0] + "' data-toggle='modal' data-target='#exampleModal' onclick='updateTheme(" + items[i].id + ")'>Изменить</button>";
            x += "<button type='button' class='btn btn-link user user" + items[i].author.split('@')[0] + items[i].author.split('@')[1].split('.')[0] + "' onclick='deleteTheme(" + items[i].id + ")'>Удалить</button>";
            x += "</div>";
            x += "</div>";
            x += "<div class='card-footer text-muted'>";
            x += "Posted on " + items[i].dateTheme + " by ";
            x += "<a href='#'> "+ items[i].author +"</a>";
            x += "</div>";
            x += "</div>";
        }
        document.getElementById("themeTab").innerHTML = x;
    };
    request.send();
    loadCategory();
    getCurrentUser();
}

function createTheme() {
    //alert(document.getElementById("exampleFormControlSelect1").selectedIndex+1);
    document.getElementById("saveexTheme").style.display = "none";
    document.getElementById("saveTheme").style.display = "block";
    var nameText = document.getElementById("recipient-name").value;
    var titleText = document.getElementById("message-text").value;
    var usID = document.getElementById("userID").dataset.id;
    var aut = document.getElementById("userID").textContent;
    var cat = document.getElementById("exampleFormControlSelect1").selectedIndex+1;
    var request = new XMLHttpRequest();
    request.open("POST", uri);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.onload = function () {
        loadThemes();
    };
    request.send(JSON.stringify({
        name: nameText,
        message: titleText,
        userId: usID,
        author: aut,
        categoryId: cat
    }));
    $('#exampleModal').modal("hide");
}

function deleteTheme(id) {
    var request = new XMLHttpRequest();
    var url = uri + id;
    request.open("DELETE", url, false);
    request.onload = function () {
        loadThemes();
    }
    request.send();
}

function updateTheme(id) {
    document.getElementById("saveTheme").style.display = "none";
    document.getElementById("saveexTheme").style.display = "block"
    document.getElementById("recipient-name").value = document.getElementById("namebl" + id + "").textContent;
    document.getElementById("message-text").value = document.getElementById("textbl" + id + "").textContent;
    document.getElementById("saveexTheme").onclick = function () {
        var nameText = document.getElementById("recipient-name").value;
        var titleText = document.getElementById("message-text").value;
        var request = new XMLHttpRequest();
        request.open("PUT", uri + id);
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        request.onload = function () {
            loadThemes();
        };
        request.send(JSON.stringify({ name: nameText, message: titleText }));
        $('#exampleModal').modal("hide");
    }
}

function loadPosts(id) {
    var i, j, x = "";
    var request = new XMLHttpRequest();
    request.open("GET", uri, false);
    request.onload = function () {
        items = JSON.parse(request.responseText);
        for (i in items) {
            if (items[i].id == id) {
                if (items[i].posts.length == 0) $('#com').hide();
                else $('#com').show();
                for (j in items[i].posts) {
                    x += "<hr>";
                    x += "<div class='media mb-4'>";
                    //x += "<img class='d-flex mr-3 rounded-circle' src='http://placehold.it/50x50' alt=''>";
                    x += "<div class='media-body'>";
                    x += "<h5 class='mt-0'>" + items[i].posts[j].author + "</h5>";
                    x += "<p id=text" + items[i].posts[j].id + ">" + items[i].posts[j].text + "</p>";
                    x += "<div class='d-flex'>";
                    //alert(loadLikes(items[i].posts[j].id));
                    x += "<button type='button' class='btn btn-link ml-auto user userlike' onclick='addLike(" + items[i].id + "," + items[i].posts[j].id +")'>Like <span id='countLike" + items[i].posts[j].id + "' class='badge badge-light'>" + loadLikes(items[i].posts[j].id) +"</span></button>";
                    x += "<button type='button' class='btn btn-link user user" + items[i].posts[j].author.split('@')[0] + items[i].posts[j].author.split('@')[1].split('.')[0] + "' onclick='openModal(" + items[i].id + "," + items[i].posts[j].id + ")'>Изменить</button>";
                    x += "<button type='button' class='btn btn-link user user" + items[i].posts[j].author.split('@')[0] + items[i].posts[j].author.split('@')[1].split('.')[0] + "' onclick='deletePost(" + items[i].id + "," + items[i].posts[j].id + ")'>Удалить</button>";
                    x += "</div>";
                    x += "</div>";
                    x += "</div>";
                    x += "<hr>";
                }
                //document.getElementById("addmsg").dataset.id = id;
            }
        }
        document.getElementById("postTab").innerHTML = x;

    };
    request.send();
}

function createPost() {
    document.getElementById("postButton").onclick = function () {
        var postText = document.getElementById("postText").value;
        var authorText = document.getElementById("userID").textContent;
        var authorId = document.getElementById("userID").dataset.id;
        var checkId = document.getElementById("postButton").dataset.id;
        var request = new XMLHttpRequest();
        request.open("POST", uripost);
        request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
        request.onload = function () {
            loadOneTheme(checkId);
        };
        request.send(JSON.stringify({
            themeId: checkId,
            text: postText,
            userId: authorId,
            author: authorText,
            rating: 0
        }));
    };
}

function deletePost(themeid, id) {
    var request = new XMLHttpRequest();
    var url = uripost + id;
    request.open("DELETE", url, false);
    request.onload = function () {
        loadOneTheme(themeid);
    };
    request.send();
}

function updatePost(themeid, id) {
        document.getElementById("message-text1").textContent = document.getElementById("text" + id + "").textContent;
        var postText = document.getElementById("message-text1").value;
        document.getElementById("savePost").onclick = function () {
        var postText = document.getElementById("message-text1").value;
        var request = new XMLHttpRequest();
        request.open("PUT", uripost + id);
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        request.onload = function () {
            loadOneTheme(themeid);
        };
        request.send(JSON.stringify({ text: postText }));
        $('#exampleModal1').modal("hide");
    };
}

function openModal(themeid,id) {
    $('#exampleModal1').modal("show");
    updatePost(themeid, id);
}

function loadCategory() {
    var i, x, j = "";
    var request = new XMLHttpRequest();
    request.open("GET", uricat, false);
    request.onload = function () {
        items = JSON.parse(request.responseText);
        for (i in items) {
            x += "<option id=cat" + items[i].name + ">" + items[i].name + "</option>";
        }
        document.getElementById("exampleFormControlSelect1").innerHTML = x;
        for (j in items) {
            document.getElementById("cat" + items[i].name).dataset.id = items[i].id;
        }
    };
    request.send();
}

function loadLikes(id) {
    var request = new XMLHttpRequest();
    request.open("GET", urilike + id, false);
    request.onload = function () {
        countlike = request.responseText; 
    };
    request.send();
    return countlike; 
}

function addLike(checkId, id) {
        getCurrentUser();
        var post = id;
        var user = UID;
        var request = new XMLHttpRequest();
        request.open("POST", urilike);
        request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
        request.onload = function () {
            loadOneTheme(checkId);
        };
        request.send(JSON.stringify({
            postId: post,
            userId: user
        }));
}