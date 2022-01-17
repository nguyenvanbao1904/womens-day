var usersApi = 'https://nguyenvanbao1904.github.io/userName.json'
var passwordsApi = 'https://nguyenvanbao1904.github.io/password.json'

var submitBtn = document.querySelector('.submit-btn')

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

function check (){
    submitBtn.onclick=function(){
        var userNameInput = document.querySelector('#userName').value   
        var passwordInput = document.querySelector('#password').value
        getUsers(function(users){
            getPasswords(function(passwords){
                var userName = users.userNames.find(function(user){
                    return user.userName.includes(userNameInput)
                })
               var pass = passwords.passwords.find(function(password){
                   return password.id===userName.id
               })
                if(userName.userName==userNameInput && pass.password==passwordInput){
                    alert('Chúc mừng em đã đăng nhập thành công !!!')
                } else{
                    alert('Sai cmnr !')
                    
                }
            })
            var checkUser = users.userNames.some(function(user){
                return user.userName==userNameInput
            })
            if(!checkUser){
                alert('Sai cmnr !')
            }
        })
    }
}