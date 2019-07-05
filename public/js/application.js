const timeTravel = document.getElementById('timetravel');
const logoDiv = document.getElementById('logo-div');
const body = document.getElementsByTagName('body')[0];
const timeTravelAddedDiv = document.getElementById('timetravel-div');
const oppi = document.getElementById('oppi');

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

if (oppi) {
  oppi.addEventListener('click', async e => {
    const randomSol = Math.floor(Math.random() * 4000) + 50;
    const request = await fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/opportunity/photos?sol=${randomSol}&camera=fhaz&api_key=adT6bwE82c36M86vwIUDOEXBNUwJxsFzeP2vuzGo`
    );
    const response = await request.json();
    console.log('RESP: ', response);
    const urlArr = [];
    // console.log('PHO: ', response.photos);
    // eslint-disable-next-line no-restricted-syntax
    for (const i of response.photos) {
      urlArr.push(i.img_src);
    }
    // console.log('URLS: ', urlArr);
    if (response.photos.length !== 0) {
      const newDiv = document.createElement('div');
      newDiv.id = 'timetravel-div';
      const innerTemplate = `<a class="btn btn-dark btn-sm my-2" href="${
        urlArr[0]
      }" target="_blank">New window</a>
  <div class="text-center">
      <img src="${urlArr[0]}" class="rounded" alt="">
  </div>`;
      newDiv.innerHTML = innerTemplate;
      body.appendChild(newDiv);
    }
  });
}
