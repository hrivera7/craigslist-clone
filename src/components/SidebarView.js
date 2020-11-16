import React from "react";
import { Link } from "react-router-dom";
import { Header } from 'semantic-ui-react'

const SidebarView = () => {
  
  const logOut = () => {
    localStorage.removeItem("token")
    window.location.reload(false)
  }

  return (
  <div className="sidebar">
    <>
      {" "}
      {localStorage.getItem("token") ? (
        <div className="flexbox-column sidebar-links">
          <Header as='h4' image='https://i.imgur.com/42dml1S.png' content='List-It-Clone' />
          <Link to="/create">Create a post</Link>
          <button
            className= "ui button log-out"
            onClick={logOut}
          >
            Log out
          </button> 
        </div>
      ) : (
        <>
        <Header as='h4' image='https://i.imgur.com/42dml1S.png' content='List-It-Clone' />
        <div className="account-link"><Link to="/account">My account</Link></div>
        
        </>
      )}
    </>
  </div>
)};

export default SidebarView;
