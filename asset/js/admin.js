var usersApi = 'https://data-base-women-day.herokuapp.com/api/userNames'
var passwordsApi = 'https://data-base-women-day.herokuapp.com/api/passwords'

var modal = document.querySelector('.modal')

function start(){
    checkStatus()
    setTimeout(resetStatus,5000)
    btnLogin()
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
        if(user[0].status==='Ok'){
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
}

function resetStatus(){
    var data = {
        "id":0,
        "userName": "admin",
        "status": ""
    }
    updateStatus(0,data)
}

function btnLogin(){
    let login = document.querySelector('.login')
    login.addEventListener('click',function(){
        window.location.href ='index.html'
    })
}