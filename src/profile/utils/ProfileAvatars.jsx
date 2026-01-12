import React from "react";

const ProfileAvatar = ({ participant }) => {
    return (
        <img
            className="participant-avatar"
            src={
                participant?.profile_picture
                    ? `https://fc-server.zapto.org${participant.profile_picture}`
                    : "/static/default-avatar.png"
            }
            alt="Profile"
        />
    );
};

export default ProfileAvatar;
