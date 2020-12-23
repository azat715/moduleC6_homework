const wsUri = 'wss://echo.websocket.org/';

const btnSend = document.getElementsByName('j-bt-send')[0];
const btnGeo = document.getElementsByName('j-bt-geo')[0];
const inputField = document.getElementById('input_mes');
const resFrame = document.getElementsByClassName('res')[0];

function showHtml(message, callback) {
  const divMesItem = document.createElement('div');
  divMesItem.className = 'mes';
  if (typeof callback == 'function') {
    callback(divMesItem);
  } else {
    divMesItem.innerText = message;
  }
  resFrame.appendChild(divMesItem);
}

function showPos(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const url = new URL(`https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`);
  showHtml(null, (divMesItem) => {
    divMesItem.innerHTML = `<a href=${url}>
    Координаты ${latitude} ${longitude}</a>`;
  });
};

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPos, showError);
  } else {
    alert('Геолакация не поддерживается браузером');
  }
}

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      console.log('Геолокация запрещена пользователем');
      break;
    case error.POSITION_UNAVAILABLE:
      console.log('Геолокация недосупна');
      break;
    case error.TIMEOUT:
      console.log('Превышено ожидание запроса геолокации');
      break;
    case error.UNKNOWN_ERROR:
      console.log('Неизвестная ошибка');
      break;
  }
}

function connWebSocket() {
  const socket = new WebSocket(wsUri);
  socket.onopen = () => {
    console.log('CONNECTED');
  };
  socket.onclose = () => {
    console.log('DISCONNECTED');
  };
  function send(message) {
    if (socket.readyState == 1) {
      socket.send(message);
    } else {
      console.log(socket.readyState);
      console.log('CONNECT ERROR');
      alert('Ошибка, смотрите логи');
    }
  }
  function close() {
    socket.close();
    console.log('CLOSE');
  }
  function receive(callback) {
    socket.onmessage = (message) => {
      callback(message.data);
    };
  }
  return {
    send: send,
    close: close,
    receive: receive,
  };
}

let timerId;

function close() {
  this.close();
  alert('Соединение закрыто, перезагрузите страницу');
}

document.addEventListener('DOMContentLoaded', () => {
  const wsSocket = connWebSocket();
  const closeWsSocket = close.bind(wsSocket);
  timerId = setTimeout(closeWsSocket, 60000);
  btnSend.addEventListener('click', () => {
    if (inputField.validity.valid) {
      showHtml(inputField.value);
      wsSocket.send(inputField.value);
      inputField.value = '';
      wsSocket.receive(showHtml);
      clearTimeout(timerId);
      timerId = setTimeout(closeWsSocket, 60000);
    }
  });
  btnGeo.addEventListener('click', () => {
    getLocation();
  });
});
