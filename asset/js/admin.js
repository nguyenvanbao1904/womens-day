function getDataInput(){
    let userId = document.querySelector('.user-id').value
    let content = document.querySelector('.content').value
    let card = document.querySelector('.card').value
    let senderName = document.querySelector('.sender-name').value
    let senderImg = document.querySelector('.sender-img').value
    
    return {
        'user_id':userId,
        'content':content,
        'img':card,
        'sender':senderName,
        'sender-img':senderImg
    }
}

function postData(data){
    let options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
    },
  body: JSON.stringify(data),
}
    fetch('https://thundering-chatter-safflower.glitch.me/api/data', options)
}

function uploadData(){
    let submitBtn = document.querySelector('.submit-btn')
    submitBtn.addEventListener('click',function(e){
        let data = getDataInput()
        e.preventDefault()
        postData(data)
        console.log(data)
    })
}
uploadData()