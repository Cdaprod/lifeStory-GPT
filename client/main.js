const socket = new WebSocket('ws://localhost:3000');
const messagesContainer = document.getElementById('messages');

socket.addEventListener('open', () => {
  console.log('Connected to websocket server');
});

socket.addEventListener('message', (event) => {
  const messages = JSON.parse(event.data);
  messages.forEach(message => {
    const messageElement = document.createElement('div');
    messageElement.innerText = `${message.sender}: ${message.text}`;
    messagesContainer.appendChild(messageElement);
  });
});

const sendMessage = () => {
  const inputElement = document.getElementById('message-input');
  const message = {
    sender: 'user',
    text: inputElement.value
  };
  socket.send(JSON.stringify(message));
  const messageElement = document.createElement('div');
  messageElement.innerText = `${message.sender}: ${message.text}`;
  messagesContainer.appendChild(messageElement);
  inputElement.value = '';
};

const sendButton = document.getElementById('send-button');
sendButton.addEventListener('click', sendMessage);
