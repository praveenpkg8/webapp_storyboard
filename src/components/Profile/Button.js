import React from 'react';
import Logout from '../Authentication/Logout';
import InviteFriends from './InviteFriends';

const Button = () => (
    <>
        <div className="btn-toolbar justify-content-between" role="toolbar" aria-label="Toolbar with button groups">
            <div className="btn-group" role="group" aria-label="First group">
                <Logout />
            </div>
            <div className="input-group">
                <InviteFriends />
            </div>
        </div>


    </>
);

export default Button;
