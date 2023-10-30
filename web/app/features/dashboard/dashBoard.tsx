// pages/dashboard.js
import React from 'react';

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const events = {
  "3": ["Design review 10AM", "Sales meeting 2PM"],
  "7": ["Date night 6PM"],
  "12": ["Sam's birthday party 2PM"],
  "22": ["Maple syrup museum 3PM", "Hockey game 7PM"],
  "29": ["Cinema with friends 9PM"]
};

export default function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-4 rounded shadow-md w-3/4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">January 2022</h1>
          <div>
            <button className="mx-2">Today</button>
            <button className="mx-2">Month view</button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Add event</button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-4 border-t border-l">
          {daysOfWeek.map((day) => (
            <div key={day} className="border-b border-r p-2 font-bold">{day}</div>
          ))}

          {Array.from({ length: 31 }).map((_, index) => {
            const day = index + 1;
            return (
              <div key={day} className="border-b border-r p-2">
                {day}
                <div className="mt-2 text-sm">
                  {(events[day] || []).map(event => (
                    <div key={event}>{event}</div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
