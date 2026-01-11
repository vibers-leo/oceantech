'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, X, Calendar as CalendarIcon, Clock, Users } from 'lucide-react';
import styles from './AdminComponents.module.css';

interface Event {
  id: number;
  date: string; // YYYY-MM-DD
  title: string;
  type: 'meeting' | 'deadline' | 'other';
  participants?: string;
}

const MOCK_EVENTS: Event[] = [
  { id: 1, date: '2026-01-13', title: 'Ocean Tech Strategy Meeting', type: 'meeting', participants: 'All Staff' },
  { id: 2, date: '2026-01-15', title: 'Shopee Listing Review', type: 'deadline', participants: 'Marketing Team' },
  { id: 3, date: '2026-01-20', title: 'Export Voucher Submission', type: 'deadline', participants: 'Admin' },
];

export default function TeamCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 1)); // Start Jan 2026
  const [events, setEvents] = useState<Event[]>(MOCK_EVENTS);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventType, setNewEventType] = useState<'meeting' | 'deadline' | 'other'>('meeting');

  // Calendar Logic
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    return { daysInMonth, firstDayOfMonth };
  };

  const { daysInMonth, firstDayOfMonth } = getDaysInMonth(currentDate);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const formatDate = (day: number) => {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const d = String(day).padStart(2, '0');
    return `${year}-${month}-${d}`;
  };

  const handleAddEvent = () => {
    if (!selectedDate || !newEventTitle.trim()) return;
    const newEvent: Event = {
      id: Date.now(),
      date: selectedDate,
      title: newEventTitle,
      type: newEventType,
      participants: 'Team'
    };
    setEvents([...events, newEvent]);
    setNewEventTitle('');
    setSelectedDate(null); // Close modal
  };

  const handleDeleteEvent = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Delete this event?')) {
      setEvents(events.filter(ev => ev.id !== id));
    }
  };

  const renderCells = () => {
    const cells = [];
    // Empty cells for padding
    for (let i = 0; i < firstDayOfMonth; i++) {
        cells.push(<div key={`empty-${i}`} className="h-32 bg-[#1e293b]/30 border border-[#334155]/30"></div>);
    }
    
    // Days
    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = formatDate(day);
        const dayEvents = events.filter(e => e.date === dateStr);
        const isToday = dateStr === new Date().toISOString().split('T')[0];

        cells.push(
            <div 
                key={day} 
                onClick={() => setSelectedDate(dateStr)}
                className={`h-32 border border-[#334155]/50 p-2 relative hover:bg-[#334155]/20 transition-colors cursor-pointer group ${isToday ? 'bg-[#38bdf8]/10' : 'bg-[#1e293b]/50'}`}
            >
                <div className={`flex justify-between items-start mb-2`}>
                    <span className={`text-sm font-bold ${isToday ? 'text-[#38bdf8] bg-[#38bdf8]/20 px-2 py-0.5 rounded-full' : 'text-gray-400'}`}>
                        {day}
                    </span>
                    <button className="opacity-0 group-hover:opacity-100 text-[#38bdf8] hover:bg-[#38bdf8]/20 p-1 rounded transition-all">
                        <Plus size={14} />
                    </button>
                </div>
                
                <div className="flex flex-col gap-1 overflow-y-auto max-h-[80px] scrollbar-hide">
                    {dayEvents.map(ev => (
                        <div 
                            key={ev.id} 
                            className={`text-xs p-1.5 rounded border-l-2 truncate flex justify-between items-center group/item
                             ${ev.type === 'meeting' ? 'bg-blue-900/40 border-blue-500 text-blue-200' : 
                               ev.type === 'deadline' ? 'bg-red-900/40 border-red-500 text-red-200' : 
                               'bg-slate-700/40 border-slate-500 text-slate-300'}`}
                        >
                            <span>{ev.title}</span>
                            <X 
                                size={10} 
                                className="opacity-0 group-hover/item:opacity-100 cursor-pointer hover:text-white"
                                onClick={(e) => handleDeleteEvent(ev.id, e)} 
                            />
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    return cells;
  };

  return (
    <div className={styles.componentContainer} style={{ background: '#0f172a', border: '1px solid #334155', marginBottom: '20px' }}>
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
            <h2 className={styles.title} style={{ marginBottom: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CalendarIcon className="text-[#38bdf8]" />
                Team Schedule
            </h2>
            <div className="flex items-center gap-2 bg-[#1e293b] rounded-lg p-1 border border-[#334155]">
                <button onClick={handlePrevMonth} className="p-1 hover:bg-[#334155] rounded text-gray-400 hover:text-white"><ChevronLeft size={20}/></button>
                <span className="font-bold text-white px-2 w-32 text-center text-sm">
                    {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                </span>
                <button onClick={handleNextMonth} className="p-1 hover:bg-[#334155] rounded text-gray-400 hover:text-white"><ChevronRight size={20}/></button>
            </div>
        </div>
        
        <div className="flex gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div> Meeting
            </div>
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div> Deadline
            </div>
        </div>
      </div>

      {/* Calendar Grid Header */}
      <div className="grid grid-cols-7 mb-2 text-center text-sm font-semibold text-gray-500 uppercase tracking-wider">
        <div className="text-red-400">Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div className="text-blue-400">Sat</div>
      </div>

      {/* Calendar Body */}
      <div className="grid grid-cols-7 gap-1 bg-[#334155]/20 p-1 rounded-lg border border-[#334155]">
        {renderCells()}
      </div>

      {/* Add Event Modal (Simplified inline) */}
      {selectedDate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-[#1e293b] border border-[#334155] p-6 rounded-2xl w-full max-w-sm shadow-2xl">
                <h3 className="text-lg font-bold text-white mb-4 flex justify-between items-center">
                    Add Event ({selectedDate})
                    <button onClick={() => setSelectedDate(null)} className="text-gray-400 hover:text-white"><X size={20}/></button>
                </h3>
                
                <input 
                    autoFocus
                    type="text" 
                    placeholder="Event Title..."
                    className="w-full bg-[#0f172a] border border-[#334155] text-white rounded-lg p-3 mb-4 focus:border-[#38bdf8] outline-none"
                    value={newEventTitle}
                    onChange={(e) => setNewEventTitle(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddEvent()}
                />
                
                <div className="flex gap-2 mb-6">
                    {['meeting', 'deadline', 'other'].map(type => (
                        <button
                            key={type}
                            onClick={() => setNewEventType(type as any)}
                            className={`flex-1 py-2 text-xs rounded-lg border capitalize transition-all ${
                                newEventType === type 
                                ? 'bg-[#38bdf8]/20 border-[#38bdf8] text-[#38bdf8]' 
                                : 'bg-transparent border-[#334155] text-gray-400 hover:border-gray-500'
                            }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>

                <button 
                    onClick={handleAddEvent}
                    className="w-full bg-gradient-to-r from-[#00d2ff] to-[#3a7bd5] text-white font-bold py-3 rounded-xl hover:opacity-90 transition-opacity"
                >
                    Create Schedule
                </button>
            </div>
        </div>
      )}

    </div>
  );
}
