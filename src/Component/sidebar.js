import React from 'react';
import { Link } from 'react-router-dom';



const Sidebar = () => {
  return (
    <div className='sidebar-main'>
      <div className='sidebar-collaps-btn'>
          <img src={`${process.env.PUBLIC_URL}/images/sidebar-left.svg`} alt="" />
      </div>
    <aside className="sidebar">
      <div className="logo">
        <Link to="/">
          <img src={`${process.env.PUBLIC_URL}/images/Fleet Wage Logo_Rev.svg`} alt="Logo" className='desktop-logo' />
          <img src={`${process.env.PUBLIC_URL}/images/mobail-logo.svg`} alt="Logo" className='maobail-logo' />
        </Link>
      </div>
      <div className="menu-bar">
        <div className="open-icon"><i className="fa-solid fa-bars"></i></div>
        <div className="close-icon"><i className="fa-solid fa-xmark"></i></div>
      </div>
      <nav className="menu">
        <div className="top-menu">
          <p className="menu-title">INSIGHT</p>
          <ul className="menu-list">
            <li>
              <Link to="/overview">
                <span className="menu-icon">
                  <span className="blue-icon-img"><img src={`${process.env.PUBLIC_URL}/images/dashboard-bluee.png`} alt="" /></span>
                  <img src={`${process.env.PUBLIC_URL}/images/dashboard.png`} alt="" />
                </span>
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/leaderboard">
                <span className="menu-icon">
                  <span className="blue-icon-img"><img src={`${process.env.PUBLIC_URL}/images/ranking-blue.png`} alt="" /></span>
                  <img src={`${process.env.PUBLIC_URL}/images/ranking.png`} alt="" />
                </span>
                Leaderboard
              </Link>
            </li>
          </ul>

          <p className="menu-title">Team</p>
          <ul className="menu-list">
            <li>
              <Link to="/employees">
                <span className="menu-icon">
                  <span className="blue-icon-img"><img src={`${process.env.PUBLIC_URL}/images/profile-2user-blue.png`} alt="" /></span>
                  <img src={`${process.env.PUBLIC_URL}/images/profile-2user.png`} alt="" />
                              </span>
                Employees
              </Link>
            </li>
            <li className="active">
              <Link to="/schedule">
                <span className="menu-icon">
                  <span className="blue-icon-img"><img src={`${process.env.PUBLIC_URL}/images/calendar-2.png`}alt="" /></span>
                  <img src={`${process.env.PUBLIC_URL}/images/calendar.png`} alt="" />
                </span>
                Schedule
              </Link>
            </li>
            <li className="">
              <Link to="/white-ups">
                <span className="menu-icon">
                  <span className="blue-icon-img"><img src={`${process.env.PUBLIC_URL}/images/note-blue.png`} alt="" /></span>
                  <img src={`${process.env.PUBLIC_URL}/images/note.png`} alt="" />
                </span>
                White-Ups
              </Link>
            </li>
          </ul>

          <p className="menu-title">Payroll</p>
          <ul className="menu-list">
            <li>
              <Link to="/payroll">
                <span className="menu-icon">
                  <span className="blue-icon-img"><img src={`${process.env.PUBLIC_URL}/images/dollar-square-blue.png`} alt="" /></span>
                  <img src={`${process.env.PUBLIC_URL}/images/dollar-square.png`} alt="" />
                </span>
                Payroll
              </Link>
            </li>
            <li>
              <Link to="/expenses">
                <span className="menu-icon">
                  <span className="blue-icon-img"><img src={`${process.env.PUBLIC_URL}/images/card-pos-blue.png`} alt="" /></span>
                  <img src={`${process.env.PUBLIC_URL}/images/card-pos.png`} alt="" />
                </span>
                Expenses
              </Link>
            </li>
          </ul>
        </div>

        <div className="bottom-menu">
          <p className="menu-title">Support</p>
          <ul className="menu-list">
            <li>
              <Link to="/help">
                <span className="menu-icon">
                  <span className="blue-icon-img"><img src={`${process.env.PUBLIC_URL}/images/book-blue.png`} alt="" /></span>
                  <img src={`${process.env.PUBLIC_URL}/images/book.png`} alt="" />
                </span>
                Help Center
              </Link>
            </li>
          </ul>
          <p className="menu-title">Admin</p>
          <ul className="menu-list">
            <li>
              <Link to="/integrations">
                <span className="menu-icon">
                  <span className="blue-icon-img"><img src={`${process.env.PUBLIC_URL}/images/category-blue.png`} alt="" /></span>
                  <img src={`${process.env.PUBLIC_URL}/images/category.png`} alt="" />
                </span>
                Integrations
              </Link>
            </li>
            <li>
              <Link to="/settings">
                <span className="menu-icon">
                  <span className="blue-icon-img"><img src={`${process.env.PUBLIC_URL}/images/setting-2-blue.png`} alt="" /></span>
                  <img src={`${process.env.PUBLIC_URL}/images/setting-2.png`} alt="" />
                </span>
                Settings
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
        </div>
  );
};

export default Sidebar;
