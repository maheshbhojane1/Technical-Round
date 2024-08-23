import React, { useState } from "react";
import "./Dashboard.css"; // Include a separate CSS file for styling

const initialData = {
  categories: [
    {
      id: 1,
      name: "CSPM Executive Dashboard",
      widgets: [
        {
          id: 1,
          name: "Cloud Accounts",
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam vel culpa labore molestiae veniam fugiat veritatis corporis soluta facilis inventore?",
        },
        {
          id: 2,
          name: "Cloud Risk Manegment",
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam vel culpa labore molestiae veniam fugiat veritatis corporis soluta facilis inventore?",
        },
      ],
    },
    {
      id: 2,
      name: "Security Dashboard",
      widgets: [
        {
          id: 1,
          name: "Specific Alert",
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam vel culpa labore molestiae veniam fugiat veritatis corporis soluta facilis inventore?",
        },
      ],
    },
    {
      id: 3,
      name: "Registry Scan ",
      widgets: [
        {
          id: 1,
          name: "Image Risk Assessments",
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam vel culpa labore molestiae veniam fugiat veritatis corporis soluta facilis inventore?",
        },
      ],
    },
    {
      id: 3,
      name: "Cyber Wall ",
      widgets: [
        {
          id: 1,
          name: "Unknown Threats",
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam vel culpa labore molestiae veniam fugiat veritatis corporis soluta facilis inventore?",
        },
      ],
    },
  ],
};

function Dashboard() {
  const [data, setData] = useState(initialData);
  const [showPanel, setShowPanel] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [newWidget, setNewWidget] = useState({ name: "", text: "" });

  const addWidget = () => {
    const updatedCategories = data.categories.map((category) => {
      if (category.id === currentCategory) {
        const newId = category.widgets.length
          ? category.widgets[category.widgets.length - 1].id + 1
          : 1;
        category.widgets.push({
          id: newId,
          name: newWidget.name,
          text: newWidget.text,
        });
      }
      return category;
    });
    setData({ ...data, categories: updatedCategories });
    setShowPanel(false);
    setNewWidget({ name: "", text: "" });
  };

  const removeWidget = (categoryId, widgetId) => {
    const updatedCategories = data.categories.map((category) => {
      if (category.id === categoryId) {
        category.widgets = category.widgets.filter(
          (widget) => widget.id !== widgetId
        );
      }
      return category;
    });
    setData({ ...data, categories: updatedCategories });
  };

  const openPanel = (categoryId) => {
    setCurrentCategory(categoryId);
    setShowPanel(true);
  };

  const closePanel = () => {
    setShowPanel(false);
  };

  const handleInputChange = (e) => {
    setNewWidget({ ...newWidget, [e.target.name]: e.target.value });
  };

  return (
    <div className="screen">
      <div className="navSection">
        <p className="dashTitle">
          {" "}
          <span>Home / </span>Dashboard
        </p>

        <input
          className="searchInput"
          type="text"
          placeholder=" Search anything"
        />

        <p className="userIcon">👤</p>
      </div>
      <div className="dashboard">
        <div className="widgetContainer">
          {data.categories.map((category) => (
            <div key={category.id} className="category">
              <h2 className="categoryName">{category.name}</h2>
              <div className="widget-grid">
                {category.widgets.map((widget) => (
                  <div key={widget.id} className="widget-card">
                    <h3>{widget.name}</h3>
                    <p>{widget.text}</p>
                    <button
                      className="removeBtn"
                      onClick={() => removeWidget(category.id, widget.id)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                {category.widgets.length < 3 &&
                  Array.from({ length: 3 - category.widgets.length }).map(
                    (_, index) => (
                      <div
                        key={`placeholder-${index}`}
                        className="widget-card placeholder-card"
                      >
                        <button
                          className="addBtn"
                          onClick={() => openPanel(category.id)}
                        >
                          + Add Widget
                        </button>
                      </div>
                    )
                  )}
              </div>
            </div>
          ))}
        </div>

        {showPanel && (
          
            <div className="add-widget-panel">
              <div className="header" style={{ width: "100%" }}>
                <h3 className="addTitle">Add Widget</h3>
                <button className="close-panel" onClick={closePanel}>
                  X
                </button>
              </div>

              <div className="inputField">
                <input
                  className="input"
                  type="text"
                  name="name"
                  placeholder="Widget Name"
                  value={newWidget.name}
                  onChange={handleInputChange}
                />
                <input
                  className="input"
                  type="text"
                  name="text"
                  placeholder="Widget Text"
                  value={newWidget.text}
                  onChange={handleInputChange}
                />
                <button className="addWidget" onClick={addWidget}>
                  Add Widget
                </button>
              </div>
            </div>
          
        )}
      </div>
    </div>
  );
}

export default Dashboard;
