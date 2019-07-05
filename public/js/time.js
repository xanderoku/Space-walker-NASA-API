const timeDisplay = document.getElementById('time');

function refreshTime() {
  const dateString = new Date().toLocaleString();
  const formattedString = dateString.replace(', ', ' - ');
  timeDisplay.innerText = formattedString;
}

setInterval(refreshTime, 1000);
