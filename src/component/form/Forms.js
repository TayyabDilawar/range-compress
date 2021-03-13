import React, { Component } from 'react';
import $ from 'jquery';

import './forms.css';

class Forms extends Component {
    
    componentDidMount() {
        $('.message a').click(function(){
            $('form').animate({height: "toggle", opacity: "toggle"}, "slow")
        })
    }

    render() {
        return (
            <div className="login-body">
                <div className="login-page">
                    <div className="form">
                        <form className="register-form">
                            <input type="text" placeholder="Name" />
                            <input type="password" placeholder="Password" />
                            <input type="text" placeholder="Email Address" />
                            <button>Create Account</button>
                            <p className="message">Already registered? <a>Sign in</a></p>
                        </form>

                        <form className="login-form">
                            <input type="text" placeholder="Username" />
                            <input type="password" placeholder="Password" />
                            <button>Login</button>
                            <p className="message">Not registered? <a>Create an Account</a></p>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Forms;