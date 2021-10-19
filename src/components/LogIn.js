import React, {useState} from 'react';
import { Link, useParams } from 'react-router-dom';

const LogIn = (props) => {

    const params = useParams();
    const [email, setEmail] = useState('');
    const [nickname, setNickname] = useState('');

    const link = () => {
        if(nickname === '') {

            return

        } else if(email === '') {
            
            return nickname + '/UNKNOWN'
            
        } else if(email !== '') {
            
            return params.id + '/' + nickname + '/' + email
            
        }
    }

    return (








        
        <div className="login-wrapper">
            <div className='login-inner'>
                <h1>Online trénink zdarma</h1>
                
                <div className='login-inner-flex'>
                    <div className='input-div'>
                        <input required type="text" name="nickname" value={nickname} onChange={e => setNickname(e.target.value)} placeholder="Přezdívka" className="login-input" />    
                        <input type="email" name="login" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="login-input" />
                        <div className='input-div link'>
                            <Link to={link} className="login-btn"><img src='https://webinar.frantisekklima.cz/images/login-icon.png' alt='login-icon'/><span>Přihlásit se</span></Link>
                        </div>
                    </div>
                    <div className='p-div'>
                        <p>*Na tento email tě budeme kontaktovat zpětně, abychom odpovědeli na tvé dotazy. Email je dobrovolný.</p>    
                        <p>*Přezdívka bude viditelná ostatním u každého komentáře, který napíšeš.</p>
                    </div>
                </div>


                
            </div>
        </div>









    )
}

export default LogIn;