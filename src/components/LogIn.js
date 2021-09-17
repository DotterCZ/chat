import React, {useState} from 'react';
import { Link } from 'react-router-dom';

const LogIn = (props) => {

    const [email, setEmail] = useState('');

    const link = () => {
        if(email === '') {

            return

        } else {
            return email
        }
    }

    return (
        <div className="login-wrapper">
            <div className='login-inner'>
                <input type="email" name="login" value={email} onChange={e => setEmail(e.target.value)} placeholder="email" className="login-input" />
                <Link to={link} className="login-btn">Odeslat</Link>
            </div>
        </div>
    )
}

export default LogIn;