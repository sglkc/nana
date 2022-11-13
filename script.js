document
  .getElementById('form')
  .addEventListener('submit', (e) => {
    e.preventDefault();

    const url = e.target[0].value;

    fetch('https://api.allorigins.win/get?url=' + encodeURI(url))
      .then(res => {
        if (res.ok) return res.json();
        document.getElementById('title').text = 'Failed to fetch page, try again later?';
      })
      .then(res => {
        const { contents } = res;
        const [, title] = contents.match(/<title>([\S\s]+) - (音楽コラボアプリ nana|Music collab app 'nana')<\/title>/);
        const [, sound_url] = contents.match(/sound_url=(\S+);.\.image/);
        const [, image_url] = contents.match(/property="og:image" content="(\S+)">/);
        const sound = JSON.parse(sound_url);

        document.getElementById('results').removeAttribute('hidden');
        document.getElementById('title').innerText = title;
        document.getElementById('link').innerText = sound;
        document.getElementById('audio').src = sound;
        document.getElementById('image').src = image_url;
      });
  });
