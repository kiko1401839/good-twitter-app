import axios from 'axios';
import React from 'react';
import InputForm from './InputForm';


type typeImages = {
    url: string[];
    height: string[];
    source: string[];
    max_id: string;
};

type typeImageTableState = {
    images: typeImages;
    message: string;
    screen_name: string;
};


class MainTable extends React.Component<{}, typeImageTableState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            images: {
                url: [],
                height: [],
                source: [],
                max_id: ''
            },
            message: '',
            screen_name: ''
        };
    }

    handleSubmit = (screen_name: string) => {
        twitterAPI(screen_name, this.state.images.max_id)
            .then(res => {
                this.setFavoriteImages(res);
            })
            .catch(() => {
                this.setState({
                    message: 'Failed to get data: Incorrect screen name or empty data.'
                })
            })
    }

    setFavoriteImages = (results: any) => {
        this.setState({images: results, message: 'done'});
        console.log(this.state.images);
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

const twitterAPI = (screen_name: string, max_id: string) => {
    const endpoint = `${process.env.REACT_APP_API_ENDPOINT_URL}?name=${screen_name}&max_id=${max_id}`;
    return new Promise((resolve, reject) => {
        axios.get(endpoint)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err);
            });
    });
}