const initialData = {
    todos: {
        'todo-1': {id: 'todo-1', title: 'first'},
        'todo-2': {id: 'todo-2', title: 'second'},
        'todo-3': {id: 'todo-3', title: 'third'},
        'todo-4': {id: 'todo-4', title: 'fourth'},
    },
    columns: {
        'pending':  {
            id: 'pending',
            title: 'Pending',
            todoIds: ['todo-4', 'todo-3']
        },
        'inProgress': {
            id: 'inProgress',
            title: 'In Progress',
            todoIds: ['todo-2']
        },
        'done': {
            id: 'done',
            title: 'Done',
            todoIds: ['todo-1']
        }
    },
    columnOrder: ['pending', 'inProgress', 'done']
};

export default initialData;