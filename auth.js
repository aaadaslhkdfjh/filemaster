// 公共认证逻辑，所有页面引入此文件

(function(){
  var token    = localStorage.getItem('token');
  var nickname = localStorage.getItem('nickname') || '';
  var email    = localStorage.getItem('email') || '';

  // 更新导航栏
  function updateNav(){
    var actions = document.querySelector('.nav-actions');
    if(!actions) return;

    if(token){
      // 已登录：显示昵称 + 退出
      var display = nickname || email.split('@')[0] || '用户';
      actions.innerHTML =
        '<span style="font-size:14px;color:#374151;padding:0 8px">👤 '+display+'</span>'+
        '<a href="javascript:void(0)" class="btn-ghost" onclick="logout()">退出</a>';
    }
    // 未登录：保持原样（登录/注册按钮）
  }

  // 退出登录
  window.logout = function(){
    localStorage.removeItem('token');
    localStorage.removeItem('nickname');
    localStorage.removeItem('email');
    window.location.href = 'index.html';
  };

  // 登录后跳回来源页
  window.getRedirectUrl = function(){
    var ref = sessionStorage.getItem('loginRedirect');
    sessionStorage.removeItem('loginRedirect');
    return ref || 'index.html';
  };

  // 需要登录时保存来源页并跳转
  window.requireLogin = function(){
    if(!token){
      sessionStorage.setItem('loginRedirect', window.location.href);
      window.location.href = 'login.html';
      return false;
    }
    return true;
  };

  // 页面加载完成后更新导航
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', updateNav);
  } else {
    updateNav();
  }
})();
