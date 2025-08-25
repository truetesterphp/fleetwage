import React, { useState } from 'react';

export default function EditShiftModal({ routeName, onClose }) {
  const [employee, setEmployee] = useState('Darrell Steward');
  const [jumper, setJumper] = useState('Vazgen Avakyan');
  const [notes, setNotes] = useState('About 220 Stop mostly Residential');

  return (
    <div
      className="modal form-outer edit-shift-form show-form"
    >
      <div className='form-overlay' >
        <form className='form-modal'>
          <div className='form-modal-inner' >
            <div className='form-header'>
              <h2>Edit Shift for Route {routeName}</h2>
              <span class="close-btn" onClick={onClose}><i class="fa-solid fa-xmark"></i></span>
            </div>
            <div className='form-body'>
              <div className='edit-shift-content'>
                <div id="employee-wrapper">
                  <div className='form-row cloan-row'>
                    <div className='form-group'>
                      <label for='employee'>Employee</label>
                      <select
                        value={employee}
                        onChange={(e) => setEmployee(e.target.value)}
                        id='employee'
                        name='employee'
                      >
                        <option>Darrell Steward</option>
                        <option>Savannah Nguyen</option>
                        <option>Marvin McKinney</option>
                      </select>
                    </div>

                    <div className='form-group'>
                      <label for='jumper'>Jumper</label>
                      <select
                        value={jumper}
                        onChange={(e) => setJumper(e.target.value)}
                        id='jumper'
                        name='jumper'
                      >
                        <option>Vazgen Avakyan</option>
                        <option>Cody Fisher</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className='form-group'>
                  <a href="#" className='add-employee-btn' onClick={(e) => e.preventDefault()}>
                    + Employee
                  </a>
                </div>

                <div className='form-group'>
                  <label for="notes">Notes</label>
                  <textarea
                    value={notes}
                    id='notes'
                    name='notes'
                    rows="2"
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className='form-footer' >
              <div className='left-footer' >
                <button className='delete-shift' ><span class="trash-icon"><img alt="" src={`${process.env.PUBLIC_URL}/images/trash.svg` }/></span>
                   Delete Shift
                </button>
              </div>
              <div className='right-footer' >
                <button onClick={onClose} className='light-btn cancel-btn'>
                  Cancel
                </button>
                <button className='dark-btn save-btn' type='submit'>
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
