// 共通パーツを読み込む関数
function loadComponent(id, file) {
    const placeholder = document.getElementById(id);
    if (!placeholder) return;

    fetch(file)
        .then(response => {
            if (!response.ok) throw new Error(`${file} の読み込みに失敗しました`);
            return response.text();
        })
        .then(data => {
            placeholder.innerHTML = data;
        })
        .catch(error => console.error(error));
}

// ページが読み込まれたら、ヘッダーとフッターをそれぞれ流し込む
document.addEventListener('DOMContentLoaded', () => {
    loadComponent('header-placeholder', 'header.html');
    loadComponent('footer-placeholder', 'footer.html');
});