import React from 'react';

export default class ChatBubble extends React.Component {

    // state = {
    //     loading: true,
    //     id: null,
    //     name: null
    // }

    // state = {
    //     loading: true
    // }

    constructor() {
        super();
        this.state = {data:[]};
    }
    
    async componentDidMount() {
        const url = "https://hosting2178697.online.pro/frantisekklima/JSON/index.php";
            fetch(url)
                .then(result => result.json())
                .then(data => this.setState({data}));

        // const response = await fetch(url);
        // const dataResponse = await response.json();

        // this.setState({data: dataResponse, loading: false});
        
        // console.log(this.state.data);
    }

    
    render() {
        return (
            <>
                {
                    this.state.data.map((commentData, index)=>{
                        return (
                            <div key={index} className='direct-chat-msg'>
                                <div className="direct-chat-info clearfix"> <span className="direct-chat-name pull-right">{commentData.name}</span></div> <img className="direct-chat-img" src="https://img.icons8.com/office/36/000000/person-female.png" alt="message user image" />
                                <div className="direct-chat-text"> {commentData.comment} </div>
                            </div>
                        )
                    })
                }
            </>
        )
    }
}