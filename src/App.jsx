import React, { useState } from "react";
import "./App.css";

// Icons as simple SVG components
const ClockIcon = () => (
  <svg
    className="icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);

const CheckIcon = () => (
  <svg
    className="icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

const FilterIcon = () => (
  <svg
    className="icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
  </svg>
);

const ImageIcon = () => (
  <svg
    className="icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <path d="M21 15l-5-5L5 21" />
  </svg>
);

// Sample data structure
const SAMPLE_ITEMS = [
  {
    id: 1,
    name: "Black Laptop",
    type: "Electronics",
    location: "Library",
    description: "Found near study area",
    date: "2025-01-15",
    status: "available",
    studentStatus: " ",
    image: null,
  },
  {
    id: 2,
    name: "Black Laptop",
    type: "Electronics",
    location: "Library",
    description: "Found near study area",
    date: "2025-01-15",
    status: "available",
    studentStatus: " ",
    image: null,
  },
  {
    id: 3,
    name: "Black Laptop",
    type: "Electronics",
    location: "Library",
    description: "Found near study area",
    date: "2025-01-15",
    status: "available",
    studentStatus: "approved",
    image: null,
  },
  {
    id: 4,
    name: "Black Laptop",
    type: "Stationery",
    location: "Library",
    description: "Found near study area",
    date: "2025-01-15",
    status: "available",
    studentStatus: "requested",
    image: null,
  },
  {
    id: 5,
    name: "Green Laptop",
    type: "Electronics",
    location: "Library",
    description: "Found near study area",
    date: "2025-01-15",
    status: "unavailable",
    studentStatus: " ",
    image: null,
  },
];

// Filter Component
const FilterPanel = ({ onFilterChange, isSheet = false }) => {
  const ITEM_TYPES = [
    "Electronics",
    "Stationery",
    "Clothing and Accessories",
    "Personal Belongings",
    "Miscellaneous",
  ];
  const STATUSES = ["available", "unavailable"];
  const STUDENT_STATUSES = ["requested", "approved"];

  return (
    <div className={`filter-panel ${isSheet ? "sheet" : ""}`}>
      <h3 className="filter-title">Filter Items</h3>

      <div className="filter-content">
        <div className="filter-section">
          <p className="filter-label">Type</p>
          <div className="checkbox-group">
            {ITEM_TYPES.map((type) => (
              <label key={type} className="checkbox-label">
                <input
                  type="checkbox"
                  onChange={(e) =>
                    onFilterChange("type", type, e.target.checked)
                  }
                />
                <span>{type}</span>
              </label>
            ))}
          </div>

          <p className="filter-label">Status</p>
          <div className="checkbox-group">
            {STATUSES.map((status) => (
              <label key={status} className="checkbox-label">
                <input
                  type="checkbox"
                  onChange={(e) =>
                    onFilterChange("status", status, e.target.checked)
                  }
                />
                <span>{status}</span>
              </label>
            ))}
          </div>

          <p className="filter-label">Student Status</p>
          <div className="checkbox-group">
            {STUDENT_STATUSES.map((studentStatus) => (
              <label key={studentStatus} className="checkbox-label">
                <input
                  type="checkbox"
                  onChange={(e) =>
                    onFilterChange("studentStatus", studentStatus, e.target.checked)
                  }
                />
                <span>{studentStatus}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <p className="filter-label">Search</p>
          <input
            className="search-input"
            placeholder="Search keywords..."
            onChange={(e) => onFilterChange("search", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

// Item Card Component
const ItemCard = ({ item, onStatusUpdate }) => {
  const handleCreateRequest = () => {
    onStatusUpdate(item.id, { status: "available", studentStatus: "requested" });
  };

  const handleMarkAsCollected = () => {
    onStatusUpdate(item.id, { status: "unavailable", studentStatus: "approved" });
  };

  const renderButton = () => {
    if (item.status === "unavailable") {
      return null;
    }

    if (item.status === "available") {
      if (item.studentStatus === " " || !item.studentStatus) {
        return (
          <button className="button button-primary" onClick={() => {
            const confirmAction = window.confirm("Are you sure you want to proceed?");
            if (confirmAction) {
                handleCreateRequest();
            }
        }}>
            Create Request
            <ClockIcon />
        </button>
        
        );
      } else if (item.studentStatus === "requested") {
        return (
          <button className="button button-outline" disabled>
            Requested
            <ClockIcon />
          </button>
        );
      } else if (item.studentStatus === "approved") {
        return (
          <button className="button button-outline" onClick={()=>
          {const confirmAction = window.confirm("Are you sure you want to proceed?");
            if (confirmAction) {
                handleMarkAsCollected();
            }
        }}>

            Mark as Collected
            <CheckIcon />
          </button>
        );
      }
    }

    return null;
  };

  return (
    <div className="item-card">
      <div className="item-grid">
        <div className="item-image-container">
          {item.image ? (
            <img src={item.image} alt={item.name} className="item-image" />
          ) : (
            <div className="item-image-placeholder">
              <ImageIcon />
            </div>
          )}
        </div>

        <div className="item-content">
          <div className="item-header">
            <div>
              <h3 className="item-title">{item.name}</h3>
              <p className="item-type">{item.type}</p>
            </div>
            <span className={`status-badge status-${item.status}`}>
              {item.status}
            </span>
            {item.studentStatus && item.studentStatus.trim() && (
              <span
                className={`studentStatus-badge studentStatus-${item.studentStatus}`}
              >
                {item.studentStatus}
              </span>
            )}
          </div>

          <div className="item-details">
            <p>
              <strong>Location:</strong> {item.location}
            </p>
            <p>
              <strong>Description:</strong> {item.description}
            </p>
            <p>
              <strong>Date:</strong> {item.date}
            </p>
          </div>

          <div className="item-footer">{renderButton()}</div>
        </div>
      </div>
    </div>
  );
};

// Bottom Bar Component
const BottomBar = ({ onOpenFilter, onSortChange }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <>
      <div className="bottom-bar">
        <button
          className="button button-outline"
          onClick={() => setIsFilterOpen(true)}
        >
          <FilterIcon />
          Filter
        </button>

        <select
          className="sort-select"
          onChange={(e) => onSortChange(e.target.value)}
          defaultValue="latest"
        >
          <option value="latest">Latest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      {isFilterOpen && (
        <div className="modal-overlay" onClick={() => setIsFilterOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setIsFilterOpen(false)}
            >
              ×
            </button>
            <FilterPanel onFilterChange={onOpenFilter} isSheet={true} />
          </div>
        </div>
      )}
    </>
  );
};

// Main Dashboard Component
const StudentDashboard = () => {
  const [items, setItems] = useState(SAMPLE_ITEMS);
  const [filters, setFilters] = useState({
    types: [],
    statuses: [],
    studentStatuses: [],
    search: "",
  });
  const [sortOrder, setSortOrder] = useState("latest");

  const handleStatusUpdate = (itemId, newStatus) => {
    setItems(
      items.map((item) => (item.id === itemId ? { ...item, ...newStatus } : item))
    );
  };

  const handleFilterChange = (type, value, checked = null) => {
    if (type === "type") {
      setFilters((prev) => ({
        ...prev,
        types: checked
          ? [...prev.types, value]
          : prev.types.filter((t) => t !== value),
      }));
    } else if (type === "status") {
      setFilters((prev) => ({
        ...prev,
        statuses: checked
          ? [...prev.statuses, value]
          : prev.statuses.filter((s) => s !== value),
      }));
    } else if (type === "studentStatus") {
      setFilters((prev) => ({
        ...prev,
        studentStatuses: checked
          ? [...prev.studentStatuses, value]
          : prev.studentStatuses.filter((ss) => ss !== value),
      }));
    } else if (type === "search") {
      setFilters((prev) => ({
        ...prev,
        search: value,
      }));
    }
  };

  const handleSortChange = (value) => {
    setSortOrder(value);
  };

  const filteredItems = items
    .filter((item) => {
      const matchesType =
        filters.types.length === 0 || filters.types.includes(item.type);
      const matchesStatus =
        filters.statuses.length === 0 || filters.statuses.includes(item.status);
      const matchesStudentStatus =
        filters.studentStatuses.length === 0 ||
        filters.studentStatuses.includes(item.studentStatus);
      const matchesSearch =
        item.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.description.toLowerCase().includes(filters.search.toLowerCase());
      return matchesType && matchesStatus && matchesStudentStatus && matchesSearch;
    })
    .sort((a, b) => {
      if (sortOrder === "latest") {
        return new Date(b.date) - new Date(a.date);
      }
      return new Date(a.date) - new Date(b.date);
    });

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <div className="navbar">
          <h1 className="dashboard-title">Lost & Found Items</h1>
        </div>

        <div className="items-container">
          {filteredItems.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              onStatusUpdate={handleStatusUpdate}
            />
          ))}
        </div>
      </div>

      <BottomBar
        onOpenFilter={handleFilterChange}
        onSortChange={handleSortChange}
      />
    </div>
  );
};

export default StudentDashboard;
