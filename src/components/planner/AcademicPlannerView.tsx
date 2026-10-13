import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { plannerService } from '../../services/plannerService';
import type {
  EvaluationEvent,
  StudyReminder,
  StudyNote,
  SubjectEvaluationPlan,
  EvaluationType,
} from '../../types/academicPlanner.types';
import { renderLatex } from '../../utils/latexRenderer';
import {
  CheckCircleIcon,
  PlusIcon,
  TrashIcon,
} from '../common/Icons';

type PlannerTab = 'CALENDAR' | 'PLANS' | 'REMINDERS' | 'NOTES';

export const AcademicPlannerView: React.FC = () => {
  const { user } = useAuth();
  const userId = user?.id || user?.academic_profile || 'santiago_fisica_ucv';

  const [activeTab, setActiveTab] = useState<PlannerTab>('CALENDAR');

  // Estado del planificador
  const [events, setEvents] = useState<EvaluationEvent[]>([]);
  const [reminders, setReminders] = useState<StudyReminder[]>([]);
  const [notes, setNotes] = useState<StudyNote[]>([]);
  const [plans, setPlans] = useState<SubjectEvaluationPlan[]>([]);

  // Formulario nuevo evento / evaluación
  const [showEventModal, setShowEventModal] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventSubject, setNewEventSubject] = useState('Matemática');
  const [newEventDate, setNewEventDate] = useState('2026-10-30');
  const [newEventTime, setNewEventTime] = useState('08:00 AM');
  const [newEventType, setNewEventType] = useState<EvaluationType>('PARCIAL');
  const [newEventWeight, setNewEventWeight] = useState(25);
  const [newEventLocation, setNewEventLocation] = useState('Aula 204');

  // Formulario nuevo recordatorio
  const [newReminderTitle, setNewReminderTitle] = useState('');
  const [newReminderSubject, setNewReminderSubject] = useState('Matemática');
  const [newReminderDueDate, setNewReminderDueDate] = useState('2026-10-25');
  const [newReminderPriority, setNewReminderPriority] = useState<'ALTA' | 'MEDIA' | 'BAJA'>('ALTA');

  // Formulario nueva nota
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteSubject, setNewNoteSubject] = useState('Matemática');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [selectedNote, setSelectedNote] = useState<StudyNote | null>(null);

  // Filtro de notas
  const [noteSearch, setNoteSearch] = useState('');

  // Cargar datos aislados por cuenta
  const loadData = () => {
    setEvents(plannerService.getEvents(userId));
    setReminders(plannerService.getReminders(userId));
    setNotes(plannerService.getNotes(userId));
    setPlans(plannerService.getPlansBySubject(userId));
  };

  useEffect(() => {
    loadData();
  }, [userId]);

  // Handlers de Eventos
  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventTitle.trim()) return;

    plannerService.addEvent(userId, {
      title: newEventTitle.trim(),
      subject: newEventSubject,
      date: newEventDate,
      time: newEventTime,
      type: newEventType,
      weightPercentage: Number(newEventWeight) || 20,
      location: newEventLocation,
    });

    setShowEventModal(false);
    setNewEventTitle('');
    loadData();
  };

  const handleDeleteEvent = (id: string) => {
    plannerService.deleteEvent(userId, id);
    loadData();
  };

  const handleUpdateScore = (id: string, scoreStr: string) => {
    const num = parseFloat(scoreStr);
    if (!isNaN(num) && num >= 0 && num <= 20) {
      plannerService.updateEventScore(userId, id, num);
      loadData();
    }
  };

  // Handlers de Recordatorios
  const handleCreateReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReminderTitle.trim()) return;

    plannerService.addReminder(userId, {
      title: newReminderTitle.trim(),
      subject: newReminderSubject,
      dueDate: newReminderDueDate,
      priority: newReminderPriority,
    });

    setNewReminderTitle('');
    loadData();
  };

  const handleToggleReminder = (id: string) => {
    plannerService.toggleReminder(userId, id);
    loadData();
  };

  const handleDeleteReminder = (id: string) => {
    plannerService.deleteReminder(userId, id);
    loadData();
  };

  // Handlers de Notas
  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteTitle.trim() || !newNoteContent.trim()) return;

    if (selectedNote) {
      plannerService.updateNote(userId, selectedNote.id, {
        title: newNoteTitle.trim(),
        subject: newNoteSubject,
        content: newNoteContent.trim(),
      });
    } else {
      plannerService.addNote(userId, {
        title: newNoteTitle.trim(),
        subject: newNoteSubject,
        content: newNoteContent.trim(),
        tags: [newNoteSubject],
      });
    }

    setNewNoteTitle('');
    setNewNoteContent('');
    setSelectedNote(null);
    loadData();
  };

  const handleDeleteNote = (id: string) => {
    plannerService.deleteNote(userId, id);
    if (selectedNote?.id === id) {
      setSelectedNote(null);
      setNewNoteTitle('');
      setNewNoteContent('');
    }
    loadData();
  };

  const handleSelectNoteToEdit = (note: StudyNote) => {
    setSelectedNote(note);
    setNewNoteTitle(note.title);
    setNewNoteSubject(note.subject);
    setNewNoteContent(note.content);
  };

  const filteredNotes = notes.filter((n) =>
    n.title.toLowerCase().includes(noteSearch.toLowerCase()) ||
    n.subject.toLowerCase().includes(noteSearch.toLowerCase()) ||
    n.content.toLowerCase().includes(noteSearch.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Encabezado Principal Limpio */}
      <div className="pb-4 border-b border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight font-sans">
            Agenda Académica y Plan de Evaluación
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Calendario de parciales, ponderaciones oficiales de asignaturas, tareas y apuntes.
          </p>
        </div>

        {/* Pestañas de Navegación */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100/90 rounded-2xl border border-slate-200/70">
          <button
            onClick={() => setActiveTab('CALENDAR')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'CALENDAR'
                ? 'bg-white text-slate-900 shadow-soft-sm font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Calendario ({events.length})
          </button>
          <button
            onClick={() => setActiveTab('PLANS')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'PLANS'
                ? 'bg-white text-slate-900 shadow-soft-sm font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Planes de Evaluación
          </button>
          <button
            onClick={() => setActiveTab('REMINDERS')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'REMINDERS'
                ? 'bg-white text-slate-900 shadow-soft-sm font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Recordatorios ({reminders.filter((r) => !r.completed).length})
          </button>
          <button
            onClick={() => setActiveTab('NOTES')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'NOTES'
                ? 'bg-white text-slate-900 shadow-soft-sm font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Apuntes ({notes.length})
          </button>
        </div>
      </div>

      {/* PESTAÑA 1: CALENDARIO Y EVALUACIONES */}
      {activeTab === 'CALENDAR' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 font-sans">
              Próximas Evaluaciones Programadas
            </h3>
            <button
              onClick={() => setShowEventModal(true)}
              className="btn-brand text-xs py-2 px-3.5 flex items-center gap-1.5 shadow-soft-sm"
            >
              <PlusIcon className="w-3.5 h-3.5" />
              <span>Programar Evaluación</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.length === 0 && (
              <div className="col-span-full p-12 text-center bg-white border border-dashed border-slate-200 rounded-2xl space-y-3">
                <span className="text-2xl">📅</span>
                <h4 className="text-sm font-bold text-slate-800 font-sans">No hay evaluaciones programadas</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Registra los exámenes, parciales y entregas de tu semestre para comenzar el seguimiento.
                </p>
                <button
                  onClick={() => setShowEventModal(true)}
                  className="btn-brand text-xs py-2 px-3.5 inline-flex items-center gap-1.5"
                >
                  <PlusIcon className="w-3.5 h-3.5" />
                  <span>Programar Primera Evaluación</span>
                </button>
              </div>
            )}
            {events.map((ev) => (
              <div
                key={ev.id}
                className="app-card p-5 bg-white border border-slate-200/80 shadow-soft space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-50 text-brand-600 font-mono">
                      {ev.subject}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-mono">
                      {ev.weightPercentage}% Ponderación
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 leading-snug">
                    {ev.title}
                  </h4>

                  <div className="text-xs text-slate-500 space-y-1 pt-1 font-mono">
                    <p className="flex items-center gap-1.5">
                      <span>📅</span>
                      <span>{ev.date} {ev.time ? `• ${ev.time}` : ''}</span>
                    </p>
                    {ev.location && (
                      <p className="flex items-center gap-1.5 text-slate-400">
                        <span>📍</span>
                        <span>{ev.location}</span>
                      </p>
                    )}
                  </div>

                  {ev.topics && ev.topics.length > 0 && (
                    <div className="pt-2 flex flex-wrap gap-1">
                      {ev.topics.map((t, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] px-2 py-0.5 rounded bg-slate-50 border border-slate-200/60 text-slate-600"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                    Tipo: {ev.type}
                  </span>
                  <button
                    onClick={() => handleDeleteEvent(ev.id)}
                    className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Eliminar evento"
                  >
                    <TrashIcon className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PESTAÑA 2: PLANES DE EVALUACIÓN POR MATERIA */}
      {activeTab === 'PLANS' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 font-sans">
                Planes de Evaluación y Notas Acumuladas
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Seguimiento de cortes de nota en escala venezolana de 0 a 20 puntos.
              </p>
            </div>
            <button
              onClick={() => setShowEventModal(true)}
              className="btn-brand text-xs py-2 px-3.5 flex items-center gap-1.5"
            >
              <PlusIcon className="w-3.5 h-3.5" />
              <span>Añadir Evaluación al Plan</span>
            </button>
          </div>

          <div className="space-y-4">
            {plans.map((p) => (
              <div
                key={p.subject}
                className="app-card p-5 bg-white border border-slate-200/80 shadow-soft space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-brand-500" />
                      <h4 className="text-base font-bold text-slate-900">{p.subject}</h4>
                    </div>
                    <p className="text-xs text-slate-500 font-mono">
                      Ponderación planificada: {p.totalWeight}% de 100%
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Puntos Acumulados</p>
                      <p className="text-lg font-bold text-brand-600 font-mono">
                        {p.accumulatedScore} <span className="text-xs text-slate-400 font-normal">/ 20</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Tabla de Evaluaciones de la Materia */}
                {p.evaluations.length === 0 ? (
                  <p className="text-xs text-slate-400 italic py-2">
                    No hay evaluaciones registradas para {p.subject}. Haz clic en "Añadir Evaluación al Plan".
                  </p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead>
                        <tr className="border-b border-slate-100 text-slate-400 uppercase font-mono text-[10px]">
                          <th className="py-2 pr-4 font-semibold">Evaluación</th>
                          <th className="py-2 pr-4 font-semibold">Tipo</th>
                          <th className="py-2 pr-4 font-semibold">Fecha</th>
                          <th className="py-2 pr-4 font-semibold text-center">Ponderación</th>
                          <th className="py-2 pr-4 font-semibold text-right">Nota Obtenida (/20)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-sans">
                        {p.evaluations.map((ev) => (
                          <tr key={ev.id} className="hover:bg-slate-50/50">
                            <td className="py-2.5 pr-4 font-medium text-slate-800">{ev.title}</td>
                            <td className="py-2.5 pr-4 text-slate-500 font-mono text-[11px]">{ev.type}</td>
                            <td className="py-2.5 pr-4 text-slate-500 font-mono text-[11px]">{ev.date}</td>
                            <td className="py-2.5 pr-4 text-center font-bold font-mono text-slate-700">
                              {ev.weightPercentage}%
                            </td>
                            <td className="py-2.5 text-right font-mono">
                              <input
                                type="number"
                                min="0"
                                max="20"
                                step="0.5"
                                defaultValue={ev.scoreObtained ?? ''}
                                placeholder="0 - 20"
                                onBlur={(e) => handleUpdateScore(ev.id, e.target.value)}
                                className="w-20 text-right px-2 py-1 rounded-lg border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:border-brand-500 outline-none"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PESTAÑA 3: RECORDATORIOS Y TAREAS */}
      {activeTab === 'REMINDERS' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Formulario para añadir recordatorio (4 cols) */}
          <div className="lg:col-span-4 app-card p-5 bg-white border border-slate-200/80 shadow-soft space-y-4">
            <h3 className="text-sm font-bold text-slate-900 font-sans">
              Nuevo Recordatorio
            </h3>

            <form onSubmit={handleCreateReminder} className="space-y-3 text-xs">
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                  Descripción de la tarea
                </label>
                <input
                  type="text"
                  value={newReminderTitle}
                  onChange={(e) => setNewReminderTitle(e.target.value)}
                  placeholder="Ej: Repasar guía de estequiometría..."
                  className="input-clean w-full text-xs"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                  Asignatura
                </label>
                <select
                  value={newReminderSubject}
                  onChange={(e) => setNewReminderSubject(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700"
                >
                  <option value="Matemática">Matemática</option>
                  <option value="Física">Física</option>
                  <option value="Química">Química</option>
                  <option value="Biología">Biología</option>
                  <option value="Castellano">Castellano</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                    Fecha Límite
                  </label>
                  <input
                    type="date"
                    value={newReminderDueDate}
                    onChange={(e) => setNewReminderDueDate(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                    Prioridad
                  </label>
                  <select
                    value={newReminderPriority}
                    onChange={(e) => setNewReminderPriority(e.target.value as any)}
                    className="w-full px-2.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700"
                  >
                    <option value="ALTA">Alta</option>
                    <option value="MEDIA">Media</option>
                    <option value="BAJA">Baja</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="btn-brand w-full py-2 text-xs font-semibold mt-2">
                Guardar Recordatorio
              </button>
            </form>
          </div>

          {/* Lista de recordatorios (8 cols) */}
          <div className="lg:col-span-8 app-card p-5 bg-white border border-slate-200/80 shadow-soft space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 font-sans">
                Lista de Recordatorios ({reminders.length})
              </h3>
              <span className="text-xs font-mono text-slate-400">
                {reminders.filter((r) => r.completed).length} completados
              </span>
            </div>

            <div className="space-y-2">
              {reminders.map((rem) => (
                <div
                  key={rem.id}
                  className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                    rem.completed
                      ? 'bg-slate-50/70 border-slate-200/60 opacity-60'
                      : 'bg-white border-slate-200/80 hover:border-slate-300 shadow-soft-sm'
                  }`}
                >
                  <div
                    onClick={() => handleToggleReminder(rem.id)}
                    className="flex items-center gap-3 cursor-pointer flex-1"
                  >
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center transition-all shrink-0 ${
                        rem.completed
                          ? 'bg-emerald-600 text-white'
                          : 'border-2 border-slate-300 hover:border-slate-500'
                      }`}
                    >
                      {rem.completed && <CheckCircleIcon className="w-3.5 h-3.5" />}
                    </div>
                    <div>
                      <p
                        className={`text-xs font-medium ${
                          rem.completed ? 'line-through text-slate-400' : 'text-slate-800'
                        }`}
                      >
                        {rem.title}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5 text-[10px] text-slate-400 font-mono">
                        <span className="font-semibold text-slate-500">{rem.subject}</span>
                        <span>• Vence: {rem.dueDate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded-md font-mono ${
                        rem.priority === 'ALTA'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : rem.priority === 'MEDIA'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {rem.priority}
                    </span>
                    <button
                      onClick={() => handleDeleteReminder(rem.id)}
                      className="p-1 rounded text-slate-400 hover:text-rose-600 transition-colors"
                      title="Eliminar"
                    >
                      <TrashIcon className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* PESTAÑA 4: CUADERNO DE NOTAS Y APUNTES */}
      {activeTab === 'NOTES' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Editor de Apuntes (6 cols) */}
          <div className="lg:col-span-6 app-card p-5 bg-white border border-slate-200/80 shadow-soft space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 font-sans">
                {selectedNote ? 'Editar Apunte' : 'Nuevo Apunte de Estudio'}
              </h3>
              {selectedNote && (
                <button
                  onClick={() => {
                    setSelectedNote(null);
                    setNewNoteTitle('');
                    setNewNoteContent('');
                  }}
                  className="text-xs text-brand-500 hover:underline"
                >
                  Nuevo
                </button>
              )}
            </div>

            <form onSubmit={handleSaveNote} className="space-y-3 text-xs">
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                  Título del Apunte
                </label>
                <input
                  type="text"
                  value={newNoteTitle}
                  onChange={(e) => setNewNoteTitle(e.target.value)}
                  placeholder="Ej: Teorema del Valor Medio y Regla de l'Hôpital"
                  className="input-clean w-full text-xs font-medium"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                  Materia
                </label>
                <select
                  value={newNoteSubject}
                  onChange={(e) => setNewNoteSubject(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700"
                >
                  <option value="Matemática">Matemática</option>
                  <option value="Física">Física</option>
                  <option value="Química">Química</option>
                  <option value="Biología">Biología</option>
                  <option value="Castellano">Castellano</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                  Contenido (Soporta fórmulas en LaTeX entre $...$ o $$...$$)
                </label>
                <textarea
                  rows={6}
                  value={newNoteContent}
                  onChange={(e) => setNewNoteContent(e.target.value)}
                  placeholder="Escribe tus notas aquí. Puedes incluir fórmulas matemáticas como $E = mc^2$ o integrales..."
                  className="input-clean w-full text-xs font-mono leading-relaxed"
                />
              </div>

              {/* Vista previa en tiempo real de KaTeX */}
              {newNoteContent.trim() && (
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Vista Previa Renderizada:
                  </p>
                  <div
                    className="text-xs text-slate-800 leading-relaxed font-sans"
                    dangerouslySetInnerHTML={{
                      __html: renderLatex(newNoteContent, false),
                    }}
                  />
                </div>
              )}

              <button type="submit" className="btn-brand w-full py-2.5 text-xs font-semibold">
                {selectedNote ? 'Actualizar Apunte' : 'Guardar Apunte'}
              </button>
            </form>
          </div>

          {/* Lista de Apuntes (6 cols) */}
          <div className="lg:col-span-6 app-card p-5 bg-white border border-slate-200/80 shadow-soft space-y-4">
            <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 font-sans">
                Cuaderno de Apuntes
              </h3>
              <input
                type="text"
                value={noteSearch}
                onChange={(e) => setNoteSearch(e.target.value)}
                placeholder="Buscar en apuntes..."
                className="input-clean text-xs py-1 px-3 w-44"
              />
            </div>

            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {filteredNotes.map((note) => (
                <div
                  key={note.id}
                  className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-slate-300 shadow-soft-sm space-y-2 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-brand-600 font-mono">
                      {note.subject}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleSelectNoteToEdit(note)}
                        className="text-[11px] text-brand-500 hover:underline font-semibold"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDeleteNote(note.id)}
                        className="p-1 rounded text-slate-400 hover:text-rose-600 transition-colors"
                      >
                        <TrashIcon className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <h4 className="text-xs font-bold text-slate-900">{note.title}</h4>

                  <div
                    className="text-xs text-slate-600 leading-relaxed font-sans"
                    dangerouslySetInnerHTML={{
                      __html: renderLatex(note.content, false),
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal para Crear Evento / Evaluación */}
      {showEventModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full border border-slate-200 shadow-soft-lg space-y-4">
            <h3 className="text-base font-bold text-slate-900 font-sans">
              Programar Nueva Evaluación
            </h3>

            <form onSubmit={handleCreateEvent} className="space-y-3 text-xs">
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                  Título de la Evaluación
                </label>
                <input
                  type="text"
                  required
                  value={newEventTitle}
                  onChange={(e) => setNewEventTitle(e.target.value)}
                  placeholder="Ej: 2do Parcial: Leyes de Newton"
                  className="input-clean w-full text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                    Materia
                  </label>
                  <select
                    value={newEventSubject}
                    onChange={(e) => setNewEventSubject(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700"
                  >
                    <option value="Matemática">Matemática</option>
                    <option value="Física">Física</option>
                    <option value="Química">Química</option>
                    <option value="Biología">Biología</option>
                    <option value="Castellano">Castellano</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                    Tipo
                  </label>
                  <select
                    value={newEventType}
                    onChange={(e) => setNewEventType(e.target.value as any)}
                    className="w-full px-2.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700"
                  >
                    <option value="PARCIAL">Parcial</option>
                    <option value="QUIZ">Quiz</option>
                    <option value="TALLER">Taller</option>
                    <option value="ENTREGA">Entrega</option>
                    <option value="PROYECTO">Proyecto</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2">
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                    Fecha
                  </label>
                  <input
                    type="date"
                    required
                    value={newEventDate}
                    onChange={(e) => setNewEventDate(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                    Ponderación
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    required
                    value={newEventWeight}
                    onChange={(e) => setNewEventWeight(parseInt(e.target.value) || 20)}
                    placeholder="25%"
                    className="w-full px-2.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                    Hora
                  </label>
                  <input
                    type="text"
                    value={newEventTime}
                    onChange={(e) => setNewEventTime(e.target.value)}
                    placeholder="08:00 AM"
                    className="input-clean w-full text-xs"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                    Aula / Ubicación
                  </label>
                  <input
                    type="text"
                    value={newEventLocation}
                    onChange={(e) => setNewEventLocation(e.target.value)}
                    placeholder="Aula 204"
                    className="input-clean w-full text-xs"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowEventModal(false)}
                  className="btn-secondary text-xs py-2 px-3.5"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn-brand text-xs py-2 px-4 font-semibold"
                >
                  Guardar Evaluación
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
