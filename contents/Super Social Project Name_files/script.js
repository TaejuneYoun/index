/*------------------------------------------------------------------------------------------------------------------*/
// LOADING
document.addEventListener("DOMContentLoaded", function () {
    var loadingContainerA = document.getElementById('loading-1');
    var loadingContainerB = document.getElementById('loading-2');
    var loadingContainer2 = document.getElementById('loading-2-1');
    var loadingContainer3 = document.getElementById('loading-2-2');
    // LOADING ANIMATION 1
    var animation1 = bodymovin.loadAnimation({
        container: loadingContainerA, // 필수, 애니메이션 들어가는 곳 
        path: '/assets/animation/loading1.json', // 필수(url 또는 json파일 다운로드 경로)
        renderer: 'svg', // 필수
        loop: true, // 반복재생
        autoplay: true // 자동재생
    });
    // LOADING ANIMATION 1
    var animation2 = bodymovin.loadAnimation({
        container: loadingContainer2, // 필수, 애니메이션 들어가는 곳 
        path: '/assets/animation/loading2.json', // 필수(url 또는 json파일 다운로드 경로)
        renderer: 'svg', // 필수
        loop: true, // 반복재생
        autoplay: true // 자동재생
    });
    var animation3 = bodymovin.loadAnimation({
        container: loadingContainer3, // 필수, 애니메이션 들어가는 곳 
        path: '/assets/animation/loading3.json', // 필수(url 또는 json파일 다운로드 경로)
        renderer: 'svg', // 필수
        loop: false, // 반복재생
        autoplay: true // 자동재생
    });

    // Loading Exit 
    let loadingCompleted = false;
    function loadStop() {
        if (loadingContainerA) {
            animation1.stop();
            loadingContainerA.firstElementChild.style.display = "none";
            loadingContainerA.style.height = '0';
        }
        if (loadingContainerB) {
            animation2.stop();
            loadingContainer2.style.display = "none";
            loadingContainer3.style.display = "none";
            loadingContainerB.style.height = '0';
        }
    }
    // in 5s
    window.addEventListener("load", function () {
        loadStop();
        console.log("Animation 1 loading completed");
    });

    // over 5s
    setTimeout(function () {
        loadStop();
        console.log("Animation 1 stopped after 5 seconds");
    }, 5000);
});
/*------------------------------------------------------------------------------------------------------------------*/

// CURSOR
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', e => {
    cursor.style.opacity = 1;
    window.requestAnimationFrame(() => {
        cursor.style.top = `${e.clientY - cursor.offsetHeight / 2}px`;
        cursor.style.left = `${e.clientX - cursor.offsetWidth / 2}px`;
    });
});
var cursorr = $('#cursor');
$('a').on('mouseenter', function () {
    cursorr.css({
        'transform': 'scale(1.7)',
        'background': 'white',
        'mix-blend-mode': 'difference',
    });

})
$('a').on('mouseout', function () {
    cursorr.css({
        'transform': 'scale(1)',
        'background': 'black',
        'mix-blend-mode': 'normal',
    });
})

$(document).ready(function () {
    $("a[href^='http://']").attr("target", "blank");
    $("a[href^='https://']").attr("target", "blank");

    // PROJECT 
    // Scroll Effect
    $(".bundle").attr("data-aos", "fade-up");
    AOS.init({
        initClassName: "",
        animatedClassName: "aos-animate",
        useClassNames: false,
        offset: 150,
        mirror: true,
    });
    // Header Slide Up event at start
    $('#project-header').animate({ paddingTop: '0' }, 600);
    $('#project-header-container').animate({
        paddingTop: '0',
        opacity: '1'
    }, 800);
    var headerHeight = $('#project-header').height();
    $('#project-header-gradation').css('height', headerHeight);

});

// header menu open close 
$('#menu-button').on('click', function () {
    $('#header-sidebar').toggleClass('open');

    var menuImage = $(this).children("img");
    menuImage.attr("src", function (index, attr) {
        if (attr.match('open')) {
            return attr.replace("open", "close");
        }
        else {
            return attr.replace("close", "open");
        }
    })
})

// ripple button animation
if ($(window).width() > 576) {
    $(function () {
        $(".action-button").on('mouseenter', function (e) {
            x = e.pageX - $(this).offset().left;
            y = e.pageY - $(this).offset().top;
            $(this).find("span").css({
                top: y,
                left: x
            });
        });
        $(".action-button").on('mouseout', function (e) {
            x = e.pageX - $(this).offset().left;
            y = e.pageY - $(this).offset().top;
            $(this).find("span").css({
                top: y,
                left: x
            });
        });
    });
}
/*------------------------------------------------------------------------------------------------------------------*/
// 반응형 resize
$(window).on("load resize", function () {

    // COMMON PC VIEW CODE
    if ($(window).width() > 576) {
        //LANDING
        if ($('#landing-video').length > 0) {
            $("#landing-video source").attr('src', '/assets/fig/landing/landing_pc.mp4'); // 랜딩 영상 
            $("#landing-video")[0].load();
            $("#landing-video")[0].play();
        }
        // LIST
        var thumbs = $('.list-thumb');
        thumbs.each(function (index) {
            if (index % 2 === 1) {
                $(this).css('top', '20%');
            }
        });
    }
    // COMMON TABLET VIEW CODE
    if ($(window).width() > 900) {
        // ABOUT 
        $('.notice-button').children('span').text('Hover!');
    }
    
    // COMMON MOBILE VIEW CODE
    if ($(window).width() < 576) {
        //back button
        $("a.back").html("");
        $("a.back").append('<img src="/assets/fig/back.svg"/>');

        // LANDING
        if ($('#landing-video').length > 0) {
            $("#landing-video source").attr('src', '/assets/fig/landing/landing_mobile.mp4'); // 랜딩 영상 
            $("#landing-video")[0].load();
            $("#landing-video")[0].play();
        }
    }
});

/*------------------------------------------------------------------------------------------------------------------*/
// about video

document.addEventListener("DOMContentLoaded", function() {
    const videoContainers = document.querySelectorAll(".video-grid .video");
  
    videoContainers.forEach(container => {
      const iframe = container.querySelector("iframe");
  
      container.addEventListener("mouseenter", function() {
        iframe.style.display = "block";
        iframe.contentWindow.postMessage('{"method":"play"}', '*');
      });
  
      container.addEventListener("mouseleave", function() {
        iframe.contentWindow.postMessage('{"method":"pause"}', '*');
      });
    });
  });


  $("img").attr("onerror", "this.style.display='none';"); 






