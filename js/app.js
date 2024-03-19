// Retrieve todos list from localStorage or initialize an empty array if it doesn't exist
const todoList = JSON.parse(localStorage.getItem('todoList')) || [];
// Get the task list container element
const taskList = document.getElementById('task-list');

// Function to render the todos list
const renderTodoList = () => {
    // Clear the task list container
    taskList.innerHTML = '';
    // Loop through each todos item and render it
    todoList.forEach((todo, index) => {
        // Create list item for the todos
        const listItem = document.createElement('li');
        listItem.classList.add('listTodo-item');

        // Create container for todos item details
        const containerItem = document.createElement('div');
        containerItem.classList.add('container-item');
        listItem.appendChild(containerItem);

        // Create label for todos title
        const labelTitle = document.createElement('label');
        labelTitle.innerText = "Title : ";
        containerItem.appendChild(labelTitle);
        const labelTitleValue = document.createElement('label');
        labelTitleValue.classList.add('label-title');
        labelTitleValue.innerText = todo.title;
        containerItem.appendChild(labelTitleValue);

        containerItem.appendChild(document.createElement('br'));
        
        // Create label for todos description
        const labelDesc = document.createElement('label');
        labelDesc.innerText = "Description : ";
        containerItem.appendChild(labelDesc);
        const labelDescriptionValue = document.createElement('label');
        labelDescriptionValue.classList.add('label-description');
        labelDescriptionValue.innerText = todo.description;
        containerItem.appendChild(labelDescriptionValue);

        containerItem.appendChild(document.createElement('br'));
        
        // Create edit and delete buttons for todos item
        const buttonEdit = createButton('Edit', () => editTodo(index));
        buttonEdit.classList.add('btn-edit');
        const buttonDelete = createButton('Delete', () => deleteTodo(index));
        buttonDelete.classList.add('btn-edit');
        
        containerItem.appendChild(buttonEdit);
        containerItem.appendChild(buttonDelete);

        // Append todos item to the task list
        taskList.appendChild(listItem);
    });
};

// Function to create a button element
const createButton = (text, onClick) => {
    const button = document.createElement('button');
    button.classList.add('btn', 'btn-sm');
    button.innerText = text;
    button.onclick = onClick;
    return button;
};

// Function to edit a todos item
const editTodo = (index) => {
    const todo = todoList[index];

    // Create input fields for editing title and description
    const inputTitle = document.createElement('input');
    inputTitle.classList.add('edit-input');
    inputTitle.placeholder = 'Edit title';
    inputTitle.value = todo.title;

    const inputDesc = document.createElement('input');
    inputDesc.classList.add('edit-input');
    inputDesc.placeholder = 'Edit description';
    inputDesc.value = todo.description;

    // Create update and cancel buttons
    const updateButton = createButton('Update', () => updateTodo(index));
    updateButton.classList.add('btn-edit');
    const cancelButton = createButton('Cancel', () => cancelEdit());
    cancelButton.classList.add('btn-edit');

    // Clear input fields and append new elements
    const containerItem = document.querySelector(`#task-list .listTodo-item:nth-child(${index + 1}) .container-item`);
    containerItem.innerHTML = '';

    const labelTitle = document.createElement('label');
    labelTitle.textContent = "Title : ";
    containerItem.appendChild(labelTitle);
    
    const labelDesc = document.createElement('label');
    labelDesc.textContent = "Description : ";
    containerItem.appendChild(labelDesc);
    
    containerItem.appendChild(labelTitle);
    containerItem.appendChild(inputTitle);
    containerItem.appendChild(labelDesc);
    containerItem.appendChild(inputDesc);
    containerItem.appendChild(updateButton);
    containerItem.appendChild(cancelButton);
};

// Function to update a todos item
const updateTodo = (index) => {
    const inputTitle = document.querySelector(`#task-list .listTodo-item:nth-child(${index + 1}) .container-item .edit-input:nth-child(2)`);
    const inputDesc = document.querySelector(`#task-list .listTodo-item:nth-child(${index + 1}) .container-item .edit-input:nth-child(4)`);

    // Update todos with new values from input fields
    todoList[index].title = inputTitle.value.trim();
    todoList[index].description = inputDesc.value.trim();

    // Update localStorage and re-render todos list
    localStorage.setItem('todoList', JSON.stringify(todoList));
    renderTodoList();
};

const cancelEdit = () => {
    // Re-render the todos list to cancel the edit mode
    renderTodoList();
};

// Function to delete a todos item
const deleteTodo = (index) => {
    // Remove todos item from the list
    todoList.splice(index, 1);
    // Update localStorage and re-render todos list
    localStorage.setItem('todoList', JSON.stringify(todoList));
    renderTodoList();
};

// Function to add a new todos item
const inputData = () => {
    // Get input values
    const valueTitle = document.getElementById('title').value.trim();
    const valueDesc = document.getElementById('description').value.trim();

    // Check if input fields are not empty
    if (valueTitle === '' || valueDesc === '') {
        alert('Please fill in both the title and description fields.');
        return;
    }

    // Create a new todos object
    const newTodo = {
        id: todoList.length + 1,
        title: valueTitle,
        description: valueDesc
    };

    // Add the new todos to the list
    todoList.push(newTodo);
    // Update localStorage and re-render todos list
    localStorage.setItem('todoList', JSON.stringify(todoList));
    // Clear input fields
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    // Re-render todos list
    renderTodoList();
};

// Render the initial todos list
renderTodoList();