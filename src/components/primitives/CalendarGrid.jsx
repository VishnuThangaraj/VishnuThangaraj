import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const CalendarGrid = ({ onSelectDate }) => {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 9, 20)); // Oct 20, 2026

  const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const prevMonthDays = Array.from({ length: firstDay }, (_, i) => daysInPrevMonth - firstDay + 1 + i);
  const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const remainingCells = 42 - (prevMonthDays.length + currentMonthDays.length);
  const nextMonthDays = Array.from({ length: remainingCells }, (_, i) => i + 1);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const isToday = (day) => {
    return day === 20 && month === 9 && year === 2026;
  };

  const hasEvent = (day) => {
    // Check if day has an event (e.g. Oct 20)
    return day === 20 || day === 15 || day === 28;
  };

  return (
    <div className="w-full text-white select-none">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <span className="text-sm font-semibold">
          {monthNames[month]} {year}
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
            className="p-1 hover:bg-white/10 rounded-full transition-colors text-white/80 hover:text-white"
            aria-label="Previous Month"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
            className="p-1 hover:bg-white/10 rounded-full transition-colors text-white/80 hover:text-white"
            aria-label="Next Month"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Days of week */}
      <div className="grid grid-cols-7 gap-1 text-center text-xs text-white/50 mb-1 font-medium">
        {daysOfWeek.map((d, i) => (
          <div key={i} className="h-6 flex items-center justify-center">
            {d}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-1 text-center text-xs">
        {prevMonthDays.map((day) => (
          <div key={`prev-${day}`} className="h-7 flex items-center justify-center text-white/25">
            {day}
          </div>
        ))}

        {currentMonthDays.map((day) => {
          const today = isToday(day);
          const event = hasEvent(day);

          return (
            <div
              key={`curr-${day}`}
              onClick={() => onSelectDate && onSelectDate(new Date(year, month, day))}
              className="h-7 relative flex flex-col items-center justify-center cursor-pointer rounded-full hover:bg-white/10 transition-colors"
            >
              <span
                className={`w-6 h-6 flex items-center justify-center rounded-full text-xs ${
                  today ? "bg-[var(--accent)] text-white font-bold" : "text-white/90"
                }`}
              >
                {day}
              </span>
              {event && !today && (
                <span className="w-1 h-1 rounded-full bg-[var(--accent)] absolute bottom-0.5" />
              )}
            </div>
          );
        })}

        {nextMonthDays.map((day) => (
          <div key={`next-${day}`} className="h-7 flex items-center justify-center text-white/25">
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};
