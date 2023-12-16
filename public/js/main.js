const deleteBtn = document.querySelectorAll('.del')
const editBtn = document.querySelectorAll('.edit')
const todoItem = document.querySelectorAll('span.not')
const todoComplete = document.querySelectorAll('span.completed')

Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteTodo)
})

Array.from(editBtn).forEach((el)=>{
    el.addEventListener('click', editTodo)
})
Array.from(todoItem).forEach((el)=>{
    el.addEventListener('click', markComplete)
})

Array.from(todoComplete).forEach((el)=>{
    el.addEventListener('click', markIncomplete)
})

async function deleteTodo(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/deleteTodo', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markComplete(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/markComplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markIncomplete(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/markIncomplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }

    async function editItem(){
        const todoId = this.parentNode.dataset.id
        try{
            const response = await fetch('todos/deleteTodo', {
                method: 'delete',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    'todoIdFromJSFile': todoId
                })
            })
            const data = await response.json()
            console.log(data)
            location.reload()
        }catch(err){
            console.log(err)
        }
    }
    function editItem(id, name, description) {
        // Populate the hidden field with the id
        document.getElementById("updateId").value = id;
      
        // Populate the form fields with the existing item's data
        document.getElementById("updateName").value = name;
        document.getElementById("updateDescription").value = description;
      
        // Update the form's action attribute
        document.getElementById("updateForm").action = `/item/update/${id}`;
      }
}