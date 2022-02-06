var usersApi = 'https://data-base-women-day.herokuapp.com/api/userNames'
var passwordsApi = 'https://data-base-women-day.herokuapp.com/api/passwords'
var userId = Number(document.querySelector('.name-id').textContent)
var userText = document.querySelector('.name-text').textContent
var modal = document.querySelector('.modal')

function start(){
    checkStatus()
    setTimeout(resetStatus,5000)
    btnLogin()
    btnClose()
}

start()

function getUsers(callback){
    fetch(usersApi)
        .then(function(responsive){
            return responsive.json()
        })
        .then(callback)
}

function checkStatus(){
    getUsers(function(user){
        if(user[userId].status==='Ok'){
            modal.classList.add('hiden')
        } else{
            modal.classList.remove('hiden')
        }
    })
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
    console.log(data)
}

function resetStatus(){
    var data = {
        "id":userId,
        "userName": userText,
        "status": ""
    }
    updateStatus(userId,data)
}

function btnLogin(){
    let login = document.querySelector('.login')
    login.addEventListener('click',function(){
        window.location.href ='index.html'
    })
}

function btnClose(){
    let close = document.querySelector('i')
    close.addEventListener('click',function(){
        var rs = confirm('Rất tiếc bạn cần phải đăng nhập để tiếp tục. Vui lòng quay trở lại trang đăng nhập !')
        if(rs){
            window.location.href ='index.html'
        }
    })
}