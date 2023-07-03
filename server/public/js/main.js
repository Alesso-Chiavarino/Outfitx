const logoutBtn = document.getElementById('logout-btn')

logoutBtn?.addEventListener('click', ()=>{
    fetch('/api/session/logout')
    .then(() => window.location.href = '/')
})