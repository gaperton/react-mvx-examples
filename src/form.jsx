@define class Application extends React.Component {
    static state = {
        name : '',
        email : '',
        isActive : true
    };

    onSubmit =  e => {

    }

    onCancel = () => this.state.set( this.state.defaults() );

    render(){
        const linked = this.state.linkAll();

        return (
            <form onSubmit={ this.onSubmit }>
                <label>
                    Name: <Input type="text" valueLink={ linked.name }/>
                </label>

                <label>
                    Email: <Input type="text" valueLink={ linked.email }/>
                </label>

                <label>
                    Is active: <Input type="checkbox" checkedLink={ linked.isActive }/>
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
