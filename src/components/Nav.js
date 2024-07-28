import React, { useState, useEffect, useRef } from "react";
import { Search, Globe, Menu, User } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import regional1 from "./image/regonal1.jpg";
import regional2 from "./image/regonal2.webp";
import regional3 from "./image/regonal3.webp";
import regional4 from "./image/regonal4.webp";
import regional5 from "./image/regonal5.webp";
import regional6 from "./image/regonal6.webp";

const EnhancedNavbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState("Stays");
  const [where, setWhere] = useState("I'm flexible");
  const [checkIn, setCheckIn] = useState("Add dates");
  const [checkOut, setCheckOut] = useState("Add dates");
  const [guests, setGuests] = useState("Add guests");
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showGuestModal, setShowGuestModal] = useState(false);
  const navbarRef = useRef(null);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [rangeCheckIn, setRangeCheckIn] = useState("");
  const [rangeCheckOut, setRangeCheckOut] = useState("");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsExpanded(false);
        setShowLocationModal(false);
        setShowDatePicker(false);
        setShowGuestModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    setCheckIn(start ? start.toLocaleDateString() : "Add dates");
    setCheckOut(end ? end.toLocaleDateString() : "Add dates");
  };

  const handleRangeChange = (days, isCheckIn) => {
    if (isCheckIn) {
      if (startDate) {
        const rangeText = `${startDate.toLocaleDateString()} ±${days}`;
        setRangeCheckIn(rangeText);
        setCheckIn(rangeText);
        if (endDate) {
          const rangeText = `${endDate.toLocaleDateString()} ±${days}`;
          setRangeCheckOut(rangeText);
          setCheckOut(rangeText);
        }
      }
    } else {
      if (endDate) {
        const rangeText = `${endDate.toLocaleDateString()} ±${days}`;
        setRangeCheckOut(rangeText);
        setCheckOut(rangeText);
      }
    }
  };

  return (
    <div className="navbar" ref={navbarRef}>
      <div className="navbar-content">
        <div className="logo">Airbnb</div>
        {!isExpanded ? (
          <div className="search-bar" onClick={handleExpand}>
            <button>Anywhere</button>
            <button>Any week</button>
            <button>Add guests</button>
            <div className="search-button">
              <Search size={16} />
            </div>
          </div>
        ) : (
          <div className="expanded-search">
            <div className="tabs">
              <button
                className={activeTab === "Stays" ? "active" : ""}
                onClick={() => setActiveTab("Stays")}
              >
                Stays
              </button>
              <button
                className={activeTab === "Experiences" ? "active" : ""}
                onClick={() => setActiveTab("Experiences")}
              >
                Experiences
              </button>
            </div>
            <div className="search-inputs">
              <div
                className="search-input"
                onClick={() => {
                  setShowLocationModal(!showLocationModal);
                  setShowDatePicker(false);
                  setShowGuestModal(false);
                }}
              >
                <div className="input-label">Where</div>
                <div className="input-value">{where}</div>
              </div>

              <div
                className="search-input"
                onClick={() => {
                  setShowLocationModal(false);
                  setShowDatePicker(!showDatePicker);
                  setShowGuestModal(false);
                }}
              >
                <div className="input-label">Check in</div>
                <div className="input-value">{checkIn}</div>
              </div>

              <div
                className="search-input"
                onClick={() => {
                  setShowLocationModal(false);
                  setShowDatePicker(!showDatePicker);
                  setShowGuestModal(false);
                }}
              >
                <div className="input-label">Check out</div>
                <div className="input-value">{checkOut}</div>
              </div>
              <div
                className="search-input"
                onClick={() => {
                  setShowLocationModal(false);
                  setShowDatePicker(false);
                  setShowGuestModal(!showGuestModal);
                }}
              >
                <div className="input-label">Who</div>
                <div className="input-value">{guests}</div>
              </div>
              <button className="search-button" onClick={handleExpand}>
                <Search size={20} />
                Search
              </button>
            </div>
          </div>
        )}
        <div className="navbar-right">
          <button className="globe-button">
            <Globe size={20} />
          </button>
          <button className="user-menu">
            <Menu size={20} />
            <User size={20} />
          </button>
        </div>
      </div>

      {showLocationModal && (
        <LocationModal
          onClose={() => setShowLocationModal(false)}
          onSelect={(location) => {
            setWhere(location);
            setShowLocationModal(false);
          }}
        />
      )}

      {showDatePicker && (
        <div className="modal date-picker">
          <div className="date-picker-header">
            <div className="date-picker-tabs">
              <button className="active">Dates</button>
              <button>Months</button>
              <button>Flexible</button>
            </div>

            <div>
              <button onClick={() => setShowDatePicker(false)}>Close</button>
            </div>
          </div>
          <div className="calendars-container">
            <DatePicker
              selected={startDate}
              onChange={handleDateChange}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              inline
              monthsShown={2}
            />
          </div>
          <div className="date-range-options">
            <button
              onClick={() => {
                setRangeCheckIn("");
                setRangeCheckOut("");
              }}
            >
              Exact dates
            </button>
            <button onClick={() => handleRangeChange(1, true)}>± 1 day</button>
            <button onClick={() => handleRangeChange(2, true)}>± 2 days</button>
            <button onClick={() => handleRangeChange(3, true)}>± 3 days</button>
            <button onClick={() => handleRangeChange(7, true)}>± 7 days</button>
          </div>
        </div>
      )}

      {showGuestModal && (
        <GuestModal
          onClose={() => setShowGuestModal(false)}
          onSelect={(guestString) => {
            setGuests(guestString);
            setShowGuestModal(false);
          }}
        />
      )}
    </div>
  );
};

