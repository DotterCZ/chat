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
                <input required type="text" name="nickname" value={nickname} onChange={e => setNickname(e.target.value)} placeholder="Přezdívka" className="login-input" />
                <input type="email" name="login" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="login-input" />
                <Link to={link} className="login-btn">Odeslat</Link>
            </div>
        </div>
    )
}

export default LogIn;