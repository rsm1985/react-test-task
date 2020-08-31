import React from "react";
import {Link} from "react-router-dom";
import './styles.scss'

const Admin = () => {
  return (
    <div className="admin">
      <div className="admin__buttons">
        <button className="admin__button">MANAGE SOURCES</button>
        <Link to="/blank"><button className="admin__button">MANAGE TEAM</button></Link>
      </div>
    </div>
  )
}
export default Admin
