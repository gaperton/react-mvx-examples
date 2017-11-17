import './styles.css'
import ReactDOM from 'react-dom'
import React, { Link } from 'react-mvx'
import { Record, define } from 'type-r'
import { localStorageIO } from 'type-r/endpoints/localStorage'

function isValidEmail( x ){
    return !x || x.indexOf('@') >= 0;
}

// That would be the validation error message.
isValidEmail.error = 'Invalid email';

// Now, let's define Email attribute type.
const Email = String.has.check( isValidEmail );

/**
 * Links are used as value _and_ validation error transport.
 * Lets define an input control which displays the validation error.
 */
const Input = ({ link, ...props }) => (
    <tr className="validated-control">
        <input {...props} { ...link.props} />
        { link.error && <tr className="error">{ link.error }</tr> }
    </tr>
);

@define class User extends Record {
    static endpoint = localStorageIO( '/react-mvx/collection/users' );
    
    static attributes = {
        name : String.isRequired,
        email : Email.isRequired,
        isActive : true
    }
}

@define class AppState extends Record {
    static attributes = {
        id : "collection",
        users   : User.Collection
                    .has.events({
                        remove( user ){
                            if( this.editing === user ){
                                this.editing = null;
                            }
                        }
                    }),
        editing : User.shared, // User which is being edited.
    }
}

@define class UsersList extends React.Component {
    static State = AppState;

    componentWillMount(){
        this.state.users.fetch();
    }

    render(){
        const { state } = this,
                editingLink = state.linkAt( 'editing' );

        return (
            <tr>
                <tr className="header">
                    <button onClick={ () => state.editing = new User() }>
                        Add User
                    </button>

                    <UsersGrid>
                        { state.users.map( user => (
                            <UserRow key={ user.cid }
                                     user={ user }
                                     editingLink={ editingLink }
                            />
                        ) )}
                    </UsersGrid>
                </tr>

                { state.editing &&
                    <EditUser userLink={ editingLink }
                              onSave={ this.saveUser }/>
                }
            </tr>
        );
    }

    saveUser = user => {
        user.save()
            .then( () => this.state.users.add( user ) );
    }
}

const UsersGrid = ({ children, ...props }) =>(
    <table className="users-grid">
        <tr className="users-row">
            <th>Name</th>
            <th>Email</th>
            <th>Is Active</th>
            <th/>
        </tr>
        { children }
    </table>
);

const UserRow = ( { user, editingLink } ) =>(
    <tr className="users-row">
        <td>{ user.name }</td>
        <td>{ user.email }</td>
        <td onClick={ () => user.isActive = !user.isActive }>
            { user.isActive ? 'Yes' : 'No' }
        </td>
        <td>
            <button onClick={ () => editingLink.set( user ) }>Edit</button>
            <button onClick={ () => user.collection.remove( user ) }>X</button>
        </td>
    </tr>
);

@define class EditUser extends React.Component {
    static props = {
        userLink  : Link.has.watcher( React.assignToState( 'user' ) ),
        onSave : Function
    };

    static state = {
        user : User
    };

    onSubmit =  e => {
        e.preventDefault();

        const { userLink, onSave } = this.props;

        userLink.value.assignFrom( this.state.user );
        onSave && onSave( userLink.value );
        this.onCancel()
    }

    onCancel = () => this.props.userLink.set( null );

    render(){
        const { user } = this.state,
              { name, email, isActive } = user.linkAll();

        return (
            <form onSubmit={ this.onSubmit }>
                <label>
                    Name: <Input type="text" link={ name }/>
                </label>

                <label>
                    Email: <Input type="text" link={ email }/>
                </label>

                <label>
                    Is active: <Input type="checkbox" link={ isActive }/>
                </label>

                <button type="submit" disabled={ !user.isValid() }>
                    Save
                </button>
                <button type="button" onClick={ this.onCancel }>
                    Cancel
                </button>
            </form>
        );
    }
}

ReactDOM.render( <UsersList />, document.getElementById( 'react-application' ) );
