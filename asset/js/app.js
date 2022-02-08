// check sign in
var usersApi = 'https://thundering-chatter-safflower.glitch.me/api/userNames'
var passwordsApi = 'https://thundering-chatter-safflower.glitch.me/api/passwords'
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

// Feature

;(function openAlbum(){
    let openBtns = document.querySelectorAll('.open-view')
    let albumContainer = document.querySelector('.album-container')
    let albumBody = albumContainer.querySelector('.album-body')

    function show(){
        albumContainer.classList.add('show')
        albumBody.classList.add('show')
    }

    openBtns.forEach(function(openBtn){
        openBtn.addEventListener('click',show)
        albumBody.classList.add('show') 
    })

    document.querySelector('.picture-container img').addEventListener('click',show)
})()

;(function closeAlbum(){
    let albumContainer = document.querySelector('.album-container')
    let iconClose = albumContainer.querySelector('i')
    let albumBody = albumContainer.querySelector('.album-body')

        albumContainer.addEventListener('click',function(e){
            if(albumContainer===e.target){
                albumContainer.classList.remove('show')
                albumBody.classList.remove('show')
            }
        })

        iconClose.addEventListener('click',function(){
            albumContainer.classList.remove('show')
            albumBody.classList.remove('show')
        })
})()