import React, { Fragment } from "react";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";

import { register } from "../actions/auth";

class RegisterPage extends React.Component {
    componentDidMount() {
        this.nameInput = document.getElementById("name");
        this.emailInput = document.getElementById("email");
        this.phoneInput = document.getElementById("phone");
        this.passwordInput = document.getElementById("password");
        this.confirmPasswordInput = document.getElementById("confirmPassword");
        this.codeInput = document.getElementById("code");
    }

    onSubmit() {
        const name = this.nameInput.value;
        const email = this.emailInput.value;
        const phone = this.phoneInput.value;
        const password = this.passwordInput.value;
        const confirmPassword = this.confirmPasswordInput.value;
        const code = this.codeInput.value;

        const history = this.props.history;

        this.props.dispatch(
            register(
                name,
                email,
                phone,
                password,
                confirmPassword,
                code,
                history
            )
        );
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
                        <div className="register-form form">
                            <h2 className="py-2">
                                Welcome to Sunshine Florist
                            </h2>
                            <div className="form-group">
                                <p
                                    className={
                                        errors.name === ""
                                            ? "hidden"
                                            : "text-error"
                                    }
                                >
                                    {errors.name}
                                </p>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    placeholder="Full Name"
                                    onKeyUp={this.inputKeyUp.bind(this)}
                                />
                            </div>
                            <div className="form-group py-1">
                                <p
                                    className={
                                        errors.email === ""
                                            ? "hidden"
                                            : "text-error"
                                    }
                                >
                                    {errors.email}
                                </p>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    onKeyUp={this.inputKeyUp.bind(this)}
                                />
                            </div>

                            <div className="form-group">
                                <p
                                    className={
                                        errors.phone === ""
                                            ? "hidden"
                                            : "text-error"
                                    }
                                >
                                    {errors.phone}
                                </p>
                                <input
                                    id="phone"
                                    type="tel"
                                    name="phone"
                                    placeholder="Phone"
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

                            <div className="form-group">
                                <p
                                    className={
                                        errors.confirmPassword === ""
                                            ? "hidden"
                                            : "text-error"
                                    }
                                >
                                    {errors.confirmPassword}
                                </p>
                                <input
                                    id="confirmPassword"
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    onKeyUp={this.inputKeyUp.bind(this)}
                                />
                            </div>

                            <div className="form-group py-1">
                                <input
                                    id="code"
                                    type="text"
                                    name="code"
                                    placeholder="Code"
                                    onKeyUp={this.inputKeyUp.bind(this)}
                                />
                            </div>

                            <button
                                type="submit"
                                className=" my-1 btn-handle btn-login bold"
                                onClick={this.onSubmit.bind(this)}
                            >
                                Register
                            </button>
                            <p>
                                Already have an account?{" "}
                                <Link to="/login">Sign In</Link>
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
        errors: store.auth.msg.register
    };
};

export default connect(mapStateToProps)(RegisterPage);
