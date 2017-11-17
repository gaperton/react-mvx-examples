import React from 'react-mvx'

export const UsersList = ({ users }) => (
    <table>
        { users.map( user => (
            <UserView key={ user.cid } user={ user } />
        )) }
    </table>
);

 export const UserView = ({ user }) => (
    <tr className='row'>
        <td className='field'>
            { user.id }
        </td>
        <td className='field'>
            { user.name }
        </td>
        <td className='field'>
            { user.email }
        </td>
        <td className='field'>
            { user.roles.pluck( 'name' ).join( ', ' ) }
        </td>
    </tr>
 );

export const RolesList = ({ roles }) => (
    <table>
        { roles.map( role => (
            <RoleView key={ role.cid } role={ role } />
        )) }
    </table>
);

export const RoleView = ({ role }) => (
    <tr className='row'>
        <td className='field'>
            { role.id }
        </td>
        <td className='field'>
            { role.name }
        </td>
        <td className='field'>
            { role.users.pluck( 'name' ).join( ', ' ) }
        </td>
    </tr>
);