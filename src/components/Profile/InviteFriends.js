import React from 'react';

const ProductionURL = 'https://full-services.appspot.com';
const InviteFriends = () => (
    <>
        <a href={`${ProductionURL}/api/contact/oauth`} className="btn btn-outline-success">Invite friends</a>
    </>
);

export default InviteFriends;
