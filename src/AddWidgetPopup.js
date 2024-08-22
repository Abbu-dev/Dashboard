import React, { useState } from 'react';
import './AddWidgetPopup.css';

const AddWidgetPopup = ({ categories, onClose, onAddWidget }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [widgetTitle, setWidgetTitle] = useState('');
  const [widgetDescription, setWidgetDescription] = useState('');
  const [selectedChartType, setSelectedChartType] = useState('');
  const [visibleWidgets, setVisibleWidgets] = useState({});

  const handleCheckboxChange = (widgetId) => {
    setVisibleWidgets((prev) => ({
      ...prev,
      [widgetId]: !prev[widgetId]
    }));
  };

  const handleAddWidget = () => {
    if (selectedCategory && widgetTitle && widgetDescription && selectedChartType) {
      const selectedCategoryWidgets = categories.find(category => category.id === selectedCategory)?.widgets || [];
      const visibleWidgetIds = Object.keys(visibleWidgets).filter(id => visibleWidgets[id]);

      onAddWidget(selectedCategory, widgetTitle, widgetDescription, selectedChartType, visibleWidgetIds);
      onClose();
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <button className="close-button" onClick={onClose}>×</button>
        <h2 className="popup-title">Add Widget</h2>
        <div className="form-group">
          <label>Category</label>
          <select className="form-select" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Widget Title</label>
          <input
            type="text"
            className="form-input"
            value={widgetTitle}
            onChange={(e) => setWidgetTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Widget Description</label>
          <input
            type="text"
            className="form-input"
            value={widgetDescription}
            onChange={(e) => setWidgetDescription(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Chart Type</label>
          <select className="form-select" value={selectedChartType} onChange={(e) => setSelectedChartType(e.target.value)}>
            <option value="">Select Chart Type</option>
            <option value="piechart">Pie Chart</option>
            <option value="linechart">Line Chart</option>
            <option value="barchart">Bar Chart</option>
            <option value="doughnutchart">Doughnut Chart</option>
          </select>
        </div>
        <div className="popup-footer">
          <button className="add-button" onClick={handleAddWidget}>Add Widget</button>
        </div>
      </div>
    </div>
  );
};

export default AddWidgetPopup;
