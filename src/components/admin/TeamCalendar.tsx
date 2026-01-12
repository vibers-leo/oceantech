'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, X, Calendar as CalendarIcon } from 'lucide-react';
import styles from './TeamCalendar.module.css';

export interface CalendarEvent {
  id: number;
  date: string; // YYYY-MM-DD
  title: string;
  type: 'meeting' | 'deadline' | 'other';
  participants?: string;
}

interface TeamCalendarProps {
  events: CalendarEvent[];
  onAddEvent: (event: CalendarEvent) => void;
  onDeleteEvent: (id: number) => void;
}

export default function TeamCalendar({ events, onAddEvent, onDeleteEvent }: TeamCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date()); 
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

  const triggerAddEvent = () => {
    if (!selectedDate || !newEventTitle.trim()) return;
    const newEvent: CalendarEvent = {
      id: Date.now(),
      date: selectedDate,
      title: newEventTitle,
      type: newEventType,
      participants: 'Team'
    };
    onAddEvent(newEvent);
    setNewEventTitle('');
    setSelectedDate(null); // Close modal
  };

  const triggerDeleteEvent = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('일정을 삭제하시겠습니까?')) {
      onDeleteEvent(id);
    }
  };

  const renderCells = () => {
    const cells = [];
    // Empty cells for padding
    for (let i = 0; i < firstDayOfMonth; i++) {
        cells.push(<div key={`empty-${i}`} className={styles.cell} style={{backgroundColor: '#f9fafb'}}></div>);
    }
    
    // Days
    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = formatDate(day);
        const dayEvents = events.filter(e => e.date === dateStr);
        const isToday = dateStr === new Date().toISOString().split('T')[0];
        const isWeekend = new Date(dateStr).getDay() === 0 || new Date(dateStr).getDay() === 6;

        cells.push(
            <div 
                key={day} 
                onClick={() => setSelectedDate(dateStr)}
                className={`${styles.cell} ${isToday ? styles.today : ''}`}
            >
                <div className={styles.cellHeader}>
                    <span 
                        className={`${styles.dayNumber} ${isToday ? styles.today : ''} ${isWeekend ? styles.weekend : ''}`}
                    >
                        {day}
                    </span>
                    <button className={styles.addBtn}>
                        <Plus size={14} />
                    </button>
                </div>
                
                <div className={styles.eventList}>
                    {dayEvents.map(ev => (
                        <div 
                            key={ev.id} 
                            className={`${styles.event} ${styles[ev.type]}`}
                        >
                            <span style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '85%'}}>
                                {ev.title}
                            </span>
                            <X 
                                size={10} 
                                className={styles.deleteBtn}
                                onClick={(e) => triggerDeleteEvent(ev.id, e)} 
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
    <div className={styles.calendarContainer}>
      
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerTitleGroup}>
            <div className={styles.iconBox}>
                <CalendarIcon size={20} />
            </div>
            <div>
                <h2 className={styles.title}>Team Calendar</h2>
                <p className={styles.subtitle}>Manage schedules & deadlines</p>
            </div>
        </div>

        <div className={styles.controls}>
            <div className={styles.legend}>
                <div className={styles.legendItem}>
                    <div className={`${styles.dot} ${styles.meeting}`}></div> Meeting
                </div>
                <div className={styles.legendItem}>
                    <div className={`${styles.dot} ${styles.deadline}`}></div> Deadline
                </div>
            </div>

            <div className={styles.navButton}>
                <button onClick={handlePrevMonth} className={styles.navBtn}><ChevronLeft size={16}/></button>
                <span className={styles.currentDate}>
                    {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                </span>
                <button onClick={handleNextMonth} className={styles.navBtn}><ChevronRight size={16}/></button>
            </div>
        </div>
      </div>

      {/* Grid */}
      <div>
        <div className={styles.gridHeader}>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
                <div key={day} className={`${styles.dayName} ${i === 0 ? styles.sun : i === 6 ? styles.sat : ''}`}>
                    {day}
                </div>
            ))}
        </div>
        <div className={styles.gridBody}>
            {renderCells()}
        </div>
      </div>

      {/* Modal */}
      {selectedDate && (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <div className={styles.modalHeader}>
                    <div>
                        <h3 className={styles.modalTitle}>Add Schedule</h3>
                        <p className={styles.modalDate}>{selectedDate}</p>
                    </div>
                    <button onClick={() => setSelectedDate(null)} className={styles.closeBtn}><X size={16}/></button>
                </div>
                
                <input 
                    autoFocus
                    type="text" 
                    placeholder="e.g. Strategy Meeting..."
                    className={styles.input}
                    value={newEventTitle}
                    onChange={(e) => setNewEventTitle(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && triggerAddEvent()}
                />
                
                <div className={styles.typeSelector}>
                    {[
                        { id: 'meeting', label: 'Meeting' },
                        { id: 'deadline', label: 'Deadline' },
                        { id: 'other', label: 'Other' }
                    ].map(type => (
                        <button
                            key={type.id}
                            onClick={() => setNewEventType(type.id as any)}
                            className={`${styles.typeBtn} ${newEventType === type.id ? styles.active + ' ' + styles[type.id] : ''}`}
                        >
                            {type.label}
                        </button>
                    ))}
                </div>

                <button 
                    onClick={triggerAddEvent}
                    className={styles.createBtn}
                >
                    Create Event
                </button>
            </div>
        </div>
      )}
    </div>
  );
}
