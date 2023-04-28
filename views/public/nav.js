const token = localStorage.getItem('token');
fetch(`/api/users`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
  .then((res) => res.json())
  .then((data) => {
    if (data.success) {
      const whereNav = document.getElementById('whereNav');
      whereNav.innerHTML = `<nav class="navbar navbar-expand-lg bg-body-tertiary">
          <div class="container-fluid">
            <a class="navbar-brand" href="/"><img src="/img/nav.png" width=170" height="100"  alt="..."/></a>            
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarTogglerDemo02"
              aria-controls="navbarTogglerDemo02"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <a class="nav-link active log-out" aria-current="page"
                    >로그아웃</a
                  >
                </li>
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="/cart"
                    >장바구니</a
                  >
                </li>
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="/user"
                    >마이페이지</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </nav>
    `;
      const logOut = document.querySelector('.log-out');
      logOut.addEventListener('click', () => {
        alert('로그아웃이 되었습니다.');
        window.location.href = '/'; // 이동할 페이지의 URL을 입력하세요.
        window.localStorage.removeItem('token');
      });
    } else {
      whereNav.innerHTML = `<nav class="navbar navbar-expand-lg bg-body-tertiary">
          <div class="container-fluid">

          <a class="navbar-brand" href="/"><img src="/img/nav.png" width=170" height="100"  alt="..."/></a>   
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarTogglerDemo02"
              aria-controls="navbarTogglerDemo02"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="/login/"
                    >로그인</a
                  >
                </li>
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="/register/"
                    >회원가입</a
                  >
                </li>
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="/cart"
                    >장바구니</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </nav>
    `;
    }
  });
