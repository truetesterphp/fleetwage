import React, { useRef, useEffect, useState } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  useDndMonitor
} from '@dnd-kit/core';
import {
  SortableContext,
  rectSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Add this import to include the necessary CSS
import '../App.css';
import EditShiftModal from './EditShiftModal';

// SortableItem component with a drag handle
const SortableItem = ({ id, children, class_type }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0 : 1,
    touchAction: 'none',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {class_type ? (
        <div className={`routes-box ${class_type}`}>
          {children}
        </div>
      ) : (
        children
      )}
    </div>
  );
};

// DragOverlayContent to customize the look of the item while dragging
const DragOverlayContent = ({ activeId, findPersonById }) => {
  const person = findPersonById(activeId)?.person;
  if (!person) return null;

  const style = {
    //backgroundColor: person.class_type === 'driver-box' ? '#7b87f5' : '#1D1858',
    padding: '8px 12px',
    borderRadius: '8px',
    cursor: 'grabbing',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  };

  return (
    <div className={`${person.class_type} routes-box`} style={style}>
      <div className="routes-box-content">
        <h6>{person.name}</h6>
        <span>{person.role}</span>
      </div>
    </div>
  );
};

const DayTable = ({ onAddRouteClick }) => {
  const selectedDayId = 'day-28';

  const [routeHeadersDayWise, setRouteHeadersDayWise] = useState([
    {
      id: 'dispatch',
      icon: `${process.env.PUBLIC_URL}/images/truck-fast.svg`,
      title: 'Dispatch',
      location: 'King of Prussia',
      options: [{ label: 'Edit', icon: `${process.env.PUBLIC_URL}/images/edit-2.png`, className: 'edit-option', link: '#' }, { label: 'Remove', icon: `${process.env.PUBLIC_URL}/images/trash.png`, className: 'remove-option', link: '#' }],
      history: { stops: 2340, packages: 4321 },
      days: [{
        id: 'day-28',
        assignments: [{ id: 'jacob-jones-dispatch', name: 'Jacob Jones', role: 'Junior Manager', assigned: true, class_type: 'manager-box' }],
        notes: { title: 'Easy to manage CSA', description: 'Bell stops at 9:15 AM' }
      }]
    },
    {
      id: 'bulk',
      icon: `${process.env.PUBLIC_URL}/images/table-routing.svg`,
      title: '123',
      location: 'Bulk',
      options: [],
      history: { stops: 2340, packages: 4321 },
      days: [{
        id: 'day-28',
        assignments: [{ id: 'jacob-jones-bulk', name: 'Jacob Jones', role: 'Driver', assigned: true, class_type: 'driver-box' }, { id: 'kathryn-murphy-123', name: 'Kathryn Murphy', role: 'Trainer', assigned: true, class_type: 'training-box' }],
        notes: { title: 'Heavy business area', description: 'Late Pick up' }
      }]
    },
    {
      id: 'city',
      icon: `${process.env.PUBLIC_URL}/images/table-routing.svg`,
      title: '143',
      location: 'City',
      options: [],
      history: { stops: 1400, packages: 2800 },
      days: [{
        id: 'day-28',
        assignments: [{ id: 'theresa-webb-143', name: 'Theresa Webb', role: 'Driver', assigned: true, class_type: 'driver-box' }],
        notes: { title: 'Mostly Residential', description: 'Adult signature is required!!' }
      }]
    },
    {
      id: 'rural',
      icon: `${process.env.PUBLIC_URL}/images/table-routing.svg`,
      title: '234',
      location: 'Rural',
      options: [],
      history: { stops: 1230, packages: 3100 },
      days: [{
        id: 'day-28',
        assignments: [{ id: 'eleanor-pena-234', name: 'Eleanor Pena', role: 'Driver', assigned: true, class_type: 'driver-box' }],
        notes: { title: 'Mostly Residential', description: 'Adult signature is required!!' }
      }]
    },
    {
      id: 'city-140',
      icon: `${process.env.PUBLIC_URL}/images/table-routing.svg`,
      title: '140',
      location: 'City',
      options: [],
      history: { stops: 1100, packages: 2400 },
      days: [{
        id: 'day-28',
        assignments: [], // Changed to empty array for unassigned
        notes: { title: ' ', description: ' ' }
      }]
    },
    {
      id: 'city-243',
      icon: `${process.env.PUBLIC_URL}/images/table-routing.svg`,
      title: '243',
      location: 'City',
      options: [],
      history: { stops: 1300, packages: 2700 },
      days: [{
        id: 'day-28',
        assignments: [], // Changed to empty array for unassigned
        notes: { title: 'Heavy business area', description: 'Late Pick up' }
      }]
    },
    {
      id: 'rural-234-2', // Unique ID to avoid conflicts
      icon: `${process.env.PUBLIC_URL}/images/table-routing.svg`,
      title: '234',
      location: 'Rural',
      options: [],
      history: { stops: 1230, packages: 3100 },
      days: [{
        id: 'day-28',
        assignments: [{ id: 'darrell-steward-234', name: 'Darrell Steward', role: 'Driver', assigned: true, class_type: 'driver-box' }],
        notes: { title: 'Heavy business area', description: 'Late Pick up' }
      }]
    },
    {
      id: 'bulk-2',
      icon: `${process.env.PUBLIC_URL}/images/table-routing.svg`,
      title: '123',
      location: 'Bulk',
      options: [],
      history: { stops: 2340, packages: 4321 },
      days: [{
        id: 'day-28',
        assignments: [{ id: 'jacob-jones-bulk-2', name: 'Jacob Jones', role: 'Driver', assigned: true, class_type: 'driver-box' }, { id: 'kathryn-murphy-bulk-2', name: 'Kathryn Murphy', role: 'Trainer', assigned: true, class_type: 'training-box' }],
        notes: { title: 'Heavy business area', description: 'Late Pick up' }
      }]
    },
    {
      id: 'city-143-2', // Unique ID to avoid conflicts
      icon: `${process.env.PUBLIC_URL}/images/table-routing.svg`,
      title: '143',
      location: 'City',
      options: [],
      history: { stops: 1670, packages: 2890 },
      days: [{
        id: 'day-28',
        assignments: [{ id: 'arlene-mccoy-143', name: 'Arlene McCoy', role: 'Driver', assigned: true, class_type: 'driver-box' }],
        notes: { title: 'Mostly Residential', description: 'Adult signature is required!!' }
      }]
    },
    {
      id: 'rural-153',
      icon: `${process.env.PUBLIC_URL}/images/table-routing.svg`,
      title: '153',
      location: 'Rural',
      options: [],
      history: { stops: 1425, packages: 2700 },
      days: [{
        id: 'day-28',
        assignments: [], // Changed to empty array for unassigned
        notes: { title: 'Mostly Residential', description: 'Adult signature is required!!' }
      }]
    }
  ]);

  const [standbyDrivers, setStandbyDrivers] = useState([
    {
      id: 'leslie-alexander-standby',
      name: 'Leslie Alexander',
      role: 'Driver',
      class_type: 'driver-box',
    },
  ]);

  const [activeId, setActiveId] = useState(null);
  const [overId, setOverId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  const findPersonById = (id) => {
    let person = null;
    let containerId = null;

    // Search through routes
    for (const route of routeHeadersDayWise) {
      const day = route.days.find(d => d.id === selectedDayId);
      if (day) {
        const found = day.assignments.find(p => p.id === id);
        if (found) {
          person = found;
          containerId = route.id;
          break;
        }
      }
    }

    // If not found, search standby drivers
    if (!person) {
      const foundStandby = standbyDrivers.find(p => p.id === id);
      if (foundStandby) {
        person = foundStandby;
        containerId = 'standby-drivers';
      }
    }
    return { person, containerId };
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);
    setOverId(null);

    if (!over) return;

    let personToMove = findPersonById(active.id).person;
    if (!personToMove) return;

    const sourceContainerId = findPersonById(active.id).containerId;

    let destinationContainerId = null;

    // Check if the drop target is the unassigned placeholder
    if (over.id.startsWith("unassigned-")) {
      destinationContainerId = over.id.replace("unassigned-", "");
    }
    // New check: If the drop target is the standby placeholder
    else if (over.id === 'standby-placeholder') {
      destinationContainerId = 'standby-drivers';
    }
    // All other cases
    else {
      destinationContainerId = findPersonById(over.id).containerId || over.id;
    }

    if (!destinationContainerId || sourceContainerId === destinationContainerId) return;

    // Update state based on drag and drop
    setRouteHeadersDayWise(prevRoutes => {
      const newRoutes = prevRoutes.map(r => ({ ...r, days: r.days.map(d => ({ ...d, assignments: [...d.assignments] })) }));

      // Remove from source
      if (sourceContainerId !== 'standby-drivers') {
        const sourceRoute = newRoutes.find(r => r.id === sourceContainerId);
        if (sourceRoute) {
          const day = sourceRoute.days.find(d => d.id === selectedDayId);
          if (day) day.assignments = day.assignments.filter(p => p.id !== active.id);
        }
      }

      // Add to destination
      if (destinationContainerId !== 'standby-drivers') {
        const destinationRoute = newRoutes.find(r => r.id === destinationContainerId);
        if (destinationRoute) {
          const day = destinationRoute.days.find(d => d.id === selectedDayId);
          if (day) day.assignments.push(personToMove);
        }
      }
      return newRoutes;
    });

    setStandbyDrivers(prevDrivers => {
      if (sourceContainerId === 'standby-drivers') {
        return prevDrivers.filter(p => p.id !== active.id);
      }
      if (destinationContainerId === 'standby-drivers') {
        return [...prevDrivers, personToMove];
      }
      return prevDrivers;
    });
  };

  // NEW: Refactored function to get a class name
  const getDroppableClassName = (routeId) => {
    const isOver = overId === routeId || overId === `unassigned-${routeId}` || (activeId && findPersonById(overId).containerId === routeId);
    const { containerId } = findPersonById(activeId);
    const isSource = containerId === routeId;

    if (isOver) {
      return 'droppable-highlight';
    }
    if (isSource) {
      return 'draggable-source-highlight';
    }
    return '';
  };

  const standbyDriverRow = {
    title: "Stand by Drivers",
    location: "King of Prussia",
    icon: "Icon@validation-approval.svg",
    options: [
      { label: 'Edit', icon: 'edit-2.png', className: 'edit-option' },
      { label: 'Remove', icon: 'trash.png', className: 'remove-option' },
    ],
    notes: {
      title: 'No Notes',
      description: '',
    }
  };

  /* forms */
  const [showAddDriverForm, setShowAddDriverForm] = useState(false);

  /* unassinged menu */
  const [unassignedMenuId, setUnassignedMenuId] = useState(null);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const handleOpenForm = (e) => {
    e.preventDefault(); // This is the key line
    setShowAddDriverForm(true);
  };
  const handleCloseForm = () => {
    setShowAddDriverForm(false);
    setUnassignedMenuId(null); // This closes the menu when the form closes
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Your submit logic
    handleCloseForm(); // Optional: close form on submit
  };

  // Effect to handle clicks outside the menu
  useEffect(() => {
    const handleOutsideClick = (event) => {
      const clickedMenu = menuRef.current?.contains(event.target);
      const clickedButton = buttonRef.current?.contains(event.target);

      if (!clickedMenu && !clickedButton) {
        setUnassignedMenuId(null);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);


  const [incentive, setIncentive] = useState('$25');
  const [notes, setNotes] = useState('About 220 Stop mostly Residential');

  const [showOpenShiftForm, setShowOpenShiftForm] = useState(false);

  const handleOpenShiftForm = () => {
    setShowOpenShiftForm(true);
  };

  const handleCloseShiftForm = () => {
    setShowOpenShiftForm(false);
  };

  const handleCloseOpenShiftForm = () => {
    setShowOpenShiftForm(false);
  };
  const handleSubmitOpenShift = (e) => {
    e.preventDefault();
    // Your logic to handle the form submission (e.g., make an API call)
    console.log("Open Shift form submitted!");
    handleCloseOpenShiftForm(); // Close the form after submission
  };

  /* edit employee  */

  const [editingShift, setEditingShift] = useState(null);
  const handleOpenEditShiftModal = (route) => {
    setEditingShift(route);
  };
  // Function to close the modal
  const handleCloseEditShiftModal = () => {
    setEditingShift(null);
  };

  // You will also need to add a handleSubmit function for the form.
  const handleSubmitEditShift = (e) => {
    e.preventDefault();
    // Logic to save the edited shift data
    handleCloseEditShiftModal(); // Close the modal after saving
  };
  /* Add route form */
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

  const stopDragHandler = (e) => {
    e.stopPropagation();
  };

const handleDelete = (e, name) => {
  e.stopPropagation();
  alert(`Delete clicked for ${name}`);
};

  return (
    <div className="day-table day-table-show">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={({ active }) => setActiveId(active.id)}
        onDragOver={({ over }) => setOverId(over?.id || null)}
        onDragEnd={handleDragEnd}
        onDragCancel={() => { setActiveId(null); setOverId(null); }}
      >
        <table className="route-calendar">
          <thead>
            <tr>
              <th className="table-left-title">Routes</th>
              <th className="table-left-title table-day">Thu 2</th>
              <th className="table-left-title notes-col">Route Notes</th>
            </tr>
          </thead>
          <tbody>
            {routeHeadersDayWise.map((route, index) => {
              const dayData = route.days.find(day => day.id === selectedDayId);
              const assignments = dayData?.assignments || [];
              const notes = dayData?.notes || {};

              const hasAssigned = assignments.length > 0;
              const hasNotes = notes.title.trim() || notes.description.trim();

              const baseClassName = hasAssigned
                ? 'table-day-col draggable-item'
                : (hasNotes ? 'not-assigned draggable-item' : 'blank-col draggable-item');

              const isMultiAssigned = assignments.length > 1;

              const items = hasAssigned ? assignments.map(p => p.id) : [`unassigned-${route.id}`];

              return (
                <tr key={route.id} className="dispatch droppable-area1">
                  <td className="routes-col dispatch-col">
                    <div className="routes-col-row">
                      <div className="routes-col-icon">
                        <img src={route.icon} alt={route.title} />
                      </div>
                      <div className="routes-col-content">
                        <h5>{route.title}</h5>
                        <span className="location">{route.location}</span>
                      </div>
                    </div>
                  </td>
                  <td
                    id={route.id}
                    className={`${baseClassName} ${getDroppableClassName(route.id)} ${isMultiAssigned ? 'day-col-row' : ''}`}
                  >
                    <SortableContext
                      id={route.id}
                      items={items}
                      strategy={rectSortingStrategy}
                    >
                      {hasAssigned ? (
                        assignments.map(person => (
                          <SortableItem key={person.id} id={person.id} class_type={person.class_type}>
                            <div className="routes-box-content">
                              <h6>{person.name}</h6>
                              <span>{person.role}</span>
                            </div>
                            <div className="routes-option">
                              <ul className="routes-edit-option">
                                <li className="routes-edit">
                                  <a
                                    href="#"
                                    className="edit-shift-form-btn"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      handleOpenEditShiftModal(route);
                                    }}
                                  >
                                    <img src={`${process.env.PUBLIC_URL}/images/edit-2.png`} alt="" />
                                  </a>
                                </li>
                                <li className="routes-trash">
                                 <a href="#" title="Delete" onClick={(e) => handleDelete(e, person.name)} onPointerDown={stopDragHandler}>
                                    <img src={`${process.env.PUBLIC_URL}/images/trash.png`} alt="" />
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </SortableItem>
                        ))
                      ) : (
                        hasNotes ? (
                          <SortableItem id={`unassigned-${route.id}`}>
                            <div className="not-assigned-outer default-not-assign">
                              <div className="not-assigned-content">
                                <div className="assigned-title">
                                  <span className="assigned-alert-icon">
                                    <i className="fa-solid fa-triangle-exclamation"></i>
                                  </span>
                                  <h6>Unassigned</h6>
                                </div>
                                <a
                                  href="#"
                                  ref={buttonRef}
                                  className="assign-btn"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    // setUnassignedMenuId(unassignedMenuId === route.id ? null : route.id);
                                    setUnassignedMenuId(prev => (prev === route.id ? null : route.id));
                                  }}
                                >
                                  <span className="assing-text">Click to assign</span>
                                  <span><i className="fas fa-chevron-down"></i></span>
                                </a>
                              </div>
                              {/* Menu is now rendered outside the SortableItem */}
                            </div>
                          </SortableItem>
                        ) : (
                          null
                        )
                      )}
                    </SortableContext>
                    {unassignedMenuId === route.id && (
                      <ul className="assign-option option-box active" ref={menuRef}>
                        <li className="add-employee-option">
                          <a href="#" className="btn-add-employe" onClick={handleOpenForm}>
                            <span className="employee-icons">
                              <img src={`${process.env.PUBLIC_URL}/images/profile-add.svg`} alt="" />
                            </span>
                            Add Employee
                          </a>
                        </li>
                        <li className="post-option">
                          <a
                            href="#"
                            className="post-form-btn"
                            onClick={handleOpenShiftForm} // Add the onClick handler here
                          >
                            <span className="post-icons">
                              <img src={`${process.env.PUBLIC_URL}/images/Icon@megaphone-01.svg`} alt="" />
                            </span>
                            Post Now
                          </a>
                        </li>
                      </ul>
                    )}
                  </td>
                  <td className={`routes-col routes-notes-col ${!notes.description?.trim() ? 'blank-col' : ''}`}>
                    {notes.description?.trim() && (
                      <div className="routes-col-row">
                        <div className="routes-col-content">
                          <h5>{notes.title || 'No Notes'}</h5>
                          <span className="location">{notes.description || ''}</span>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
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
              <td className="routes-col stand-drivers-col ">
                <div className="routes-col-row">
                  <div className="routes-col-icon">
                    <img src={`${process.env.PUBLIC_URL}/images/${standbyDriverRow.icon}`} alt="" />
                  </div>
                  <div className="routes-col-content">
                    <h5>{standbyDriverRow.title}</h5>
                    <span className="location">{standbyDriverRow.location}</span>
                  </div>
                  <div className="trigger-option">
                    <img
                      src={`${process.env.PUBLIC_URL}/images/Icon@more-vertical.png`}
                      alt=""
                    />
                  </div>
                  <ul className="routes-option option-box">
                    {standbyDriverRow.options.map((opt) => (
                      <li key={opt.label} className={opt.className}>
                        <a href="#" className="add-routes">
                          <span className="edit-icons">
                            <img
                              src={`${process.env.PUBLIC_URL}/images/${opt.icon}`}
                              alt=""
                            />
                          </span>
                          {opt.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </td>
              <td
                id="standby-drivers"
                className={`draggable-item ${getDroppableClassName('standby-drivers')}`}
              >
                <SortableContext
                  id="standby-drivers"
                  items={standbyDrivers.length > 0 ? standbyDrivers.map(d => d.id) : ['standby-placeholder']}
                  strategy={rectSortingStrategy}
                >
                  {standbyDrivers.map((driver) => (
                    <SortableItem key={driver.id} id={driver.id} class_type={driver.class_type}>
                      <div className="routes-box-content">
                        <h6>{driver.name}</h6>
                        <span>{driver.role}</span>
                      </div>
                      <div className="routes-option">
                        <ul className="routes-edit-option">
                          <li className="routes-edit">
                            {/* Add the onClick handler and pass the 'driver' object */}
                            <a
                              href="#"
                              className="edit-shift-form-btn"
                              onClick={(e) => {
                                e.preventDefault();
                                // Call the modal handler, passing the driver object
                                handleOpenEditShiftModal(driver);
                              }}
                            >
                              <img src={`${process.env.PUBLIC_URL}/images/edit-2.png`} alt="" />
                            </a>
                          </li>
                          <li className="routes-trash">
                            <a href="#" title="Delete" onClick={(e) => handleDelete(e, driver.name)} onPointerDown={stopDragHandler}>
                              <img src={`${process.env.PUBLIC_URL}/images/trash.png`} alt="" />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </SortableItem>
                  ))}
                  {standbyDrivers.length === 0 && (
                    <SortableItem id="standby-placeholder">
                      <div className="invisible-drop-zone routes-box driver-box" style={{ minHeight: '10px' }}>
                      </div>
                    </SortableItem>
                  )}
                </SortableContext>
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
              <td className="routes-col routes-notes-col">
                <div className="routes-col-row">
                  <div className="routes-col-content">
                    <h5>{standbyDriverRow.notes.title}</h5>
                    <span className="location">{standbyDriverRow.notes.description}</span>
                  </div>
                </div>
              </td>
            </tr>
            {showAddDriverForm && (
              <div className="form-outer add-driver-form">
                <div className="form-overlay">
                  <form className="form-modal" onSubmit={handleSubmit}>
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
            {showOpenShiftForm && (
              <div className="form-outer open-shift-form show-form">
                <div className="form-overlay">
                  <form className="form-modal" onSubmit={handleSubmitOpenShift}>
                    <div className="form-modal-inner">
                      <div className="form-header">
                        <h2>Open Shift</h2>
                        <button type="button" className="close-btn" onClick={handleCloseShiftForm}>
                          <i className="fa-solid fa-xmark"></i>
                        </button>
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
                        <button className="light-btn cancel-btn" type="button" onClick={handleCloseOpenShiftForm}>
                          Cancel
                        </button>
                        <button className="dark-btn post-now-btn" type="submit">
                          Post Now
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}
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
            {editingShift && (
              <EditShiftModal
                routeName={editingShift.title}
                onClose={handleCloseEditShiftModal}
              />
            )}
          </tbody>
        </table>
        <DragOverlay>
          {activeId ? <DragOverlayContent activeId={activeId} findPersonById={findPersonById} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default DayTable;