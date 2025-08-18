import React, { useState } from 'react';

const users = [
  {
    name: 'Savannah Nguyen',
    email: 'nguyen@gmail.com',
    image: `${process.env.PUBLIC_URL}/images/Savannah Nguyen.png`,
  },
  {
    name: 'Cody Fisher',
    email: 'cody@gmail.com',
    image: `${process.env.PUBLIC_URL}/images/Cody-Fisher.png`,
  },
  {
    name: 'Courtney Henry',
    email: 'henry@gmail.com',
    image: `${process.env.PUBLIC_URL}/images/Courtney Henry.png`,
  },
  {
    name: 'Marvin McKinney',
    email: 'marvin@gmail.com',
    image: `${process.env.PUBLIC_URL}/images/Marvin-McKinney.png`,
  },
  {
    name: 'Darrell Steward',
    email: 'darrell@gmail.com',
    image: `${process.env.PUBLIC_URL}/images/Darrell-Steward.png`,
  },
  {
    name: 'Cody Fisher',
    email: 'fisher@gmail.com',
    image: `${process.env.PUBLIC_URL}/images/Cody Fisher.png`,
  },
  {
    name: 'Jenny Wilson',
    email: 'wilson@gmail.com',
    image: `${process.env.PUBLIC_URL}/images/Jenny Wilson.png`,
  },
];

export default function CreateEmployeeForm({ onClose }) {
  const [selectedUsers, setSelectedUsers] = useState([]);

  const toggleUser = (email) => {
    setSelectedUsers((prev) =>
      prev.includes(email)
        ? prev.filter((e) => e !== email)
        : [...prev, email]
    );
  };

  const handleSubmitEmpl = (e) => {
    e.preventDefault();

    if (selectedUsers.length === 0) {
      alert('Please select at least one employee.');
      return;
    }

    const selected = users.filter((user) => selectedUsers.includes(user.email));
    console.log('Selected Employees:', selected);

    // You can pass this data somewhere or close the form
    onClose();
  };

  return (
    <div className="form-outer create-employee-form show-form">
      <div className="form-overlay">
        <form className="form-modal" onSubmit={handleSubmitEmpl}>
          <div className="form-modal-inner">
            <div className="form-header">
              <h2>Add Employee</h2>
              <button type="button" className="close-btn" onClick={onClose}>
                <i className="fa-solid fa-xmark"></i>
              </button>
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
                {/* Optional New Employee Button */}
              </div>
              <div className="right-footer">
                <button
                  className="light-btn cancel-btn"
                  type="button"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button className="dark-btn add-Employees" type="submit">
                  Add
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
