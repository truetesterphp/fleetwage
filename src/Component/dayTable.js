import React, { useState, useEffect } from 'react';
import { initJqueryUI } from '../initJqueryUI';

const DayTable = ({ onAddRouteClick }) => {
  const selectedDayId = 'day-28';

  // Sample routeHeadersDayWise data
  const [routeHeadersDayWise, setRouteHeadersDayWise] = useState([
    {
      id: 'dispatch',
      icon: `${process.env.PUBLIC_URL}/images/truck-fast.svg`,
      title: 'Dispatch',
      location: 'King of Prussia',
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
        }
      ],
      history: {
        stops: 2340,
        packages: 4321
      },
      days: [
        {
          id: 'day-28',
          assignments: [
            {
              id: 'cell-1',
              name: 'Jacob Jones',
              role: 'Junior Manager',
              assigned: true,
              class_type: 'manager-box'
            }
          ],
          notes: {
            title: 'Easy to manage CSA',
            description: 'Bell stops at 9:15 AM'
          }
        }
      ]
    },
    {
      id: 'bulk',
      icon: `${process.env.PUBLIC_URL}/images/table-routing.svg`,
      title: '123',
      location: 'Bulk',
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
        }
      ],
      history: {
        stops: 2340,
        packages: 4321
      },
      days: [
        {
          id: 'day-28',
          assignments: [
            {
              id: 'cell-1',
              name: 'Jacob Jones',
              role: 'Driver',
              assigned: true,
              class_type: 'driver-box'
            },
            {
              id: 'cell-1-1',
              name: 'Kathryn Murphy',
              role: 'Trainer',
              assigned: true,
              class_type: 'training-box'
            }
          ],
          notes: {
            title: 'Heavy business area',
            description: 'Late Pick up'
          }
        }
      ]
    },

    {
      id: 'city',
      icon: `${process.env.PUBLIC_URL}/images/table-routing.svg`,
      title: '143',
      location: 'City',
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
        }
      ],
      history: {
        stops: 1400,
        packages: 2800
      },
      days: [
        {
          id: 'day-28',
          assignments: [
            {
              id: 'cell-1-0',
              name: 'Theresa Webb',
              role: 'Driver',
              assigned: true,
              class_type: 'driver-box'
            }
          ],
          notes: {
            title: 'Mostly Residential',
            description: 'Adult signature is required!!'
          }
        }
      ]
    },

    {
      id: 'rural',
      icon: `${process.env.PUBLIC_URL}/images/table-routing.svg`,
      title: '234',
      location: 'Rural',
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
        }
      ],
      history: {
        stops: 1230,
        packages: 3100
      },
      days: [
        {
          id: 'day-28',
          assignments: [
            {
              id: 'cell-1-0',
              name: 'Eleanor Pena',
              role: 'Driver',
              assigned: true,
              class_type: 'driver-box'
            }
          ],
          notes: {
            title: 'Mostly Residential',
            description: 'Adult signature is required!!'
          }
        }
      ]
    },

    {
      id: 'city',
      icon: `${process.env.PUBLIC_URL}/images/table-routing.svg`,
      title: '140',
      location: 'City',
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
        }
      ],
      history: {
        stops: 1100,
        packages: 2400
      },
      days: [
        {
          id: 'day-28',
          assignments: [{ assigned: true, }],
          notes: {
            title: ' ',
            description: ' '
          }
        }
      ]
    },
    {
      id: 'city',
      icon: `${process.env.PUBLIC_URL}/images/table-routing.svg`,
      title: '243',
      location: 'City',
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
        }
      ],
      history: {
        stops: 1300,
        packages: 2700
      },
      days: [
        {
          id: 'day-28',
          assignments: [{ assigned: false, }],
          notes: {
            title: 'Heavy business area',
            description: 'Late Pick up'
          }
        }
      ]
    },
    {
      id: 'rural',
      icon: `${process.env.PUBLIC_URL}/images/table-routing.svg`,
      title: '234',
      location: 'Rural',
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
        }
      ],
      history: {
        stops: 1230,
        packages: 3100
      },
      days: [
        {
          id: 'day-28',
          assignments: [
            {
              id: 'cell-1-0',
              name: 'Darrell Steward',
              role: 'Driver',
              assigned: true,
              class_type: 'driver-box'
            }
          ],
          notes: {
            title: 'Heavy business area',
            description: 'Late Pick up'
          }
        }
      ]
    },

    {
      id: 'bulk',
      icon: `${process.env.PUBLIC_URL}/images/table-routing.svg`,
      title: '123',
      location: 'Bulk',
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
        }
      ],
      history: {
        stops: 2340,
        packages: 4321
      },
      days: [
        {
          id: 'day-28',
          assignments: [
            {
              id: 'cell-1',
              name: 'Jacob Jones',
              role: 'Driver',
              assigned: true,
              class_type: 'driver-box'
            },
            {
              id: 'cell-1-1',
              name: 'Kathryn Murphy',
              role: 'Trainer',
              assigned: true,
              class_type: 'training-box'
            }
          ],
          notes: {
            title: 'Heavy business area',
            description: 'Late Pick up'
          }
        }
      ]
    },


    {
      id: 'city-143',
      icon: `${process.env.PUBLIC_URL}/images/table-routing.svg`,
      title: '143',
      location: 'City',
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
        }
      ],
      history: {
        stops: 1670,
        packages: 2890
      },
      days: [
        {
          id: 'day-28',
          assignments: [
            {
              id: 'cell-1-0',
              name: 'Arlene McCoy',
              role: 'Driver',
              assigned: true,
              class_type: 'driver-box'
            }
          ],
          notes: {
            title: 'Mostly Residential',
            description: 'Adult signature is required!!'
          }
        }
      ]
    },

    {
      id: 'rural-153',
      icon: `${process.env.PUBLIC_URL}/images/table-routing.svg`,
      title: '153',
      location: 'Rural',
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
        }
      ],
      history: {
        stops: 1425,
        packages: 2700
      },
      days: [
        {
          id: 'day-28',
          assignments: [{ assigned: false, }],
          notes: {
            title: 'Mostly Residential',
            description: 'Adult signature is required!!'
          }
        }
      ]
    }

  ]);

  const standbyDriverRow = {
    title: "Stand by Drivers",
    location: "King of Prussia",
    icon: "Icon@validation-approval.svg",
    options: [
      { label: "Edit", className: "edit-option", icon: "edit-2.png" },
      { label: "Remove", className: "remove-option", icon: "trash.png" }
    ],
    drivers: [
      {
        id: 1,
        name: "Leslie Alexander",
        role: "Driver"
      }
    ],
    notes: {
      title: "Heavy business area",
      description: "Late Pick up"
    }
  };

  const [showAddDriverForm, setShowAddDriverForm] = useState(false);

  const handleOpenForm = () => setShowAddDriverForm(true);
  const handleCloseForm = () => setShowAddDriverForm(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    // Your submit logic
    handleCloseForm(); // Optional: close form on submit
  };


  useEffect(() => {
    // Small delay to ensure React has rendered DOM
    setTimeout(() => {
      initJqueryUI();
    }, 0);
  }, [routeHeadersDayWise]);

  return (
    <div className="day-table day-table-show">
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
            const assignedPeople = dayData?.assignments || [];
            const notes = dayData?.notes || {};
            const hasAssigned = assignedPeople.some(p => p.assigned);
            const hasBlankAssigned = assignedPeople.some(
              p => p.assigned && (!p.name || p.name.trim() === '')
            );

            return (
              <tr key={`${route.id}-${index}`} className="dispatch droppable-area1">
                {/* Route Info */}
                <td className="routes-col dispatch-col">
                  <div className="routes-col-row">
                    <div className="routes-col-icon">
                      <img src={route.icon} alt={route.title} />
                    </div>
                    <div className="routes-col-content">
                      <h5>{route.title}</h5>
                      <span className="location">{route.location}</span>
                    </div>
                    <div className="trigger-option">
                      <img src={`${process.env.PUBLIC_URL}/images/Icon@more-vertical.png`} alt="options" />
                    </div>
                    <ul className="routes-option option-box">
                      {route.options.map(option => (
                        <li key={option.label} className={option.className}>
                          <a href={option.link}>
                            <img src={option.icon} alt={option.label} />
                            {option.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </td>

                {/* Assigned Employees */}
                <td className={`table-day-col draggable-item 
  ${!hasAssigned ? 'not-assigned' : ''} 
  ${assignedPeople.some(person => person.class_type === 'training-box') ? 'day-col-row' : ''} ${hasBlankAssigned ? 'blank-col' : ''}`}>
                  {assignedPeople.length > 0 && hasAssigned ? (
                    assignedPeople.map(person =>
                      person.class_type !== undefined && (
                        <div key={person.id} className={`${person.class_type} routes-box`}>
                          <div className="routes-box-content">
                            <h6>{person.name}</h6>
                            <span>{person.role}</span>
                          </div>
                          <div className="routes-option">
                            <ul className="routes-edit-option">
                              <li className="routes-edit">
                                <a href="#" className="edit-shift-form-btn">
                                  <img src={`${process.env.PUBLIC_URL}/images/edit-2.png`} alt="edit" />
                                </a>
                              </li>
                              <li className="routes-trash">
                                <a href="#">
                                  <img src={`${process.env.PUBLIC_URL}/images/trash.png`} alt="trash" />
                                </a>
                              </li>
                              <li className="routes-move">
                                <a href="#">
                                  <img src={`${process.env.PUBLIC_URL}/images/Icon@move.png`} alt="move" />
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      )
                    )
                  ) : (
                       <div className='not-assigned-outer default-not-assign'>
                    <div className="not-assigned-content">
                      <div className="assigned-title">
                        <span className="assigned-alert-icon">
                          <i className="fa-solid fa-triangle-exclamation"></i>
                        </span>
                        <h6>Unassigned</h6>
                      </div>
                      <a href="#" className="assign-btn" onClick={(e) => {
                        e.preventDefault();
                        // optionally set an active state here
                      }}
                      >
                        <span className="assing-text">Click to assign</span><span><i className="fas fa-chevron-down"></i></span>
                      </a>
                      
                    </div>
                    <ul className="assign-option option-box">
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

                {/* Notes */}
                <td className={`routes-col routes-notes-col ${!notes.description?.trim() ? 'blank-col' : ''}`}>
                  {notes.description?.trim() && (
                    <div className="routes-col-row">
                      <div className="routes-col-content">
                        <h5>{notes.title || 'No Notes'}</h5>
                        <span className="location">{notes.description || ''}</span>
                      </div>
                    </div>)}
                </td>
              </tr>
            );
          })}

          <tr className="add-routes-outer">
            <td colSpan="8">
              <button className="add-routes" onClick={onAddRouteClick}>
                <span><i className="fa-solid fa-plus"></i></span> Add Routes
              </button>
            </td>
          </tr>

          <tr className="stand-drivers droppable-area1">
            <td className="routes-col stand-drivers-col ">
              <div className="routes-col-row">
                <div className="routes-col-icon">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/${standbyDriverRow.icon}`}
                    alt=""
                  />
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

            <td className='draggable-item'>
              {standbyDriverRow.drivers.map((driver) => (
                <div key={driver.id} className="driver-box routes-box">
                  <div className="routes-box-content">
                    <h6>{driver.name}</h6>
                    <span>{driver.role}</span>
                  </div>
                  <div className="routes-option">
                    <ul className="routes-edit-option">
                      <li className="routes-edit">
                        <a href="#" className="edit-shift-form-btn">
                          <img
                            src={`${process.env.PUBLIC_URL}/images/edit-2.png`}
                            alt=""
                          />
                        </a>
                      </li>
                      <li className="routes-trash">
                        <a href="#">
                          <img
                            src={`${process.env.PUBLIC_URL}/images/trash.png`}
                            alt=""
                          />
                        </a>
                      </li>
                      <li className="routes-add">
                        <a href="#" className="create-employee-btn">
                          <img
                            src={`${process.env.PUBLIC_URL}/images/add.png`}
                            alt=""
                          />
                        </a>
                      </li>
                      <li className="routes-move">
                        <a href="#">
                          <img src={`${process.env.PUBLIC_URL}/images/Icon@move.png`} alt="move" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              ))}

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

        </tbody>
      </table>
    </div>
  );
};

export default DayTable;
