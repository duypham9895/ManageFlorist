import React, { Fragment } from "react";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../actions/auth";

class LoginPage extends React.Component {
    constructor() {
        super();
        this.state = {
            msg: {
                username: "",
                password: ""
            }
        };
    }
    componentDidMount() {
        this.usernameInput = document.getElementById("username");
        this.passwordInput = document.getElementById("password");
    }

    onSubmit() {
        const password = this.passwordInput.value;
        const username = this.usernameInput.value;
        this.props.dispatch(login(username, password));
    }

    inputKeyUp(event) {
        if (event.keyCode === 13) {
            this.onSubmit();
        }
    }

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/dashboard" />;
        }
        const errors = this.props.errors;
        return (
            <Fragment>
                <div className="bigBox">
                    <div className="leftBox"></div>
                    <div className="rightBox">
                        <div className="login-form form">
                            <h2 className="py-2">
                                Welcome to Sunshine Florist
                            </h2>
                            <div className="form-group">
                                <p
                                    className={
                                        errors.username === ""
                                            ? "hidden"
                                            : "text-error"
                                    }
                                >
                                    {errors.username}
                                </p>
                                <input
                                    id="username"
                                    type="username"
                                    name="username"
                                    placeholder="Username"
                                    onKeyUp={this.inputKeyUp.bind(this)}
                                />
                            </div>
                            <div className="form-group py-1">
                                <p
                                    className={
                                        errors.password === ""
                                            ? "hidden"
                                            : "text-error"
                                    }
                                >
                                    {errors.password}
                                </p>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    onKeyUp={this.inputKeyUp.bind(this)}
                                />
                            </div>

                            <input
                                type="submit"
                                className=" my-1 btn btn-login bold"
                                value="Login"
                                onClick={this.onSubmit.bind(this)}
                            />
                            <p>
                                Don't have an account{" "}
                                <Link to="/register">Sign Up</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = store => {
    return {
        isAuthenticated: store.auth.isAuthenticated,
        errors: store.auth.msg.login
    };
};

export default connect(mapStateToProps)(LoginPage);
