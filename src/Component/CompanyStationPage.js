import React, { useState, useEffect } from 'react';
import { flushSync } from 'react-dom';
import Header from './header';
import Sidebar from './sidebar';
import {
    DndContext,
    DragOverlay,
    useSensor,
    useSensors,
    PointerSensor,
    rectIntersection,
    closestCenter,
} from '@dnd-kit/core';

import DayCell from './DayCell';
import { Item } from './Item';
import EditShiftModal from './EditShiftModal';
import AddEmployeeModal from './AddEmployeeModal';
import DayTable from './dayTable';



// Use your days with consistent IDs and labels
const days = [
    { id: 'day-28', label: 'Sat 28' },
    { id: 'day-29', label: 'Sun 29' },
    { id: 'day-30', label: 'Mon 30' },
    { id: 'day-31', label: 'Tue 31' },
    { id: 'day-1', label: 'Wed 1' },
    { id: 'day-2', label: 'Thu 2' },
    { id: 'day-3', label: 'Fri 3' },
];



const shiftStatusMap = {
    'day-28': { status: 'alert', shiftCount: 1, tooltipText: '1 shift remain empty' },
    'day-29': { status: 'alert', shiftCount: 1, tooltipText: '1 shift remain empty' },
    'day-30': { status: 'ok', shiftCount: 0 },
    'day-31': { status: 'alert', shiftCount: 2, tooltipText: '2 shift remain empty' },
    'day-1': { status: 'ok', shiftCount: 0 },
    'day-2': { status: 'alert', shiftCount: 1, tooltipText: '1 shift remain empty' },
    'day-3': { status: 'alert', shiftCount: 2, tooltipText: '2 shift remain empty' },
};

// Rows based on routes with IDs and titles
const rows = [
    { id: 'dispatch', title: 'Dispatch', icon: `${process.env.PUBLIC_URL}/images/truck-fast.svg`, location: 'King of Prussia', },
    { id: 'bulk', title: '123', icon: `${process.env.PUBLIC_URL}/images/table-routing.svg`, location: 'Bulk', },
    { id: 'city1', title: '143', icon: `${process.env.PUBLIC_URL}/images/table-routing.svg`, location: 'City', },
    { id: 'rural1', title: '234', icon: `${process.env.PUBLIC_URL}/images/table-routing.svg`, location: 'Rural', },
    { id: 'city2', title: '140', icon: `${process.env.PUBLIC_URL}/images/table-routing.svg`, location: 'City', },
    { id: 'city3', title: '243', icon: `${process.env.PUBLIC_URL}/images/table-routing.svg`, location: 'City', },
    { id: 'rural2', title: '153', icon: `${process.env.PUBLIC_URL}/images/table-routing.svg`, location: 'Rural', },
];

