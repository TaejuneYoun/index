/*------------------------------------------------------------------------------------------------------------------*/
// Slider
      document.addEventListener("DOMContentLoaded", function () {
          var imageNames = ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png"];

          function getRandomImageName() {
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
      });
/*------------------------------------------------------------------------------------------------------------------*/
// Slider
    <script>
        document.getElementById('mainLink').addEventListener('click', () => window.location.href = 'index.html');
        document.getElementById('infoLink').addEventListener('click', () => window.location.href = 'info.html');

        // 모바일 버전에서 Taejune Youn 클릭 시 info.html로 이동
        if (window.innerWidth <= 600) {
            document.getElementById('mainLink').addEventListener('click', () => window.location.href = 'info.html');
        }
    </script>

