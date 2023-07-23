function loadNavbar() {
    var navbarContent = `
      <nav class="navbar navbar-expand-lg navbar-light bg-light navbar-dark bg-dark fixed-top">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" href="power_law.html">幂律</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="graph.html">方程图像</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="epidemic_simulation.html">传染</a>
            </li>
            <li class="nav-item">
              <a class="nav-link " href="chaos.html">混沌</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="gaming.html">博弈</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-expanded="false">排序</a>
              <div class="dropdown-menu">
                <a class="dropdown-item " href="sort_insert.html">插入排序</a>
                <a class="dropdown-item  " href="sort_bubble.html">冒泡排序</a>
                <a class="dropdown-item  " href="sort_quick.html">快速排序</a>
              </div>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="Monte_Carlo.html">蒙特卡洛</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="evolutionary.html">演化算法</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="hanoi.html">汉诺塔</a>
            </li>
            <li class="nav-item">
              <a class="nav-link " href="simulate_random_life.html">随机人生</a>
            </li>
            <li class="nav-item">
              <a class="nav-link " href="three_door.html">三门问题 </a>
            </li>
            <li class="nav-item">
              <a class="nav-link " href="koch.html">科赫曲线 </a>
            </li>
          </ul>
        </div>
      </nav>
    `;

    document.getElementById('navbarContainer').innerHTML = navbarContent;
}

// 在页面加载完成后调用loadNavbar函数
window.addEventListener('DOMContentLoaded', loadNavbar);