const LocationModal = ({ onClose, onSelect }) => {
  const regions = [
    { name: "I'm flexible", map: regional1 },
    { name: "Southeast Asia", map: regional2 },
    { name: "Canada", map: regional3 },
    { name: "Europe", map: regional5 },
    { name: "Thailand", map: regional4 },
    { name: "Middle East", map: regional6 },
  ];

  return (
    <div className="modal location-modal">
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
         
          <h2>Search by region</h2>
        </div>
        <div>
          <button onClick={() => onClose(false)}>Close</button>
        </div>
      </div>
      <div className="region-grid">
        {regions.map((region) => (
          <div
            key={region.name}
            className="region-item"
            onClick={() => onSelect(region.name)}
          >
            <img src={region.map} alt={region.name} />
            <span>{region.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const GuestModal = ({ onClose, onSelect }) => {
  const [guests, setGuests] = useState({
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
  });

  const handleIncrement = (type) => {
    setGuests({ ...guests, [type]: guests[type] + 1 });
  };

  const handleDecrement = (type) => {
    if (guests[type] > 0) {
      setGuests({ ...guests, [type]: guests[type] - 1 });
    }
  };

  const handleSave = () => {
    const guestString = `${guests.adults + guests.children} guests${
      guests.infants ? `, ${guests.infants} infants` : ""
    }${guests.pets ? `, ${guests.pets} pets` : ""}`;
    onSelect(guestString);
  };

  return (
    <div className="modal guest-modal">
      <div className="guest-type">
        <span>Adults</span>
        <div className="guest-controls">
          <button
            onClick={() => handleDecrement("adults")}
            disabled={guests.adults === 0}
          >
            -
          </button>
          <span>{guests.adults}</span>
          <button onClick={() => handleIncrement("adults")}>+</button>
        </div>
      </div>
      <div className="guest-type">
        <span>Children</span>
        <div className="guest-controls">
          <button
            onClick={() => handleDecrement("children")}
            disabled={guests.children === 0}
          >
            -
          </button>
          <span>{guests.children}</span>
          <button onClick={() => handleIncrement("children")}>+</button>
        </div>
      </div>
      <div className="guest-type">
        <span>Infants</span>
        <div className="guest-controls">
          <button
            onClick={() => handleDecrement("infants")}
            disabled={guests.infants === 0}
          >
            -
          </button>
          <span>{guests.infants}</span>
          <button onClick={() => handleIncrement("infants")}>+</button>
        </div>
      </div>
      <div className="guest-type">
        <span>Pets</span>
        <div className="guest-controls">
          <button
            onClick={() => handleDecrement("pets")}
            disabled={guests.pets === 0}
          >
            -
          </button>
          <span>{guests.pets}</span>
          <button onClick={() => handleIncrement("pets")}>+</button>
        </div>
      </div>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default EnhancedNavbar;
