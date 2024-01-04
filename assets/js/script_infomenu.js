// 모바일 버전에서 Taejune Youn 클릭 시 info.html로 이동
document.getElementById('mainLink').addEventListener('click', () => window.location.href = 'index.htm');
document.getElementById('infoLink').addEventListener('click', () => window.location.href = 'info.htm');
if (window.innerWidth <= 576) {
        document.getElementById('mainLink').addEventListener('click', () => window.location.href = 'info.htm');
        }
