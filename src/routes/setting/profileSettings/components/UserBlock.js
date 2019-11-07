import React from "react";
import BgCard from "Components/BgCard";
import Avatar from "Components/Avatar";

const UserBlock = ({ user }) => {
  const { name, email } = user;
  return (
    <BgCard fullBlock>
      <div className="d-flex border-bottom p-40">
        <div className="media">
          <div className="media-left mr-25">
            <Avatar name={name} size={60} />
          </div>
          <div className="media-body my-auto">
            <h3 className="mb-5">{user ? name : ""}</h3>
            <span className="text-muted mb-0 d-block">{user ? email : ""}</span>
          </div>
        </div>
      </div>
      <div className="d-flex py-20 px-40">
        {/* <div>
          <span className="mb-0 text-muted fs-12">Company</span>
          <p>companyName</p>
        </div> */}
        {/* <div>
          <span className="mb-0 text-muted fs-12">Contact</span>
          <p>1234 5678</p>
        </div> */}
      </div>
    </BgCard>
  );
};

export default UserBlock;
