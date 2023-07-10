

const userInput = document.getElementById('user');
const textInput = document.getElementById('text');

document.getElementById("addChirp").addEventListener('click', async (e) => {
    e.preventDefault();
    
    const res = await fetch("/api/chirps", {
        method: 'POST',
        headers: { "Content-Type": 'application/json' },
        body: JSON.stringify({ user: userInput.value, text: textInput.value }),
    });
    if (res.ok) {
        getAllChirps();
        userInput.value = '';
        textInput.value = '';
    }
});

const chirpList = document.getElementById("chirplist");

function displayChirps(data) {
    chirpList.innerHTML = '';
    data.forEach(chirp => {
        const p = document.createElement('p');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.className = 'btn btn-sm btn-outline-danger';
        p.id = chirp.id;
        p.textContent = `${chirp.user} : ${chirp.text}`;
        p.appendChild(deleteButton);
        chirpList.appendChild(p);

        deleteButton.addEventListener('click', async () => {
            window.location.reload();
            const res = await fetch(`/api/chirps/${chirp.id}`, {
                method: 'DELETE'
            });
            if (res.ok) {
                getAllChirps();

            }
        });
    });
}

async function getAllChirps() {
    try {
        const res = await fetch('/api/chirps');
        const data = await res.json();
        if (res.ok) {
            displayChirps(data);
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error(error);
    }
}

getAllChirps();