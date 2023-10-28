let todoForm = document.querySelector("#form");
let todoSubmit = document.querySelector("#submit");
let todoList = document.querySelector("#list");

let savedList = JSON.parse(localStorage.getItem("todos")) || [];
for(let i = 0; i < savedList.length; i++) {
    let todoItem = document.createElement("li");
    let newDelete = document.createElement("button");
    todoItem.innerText = savedList[i].todo;
    todoItem.isCompleted = savedList[i].isCompleted ? true : false;

    if(todoItem.isCompleted){//testing completion
        todoItem.style.textDecoration = "line-through";
    }
    todoList.appendChild(todoItem);
    todoItem.appendChild(newDelete);
}

todoForm.addEventListener("submit", function(event){
    event.preventDefault();

    let todoItem = document.createElement("li");
    todoItem.innerText = document.querySelector("#input").value;
    todoItem.isCompleted = false;
    let deleteButton = document.createElement("button");

    todoList.appendChild(todoItem);
    todoItem.appendChild(deleteButton);
    todoForm.reset();

    savedList.push({todo: todoItem.innerText, isCompleted: false});
    localStorage.setItem("todos", JSON.stringify(savedList));
})

todoList.addEventListener("click", function(event){
    let targetClicked = event.target.tagName.toLowerCase();
    if(targetClicked === "li"){
        let clickedListItem = event.target;
        //console.log(clickedListItem);
        if(!clickedListItem.isCompleted){
            clickedListItem.style.textDecoration = "line-through";
            clickedListItem.isCompleted = true;
        } else {
            clickedListItem.style.textDecoration = "none";
            clickedListItem.isCompleted = false;
        }
        for (let i = 0; i < savedList.length; i++) {
            if(savedList[i].todo === clickedListItem.innerText) {
                savedList[i].isCompleted = !savedList[i].isCompleted;
                localStorage.setItem("todos", JSON.stringify(savedList));
            }
        }
        
    } else if( targetClicked === "button"){//updates local storage after deleting a li
        let deletedItem = (event.target.parentElement.innerText);
        event.target.parentElement.remove();
        let newSaveList = [];

        for(let i = 0; i < savedList.length; i++) {
            //console.log(savedList[i]["todo"]);
            if(savedList[i]["todo"] != deletedItem){
                newSaveList.push(savedList[i])
            }
        }
        savedList = newSaveList;
        localStorage.setItem("todos", JSON.stringify(savedList));
    }

// localStorage.setItem("list", JSON.stringify(todoList));
// console.log(JSON.parse(localStorage.getItem("list")));
})
