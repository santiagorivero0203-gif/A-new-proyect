import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { plannerService } from '../../services/plannerService';
import type { ClassScheduleBlock, DayOfWeek } from '../../types/academicPlanner.types';
import {
  extractJsonFromAiResponse,
  validateAndNormalizeClassSchedule,
} from '../../utils/academicImportValidator';
import {
  Clock,
  Plus,
  Trash2,
  Sparkles,
  MapPin,
  User,
  Check,
  Copy,
  X,
  AlertTriangle,
} from 'lucide-react';

const DAYS_OF_WEEK: DayOfWeek[] = ['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO'];

const DAY_LABELS: Record<DayOfWeek, string> = {
  LUNES: 'Lunes',
  MARTES: 'Martes',
  MIERCOLES: 'Miércoles',
  JUEVES: 'Jueves',
  VIERNES: 'Viernes',
  SABADO: 'Sábado',
};

// Mapeo JS getDay() a DayOfWeek (0 es Domingo)
const JS_DAY_MAP: Record<number, DayOfWeek | null> = {
  1: 'LUNES',
  2: 'MARTES',
  3: 'MIERCOLES',
  4: 'JUEVES',
  5: 'VIERNES',
  6: 'SABADO',
  0: null,
};

// Helper para detectar solapamiento de horario entre clases del mismo día
export const checkIsOverlapping = (target: ClassScheduleBlock, allBlocks: ClassScheduleBlock[]): boolean => {
  const [sh1, sm1] = target.startTime.split(':').map(Number);
  const [eh1, em1] = target.endTime.split(':').map(Number);
  const start1 = sh1 * 60 + (sm1 || 0);
  const end1 = eh1 * 60 + (em1 || 0);

  return allBlocks.some((c) => {
    if (c.id === target.id || c.dayOfWeek !== target.dayOfWeek) return false;
    const [sh2, sm2] = c.startTime.split(':').map(Number);
    const [eh2, em2] = c.endTime.split(':').map(Number);
    const start2 = sh2 * 60 + (sm2 || 0);
    const end2 = eh2 * 60 + (em2 || 0);
    return start1 < end2 && start2 < end1;
  });
};

