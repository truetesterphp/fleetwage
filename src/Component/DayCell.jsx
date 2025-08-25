import React, { useEffect, useRef } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Item } from './Item';

export default function DayCell({
  id,
  class_name,
  items,
  onEdit,
  onAdd,
  activeId,
  overId,
  isAssignActive,
  onToggleAssign,
  cellStyleFromParent,
  onAddEmployeeForm,
  openShiftForm
}) {
  const containerRef = useRef(null);
  const assignDropdownRef = useRef(null);

  // Detect driver row
  const isDriverRow =
    (class_name && class_name.includes('stand-drivers')) ||
    (id && id.includes('standby-'));

  // Detect assigned-but-no-name (unless it's driver row)
  const hasAssignedButNoName =
    !isDriverRow && items.length > 0 && items.every((item) => (item.label || '').trim() === '');

  const { setNodeRef } = useDroppable({
    id,
    disabled: isDriverRow ? false : hasAssignedButNoName,
  });

  // Add/remove "not-assigned" class
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

  // Close "Click to assign" when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        assignDropdownRef.current &&
        !assignDropdownRef.current.contains(event.target)
      ) {
        if (isAssignActive) {
          onToggleAssign?.();
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isAssignActive, onToggleAssign]);


  if (class_name === 'blank-col') {
    return null;
  }

  return (
    <div
      className={'routes-box-outer'}
      style={cellStyleFromParent}
      ref={(node) => {
        setNodeRef(node);
        containerRef.current = node;
      }}
    >
      {isDriverRow ? (
        items.length > 0 ? (
          <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
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
        <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
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
          <div className="not-assigned-content" ref={assignDropdownRef}>
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
              <span>
                <i className="fas fa-chevron-down"></i>
              </span>
            </a>

            <ul className={`assign-option option-box ${isAssignActive ? 'assign-active' : ''}`}>
              <li className="add-employee-option">
                <a
                  href="#"
                  className="btn-add-employe"
                  onClick={(e) => {
                    e.preventDefault();
                    onAddEmployeeForm?.();
                  }}
                >
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
                  onClick={(e) => {
                    e.preventDefault();
                    openShiftForm?.();
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
        </div>
      )}
    </div>
  );
}
