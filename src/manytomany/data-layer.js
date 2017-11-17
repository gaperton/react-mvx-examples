import { Record, define, predefine } from 'type-r'
import { memoryIO } from 'type-r/endpoints/memory'
import { usersJson, rolesJson } from './mock-data'
/**
 * Data layer definitions
 */

// Predefine UserRole.
@predefine
export class UserRole extends Record {}

// Define User record.
@define
export class User extends Record {
    // Using simulated IO with mock JSON data and 1 second delay
    static endpoint = memoryIO( usersJson, 1000 );

    static attributes = {
        name : '',
        email : '',
        // Collection of references to user roles serializable as an array of ids.
        roles : UserRole.Collection.subsetOf( '~roles' )
    }
}

// Define the UserRole. Need to do it in this way because user and role has references to each other.
UserRole.define({
    // Using simulated IO with mock JSON data and 1 second delay
    endpoint : memoryIO( rolesJson, 1000 ),

    attributes : {
        name : '',
        // Collection of refs to users serializable as an array of ids.
        users : User.Collection.subsetOf( '~users' )
    }
});