// 모바일 버전에서 Taejune Youn 클릭 시 info.html로 이동
document.getElementById('mainLink').addEventListener('click', () => window.location.href = 'index.html');
document.getElementById('infoLink').addEventListener('click', () => window.location.href = 'info_pc.html');
if (window.innerWidth <= 576) {
        document.getElementById('mainLink').addEventListener('click', () => window.location.href = 'info.html');
        }
