import React, { useState } from 'react';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

/**
 * Calendar Widget
 * Pixel-precise reproduction of reference/calendar.png and reference/widgets.png
 */
const CalendarWidget = ({ initialDate = new Date(2026, 9, 22) }) => {
  const [currentDate, setCurrentDate] = useState(() => initialDate);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0-indexed (9 = October)
  const monthName = MONTH_NAMES[month];

  // First day of current month
  const firstDayIndex = new Date(year, month, 1).getDay(); // 0 = Sunday
  // Number of days in current month
  const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
  // Number of days in previous month
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  // Compute days matrix:
  // Previous month overflow days
  const prevMonthDays = [];
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    prevMonthDays.push({
      day: daysInPrevMonth - i,
      isCurrentMonth: false,
    });
  }

  // Current month days
  const currentMonthDays = [];
  for (let d = 1; d <= daysInCurrentMonth; d++) {
    currentMonthDays.push({
      day: d,
      isCurrentMonth: true,
      isToday: d === 22 && month === 9, // Day 22 highlight matching reference/calendar.png
    });
  }

  const allCalendarDays = [...prevMonthDays, ...currentMonthDays];

  // Previous & Next month handlers
  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  return (
    <div
      className="macos-widget-calendar"
      data-testid="calendar-widget"
      role="region"
      aria-label="Calendar Widget"
      style={{
        width: '190px',
        padding: '12px 14px 14px',
        borderRadius: '22px',
        background: 'rgba(255, 255, 255, 0.48)',
        backdropFilter: 'blur(28px) saturate(180%)',
        WebkitBackdropFilter: 'blur(28px) saturate(180%)',
        border: '0.5px solid rgba(255, 255, 255, 0.65)',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08), inset 0 0 0 0.5px rgba(255, 255, 255, 0.8)',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        userSelect: 'none',
        WebkitUserSelect: 'none',
      }}
    >
      {/* Header: Red Month Title + Nav buttons */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 2px',
        }}
      >
        <span
          data-testid="calendar-month-name"
          style={{
            fontSize: '17px',
            fontWeight: 700,
            color: '#eb4436', // Vibrant coral red matching reference
            letterSpacing: '-0.3px',
          }}
        >
          {monthName}
        </span>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            type="button"
            onClick={handlePrevMonth}
            aria-label="Previous Month"
            data-testid="calendar-prev-month"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '2px 4px',
              color: '#555558',
              fontSize: '13px',
              fontWeight: 600,
              outline: 'none',
              lineHeight: 1,
            }}
          >
            &lt;
          </button>
          <button
            type="button"
            onClick={handleNextMonth}
            aria-label="Next Month"
            data-testid="calendar-next-month"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '2px 4px',
              color: '#555558',
              fontSize: '13px',
              fontWeight: 600,
              outline: 'none',
              lineHeight: 1,
            }}
          >
            &gt;
          </button>
        </div>
      </div>

      {/* Weekday Row (S M T W T F S) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          textAlign: 'center',
        }}
      >
        {WEEKDAYS.map((w, idx) => (
          <span
            key={idx}
            style={{
              fontSize: '11px',
              fontWeight: 600,
              color: '#636366',
              height: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {w}
          </span>
        ))}
      </div>

      {/* Days Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          rowGap: '4px',
          textAlign: 'center',
        }}
      >
        {allCalendarDays.map((item, index) => {
          return (
            <div
              key={index}
              style={{
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {item.isToday ? (
                <div
                  data-testid="calendar-today-highlight"
                  style={{
                    width: '23px',
                    height: '23px',
                    borderRadius: '50%',
                    background: '#eb4436', // Filled red circle
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 4px rgba(235, 68, 54, 0.4)',
                  }}
                >
                  {item.day}
                </div>
              ) : (
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: item.isCurrentMonth ? 500 : 400,
                    color: item.isCurrentMonth ? '#1c1c1e' : '#8e8e93',
                    opacity: item.isCurrentMonth ? 1 : 0.6,
                  }}
                >
                  {item.day}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarWidget;
