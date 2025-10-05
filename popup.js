function returnInfo(info) {
  document.getElementById('infoDisplay').innerHTML = info;
} // fucking help me

// Array of images for 1–5 score
const eggImages = [
  "images/eggthing1.png",
  "images/eggthing2.png",
  "images/eggthing3.png",
  "images/eggthing4.png",
  "images/eggthing5.png"
];

// Simulate a sustainability score (replace with AI later)

// Display images based on rating
function displayRating(score) {
  const container = document.getElementById("rating");
  container.innerHTML = ""; // clear previous images

  for (let i = 0; i < score; i++) {
  const img = document.createElement("img");
  img.src = eggImages[i]; // progressively better image
  img.alt = `Egg ${i + 1}`;
  container.appendChild(img);
}
}


// shitty web scraper 😭
// add more fields later
document.getElementById("clickMe").addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  const results = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
        var info = {};
        info.title = document.querySelector('#productTitle')?.innerText.trim() || "N/A";
        info.rating = document.querySelector('.a-icon-alt')?.innerText.trim() || "N/A";
        info.brand=document.querySelector('#bylineInfo')?.innerText.trim() || "N/A";
        info.description = document.querySelector('#productDescription')?.innerText.trim() || "N/A";
        info.title2=document.title;
        //console.log(info);
        return info;

    }, 
  });

  const scrapedText = results[0].result;
  document.getElementById("product").innerText = "Loading...";

  const response = await fetch('http://localhost:3000/api/analyze', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt: JSON.stringify(scrapedText) }),
  });

  const data = await response.json();
  console.log('Response from server:', data);
  document.getElementById("desc").innerText = data.response;

  const match = data.response.match(/([1-5](?:\.\d+)?)(?=\/5)/);
  const score = match ? Number(match[1]) : 3; // fallback 3 if no match

  console.log(score);
  document.getElementById("product").innerText = `Product scored: ${score}/5`;
  displayRating(Math.round(score));
});

 
