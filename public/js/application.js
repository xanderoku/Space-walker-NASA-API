const timeTravel = document.getElementById('timetravel');
const logoDiv = document.getElementById('logo-div');
const body = document.getElementsByTagName('body')[0];
const timeTravelAddedDiv = document.getElementById('timetravel-div');

timeTravel.addEventListener('submit', async e => {
  e.preventDefault();
  const response = await fetch('/timetravel', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ date: e.target.date.value })
  });
  const returned = await response.json();
  //   console.log('front: ', returned.url);
  if (!timeTravelAddedDiv && returned.url !== undefined) {
    if (logoDiv) logoDiv.remove();
    const newDiv = document.createElement('div');
    newDiv.id = 'timetravel-div';
    const innerTemplate = `<a class="btn btn-dark btn-sm my-2" href="${returned.hdurl}" target="_blank">HD</a>
  <div class="text-center">
      <img src="${returned.url}" class="rounded" alt="${returned.title}">
  </div>
    <blockquote class="blockquote text-center mt-3 p-3 rounded bg-dark">
    <p class="mb-2 text-white-50"><b>${returned.date}</b></p>
    <p class="mb-0 text-white-50">${returned.explanation}</p>
  </blockquote>`;
    newDiv.innerHTML = innerTemplate;
    body.appendChild(newDiv);
  }
});
