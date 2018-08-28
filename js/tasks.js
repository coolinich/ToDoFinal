const API_BASE_URI = 'http://localhost:8000';

class HandleTasks {
    saveTask (task) {
        const xhr = new XMLHttpRequest();
        let path = `http://localhost:8000/task/add`;
        let body = JSON.stringify(task);
        xhr.open('POST', `${path}`, true);
        xhr.withCredentials = true;
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Access-Control-Allow-Credentials', 'true');
        xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://localhost:63342');
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

    getTasks() {
        const xhr = new XMLHttpRequest();
        let path = `http://localhost:8000/task/all`;
        let body = JSON.stringify({user_id: String(sessionStorage.getItem('userID'))});
        xhr.open('POST', `${path}`, true);
        xhr.withCredentials = true;
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Access-Control-Allow-Credentials', 'true');
        xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://localhost:63342');
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

    init() {
        /*const newtask = {
    user_id: `${encodeURIComponent(sessionStorage.getItem('userID'))}`,
    header: 'Task1 header',
    details: 'Task 1 details',
    date: `${Date.now()}`
}
    ht.saveTask(xhr, newtask);*/
    /*        let gettasks = handleTasks.getTasks.bind(this);
        gettasks();
*/

    }
}


class Modal extends HandleTasks {
    constructor(modal, taskId){
        super();
        this.modal = modal;
        this.card = modal.querySelector('.card');
        this.taskId = taskId;
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
        //const tasks = document.querySelectorAll('.tasks .card');
        const task = document.querySelector(`.tasks .card-body[data-id="${this.taskId}"]`);
        const form = this.card.querySelector('form#modal');
        //const idCurrent = parseInt(document.querySelector('.tasks .card .card-body').getAttribute('id'));

        form.header.value = task.querySelector('.card-title').innerText;
        form.details.value = task.querySelector('.card-text').innerText;
    }

}

const openViewTaskModal = (el) => {
    const taskId = el.target.parentNode.dataset.id;
    const modalInstance = new Modal(document.querySelector('.modal'), taskId);
    modalInstance.open('View Task');
    //const formHandler = new FormHandler(document.forms[0]);
}

