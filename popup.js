// Wrap the code inside a DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function () {
    // Add a click event listener to the button when the DOM is fully loaded
    document.getElementById('randomMemeButton').addEventListener('click', () => {
      // Fetch a random meme from the API
      fetch('https://meme-api.com/gimme')
        .then(response => response.json())
        .then(data => {
          // Open a new tab to display the meme
          chrome.tabs.create({ url: data.url });
        })
        .catch(error => console.error('Error fetching meme:', error));
    });
  });
  