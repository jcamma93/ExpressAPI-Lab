Swal.fire("Welcome!");

const userInput = document.getElementById('user');
const textInput = document.getElementById('text');

document.getElementById("addChirp").addEventListener('click', async(e) => {
    e.preventDefault()
    // console.log(userInput.value)
    // console.log(textInput.value)
    console.log({ user: userInput.value, text: textInput.value });
    const res = await fetch("/api/chirps", {
        method: 'POST',
        headers: { "Content-Type": 'application/json' },
        body: JSON.stringify({ user: userInput.value, text: textInput.value }),
    });
    getAllChirps();
}
);

const chirpList = document.getElementById("chirplist");

async function getAllChirps() {
    try {
        const res = await fetch("/api/chirps");
        const data = await res.json();
        if (res.ok) {
            chirpList.innerHTML = "";
            data.forEach(chirp => {
                const p = document.createElement("p");
                p.id = chirp.id;
                p.textContent = `${chirp.user} : ${chirp.text}`;
                chirpList.appendChild(p);
            });
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error(error);
    };
};

getAllChirps();