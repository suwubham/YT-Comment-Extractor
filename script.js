document.getElementById("geturl").addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    let currentUrl = tabs[0].url;
    const videoId = currentUrl.match(/v=([^\&]+)/)[1];
    console.log(videoId);
    console.log(currentUrl);
    getComments(videoId);
  });
});

function getComments(videoId) {
  const apiKey = "";
  const maxResults = 100;
  const apiUrl = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&maxResults=${maxResults}&key=${apiKey}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const comments = data.items.map(
        (item) => item.snippet.topLevelComment.snippet.textDisplay
      );
      console.log(`Retrieved ${comments.length} comments:`);
      console.log(comments);
    })
    .catch((error) => console.error(error));
}
