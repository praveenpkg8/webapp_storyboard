import React from 'react';
const URL = 'http://localhost:8080';
const InviteFriends = () => {
    return (
        <>
        <a href={URL +'/api/contact/oauth'} className="btn btn-outline-success">Invite friends</a>
        </>
    )
}

export default InviteFriends;