import React, { useEffect, useState } from 'react';
// import ResponsivePlayer from './ResponsivePlayer';
// import ChatBubble from './ChatBubble';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router';
import PostComment from './PostComment';
import Timer from './Timer';
import '../Youtube.css';
import '../Accordian.css';

// ICONS IMPORT
import { FaPlay } from 'react-icons/fa';
import { GiPauseButton } from 'react-icons/gi';
import { BsFillVolumeMuteFill } from 'react-icons/bs';
import { GoUnmute } from 'react-icons/go';
import { GrChat } from 'react-icons/gr'
import YoutubeEmbed from './YoutubeEmbed';
import Accordian from './Accordian';
import AccordianItem from './AccordianItem';

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
    const [chat, setChat] = useState(false);

    const unmute = () => {
        !ifMuted ? setIfMuted(true) : setIfMuted(false)
        console.log(ifMuted)
    }

    const play = () => {
        !playing ? setPlaying(true) : setPlaying(false)
    }

    const handleChat = () => {
        !chat ? setChat(true) : setChat(false);
        !chat ? console.log('chat showing now') : console.log('chat hidden now');
    }

    const handleWatchComplete = state => {

        setShowAt(state.playedSeconds);        
        console.log(showAt);

    }

    //  console.log(videoUrl[0].url);
    
    const MINUTE_MS = 1000;

    useEffect(() => {

        const interval = setInterval(() => {

            const fetchVideoUrl = "https://admin.frantisekklima.cz/data/videos/index.php?video=" + params.id;
            fetch(fetchVideoUrl)
             .then(result => result.json())
             .then(videoUrl => setVideoUrl(videoUrl))
             .then(loading => setLoading(false))

            const url = "https://admin.frantisekklima.cz/data/JSON/index.php?video=" + params.id + "&email=" + params.email;
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
                <div className='overlay-play-btn-wrapper'>
                    <button className='overlay-play-btn'><FaPlay /></button>
                </div>
                <ReactPlayer
                    controls={false}
                    playing={playing}
                    muted={ifMuted}

                    className='react-player'
                    url={videoUrl[0].url}
                    width='100%'
                    height='100%'

                    onProgress={handleWatchComplete}
                />
                <div className='controls'>
                    <button className='mute-btn' onClick={unmute}>{ifMuted ? <BsFillVolumeMuteFill /> : <GoUnmute />}</button>
                    <button className='play-btn' onClick={play}>{playing ? <GiPauseButton /> : <FaPlay />}</button>
                </div>
            </div>
        )
    }
    
    const year = new Date().getFullYear();

    return (
        <div className="chat-window">
            <button className='chat-icon-wrapper' onClick={handleChat}>
                <GrChat />
            </button>
            <div className='player-calibrator'>
                <div className='bg-black'>
                    {/* <ResponsivePlayer
                        url={url}
                    /> */}
                    <img src='https://www.frantisekklima.cz/wp-content/uploads/2021/06/SLEDUJ-A-OBJEV-MOJE-1024x302.jpg' alt='1'/>
                    <img src='https://www.frantisekklima.cz/wp-content/uploads/2021/06/Uz-pres-700-lidi-pouziva-tyto-3-uspesne-praktiky-a-jejich-vysledky-mnohdy-prekvapi-i-me-1024x172.jpg' alt='2'/>
                    <div className='player-wrapper'>
                        {/* VIDEO SECTION */}
                        {!loading ? renderVideo() : 'Připojování k živému vysílání!'}
                        {/* END OF VIDEO SECTION */}

                        {/* CHAT SECTION */}
                        <div className={!chat ? 'page-content page-container' : 'page-content page-container show'} id="page-content">
                            <div className="padding">
                                <div className="row container d-flex justify-content-center">
                                    <div className="col-md-4">
                                        <div className="box box-warning direct-chat direct-chat-warning">
                                            <div className="box-header with-border">
                                                <h3 className="box-title">Chat</h3>
                                                <button className='close-chat-btn' onClick={handleChat}>X</button>
                                            </div>
                                            <div className="box-body">
                                                <div className="direct-chat-messages">
                                                    
                                                {
                                                    data.filter(data => data.showAtTime <= showAt).map((commentData, index)=>{
                                                        return (
                                                            <div key={index} className={commentData.position}>
                                                                <div className="direct-chat-info clearfix"> <span className="direct-chat-name pull-right">{commentData.author === 'admin' ? 'Skrytý email' : commentData.name + ' (Ostatní nevidí Váš email)'}</span> <span className="direct-chat-timestamp pull-left">{commentData.hours}:{commentData.minutes}</span> </div>
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
                        {/* END OF CHAT SECTION */}
                    </div>
                    
                    <img src='https://www.frantisekklima.cz/wp-content/uploads/2021/06/Pridat-nadpis1-1024x640.jpg' alt='3'/>
                </div>
                <div className='padding-side'>
                    <img src='https://www.frantisekklima.cz/wp-content/uploads/2021/06/CO-JE-UVNITR-KURZU-FINANCE-POD-PALCEM1-1024x742.jpg' alt='4'/>
                    <img className='mb-2' src='https://www.frantisekklima.cz/wp-content/uploads/2021/06/4.-arrowstocoursesections-1024x49.jpg' alt='6'/>
                    <div className='padding-side'>
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
                        
                        <div className='register-btn-wrapper'>
                        <a className='register-btn' href='https://www.frantisekklima.cz/purchase/?plan=648&redirect=https%3A%2F%2Fwww.frantisekklima.cz%2Fpraxe%2F'>Zaregistruj se ještě dnes!</a>
                        </div>

                        <div className='timer'>
                            <Timer />
                        </div>

                        <img className='mb-2' src='https://www.frantisekklima.cz/wp-content/uploads/2021/06/CO-RIKAJI-NASI-STUDENTI.jpg' alt='img' />

                        <YoutubeEmbed embedId='X66ksdsansY' />

                        <YoutubeEmbed embedId='uREqLtAX2Zs' />

                        <YoutubeEmbed embedId='o470uXhzQ8o' />
                        
                        <img className='mb-2' src='https://www.frantisekklima.cz/wp-content/uploads/2021/06/Pridat-nadpis2.jpg' alt='img' />
                        
                        <Accordian title='PŘEDSTAVENÍ' />
                        <AccordianItem title='Jak použít tento kurz, abys byl úspěšný' url='https://www.frantisekklima.cz/lesson/jak-pouzit-tento-kurz-abyste-byli-uspesni-3/' progress={true} />
                        <AccordianItem title='Jak získat CERTIFIKÁT' url='https://www.frantisekklima.cz/lesson/jak-ziskat-2/' progress={false} />
                        <AccordianItem title='Příběh Františka Klímy' url='https://www.frantisekklima.cz/lesson/pribeh-frantiska-klimy-5/' progress={true} />
                        <AccordianItem title='BONUS: VIP Facebook skupina' url='https://www.frantisekklima.cz/lesson/bonus-vip-facebook-skupina-3/' progress={true} />
                        
                        <Accordian title='Finance pod palcem' />
                        <AccordianItem title='ÚVOD' url='https://www.frantisekklima.cz/lesson/uvod-5/' progress={true} />
                        <AccordianItem title='Co nám stát neříká...' url='https://www.frantisekklima.cz/lesson/cast-1-5/' progress={false} />
                        <AccordianItem title='Svět financí' url='https://www.frantisekklima.cz/lesson/svet-financi/' progress={false} />
                        <AccordianItem title='Rozložení investic (diverzifikace)' url='https://www.frantisekklima.cz/lesson/cast-2-5/' progress={false} />
                        <AccordianItem title='Nemovitosti' url='https://www.frantisekklima.cz/lesson/cast-3-5/' progress={false} />
                        <AccordianItem title='Peníze a cenné papíry' url='https://www.frantisekklima.cz/lesson/penize-a-cenne-papiry-2/' progress={false} />
                        <AccordianItem title='Zlato' url='https://www.frantisekklima.cz/lesson/komodity-2/' progress={false} />
                        <AccordianItem title='Pojištění' url='https://www.frantisekklima.cz/lesson/zajisteni-osob-2/' progress={false} />
                        <AccordianItem title='Zajištění majetku' url='https://www.frantisekklima.cz/lesson/zajisteni-majetku-2/' progress={false} />
                        <AccordianItem title='Úvěry a hypotéky' url='https://www.frantisekklima.cz/lesson/hypoteky/' progress={false} />
                        <AccordianItem title='Plyn a elektřina' url='https://www.frantisekklima.cz/lesson/plyny-a-elektrina/' progress={false} />
                        <AccordianItem title='KVÍZ' url='https://www.frantisekklima.cz/lesson/quiz-6/' progress={false} />
                        
                        <Accordian title='BONUSY' />
                        <AccordianItem title='BONUS: Příklad z praxe' url='https://www.frantisekklima.cz/lesson/jdi-do-toho/' progress={false} />
                        <AccordianItem title='Ty vyděláváš, my pracujeme - 46,000 Kč za první týden?' url='https://www.frantisekklima.cz/lesson/ty-vydelavas-my-pracujeme-budouci-milionar/' progress={false} />

                        <Accordian title='Vědomosti ke svobodě' />
                        <AccordianItem title='Jaké je tvoje PROČ?' url='https://www.frantisekklima.cz/lesson/jake-je-vase-proc-5/' progress={true} />
                        <AccordianItem title='Nástěnka plná snů a psaní do deníku' url='https://www.frantisekklima.cz/lesson/nastenka-plna-snu-a-psani-do-deniku-5/' progress={false} />
                        <AccordianItem title='Kniha, kterou MUSÍŠ přečíst' url='https://www.frantisekklima.cz/lesson/kniha-kterou-musite-precist-5/' progress={false} />
                        <AccordianItem title='Jak správně plánovat?' url='https://www.frantisekklima.cz/lesson/time-management-2-2/' progress={false} />
                        <AccordianItem title='Buď jiný než ostatní' url='https://www.frantisekklima.cz/lesson/princip-byznysu-4-2/' progress={false} />

                        <img className='mb-2 mt-2' src='https://www.frantisekklima.cz/wp-content/uploads/2021/06/PRIPRAVEN-PRIDAT-SE.jpg' alt='img'/>
                        
                        <div className='register-btn-wrapper'>
                            <a className='register-btn' href='https://www.frantisekklima.cz/purchase/?plan=648&redirect=https%3A%2F%2Fwww.frantisekklima.cz%2Fpraxe%2F'>Zaregistruj se ještě dnes!</a>
                        </div>

                        <img className='mb-2' src='https://www.frantisekklima.cz/wp-content/uploads/2021/06/1.490.jpg' alt='img' />

                        <div className='timer'>
                            <Timer />
                        </div>
                    </div>
                </div>
                <div className='footer'>
                    <span>&copy; František Klíma - {year}</span>
                    <div className='footer-link'>
                        <a href='https://www.frantisekklima.cz/vseobecne-obchodni-podminky/'>Všeobecné obchodní podmínky</a>
                        <a href='https://www.frantisekklima.cz/ochrana-osobnich-udaju/'>GDPR</a>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default ChatWindow;