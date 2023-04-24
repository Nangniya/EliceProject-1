const whereNav = document.getElementById('whereNav');
const token = localStorage.getItem('token');
console.log(token);
fetch('api/users', {
  method: 'GET',
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
  .then((res) => res.json())
  .then((data) => console.log(data));

whereNav.innerHTML = `<nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">Team4</a>
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
              <a class="nav-link active" aria-current="page" href="/register"
                >회원가입</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/cart"
                >장바구니</a
              >
            </li>
          </ul>
          <form class="d-flex" role="search">
            <input
              class="form-control me-1"
              type="search"
              placeholder="상품명 입력"
              aria-label="Search"
            />
            <button class="btn btn-outline-success serchsubmit" type="submit">
              검색
            </button>
          </form>
        </div>
      </div>
    </nav>
`;
