//click 페이지 이동
document.addEventListener('DOMContentLoaded', function() {

    document.getElementById('home').addEventListener('click', function() {
        window.location.href = 'home.html'; // 포트폴리오 페이지로 이동
    });

    document.getElementById('portfolio').addEventListener('click', function() {
        window.location.href = 'portfolio.html'; // 포트폴리오 페이지로 이동
    });

    document.getElementById('introduction').addEventListener('click', function() {
        window.location.href = 'introduction.html'; // 소개 페이지로 이동
    });
});
//

//메뉴 패널 생성 및 클릭시 이벤트 생성
document.addEventListener('DOMContentLoaded', function() {
    var menuButton = document.getElementById('menu_button');
    var menuPanel = document.createElement('div');
    menuPanel.className = 'menu_panel';
    menuPanel.innerHTML = '<ul class="menu_links">' +
                              '<li><a href="home.html">Home</a></li>' +
                              '<li><a href="portfolio.html">Portfolio</a></li>' +
                              '<li><a href="introduction.html">Introduction</a></li>' +
                              '<li><a href="chatbot.html">ChatBot</a></li>' +
                              '<li><a href="findmusic.html">FindMusic</a></li>' +
                          '</ul>';
    document.body.appendChild(menuPanel);

    var overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);

    menuButton.addEventListener('click', function() {
        menuPanel.classList.toggle('open');
        overlay.classList.toggle('open');
    });

    // 메뉴 외부를 클릭하면 메뉴창 닫기
    document.addEventListener('click', function(event) {
        if (!menuPanel.contains(event.target) && event.target !== menuButton) {
            menuPanel.classList.remove('open');
            overlay.classList.remove('open');
        }
    });

    // 오버레이를 클릭하면 메뉴창 닫기
    overlay.addEventListener('click', function() {
        menuPanel.classList.remove('open');
        overlay.classList.remove('open');
    });
});

