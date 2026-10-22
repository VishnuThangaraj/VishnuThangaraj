import React, { useState, useEffect } from 'react';

/**
 * Format date string matching macOS format: e.g. "Wed Oct 21 10:50 PM"
 */
export const formatMacDate = (date = new Date()) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const dayName = days[date.getDay()];
  const monthName = months[date.getMonth()];
  const dayNum = date.getDate();

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // 0 should be 12

  return `${dayName} ${monthName} ${dayNum}  ${hours}:${minutes} ${ampm}`;
};

const TopBarClock = ({ initialDate = null }) => {
  const [formattedTime, setFormattedTime] = useState(() =>
    formatMacDate(initialDate || new Date())
  );

  useEffect(() => {
    if (initialDate) return; // Static mode for tests

    const updateClock = () => {
      setFormattedTime(formatMacDate(new Date()));
    };

    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, [initialDate]);

  return (
    <span
      className="macos-clock"
      data-testid="topbar-clock"
      style={{
        fontSize: '13px',
        fontWeight: 400,
        letterSpacing: '-0.1px',
        cursor: 'default',
        whiteSpace: 'nowrap',
      }}
    >
      {formattedTime}
    </span>
  );
};

export default TopBarClock;
