window.addEventListener('message', (event) => {
    if (event.data.type === 'SHOW_ALERT') {
        showAlert(event.data.message);
    }
});


function showAlert(message) {
    let alert = document.createElement('div');
    alert.className = 'alert';
    alert.textContent = message;

    // スタイルを定義
    const alert_style = {
        visibility: 'hidden',
        marginLeft: '120px',
        backgroundColor: '#6e7955',
        color: 'white',
        textAlign: 'center',
        borderRadius: '2px',
        padding: '16px',
        position: 'fixed',
        zIndex: '1000',
        right: '120px',
        bottom: '30px',
        fontSize: '17px',
        opacity: '0',
        transition: 'opacity 0.6s, visibility 0.6s',
        textAlign: 'center',
    }
    
    // スタイルを直接適用
    Object.entries(alert_style).forEach(([key, value]) => {
        alert.style[key] = value;
    });
    document.body.appendChild(alert);
    
    setTimeout(() => {
      alert.style.visibility = 'visible';
      alert.style.opacity = '1';
    }, 10); // 少し遅れてスタイルを適用
  
    setTimeout(() => {
      alert.style.visibility = 'hidden';
      alert.style.opacity = '0';
      setTimeout(() => {
        alert.remove();
      }, 600); // アニメーションの時間に合わせて削除
    }, 3000);
  }
