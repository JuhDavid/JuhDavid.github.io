import { useState } from "react";
import { Schema } from "mongoose"; // Import the Schema from mongoose or your MongoDB library

const EquipmentSchema = new Schema({
  name: String,
  type: String,
  amount: Number,
});

const EmployeeSchema = new Schema({
  name: String,
  level: String,
  position: String,
  created: {
    type: Date,
    default: Date.now,
  },
  equipment: [EquipmentSchema],
});

const EmployeeForm = ({ onSave, disabled, employee, onCancel }) => {
  const [name, setName] = useState(employee?.name ?? "");
  const [level, setLevel] = useState(employee?.level ?? "");
  const [position, setPosition] = useState(employee?.position ?? "");
  const [equipment, setEquipment] = useState(employee?.equipment ?? []);

  const onSubmit = (e) => {
    e.preventDefault();

    if (employee) {
      return onSave({
        ...employee,
        name,
        level,
        position,
        equipment,
      });
    }

    return onSave({
      name,
      level,
      position,
      equipment,
    });
  };

  const handleEquipmentChange = (index, field, value) => {
    const newEquipment = [...equipment];
    newEquipment[index][field] = value;
    setEquipment(newEquipment);
  };

  const handleAddEquipment = () => {
    setEquipment([...equipment, {}]);
  };

  const handleRemoveEquipment = (index) => {
    const newEquipment = [...equipment];
    newEquipment.splice(index, 1);
    setEquipment(newEquipment);
  };

  return (
    <form className="EmployeeForm" onSubmit={onSubmit}>
      <div className="control">
        <label htmlFor="name">Name:</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          name="name"
          id="name"
        />
      </div>

      <div className="control">
        <label htmlFor="level">Level:</label>
        <input
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          name="level"
          id="level"
        />
      </div>

      <div className="control">
        <label htmlFor="position">Position:</label>
        <input
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          name="position"
          id="position"
        />
      </div>
      {/* Equipment Fields */}
      <div className="equipment-controls">
        {equipment.map((eq, index) => (
          <div key={index} className="equipment-control">
            <label htmlFor={`equipmentName${index}`}>Description:</label>
            <input
              value={eq.name}
              onChange={(e) => handleEquipmentChange(index, 'name', e.target.value)}
              name={`equipmentName${index}`}
              id={`equipmentName${index}`}
            />
            <button type="button" onClick={() => handleRemoveEquipment(index)}>
              Remove Cotribution
            </button>
          </div>
        ))}
      </div>
      {/* Add equipment button */}
      <button
        type="button"
        onClick={handleAddEquipment}
      >
        Add Cotribution
      </button>

      <div className="buttons">
        <button type="submit" disabled={disabled}>
          {employee ? "Update Scientist" : "Create Scientist"}
        </button>

        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
