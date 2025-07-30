import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from './header';
import DayTable from './dayTable';
import Sidebar from './sidebar';
import { initJqueryUI } from '../initJqueryUI';


const CompanyStationPage = () => {
  const { company, station } = useParams();
  const [filterOpen, setFilterOpen] = useState(false);
  const [terminal, setTerminal] = useState('King of Prussia – 601 River Rd, Bridgeport, PA 19405');
  const [employee, setEmployee] = useState('John Jacob');
  const [notes, setNotes] = useState('About 220 Stop mostly Residential');
  const [route, setRoute] = useState('');
  const [type, setType] = useState('');
  const [history] = useState('Stop ~ 204, Packages ~ 321');
  const [incentive, setIncentive] = useState('$25');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [smartOpen, setSmartOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [selectedView, setSelectedView] = useState('Week');
  const [isAddRouteFormOpen, setAddRouteFormOpen] = useState(false);
  const openAddRouteForm = () => setAddRouteFormOpen(true);
  const [activeAssignCell, setActiveAssignCell] = useState(null);
  const [ShowUnassingBox, setShowUnassignedCell] = useState(false);
 
const [showUnassignedCell, setShowUnassignedCell1] = useState(null);


  useEffect(() => {
    // Wait for DOM to update before running jQuery
    setTimeout(() => {
      initJqueryUI();
    }, 0);
  }, [selectedView]);

  // week wise data
  const [routeHeaders, setRouteHeaders] = useState([
    {
      id: 'dispatch',
      icon: `${process.env.PUBLIC_URL}/images/truck-fast.svg`,
      title: 'Dispatch',
      location: 'King of Prussia',
      /*   class_type: 'manager-box', */
      options: [
        {
          label: 'Edit',
          icon: `${process.env.PUBLIC_URL}/images/edit-2.png`,
          className: 'edit-option',
          link: '#',
        },
        {
          label: 'Remove',
          icon: `${process.env.PUBLIC_URL}/images/trash.png`,
          className: 'remove-option',
          link: '#',
        },
      ],
      // Add this new key:
      rowData: [
        { id: 'cell-1', name: 'Jacob Jones', role: 'Junior Manager', assigned: true, assignedDay: 'day-28', class_type: 'manager-box' },
        { id: 'cell-2', name: 'Jacob Jones 1', role: 'Junior Manager', assigned: true, assignedDay: 'day-29', class_type: 'manager-box' },
        { id: 'cell-3', name: 'Jacob Jones 2', role: 'Junior Manager', assigned: true, assignedDay: 'day-30', class_type: 'manager-box' },
        { id: 'cell-4', name: 'Jacob Jones 3 ', role: 'Junior Manager', assigned: true, assignedDay: 'day-31', class_type: 'manager-box' },
        { id: 'cell-5', assigned: false, assignedDay: 'day-1' }, // not assigned
        { id: 'cell-6', name: 'Jacob Jones 4 ', role: 'Junior Manager', assigned: true, assignedDay: 'day-2', class_type: 'manager-box' },
        { id: 'cell-7', name: 'Jacob Jones 5 ', role: 'Junior Manager', assigned: true, assignedDay: 'day-3', class_type: 'manager-box' },
      ]
    },

    {
      id: 'bulk',
      icon: `${process.env.PUBLIC_URL}/images/table-routing.svg`,
      title: '123',
      location: 'Bulk',
      // class_type: 'driver-box',
      options: [],
      rowData: [
        { id: 'cell-1-0', name: 'Cameron Williamson', role: 'Driver', assigned: true, assignedDay: 'day-28', class_type: 'driver-box' },
        { id: 'cell-1-1', name: 'Ketthy', role: 'training', assigned: true, assignedDay: 'day-28', class_type: 'training-box' },
        { id: 'cell-1-2', name: 'Darlene Robertson', role: 'Driver', assigned: true, assignedDay: 'day-29', class_type: 'driver-box' },
        { id: 'cell-1-3', name: 'Cameron Williamson', role: 'Driver', assigned: true, assignedDay: 'day-30', class_type: 'driver-box' },
        { id: 'cell-1-4', assigned: false, assignedDay: 'day-31' },
        { id: 'cell-1-5', name: 'Cameron Williamson', role: 'Driver', assigned: true, assignedDay: 'day-1', class_type: 'driver-box' },
        { id: 'cell-1-6', name: 'Darlene Robertson', role: 'Driver', assigned: true, assignedDay: 'day-2', class_type: 'driver-box' },
        { id: 'cell-1-7', assigned: false, assignedDay: 'day-3' },
      ]
    },

    {
      id: 'city',
      icon: `${process.env.PUBLIC_URL}/images/table-routing.svg`,
      title: '143',
      location: 'City',
      // class_type: 'driver-box',
      options: [],
      rowData: [
        { id: 'cell-2-0', name: 'Cameron Williamson', role: 'Driver', assigned: true, assignedDay: 'day-28', class_type: 'driver-box' },
        { id: 'cell-2-2', assigned: false, assignedDay: 'day-29' },
        { id: 'cell-2-3', assigned: true, assignedDay: 'day-30' },
        { id: 'cell-2-4', name: 'Marvin McKlnney', role: 'Driver', assigned: true, assignedDay: 'day-31', class_type: 'driver-box' },
        { id: 'cell-2-5', name: 'Albert Flores', role: 'Driver', assigned: true, assignedDay: 'day-1', class_type: 'driver-box' },
        { id: 'cell-2-6', name: 'Theresa Webb', role: 'Driver', assigned: true, assignedDay: 'day-2', class_type: 'driver-box' },
        { id: 'cell-2-7', name: 'Courteney Henery', role: 'Driver', assigned: true, assignedDay: 'day-3', class_type: 'driver-box' },
      ]
    },

    {
      id: 'rural',
      icon: `${process.env.PUBLIC_URL}/images/table-routing.svg`,
      title: '234',
      location: 'Rural',
      options: [],
      rowData: [
        { id: 'cell-3-0', name: 'Darrell Steward', role: 'Driver', assigned: true, assignedDay: 'day-28', class_type: 'driver-box' },
        { id: 'cell-3-1', name: 'Cameron Williamson', role: 'Driver', assigned: true, assignedDay: 'day-29', class_type: 'driver-box' },
        { id: 'cell-3-2', name: 'Floyd Miles', role: 'Driver', assigned: true, assignedDay: 'day-30', class_type: 'driver-box' },
        { id: 'cell-3-3', name: 'Darlene Robertson', role: 'Driver', assigned: true, assignedDay: 'day-31', class_type: 'driver-box' },
        { id: 'cell-3-4', name: 'Leslie Alexander', role: 'Driver', assigned: true, assignedDay: 'day-1', class_type: 'driver-box' },
        { id: 'cell-3-5', name: 'Eleanor Pena', role: 'Driver', assigned: true, assignedDay: 'day-2', class_type: 'driver-box' },
        { id: 'cell-3-6', assigned: false, assignedDay: 'day-3' }
      ]
    },

    {
      id: 'city',
      icon: `${process.env.PUBLIC_URL}/images/table-routing.svg`,
      title: '140',
      location: 'City',
      options: [],
      rowData: [
        { id: 'cell-4-0', name: 'Savannah Nguyen', role: 'Driver', assigned: true, assignedDay: 'day-28', class_type: 'driver-box' },
        { id: 'cell-4-1', name: 'Darlene Robertson', role: 'Driver', assigned: true, assignedDay: 'day-29', class_type: 'driver-box' },
        { id: 'cell-4-2', name: 'Leslie Alexander', role: 'Driver', assigned: true, assignedDay: 'day-30', class_type: 'driver-box' },
        { id: 'cell-4-3', name: 'Jane Williamson', role: 'Driver', assigned: true, assignedDay: 'day-31', class_type: 'driver-box' },
        { id: 'cell-4-4', name: 'Dianne Russell', role: 'Driver', assigned: true, assignedDay: 'day-1', class_type: 'driver-box' },
        { id: 'cell-4-5', assigned: true, assignedDay: 'day-2' },
        { id: 'cell-4-6', name: 'Guy Hawkins', role: 'Driver', assigned: true, assignedDay: 'day-3', class_type: 'driver-box' }
      ]
    },

    {
      id: 'city',
      icon: `${process.env.PUBLIC_URL}/images/table-routing.svg`,
      title: '243',
      location: 'City',
      options: [],
      rowData: [
        { id: 'cell-5-0', assigned: true, assignedDay: 'day-28' },
        { id: 'cell-5-1', name: 'Cameron Williamson', role: 'Driver', assigned: true, assignedDay: 'day-29', class_type: 'driver-box' },
        { id: 'cell-5-2', name: 'Robert Fox', role: 'Driver', assigned: true, assignedDay: 'day-30', class_type: 'driver-box' },
        { id: 'cell-5-3', name: 'Darlene Robertson', role: 'Driver', assigned: true, assignedDay: 'day-31', class_type: 'driver-box' },
        { id: 'cell-5-4', name: 'Jenny Wilson', role: 'Driver', assigned: true, assignedDay: 'day-1', class_type: 'driver-box' },
        { id: 'cell-5-5', name: 'Darlene Robertson', role: 'Driver', assigned: true, assignedDay: 'day-2', class_type: 'driver-box' },
        { id: 'cell-5-6', name: 'Wade Warren', role: 'Driver', assigned: true, assignedDay: 'day-3', class_type: 'driver-box' }
      ]
    },

    {
      id: 'rural',
      icon: `${process.env.PUBLIC_URL}/images/table-routing.svg`,
      title: '153',
      location: 'Rural',
      options: [],
      rowData: [
        { id: 'cell-6-0', assigned: false, assignedDay: 'day-28' },
        { id: 'cell-6-1', assigned: true, assignedDay: 'day-29' },
        { id: 'cell-6-2', name: 'Theresa Webb', role: 'Driver', class_type: 'driver-box', assigned: true, assignedDay: 'day-30' },
        { id: 'cell-6-3', assigned: false, assignedDay: 'day-31' },
        { id: 'cell-6-4', assigned: true, assignedDay: 'day-1' },
        { id: 'cell-6-5', name: 'Ronald Richards', role: 'Driver', assigned: true, assignedDay: 'day-2', class_type: 'driver-box' },
        { id: 'cell-6-6', assigned: false, assignedDay: 'day-3' }
      ]
    },

    // Add more routes similarly...
  ]);

  const [days, setDays] = useState([
    { id: 'day-28', label: 'Sat 28' },
    { id: 'day-29', label: 'Sun 29' },
    { id: 'day-30', label: 'Mon 30' },
    { id: 'day-31', label: 'Tue 31' },
    { id: 'day-1', label: 'Wed 1' },
    { id: 'day-2', label: 'Thu 2' },
    { id: 'day-3', label: 'Thu 3' },
    // Add more days as needed
  ]);

const [showAddDriverForm, setShowAddDriverForm] = useState(false);

  const handleOpenForm = () => setShowAddDriverForm(true);
  const handleCloseForm = () => setShowAddDriverForm(false);
  const handleSubmit1 = (e) => {
    e.preventDefault();
    // Your submit logic
    handleCloseForm(); // Optional: close form on submit
  };

  const toggleUser = (email) => {
    setSelectedUsers((prev) =>
      prev.includes(email) ? prev.filter(u => u !== email) : [...prev, email]
    );
  };

  /*   const handleDayChange = (day) => {
      setDays((prevDays) =>
        prevDays.includes(day) ? prevDays.filter(d => d !== day) : [...prevDays, day]
      );
    }; */

  const [checkedDays, setCheckedDays] = useState({
    all: false,
    sat: false,
    sun: false,
    mon: false,
    tue: false,
    wed: false,
    thu: false,
    fri: false,
  });


  const toggleDay = (day) => {
    setDays((prev) =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ terminal, route, type, employee, incentive, days, notes });
  };

  const users = [
    { name: 'Savannah Nguyen', email: 'nguyen@gmail.com', image: `${process.env.PUBLIC_URL}/images/Savannah Nguyen.png` },
    { name: 'Cody Fisher', email: 'cody@gmail.com', image: `${process.env.PUBLIC_URL}/images/Cody-Fisher.png` },
    { name: 'Courtney Henry', email: 'henry@gmail.com', image: `${process.env.PUBLIC_URL}/images/Courtney Henry.png` },
    { name: 'Marvin McKinney', email: 'marvin@gmail.com', image: `${process.env.PUBLIC_URL}/images/Marvin-McKinney.png` },
    { name: 'Darrell Steward', email: 'darrell@gmail.com', image: `${process.env.PUBLIC_URL}/images/Darrell-Steward.png` },
    { name: 'Cody Fisher', email: 'fisher@gmail.com', image: `${process.env.PUBLIC_URL}/images/Cody Fisher.png` },
    { name: 'Jenny Wilson', email: 'wilson@gmail.com', image: `${process.env.PUBLIC_URL}/images/Jenny Wilson.png` },
  ];


  const handleSubmitEmpl = (e) => {
    e.preventDefault();
    console.log('Selected Users:', selectedUsers);
  };

  const handleDayChange = (day) => {
    const updated = {
      ...checkedDays,
      [day]: !checkedDays[day],
    };

    // Update "all" if every weekday is now checked
    const allChecked = ["sat", "sun", "mon", "tue", "wed", "thu", "fri"].every(
      (d) => d === day ? !checkedDays[d] : checkedDays[d]
    );

    updated.all = allChecked;

    setCheckedDays(updated);
  };

  const handleAllChange = () => {
    const newValue = !checkedDays.all;
    setCheckedDays({
      all: newValue,
      sat: newValue,
      sun: newValue,
      mon: newValue,
      tue: newValue,
      wed: newValue,
      thu: newValue,
      fri: newValue,
    });
  };
const [emptyCellKey, setEmptyCellKey] = useState(null);

/*   useEffect(() => {
    function handleRoutesCellEmpty(event) {
      const { cellKey } = event.detail;
      console.log('Cell became empty:', cellKey);
      setEmptyCellKey(cellKey);
      // You can call your setUnassigned(true) or whatever here
    }

    window.addEventListener('routesCellEmpty', handleRoutesCellEmpty);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('routesCellEmpty', handleRoutesCellEmpty);
    };
  }, []);
 */
 useEffect(() => {
  const handleRoutesCellEmpty = (event) => {
    const { cellKey } = event.detail;

    // ✅ Track the cell that became unassigned
    setShowUnassignedCell1(cellKey);

    // ✅ Show the unassigned box setShowUnassignedCell1
    //setShowUnassignedCell(true); // Or whatever state you use
  };

  window.addEventListener("routesCellEmpty", handleRoutesCellEmpty);

  return () => {
    window.removeEventListener("routesCellEmpty", handleRoutesCellEmpty);
  };
}, []);


  return (
    <div className="dashboard-main">
      <Sidebar />
      <main className="content">
         {emptyCellKey && <p>Cell empty: {emptyCellKey}</p>}
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
                <select
                  className="day-dropdown"
                  value={selectedView}
                  onChange={(e) => setSelectedView(e.target.value)}
                >

                  <option value="Week" className="week-table-show">Week</option>
                  <option value="Day" className="day-table-show">Day</option>
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
                          <img src={`${process.env.PUBLIC_URL}/images/card-pos.svg`} alt="" />
                        </span>
                        Generate From Last Payroll
                      </a>
                    </li>
                    <li className="last-week">
                      <a href="#">
                        <span className="export-icons">
                          <img src={`${process.env.PUBLIC_URL}/images/clock.png`} alt="" />
                        </span>
                        Copy Last Week Schedule
                      </a>
                    </li>
                  </ul>
                  {/* )} */}
                </li>

                <li className="export-col">
                  <button className="btn primary">
                    <span className="controls-icons"><img src={`${process.env.PUBLIC_URL}/images/export.png`} alt="" /></span>
                    Export <i className="fas fa-chevron-up"></i>
                  </button>
                  <ul className="export-option option-box">
                    <li className="schedule-pdf">
                      <a href="#">
                        <span className="export-icons"><img src={`${process.env.PUBLIC_URL}/images/Icon-pdf-01.png`} alt="" /></span>
                        Schedule (PDF)
                      </a>
                    </li>
                    <li className="schedule-CSV">
                      <a href="#">
                        <span className="export-icons"><img src={`${process.env.PUBLIC_URL}/images/Iconcsv-01.png`} alt="" /></span>
                        Schedule (CSV)
                      </a>
                    </li>
                    <li className="publish">
                      <a href="#">
                        <span className="export-icons"><img src={`${process.env.PUBLIC_URL}/images/Iconmegaphone-01.png`} alt="" /></span>
                        Publish
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>

          <div className="top-details-sec">
            <div className="manager">
              <div className="manager-img">
                <img src={`${process.env.PUBLIC_URL}/images/manager-img.png`} alt="Cameron Williamson" />
              </div>
              <div className="manager-details">
                <h5>Cameron Williamson</h5>
                <p>Junior Manager</p>
              </div>
            </div>

            <div className="details-right-col">
              <div className="detail-box routes-col">
                <div className="item-title">
                  <div className="item-img"><img src={`${process.env.PUBLIC_URL}/images/routing.png`} alt="Total Routes" /></div>
                  <p>Total Routes</p>
                </div>
                <h3>24</h3>
              </div>

              <div className="detail-box shifts-col">
                <div className="item-title">
                  <div className="item-img"><img src={`${process.env.PUBLIC_URL}/images/Icon@time-schedule.png`} alt="Open Shifts" /></div>
                  <p>Open Shifts</p>
                </div>
                <h3>2</h3>
              </div>

              <div className="detail-box standby-col">
                <div className="item-title">
                  <div className="item-img"><img src={`${process.env.PUBLIC_URL}/images/Icon@validation-approval.png`} alt="Standby Drivers" /></div>
                  <p>Standby Drivers</p>
                </div>
                <h3>3</h3>
              </div>

              <div className="detail-box training-col">
                <div className="item-title">
                  <div className="item-img"><img src={`${process.env.PUBLIC_URL}/images/Icon@mentoring.png`} alt="Training" /></div>
                  <p>Training</p>
                </div>
                <h3>12</h3>
              </div>

              <div className="detail-box truck-col">
                <div className="item-title">
                  <div className="item-img"><img src={`${process.env.PUBLIC_URL}/images/Icon@shipping-truck-01.png`} alt="Truck Needed" /></div>
                  <p>Truck Needed</p>
                </div>
                <h3>7</h3>
              </div>
            </div>
          </div>
          <div className="schedule-table">
            <div className="calendar-container">
              {selectedView === 'Week' && (
                <div className="week-table week-table-show">
                  <table className="route-calendar">
                    <thead>
                      <tr>
                        <th className="table-left-title">Routes</th>
                        <th>
                          <p className="rout-date">Sat 28</p>
                          <span className="route-alert">
                            <span className="alert-icon">
                              <i className="fa-solid fa-triangle-exclamation"></i>
                            </span>
                            <p className="rout-number">1</p>
                            <div className="alert-tuol-tip">
                              <p>1 shift remain empty</p>
                            </div>
                          </span>
                        </th>
                        <th>
                          <p className="rout-date">Sun 29</p>
                          <span className="route-alert">
                            <span className="alert-icon">
                              <i className="fa-solid fa-triangle-exclamation"></i>
                            </span>
                            <p className="rout-number">1</p>
                            <div className="alert-tuol-tip">
                              <p>1 shift remain empty</p>
                            </div>
                          </span>
                        </th>
                        <th>
                          <p className="rout-date">Mon 30</p>
                          <span className="route-ok">
                            <span className="ok-icon">
                              <i className="fa-regular fa-circle-check"></i>
                            </span>
                            <p className="rout-number"></p>
                          </span>
                        </th>
                        <th>
                          <p className="rout-date">Tue 31</p>
                          <span className="route-alert">
                            <span className="alert-icon">
                              <i className="fa-solid fa-triangle-exclamation"></i>
                            </span>
                            <p className="rout-number">2</p>
                            <div className="alert-tuol-tip">
                              <p>2 shift remain empty</p>
                            </div>
                          </span>
                        </th>
                        <th>
                          <p className="rout-date">Wed 01</p>
                          <span className="route-ok">
                            <span className="ok-icon">
                              <i className="fa-regular fa-circle-check"></i>
                            </span>
                            <p className="rout-number"></p>
                          </span>
                        </th>
                        <th>
                          <p className="rout-date">Thu 02</p>
                          <span className="route-alert">
                            <span className="alert-icon">
                              <i className="fa-solid fa-triangle-exclamation"></i>
                            </span>
                            <p className="rout-number">1</p>
                            <div className="alert-tuol-tip">
                              <p>1 shift remain empty</p>
                            </div>
                          </span>
                        </th>
                        <th>
                          <p className="rout-date">Fri 03</p>
                          <span className="route-alert">
                            <span className="alert-icon">
                              <i className="fa-solid fa-triangle-exclamation"></i>
                            </span>
                            <p className="rout-number">2</p>
                            <div className="alert-tuol-tip">
                              <p>2 shift remain empty</p>
                            </div>
                          </span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {routeHeaders.map((header) => (
                        <tr key={header.id}  className={`${header.id} droppable-area1`}>
                          {/* Route Header Cell */}
                          <td className="routes-col dispatch-col">
                            <div className="routes-col-row">
                              <div className="routes-col-icon">
                                <img src={header.icon} alt="" />
                              </div>
                              <div className="routes-col-content">
                                <h5>{header.title}</h5>
                                <span className="location">{header.location}</span>
                              </div>
                              <div className="trigger-option">
                                <img src={`${process.env.PUBLIC_URL}/images/Icon@more-vertical.png`} alt="" />
                              </div>
                              <ul className="routes-option option-box">
                                <li className="edit-option"><a href="#" className="add-routes"><span className="edit-icons"><img
                                  src={`${process.env.PUBLIC_URL}/images/edit-2.png`} alt="" /></span>Edit</a></li>
                                <li className="remove-option"><a href="#"><span
                                  className="remove-icons"><img src={`${process.env.PUBLIC_URL}/images/trash.png`}
                                    alt="" /></span>Remove</a></li>
                              </ul>
                            </div>
                          </td>

                          {/* Day-wise Cells */}
                          {days.map((day) => {
                            const managersForDay = header.rowData.filter(m => m.assignedDay === day.id);
                            const assignedManagers = managersForDay.filter(m => m.assigned);
                            const hasUnassigned = managersForDay.some(m => !m.assigned);
                            const blankCol = managersForDay.some(
                              m => m.assigned && m.assignedDay === day.id && (!m.name || m.name.trim() === '')
                            );
                            return (
                              <td
                                key={`${header.id}-${day.id}`}
                                data-cell-id={`${header.id}-${day.id}`}
                                className={`${hasUnassigned ? 'not-assigned' : ''} ${activeAssignCell === `${header.id}-${day.id}` ? 'assign-col-active' : ''} ${blankCol ? 'blank-col' : ''} draggable-item`}
                              >
                                {assignedManagers.length > 0 && assignedManagers.map((manager) => (
                                  manager.class_type !== undefined && (
                                    <div key={manager.id} /* className={`${header.class_type} routes-box`} */ className={`${manager.class_type} routes-box`} >
                                      <div className="routes-box-content">
                                        <h6>{manager.name}</h6>
                                        <span>{manager.role}</span>
                                      </div>
                                      <div className="routes-option">
                                        <ul className="routes-edit-option">
                                          <li className="routes-edit">
                                            <a
                                              href="#"
                                              className="edit-shift-form-btn"
                                              onClick={(e) => {
                                                e.preventDefault();
                                                setIsEditFormOpen(true);
                                              }}
                                            >
                                              <img src={`${process.env.PUBLIC_URL}/images/edit-2.png`} alt="" />
                                            </a>
                                          </li>
                                          <li className="routes-trash">
                                            <a href="#">
                                              <img src={`${process.env.PUBLIC_URL}/images/trash.png`} alt="" />
                                            </a>
                                          </li>
                                          <li className="routes-move"><a href="#"><img src={`${process.env.PUBLIC_URL}/images/Icon@move.png`} alt="" /></a></li>
                                          <li className="routes-add">
                                            <a href="#" className="create-employee-btn">
                                              <img src={`${process.env.PUBLIC_URL}/images/profile-add-user.svg`} alt="" />
                                            </a>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  )
                                ))}
                                
                               {hasUnassigned && (
                                  <div className='not-assigned-outer default-not-assign'>
                                  <div className="not-assigned-content">
                                    <div className="assigned-title">
                                      <span className="assigned-alert-icon">
                                        <i className="fa-solid fa-triangle-exclamation"></i>
                                      </span>
                                      <h6>Unassigned</h6>
                                    </div>
                                    <a
                                      href="#"
                                      className="assign-btn"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        setActiveAssignCell(`${header.id}-${day.id}`);
                                      }}
                                    >
                                      <span className="assing-text">Click to assign</span><span><i className="fas fa-chevron-down"></i></span>
                                    </a>
                                  </div>
                                    <ul className={`assign-option option-box ${activeAssignCell === `${header.id}-${day.id}` ? 'assign-active' : ''}`}>
                                      <li className="add-employee-option">
                                        <a href="#" className="btn-add-employe">
                                          <span className="employee-icons">
                                            <img src={`${process.env.PUBLIC_URL}/images/profile-add.svg`} alt="" />
                                          </span>
                                          Add Employee
                                        </a>
                                      </li>
                                      <li className="post-option">
                                        <a href="#" className="post-form-btn">
                                          <span className="post-icons">
                                            <img src={`${process.env.PUBLIC_URL}/images/Icon@megaphone-01.svg`} alt="" />
                                          </span>
                                          Post Now
                                        </a>
                                      </li>
                                    </ul>
                                    </div>
                                )}

                              </td>
                            );
                          })}
                     
                        </tr>
                      ))}
                      <tr className="add-routes-outer">
                        <td colSpan="8">
                          <button
                            className="add-routes"
                            onClick={() => setAddRouteFormOpen(true)}
                          >
                            <span><i className="fa-solid fa-plus"></i></span>
                            Add Routes
                          </button>
                        </td>
                      </tr>
                      <tr className="stand-drivers droppable-area1">
                        <td className="routes-col stand-drivers-col">
                          <div className="routes-col-row">
                            <div className="routes-col-icon">
                              <img src={`${process.env.PUBLIC_URL}/images/Icon@validation-approval.svg`} alt="" />
                            </div>
                            <div className="routes-col-content">
                              <h5>Stand by Drivers</h5>
                              <span className="location">King of Prussia</span>
                            </div>
                            <div className="trigger-option">
                              <img src={`${process.env.PUBLIC_URL}/images/Icon@more-vertical.png`} alt="" />
                            </div>
                            <ul className="routes-option option-box">
                              <li className="edit-option">
                                <a href="#" className="add-routes">
                                  <span className="edit-icons">
                                    <img src={`${process.env.PUBLIC_URL}/images/edit-2.png`} alt="" />
                                  </span>
                                  Edit
                                </a>
                              </li>
                              <li className="remove-option">
                                <a href="#">
                                  <span className="remove-icons">
                                    <img src={`${process.env.PUBLIC_URL}/images/trash.png`} alt="" />
                                  </span>
                                  Remove
                                </a>
                              </li>
                            </ul>
                          </div>
                        </td>

                        {(() => {
                          const drivers = [
                            { name: 'Courtney Henry', role: 'Driver' },
                            { name: 'Courtney Henry', role: 'Driver' },
                            { name: '', role: '' },

                            { name: 'Albert Flores', role: 'Driver' },
                            /*   { name: 'Esther Howard', role: 'Training . P1000' },
                              null, */
                            { name: '', role: '' },
                            { name: 'Albert Flores', role: 'Driver' },
                            { name: 'Albert Flores', role: 'Driver' },
                          ];

                          const grouped = [];
                          for (let i = 0; i < drivers.length; i++) {
                            const current = drivers[i];
                            const next = drivers[i + 1];
                            if (current && next && next.role.includes('Training')) {
                              grouped.push([current, next]);
                              i++; // Skip next
                            } else {
                              grouped.push(current ? [current] : null);
                            }
                          }

                          return grouped.map((group, index) => (
                            <td className="draggable-item" key={index}>
                              {group &&
                                group.map((driver, idx) =>
                                  driver.name ? (
                                    <div className="driver-box routes-box" key={idx}>
                                      <div className="routes-box-content">
                                        <h6>{driver.name}</h6>
                                        <span>{driver.role}</span>
                                      </div>
                                      <div className="routes-option">
                                        <ul className="routes-edit-option">
                                          <li className="routes-edit">
                                            <a
                                              href="#"
                                              className="edit-shift-form-btn"
                                              onClick={(e) => {
                                                e.preventDefault();
                                                setIsEditFormOpen(true);
                                              }}
                                            >
                                              <img src={`${process.env.PUBLIC_URL}/images/edit-2.png`} alt="" />
                                            </a>
                                          </li>
                                          <li className="driver-routes-trash">
                                            <a href="#">
                                              <img src={`${process.env.PUBLIC_URL}/images/trash.png`} alt="" />
                                            </a>
                                          </li>
                                          <li className="routes-move">
                                            <a href="#">
                                              <img src={`${process.env.PUBLIC_URL}/images/Icon@move.png`} alt="" />
                                            </a>
                                          </li>
                                          <li className="routes-add">
                                            <a href="#" className="create-employee-btn">
                                              <img src={`${process.env.PUBLIC_URL}/images/profile-add-user.svg`} alt="" />
                                            </a>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  ) : null
                                )}
                              <div className="add-drivers">
                                <a href="#" className="add-drivers-btn-1" onClick={handleOpenForm}>
                                  <span className="add-drivers-icon">
                                    <img
                                      src={`${process.env.PUBLIC_URL}/images/profile-add-user.svg`}
                                      alt=""
                                    />
                                  </span>
                                  Add Drivers
                                </a>
                              </div>
                            </td>

                          ));
                        })()}
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {selectedView === 'Day' && <DayTable onAddRouteClick={openAddRouteForm} />}


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
            {/* {isEditFormOpen && ( */}
            <div className="form-outer edit-shift-form">
              <div className="form-overlay">
                <form action="" className="form-modal">
                  <div className="form-modal-inner">
                    <div className="form-header">
                      <h2>Edit Shift for Route 345</h2>
                      <button
                        className="close-btn"
                        onClick={(e) => {
                          e.preventDefault();
                          setIsEditFormOpen(false);
                        }}
                      >
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    </div>
                    <div className="form-body">
                      <div className="edit-shift-content">
                        <div id="employee-wrapper">
                          <div className="form-row cloan-row">
                            <div className="form-group">
                              <label htmlFor="employee">Employee</label>
                              <select id="employee" name="employee">
                                <option>Darrell Steward</option>
                                <option>Darrell Steward 2</option>
                                <option>Darrell Steward 3</option>
                              </select>
                            </div>
                            <div className="form-group">
                              <label htmlFor="jumper">Jumper</label>
                              <select id="jumper" name="jumper">
                                <option>Vazgen Avakyan</option>
                                <option>Vazgen Avakyan 2</option>
                                <option>Vazgen Avakyan 3</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <a href="#" className="add-employee-btn"><span
                            className="add-new-icon"><i
                              className="fa-solid fa-plus"></i></span>Employee</a>
                        </div>
                        <div className="form-group">
                          <label htmlFor="notes">Notes</label>
                            <textarea
                              id="notes"
                              name="notes"
                              rows="2"
                              defaultValue="About 220 Stop mostly Residential"
                            ></textarea>
                        </div>
                      </div>
                    </div>
                    <div className="form-footer">
                      <div className="left-footer">
                        <button
                          className="delete-shift"
                          onClick={(e) => {
                            e.preventDefault();
                            // handle delete logic here
                            setIsEditFormOpen(false);
                          }}
                        >
                          <span className="trash-icon">
                            <img src={`${process.env.PUBLIC_URL}/images/trash.svg`} alt="" />
                          </span>
                          Delete Shift
                        </button>
                      </div>
                      <div className="right-footer">
                        <button
                          className="light-btn cancel-btn"
                          onClick={(e) => {
                            e.preventDefault();
                            setIsEditFormOpen(false);
                          }}
                        >
                          Cancel
                        </button>
                        <button className="dark-btn save-btn" type="submit">
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            {/* )}  */}

            {isAddRouteFormOpen && (
              <div className="form-outer add-route-form show-form">
                <div className="form-overlay">
                  <form action="" className="form-modal">
                    <div className="form-modal-inner">
                      <div className="form-header">
                        <h2>Add Route</h2>
                        <button
                          className="close-btn"
                          type="button"
                          onClick={() => setAddRouteFormOpen(false)}
                        >
                          <i className="fa-solid fa-xmark"></i>
                        </button>
                      </div>

                      <div className="form-body">
                        <div className="add-route-content">
                          <div className="form-row">
                            <div className="form-group">
                              <label htmlFor="route">Route</label>
                              <select id="route" name="route">
                                <option>345</option>
                              </select>
                            </div>
                            <div className="form-group">
                              <label htmlFor="type">Type</label>
                              <select id="type" name="type">
                                <option>Bulk</option>
                              </select>
                            </div>
                          </div>
                          <div className="form-group schedule-group">
                            <label htmlFor="schedule">Schedule</label>
                            <ul className="chack-box-outer">
                              <li className="chack-col all-chack">
                                <input
                                  type="checkbox"
                                  className="all"
                                  checked={checkedDays.all}
                                  onChange={handleAllChange}
                                />
                                <span className="checkmark all-label"></span>
                                <span>All</span>
                              </li>
                              {["sat", "sun", "mon", "tue", "wed", "thu", "fri"].map((day) => (
                                <li className="chack-col" key={day}>
                                  <input
                                    type="checkbox"
                                    id={day}
                                    className="day-checkbox"
                                    checked={checkedDays[day]}
                                    onChange={() => handleDayChange(day)}
                                  />
                                  <span className="checkmark day-label"></span>
                                  <span>{day.charAt(0).toUpperCase() + day.slice(1)}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="form-group">
                            <label htmlFor="notes">Notes</label>
                            <textarea
                              id="notes"
                              name="notes"
                              rows="2"
                              defaultValue="About 220 Stop mostly Residential"
                            ></textarea>
                          </div>
                        </div>
                      </div>

                      <div className="form-footer">
                        <button
                          type="button"
                          className="light-btn cancel-btn"
                          onClick={() => setAddRouteFormOpen(false)}
                        >
                          Cancel
                        </button>
                        <button className="dark-btn add-route-btn" type="submit">
                          Add Route
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {showAddDriverForm && (
              <div className="form-outer add-driver-form">
                <div className="form-overlay">
                  <form className="form-modal" onSubmit={handleSubmit1}>
                    <div className="form-modal-inner">
                      <div className="form-header">
                        <h2>Add Driver</h2>
                        <button className="close-btn" type="button" onClick={handleCloseForm}>
                          <i className="fa-solid fa-xmark"></i>
                        </button>
                      </div>
                      <div className="form-body">
                        <div className="add-driver-content">
                          <div className="form-group">
                            <label htmlFor="driver">Driver</label>
                            <select id="driver" value="">
                              <option>Bryan Lopez Vargas</option>
                              <option>Bryan Lopez Vargas 2</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="form-footer">
                        <button className="light-btn cancel-btn" type="button" onClick={handleCloseForm}>
                          Cancel
                        </button>
                        <button className="dark-btn add-route-Employee" type="submit">Add</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}

            <div className="form-outer route-manager">
              <div className="form-overlay">
                <form className="form-modal" onSubmit={handleSubmit}>
                  <div className="form-modal-inner">
                    <div className="form-header">
                      <h2>Route Manager</h2>
                      <button className="close-btn" type="button">
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    </div>
                    <div className="form-body">
                      <div className="route-manager-content">
                        <div className="form-group">
                          <label htmlFor="employee">Employee</label>
                          <select id="employee" value={employee} onChange={(e) => setEmployee(e.target.value)}>
                            <option>John Jacob</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label htmlFor="notes">Notes</label>
                          <textarea
                            id="notes"
                            rows="2"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-footer">
                      <button className="light-btn cancel-btn" type="button">Cancel</button>
                      <button className="dark-btn manager-save-btn" type="submit">Save</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="form-outer add-employee-form">
              <div className="form-overlay">
                <form className="form-modal" onSubmit={handleSubmit}>
                  <div className="form-modal-inner">
                    <div className="form-header">
                      <h2>Add Employee</h2>
                      <button className="close-btn" type="button">
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    </div>
                    <div className="form-body">
                      <div className="add-employee-content">
                        <div className="form-group">
                          <label htmlFor="employee">Employee</label>
                          <select id="employee" value={employee} onChange={(e) => setEmployee(e.target.value)}>
                            <option>Bryan Lopez Vargas</option>
                            <option>Bryan Lopez Vargas 2</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="form-footer">
                      <button className="light-btn cancel-btn" type="button">Cancel</button>
                      <button className="dark-btn add-route-Employee" type="submit">Add</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="form-outer open-shift-form">
              <div className="form-overlay">
                <form className="form-modal" onSubmit={handleSubmit}>
                  <div className="form-modal-inner">
                    <div className="form-header">
                      <h2>Open Shift</h2>
                      <button type="button" className="close-btn"><i className="fa-solid fa-xmark"></i></button>
                    </div>
                    <div className="form-body">
                      <div className="open-shift-content">
                        <div className="form-group">
                          <label htmlFor="incentive">Incentive</label>
                          <input id="incentive" value={incentive} onChange={(e) => setIncentive(e.target.value)} />
                        </div>
                        <div className="form-group">
                          <label htmlFor="notes">Notes</label>
                          <textarea
                            id="notes"
                            rows="2"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-footer">
                      <button className="light-btn cancel-btn" type="button">Cancel</button>
                      <button className="dark-btn post-now-btn" type="submit">Post Now</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="form-outer create-employee-form">
              <div className="form-overlay">
                <form className="form-modal" onSubmit={handleSubmitEmpl}>
                  <div className="form-modal-inner">
                    <div className="form-header">
                      <h2>Add Employee</h2>
                      <button type="button" className="close-btn"><i className="fa-solid fa-xmark"></i></button>
                    </div>
                    <div className="form-body">
                      <div className="create-employee-content">
                        <ul className="user-list">
                          {users.map((user) => (
                            <li className="user-item" key={user.email}>
                              <div className="user-img">
                                <img src={user.image} alt={user.name} />
                              </div>
                              <div className="user-info">
                                <h5>{user.name}</h5>
                                <p>{user.email}</p>
                              </div>
                              <ul className="chack-box-outer">
                                <li className="chack-col">
                                  <input
                                    type="checkbox"
                                    checked={selectedUsers.includes(user.email)}
                                    onChange={() => toggleUser(user.email)}
                                  />
                                  <span className="checkmark user-checkbox" />
                                </li>
                              </ul>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="form-footer">
                      <div className="left-footer">
                        {/* <button className="add-new-employee-btn" type="button">
                          <span className="add-new-icon"><i className="fa-solid fa-plus" /></span>
                          New Employee
                        </button> */}
                      </div>
                      <div className="right-footer">
                        <button className="light-btn cancel-btn" type="button">Cancel</button>
                        <button className="dark-btn add-Employees" type="submit">Add</button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="form-outer add-new-drivers-form">
              <div className="form-overlay">
                <form action="" className="form-modal">
                  <div className="form-modal-inner">
                    <div className="form-header">
                      <h2>Edit Bryan Lopez Vargas</h2>
                      <button type="button" className="close-btn">
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    </div>
                    <div className="form-body">
                      <div className="add-route-content">
                        <div className="form-group schedule-group">
                          <label htmlFor="schedule">Schedule</label>
                          <ul className="chack-box-outer">
                            <li className="chack-col all-chack">
                              <input
                                type="checkbox"
                                className="all"
                                checked={checkedDays.all}
                                onChange={handleAllChange}
                              />
                              <span className="checkmark all-label"></span>
                              <span>All</span>
                            </li>
                            {["sat", "sun", "mon", "tue", "wed", "thu", "fri"].map((day) => (
                              <li className="chack-col" key={day}>
                                <input
                                  type="checkbox"
                                  id={day}
                                  className="day-checkbox"
                                  checked={checkedDays[day]}
                                  onChange={() => handleDayChange(day)}
                                />
                                <span className="checkmark day-label"></span>
                                <span>{day.charAt(0).toUpperCase() + day.slice(1)}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="form-group">
                          <label htmlFor="notes">Notes</label>
                          <textarea
                            id="notes"
                            name="notes"
                            rows="2"
                            defaultValue="Easy to manage CSA"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                    <div className="form-footer">
                      <button type="button" className="light-btn cancel-btn">Cancel</button>
                      <button type="submit" className="dark-btn btn-add-new-rmployee">Add</button>
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

export default CompanyStationPage;
