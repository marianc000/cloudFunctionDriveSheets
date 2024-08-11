// main.js
btn.addEventListener('click', onClick);

function onClick() {
  form.url.value = decodeURI(location.href);
  form.sentAtUTC.value = Date.now(); 

  fetch(form.action, {
    method: "POST",
    body: new FormData(form)
  }).then(res => res.json())
    .then(o => responseDiv.innerText = JSON.stringify(o, null, 2));
}

fetch(form.action).then(res => res.text()).then(str => emailP.innerText = str.replaceAll('"',''));