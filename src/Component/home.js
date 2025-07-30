import { useState,useEffect, React } from 'react';
import Header from './header';
import Sidebar from './sidebar';
import { useTable, useSortBy } from '@tanstack/react-table';
import { initJqueryUI } from '../initJqueryUI';

const Home = () => {

  const [filterOpen, setFilterOpen] = useState(false);
  const [terminal, setTerminal] = useState('King of Prussia – 601 River Rd, Bridgeport, PA 19405');
  const [employee, setEmployee] = useState('John Jacob');
  const [notes, setNotes] = useState('Easy to manage CSA');
  const [route, setRoute] = useState('');
  const [type, setType] = useState('');
  const [days, setDays] = useState([]);
  const [history] = useState('Stop ~ 204, Packages ~ 321');
  const [incentive, setIncentive] = useState('$25');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [smartOpen, setSmartOpen] = useState(false);

  const toggleUser = (email) => {
    setSelectedUsers((prev) =>
      prev.includes(email) ? prev.filter(u => u !== email) : [...prev, email]
    );
  };
  useEffect(() => {
    // Wait for DOM to update before running jQuery
    setTimeout(() => {
      initJqueryUI();
    }, 0);
  },);

  const tableData = [
    {
      company: 'Zev Express Inc',
      station: 'King of Prussia',
      profileLink: 'Zev-Express-Inc-King-of-Prussia.html',
      responsible: {
        name: 'Dmitriy Popello',
        role: 'Senior Manager',
        status: 'before-online',
        avatar: `${process.env.PUBLIC_URL}/images/Dmitriy-Popello.png`,
      },
      totalRoutes: 56,
      openShifts: { count: 5, status: 'alert' },
      standbyDrivers: 22,
      training: 37,
      truckNeeded: 2,
    },
    {
      company: 'Zev Express Inc',
      station: 'King of Prussia',
      profileLink: 'Zev-Express-Inc-King-of-Prussia.html',
      responsible: {
        name: 'Jenny Wilson',
        role: 'Senior Manager',
        status: 'online',
        avatar: `${process.env.PUBLIC_URL}/images/Jenny-Wilson.png`,
      },
      totalRoutes: 47,
      openShifts: { count: 0, status: 'ok' },
      standbyDrivers: 34,
      training: 25,
      truckNeeded: 12,
    },
    {
      company: 'Final Delivery Inc',
      station: 'King of Prussia',
      profileLink: 'Zev-Express-Inc-King-of-Prussia.html',
      responsible: {
        name: 'Theresa Webb',
        role: 'Junior Manager',
        status: 'online',
        avatar: `${process.env.PUBLIC_URL}/images/Theresa-Webb.png`,
      },
      totalRoutes: 65,
      openShifts: { count: 12, status: 'alert' },
      standbyDrivers: 24,
      training: 39,
      truckNeeded: 30,
    },
    {
      company: 'Urartu Logistics Inc',
      station: 'Oaks',
      profileLink: 'Zev-Express-Inc-King-of-Prussia.html',
      responsible: {
        name: 'Courtney Henry',
        role: 'Senior Manager',
        status: 'offline',
        avatar: `${process.env.PUBLIC_URL}/images/Courtney-Henry.png`,
      },
      totalRoutes: 23,
      openShifts: { count: 32, status: 'alert' },
      standbyDrivers: 19,
      training: 21,
      truckNeeded: 14,
    },
    {
      company: 'Urartu Logistics Inc',
      station: 'North Wales',
      profileLink: 'Zev-Express-Inc-King-of-Prussia.html',
      responsible: {
        name: 'Albert Flores',
        role: 'Senior Manager',
        status: 'online',
        avatar: `${process.env.PUBLIC_URL}/images/Albert-Flores.png`,
      },
      totalRoutes: 32,
      openShifts: { count: 25, status: 'alert' },
      standbyDrivers: 39,
      training: 11,
      truckNeeded: 32,
    },
    {
      company: 'Urartu Logistics Inc',
      station: 'North Wales',
      profileLink: 'Zev-Express-Inc-King-of-Prussia.html',
      responsible: {
        name: 'Bessie Cooper',
        role: 'Senior Manager',
        status: 'offline',
        avatar: `${process.env.PUBLIC_URL}/images/Bessie-Cooper.png`,
      },
      totalRoutes: 17,
      openShifts: { count: 0, status: 'ok' },
      standbyDrivers: 13,
      training: 5,
      truckNeeded: 35,
    },
    {
      company: 'Urartu Logistics Inc',
      station: 'North Wales',
      profileLink: 'Zev-Express-Inc-King-of-Prussia.html',
      responsible: {
        name: 'Floyd Miles',
        role: 'Senior Manager',
        status: 'before-online',
        avatar: `${process.env.PUBLIC_URL}/images/Floyd-Miles.png`,
      },
      totalRoutes: 49,
      openShifts: { count: 0, status: 'ok' },
      standbyDrivers: 35,
      training: 2,
      truckNeeded: 15,
    },
    {
      company: 'Next Mile Inc',
      station: 'Lehigh Valley',
      profileLink: 'Zev-Express-Inc-King-of-Prussia.html',
      responsible: {
        name: 'Brooklyn Simmons',
        role: 'Junior Manager',
        status: 'online',
        avatar: `${process.env.PUBLIC_URL}/images/Brooklyn-Simmons.png`,
      },
      totalRoutes: 27,
      openShifts: { count: 6, status: 'alert' },
      standbyDrivers: 7,
      training: 18,
      truckNeeded: 6,
    },
    {
      company: 'Main Line Logistics Inc',
      station: 'West Chester',
      profileLink: 'Zev-Express-Inc-King-of-Prussia.html',
      responsible: {
        name: 'Cameron Williamson',
        role: 'Junior Manager',
        status: 'offline',
        avatar: `${process.env.PUBLIC_URL}/images/Cameron-Williamson.png`,
      },
      totalRoutes: 15,
      openShifts: { count: 0, status: 'ok' },
      standbyDrivers: 17,
      training: 2,
      truckNeeded: 27,
    },
  ];

  const handleDayChange = (day) => {
    setDays((prevDays) =>
      prevDays.includes(day) ? prevDays.filter(d => d !== day) : [...prevDays, day]
    );
  };

  /*   const handleSubmit = (e) => {
      e.preventDefault();
      console.log({ terminal, route, type, employee, days });
    }; */

  const toggleDay = (day) => {
    setDays((prev) =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ terminal, route, type, employee, incentive, days, notes });
  };




  const handleSubmitEmpl = (e) => {
    e.preventDefault();
    console.log('Selected Users:', selectedUsers);
  };

  return (
    <div className="dashboard-main">
      <Sidebar />
      <main className="content">
        <Header />
        <div className="inner-content-main">
          <div className="inner-top-controls">
            <div className="left-controls">
              <button className="today-btn btn">Today</button>
              <span className="date-range">
                <span className="past-dat-icon"><i className="fas fa-chevron-left"></i></span>
                <p>Jan 28 - Feb 3, 2025</p>
                <span className="future-dat-icon"><i className="fas fa-chevron-right"></i></span>
              </span>
              <div className="dropdown btn">
                <select className="day-dropdown">
                  <option value="Week" className="week-table-show">Week</option>
                  <option value="day" className="day-table-show">Day</option>
                </select>
              </div>
            </div>

            <div className="right-controls">
              <ul>
                <li className="search-col">
                  <form action="">
                    <span className="controls-icons">
                       <img src={`${process.env.PUBLIC_URL}/images/search-normal.svg`} alt="" />
                    </span>
                    <input type="text" className="search" placeholder="Search...." />
                  </form>
                </li>

                <li className="filter-col">
                  <button className="btn" onClick={() => setFilterOpen(!filterOpen)}>
                    <span className="controls-icons">
                       <img src={`${process.env.PUBLIC_URL}/images/Icon@filter.svg`} alt="" />
                    </span>
                    Filter
                  </button>
                  {filterOpen && (
                    <div className="form-outer filter-form show-form">
                      <div className="form-overlay">
                        <form action="" className="form-modal">
                          <div className="form-modal-inner">
                            <div className="form-header">
                              <h2>Filter</h2>
                              <button className="close-btn" onClick={() => setFilterOpen(false)}>
                                <i className="fa-solid fa-xmark"></i>
                              </button>
                            </div>
                            <div className="form-body">
                              <div className="filter-form-content">
                                <div className="form-group">
                                  <label htmlFor="status">Status</label>
                                  <select id="status" name="terminal">
                                    <option>Select status</option>
                                  </select>
                                </div>
                                <div className="form-group">
                                  <label htmlFor="role">Role</label>
                                  <select id="role" name="role">
                                    <option>Role</option>
                                  </select>
                                </div>
                                <div className="form-group">
                                  <label htmlFor="route">Routes</label>
                                  <select id="route" name="route">
                                    <option>Select routes</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div className="form-footer">
                              <button type="button" className="light-btn clear-all">Clear all</button>
                              <button type="submit" className="dark-btn filter-btn">Apply Filter</button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                </li>

                <li className="smart-col">
                  <button className="btn" onClick={() => setSmartOpen(!smartOpen)}>
                    <span className="controls-icons">
                       <img src={`${process.env.PUBLIC_URL}/images/copy.svg`} alt="" />
                    </span>
                    Smart Copy<span className="future-dat-icon"><i className="fas fa-chevron-down"></i></span>
                  </button>

                  {/* {smartOpen && ( */}
                    <ul className="smart-option option-box">
                      <li className="last-payroll">
                        <a href="#">
                          <span className="export-icons">
                             <img src={`${process.env.PUBLIC_URL}/images/dollar-square.png`} alt="" />
                          </span>
                          Generate From Last Payroll
                        </a>
                      </li>
                      <li className="last-week">
                        <a href="#">
                          <span className="export-icons">
                             <img src={`${process.env.PUBLIC_URL}/images/calendar.svg`} alt="" />
                          </span>
                          Copy Last Week Schedule
                        </a>
                      </li>
                    </ul>
                  {/* )} */}
                </li>

                <li className="export-col">
                  <button className="btn primary">
                    <span className="controls-icons"> <img src={`${process.env.PUBLIC_URL}/images/export.png`} alt="" /></span>
                    Export <i className="fas fa-chevron-up"></i>
                  </button>
                  <ul className="export-option option-box">
                    <li className="schedule-pdf">
                      <a href="#">
                        <span className="export-icons"> <img src={`${process.env.PUBLIC_URL}/images/Icon-pdf-01.png`} alt="" /></span>
                        Schedule (PDF)
                      </a>
                    </li>
                    <li className="schedule-CSV">
                      <a href="#">
                        <span className="export-icons"> <img src={`${process.env.PUBLIC_URL}/images/Iconcsv-01.png`} alt="" /></span>
                        Schedule (CSV)
                      </a>
                    </li>
                    <li className="publish">
                      <a href="#">
                        <span className="export-icons"> <img src={`${process.env.PUBLIC_URL}/images/Iconmegaphone-01.png`} alt="" /></span>
                        Publish
                      </a>
                    </li>
                  </ul>
                </li>

              </ul>
            </div>
          </div>

          <div className="top-details-sec">
            <div className="details-right-col right-full-col">
              <div className="detail-box routes-col">
                <div className="item-title">
                  <div className="item-img"> <img src={`${process.env.PUBLIC_URL}/images/routing.png`} alt="Total Routes" /></div>
                  <p>Total Routes</p>
                </div>
                <h3>24</h3>
              </div>

              <div className="detail-box shifts-col">
                <div className="item-title">
                  <div className="item-img"> <img src={`${process.env.PUBLIC_URL}/images/Icon@time-schedule.png`} alt="Open Shifts" /></div>
                  <p>Open Shifts</p>
                </div>
                <h3>2</h3>
              </div>

              <div className="detail-box standby-col">
                <div className="item-title">
                  <div className="item-img"> <img src={`${process.env.PUBLIC_URL}/images/Icon@validation-approval.png`} alt="Standby Drivers" /></div>
                  <p>Standby Drivers</p>
                </div>
                <h3>3</h3>
              </div>

              <div className="detail-box training-col">
                <div className="item-title">
                  <div className="item-img"> <img src={`${process.env.PUBLIC_URL}/images/Icon@mentoring.png`} alt="Training" /></div>
                  <p>Training</p>
                </div>
                <h3>12</h3>
              </div>

              <div className="detail-box truck-col">
                <div className="item-title">
                  <div className="item-img"> <img src={`${process.env.PUBLIC_URL}/images/Icon@shipping-truck-01.png`} alt="Truck Needed" /></div>
                  <p>Truck Needed</p>
                </div>
                <h3>7</h3>
              </div>
            </div>
          </div>

          <div className="schedule-table">
            <div className="schedule-table-inner">
              <table>
                <thead>
                  <tr>
                    <th>Company</th>
                    <th>Station</th>
                    <th>Responsible</th>
                    <th className="total-routes t-center">Total Routes</th>
                    <th className="shifts t-center">Open Shifts</th>
                    <th className="drivers-col t-center">Standby Drivers</th>
                    <th className="training-col t-center">Training</th>
                    <th className="truck-col t-center">Truck needed</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, idx) => (
                    <tr key={idx}>
                      <td>{row.company}</td>
                      <td>{row.station}</td>
                      <td className="profile-details-url">
                        <a href={`${row.company.toLowerCase().replace(/\s+/g, '-')}/${row.station.toLowerCase().replace(/\s+/g, '-')}`} className="avatar-details-link"></a>
                      </td>
                      <td className="responsible">
                        <div className={`responsible-avatar ${row.responsible.status}`}>
                          <div className="avatar-img-outer">
                            <img src={row.responsible.avatar} alt={row.responsible.name} />
                          </div>
                        </div>
                        <div className="avatar-details">
                          <h5>{row.responsible.name}</h5>
                          <p className="role">{row.responsible.role}</p>
                        </div>
                      </td>
                      <td className="total-routes t-center">{row.totalRoutes}</td>
                      <td className="shifts t-center">
                        <div className="shifts-status">
                          <span className="status-number">{row.openShifts.count}</span>
                          {row.openShifts.status === 'alert' ? (
                            <span className="status-alert">
                              <i className="fa-solid fa-triangle-exclamation"></i>
                            </span>
                          ) : (
                            <span className="status-ok">
                              <i className="fa-regular fa-circle-check"></i>
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="drivers-col t-center">{row.standbyDrivers}</td>
                      <td className="training-col t-center">{row.training}</td>
                      <td className="truck-col t-center">{row.truckNeeded}</td>
                      <td className="dots-col">
                        <div className="dots-row">
                          <span className="dot"></span>
                          <span className="dot"></span>
                          <span className="dot"></span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/*  Schedule-table end   calendar-table start  */}

            <div className="form-outer publish-shift-form">
              <div className="form-overlay">
                <form action="" className="form-modal">
                  <div className="form-modal-inner">
                    <div className="form-header">
                      <h2>Publish Shift</h2>
                      <button className="close-btn">
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    </div>
                    <div className="form-body">
                      <div className="publish-shift-content">
                        <h3>Send New Schedule</h3>
                        <p>The Updated schedule will be sent to all employees.</p>
                        <div className="notification-options">
                          <p className="notification-title">Notification will be sent via:</p>
                          <ul className="chack-box-outer">
                            <li className="chack-col">
                              <input type="checkbox" />
                              <span className="checkmark"></span>
                              <span>Email</span>
                            </li>
                            <li className="chack-col">
                              <input type="checkbox" />
                              <span className="checkmark"></span>
                              <span>text</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="form-footer">
                      <button className="light-btn cancel-btn">Cancel</button>
                      <button className="dark-btn confirm-btn" type="submit">Confirm</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
