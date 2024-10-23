// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
  const memeButton = document.getElementById('randomMemeButton');
  const memeImage = document.getElementById('memeImage');
  const container = document.querySelector('.container');

  memeButton.addEventListener('click', () => {
      // Fetch a random meme from the API
      fetch('https://meme-api.com/gimme')
          .then(response => response.json())
          .then(data => {
              // Set the meme image source and wait for it to load
              memeImage.src = data.url;
              memeImage.style.display = 'block';

              memeImage.onload = function () {
                  // Adjust popup size according to image dimensions
                  const width = memeImage.naturalWidth;
                  const height = memeImage.naturalHeight;
                  
                  // Set a maximum size for the popup
                  const maxWidth = 500;  // You can adjust this as needed
                  const maxHeight = 500;

                  // Adjust the size proportionally
                  const scaleFactor = Math.min(maxWidth / width, maxHeight / height);
                  const newWidth = width * scaleFactor;
                  const newHeight = height * scaleFactor;

                  // Resize the popup dynamically
                  container.style.width = `${newWidth}px`;
                  container.style.height = `${newHeight + 80}px`; // Add extra space for button and padding
                  
                  // Resize the browser action popup window
                  chrome.runtime.sendMessage({
                      action: 'resize',
                      width: newWidth,
                      height: newHeight + 80
                  });
              };
          })
          .catch(error => {
              console.error('Error fetching meme:', error);
              memeImage.alt = 'Failed to load meme. Try again!';
          });
  });
});