const COLOR_TAG_MAP: Record<string, { bg: string; text: string; border: string }> = {
  blue: { bg: 'bg-blue-50', text: 'text-[#0F52BA]', border: 'border-blue-200' },
  indigo: { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200' },
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-200' },
  rose: { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200' },
  purple: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
};

export const MASTER_SCHEDULE_PROMPT = `Actúa como un asistente experto en digitalización escolar y universitaria para el Centro de Productividad Estudiantil (CPE).

Te adjunto una FOTO / CAPTURA DE PANTALLA / PDF de mi Horario Escolar / Académico Semanal.

Tu tarea es:
1. Extraer todas las clases programadas entre LUNES y SÁBADO.
2. Identificar el nombre de la Asignatura, el Día de la semana (LUNES, MARTES, MIERCOLES, JUEVES, VIERNES o SABADO).
3. Extraer la Hora de Inicio y Hora de Fin en formato 24 horas "HH:MM" (ej. "07:30", "09:00", "13:30").
4. Extraer el Aula / Salón / Laboratorio y el Nombre del Docente si aparecen.
5. Asignar la modalidad: "PRESENCIAL", "VIRTUAL" o "HIBRIDO".
6. Asignar un color visual temático ("blue", "indigo", "emerald", "amber", "rose", "purple").

RESPONDE EXCLUSIVAMENTE CON UN BLOQUE JSON VÁLIDO CON ESTA ESTRUCTURA:

\`\`\`json
{
  "schemaVersion": "cpe-class-schedule-v1",
  "institutionName": "Nombre de la Escuela / Universidad",
  "studentGradeOrSemester": "1er Año / Semestre",
  "classes": [
    {
      "subject": "Matemática",
      "dayOfWeek": "LUNES",
      "startTime": "07:00",
      "endTime": "08:30",
      "classroom": "Salón 3-B",
      "building": "Módulo Central",
      "professor": "Prof. Carlos Ramos",
      "modality": "PRESENCIAL",
      "colorTag": "blue"
    }
  ]
}
\`\`\``;

export const WeeklyClassScheduleView: React.FC = () => {
  const { user } = useAuth();
  const userId = user?.id || user?.academic_profile || 'santiago_fisica_ucv';

  const [schedule, setSchedule] = useState<ClassScheduleBlock[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAiModal, setShowAiModal] = useState(false);

  // Formulario nuevo bloque
  const [newSubject, setNewSubject] = useState('Matemática');
  const [newDay, setNewDay] = useState<DayOfWeek>('LUNES');
  const [newStartTime, setNewStartTime] = useState('07:30');
  const [newEndTime, setNewEndTime] = useState('09:00');
  const [newClassroom, setNewClassroom] = useState('Aula 102');
  const [newProfessor, setNewProfessor] = useState('');
  const [newModality, setNewModality] = useState<'PRESENCIAL' | 'VIRTUAL' | 'HIBRIDO'>('PRESENCIAL');
  const [newColorTag, setNewColorTag] = useState('blue');

  // Modal IA de horario
  const [aiJsonInput, setAiJsonInput] = useState('');
  const [aiParseError, setAiParseError] = useState<string | null>(null);
  const [aiWarnings, setAiWarnings] = useState<string[]>([]);
  const [replaceOnImport, setReplaceOnImport] = useState(false);
  const [copiedSchedulePrompt, setCopiedSchedulePrompt] = useState(false);

  // Reloj en vivo para seguimiento dinámico de clases (se actualiza cada 30 segundos)
  const [currentTime, setCurrentTime] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  // Cargar horario
  useEffect(() => {
    const loaded = plannerService.getClassSchedule(userId);
    setSchedule(loaded);
  }, [userId]);

  // Guardar horario
  const handleSaveBlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubject.trim()) return;

    const created = plannerService.addClassBlock(userId, {
      subject: newSubject.trim(),
      dayOfWeek: newDay,
      startTime: newStartTime,
      endTime: newEndTime,
      classroom: newClassroom.trim() || undefined,
      professor: newProfessor.trim() || undefined,
      modality: newModality,
      colorTag: newColorTag,
    });

    setSchedule((prev) => [...prev, created]);
    setShowAddModal(false);
  };

  const handleDeleteBlock = (id: string) => {
    plannerService.deleteClassBlock(userId, id);
    setSchedule((prev) => prev.filter((b) => b.id !== id));
  };

  // Cargar Presets según el perfil (reemplazando para evitar duplicaciones)
  const handleLoadProfilePreset = (profile: string) => {
    let presetClasses: Omit<ClassScheduleBlock, 'id'>[] = [];

    if (profile.includes('andres')) {
      presetClasses = [
        { subject: 'Matemática (Álgebra Básica)', dayOfWeek: 'LUNES', startTime: '07:00', endTime: '08:30', classroom: 'Salón 1-A', professor: 'Prof. Mendoza', modality: 'PRESENCIAL', colorTag: 'blue' },
        { subject: 'Ciencias Naturales', dayOfWeek: 'LUNES', startTime: '08:45', endTime: '10:15', classroom: 'Lab Biología', professor: 'Prof. Gómez', modality: 'PRESENCIAL', colorTag: 'emerald' },
        { subject: 'Castellano & Literatura', dayOfWeek: 'MARTES', startTime: '07:00', endTime: '08:30', classroom: 'Salón 1-A', professor: 'Prof. Castillo', modality: 'PRESENCIAL', colorTag: 'indigo' },
        { subject: 'Geografía e Historia', dayOfWeek: 'MARTES', startTime: '08:45', endTime: '10:15', classroom: 'Salón 1-A', professor: 'Prof. Silva', modality: 'PRESENCIAL', colorTag: 'amber' },
        { subject: 'Matemática (Resolución Problemas)', dayOfWeek: 'MIERCOLES', startTime: '07:00', endTime: '08:30', classroom: 'Salón 1-A', professor: 'Prof. Mendoza', modality: 'PRESENCIAL', colorTag: 'blue' },
        { subject: 'Educación Física', dayOfWeek: 'MIERCOLES', startTime: '08:45', endTime: '10:15', classroom: 'Cancha Central', professor: 'Prof. Rojas', modality: 'PRESENCIAL', colorTag: 'rose' },
        { subject: 'Inglés Inicial', dayOfWeek: 'JUEVES', startTime: '07:00', endTime: '08:30', classroom: 'Salón 1-A', professor: 'Prof. Davis', modality: 'PRESENCIAL', colorTag: 'purple' },
        { subject: 'Ciencias Naturales', dayOfWeek: 'JUEVES', startTime: '08:45', endTime: '10:15', classroom: 'Salón 1-A', professor: 'Prof. Gómez', modality: 'PRESENCIAL', colorTag: 'emerald' },
        { subject: 'Castellano (Gramática)', dayOfWeek: 'VIERNES', startTime: '07:00', endTime: '08:30', classroom: 'Salón 1-A', professor: 'Prof. Castillo', modality: 'PRESENCIAL', colorTag: 'indigo' },
        { subject: 'Orientación Vocacional', dayOfWeek: 'VIERNES', startTime: '08:45', endTime: '10:15', classroom: 'Auditorio', professor: 'Lic. Paredes', modality: 'PRESENCIAL', colorTag: 'amber' },
      ];
    } else if (profile.includes('santiago')) {
      presetClasses = [
        { subject: 'Cálculo I (Teoría)', dayOfWeek: 'LUNES', startTime: '08:00', endTime: '10:00', classroom: 'Aula 204 - Ciencias UCV', professor: 'Dr. Quintero', modality: 'PRESENCIAL', colorTag: 'blue' },
        { subject: 'Física General I (Teoría)', dayOfWeek: 'LUNES', startTime: '10:30', endTime: '12:30', classroom: 'Anfiteatro Física', professor: 'Dr. Villarroel', modality: 'PRESENCIAL', colorTag: 'indigo' },
        { subject: 'Álgebra Lineal & Geometría', dayOfWeek: 'MARTES', startTime: '08:00', endTime: '10:00', classroom: 'Aula 202', professor: 'Dra. Salazar', modality: 'PRESENCIAL', colorTag: 'purple' },
        { subject: 'Laboratorio de Física I', dayOfWeek: 'MARTES', startTime: '13:00', endTime: '16:00', classroom: 'Lab Mecánica UCV', professor: 'Ing. Herrera', modality: 'PRESENCIAL', colorTag: 'emerald' },
        { subject: 'Cálculo I (Práctica & Problemas)', dayOfWeek: 'MIERCOLES', startTime: '08:00', endTime: '10:00', classroom: 'Aula 204', professor: 'Dr. Quintero', modality: 'PRESENCIAL', colorTag: 'blue' },
        { subject: 'Física General I (Práctica)', dayOfWeek: 'JUEVES', startTime: '10:30', endTime: '12:30', classroom: 'Aula 204', professor: 'Dr. Villarroel', modality: 'PRESENCIAL', colorTag: 'indigo' },
        { subject: 'Taller de Métodos Computacionales', dayOfWeek: 'VIERNES', startTime: '09:00', endTime: '12:00', classroom: 'Lab Computación', professor: 'Prof. Briceño', modality: 'HIBRIDO', colorTag: 'amber' },
      ];
    } else {
      presetClasses = [
        { subject: 'Taller de Diseño Integral V', dayOfWeek: 'LUNES', startTime: '08:00', endTime: '12:00', classroom: 'Atelier Central UCAB', professor: 'Arq. Serrano', modality: 'PRESENCIAL', colorTag: 'rose' },
        { subject: 'Teoría del Color & Accesibilidad', dayOfWeek: 'MARTES', startTime: '09:00', endTime: '11:00', classroom: 'Aula Magna', professor: 'Prof. Benítez', modality: 'PRESENCIAL', colorTag: 'purple' },
        { subject: 'Geometría Descriptiva & 3D', dayOfWeek: 'MIERCOLES', startTime: '08:00', endTime: '11:00', classroom: 'Taller Maquetería', professor: 'Ing. Osorio', modality: 'PRESENCIAL', colorTag: 'indigo' },
        { subject: 'Tipografía Editorial & Gestalt', dayOfWeek: 'JUEVES', startTime: '10:00', endTime: '12:30', classroom: 'Lab Multimedia', professor: 'Lic. Morales', modality: 'PRESENCIAL', colorTag: 'amber' },
        { subject: 'Crítica Proyectual de Jurado', dayOfWeek: 'VIERNES', startTime: '09:00', endTime: '13:00', classroom: 'Auditorio Diseño', professor: 'Jurado UCAB', modality: 'PRESENCIAL', colorTag: 'emerald' },
      ];
    }

    // Al cargar preset sustituir todo el horario para no duplicar materias
    plannerService.importClassSchedule(
      userId,
      {
        schemaVersion: 'cpe-class-schedule-v1',
        classes: presetClasses,
      },
      true
    );
    setSchedule(plannerService.getClassSchedule(userId));
  };

  // Importar JSON de Horario
  const handleImportAiSchedule = () => {
    setAiParseError(null);
    setAiWarnings([]);
    try {
      const cleaned = extractJsonFromAiResponse(aiJsonInput);
      if (!cleaned) {
        throw new Error('No se detectó un bloque JSON válido en el texto pegado.');
      }

      const raw = JSON.parse(cleaned);
      const validation = validateAndNormalizeClassSchedule(raw);

      if (!validation.isValid) {
        throw new Error(validation.errors.join(' '));
      }

      plannerService.importClassSchedule(userId, validation.data!, replaceOnImport);
      setSchedule(plannerService.getClassSchedule(userId));
      setShowAiModal(false);
      setAiJsonInput('');
    } catch (err: any) {
      setAiParseError(err.message || 'Error de sintaxis JSON en el horario.');
    }
  };

  // =========================================================================
  // DETECCIÓN EN VIVO: ¿QUÉ CLASE TOCA HOY / AHORA?
  // =========================================================================
  const liveStatus = useMemo(() => {
    const currentJsDay = currentTime.getDay();
    const activeDay = JS_DAY_MAP[currentJsDay];

    if (!activeDay) {
      return {
        isSunday: true,
        message: '¡Hoy es Domingo! Día de descanso y preparación semanal.',
        currentClass: null,
        nextClass: null,
      };
    }

    const todayClasses = schedule
      .filter((c) => c.dayOfWeek === activeDay)
      .sort((a, b) => a.startTime.localeCompare(b.startTime));

    if (todayClasses.length === 0) {
      return {
        isSunday: false,
        activeDay,
        message: `No tienes clases programadas para hoy ${DAY_LABELS[activeDay]}.`,
        currentClass: null,
        nextClass: null,
      };
    }

    const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();

    let currentClass: ClassScheduleBlock | null = null;
    let nextClass: ClassScheduleBlock | null = null;

    for (const c of todayClasses) {
      const [sh, sm] = c.startTime.split(':').map(Number);
      const [eh, em] = c.endTime.split(':').map(Number);
      const startMin = sh * 60 + (sm || 0);
      const endMin = eh * 60 + (em || 0);

      if (currentMinutes >= startMin && currentMinutes <= endMin) {
        currentClass = c;
        break;
      } else if (currentMinutes < startMin && !nextClass) {
        nextClass = c;
      }
    }

    return {
      isSunday: false,
      activeDay,
      todayClassesCount: todayClasses.length,
      currentClass,
      nextClass,
    };
  }, [schedule, currentTime]);

  return (
    <div className="space-y-6">
      {!user?.id && (
        <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600" />
          <span>
            Modo Invitado activo: el horario se guarda localmente en este dispositivo.
          </span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TARJETA SUPERIOR EN VIVO: SEGUIMIENTO DE CLASES DE HOY */}
      {/* ========================================================================= */}
      <div className="app-card p-5 sm:p-6 bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950 text-white rounded-3xl shadow-soft-lg border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-white/10 text-blue-200 border border-white/10 text-[11px] font-bold font-sans">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>
              {liveStatus.activeDay
                ? `Horario Escolar en Vivo • ${DAY_LABELS[liveStatus.activeDay]}`
                : 'Horario Escolar • Fin de Semana'}
            </span>
          </div>

          <div>
            {liveStatus.currentClass ? (
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold uppercase text-emerald-400 tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>En clase ahora:</span>
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                  {liveStatus.currentClass.subject}
                </h3>
                <p className="text-xs text-slate-300 flex items-center gap-2 pt-0.5">
                  <Clock className="w-3.5 h-3.5 text-blue-300" />
                  <span>
                    {liveStatus.currentClass.startTime} - {liveStatus.currentClass.endTime}
                  </span>
                  {liveStatus.currentClass.classroom && (
                    <>
                      <span>•</span>
                      <MapPin className="w-3.5 h-3.5 text-blue-300" />
                      <span>{liveStatus.currentClass.classroom}</span>
                    </>
                  )}
                  {liveStatus.currentClass.professor && (
                    <>
                      <span>•</span>
                      <User className="w-3.5 h-3.5 text-blue-300" />
                      <span>{liveStatus.currentClass.professor}</span>
                    </>
                  )}
                </p>
              </div>
            ) : liveStatus.nextClass ? (
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold uppercase text-blue-300 tracking-wider">
                  Próxima clase hoy:
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  {liveStatus.nextClass.subject}
                </h3>
                <p className="text-xs text-slate-300 flex items-center gap-2 pt-0.5">
                  <Clock className="w-3.5 h-3.5 text-blue-300" />
                  <span>
                    Inicia a las {liveStatus.nextClass.startTime} (hasta {liveStatus.nextClass.endTime})
                  </span>
                  {liveStatus.nextClass.classroom && (
                    <span>• {liveStatus.nextClass.classroom}</span>
                  )}
                </p>
              </div>
            ) : (
              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-bold text-white">
                  {liveStatus.message || 'Todas las clases de hoy concluidas.'}
                </h3>
                <p className="text-xs text-slate-400">
                  {schedule.length > 0
                    ? `Tienes ${schedule.length} bloques de clase organizados en tu semana.`
                    : 'Añade tus asignaturas escolares o importa tu horario con una foto.'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Acciones Rápidas del Horario */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={() => setShowAiModal(true)}
            className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all flex items-center gap-1.5 border border-white/10 shadow-soft-xs active:scale-95"
            title="Importa tu horario escolar tomándole una foto"
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>Importar Horario con Foto</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-xl bg-[#0F52BA] hover:bg-[#0c4194] text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-soft-xs active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Añadir Clase</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BARRA DE PRESETS RÁPIDOS SEGÚN EL PERFIL */}
      {/* ========================================================================= */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs">
        <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-500">
          Horarios Preconfigurados en 1 Clic:
        </span>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => handleLoadProfilePreset('andres')}
            className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-slate-900 font-semibold transition-all shadow-soft-xs"
          >
            🎒 1er Año Bachillerato (Andrés)
          </button>
          <button
            onClick={() => handleLoadProfilePreset('santiago')}
            className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-slate-900 font-semibold transition-all shadow-soft-xs"
          >
            🏛️ Ciencias UCV (Santiago)
          </button>
          <button
            onClick={() => handleLoadProfilePreset('mafe')}
            className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-slate-900 font-semibold transition-all shadow-soft-xs"
          >
            🌸 Taller Diseño UCAB (Mafe)
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CUADRÍCULA SEMANAL: LUNES A SÁBADO (6 COLUMNAS) */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5 items-start">
        {DAYS_OF_WEEK.map((day) => {
          const isToday = liveStatus.activeDay === day;
          const dayClasses = schedule
            .filter((c) => c.dayOfWeek === day)
            .sort((a, b) => a.startTime.localeCompare(b.startTime));

          return (
            <div
              key={day}
              className={`rounded-2xl border transition-all p-3 space-y-3 min-h-[260px] flex flex-col justify-between ${
                isToday
                  ? 'bg-blue-50/40 border-[#0F52BA]/60 shadow-soft-sm ring-1 ring-[#0F52BA]/20'
                  : 'bg-white border-slate-200/90 shadow-soft-xs'
              }`}
            >
              <div className="space-y-2.5">
                {/* Cabecera del Día */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-xs font-bold ${
                        isToday ? 'text-[#0F52BA]' : 'text-slate-900'
                      }`}
                    >
                      {DAY_LABELS[day]}
                    </span>
                    {isToday && (
                      <span className="text-[9px] font-mono font-extrabold uppercase px-1.5 py-0.2 rounded-md bg-[#0F52BA] text-white">
                        Hoy
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 font-semibold">
                    {dayClasses.length} {dayClasses.length === 1 ? 'clase' : 'clases'}
                  </span>
                </div>

                {/* Lista de Clases del Día */}
                <div className="space-y-2">
                  {dayClasses.length === 0 ? (
                    <div className="py-8 text-center text-slate-400 text-[11px] font-sans">
                      Sin clases
                    </div>
                  ) : (
                    dayClasses.map((cls) => {
                      const colors = COLOR_TAG_MAP[cls.colorTag || 'blue'] || COLOR_TAG_MAP.blue;
                      const isOverlapping = checkIsOverlapping(cls, schedule);
                      return (
                        <div
                          key={cls.id}
                          className={`p-2.5 rounded-xl border ${colors.bg} ${colors.border} space-y-1.5 transition-all group relative`}
                        >
                          <div className="flex items-start justify-between gap-1">
                            <span className={`font-bold text-xs leading-snug line-clamp-2 ${colors.text}`}>
                              {cls.subject}
                            </span>
                            <div className="flex items-center gap-1 shrink-0">
                              {isOverlapping && (
                                <span
                                  className="text-[9px] font-bold text-amber-800 bg-amber-100 border border-amber-300 px-1 py-0.2 rounded"
                                  title="Esta clase coincide en horario con otra"
                                >
                                  ⚠️ Solapada
                                </span>
                              )}
                              <button
                                onClick={() => handleDeleteBlock(cls.id)}
                                className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-600 rounded transition-all"
                                title="Eliminar clase del horario"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>

                          <div className="flex items-center gap-1 font-mono text-[10px] text-slate-500 font-bold">
                            <Clock className="w-3 h-3" />
                            <span>
                              {cls.startTime} - {cls.endTime}
                            </span>
                          </div>

                          {(cls.classroom || cls.professor) && (
                            <div className="text-[10px] text-slate-600 flex flex-col gap-0.5 pt-0.5 border-t border-slate-200/50">
                              {cls.classroom && (
                                <span className="flex items-center gap-1 line-clamp-1">
                                  <MapPin className="w-2.5 h-2.5 text-slate-400" />
                                  <span>{cls.classroom}</span>
                                </span>
                              )}
                              {cls.professor && (
                                <span className="flex items-center gap-1 text-slate-500 line-clamp-1">
                                  <User className="w-2.5 h-2.5 text-slate-400" />
                                  <span>{cls.professor}</span>
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Botón rápido para agregar en este día */}
              <button
                onClick={() => {
                  setNewDay(day);
                  setShowAddModal(true);
                }}
                className="w-full py-1.5 rounded-lg border border-dashed border-slate-200 hover:border-slate-400 text-slate-400 hover:text-slate-700 text-[11px] font-bold transition-all flex items-center justify-center gap-1"
              >
                <Plus className="w-3 h-3" />
                <span>Añadir</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* MODAL: AÑADIR NUEVA CLASE AL HORARIO */}
      {/* ========================================================================= */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-soft-2xl border border-slate-200/90 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 font-sans">
                Añadir Clase al Horario
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveBlock} className="space-y-3.5 text-xs">
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">
                  Asignatura / Materia
                </label>
                <input
                  type="text"
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  placeholder="Ej: Física I, Matemática, Castellano..."
                  className="input-clean w-full text-xs"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">
                    Día de la semana
                  </label>
                  <select
                    value={newDay}
                    onChange={(e) => setNewDay(e.target.value as DayOfWeek)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700"
                  >
                    {DAYS_OF_WEEK.map((d) => (
                      <option key={d} value={d}>
                        {DAY_LABELS[d]}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">
                    Modalidad
                  </label>
                  <select
                    value={newModality}
                    onChange={(e) => setNewModality(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700"
                  >
                    <option value="PRESENCIAL">Presencial</option>
                    <option value="VIRTUAL">Virtual</option>
                    <option value="HIBRIDO">Híbrido</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">
                    Hora Inicio (24h)
                  </label>
                  <input
                    type="time"
                    value={newStartTime}
                    onChange={(e) => setNewStartTime(e.target.value)}
                    className="input-clean w-full text-xs font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">
                    Hora Fin (24h)
                  </label>
                  <input
                    type="time"
                    value={newEndTime}
                    onChange={(e) => setNewEndTime(e.target.value)}
                    className="input-clean w-full text-xs font-mono"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">
                    Aula / Salón (Opcional)
                  </label>
                  <input
                    type="text"
                    value={newClassroom}
                    onChange={(e) => setNewClassroom(e.target.value)}
                    placeholder="Ej: Aula 102, Lab 3..."
                    className="input-clean w-full text-xs"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">
                    Profesor (Opcional)
                  </label>
                  <input
                    type="text"
                    value={newProfessor}
                    onChange={(e) => setNewProfessor(e.target.value)}
                    placeholder="Ej: Prof. Martínez"
                    className="input-clean w-full text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">
                  Color distintivo
                </label>
                <div className="flex items-center gap-2">
                  {Object.keys(COLOR_TAG_MAP).map((colorKey) => (
                    <button
                      key={colorKey}
                      type="button"
                      onClick={() => setNewColorTag(colorKey)}
                      className={`w-7 h-7 rounded-full border-2 transition-all ${
                        COLOR_TAG_MAP[colorKey].bg
                      } ${
                        newColorTag === colorKey
                          ? 'border-slate-900 scale-110 shadow-soft-xs'
                          : 'border-transparent'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-500 hover:text-slate-800 font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#0F52BA] hover:bg-[#0c4194] text-white font-bold shadow-soft-xs"
                >
                  Guardar Clase
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: IMPORTAR HORARIO CON FOTO / GEMINI PROMPT */}
      {/* ========================================================================= */}
      {showAiModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-soft-2xl border border-slate-200/90 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#0F52BA] to-indigo-500 text-white flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Importar Horario Escolar con Foto & IA
                  </h3>
                  <p className="text-xs text-slate-500">
                    Copia el prompt maestro, adjunta la foto a Gemini y pega aquí el resultado.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowAiModal(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#0F52BA] text-[11px] uppercase tracking-wide">
                    Paso 1: Copiar Prompt para Gemini
                  </span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(MASTER_SCHEDULE_PROMPT);
                      setCopiedSchedulePrompt(true);
                      setTimeout(() => setCopiedSchedulePrompt(false), 3000);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-[#0F52BA] text-white font-bold flex items-center gap-1 shadow-soft-xs text-[11px]"
                  >
                    {copiedSchedulePrompt ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedSchedulePrompt ? '¡Copiado!' : 'Copiar Prompt'}</span>
                  </button>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 text-slate-200 font-mono text-[10px] max-h-32 overflow-y-auto">
                  <pre className="whitespace-pre-wrap">{MASTER_SCHEDULE_PROMPT}</pre>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block font-mono">
                  Paso 2: Pega el JSON generado por Gemini:
                </label>
                <textarea
                  value={aiJsonInput}
                  onChange={(e) => setAiJsonInput(e.target.value)}
                  placeholder='{"schemaVersion": "cpe-class-schedule-v1", "classes": [...]}'
                  rows={5}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs focus:bg-white resize-none"
                />
                {aiParseError && (
                  <p className="text-[11px] text-rose-600 font-bold">
                    ⚠️ {aiParseError}
                  </p>
                )}

                {aiWarnings.length > 0 && (
                  <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-[11px] space-y-0.5">
                    <span className="font-bold flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                      Observaciones de extracción:
                    </span>
                    <ul className="list-disc pl-4 space-y-0.5">
                      {aiWarnings.map((w, idx) => (
                        <li key={idx}>{w}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="replaceScheduleCheck"
                    checked={replaceOnImport}
                    onChange={(e) => setReplaceOnImport(e.target.checked)}
                    className="w-3.5 h-3.5 rounded text-[#0F52BA] cursor-pointer"
                  />
                  <label htmlFor="replaceScheduleCheck" className="text-xs text-slate-700 font-medium cursor-pointer">
                    Reemplazar horario existente (en vez de fusionar clases)
                  </label>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  onClick={() => setShowAiModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-500 hover:text-slate-800 font-bold"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleImportAiSchedule}
                  disabled={!aiJsonInput.trim()}
                  className={`px-5 py-2 rounded-xl font-bold transition-all shadow-soft-xs ${
                    aiJsonInput.trim()
                      ? 'bg-slate-900 hover:bg-black text-white'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  Importar Horario Completo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
