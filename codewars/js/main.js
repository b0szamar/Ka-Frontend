async function getUserData() {
    const username = document.getElementById('username').value;
    const url = `https://www.codewars.com/api/v1/users/${username}`;
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
            window.userData = data;
            showTotalPoints();
        } else {
            document.getElementById('result').innerHTML = `Hiba: ${data.reason}`;
        }
    } catch (error) {
        document.getElementById('result').innerHTML = `Hiba a lekérés során: ${error.message}`;
    }
}
function showTotalPoints() {
    const totalPoints = window.userData.ranks.overall.score;
    if (!window.userData.name) {
        document.getElementById('result').innerHTML = `
        <h2>Összesített pontok</h2>
        <p><strong>${window.userData.username}</strong> felhasználó összesen <strong>${totalPoints}</strong> ponttal rendelkezik.</p>
      `;
    }
    else {
        document.getElementById('result').innerHTML = `
      <h2>Összesített pontok</h2>
      <p><strong>${window.userData.username}</strong> felhasználó  azaz ${window.userData.name} összesen <strong>${totalPoints}</strong> ponttal rendelkezik.</p>
    `;
    }
}
function showLanguagePoints() {
    const languages = window.userData.ranks.languages;
    let table = `
      <h2>Pontok nyelvek szerint</h2>
      <table>
        <thead>
          <tr>
            <th>Nyelv</th>
            <th>Pontszám</th>
          </tr>
        </thead>
        <tbody>
    `;
    for (const language in languages) {
        table += `
        <tr>
          <td>${language}</td>
          <td>${languages[language].score}</td>
        </tr>
      `;
    }
    table += `</tbody></table>`;
    document.getElementById('result').innerHTML = table;
}
