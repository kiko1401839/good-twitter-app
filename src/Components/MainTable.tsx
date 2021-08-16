import React from 'react';
import InputForm from './InputForm';

type typeImageTableState = {
    message: string;
}

class MainTable extends React.Component<{}, typeImageTableState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            message: '',
        };
    }

    handleSubmit = (screen_name: string) => {
        this.setState({message: 'done'});
        console.log(screen_name);
    }

    render() {
        return (
            <div>
                <InputForm onSubmit={(screen_name: string) => this.handleSubmit(screen_name)}/>
                <div className="box h-64 text-center m-5 p-4 ...">
                    {this.state.message}
                </div>
            </div>
        );
    }
}

export default MainTable;