import React, { define } from 'react-type-r'
import ReactDOM from 'react-dom'

@define class Application extends React.Component {
    static state = {
        count : 0
    };

    render(){
        const { state } = this;
        return (
            <div>
                { state.count }
                <button onClick={ () => state.count++ }>
                    Increment
                </button>                
            </div>
        );
    }
}

ReactDOM.render( <Application/>, document.getElementById( 'react-application' ) );