const characterDiv = document.getElementById('character')
const button = document.getElementById('expelliarmus');

function obtainCharacter() {
    // OBtener los personajes a través de traerlos de una página aleatoria de la api
    const randomPage = Math.floor(Math.random() * 25) + 1;
    const apiHp = `https://api.potterdb.com/v1/characters?page[size]=100&page[number]=${randomPage}`;

    fetch(apiHp)
        .then(res => {
            if (!res.ok) throw new Error("Page not found");
            return res.json();
        })
        .then(data => {
            const characters = (data.data || [])
                .map(item => item.attributes)
                .filter(ch => ch.image && ch.image.trim() !== "");

            if (characters.length === 0) {
                characterDiv.innerText = "No characters with images found.";
                return;
            }

            const randomIndex = Math.floor(Math.random() * characters.length);
            const randomCharacter = characters[randomIndex];

            const img = randomCharacter.image;
            const name = randomCharacter.name || "Unknown";
            const house = randomCharacter.house || "—";

            characterDiv.innerHTML = `
                <img src="${img}" alt="${name}" style="width:200px;border-radius:10px;">
                <h2>${name}</h2>
                <p>House: ${house}</p>
                <p><strong>Congratulations! You are ${name}!</strong></p>
                `;
        })
        .catch(err => {
            console.error(err);
            characterDiv.innerText = "Error fetching character 😢";
        });
}

button.addEventListener("click", obtainCharacter);
