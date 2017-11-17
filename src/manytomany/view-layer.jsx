import React from 'react-mvx'

export const UsersList = ({ users, selectedLink }) => (
    <table>
        <tbody>
            { users.map( user => (
                <UserView key={ user.cid }
                            user={ user }
                            selectedLink={ selectedLink }
                />
            )) }
        </tbody>
    </table>
);

 export const UserView = ({ user, selectedLink }) => (
    <tr className={ selectedLink.value === user ? 'selected' : '' }
        onClick={ () => selectedLink.set( user ) }
    >
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

export const RolesList = ({ roles, selectedLink }) => (
    <table>
        <tbody>
            { roles.map( role => (
                <RoleView key={ role.cid }
                        role={ role }
                        selectedLink={ selectedLink }
                />
            )) }
        </tbody>
    </table>
);

export const RoleView = ({ role, selectedLink }) => (
    <tr className={ selectedLink.value === role ? 'selected' : '' }
        onClick={ () => selectedLink.set( role ) }
    >
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