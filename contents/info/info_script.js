/*------------------------------------------------------------------------------------------------------------------*/
// header
        document.getElementById('mainLink').addEventListener('click', () => window.location.href = 'index.html');

        // 모바일 버전에서 Taejune Youn 클릭 시 info.html로 이동
        if (window.innerWidth <= 576) {
            document.getElementById('mainLink').addEventListener('click', () => window.location.href = 'info.html');
        }

/*------------------------------------------------------------------------------------------------------------------*/

    // Optional: Add an event listener to handle window resize
    window.addEventListener("resize", function () {
        isMobile = window.innerWidth <= 576;
        updateImages();
    });

