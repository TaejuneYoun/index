/*------------------------------------------------------------------------------------------------------------------*/
// header
        document.getElementById('mainLink').addEventListener('click', () => window.location.href = 'index.html');
        document.getElementById('infoLink').addEventListener('click', () => window.location.href = 'info.html');

        // 모바일 버전에서 Taejune Youn 클릭 시 info.html로 이동
        if (window.innerWidth <= 600) {
            document.getElementById('mainLink').addEventListener('click', () => window.location.href = 'info.html');
        }

/*------------------------------------------------------------------------------------------------------------------*/
// Slider
document.addEventListener("DOMContentLoaded", function () {
    var isMobile = window.innerWidth <= 768; // Assume width 768px or below as mobile

    var desktopImageNames = ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png"];
    var mobileImageNames = ["m1.png", "m2.png", "m3.png", "m4.png", "m5.png", "m6.png"];

    function getRandomImageName() {
        var imageNames = isMobile ? mobileImageNames : desktopImageNames;
        var randomIndex = Math.floor(Math.random() * imageNames.length);
        return imageNames[randomIndex];
    }

    function updateImages() {
        var slides = document.querySelector(".slides");
        var images = document.querySelectorAll(".slide");

        images.forEach(function (image, index) {
            var imageName = getRandomImageName();
            var imageUrl = "https://raw.githubusercontent.com/TaejuneYoun/index/main/assets/" + imageName;
            image.src = imageUrl;
            image.alt = "Slide " + (index + 1);
        });

        slides.style.transform = "translateX(0)";
    }

    updateImages();

    // Optional: Add an event listener to handle window resize
    window.addEventListener("resize", function () {
        isMobile = window.innerWidth <= 576;
        updateImages();
    });
});

