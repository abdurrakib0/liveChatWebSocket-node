var socket = io.connect("http://localhost:4000/");

var message = document.getElementById('message');
    btn = document.getElementById('send');
    output = document.getElementById('output');
    handle = document.getElementById('handle');
    feedback = document.getElementById('feedback');


// btn.addEventListener("keyup", function(event) {
//     // Number 13 is the "Enter" key on the keyboard
//     if (event.keyCode === 13) {
//         // Cancel the default action, if needed
//         event.preventDefault();
//         // Trigger the button element with a click
//         document.getElementById("send").click();
//     }
// });


btn.addEventListener('click', ()=> {
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });

    message.value = "";
});

message.addEventListener('keypress', ()=>{
    socket.emit('typing', handle.value)
})


socket.on('chat', (data) => {
    feedback.innerHTML = "";
    output.innerHTML += '<p> <strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

socket.on('typing', (data)=>{
    feedback.innerHTML = '<p><em><strong>' + data + '</strong> is typing message </em></p>'
})