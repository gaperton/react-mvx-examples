import '../styles.css'
import ReactDOM from 'react-dom'
import React, { define } from 'react-mvx'
import { Store } from 'type-r'
import { attributesIO } from 'type-r/endpoints/attributes'

import { User, UserRole } from './data-layer'
import { UsersList } from './users.jsx'
import { RolesList } from './roles.jsx'

/**
 * Let's define an application page.
 */

// We use stores to combine several collections required by the page which needs to be fetched independently.
// Store is the Record which used as root to resolve ~references.
@define class PageStore extends Store {
    // Fetch attributes independently, return the combined promise.
    static endpoint = attributesIO();

    static attributes = {
        users : User.Collection, // master collection for .subsetOf( '~users' )
        roles : UserRole.Collection // master collection for .subsetOf( '~roles' )
    }
}

 @define class UsersDirectoryPage extends React.Component {
    // The store will be used as a root for ~refs in the local state of component's subtree.
    // This store will be created on component's mount, and disposed when it is unmounted.
    static Store = PageStore;

    // Simple inline UI state...
    static state = {
        loading : true,

        // Record from this.store.roles. Serializable as record.id.
        selectedRole : UserRole.from( '~roles' )
    }

    componentWillMount(){
        const finished = () => this.state.loading = false;

        // Read the data...
        this.store.fetch()
            .then( finished )
            .catch( finished );
    }

    render(){
        const { store, state } = this;

        console.log( 'UsersDirectoryPage.render(): state.toJSON() ==', JSON.stringify( state, void 0, 4 ) );

        return state.loading ? (
            <div>Loading...</div> 
        ) : (
            <div>
                <h1>Users</h1>
                <UsersList users={ store.users } />

                <h1>Roles</h1>
                <RolesList roles={ store.roles }
                           selectedLink={ state.linkAt( 'selectedRole' ) }/>
            </div>
        );
    }
 }

 ReactDOM.render( <UsersDirectoryPage />, document.getElementById( 'react-application' ) );
 