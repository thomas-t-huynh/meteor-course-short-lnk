import React from 'react';
import { Accounts } from 'meteor/accounts-base';

const PrivateHeader = (props) => {
    const onLogout = () => {
        Accounts.logout();
    }

    return (
        <div className="header__bg">
            <div className="header">
                <h1 className="header__h1">{props.title}</h1>
                <button className="button button--logout" onClick={() => {
                    Accounts.logout()
                }}>Logout</button>
            </div>
        </div>
    );
}
 

PrivateHeader.propTypes = {
    title: React.PropTypes.string.isRequired
}

export default PrivateHeader;