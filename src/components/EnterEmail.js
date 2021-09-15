import React from 'react'
import '../EnterEmail.css'

class EnterEmail extends React.Component {

    state = {
        email: ''
    }

    render() {
        
        const login = () => {
        
            // this.state.email = document.getElementById('email');

        }

        return (
            <div className='page email-wrapper'>
                <input type='email' placeholder='Email...' id='email' required />
                <button className='btn-warning' onClick={login} type='submit'>Přihlásit se</button>
            </div>
        )
    }
  }

export default EnterEmail
