function getDataInput(){
    let userId = document.querySelector('.user-id').value
    let content = document.querySelector('.content').value
    let card = document.querySelector('.card').value
    let senderName = document.querySelector('.sender-name').value
    let senderImg = document.querySelector('.sender-img').value
    let fullName = document.querySelector('.full-name').value
    let senderLink = document.querySelector('.sender-link').value
    
    return {
        'user_id':userId,
        'full_name':fullName,
        'content':content,
        'img':card,
        'sender':senderName,
        'sender_img':senderImg,
        'sender_link':senderLink
    }
}

function postData(data){
    let options = {
        method: 'Put',
        headers: {
        'Content-Type': 'application/json',
    },
  body: JSON.stringify(data),
}
    fetch(`https://thundering-chatter-safflower.glitch.me/api/data/${data.user_id}`, options)
    console.log(data.user_id)
}

function uploadData(){
    let submitBtn = document.querySelector('.submit-btn')
    submitBtn.addEventListener('click',function(e){
        let data = getDataInput()
        e.preventDefault()
        postData(data)
    })
}
uploadData()