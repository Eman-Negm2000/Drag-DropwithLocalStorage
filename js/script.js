let input=document.getElementById('input');
let btn=document.getElementById('btn');
let boxes=document.querySelectorAll('.box');
let drag=null;
console.log(input.value);

///اذا كنت اريد اضافة مهمه ولكن لا تحتوى على نفس الاسم الموجود سابقا
btn.onclick = () => {
    let taskName = input.value;
    if (taskName !== '') {
        let existingTask = Array.from(boxes[0].querySelectorAll('.task')).find(task => task.textContent === taskName);
        if (existingTask) {
            existingTask.remove(); // حذف المهمة المتكررة
         
            updateLocalStorage();
        }
        boxes[0].innerHTML += `<p class="task" draggable="true">${taskName}</p>`;
        updateLocalStorage(); //  إضافة المهمة الجديدة
    }
    input.value = '';
    dragTask();
}

function dragTask () {
    let tasks=document.querySelectorAll('.task');
   tasks.forEach(task =>{
     task.addEventListener('dragstart',()=>{
        drag=task;
        task.style.opacity='0.5';
     });
     task.addEventListener('dragend',()=>{
   drag=null;
   task.style.opacity='1';
     });

    boxes.forEach(box =>{
        box.addEventListener('dragover',(e)=>{
            
            e.preventDefault();
            box.style.background='teal';
            box.style.color='white';
        });
        box.addEventListener('dragleave',()=>{
            box.style.background='rgba(255, 255, 255, 0.9)';
            box.style.color='black';
        });
        box.addEventListener('drop',()=>{
            box.append(drag);
            box.style.background='rgba(255, 255, 255, 0.9)';
            box.style.color='black';
        });
        
    })
   })
}

function updateLocalStorage() {
    let tasksArray = [];
    document.querySelectorAll('.task').forEach(task => {
        tasksArray.push(task.textContent);
    });
    localStorage.setItem('tasks', JSON.stringify(tasksArray));
}




    //local storage
    
window.onload = () =>{
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
        tasks.forEach(task => {
            boxes[0].innerHTML += `<p class="task" draggable="true">${task}</p>`;
        });
    }
    dragTask();
}

