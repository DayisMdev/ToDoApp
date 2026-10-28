const btnNewWork = document.getElementById('btnNewWork');
const btnClosedNewWork = document.getElementById('btnClosedNewWork');
const btnClosedEditWork = document.getElementById('btnClosedEditWork');
const form = document.querySelector("#formNewWork");
const works = JSON.parse(localStorage.getItem("works")) || [];
const containerWorks = document.getElementById('containerWorks');
const formEditWork = document.getElementById('formEditWork');
const editInputTitle = document.getElementById('formEditWork__input--title');
const editInputDescription = document.getElementById('formEditWork__input--description');
const checkAllWorks = document.getElementById('checkAllWorks');

let editingWorkId = null;
let inputSelectAll;

function renderWorks() {
    containerWorks.innerHTML = "";

    works.forEach(work => {

        containerWorks.innerHTML += `
            <li 
                data-id="${work.id}"
                class="${work.completed ? "completed" : ""}"
            >
                <input 
                    type="checkbox" 
                    class="checkWork"
                    ${work.completed ? "checked" : ""}
                >
                <span>
                    <h4>${work.titleWork}</h4>

                    <p>${work.descriptionWork}</p>
                </span>

                <div>
                    <button class="btnEditWork">
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                    </button>

                    <button class="btnDeleteWork">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            </li>
        `;
    });
}

/* OPEN MODAL CREATE WORK */
btnNewWork.addEventListener('click', ()=> {
    const containerCreateWork = document.getElementById('containerCreateWork');
    let [hiddenAttr] = containerCreateWork.getAttributeNames().filter(hidden => hidden == 'hidden') || undefined
    if (hiddenAttr === 'hidden') {
        containerCreateWork.removeAttribute('hidden')
        containerCreateWork.setAttribute('class','containerCreateWork')
    } else {
        containerCreateWork.setAttribute('hidden','')
        containerCreateWork.removeAttribute('class')
    }
 
})

/* CLOSED MODAL CREATE WORK */
btnClosedNewWork.addEventListener('click', (e)=> {
    e.preventDefault();
    const containerCreateWork = document.getElementById('containerCreateWork');
    containerCreateWork.setAttribute('hidden','')
    containerCreateWork.removeAttribute('class')
})

/* CREATE WORK */
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(form));

    data.id = crypto.randomUUID();
    data.completed = false;

    works.push(data);

    localStorage.setItem("works", JSON.stringify(works));

    renderWorks();
    form.reset();
    const containerCreateWork = document.getElementById('containerCreateWork');
    containerCreateWork.setAttribute('hidden','')
    containerCreateWork.removeAttribute('class')
});

/* DELETE WORK */
containerWorks.addEventListener("click", (e) => {

    const btnDelete = e.target.closest(".btnDeleteWork");

    if (!btnDelete) return;

    const li = btnDelete.closest("li");
    const id = li.dataset.id;

    const newWorks = works.filter(work => work.id !== id);

    works.length = 0;
    works.push(...newWorks);

    localStorage.setItem("works", JSON.stringify(works));

    renderWorks();
});

/* EDIT WORK */
containerWorks.addEventListener('click', (e) => {

    const btnEdit = e.target.closest('.btnEditWork');

    if (!btnEdit) return;

    const containerEditWork = document.getElementById('containerEditWork');

    let [hiddenAttr] = containerEditWork
        .getAttributeNames()
        .filter(hidden => hidden == 'hidden') || undefined;

    if (hiddenAttr === 'hidden') {
        containerEditWork.removeAttribute('hidden');
        containerEditWork.setAttribute('class', 'containerCreateWork');
    } else {
        containerEditWork.setAttribute('hidden', '');
        containerEditWork.removeAttribute('class');
    }

    const li = btnEdit.closest("li");
    const id = li.dataset.id;

    editingWorkId = id;

    const work = works.find(work => work.id === id);

    editInputTitle.value = work.titleWork;
    editInputDescription.value = work.descriptionWork;
});

/* EDIT DATES */
formEditWork.addEventListener('submit', (e) => {
    e.preventDefault();

    const work = works.find(work => work.id === editingWorkId);

    if (!work) return;

    work.titleWork = editInputTitle.value;
    work.descriptionWork = editInputDescription.value;

    localStorage.setItem("works", JSON.stringify(works));

    const containerEditWork = document.getElementById('containerEditWork');

    containerEditWork.setAttribute('hidden', '');
    containerEditWork.removeAttribute('class');
    renderWorks();
    formEditWork.reset();
});

/* CLOSED MODAL EDIT WORK */
btnClosedEditWork.addEventListener('click', (e)=> {
    e.preventDefault();
    const containerEditWork = document.getElementById('containerEditWork');
    containerEditWork.setAttribute('hidden','')
    containerEditWork.removeAttribute('class')
    renderWorks();
})

/* CHECKED WORK */
containerWorks.addEventListener("change", (e) => {
    console.log(e.target.checked);
    
    if (!e.target.classList.contains("checkWork")) return;

    const li = e.target.closest("li");
    const id = li.dataset.id;

    const work = works.find(work => work.id === id);

    work.completed = e.target.checked;
    localStorage.setItem("works", JSON.stringify(works));
    renderWorks()

});

/* CHECK ALL WORKS */
checkAllWorks.addEventListener('click', (e)=> {
    console.log(e.target.checked);
    works.forEach(i=> {
        console.log(i.completed);
        i.completed = e.target.checked
        console.log('ok?: '+i.completed);
        
    })
    localStorage.setItem("works", JSON.stringify(works))
    localStorage.setItem('inputSelectAll', JSON.stringify(e.target.checked))
    renderWorks()
})

/* INPUT_STATE_SELECT_ALL_WORKS */
checkAllWorks.checked = JSON.parse(localStorage.getItem('inputSelectAll'))



renderWorks();



/* 
const checkTimeWork = document.getElementById('checkTime--work');

checkTimeWork.addEventListener('input', (e)=> {
    console.log(e.target.checked);
    if (e.target.checked) {
        alert('tiene un limite de dias para cumplir')
    }
}) */