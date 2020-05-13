const url = 'ws://localhost:3000';

const boardBtn = document.querySelector('.create-board');
const registerBtn = document.querySelector('.register');

const socket = new WebSocket(url);

registerBtn.addEventListener('click', () => {
  if (localStorage in navigator) {
    const id = localStorage.getItem('id');
    socket.send(JSON.stringify({ type: 'register-user', id }));
  } else {
    socket.send(JSON.stringify({ type: 'register-user' }));
  }
});

boardBtn.addEventListener('click', () => {
  socket.send(JSON.stringify({ type: 'create-board' }));
});
