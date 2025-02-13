/*------------------------------------------------------------------------------------------------------------------*/
// header
        document.getElementById('mainLink').addEventListener('click', () => window.location.href = 'index.html');
        document.getElementById('infoLink').addEventListener('click', () => window.location.href = 'info_pc.html');

/*------------------------------------------------------------------------------------------------------------------*/

    // Optional: Add an event listener to handle window resize
    window.addEventListener("resize", function () {
        isMobile = window.innerWidth <= 576;
        updateImages();
    });
});

