const url = 'https://mandarin.api.weniv.co.kr';

const accountName = window.localStorage.getItem('accountname');

console.log(accountName);

async function getPostComponent() {
  const res = await fetch(url + `/${accountName}` + '/userpost', {
    'Authorization': 'Bearer {token}',
    'Content-type': 'application/json',
  });
}
