class HandleSignupForm {
    constructor(form) {
        this.form = form;
        this.controls = this.form.elements;
        Array.from(this.controls).forEach(el => el.addEventListener('blur', this.validate));
        this.form.addEventListener('submit', this.onsubmit.bind(this));
    }

    validate(e) {
        if (e.target.tagName === 'BUTTON') return true;
        e.target.classList.remove('border-danger');

        if (!e.target.value) {
            e.target.classList.add('border-danger');
            return false;
        }

        const regexp = new RegExp(e.target.dataset.reg);
        if (!regexp.test(e.target.value)) {
            e.target.classList.add('border-danger');
            return false;
        }

        return true;
    }

    onsubmit(e) {
        e.preventDefault();
        const controls = Array.from(this.controls);
        controls.forEach( el => this.validate({ target: el }) );
        const validFields = controls.every(el => !el.classList.contains('border-danger'));
        const equalPasswords = (controls[1].value === controls[2].value);
        if (validFields && equalPasswords) {
            this.sendRegisterRequest(this.form.email.value, this.form.password.value);
        }
    }

    sendRegisterRequest (email, password) {
        const newUser = {};
        newUser[email] = email;
        newUser[password] = password;
        let path = `http://localhost:8000/user/register`;
        const xhr = new XMLHttpRequest();
        let body = `email=${encodeURIComponent(newUser[email])}&password=${encodeURIComponent(newUser[password])}`;

        xhr.open('POST', `${path}`, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onloadend = () => {
            this.setHomePage()
            //this.root.innerHTML = xhr.responseText;

        }
        xhr.onerror = function () {
            console.log(xhr.status);
        }

        xhr.send(body);
    }

    setHomePage () {
        const currentLocation = document.location.href;
        const tmp = currentLocation.indexOf("#");
        const newLocation = `${currentLocation.slice(0, tmp)}#home`;
        window.location.assign(newLocation);
        document.querySelectorAll('.nav-item').forEach( el => el.classList.toggle('active'));
    }

}


class HandleLoginForm {
    constructor(form) {
        this.form = form;
        this.controls = this.form.elements;
        Array.from(this.controls).forEach(el => el.addEventListener('blur', this.validate));
        this.form.addEventListener('submit', this.onsubmit.bind(this));
    }

    validate(e) {
        if (e.target.tagName === 'BUTTON') return true;
        e.target.classList.remove('border-danger');

        if (!e.target.value) {
            e.target.classList.add('border-danger');
            return false;
        }

        const regexp = new RegExp(e.target.dataset.reg);
        if (!regexp.test(e.target.value)) {
            e.target.classList.add('border-danger');
            return false;
        }

        return true;
    }

    onsubmit(e) {
        e.preventDefault();
        const controls = Array.from(this.controls);
        controls.forEach( el => this.validate({ target: el }) );
        const validFields = controls.every(el => !el.classList.contains('border-danger'));
        if (validFields) {
            this.sendRegisterRequest(this.form.email.value, this.form.password.value);
        }
    }

    sendRegisterRequest (email, password) {
        const user = {};
        user[email] = email;
        user[password] = password;
        let path = `http://localhost:8000/user/login`;
        const xhr = new XMLHttpRequest();
        let body = `email=${encodeURIComponent(user[email])}&password=${encodeURIComponent(user[password])}`;

        xhr.open('POST', `${path}`, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onloadend = () => {
            this.setHomePage();
            console.log(`Sign in response: ${xhr.responseText}`);
            //this.root.innerHTML = xhr.responseText;

        }
        xhr.onerror = function () {
            console.log(xhr.status);
        }

        xhr.send(body);
    }

    setHomePage () {
        const currentLocation = document.location.href;
        const tmp = currentLocation.indexOf("#");
        const newLocation = `${currentLocation.slice(0, tmp)}#home`;
        window.location.assign(newLocation);
        document.querySelectorAll('.nav-item').forEach( el => el.classList.toggle('active'));
    }

}
