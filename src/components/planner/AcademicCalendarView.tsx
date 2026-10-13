import React, { useState } from 'react';
import type { EvaluationEvent } from '../../types/academicPlanner.types';
import { notificationService } from '../../services/notificationService';
import type { ExamConfig } from '../../types/exam.types';
import {
  LayersIcon,
  BookOpenIcon,
  DownloadIcon,
  SparklesIcon,
  XIcon,
} from '../common/Icons';

import { EmptyState } from '../common/EmptyState';

interface AcademicCalendarViewProps {
  events: EvaluationEvent[];
  onLaunchExam?: (config: ExamConfig) => void;
  onNavigateToGuides?: () => void;
  onSelectEvent?: (event: EvaluationEvent) => void;
  onOpenCreateEvent?: () => void;
}

type CalendarViewMode = 'MONTH' | 'WEEK' | 'AGENDA';

/**
 * Calendario Académico Editorial & Minimalista
 * 
 * Vistas de Mes, Semana y Agenda Diaria (Timeline) con superficies limpias,
 * divisores ultra-finos, píldoras inteligentes por tipo de evento y conexión
 * viva con el simulador de exámenes y las guías de estudio.
 */
export const AcademicCalendarView: React.FC<AcademicCalendarViewProps> = ({
  events,
  onLaunchExam,
  onNavigateToGuides,
  onOpenCreateEvent,
}) => {
  const [viewMode, setViewMode] = useState<CalendarViewMode>('MONTH');
  const [currentDate, setCurrentDate] = useState<Date>(new Date(2026, 9, 12)); // Octubre 2026
  const [selectedEvent, setSelectedEvent] = useState<EvaluationEvent | null>(null);
  const [filterSubject, setFilterSubject] = useState<string>('TODAS');
  const [notifGranted, setNotifGranted] = useState<boolean>(() => {
    return notificationService.getPermissionStatus() === 'granted';
  });

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
  ];

  const daysOfWeek = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

  // Filtrar eventos por materia si aplica
  const filteredEvents = events.filter((e) => {
    if (filterSubject === 'TODAS') return true;
    return e.subject.toLowerCase() === filterSubject.toLowerCase();
  });

  // Exportar calendario a archivo .ics nativo
  const handleExportIcs = () => {
    notificationService.downloadICalendarFile(
      filteredEvents,
      `calendario-academico-${monthNames[currentDate.getMonth()].toLowerCase()}.ics`
    );
  };

  // Solicitar permiso de notificaciones nativas
  const handleEnableNotifications = async () => {
    const granted = await notificationService.requestNotificationPermission();
    setNotifGranted(granted);
    if (granted) {
      notificationService.sendNativeNotification('Notificaciones Activadas', {
        body: 'El Centro de Productividad Estudiantil te avisará 24h y 2h antes de tus exámenes.',
      });
    }
  };

  // Lanzar simulacro en 1 clic del evento seleccionado
  const handleLaunchEventExam = (ev: EvaluationEvent) => {
    if (!onLaunchExam) return;

    onLaunchExam({
      mode: 'QUICK_PRACTICE',
      title: `Simulacro: ${ev.title}`,
      subject: ev.subject as any,
      totalQuestions: 10,
      timeLimitSeconds: 30 * 60,
      allowPause: true,
      shuffleQuestions: true,
    });
  };

  // =========================================================================
  // VISTA: MES (Grilla de 7 columnas estética con cobalto #0F52BA)
  // =========================================================================
  const renderMonthView = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayIndex = (new Date(year, month, 1).getDay() + 6) % 7; // Lunes = 0
    const totalDaysInMonth = new Date(year, month + 1, 0).getDate();

    const calendarCells: Array<{ day: number | null; dateStr: string | null; isToday: boolean }> = [];

    // Rellenar días en blanco previos al 1er día del mes
    for (let i = 0; i < firstDayIndex; i++) {
      calendarCells.push({ day: null, dateStr: null, isToday: false });
    }

    // Días del mes
    const today = new Date();
    for (let day = 1; day <= totalDaysInMonth; day++) {
      const mm = (month + 1).toString().padStart(2, '0');
      const dd = day.toString().padStart(2, '0');
      const dateStr = `${year}-${mm}-${dd}`;
      const isToday =
        day === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear();

      calendarCells.push({ day, dateStr, isToday });
    }

    return (
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-soft overflow-hidden">
        {/* Encabezado de Días de la Semana */}
        <div className="grid grid-cols-7 border-b border-slate-100 bg-slate-50/70 text-center py-3 text-xs font-bold text-slate-500 font-mono">
          {daysOfWeek.map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>

        {/* Celdas de los Días */}
        <div className="grid grid-cols-7 divide-x divide-y divide-slate-100">
          {calendarCells.map((cell, idx) => {
            if (!cell.day) {
              return (
                <div
                  key={`empty-${idx}`}
                  className="min-h-[110px] sm:min-h-[130px] bg-slate-50/30 p-2"
                />
              );
            }

            const dayEvents = filteredEvents.filter((e) => e.date === cell.dateStr);

            return (
              <div
                key={`day-${cell.day}`}
                className={`min-h-[110px] sm:min-h-[130px] p-2 sm:p-2.5 transition-colors flex flex-col justify-between ${
                  cell.isToday ? 'bg-blue-50/20' : 'bg-white hover:bg-slate-50/40'
                }`}
              >
                {/* Número del día */}
                <div className="flex items-center justify-between">
                  <span
                    className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center transition-all ${
                      cell.isToday
                        ? 'bg-[#0F52BA] text-white shadow-soft-sm font-mono'
                        : 'text-slate-700 font-mono'
                    }`}
                  >
                    {cell.day}
                  </span>

                  {dayEvents.length > 0 && (
                    <span className="text-[10px] font-mono font-bold text-slate-400">
                      {dayEvents.length} ev
                    </span>
                  )}
                </div>

                {/* Lista de Píldoras de Eventos */}
                <div className="space-y-1 mt-1.5 flex-1">
                  {dayEvents.slice(0, 3).map((ev) => {
                    const isParcial = ev.type === 'PARCIAL';
                    const isRecuperacion = ev.type === 'RECUPERACION';

                    return (
                      <button
                        key={ev.id}
                        onClick={() => setSelectedEvent(ev)}
                        className={`w-full text-left px-2 py-1 rounded-xl text-[11px] font-medium truncate transition-all flex items-center gap-1.5 shadow-xs ${
                          isParcial
                            ? 'bg-rose-50 text-rose-700 border border-rose-200/70 hover:bg-rose-100'
                            : isRecuperacion
                            ? 'bg-purple-50 text-purple-700 border border-purple-200/70 hover:bg-purple-100'
                            : 'bg-blue-50 text-[#0F52BA] border border-blue-200/70 hover:bg-blue-100'
                        }`}
                        title={`${ev.title} (${ev.subject})`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                            isParcial
                              ? 'bg-rose-500'
                              : isRecuperacion
                              ? 'bg-purple-500'
                              : 'bg-[#0F52BA]'
                          }`}
                        />
                        <span className="truncate">{ev.title}</span>
                      </button>
                    );
                  })}

                  {dayEvents.length > 3 && (
                    <button
                      onClick={() => setViewMode('AGENDA')}
                      className="text-[10px] font-semibold text-slate-400 hover:text-slate-700 block text-center w-full"
                    >
                      +{dayEvents.length - 3} más...
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // =========================================================================
  // VISTA: AGENDA DIARIA / TIMELINE VERTICAL
  // =========================================================================
  const renderAgendaView = () => {
    // Ordenar eventos por fecha ascendente
    const sortedEvents = [...filteredEvents].sort((a, b) => a.date.localeCompare(b.date));

    return (
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-soft p-6 sm:p-8 space-y-6">
        <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 font-sans">
            Línea de Tiempo de Evaluaciones & Entregas
          </h3>
          <span className="text-xs font-mono font-bold text-slate-400">
            {sortedEvents.length} eventos programados
          </span>
        </div>

        {sortedEvents.length === 0 ? (
          <EmptyState
            title="No tienes evaluaciones ni entregas programadas"
            description="Agrega tus parciales, talleres o sesiones de estudio para visualizarlos cronológicamente y exportarlos a tu calendario nativo."
            actionLabel={onOpenCreateEvent ? "+ Programar Nueva Evaluación" : undefined}
            onAction={onOpenCreateEvent}
          />
        ) : (
          <div className="relative border-l-2 border-slate-200/80 ml-3 sm:ml-6 pl-6 sm:pl-8 space-y-8">
            {sortedEvents.map((ev) => {
            const isParcial = ev.type === 'PARCIAL';
            const isRecuperacion = ev.type === 'RECUPERACION';

            return (
              <div key={ev.id} className="relative group">
                {/* Marcador temporal en la línea */}
                <div
                  className={`absolute -left-[33px] sm:-left-[41px] top-1.5 w-4 h-4 rounded-full border-2 border-white shadow-soft-sm ${
                    isParcial
                      ? 'bg-rose-500 ring-4 ring-rose-50'
                      : isRecuperacion
                      ? 'bg-purple-500 ring-4 ring-purple-50'
                      : 'bg-[#0F52BA] ring-4 ring-blue-50'
                  }`}
                />

                <div
                  onClick={() => setSelectedEvent(ev)}
                  className="bg-slate-50/70 hover:bg-white border border-slate-200/70 hover:border-slate-300 p-5 rounded-2xl transition-all cursor-pointer shadow-soft-sm group-hover:shadow-soft"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-full ${
                          isParcial
                            ? 'bg-rose-100 text-rose-800'
                            : isRecuperacion
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-blue-100 text-[#0F52BA]'
                        }`}
                      >
                        {ev.type} • {ev.weightPercentage}%
                      </span>
                      <span className="text-xs font-semibold text-slate-500">
                        {ev.subject}
                      </span>
                    </div>

                    <div className="text-xs font-mono font-bold text-slate-600">
                      📅 {ev.date} {ev.time ? `• ${ev.time}` : ''}
                    </div>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 group-hover:text-[#0F52BA] transition-colors">
                    {ev.title}
                  </h4>

                  {ev.location && (
                    <p className="text-xs text-slate-500 mt-1">
                      Ubicación: <strong>{ev.location}</strong>
                    </p>
                  )}

                  {ev.topics && ev.topics.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-3 border-t border-slate-200/60">
                      <span className="text-[11px] text-slate-400 font-semibold mr-1">Temas:</span>
                      {ev.topics.map((t, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-medium"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
  };

  return (
    <div className="space-y-6">
      {/* Barra de Control del Calendario (Vistas, Filtro por Materia y Acciones) */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-soft">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Navegación de Mes */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() =>
                  setCurrentDate(
                    new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
                  )
                }
                className="w-9 h-9 rounded-2xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 flex items-center justify-center text-sm font-bold transition-all"
                title="Mes anterior"
              >
                ‹
              </button>
              <button
                onClick={() =>
                  setCurrentDate(
                    new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
                  )
                }
                className="w-9 h-9 rounded-2xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 flex items-center justify-center text-sm font-bold transition-all"
                title="Mes siguiente"
              >
                ›
              </button>
            </div>

            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 font-sans">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>

            <button
              onClick={() => setCurrentDate(new Date(2026, 9, 12))}
              className="text-xs font-bold text-[#0F52BA] hover:underline"
            >
              Hoy
            </button>
          </div>

          {/* Selector de Modo de Vista & Filtros */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Vistas: Mes vs Agenda */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl border border-slate-200/70">
              <button
                onClick={() => setViewMode('MONTH')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  viewMode === 'MONTH'
                    ? 'bg-white text-slate-900 shadow-soft-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Mes
              </button>
              <button
                onClick={() => setViewMode('AGENDA')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  viewMode === 'AGENDA'
                    ? 'bg-white text-slate-900 shadow-soft-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Línea de Tiempo
              </button>
            </div>

            {/* Filtro por Materia */}
            <select
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
              className="px-3 py-2 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none"
            >
              <option value="TODAS">Todas las Materias</option>
              <option value="Matemática">Matemática</option>
              <option value="Física">Física</option>
              <option value="Química">Química</option>
              <option value="Biología">Biología</option>
              <option value="Castellano">Castellano</option>
            </select>

            {/* Botón Exportar .ics */}
            <button
              onClick={handleExportIcs}
              className="py-2 px-3.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200/90 text-xs font-bold text-slate-700 shadow-soft-sm flex items-center gap-2 transition-all active:scale-[0.98]"
              title="Descargar archivo iCalendar (.ics) con alarmas nativas a 24h y 2h antes"
            >
              <DownloadIcon className="w-4 h-4 text-slate-500" />
              <span>Exportar .ics</span>
            </button>

            {/* Botón Notificaciones Nativas */}
            <button
              onClick={handleEnableNotifications}
              className={`py-2 px-3.5 rounded-2xl text-xs font-bold shadow-soft-sm flex items-center gap-2 transition-all active:scale-[0.98] ${
                notifGranted
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-brand-500 hover:bg-brand-600 text-white'
              }`}
              title="Recibir notificaciones nativas en el sistema operativo antes de tus exámenes"
            >
              <SparklesIcon className="w-4 h-4" />
              <span>{notifGranted ? 'Alertas Activas' : 'Activar Push'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Renderizado de la Vista Seleccionada */}
      {viewMode === 'MONTH' ? renderMonthView() : renderAgendaView()}

      {/* Modal de Conexión Viva con el Estudio al hacer clic en un evento */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-soft-lg space-y-6 animate-fadeIn relative border border-slate-200">
            {/* Botón Cerrar */}
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100"
            >
              <XIcon className="w-5 h-5" />
            </button>

            {/* Encabezado del Evento */}
            <div className="space-y-1.5 pr-8">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-[#0F52BA] border border-blue-100">
                  {selectedEvent.type}
                </span>
                <span className="text-xs font-bold text-slate-600">
                  {selectedEvent.subject}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 font-sans">
                {selectedEvent.title}
              </h3>
            </div>

            {/* Detalles Clave */}
            <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/70 text-xs">
              <div>
                <span className="text-slate-400 font-semibold block">Fecha & Hora</span>
                <strong className="text-slate-800 font-mono text-sm">
                  {selectedEvent.date} {selectedEvent.time ? `• ${selectedEvent.time}` : ''}
                </strong>
              </div>
              <div>
                <span className="text-slate-400 font-semibold block">Ponderación</span>
                <strong className="text-[#0F52BA] font-mono text-sm">
                  {selectedEvent.weightPercentage}% del corte
                </strong>
              </div>
              {selectedEvent.location && (
                <div className="col-span-2 pt-2 border-t border-slate-200/60">
                  <span className="text-slate-400 font-semibold block">Ubicación / Aula</span>
                  <span className="text-slate-800 font-medium">{selectedEvent.location}</span>
                </div>
              )}
            </div>

            {/* Temas que entran en la evaluación */}
            {selectedEvent.topics && selectedEvent.topics.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider font-mono">
                  Temas Evaluados:
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedEvent.topics.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-xl bg-slate-100 text-slate-800 text-xs font-medium border border-slate-200/60"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Conexión Viva: Botones de Estudio y Simulación */}
            <div className="pt-3 border-t border-slate-100 space-y-2.5">
              <button
                onClick={() => {
                  setSelectedEvent(null);
                  handleLaunchEventExam(selectedEvent);
                }}
                className="w-full py-3.5 px-4 rounded-2xl bg-[#0F52BA] hover:bg-[#0d459d] text-white font-bold text-xs shadow-soft flex items-center justify-center gap-2.5 transition-all active:scale-[0.98]"
              >
                <LayersIcon className="w-4 h-4 text-white" />
                <span>Hacer Simulacro de este Parcial</span>
              </button>

              <button
                onClick={() => {
                  setSelectedEvent(null);
                  if (onNavigateToGuides) onNavigateToGuides();
                }}
                className="w-full py-3 px-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              >
                <BookOpenIcon className="w-4 h-4 text-brand-500" />
                <span>Abrir Guía de Estudio de este Tema</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
