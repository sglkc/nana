document
  .getElementById('form')
  .addEventListener('submit', (e) => {
    e.preventDefault();

    const response = document.getElementById('response');

    response.removeAttribute('hidden');
    response.innerText = 'Fetching page from url';

    const nanaUrl = new URL(e.target[0].value)
    const id = nanaUrl.pathname.split('/').at(-1)

    nanaUrl.host = 'jackson.nana-music.com'
    nanaUrl.pathname = '/v2/webplayer/' + id

    const fetchUrl = new URL('https://api.allorigins.win/raw')

    fetchUrl.searchParams.set('url', nanaUrl.toString())

    fetch(fetchUrl)
      .then((res) => {
        if (res.ok) return res.json();
        response.innerText = 'Failed to fetch page, try again later?';
      })
      .then((res) => {
        const { title, post_id, sound_url } = res

        response.setAttribute('hidden', true);
        document.getElementById('results').removeAttribute('hidden');
        document.getElementById('title').innerText = title;
        document.getElementById('link').innerText = sound_url;
        document.getElementById('audio').src = sound_url;
        document.getElementById('image').src = 'https://d2tuwg44y6gooq.cloudfront.net/?post_id=' + post_id;
      })
      .catch((err) => {
        response.innerText = 'Error: ' + err;
        console.error(err);
      });
  });
