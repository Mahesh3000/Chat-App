import React from 'react'
import { Link } from 'react-router-dom'

// import '../../App.css'

const ForgetPasswordPage = () => {
    return (
        <div className="containeryash">

            <div className="login-form text-center m-5-auto">
                <h2>Reset your password</h2>
                <h5>Enter your email address and we will send you a new password</h5>
                <form action="/login">
                    <p>
                        <label id="reset_pass_lbl">Email address</label><br />
                        <input className='form' type="email" name="email" required />
                    </p>
                    <p>
                        <button className='btn btn-primary' id="sub_btn" type="submit">Send password reset email</button>
                    </p>
                </form>
                <footer>
                    <p>First time? <Link to="/signup">Create an account</Link>.</p>
                    <p><Link to="/">Back to Homepage</Link>.</p>
                </footer>
            </div>
        </div>
    )
}

export default ForgetPasswordPage;