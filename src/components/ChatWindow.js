import React, { useEffect, useState } from 'react';
// import ResponsivePlayer from './ResponsivePlayer';
// import ChatBubble from './ChatBubble';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router';
import PostComment from './PostComment';

// ICONS IMPORT
import { FaPlay } from 'react-icons/fa';
import { GiPauseButton } from 'react-icons/gi';
import { BsFillVolumeMuteFill } from 'react-icons/bs';
import { GoUnmute } from 'react-icons/go';

const ChatWindow = () => {

    const params = useParams();

    // constructor() {
    //     super();
    //     this.state = {data:[]};
    // }

    const [data, setData] = useState([]);
    const [videoUrl, setVideoUrl] = useState([]);

    const [showAt, setShowAt] = useState(0);
    const [loading, setLoading] = useState(true);

    const [ifMuted, setIfMuted] = useState(true);
    const [playing, setPlaying] = useState(true);

    const unmute = () => {
        !ifMuted ? setIfMuted(true) : setIfMuted(false)
        console.log(ifMuted)
    }

    const play = () => {
        !playing ? setPlaying(true) : setPlaying(false)
    }


    const handleWatchComplete = state => {

        setShowAt(state.playedSeconds);        
        console.log(showAt);

    }

    //  console.log(videoUrl[0].url);
    
    const MINUTE_MS = 1000;

    useEffect(() => {

        const interval = setInterval(() => {

            const fetchVideoUrl = "http://admin.frantisekklima.cz/data/videos/index.php?video=" + params.id;
            fetch(fetchVideoUrl)
             .then(result => result.json())
             .then(videoUrl => setVideoUrl(videoUrl))
             .then(loading => setLoading(false))

            const url = "http://admin.frantisekklima.cz/data/JSON/index.php?video=" + params.id + "&email=" + params.email;
            fetch(url)
             .then(result => result.json())
             .then(data => setData(data))

            // console.log('Logs every 3 seconds');
          }, MINUTE_MS);

          return () => clearInterval(interval);
       
    }, [data, videoUrl, params])    

    function renderVideo() {
        return (
            <div className='video-surrounding'>
                <ReactPlayer
                    controls={false}
                    playing={playing}
                    muted={ifMuted}

                    className='react-player'
                    url={videoUrl[0].url}
                    width='95%'
                    height='95%'

                    onProgress={handleWatchComplete}
                />
                <div className='controls'>
                    <button className='mute-btn' onClick={unmute}>{ifMuted ? <BsFillVolumeMuteFill /> : <GoUnmute />}</button>
                    <button className='play-btn' onClick={play}>{playing ? <GiPauseButton /> : <FaPlay />}</button>
                </div>
            </div>
        )
    }
    

    return (
        <div className="chat-window">
            <div className='player-calibrator'>
                <div className='bg-black'>
                    {/* <ResponsivePlayer
                        url={url}
                    /> */}
                    <img src='https://www.frantisekklima.cz/wp-content/uploads/2021/06/SLEDUJ-A-OBJEV-MOJE-1024x302.jpg' alt='1'/>
                    <img src='https://www.frantisekklima.cz/wp-content/uploads/2021/06/Uz-pres-700-lidi-pouziva-tyto-3-uspesne-praktiky-a-jejich-vysledky-mnohdy-prekvapi-i-me-1024x172.jpg' alt='2'/>
                    <div className='player-wrapper'>
                        {!loading ? renderVideo() : 'Připojování k živému vysílání!'}
                    </div>
                    <img src='https://www.frantisekklima.cz/wp-content/uploads/2021/06/Pridat-nadpis1-1024x640.jpg' alt='3'/>
                </div>
                <img src='https://www.frantisekklima.cz/wp-content/uploads/2021/06/CO-JE-UVNITR-KURZU-FINANCE-POD-PALCEM1-1024x742.jpg' alt='4'/>
                <img className='mb-2' src='https://www.frantisekklima.cz/wp-content/uploads/2021/06/4.-arrowstocoursesections-1024x49.jpg' alt='6'/>
                <img className='mb-2' src='https://www.frantisekklima.cz/wp-content/uploads/2021/06/1-1-1024x383.jpg' alt='7'/>
                <img className='mb-2' src='https://www.frantisekklima.cz/wp-content/uploads/2021/06/2-1-1024x383.jpg' alt='8'/>
                <img className='mb-2' src='https://www.frantisekklima.cz/wp-content/uploads/2021/06/3-1024x383.jpg' alt='9'/>
                <img className='mb-2' src='https://www.frantisekklima.cz/wp-content/uploads/2021/06/4-1024x383.jpg' alt='10'/>
                <img className='mb-2' src='https://www.frantisekklima.cz/wp-content/uploads/2021/06/5-1024x383.jpg' alt='11'/>
                <img className='mb-2' src='https://www.frantisekklima.cz/wp-content/uploads/2021/06/6-1024x383.jpg' alt='12'/>
                <img className='mb-2' src='https://www.frantisekklima.cz/wp-content/uploads/2021/06/7-1024x383.jpg' alt='13'/>
                <img className='mb-2' src='https://www.frantisekklima.cz/wp-content/uploads/2021/06/8-1024x383.jpg' alt='14'/>
                <img className='mb-2' src='https://www.frantisekklima.cz/wp-content/uploads/2021/06/9-1024x383.jpg' alt='15'/>
                <img className='mb-2' src='https://www.frantisekklima.cz/wp-content/uploads/2021/06/1.arrow_-1024x85.jpg' alt='16'/>
                <img className='mb-2' src='https://www.frantisekklima.cz/wp-content/uploads/2021/06/VEDOMOSTMI1-1024x215.jpg' alt='17'/>
                <img className='mb-2' src='https://www.frantisekklima.cz/wp-content/uploads/2021/06/TO-JE1-scaled-e1624890854192-947x1024.jpg' alt='18'/>
                <img className='mb-2' src='https://www.frantisekklima.cz/wp-content/uploads/2021/06/Navrh-bez-nazvu12aa2.png' alt='19'/>
                <img className='mb-2' src='https://www.frantisekklima.cz/wp-content/uploads/2021/06/ZISKEJ-TOT-VSECHNO2-1024x535.jpg' alt='20'/>
                <a className='register-btn' href='https://www.frantisekklima.cz/purchase/?plan=648&redirect=https%3A%2F%2Fwww.frantisekklima.cz%2Fpraxe%2F'>Zaregistruj se ještě dnes!</a>
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
                                                    <div className="direct-chat-info clearfix"> <span className="direct-chat-name pull-right">{commentData.author === 'admin' ? 'Skrytý email' : commentData.name + ' (Ostatní nevidí Váš email)'}</span> <span className="direct-chat-timestamp pull-left">{commentData.hours}:{commentData.minutes}</span> </div> <img className="direct-chat-img" src="https://img.icons8.com/office/36/000000/person-female.png" alt="message user" />
                                                    <div className="direct-chat-text"> {commentData.comment} </div>
                                                </div>
                                            )
                                        })
                                    }

                                    </div>
                                </div>
                                {/* <PostComment videoId={params.id} /> */}
                                <PostComment videoId={params.id} name={params.email} showAt={showAt} position='direct-chat-msg right' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>

    );
}

export default ChatWindow;