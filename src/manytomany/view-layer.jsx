import React from 'react-mvx'

export const UsersList = ({ users, selectedLink }) => (
    <table>
        <tbody>
            { users.map( user => (
                <UserView key={ user.cid }
                            user={ user }
                            selected={ selectedLink.value === user }
                            onClick={ () => selectedLink.set( user ) }
                />
            )) }
        </tbody>
    </table>
);

 export const UserView = ({ user, selected }) => (
    <tr className={ selected ? 'selected' : '' }>
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
                        selected={ selectedLink.value === role }
                        onClick={ () => selectedLink.set( role ) }
                />
            )) }
        </tbody>
    </table>
);

export const RoleView = ({ role, selected }) => (
    <tr className={ selected ? 'selected' : '' }>
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