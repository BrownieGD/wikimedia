// Cache common DOM elements.
const app = document.getElementById('app');
const sidebar = document.getElementById('sidebar');
const content = document.getElementById('content');
const heading = document.getElementById('heading');

// ----- Sidebar Toggle Logic -----

const collapseButton = document.getElementById('closeSidebar');
collapseButton.addEventListener('click', handleSidebarCollapse);

function handleSidebarCollapse() {
  toggleSidebar();
  createToggleButton();
}

function toggleSidebar() {
  sidebar.classList.toggle('hidden');
}

function createToggleButton() {
  const toggleButton = document.createElement('button');
  // Use a distinct ID to avoid duplicate IDs.
  toggleButton.id = 'toggleSidebar';
  toggleButton.className =
    'absolute left-4 top-1/2 transform -translate-y-1/2 text-4xl hover:text-5xl';
  toggleButton.innerHTML = '&gt;';

  toggleButton.addEventListener('click', () => {
    toggleSidebar();
    toggleButton.remove();
  });

  app.appendChild(toggleButton);
}

// ----- Render Card Functionality -----

function renderCard(data) {
  // Create the card container.
  const cardElement = document.createElement('div');
  cardElement.className =
    'bg-white rounded-lg p-4 shadow flex items-center justify-between';

  // Build left-side content (image and details).
  const contentContainer = document.createElement('div');
  contentContainer.className = 'flex items-center space-x-4';

  const imgElement = document.createElement('img');
  imgElement.src =
    data.imgSrc || 'https://picsum.photos/seed/default/100/140';
  imgElement.alt = data.title ? `${data.title} Poster` : 'Movie Poster';
  imgElement.className = 'w-20 h-28 rounded';

  const detailsElement = document.createElement('div');

  const titleElement = document.createElement('p');
  titleElement.className = 'text-lg font-semibold';
  titleElement.textContent = data.title || 'Untitled';

  const yearElement = document.createElement('p');
  yearElement.className = 'text-sm text-gray-600';
  yearElement.textContent = data.year || 'Unknown Year';

  detailsElement.append(titleElement, yearElement);
  contentContainer.append(imgElement, detailsElement);
  cardElement.appendChild(contentContainer);

  // Create and wire up the play button.
  const playButton = document.createElement('button');
  playButton.className =
    'bg-blue-500 text-white px-2 py-1 text-sm rounded hover:bg-blue-600';
  playButton.textContent = 'Play';
  playButton.addEventListener('click', () => handlePlay(data));
  cardElement.appendChild(playButton);

  // Append the card to the main content.
  content.appendChild(cardElement);
}

function handlePlay(data) {
  // Find or create the video container.
  let videoContainer = document.getElementById('videoContainer');
  if (!videoContainer) {
    videoContainer = document.createElement('div');
    videoContainer.id = 'videoContainer';
    content.appendChild(videoContainer);
  }

  // Update existing video or create a new one.
  let videoPlayer = document.getElementById('videoPlayer');
  const videoSrc =
    data.videoSrc || 'https://www.w3schools.com/html/mov_bbb.mp4';

  if (videoPlayer) {
    videoPlayer.src = videoSrc;
    videoPlayer.play();
  } else {
    videoPlayer = document.createElement('video');
    videoPlayer.id = 'videoPlayer';
    videoPlayer.className = 'w-full mt-4 rounded';
    videoPlayer.controls = true;
    videoPlayer.autoplay = true;
    videoPlayer.src = videoSrc;
    videoContainer.appendChild(videoPlayer);
  }
}
// ----- Example Usage -----

renderCard({
  imgSrc: 'https://picsum.photos/seed/inception/100/140',
  title: 'Inception',
  year: '2010',
  videoSrc: 'https://www.w3schools.com/html/mov_bbb.mp4'
});
