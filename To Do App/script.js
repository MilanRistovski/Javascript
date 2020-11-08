// Select the elements

const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");
const item1 = document.getElementById("item");

// CLASSES NAMES

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//VARIABLES
let LIST, id ;

// get item from local storage
let data = localStorage.getItem("TODO");

if(data) {
    LIST = JSON.parse(data);
    id = LIST.lenth;
    loadList(LIST);
} else {
    LIST = [];
    id=0;
}

//  load items
 function loadList(array) {
     array.forEach(function(item) {
         addToDo(item.name, item.id, item.done, item.trash);        
     });
 }

 clear.addEventListener("click", function(){
     localStorage.clear();
     location.reload();
 });

// function loadList(array){
//     array.array.forEach(item => {
//         addToDo(item.name, item.id, item.done,item.trash);
        
//     });
// }

const today = new Date();
const options = {weekday:"long", month:"short", day:"numeric"};
dateElement.innerHTML = today.toLocaleDateString("en-US", options); 


function addToDo(toDo, id, done, trash) {

    if(trash){return;}

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done? LINE_THROUGH : "";
    const item = `<li class="item">
                <i class="fa ${DONE}" job="complete" id="${id}"></i>
                <p class="text ${LINE}">${toDo}</p>
                <i class="fa fa-trash-o delete" job="delete" id="${id}"></i> 
                </li>
                `;

                // list.innerHTML += item;
                 const position = "beforeend";
                list.insertAdjacentHTML(position, item);
}

document.addEventListener("keyup", function(event){
    if(event.keyCode == 13){
        const toDo=input.value;

        if(toDo){
            addToDo(toDo, id, false, false);

            LIST.push({
                name:toDo,
                id: id,
                done: false,
                trash: false
            });

            // add item to localstorage
            localStorage.setItem("TODO", JSON.stringify(LIST));
            
            id++;
        }
        input.value = "";
    }
});

// addToDo("Coffee", 1, false, true);

function completeTodo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

function removeTodo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

// target items created dynamically

list.addEventListener("click", function(event) {
    const element = event.target;
    const elementJob = element.attributes.job.value;
    
    if(elementJob == "complete") {
        completeTodo(element);
    } else if (elementJob == "delete") {
        removeTodo(element);
    }
    localStorage.setItem("TODO", JSON.stringify(LIST));
});