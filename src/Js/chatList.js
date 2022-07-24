//  팔로워 GET요청으로 불러오기 
(async function chatListData() {
  try {
    const res = await fetch(url + '/profile/' + accountname + '/follower', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    });
    const resJson = await res.json();
    // console.log(resJson);
    showfollowerList(resJson);
  } catch {
    console.error('err');
  }
})()

const showfollowerList = (resJson) => {
  console.log(resJson);
}
