/**
 * Users list, implemented as stateful component.
 */

import React, { define } from 'react-mvx'
import { User } from './data-layer'

@define
export class UsersList extends React.Component {
    static props = {
        users : User.Collection
    }

    static pureRender = true;

    static state = {
        // Any of these options will work:
        selected : User.from( '~users' ) // user model from store.users collection
        // selected : User.from( '^props.users' ), // user model from this.props.users collection
        // selected : User.shared, // user model from some collection, non-serializable
    }

    render(){
        const { users } = this.props;

        console.log( 'UsersList.render(): state.toJSON() ==', JSON.stringify( this.state, void 0, 4 ) );

        return (
            <table>
                <tbody>
                    { users.map( user => (
                        <UserView key={ user.cid }
                                    user={ user }
                                    selectedLink={ this.linkAt( 'selected' ) }
                        />
                    )) }
                </tbody>
            </table>
        );
    }
}

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