// Your initial data, keyed by `${rowId}-${dayId}` and each cell having array of items
const initialItemsByCell = {
    // Dispatch row (row 0)
    'dispatch-day-28': [{ id: 'Jacob0|dispatch-day-28', label: 'Jacob Jones', title: 'Junior Manager', class_type: 'manager-box' }],
    'dispatch-day-29': [{ id: 'Jacob1|dispatch-day-29', label: 'Jacob Jones 1', title: 'Junior Manager', class_type: 'manager-box' }],
    'dispatch-day-30': [{ id: 'Jacob2|dispatch-day-30', label: 'Jacob Jones 2', title: 'Junior Manager', class_type: 'manager-box' }],
    'dispatch-day-31': [{ id: 'Jacob3|dispatch-day-31', label: 'Jacob Jones 3', title: 'Junior Manager', class_type: 'manager-box' }],
    'dispatch-day-1': [], // unassigned empty cell
    'dispatch-day-2': [{ id: 'Jacob4|dispatch-day-2', label: 'Jacob Jones 4', title: 'Junior Manager', class_type: 'manager-box' }],
    'dispatch-day-3': [{ id: 'Jacob5|dispatch-day-3', label: 'Jacob Jones 5', title: 'Junior Manager', class_type: 'manager-box' }],

    // Bulk row (row 1)
    'bulk-day-28': [
        { id: 'Cameron0|bulk-day-28', label: 'Cameron Williamson', title: 'Driver', class_type: 'driver-box' },
        { id: 'Ketthy1|bulk-day-28', label: 'Ketthy', title: 'Training', class_type: 'training-box' },
    ],
    'bulk-day-29': [{ id: 'Darlene1|bulk-day-29', label: 'Darlene Robertson', title: 'Driver', class_type: 'driver-box' }],
    'bulk-day-30': [{ id: 'Cameron2|bulk-day-30', label: 'Cameron Williamson', title: 'Driver', class_type: 'driver-box' }],
    'bulk-day-31': [], // unassigned
    'bulk-day-1': [{ id: 'Cameron3|bulk-day-1', label: 'Cameron Williamson', title: 'Driver', class_type: 'driver-box' }],
    'bulk-day-2': [{ id: 'Darlene2|bulk-day-2', label: 'Darlene Robertson', title: 'Driver', class_type: 'driver-box' }],
    'bulk-day-3': [],

    // City 143 (row 2)
    'city1-day-28': [{ id: 'Cameron4|city1-day-28', label: 'Cameron Williamson', title: 'Driver', class_type: 'driver-box' }],
    'city1-day-29': [], // unassigned
    'city1-day-30': [{ id: 'Unknown1|city1-day-30', label: '', title: '', class_type: 'blank-col' }], // assigned but no name
    'city1-day-31': [{ id: 'Marvin1|city1-day-31', label: 'Marvin McKlnney', title: 'Driver', class_type: 'driver-box' }],
    'city1-day-1': [{ id: 'Albert1|city1-day-1', label: 'Albert Flores', title: 'Driver', class_type: 'driver-box' }],
    'city1-day-2': [{ id: 'Theresa1|city1-day-2', label: 'Theresa Webb', title: 'Driver', class_type: 'driver-box' }],
    'city1-day-3': [{ id: 'Courteney1|city1-day-3', label: 'Courteney Henery', title: 'Driver', class_type: 'driver-box' }],

    // Rural 234 (row 3)
    'rural1-day-28': [{ id: 'Darrell1|rural1-day-28', label: 'Darrell Steward', title: 'Driver', class_type: 'driver-box' }],
    'rural1-day-29': [{ id: 'Cameron5|rural1-day-29', label: 'Cameron Williamson', title: 'Driver', class_type: 'driver-box' }],
    'rural1-day-30': [{ id: 'Floyd1|rural1-day-30', label: 'Floyd Miles', title: 'Driver', class_type: 'driver-box' }],
    'rural1-day-31': [{ id: 'Darlene3|rural1-day-31', label: 'Darlene Robertson', title: 'Driver', class_type: 'driver-box' }],
    'rural1-day-1': [{ id: 'Leslie1|rural1-day-1', label: 'Leslie Alexander', title: 'Driver', class_type: 'driver-box' }],
    'rural1-day-2': [{ id: 'Eleanor1|rural1-day-2', label: 'Eleanor Pena', title: 'Driver', class_type: 'driver-box' }],
    'rural1-day-3': [],

    // City 140 (row 4)
    'city2-day-28': [{ id: 'Savannah1|city2-day-28', label: 'Savannah Nguyen', title: 'Driver', class_type: 'driver-box' }],
    'city2-day-29': [{ id: 'Darlene4|city2-day-29', label: 'Darlene Robertson', title: 'Driver', class_type: 'driver-box' }],
    'city2-day-30': [{ id: 'Leslie2|city2-day-30', label: 'Leslie Alexander', title: 'Driver', class_type: 'driver-box' }],
    'city2-day-31': [{ id: 'Jane1|city2-day-31', label: 'Jane Williamson', title: 'Driver', class_type: 'driver-box' }],
    'city2-day-1': [{ id: 'Dianne1|city2-day-1', label: 'Dianne Russell', title: 'Driver', class_type: 'driver-box' }],
    'city2-day-2': [], // assigned true but no name/title — show empty
    'city2-day-3': [{ id: 'Guy1|city2-day-3', label: 'Guy Hawkins', title: 'Driver', class_type: 'driver-box' }],

    // City 243 (row 5)
    'city3-day-28': [{ id: 'Unknown2|city3-day-28', label: '', title: '', class_type: 'blank-col' }],
    'city3-day-29': [{ id: 'Cameron6|city3-day-29', label: 'Cameron Williamson', title: 'Driver', class_type: 'driver-box' }],
    'city3-day-30': [{ id: 'Robert1|city3-day-30', label: 'Robert Fox', title: 'Driver', class_type: 'driver-box' }],
    'city3-day-31': [{ id: 'Darlene5|city3-day-31', label: 'Darlene Robertson', title: 'Driver', class_type: 'driver-box' }],
    'city3-day-1': [{ id: 'Jenny1|city3-day-1', label: 'Jenny Wilson', title: 'Driver', class_type: 'driver-box' }],
    'city3-day-2': [{ id: 'Darlene6|city3-day-2', label: 'Darlene Robertson', title: 'Driver', class_type: 'driver-box' }],
    'city3-day-3': [{ id: 'Wade1|city3-day-3', label: 'Wade Warren', title: 'Driver', class_type: 'driver-box' }],

    // Rural 153 (row 6)
    'rural2-day-28': [],
    'rural2-day-29': [{ id: 'Unknown3|rural2-day-29', label: '', title: '', class_type: 'blank-col' }],
    'rural2-day-30': [{ id: 'Theresa2|rural2-day-30', label: 'Theresa Webb', title: 'Driver', class_type: 'driver-box' }],
    'rural2-day-31': [],
    'rural2-day-1': [{ id: 'Unknown4|rural2-day-1', label: '', title: '', class_type: 'blank-col' }],
    'rural2-day-2': [{ id: 'Ronald1|rural2-day-2', label: 'Ronald Richards', title: 'Driver', class_type: 'driver-box' }],
    'rural2-day-3': [],
};


