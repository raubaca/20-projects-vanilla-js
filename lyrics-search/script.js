const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');

const API_URL = 'https://api.lyrics.ovh';

const searchSongs = async (term) => {
  const response = await fetch(`${API_URL}/suggest/${term}`);
  const data = await response.json();

  showData(data);
};

const showData = (data) => {
  result.innerHTML = `
    <ul class="songs">
      ${data.data
        .map(
          (song) => `
        <li>
          <span><strong>${song.artist.name}</strong> - ${song.title}</span>
          <button
            class="btn"
            data-artist="${song.artist.name}"
            data-songtitle="${song.title}"
          >
            Get Lyrics
          </button>
        </li>`
        )
        .join('')}
    </ul>
  `;

  if (data.prev || data.next) {
    more.innerHTML = `
      ${
        data.prev
          ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>`
          : ''
      }
      ${
        data.next
          ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>`
          : ''
      }
    `;
  } else {
    more.innerHTML = '';
  }
};

const getMoreSongs = async (url) => {
  const response = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  const data = await response.json();

  showData(data);
};

const getLyrics = async (artist, song) => {
  const response = await fetch(`${API_URL}/v1/${artist}/${song}`);
  const data = await response.json();

  const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');

  result.innerHTML = `
    <h2><strong>${artist}</strong> - ${song}</h2>
    <span>${lyrics}</span>
  `;

  more.innerHTML = '';
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchTerm = search.value.trim();

  if (!searchTerm) {
    alert('Please type a search term');
  } else {
    searchSongs(searchTerm);
  }
});

result.addEventListener('click', (e) => {
  e.preventDefault();
  const clickedEl = e.target;

  if (clickedEl.tagName === 'BUTTON') {
    const artist = clickedEl.getAttribute('data-artist');
    const songTitle = clickedEl.getAttribute('data-songtitle');
    getLyrics(artist, songTitle);
  }
});
