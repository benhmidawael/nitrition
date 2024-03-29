import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import SideBarItem from "./PatSidebar-item";

import "./PatSideStyles.css";
import logo from "../../../../images/LogoGreen.png";
import LogoutIcon from "../../assets/icons/logout.svg";

function PatSidebar({ menu }) {
  const location = useLocation();

  const [active, setActive] = useState(1);

  useEffect(() => {
    menu.forEach((element) => {
      if (location.pathname === element.path) {
        setActive(element.id);
      }
    });
  }, [location.pathname ,menu]);

  const __navigate = (id) => {
    setActive(id);
  };

  return (
    <nav className="PatSidebar">
      <div className="PatSidebar-container">
        <div className="PatSidebar-logo-container">
          <img src={logo} alt="logo" />
          {/* <h2>PatientDash</h2> */}
        </div>

        <div className="PatSidebar-container">
          <div className="PatSidebar-items">
            {menu.map((item, index) => (
              <div key={index} onClick={() => __navigate(item.id)}>
                <SideBarItem active={item.id === active} item={item} />
              </div>
            ))}
          </div>

          <div
            className="PatSidebar-footer"
            onClick={() => {
              window.localStorage.removeItem("token");
              setTimeout(() => {
                window.location.replace("/signin");
              }, 600);
            }}
          >
            <h1 className="PatSidebar-item-label">Déconnexion</h1>
            <img
              src={LogoutIcon}
              alt="icon-logout"
              className="PatSidebar-item-icon"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default PatSidebar;
