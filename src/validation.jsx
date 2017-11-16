import React, { define } from 'react-mvx'
import ReactDOM from 'react-dom'
import { Record } from 'type-r'
import './styles.css'
import { localStorageIO } from 'type-r/endpoints/localStorage'

/**
 * React-MVx itself is rather thin layer on top of the Type-R,
 * which allows it to do an incredible things.
 * 
 * Let's do some Type-R magic first.
 */

// Define email validator. Something simple, just for illustration purposes.
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
        <input { ...link.props} />
        { link.error && <div className="error">{ link.error }</div> }
    </div>
);

/**
 * Here we go. Boom!
 */
@define class AppState extends Record {
    // Persist this class to the local storage.
    static endpoint = localStorageIO( '/react-mvx/example' );

    // Define state structure
    static attributes = {
        id : 'validation',
        name : String.isRequired,
        email : Email.isRequired,
        isActive : true
    }
}

@define class Application extends React.Component {
    static State = AppState;

    componentWillMount(){
        // Load from the local storage.
        this.state.fetch();
    }

    // Save to the local storage
    onSubmit =  e => {
        e.preventDefault();
        this.state.save();
    }

    onCancel = () => this.state.set( this.state.defaults() );

    render(){
        // Link the state...
        const { name, email, isActive } = this.linkAll();

        return (
            <form onSubmit={ this.onSubmit }>
                <label>
                    Name: <Input type="text" link={ name }/>
                </label>

                <label>
                    Email: <Input type="text" link={ email }/>
                </label>

                <label>
                    Is active: <input type="checkbox" { ...isActive.props }/>
                </label>

                <button type="submit" disabled={ !this.state.isValid() }>Save</button>
                <button type="button" onClick={ this.onCancel }>
                    Clear
                </button>
            </form>
        );
    }
}

ReactDOM.render( <Application/>, document.getElementById( 'react-application' ) );