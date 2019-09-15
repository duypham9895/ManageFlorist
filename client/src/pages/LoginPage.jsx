import React, { Fragment } from "react";

class LoginPage extends React.Component {
    componentWillMount() {
        if (this.props.principal) {
            this.props.history.push("/");

            return;
        }
    }
    render() {
        return (
            <Fragment>
                <div className="bigBox">
                    <div className="leftBox"></div>
                    <div className="rightBox">
                        <form className="login-form form">
                            <h2 className="py-2">
                                Welcome to Sunshine Florist
                            </h2>
                            <div className="form-group">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                />
                            </div>
                            <div className="form-group py-1">
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                />
                            </div>

                            <input
                                type="submit"
                                className=" my-1 btn btn-login bold"
                                value="Login"
                            />
                            <p>
                                Don't have an account <a href="#top">Sign Up</a>
                            </p>
                        </form>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default LoginPage;
