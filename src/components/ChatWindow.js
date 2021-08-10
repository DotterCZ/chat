import React, { useEffect, useState } from 'react';
// import ResponsivePlayer from './ResponsivePlayer';
// import ChatBubble from './ChatBubble';
import ReactPlayer from 'react-player';

const ChatWindow = () => {

    // constructor() {
    //     super();
    //     this.state = {data:[]};
    // }

    const [data, setData] = useState([]);

    const [showAt, setShowAt] = useState(0);

    const handleWatchComplete = state => {

        setShowAt(state.playedSeconds);        
        console.log(showAt);
    }
    
    const MINUTE_MS = 3000;

    useEffect(() => {
        const interval = setInterval(() => {

            const url = "https://webinar.dotter.cz/data/JSON/index.php";
            fetch(url)
             .then(result => result.json())
             .then(data => setData(data))

            console.log('Logs every 6 seconds');
          }, MINUTE_MS);

          return () => clearInterval(interval);
       
    }, [])

    

    return (
        <div className="chat-window">
            <div className='player-calibrator'>
                {/* <ResponsivePlayer
                    url={url}
                /> */}
                <div className='player-wrapper'>
                    <ReactPlayer
                        controls
                        playing
                        // muted

                        className='react-player'
                        url='https://webinar.dotter.cz/data/videos/video.mp4'
                        width='95%'
                        height='95%'

                        onProgress={handleWatchComplete}
                    />
                </div>
            </div>
            <div className="page-content page-container" id="page-content">
                <div className="padding">
                    <div className="row container d-flex justify-content-center">
                        <div className="col-md-4">
                            <div className="box box-warning direct-chat direct-chat-warning">
                                <div className="box-header with-border">
                                    <h3 className="box-title">Chat</h3>
                                </div>
                                <div className="box-body">
                                    <div className="direct-chat-messages">
                                        
                                    {
                                        data.filter(data => data.showAtTime <= showAt).map((commentData, index)=>{
                                            return (
                                                <div key={index} className={commentData.position}>
                                                    <div className="direct-chat-info clearfix"> <span className="direct-chat-name pull-right">{commentData.name}</span> <span className="direct-chat-timestamp pull-left">{commentData.hours}:{commentData.minutes}</span> </div> <img className="direct-chat-img" src="https://img.icons8.com/office/36/000000/person-female.png" alt="message user image" />
                                                    <div className="direct-chat-text"> {commentData.comment} </div>
                                                </div>
                                            )
                                        })
                                    }

                                    </div>
                                </div>
                                <div className="box-footer">
                                    <form action="#" method="post">
                                        <div className="input-group"> <input type="text" name="message" placeholder="Type Message ..." className="form-control" /> <span className="input-group-btn"> <button type="button" className="btn btn-warning btn-flat">Odeslat</button> </span> </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>

    );
}

export default ChatWindow;