const username = "prajesharini";
const container = document.getElementById("repo-container");

async function fetchRepos() {
  try {
const response = await fetch(
  `https://api.github.com/users/${username}/repos?per_page=100`
);
    const data = await response.json();

    // DEBUG: log response
    console.log(data);

    // Check if API returned an error
    if (!Array.isArray(data)) {
      container.innerHTML = `<p>GitHub API Error: ${data.message}</p>`;
      return;
    }

    container.innerHTML = "";

    data.forEach(repo => {
      const card = document.createElement("div");
      card.classList.add("repo-card");

      card.innerHTML = `
        <h3>${repo.name}</h3>
        <p>${repo.description ? repo.description : "No description available."}</p>
        <p><strong>Language:</strong> ${repo.language ? repo.language : "N/A"}</p>
        <a href="${repo.html_url}" target="_blank">View on GitHub</a>
      `;

      container.appendChild(card);
    });

  } catch (error) {
    container.innerHTML = `<p>Error fetching repositories: ${error}</p>`;
  }
}

fetchRepos();
