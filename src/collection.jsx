import './styles.css'
import ReactDOM from 'react-dom'
import React, { Link } from 'react-mvx'
import { Record, define } from 'type-r'

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
    <div className="validated-control">
        <input {...props} { ...link.props} />
        { link.error && <div className="error">{ link.error }</div> }
    </div>
);

@define class User extends Record {
    static attributes = {
        name : String.isRequired,
        email : Email.isRequired,
        isActive : true
    }
}

@define class UsersList extends React.Component {
    static state = {
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

    render(){
        const { state } = this,
                editingLink = state.linkAt( 'editing' );

        return (
            <div>
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

                { state.editing &&
                    <EditUser userLink={ editingLink }
                              onSave={ user => state.users.add( user ) }/>
                }
            </div>
        );
    }
}

const UsersGrid = ({ children, ...props }) =>(
    <div className="users-grid">
        <div className="users-row">
            <div>Name</div>
            <div>Email</div>
            <div>Is Active</div>
            <div/>
        </div>
        { children }
    </div>
);

const UserRow = ( { user, editingLink } ) =>(
    <div className="users-row">
        <div>{ user.name }</div>
        <div>{ user.email }</div>
        <div onClick={ () => user.isActive = !user.isActive }>
            { user.isActive ? 'Yes' : 'No' }</div>
        <div>
            <button onClick={ () => editingLink.set( user ) }>Edit</button>
            <button onClick={ () => user.collection.remove( user ) }>X</button>
        </div>
    </div>
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
