document
  .getElementById('form')
  .addEventListener('submit', (e) => {
    e.preventDefault();

    const response = document.getElementById('response');
    const url = e.target[0].value;

    response.removeAttribute('hidden');
    response.innerText = 'Fetching page from url';

    fetch('https://corsproxy.org/?' + encodeURIComponent(url))
      .then((res) => {
        if (res.ok) return res.text();
        response.innerText = 'Failed to fetch page, try again later?';
      })
      .then((res) => {
        const [, title] = res.match(/<title>([\S\s]+) - .+<\/title>/);
        const [, sound_url] = res.match(/sound_url=(\S+);.\.image/);
        const [, image_url] = res.match(/property="og:image" content="(\S+)">/);
        const sound = JSON.parse(sound_url);

        response.setAttribute('hidden', true);
        document.getElementById('results').removeAttribute('hidden');
        document.getElementById('title').innerText = title;
        document.getElementById('link').innerText = sound;
        document.getElementById('audio').src = sound;
        document.getElementById('image').src = image_url;
      })
      .catch((err) => {
        response.innerText = 'Error: ' + err;
        console.error(err);
      });
  });
