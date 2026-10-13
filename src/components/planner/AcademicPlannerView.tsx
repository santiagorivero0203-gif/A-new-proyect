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
import { AcademicCalendarView } from './AcademicCalendarView';
import { GradeProjectionCalculator } from './GradeProjectionCalculator';
import { WhatIfGradeCalculator } from './WhatIfGradeCalculator';
import { EmptyState } from '../common/EmptyState';
import type { ExamConfig } from '../../types/exam.types';

type PlannerTab = 'CALENDAR' | 'PLANS' | 'REMINDERS' | 'NOTES';

interface AcademicPlannerViewProps {
  onLaunchExam?: (config: ExamConfig) => void;
  onNavigateToGuides?: () => void;
}

export const AcademicPlannerView: React.FC<AcademicPlannerViewProps> = ({
  onLaunchExam,
  onNavigateToGuides,
}) => {
  const { user } = useAuth();
  const userId = user?.id || user?.academic_profile || 'santiago_fisica_ucv';

  const [activeTab, setActiveTab] = useState<PlannerTab>('CALENDAR');
  const [plansSubTab, setPlansSubTab] = useState<'PLANS' | 'WHAT_IF'>('PLANS');

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

      {/* PESTAÑA 1: CALENDARIO EDITORIAL Y EVALUACIONES */}
      {activeTab === 'CALENDAR' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 font-sans">
              Cronograma Mensual & Agenda de Evaluaciones
            </h3>
            <button
              onClick={() => setShowEventModal(true)}
              className="btn-brand text-xs py-2 px-3.5 flex items-center gap-1.5 shadow-soft-sm"
            >
              <PlusIcon className="w-3.5 h-3.5" />
              <span>Programar Nueva Evaluación</span>
            </button>
          </div>

          <AcademicCalendarView
            events={events}
            onLaunchExam={onLaunchExam}
            onNavigateToGuides={onNavigateToGuides}
            onOpenCreateEvent={() => setShowEventModal(true)}
          />
        </div>
      )}

      {/* PESTAÑA 2: PLANES DE EVALUACIÓN Y CALCULADORA DE PROYECCIÓN */}
      {activeTab === 'PLANS' && (
        <div className="space-y-6">
          {/* Sub-navegación estilo Apple / Segmented Control */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/80">
            <div className="flex items-center p-1 bg-slate-100/80 rounded-xl border border-slate-200/60">
              <button
                onClick={() => setPlansSubTab('PLANS')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  plansSubTab === 'PLANS'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Planes Oficiales y Metas
              </button>
              <button
                onClick={() => setPlansSubTab('WHAT_IF')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  plansSubTab === 'WHAT_IF'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Simulador What-If ("¿Cuánto necesito?")
              </button>
            </div>
          </div>

          {plansSubTab === 'PLANS' ? (
            <GradeProjectionCalculator
              plans={plans}
              onRefreshPlans={loadData}
              onOpenCreateEvent={() => setShowEventModal(true)}
            />
          ) : (
            <WhatIfGradeCalculator />
          )}
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

            {reminders.length === 0 ? (
              <EmptyState
                title="No tienes recordatorios programados"
                description="Utiliza el formulario de la izquierda para programar tus repasos y fechas límite de estudio."
              />
            ) : (
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
          )}
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

            {filteredNotes.length === 0 ? (
              <EmptyState
                title="No tienes apuntes guardados"
                description="Escribe notas o fórmulas en el editor de la izquierda para archivarlas en tu cuaderno de estudio."
              />
            ) : (
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
            )}
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
