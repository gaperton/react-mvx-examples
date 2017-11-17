export const usersJson = [
    { id : 1, name : 'John', email : 'john@test.com', roles : [ 2 ] },
    { id : 2, name : 'Mark', email : 'mark@test.com', roles : [ 3 ] },
    { id : 3, name : 'Ori', email : 'ori@test.com', roles : [ 1 ] },
    { id : 4, name : 'Avnil', email : 'avnil@test.com', roles : [ 1, 3 ] },
    { id : 5, name : 'Vlad', email : 'vlad@test.com', roles : [ 1, 3 ] },
    { id : 6, name : 'Rob', email : 'rob@test.com', roles : [ 3 ] }
];

export const rolesJson = [
    { id : 1, name : 'Administrators', users : [ 3, 4, 5 ] },
    { id : 2, name : 'Users', users : [ 1 ] },
    { id : 3, name : 'Developers', users : [ 2, 4, 5, 6 ] }
];