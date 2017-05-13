import React, { define } from 'react-mvx'
import ReactDOM from 'react-dom'

@define class Application extends React.Component {
    static state = {
        name : '',
        email : '',
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
                    Name: <input type="text" { ...name.props }/>
                </label>

                <label>
                    Email: <input type="text" { ...email.props }/>
                </label>

                <label>
                    Is active: <input type="checkbox" { ...isActive.props }/>
                </label>

                <button type="submit">Save</button>
                <button type="button" onClick={ this.onCancel }>
                    Cancel
                </button>
            </form>
        );
    }
}

ReactDOM.render( <Application/>, document.getElementById( 'react-application' ) );