document.addEventListener('DOMContentLoaded', function() {
    // Background music setup
    const backgroundMusic = document.getElementById('background-music');
    const playOverlay = document.getElementById('play-overlay');
    backgroundMusic.volume = 0.5; // Set initial volume to 50%

    playOverlay.addEventListener('click', () => {
        backgroundMusic.play();
        playOverlay.style.opacity = '0';
        setTimeout(() => {
            playOverlay.style.display = 'none';
        }, 1000);
    });

    // Create snowflakes
    function createSnowflake() {
        const colors = ['#fff', '#f3f3f3', '#eee'];
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.innerHTML = '❄';
        snowflake.style.left = Math.random() * 100 + 'vw';
        snowflake.style.fontSize = Math.random() * 20 + 10 + 'px';
        snowflake.style.opacity = Math.random() * 0.7 + 0.3;
        snowflake.style.color = colors[Math.floor(Math.random() * colors.length)];

        document.body.appendChild(snowflake);

        const animationDuration = Math.random() * 3 + 2;
        const animation = snowflake.animate([
            { transform: 'translateY(-5vh) translateX(0)', opacity: 1 },
            { transform: `translateY(105vh) translateX(${Math.random() * 100 - 50}px)`, opacity: 0.3 }
        ], {
            duration: animationDuration * 1000,
            easing: 'linear'
        });

        animation.onfinish = () => snowflake.remove();
    }

    // Create snowflakes frequently
    setInterval(createSnowflake, 100); // Create a new snowflake every 100ms

    // Copy contract address functionality
    const contractAddress = document.querySelector('.contract-address');
    contractAddress.addEventListener('click', async function() {
        const address = this.textContent.split(': ')[1].trim();
        try {
            await navigator.clipboard.writeText(address);

            // Show feedback animation
            const originalText = this.textContent;
            this.textContent = 'Copied!';
            setTimeout(() => {
                this.textContent = originalText;
            }, 1000);

            // Create extra snowflakes for feedback
            for(let i = 0; i < 20; i++) {
                setTimeout(createSnowflake, i * 50);
            }
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    });

    // Add sparkle effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseover', () => {
            for(let i = 0; i < 5; i++) {
                setTimeout(createSnowflake, i * 100);
            }
        });
    });
});