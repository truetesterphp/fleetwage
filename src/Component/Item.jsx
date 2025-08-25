import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const Item = React.memo(function Item({
  id,
  label,
  title,
  class_type,
  dragOverlay,
  onEdit,
  onAdd,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const [hovered, setHovered] = useState(false);

  const hasData = (label || '').trim() !== '';

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'grab',
  };

  const stopDragHandler = (e) => {
    e.stopPropagation();
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    if (onEdit) onEdit(id, label);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    alert(`Delete clicked for ${label}`);
  };

  const handleAssign = (e) => {
    e.stopPropagation();
    alert(`Assign clicked for ${label}`);
  };

  const handleAdd = (e) => {
    e.stopPropagation();
    if (onAdd) onAdd(id, label);
  };

  return (
    <div
      className={class_type + ' routes-box'}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="routes-box-content">
        <h6>{label}</h6>
        {title && <span>{title}</span>}
      </div>

      {hasData && (
        <div className="routes-option">
          <ul className="routes-edit-option">
            <li className="routes-edit">
              <a
                href="#"
                title="Edit"
                onClick={handleEdit}
                onPointerDown={stopDragHandler}
                className="edit-shift-form-btn"
              >
                <img src={`${process.env.PUBLIC_URL}/images/edit-2.png`} alt="" />
              </a>
            </li>
            <li className="routes-trash">
              <a
                href="#"
                title="Delete"
                onClick={handleDelete}
                onPointerDown={stopDragHandler}
              >
                <img src={`${process.env.PUBLIC_URL}/images/trash.png`} alt="" />
              </a>
            </li>
            <li className="routes-add">
              <a
                href="#"
                title="Add Employee"
                onClick={handleAdd}
                onPointerDown={stopDragHandler}
                className="create-employee-btn"
              >
                <img src={`${process.env.PUBLIC_URL}/images/profile-add-user.svg`} alt="" />
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
});

export { Item };