export default function App() {

    const openAddRouteForm = () => setAddRouteFormOpen(true);
    const [isAddRouteFormOpen, setAddRouteFormOpen] = useState(false);
    const [checkedDays, setCheckedDays] = useState(
        { all: false, sat: false, sun: false, mon: false, tue: false, wed: false, thu: false, fri: false, }
    );
    const handleDayChange = (day) => {
        const updated = {
            ...checkedDays,
            [day]: !checkedDays[day],
        };
        const allChecked = ["sat", "sun", "mon", "tue", "wed", "thu", "fri"].every(
            (d) => d === day ? !checkedDays[d] : checkedDays[d]
        );
        updated.all = allChecked;
        setCheckedDays(updated);
    };

    const handleAllChange = () => {
        const newValue = !checkedDays.all;
        setCheckedDays({
            all: newValue, sat: newValue, sun: newValue, mon: newValue, tue: newValue, wed: newValue, thu: newValue, fri: newValue,
        });
    };

    const [showAddDriverForm, setShowAddDriverForm] = useState(false);
    const [isEditFormOpen, setIsEditFormOpen] = useState(false);
    const handleOpenForm = () => setShowAddDriverForm(true);
    const handleCloseForm = () => setShowAddDriverForm(false);
    const handleSubmit1 = (e) => {
        e.preventDefault();
        // Your submit logic
        handleCloseForm(); // Optional: close form on submit
    };

    const [activeItem, setActiveItem] = useState(null);
    const [activeId, setActiveId] = useState(null);
    const [itemsByCell, setItemsByCell] = useState(initialItemsByCell);

    const sensors = useSensors(useSensor(PointerSensor));
    const [overId, setOverId] = useState(null);

    const handleDragStart = (event) => {
        setActiveId(event.active.id);
        const [, fromCell] = event.active.id.split('|');
        const item = itemsByCell[fromCell]?.find(i => i.id === event.active.id);
        setActiveItem(item); // Save full item object for overlay
    };

    const handleDragOver = (event) => {
        if (event.over?.id) {
            setOverId(event.over.id);
        }
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        setActiveId(null);
        setOverId(null);

        if (!over) return;

        const [, fromCell] = active.id.split('|');
        const [, toCell] = over.id.split('|');

        // Same cell, no movement needed
        if (fromCell === toCell) return;

        setItemsByCell((prev) => {
            const draggedItem = prev[fromCell]?.find(i => i.id === active.id);
            if (!draggedItem) return prev;

            const newState = { ...prev };

            // Remove from source cell
            newState[fromCell] = prev[fromCell].filter(i => i.id !== active.id);

            // Extract original item ID (before `|cellId`)
            const [baseItemId] = active.id.split('|');

            // Create a new item with updated ID for the new cell
            const newItem = {
                ...draggedItem,
                id: `${baseItemId}|${toCell}`
            };

            // Add to destination cell
            newState[toCell] = [
                ...(prev[toCell] || []),
                newItem
            ];

            return newState;
        });

        setActiveItem(null);
    };

    /* add shift employee form dispatch route */
    const [showAddShiftAddEmployee, setShowAddShiftAddEmployee] = useState(false);
    const [employee, setEmployee] = useState('Bryan Lopez Vargas');
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Selected Employee:', employee);
        setShowAddShiftAddEmployee(false); // or any other logic you want
    };
    /* add shift employee form dispatch route */
    /* open shift form */
    const handleSubmitOpenShift = (e) => {
        e.preventDefault();
        console.log('Selected Employee:', employee);
        setIncentive('');
        setNotes('');
        setShowOpenShiftForm(false); // or any other logic you want
    };
    const handleCancel = () => {
        setIncentive('');
        setNotes('');
        setShowOpenShiftForm(false);
    };

    const [showOpenShiftForm, setShowOpenShiftForm] = useState(false); // ✅ lowercase 's'
    const [incentive, setIncentive] = useState('$25');
    const [notes, setNotes] = useState('About 220 Stop mostly Residential');

    /* open shift form */

    const [editItem, setEditItem] = useState(null);
    const [editRoute, setEditRoute] = useState(null);
    const [showAddEmployee, setShowAddEmployee] = useState(false);
    const [emptyCellKey, setEmptyCellKey] = useState(null);
    const [selectedView, setSelectedView] = useState('Week');
    const [filterOpen, setFilterOpen] = useState(false);
    const [smartOpen, setSmartOpen] = useState(false);
    const [activeAssignCell, setActiveAssignCell] = useState(null);

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
                    <DndContext
                        collisionDetection={closestCenter}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                        onDragOver={handleDragOver}
                    >
                        <div className="schedule-table">
                            <div className="calendar-container">
                                {selectedView === 'Week' && (
                                    <div className="week-table week-table-show">
                                        <table className="route-calendar" >
                                            <thead>
                                                <tr>
                                                    <th className="table-left-title">Routes</th>
                                                    {days.map((day) => {
                                                        const shift = shiftStatusMap[day.id] || { status: 'ok', shiftCount: 0 };

                                                        return (
                                                            <th key={day.id}>
                                                                <p className="rout-date">{day.label}</p>
                                                                {shift.status === 'alert' ? (
                                                                    <span className="route-alert">
                                                                        <span className="alert-icon">
                                                                            <i className="fa-solid fa-triangle-exclamation"></i>
                                                                        </span>
                                                                        <p className="rout-number">{shift.shiftCount}</p>
                                                                        <div className="alert-tuol-tip">
                                                                            <p>{shift.tooltipText}</p>
                                                                        </div>
                                                                    </span>
                                                                ) : (
                                                                    <span className="route-ok">
                                                                        <span className="ok-icon">
                                                                            <i className="fa-regular fa-circle-check"></i>
                                                                        </span>
                                                                        <p className="rout-number"></p>
                                                                    </span>
                                                                )}
                                                            </th>
                                                        );
                                                    })}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {rows.map((row) => (
                                                    <tr key={row.id} className={row.id + ' droppable-area1'}>
                                                        <td className="routes-col dispatch-col">
                                                            <div className="routes-col-row">
                                                                <div className="routes-col-icon">
                                                                    <img src={row.icon} alt="" />
                                                                </div>
                                                                <div className="routes-col-content">
                                                                    <h5>{row.title}</h5>
                                                                    <span className="location">{row.location}</span>
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
                                                        {days.map((day) => {
                                                            const cellId = `${row.id}-${day.id}`;
                                                            const main_class = `${row.class_type}`;
                                                            const cellItems = initialItemsByCell[cellId] || [];
                                                            const cellClassType = cellItems.length > 0 && cellItems[0].class_type ? cellItems[0].class_type : '';
                                                            const isOver = overId === `cell|${cellId}`;
                                                            const isDraggingFromHere = activeId?.split('|')[1] === cellId;

                                                            const defaultStyle = {

                                                                minHeight: 60,

                                                                backgroundColor: isOver
                                                                    ? '#1D1858'
                                                                    : isDraggingFromHere
                                                                        ? '#7b87f5'
                                                                        : undefined,

                                                            };

                                                            const disabledStyle = {
                                                            };

                                                            const cellStyle =
                                                                (itemsByCell[cellId] || []).class_type === 'not-assigned-outer'
                                                                    ? disabledStyle
                                                                    : defaultStyle;
                                                            return (

                                                                <td data-cell-id={`${cellId}`} className={`${cellClassType === 'not-assigned-outer' ? 'cellClassType' : ''} ${cellClassType === 'blank-col' ? 'blank-col' : ''}  draggable-item`}
                                                                    key={cellId}
                                                                    style={defaultStyle}
                                                                >
                                                                    <DayCell
                                                                        id={`cell|${cellId}`}
                                                                        class_name={cellClassType}
                                                                        items={itemsByCell[cellId] || []}
                                                                        onEdit={(item) => {
                                                                            setEditItem(item);
                                                                            setEditRoute(cellId.split('-')[0]);
                                                                            setShowAddEmployee(false); // 🔵 Driver form
                                                                        }}
                                                                        onAdd={(item) => {
                                                                            setShowAddEmployee(true); // 🔵 Trigger only driver form
                                                                            setEditItem(null);
                                                                            setShowAddShiftAddEmployee(false);
                                                                        }}
                                                                        onAddEmployeeForm={() => {
                                                                            setShowAddEmployee(false);
                                                                            setTimeout(() => setShowAddShiftAddEmployee(true), 0);
                                                                        }}
                                                                        openShiftForm={() => {
                                                                            setTimeout(() => setShowOpenShiftForm(true), 0);
                                                                        }}

                                                                        activeId={activeId}
                                                                        overId={overId}
                                                                        isAssignActive={activeAssignCell === cellId}
                                                                        onToggleAssign={() =>
                                                                            setActiveAssignCell((prev) => (prev === cellId ? null : cellId))
                                                                        }
                                                                        cellStyleFromParent={cellStyle}
                                                                    />

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

                                                        return grouped.map((group, index) => {
                                                            const cellId = `standby-${index}`;

                                                            // Generate the initial items for this cell
                                                            const initialItems = (group || [])
                                                                .filter((driver) => (driver?.name || '').trim() !== '')
                                                                .map((driver, idx) => ({
                                                                    id: `drv-${index}-${idx}|${cellId}`,
                                                                    label: driver.name,
                                                                    title: driver.role,
                                                                    class_type: 'driver-box',
                                                                }));

                                                            // ✅ Ensure the cell exists in itemsByCell so drag won't break
                                                            if (!itemsByCell[cellId]) {
                                                                itemsByCell[cellId] = initialItems;
                                                            }

                                                            const standbyItems = itemsByCell[cellId];

                                                            const isOver = overId === `cell|${cellId}`;
                                                            const isDraggingFromHere = activeId?.split('|')[1] === cellId;

                                                            const cellStyle = {
                                                                backgroundColor: isOver
                                                                    ? '#1D1858'
                                                                    : isDraggingFromHere
                                                                        ? '#7b87f5'
                                                                        : undefined,

                                                            };

                                                            return (
                                                                <td
                                                                    className="draggable-item"
                                                                    key={cellId}
                                                                    style={{ verticalAlign: 'top', border: '1px solid #ccc' }}
                                                                >
                                                                    <DayCell
                                                                        id={`cell|${cellId}`}
                                                                        class_name="stand-drivers"
                                                                        items={standbyItems}
                                                                        onEdit={(item) => {
                                                                            setEditItem(item);
                                                                        }}
                                                                        onAdd={handleOpenForm}
                                                                        activeId={activeId}
                                                                        overId={overId}
                                                                        isAssignActive={activeAssignCell === cellId}
                                                                        onToggleAssign={() =>
                                                                            setActiveAssignCell((prev) =>
                                                                                prev === cellId ? null : cellId
                                                                            )
                                                                        }
                                                                        cellStyleFromParent={cellStyle}
                                                                    />

                                                                    <div className="add-drivers">
                                                                        <a
                                                                            href="#"
                                                                            className="add-drivers-btn-1"
                                                                            onClick={handleOpenForm}
                                                                        >
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
                                                            );
                                                        });
                                                    })()}

                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                                {selectedView === 'Day' && <DayTable onAddRouteClick={openAddRouteForm} />}
                            </div>
                            {showAddShiftAddEmployee && (
                                <div className="form-outer add-employee-form show-form">
                                    <div className="form-overlay">
                                        <form className="form-modal" onSubmit={handleSubmit}>
                                            <div className="form-modal-inner">
                                                <div className="form-header">
                                                    <h2>Add Employee</h2>
                                                    <button
                                                        className="close-btn"
                                                        type="button"
                                                        onClick={() => setShowAddShiftAddEmployee(false)}
                                                    >
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
                                                    <button className="light-btn cancel-btn" type="button" onClick={() => setShowAddShiftAddEmployee(false)}>Cancel</button>
                                                    <button className="dark-btn add-route-Employee" type="submit">Add</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            )}
                            {/* open shift form */}
                            {showOpenShiftForm && (
                                <div className="form-outer open-shift-form show-form">
                                    <div className="form-overlay">
                                        <form className="form-modal" onSubmit={handleSubmitOpenShift}>
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
                                                    <button className="light-btn cancel-btn" type="button" onClick={handleCancel}>Cancel</button>
                                                    <button className="dark-btn post-now-btn" type="submit">Post Now</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            )}

                            {/* open publish form */}
                            <div className="form-outer publish-shift-form show-form">
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

                        {isEditFormOpen && (
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

                        {editItem && !showAddEmployee && (
                            <EditShiftModal
                                routeName={editRoute}
                                onClose={() => setEditItem(null)}
                            />
                        )}

                        {showAddEmployee && !editItem && (
                            <AddEmployeeModal
                                onClose={() => setShowAddEmployee(false)}
                            />
                        )}
                        <DragOverlay>
                            {activeItem ? (
                                <Item
                                    {...activeItem}
                                    class_type={activeItem.class_type}
                                    dragOverlay={true} // optional flag to adjust visuals
                                />
                            ) : null}
                        </DragOverlay>
                    </DndContext>
                </div>
            </main>
        </div>
    );
}
