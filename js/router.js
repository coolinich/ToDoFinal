class Router {
    constructor(routes, root) {
        this.routes = routes;
        this.root = document.getElementById(root);

    }

    init(){
        window.addEventListener('hashchange', () => this.hashChange());
        this.hashChange();
    }
    hashChange() {
        if (location.hash.length > 0) {
            this.routes.forEach((r) => {
                if (r.isActiveRoute(location.hash)) {
                    this.follow(r.htmlFileName);
                }

            })
        } else {
            this.routes.forEach((r) => {
                if (r.isHome) {
                    this.follow(r.htmlFileName);
                }
            })
        }
    }

    follow (path) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `${path}`);
        xhr.withCredentials = true;
        xhr.onloadend = () => {
            switch(window.location.hash) {
                case '#signup':
                    this.root.innerHTML = xhr.responseText;
                    let signupForm = new HandleSignupForm(document.querySelector("#signupForm"));
                    break;
                case '#login':
                    this.root.innerHTML = xhr.responseText;
                    let loginForm = new HandleLoginForm(document.querySelector("#loginForm"));
                    break;
                case '#logout':
                    sessionStorage.removeItem('userID');
                    document.location.hash = "#login";
                    document.querySelectorAll('.nav-item').forEach( el => el.classList.toggle('active'));
                    break;
                case '#home':
                    if (!sessionStorage.getItem('userID')) document.location.hash = "#login";
                    else {
                        this.root.innerHTML = xhr.responseText;
                        const handleTasks = new HandleTasks();
                        /*const newtask = {
                            user_id: `${encodeURIComponent(sessionStorage.getItem('userID'))}`,
                            header: 'Task1 header',
                            details: 'Task 1 details',
                            date: `${Date.now()}`
                        }
                        ht.saveTask(xhr, newtask);*/
                        handleTasks.getTasks(xhr);
                        document.querySelectorAll('.tasks .card-title').forEach( (el) => el.addEventListener('click', openViewTaskModal) );
                    }
                    break;
                case '#addnew':
                    this.root.innerHTML = xhr.responseText;
                    break;
            };
        }
        xhr.onerror = function () {
            console.log(xhr.status);
        }
        xhr.send();
    }
}