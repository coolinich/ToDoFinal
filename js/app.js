const router = new Router([
    new Route('home', 'views/home.html', true),
    new Route('addnew', 'views/addnew.html'),
    new Route('login', 'views/login.html'),
    new Route('signup', 'views/signup.html')
], 'app');

router.init();