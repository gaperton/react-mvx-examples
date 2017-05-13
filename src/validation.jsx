import React, { define } from 'react-mvx'
import ReactDOM from 'react-dom'
import './styles.css'

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
@define class Application extends React.Component {
    static state = {
        name : String.isRequired,
        email : Email.isRequired,
        isActive : true
    };

    componentWillMount(){
        // Load from the local storage.
        const json = JSON.parse( localStorage.getItem( 'users-form' ) || '{}' );
        this.state.set( json, { parse : true } );
    }

    // Save to the local storage
    onSubmit =  e => localStorage.setItem( 'users-form', JSON.stringify( this.state ) );

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