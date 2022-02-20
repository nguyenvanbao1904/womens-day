// check sign in
var usersApi = 'https://thundering-chatter-safflower.glitch.me/api/userNames'
var passwordsApi = 'https://thundering-chatter-safflower.glitch.me/api/passwords'
var dataApi = 'https://thundering-chatter-safflower.glitch.me/api/data'
var userId = Number(document.querySelector('.name-id').textContent)
var userText = document.querySelector('.name-text').textContent
var modal = document.querySelector('.modal')

function start(){
    render()
    checkStatus(userId)
    setTimeout(resetStatus,2000)
    btnLogin()
    btnClose()
    designTitleWeb()
}

start()

function designTitleWeb(){
    document.querySelector('title').textContent = `Dear - ${userText} 💚`
    document.querySelector('link:last-child').setAttribute('href','./asset/img/logo.png')
    console.log()
}

function getUsers(callback){
    fetch(usersApi)
        .then(function(responsive){
            return responsive.json()
        })
        .then(callback)
}

function getDatas(callback){
    fetch(dataApi)
        .then(function(responsive){
            return responsive.json()
        })
        .then(callback)
}

function checkStatus(userId){
    getUsers(function(users){
        users.forEach(function(user){
            if(user.id===userId){
                if(user.status==='Ok'){
                    modal.classList.add('hiden')
                } else{
                    modal.classList.remove('hiden')
                }
            }
        })
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
    if(window.location.href.includes('github.io')){
        login.addEventListener('click',function(){
            window.location.href = '/womens-day/'
       })
    } else{
        login.addEventListener('click',function(){
            window.location.href = '/'
       })
    }
    
}

function btnClose(){
    let close = document.querySelector('i')
    close.addEventListener('click',function(){
        var rs = confirm('Rất tiếc bạn cần phải đăng nhập để tiếp tục. Vui lòng quay trở lại trang đăng nhập !')
        if(rs){
            window.location.href ='/'
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

function render(){
    let name = document.querySelector('.main-content h4')
    let content = document.querySelector('.main-content-text')
    let img = document.querySelector('.picture-container img')
    let imgShow = document.querySelector('.album-body img')
    let senderName = document.querySelector('.info-name')
    let senderAvatar = document.querySelector('.info-sender img')
    let senderContact = document.querySelector('.header-content ul li a')

    getDatas(function(datas){
        datas.forEach(function(data){
            if(data.id===userId){
                name.innerHTML = `Dear<br>${data.full_name}`
                content.textContent = data.content
                img.setAttribute('src',data.img)
                imgShow.setAttribute('src',data.img)
                senderName.textContent = data.sender
                senderAvatar.setAttribute('src',data.sender_img)
                senderContact.setAttribute('href',data.sender_link)
            }
        })
    })
}