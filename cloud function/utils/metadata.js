// metadata.js
function getMetadata(path) {
  return fetch(`http://metadata.google.internal/computeMetadata/v1/${path}?recursive=true&alt=text`, {
    headers: {
      "Metadata-Flavor": "Google"
    }
  }).then(r => r.text()).catch(ex=>'does not work on localhost');
}

export const metadata = await getMetadata('instance/service-accounts/default/email');