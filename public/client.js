 const socket = io()

 let myName;
 let textarea = document.querySelector('#textarea');
 let messageArea = document.querySelector('.message__area');
//  console.log(document.cookie);
//  let myName = document.cookie.userName;
 console.log('my name: ', getCookie('userName')); 
 if(getCookie('userPriviledge') == 'true'){
   myName = getCookie('userName')+ '[ADMIN]'
 }else{
   myName = getCookie('userName')
 }


 textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter'){
        sendMessage(e.target.value)
    }
 })
 
 function getCookie(cname) {
   let name = cname + "=";
   let decodedCookie = decodeURIComponent(document.cookie);
   let ca = decodedCookie.split(';');
   for(let i = 0; i < ca.length; i++) {
     let c = ca[i];
     while (c.charAt(0) == ' ') {
       c = c.substring(1);
     }
     if (c.indexOf(name) == 0) {
       return c.substring(name.length, c.length);
     }
   }
   return "";
 }

 function sendMessage(message) {
    let msg = {
        user: myName,
        message: message.trim()
    }
    //Appending the message
    appendMessage(msg, 'outgoing');
    textarea.value = ''

    //Send to the server
    socket.emit('message', msg)
 }

 function appendMessage(msg, type) {
    let mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add(className, 'message')

    let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup;
    messageArea.appendChild(mainDiv);
 }

 /**Recieve the messages */

 socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
 })