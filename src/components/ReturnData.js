import React from 'react';

export default class ReturnData extends React.Component {

    state = {
        loading: true,
        name: null
    }

    async componentDidMount() {
        const url = "https://hosting2178697.online.pro/frantisekklima/JSON/index.php";
        const response = await fetch(url);
        const data = await response.json();
        this.setState({name: data[1].name, loading: false});
        // console.log(this.state.name);
        console.log(data);
    }

    render() {
        return <div>
            {this.state.loading || !this.state.name ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <div>{this.state.name}</div>
                </div>
            )}
        </div>
    }
}