import React, { Fragment } from "react";
import spinner from "./spinner.svg";

export default () => (
    <Fragment>
        <img src={spinner} className="spinner" alt="Loading..." />
    </Fragment>
);
