document.addEventListener('DOMContentLoaded', () => {
    const setupEl = document.getElementById('joke-setup');
    const punchlineEl = document.getElementById('joke-punchline');
    const loadingEl = document.getElementById('joke-loading');
    const jokeBtn = document.getElementById('new-joke-btn');

    async function getNewJoke() {
        jokeBtn.disabled = true;
        loadingEl.style.display = 'block';
        setupEl.style.display = 'none';
        punchlineEl.style.display = 'none';
        setupEl.classList.remove('joke-fade-in');
        punchlineEl.classList.remove('joke-fade-in');

        try {
            const response = await fetch('https://v2.jokeapi.dev/joke/Any?type=twopart');
            if (!response.ok) throw new Error('Network error');
            const joke = await response.json();
            if (joke.error) throw new Error('API error');

            setupEl.textContent = joke.setup;
            punchlineEl.textContent = joke.delivery;
            loadingEl.style.display = 'none';
            setupEl.style.display = 'block';
            punchlineEl.style.display = 'block';
            setupEl.classList.add('joke-fade-in');
            setTimeout(() => punchlineEl.classList.add('joke-fade-in'), 200);
        } catch {
            setupEl.textContent = 'Oops! Could not fetch a joke.';
            punchlineEl.textContent = 'Please try again in a moment.';
            loadingEl.style.display = 'none';
            setupEl.style.display = 'block';
            punchlineEl.style.display = 'block';
            setupEl.classList.add('joke-fade-in');
            setTimeout(() => punchlineEl.classList.add('joke-fade-in'), 200);
        } finally {
            jokeBtn.disabled = false;
        }
    }

    jokeBtn.addEventListener('click', getNewJoke);
    getNewJoke();
});
