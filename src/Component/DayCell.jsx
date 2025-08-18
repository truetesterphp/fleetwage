import React, { useEffect, useRef } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Item } from './Item';

export default function DayCell({ id, class_name, items, onEdit, onAdd, activeId, overId, isAssignActive, onToggleAssign,
  cellStyleFromParent, onAddEmployeeForm, openShiftForm }) {
  const containerRef = useRef(null);

  // Detect the standby driver row *without* changing your props API
  const isDriverRow =
    (class_name && class_name.includes('stand-drivers')) ||
    (id && id.includes('standby-'));

  // Keep your original “assigned but no visible label” rule, but skip it on driver row
  const hasAssignedButNoName =
    !isDriverRow && items.length > 0 && items.every((item) => (item.label || '').trim() === '');

  const { setNodeRef } = useDroppable({
    id,
    // Never disable droppable on the driver row
    disabled: isDriverRow ? false : hasAssignedButNoName,
  });

  // Keep your original TD class toggle, but don't mark driver row as not-assigned
  useEffect(() => {
    if (isDriverRow) return;
    const tdParent = containerRef.current?.closest('td');
    if (tdParent) {
      if (items.length === 0) {
        tdParent.classList.add('not-assigned');
      } else {
        tdParent.classList.remove('not-assigned');
      }
    }
  }, [items.length, isDriverRow]);

  if (class_name === 'blank-col') {
    return null;
  }

  return (
    <div
      /* keep your prop name intact; also works fine for our logic */
      class_name={''}
      ref={(node) => {
        setNodeRef(node);
        containerRef.current = node;
      }}
      style={cellStyleFromParent}
    >
      {/** DRIVER ROW MODE: show items if present, else show empty droppable (no Unassigned box) */}
      {isDriverRow ? (
        items.length > 0 ? (
          <SortableContext
            items={items.map((i) => i.id)}
            strategy={verticalListSortingStrategy}
          >
            {items.map((item) => (
              <Item
                key={item.id}
                className={(item.class_type || 'driver-box') + ''}
                {...item}
                onEdit={() => onEdit?.(item)}
                onAdd={() => onAdd?.(item)}
              />
            ))}
          </SortableContext>
        ) : (
          <div style={{ minHeight: 60 }} />
        )
      ) : hasAssignedButNoName ? (
        ''
      ) : items.length > 0 ? (
        <SortableContext
          items={items.map((i) => i.id)}
          strategy={verticalListSortingStrategy}
        >
          {items.map((item) => (
            <Item
              key={item.id}
              className={item.id}
              {...item}
              onEdit={() => onEdit?.(item)}
              onAdd={() => onAdd?.(item)}
            />
          ))}
        </SortableContext>
      ) : (
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
              className="assign-btn"
              onClick={(e) => {
                e.preventDefault();
                onToggleAssign?.();
              }}
            >
              <span className="assing-text">Click to assign</span>
              <span><i className="fas fa-chevron-down"></i></span>
            </a>
          </div>
          <ul className={`assign-option option-box ${isAssignActive ? 'assign-active' : ''}`}>
            <li className="add-employee-option">
              <a
                href="#"
                className="btn-add-employe"
                onClick={(e) => {
                  e.preventDefault();
                  onAddEmployeeForm?.(); // ✅ Now correctly triggers ONLY shift modal
                }}
              >
                <span className="employee-icons">
                  <img src={`${process.env.PUBLIC_URL}/images/profile-add.svg`} alt="" />
                </span>
                Add Employee
              </a>
            </li>

            <li className="post-option">
              <a href="#" className="post-form-btn"
                onClick={(e) => {
                  e.preventDefault();
                  openShiftForm?.(); // ✅ Should trigger parent function
                }}
              >
                <span className="post-icons">
                  <img src={`${process.env.PUBLIC_URL}/images/Icon@megaphone-01.svg`} alt="" />
                </span>
                Post Now
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
