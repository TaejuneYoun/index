// var target_url = 'http://supersocial23.com/list.html';
var inappdeny_exec_vanillajs = (callback) => {
    if(document.readyState != 'loading'){
        callback();
    }else{
        document.addEventListener('DOMContentLoaded', callback);
    } 
};
inappdeny_exec_vanillajs(() => { 
    /* Do things after DOM has fully loaded */ 
    function copytoclipboard(val){
        var t = document.createElement("textarea");
        document.body.appendChild(t);
        t.value = val;
        t.select();
        document.execCommand('copy');
        document.body.removeChild(t);
    };
    function inappbrowserout(){
        copytoclipboard(window.location.href);
        alert('URL주소가 복사되었습니다.\n\nSafari가 열리면 주소창을 길게 터치한 뒤, "붙여놓기 및 이동"를 누르면 정상적으로 이용하실 수 있습니다.');
        location.href='x-web-search://?';
    };

    var useragt = navigator.userAgent.toLowerCase();
    var target_url = location.href;
    
    if(useragt.match(/kakaotalk/i)){
        
        //카카오톡 외부브라우저로 호출
        location.href = 'kakaotalk://web/openExternal?url='+encodeURIComponent(target_url);
        
    }else if(useragt.match(/line/i)){
        
        //라인 외부브라우저로 호출
        if(target_url.indexOf('?') !== -1){
            location.href = target_url+'&openExternalBrowser=1';
        }else{
            location.href = target_url+'?openExternalBrowser=1';
        }
        
    }else if(useragt.match(/inapp|naver|snapchat|wirtschaftswoche|thunderbird|instagram|everytimeapp|whatsApp|electron|wadiz|aliapp|zumapp|iphone(.*)whale|android(.*)whale|kakaostory|band|twitter|DaumApps|DaumDevice\/mobile|FB_IAB|FB4A|FBAN|FBIOS|FBSS|SamsungBrowser\/[^1]/i)){
        
        //그외 다른 인앱들
        if(useragt.match(/iphone|ipad|ipod/i)){
            
            //아이폰은 강제로 사파리를 실행할 수 없다 ㅠㅠ
            //모바일대응뷰포트강제설정
            var mobile = document.createElement('meta');
            mobile.name = 'viewport';
            mobile.content = "width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no, minimal-ui";
            document.getElementsByTagName('head')[0].appendChild(mobile);
            //노토산스폰트강제설정
            var fonts = document.createElement('link');
            fonts.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap';
            document.getElementsByTagName('head')[0].appendChild(fonts);
            document.body.innerHTML = "<style>body{margin:0;padding:0;font-family: 'Noto Sans KR', sans-serif;overflow: hidden;height: 100%;}</style><h2 style='padding-top:50px; text-align:center;font-family: 'Noto Sans KR', sans-serif;'>인앱브라우저 호환문제로 인해<br />Safari로 접속해야합니다.</h2><article style='text-align:center; font-size:17px; word-break:keep-all;color:#999;'>아래 버튼을 눌러 Safari를 실행해주세요<br />Safari가 열리면, 주소창을 길게 터치한 뒤,<br />'붙여놓기 및 이동'을 누르면<br />정상적으로 이용할 수 있습니다.<br /><br /><button onclick='inappbrowserout();' style='min-width:180px;margin-top:10px;height:54px;font-weight: 700;background-color:#31408E;color:#fff;border-radius: 4px;font-size:17px;border:0;'>Safari로 열기</button></article><img style='width:70%;margin:50px 15% 0 15%' src='https://tistory3.daumcdn.net/tistory/1893869/skin/images/inappbrowserout.jpeg' />";
        
        }else{
            //안드로이드는 Chrome이 설치되어있음으로 강제로 스킴실행한다.
            location.href='intent://'+target_url.replace(/https?:\/\//i,'')+'#Intent;scheme=http;package=com.android.chrome;end';
        }
    }
});

// PC
if ($(window).width() > 576) {
    function scrollHorizontally(e) {
        e = window.event || e;
        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
        var scrollSpeed = 30; // Janky jank <<<<<<<<<<<<<<

        document.documentElement.scrollLeft -= (delta * scrollSpeed);
        var scrollAmout = document.documentElement.scrollLeft;
        document.body.scrollLeft -= (delta * scrollSpeed);
        //console.log('현재 스크롤 값은 ' + scrollAmout);

        // Vertical Scroll Bar
        var area = $('.list-area');
        var pannel = $('.list-pannel-area');
        var pannelWidth = $(window).outerWidth() * .6;
        let area_width = pannelWidth * pannel.length - $(window).outerWidth();
        let scrollbarRatio = ($(window).outerWidth() - 92) / area_width;
        $('#vs-bar').css({ left: scrollbarRatio * scrollAmout });
        
        // Scroll bar drag
        var vsBar = document.getElementById('vs-bar');
        var minPosition = 16; // 1rem에 해당하는 픽셀 값
        var maxPosition = area_width - 28;
        var startX = 0;
        var scrollStartX = 0;
        var isDragging = false;
        document.getElementsByClassName('list-pannel').ondragstart = function() { return false; }; // 뒷 이미지 drag stop

        vsBar.addEventListener('mousedown', function(event) {
            isDragging = true;
            startX = event.clientX;
            scrollStartX = document.documentElement.scrollLeft;
        });
        
        document.addEventListener('mousemove', function(event) {
            if (!isDragging) return;
        
            var deltaX = event.clientX - startX;
            var scrollAmount = scrollStartX + deltaX / scrollbarRatio;
            if (scrollAmount < minPosition) {
                scrollAmount = minPosition;
            }
            else if (scrollAmount > maxPosition) {
                scrollAmount = maxPosition;
            }
            document.documentElement.scrollLeft = scrollAmount;
            $('#vs-bar').css({ left: scrollbarRatio * scrollAmount });
        });
        
        document.addEventListener('mouseup', function() {
            isDragging = false;
        });
        document.addEventListener('mouseleave', function() {
            isDragging = false;
        });

        // PANNEL SCROLL UP
        let scrollArray = [];
        for (let i = 0; i < (pannel.length); i++) {
            scrollArray[i] = i * pannelWidth;
        }

    }
    if (window.addEventListener) {
        // IE9, Chrome, Safari, Opera
        window.addEventListener("mousewheel", scrollHorizontally, false);
        // Firefox
        window.addEventListener("DOMMouseScroll", scrollHorizontally, false);
        window.addEventListener("mousedown", scrollHorizontally, false);
        window.addEventListener("mousemove", scrollHorizontally, false);
        window.addEventListener("mouseup", scrollHorizontally, false);
    } else {
        // IE 6/7/8
        window.attachEvent("onmousewheel", scrollHorizontally);
        window.attachEvent("onmousedown", scrollHorizontally);
        window.attachEvent("onmousemove", scrollHorizontally);
        window.attachEvent("onmouseup", scrollHorizontally);
    }

    // SRCOLL + LIST ANIMATION (PC)
    const panels = document.querySelectorAll('.list-pannel');

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            const curtain = entry.target.nextElementSibling.querySelector('.curtain');
            if (entry.isIntersecting) {
                entry.target.style.transform = 'translateY(0%)';
                entry.target.style.opacity = "1";
                curtain.style.width = '0';
            } else {
                entry.target.style.transform = 'translateY(30%)';
                curtain.style.width = '100%';
                entry.target.style.opacity = ".7";
            }
        });
    };
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2 // 얼마나 보일 때 이벤트가 발생할 것인지를 설정
    };
    const observer = new IntersectionObserver(observerCallback, options);

    panels.forEach(panel => {
        observer.observe(panel);
    });
}

$(document).ready(function() {
    if ($(window).width() > 576) {
        const panelAreas = $('.list-pannel-area:lt(2)');   
        panelAreas.each(function(index) {
        const panelArea = $(this);
        setTimeout(function() {
            panelArea.addClass('onAtStart');
        }, index * 300);
        });
    }
});

// MO 

if ($(window).width() < 900) {

    const panels = document.querySelectorAll('.list-pannel-area');
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
          const panel = entry.target;
          if (entry.isIntersecting) {
            panel.style.opacity = "1";
          } else {
            panel.style.opacity = "0";
          }
        });
      };   
      const optionss = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3 
      };    
      const observer = new IntersectionObserver(observerCallback, optionss);
    
      panels.forEach(panel => {
        observer.observe(panel);
      });

    var footerPos = $('#list-area').height();
}

$(window).on("resize", function(){
    // LIST CHECK
    const urlContainsList = window.location.href.includes('list');
    if (urlContainsList) {
        location.reload();  
    }    
})




