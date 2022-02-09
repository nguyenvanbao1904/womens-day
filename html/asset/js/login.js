var usersApi = 'https://thundering-chatter-safflower.glitch.me/api/userNames'
var passwordsApi = 'https://thundering-chatter-safflower.glitch.me/api/passwords'

function start(){
    check()
}

start()

function getUsers(callback){
    fetch(usersApi)
        .then(function(responsive){
            return responsive.json()
        })
        .then(callback)
}

function getPasswords(callback){
    fetch(passwordsApi)
        .then(function(responsive){
            return responsive.json()
        })
        .then(callback)
}

function alertError(name,messeage){
    name.innerText = messeage
}

function updateStatus(id,data){
    var options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(data)
    }
    fetch(usersApi+'/'+id,options)
}

function checkLogin(){
    var userNameInput = document.querySelector('#userName').value   
    var passwordInput = document.querySelector('#password').value
    var h2 = document.querySelector('h2')
    var userNameOrPassword = document.querySelector('.user-name-or-password-small')
    getUsers(function(users){
        getPasswords(function(passwords){
            var userName = users.find(function(user){
                return user.userName.includes(userNameInput)
            })
           var pass = passwords.find(function(password){
                return password.id===userName.id
           })
            if(userName.userName==userNameInput && pass.password==passwordInput){
                userNameOrPassword.innerText = ''
                var data = {
                    "id": userName.id,
                    "userName": userName.userName,
                    "status":"Ok"
                }
                function nextPage(){
                    window.location.href =`html/${userName.userName}.html`
                }
                updateStatus(userName.id,data)
                setTimeout(nextPage,1000)
            } else{
                alertError(userNameOrPassword,'Tài Khoản hoặc mật khẩu không chính xác !!')
            }
        })
        var checkUser = users.some(function(user){
            return user.userName==userNameInput
        })
        if(!checkUser){
            alertError(userNameOrPassword,'Tài Khoản hoặc mật khẩu không chính xác !!')
        }
    })
}

function check (){
    var submitBtn = document.querySelector('.submit-btn')
    if(submitBtn){
        submitBtn.addEventListener('click',checkLogin)
    }
    document.onkeydown = function(e){
        if(e.which===13){
            checkLogin()
        }
    }
}