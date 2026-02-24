const username = "YOUR_GITHUB_USERNAME"; // ← Replace this with your GitHub username
const container = document.getElementById("repo-container");

async function fetchRepos() {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated`);
    const repos = await response.json();

    if (repos.length === 0) {
      container.innerHTML = "<p>No repositories found.</p>";
      return;
    }

    repos.forEach(repo => {
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
