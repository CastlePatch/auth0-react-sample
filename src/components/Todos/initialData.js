const initialData = {
    todos: {},
    columns: {
        'pending':  {
            id: 'pending',
            title: 'Pending',
            todoIds: []
        },
        'inProgress': {
            id: 'inProgress',
            title: 'In Progress',
            todoIds: []
        },
        'done': {
            id: 'done',
            title: 'Done',
            todoIds: []
        },
        'trash': {
            id: 'trash',
            title: 'Trash',
            todoIds: []
        }
    },
    columnOrder: ['pending', 'inProgress', 'done', 'trash']
};

export default initialData;