class HandleTasks {
    saveTask (xhr, task) {
        let path = `http://localhost:8000/task/add`;
        let body = JSON.stringify(task);
        xhr.open('POST', `${path}`, true);
        xhr.withCredentials = true;
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onloadend = () => {
            console.log(`Added Task ${xhr.responseText}`);
            //const tasks = xhr.responseText;
            //return tasks ? JSON.parse(tasks) : [];
        }
        xhr.onerror = function () {
            console.log(xhr.status);
        }

        xhr.send(body);
    }

    getTasks(xhr) {
        let path = `http://localhost:8000/task/all`;
        let body = JSON.stringify(`user_id="${encodeURIComponent(sessionStorage.getItem('userID'))}"`);
        xhr.open('POST', `${path}`, true);
        xhr.withCredentials = true;
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onloadend = () => {
            console.log(`All Tasks ${xhr.responseText}`);
            const tasks = xhr.responseText;
            return tasks ? JSON.parse(tasks) : [];
        }
        xhr.onerror = function () {
            console.log(xhr.status);
        }

        xhr.send(body);
    }
}


class Modal extends HandleTasks {
    constructor(modal){
        super();
        this.modal = modal;
        this.card = modal.querySelector('.card');
        this.fillUp();

        this.handleClose = this.handleClose.bind(this);
    }

    open(heading) {
        this.modal.style.display = 'block';
        this.card.querySelector('.card-title').innerText = heading;
        this.modal.addEventListener('click', this.handleClose);
    }

    close() {
        this.modal.style.display = 'none';
        this.modal.removeEventListener('click', this.handleClose);
    }

    handleClose(e) {
        if(!e.target.closest('.card') || e.target.closest('.close')) {
            this.close();
        }
    }

    fillUp() {
        //const tasks = this.getTasks();
        const tasks = document.querySelectorAll('.tasks .card');
        const form = this.card.querySelector('form#modal');
        const idCurrent = parseInt(document.querySelector('.tasks .card .card-body').getAttribute('id'));

        form.header.value = tasks[idCurrent].querySelector('.card-title').innerText;
        form.details.value = tasks[idCurrent].querySelector('.card-text').innerText;
    }

}

const openViewTaskModal = () => {
    const modalInstance = new Modal(document.querySelector('.modal'));
    modalInstance.open('View Task');
    //const formHandler = new FormHandler(document.forms[0]);
}

