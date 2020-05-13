const url = 'ws://localhost:3000';

const boardBtn = document.querySelector('.create-board');

const socket = new WebSocket(url);

boardBtn.addEventListener('click', () => {
  socket.send(JSON.stringify({ type: 'create-board' }));
});
