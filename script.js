// 共通パーツを読み込む関数
function loadComponent(id, file) {
    const placeholder = document.getElementById(id);
    if (!placeholder) return Promise.resolve(); // プレースホルダーがない場合はそのまま進む

    return fetch(file)
        .then(response => {
            if (!response.ok) throw new Error(`${file} の読み込みに失敗しました`);
            return response.text();
        })
        .then(data => {
            placeholder.innerHTML = data;
        })
        .catch(error => console.error(error));
}
// ページが読み込まれたときの処理を1つにまとめる
document.addEventListener('DOMContentLoaded', async () => {
    // 1. ヘッダーとフッターを読み込む（ヘッダーの読み込み完了を待つ）
    await loadComponent('header-placeholder', 'header.html');
    await loadComponent('footer-placeholder', 'footer.html');

    // 2. ヘッダーが読み込まれてから、ハンバーガーメニューの動きを設定する
    const hamburgerBtn = document.getElementById('menuToggle') || document.getElementById('hamburgerBtn') || document.querySelector('.menu-toggle');
    const globalMenu = document.getElementById('globalMenu');
    const menuOverlay = document.getElementById('menuOverlay');
    const menuIcon = document.getElementById('menuIcon');

    function toggleMenu() {
        if (hamburgerBtn) hamburgerBtn.classList.toggle('active');
        if (globalMenu) globalMenu.classList.toggle('active');
        if (menuOverlay) menuOverlay.classList.toggle('active');

        // アイコンの切り替え処理（三本線 ⇔ バツ印）
        if (menuIcon && globalMenu) {
            if (globalMenu.classList.contains('active')) {
                // メニューが開いたとき：バツ印に変更
                menuIcon.className = "fa-solid fa-xmark";
            } else {
                // メニューが閉じたとき：三本線に戻す
                menuIcon.className = "fa-solid fa-bars";
            }
        }
    }

    // 3. クリックイベントを登録
    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', toggleMenu);
    }
    if (menuOverlay) {
        menuOverlay.addEventListener('click', toggleMenu);
    }
    if (globalMenu) {
        globalMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', toggleMenu);
        });
    }
});

// ページ遷移時・読み込み完了時に強制的に一番上へスクロールさせる
window.onload = function() {
    window.scrollTo(0, 0);
};

// ブラウザのスクロール位置自動復元機能を無効化する
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
// ページトップへ戻るボタンの動作
document.addEventListener("DOMContentLoaded", function() {
    const topBtn = document.querySelector(".page-top-btn");
    if (topBtn) {
        topBtn.addEventListener("click", function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
});