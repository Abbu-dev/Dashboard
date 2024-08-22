import React, { useState, useEffect } from 'react';
import PieChart from './PieChart';
import LineChart from './LineChart';
import BarChart from './BarChart';
import DoughnutChart from './DoughnutChart';
import AddWidgetPopup from './AddWidgetPopup';
import { TextField } from '@mui/material';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({ categories: [] });
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch and initialize data from local storage
  useEffect(() => {
    localStorage.clear(); // Clear previous storage

    const initialData = {
      categories: [
        {
          id: '1',
          name: 'CSPM Executive Dashboard',
          widgets: [
            { id: 'w1', name: 'Cloud Accounts', text: 'Random text for Widget 1', type: 'doughnutchart' },
            { id: 'w2', name: 'Cloud Account Risk Management', text: 'Description', type: 'barchart' },
          ],
        },
        {
          id: '2',
          name: 'Sales Overview',
          widgets: [
            { id: 'w3', name: 'Widget A', text: 'Random text for Widget A', type: 'linechart' },
            { id: 'w4', name: 'Widget B', text: 'Random text for Widget B' },
          ],
        },
      ],
    };

    setDashboardData(initialData);
    localStorage.setItem('dashboardData', JSON.stringify(initialData));
  }, []);

  // Update local storage whenever dashboardData changes
  useEffect(() => {
    localStorage.setItem('dashboardData', JSON.stringify(dashboardData));
  }, [dashboardData]);

  const handleAddWidgetClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleAddWidget = (categoryId, widgetName, widgetDescription, chartType, visibleWidgetIds) => {
    setDashboardData((prevData) => {
      const newCategories = prevData.categories.map((category) => {
        if (category.id === categoryId) {
          const newWidget = {
            id: `w${Date.now()}`,
            name: widgetName,
            text: widgetDescription,
            type: chartType,
            visibleWidgetIds,
          };
          return {
            ...category,
            widgets: [...category.widgets, newWidget],
          };
        }
        return category;
      });
      return { ...prevData, categories: newCategories };
    });
    setIsPopupOpen(false);
  };

  const renderWidget = (widget) => {
    if (!widget) return null;

    return (
      <div className="widget-container" key={widget.id}>
        {widget.type === 'piechart' && <PieChart />}
        {widget.type === 'linechart' && <LineChart />}
        {widget.type === 'barchart' && <BarChart />}
        {widget.type === 'doughnutchart' && <DoughnutChart />}
        {!widget.type && <div>{widget.text || 'No data'}</div>}
      </div>
    );
  };

  const handleRemoveWidget = (widgetId) => {
    setDashboardData((prevData) => {
      const newCategories = prevData.categories.map((category) => ({
        ...category,
        widgets: category.widgets.filter((widget) => widget.id !== widgetId),
      }));
      return { ...prevData, categories: newCategories };
    });
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCategories = dashboardData.categories.map((category) => ({
    ...category,
    widgets: category.widgets.filter((widget) =>
      widget.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  }));

  return (

    <div className="dashboard">
      <header className="dashboard-header">
        <div className="left-section">
          <h1 className="dashboard-title">Home > Dashboard</h1>
        </div>
        <div className="search-bar">
          <input
            type="text"
            className="search-bar"
            placeholder="Search widgets..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

      </header>
      <div className="dashboard-content">
        <div class="dash-title"><h3>CNAPP Dashboard</h3><button onClick={handleAddWidgetClick}> + Add Widget</button></div>
        <div className="categories">
          {filteredCategories.map((category) => (
            <div key={category.id} className="category">
              <h4 className="category-title-right">{category.name}</h4>
              <div className="row">
                {category.widgets.map((widget) => (
                  <div key={widget.id} className="col">
                    <div className="widget">
                      <div class="widget-title"><h3>{widget.name}</h3> <button className="remove-widget" onClick={() => handleRemoveWidget(widget.id)}>
                        X
                      </button></div>
                      {renderWidget(widget)}
                    </div>
                  </div>
                ))}
                <div className="col">
                  <div className="widget add-widget" onClick={handleAddWidgetClick}>
                    <button>Add Widget</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isPopupOpen && (
        <AddWidgetPopup
          categories={dashboardData.categories}
          onClose={handleClosePopup}
          onAddWidget={handleAddWidget}
        />
      )}
    </div>
  );
};

export default Dashboard;
