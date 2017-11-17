/**
 * RolesList, implemented as pure component
 */

import React, { define } from 'react-mvx'

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