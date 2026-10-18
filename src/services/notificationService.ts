/**
 * Servicio Integral de Notificaciones Externas, PWA y Calendarios Nativos (.ics)
 * Centro de Productividad Estudiantil
 * 
 * Capacidades:
 * 1. Notificaciones Nativas del Sistema Operativo (Web Push & Notification API).
 * 2. Generador y Exportador de archivos iCalendar (.ics) compatibles con Google Calendar, Apple Calendar y Outlook.
 * 3. Automatización de "Morning Briefing" matutino para Telegram / Webhooks.
 * 4. Planificador Automático de Repetición Espaciada (Spaced Repetition) ante calificaciones < 60%.
 */

import type { EvaluationEvent } from '../types/academicPlanner.types';
import { plannerService } from './plannerService';

export const notificationService = {
  /**
   * Verifica si las notificaciones nativas están soportadas por el navegador
   */
  isNotificationSupported(): boolean {
    return 'Notification' in window;
  },

  /**
   * Obtiene el estado actual del permiso de notificaciones
   */
  getPermissionStatus(): NotificationPermission {
    if (!this.isNotificationSupported()) return 'denied';
    return Notification.permission;
  },

  /**
   * Solicita permiso al usuario para enviar alertas fuera de la pestaña
   */
  async requestNotificationPermission(): Promise<boolean> {
    if (!this.isNotificationSupported()) {
      console.warn('Este navegador no soporta la API de Notificaciones.');
      return false;
    }

    try {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    } catch (err) {
      console.error('Error al solicitar permiso de notificaciones:', err);
      return false;
    }
  },

  /**
   * Dispara una notificación nativa en el sistema operativo (PC o teléfono)
   */
  sendNativeNotification(
    title: string,
    options?: {
      body?: string;
      tag?: string;
      icon?: string;
      url?: string;
    }
  ): boolean {
    if (!this.isNotificationSupported() || Notification.permission !== 'granted') {
      return false;
    }

    try {
      const notif = new Notification(title, {
        body: options?.body || 'Tienes un recordatorio de estudio pendiente.',
        icon: options?.icon || '/favicon.svg',
        tag: options?.tag || `cpe-notif-${Date.now()}`,
      });

      if (options?.url) {
        notif.onclick = () => {
          window.focus();
          window.location.href = options.url!;
        };
      }
      return true;
    } catch {
      // Fallback a Service Worker si Notification directa falla en móviles
      if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({
          type: 'SHOW_NOTIFICATION',
          title,
          options,
        });
        return true;
      }
      return false;
    }
  },

  /**
   * Genera el contenido formateado de un archivo iCalendar (.ics)
   * Siguiendo la especificación RFC 5545 con alarmas preconfiguradas (24h y 2h antes).
   */
  generateICalendar(events: EvaluationEvent[], calendarName: string = 'Plan Académico CPE'): string {
    const parseDateTime = (dateStr: string, timeStr?: string): { startFormatted: string; endFormatted: string } => {
      const year = parseInt(dateStr.slice(0, 4), 10);
      const month = parseInt(dateStr.slice(5, 7), 10) - 1;
      const day = parseInt(dateStr.slice(8, 10), 10);

      let hours = 9;
      let minutes = 0;
      if (timeStr) {
        const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)?/i);
        if (match) {
          hours = parseInt(match[1], 10);
          minutes = parseInt(match[2], 10);
          const meridiem = match[3]?.toUpperCase();
          if (meridiem === 'PM' && hours < 12) hours += 12;
          if (meridiem === 'AM' && hours === 12) hours = 0;
        }
      }

      const start = new Date(year, month, day, hours, minutes, 0);
      const end = new Date(start.getTime() + 2 * 60 * 60 * 1000); // 2 horas de duración estimada

      const formatPart = (d: Date): string => {
        const y = d.getFullYear();
        const m = (d.getMonth() + 1).toString().padStart(2, '0');
        const dt = d.getDate().toString().padStart(2, '0');
        const h = d.getHours().toString().padStart(2, '0');
        const min = d.getMinutes().toString().padStart(2, '0');
        return `${y}${m}${dt}T${h}${min}00`;
      };

      return {
        startFormatted: formatPart(start),
        endFormatted: formatPart(end),
      };
    };

    const nowStr = new Date()
      .toISOString()
      .replace(/[-:]/g, '')
      .split('.')[0] + 'Z';

    const icsLines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Centro de Productividad Estudiantil//CPE Academic Calendar//ES',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      `X-WR-CALNAME:${calendarName}`,
      'X-WR-TIMEZONE:America/Caracas',
    ];

    events.forEach((ev) => {
      const { startFormatted, endFormatted } = parseDateTime(ev.date, ev.time);

      icsLines.push(
        'BEGIN:VEVENT',
        `UID:${ev.id}@centroproductividad.app`,
        `DTSTAMP:${nowStr}`,
        `DTSTART:${startFormatted}`,
        `DTEND:${endFormatted}`,
        `SUMMARY:[${ev.subject}] ${ev.title} (${ev.weightPercentage}% Ponderación)`,
        `DESCRIPTION:Evaluación tipo ${ev.type}. Ponderación oficial: ${ev.weightPercentage}% de la asignatura ${ev.subject}.${ev.topics?.length ? `\\nTemas evaluados: ${ev.topics.join(', ')}` : ''}`,
        `LOCATION:${ev.location || 'Aula Principal'}`,
        'STATUS:CONFIRMED',
        'CATEGORIES:ACADÉMICO,EXAMEN',
        // ALARMA 1: 24 horas antes
        'BEGIN:VALARM',
        'TRIGGER:-P1D',
        'ACTION:DISPLAY',
        `DESCRIPTION:Recordatorio 24h: Mañana tienes ${ev.title} (${ev.subject})`,
        'END:VALARM',
        // ALARMA 2: 2 horas antes
        'BEGIN:VALARM',
        'TRIGGER:-PT2H',
        'ACTION:DISPLAY',
        `DESCRIPTION:Alerta 2h: En breve inicia ${ev.title} en ${ev.location || 'tu aula'}`,
        'END:VALARM',
        'END:VEVENT'
      );
    });

    icsLines.push('END:VCALENDAR');
    return icsLines.join('\r\n');
  },

  /**
   * Genera y descarga el archivo .ics para sincronizar con Google Calendar o Apple Calendar
   */
  downloadICalendarFile(events: EvaluationEvent[], filename: string = 'cronograma-academico.ics'): void {
    if (!events.length) {
      alert('No hay evaluaciones registradas para exportar.');
      return;
    }

    const icsContent = this.generateICalendar(events);
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  },

  /**
   * Genera el texto del 'Morning Briefing' para enviar vía Telegram o correo
   */
  generateTelegramMorningBriefing(params: {
    studentName: string;
    events: EvaluationEvent[];
    tasks: { title: string; subject: string; priority: string; completed: boolean }[];
    pendingReviewsCount: number;
  }): string {
    const { studentName, events, tasks, pendingReviewsCount } = params;
    const today = new Date().toISOString().slice(0, 10);

    const todayEvents = events.filter((e) => e.date === today);
    const upcomingEvents = events
      .filter((e) => e.date > today)
      .slice(0, 3);
    const pendingTasks = tasks.filter((t) => !t.completed).slice(0, 4);

    return `☀️ *Briefing Matutino CPE - ${studentName}*\n\n` +
      `📅 *Evaluaciones para Hoy:* ${todayEvents.length ? todayEvents.map(e => `\n• ${e.title} (${e.subject}, ${e.time || '08:00 AM'})`).join('') : 'Ninguna evaluación hoy 🎉'}\n\n` +
      `⏳ *Próximos Parciales:* ${upcomingEvents.length ? upcomingEvents.map(e => `\n• ${e.date}: ${e.title} (${e.weightPercentage}%)`).join('') : 'Sin evaluaciones cercanas.'}\n\n` +
      `📝 *Tareas Prioritarias:* ${pendingTasks.length ? pendingTasks.map(t => `\n• [${t.priority}] ${t.title} (${t.subject})`).join('') : 'Todas las tareas al día.'}\n\n` +
      (pendingReviewsCount > 0 ? `🔁 *Repetición Espaciada:* Tienes ${pendingReviewsCount} bloques de repaso agendados para fijar conceptos débiles.\n\n` : '') +
      `💡 *Enfoque del día:* Completa 2 bloques Pomodoro sin distracciones de teléfono. ¡Éxito!`;
  },

  /**
   * Planificador Automático de Repetición Espaciada:
   * Si en el simulador el estudiante saca menos de 60% (12/20 pts),
   * agenda automáticamente bloques de 15 minutos de repaso a los 2, 5 y 10 días.
   */
  scheduleSpacedRepetition(
    userId: string,
    topic: string,
    subject: string,
    scorePercentage: number
  ): EvaluationEvent[] {
    if (scorePercentage >= 60) {
      return [];
    }

    const intervals = [2, 5, 10]; // días después
    const newEvents: EvaluationEvent[] = [];

    intervals.forEach((days, idx) => {
      const targetDate = new Date();
      targetDate.setDate(targetDate.getDate() + days);
      const dateStr = targetDate.toISOString().slice(0, 10);

      const event: EvaluationEvent = {
        id: `sr-${Date.now()}-${idx}`,
        title: `Repaso Espaciado (${idx + 1}/3): ${topic}`,
        subject,
        date: dateStr,
        time: '05:00 PM',
        type: 'RECUPERACION',
        weightPercentage: 0,
        location: 'Sesión Active Recall (15 min)',
        topics: [topic],
        notes: `Generado automáticamente por el algoritmo adaptativo tras puntuación del ${Math.round(scorePercentage)}% en simulacro.`,
      };

      plannerService.addEvent(userId, event);
      newEvents.push(event);
    });

    // Enviar notificación al usuario informándole del agendamiento
    this.sendNativeNotification('Algoritmo de Repetición Espaciada', {
      body: `Se han agendado 3 micro-repasos de "${topic}" para afianzar tus respuestas débiles.`,
    });

    return newEvents;
  },

  /**
   * Monitor Inteligente de Plazos (Deadlines):
   * Escanea evaluaciones y entregas pendientes. Si el plazo vence hoy o en las próximas 48h,
   * emite una notificación nativa deduplicada para no perder ninguna entrega ni parcial.
   */
  checkAndNotifyUpcomingDeadlines(params: {
    events?: EvaluationEvent[];
    deliveries?: { id: string; title: string; course?: string; dueDate: string }[];
  }): { notifiedCount: number; upcomingCount: number } {
    if (!this.isNotificationSupported() || Notification.permission !== 'granted') {
      return { notifiedCount: 0, upcomingCount: 0 };
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const in48Hours = new Date(today.getTime() + 48 * 60 * 60 * 1000);
    let notifiedCount = 0;
    let upcomingCount = 0;

    // 1. Notificar Evaluaciones & Parciales Próximos
    if (params.events && params.events.length > 0) {
      params.events.forEach((ev) => {
        if (!ev.date) return;
        const evDate = new Date(ev.date + 'T00:00:00');
        if (evDate >= today && evDate <= in48Hours) {
          upcomingCount++;
          const dedupKey = `cpe_notif_sent_event_${ev.id}_${ev.date}`;
          if (!localStorage.getItem(dedupKey)) {
            const isToday = evDate.getTime() === today.getTime();
            const timeTag = isToday ? '¡Hoy mismo!' : 'Mañana o en 48 horas';
            this.sendNativeNotification(`📅 Recordatorio de Examen: ${ev.title}`, {
              body: `${timeTag} tienes ${ev.type || 'evaluación'} de ${ev.subject} (${ev.weightPercentage}%). Puntos clave: ${(ev.topics || []).slice(0, 2).join(', ') || 'Revisa tus apuntes'}.`,
              tag: `exam-${ev.id}`,
            });
            localStorage.setItem(dedupKey, new Date().toISOString());
            notifiedCount++;
          }
        }
      });
    }

    // 2. Notificar Entregas Creativas & Proyectos
    if (params.deliveries && params.deliveries.length > 0) {
      params.deliveries.forEach((del) => {
        if (!del.dueDate) return;
        const dueDate = new Date(del.dueDate + 'T00:00:00');
        if (dueDate >= today && dueDate <= in48Hours) {
          upcomingCount++;
          const dedupKey = `cpe_notif_sent_delivery_${del.id}_${del.dueDate}`;
          if (!localStorage.getItem(dedupKey)) {
            const isToday = dueDate.getTime() === today.getTime();
            const timeTag = isToday ? '¡Vence Hoy!' : 'Vence en menos de 48 horas';
            this.sendNativeNotification(`🎨 Recordatorio de Entrega: ${del.title}`, {
              body: `${timeTag} para ${del.course || 'tu materia'}. Recuerda revisar tus archivos y bocetos antes de enviar.`,
              tag: `delivery-${del.id}`,
            });
            localStorage.setItem(dedupKey, new Date().toISOString());
            notifiedCount++;
          }
        }
      });
    }

    return { notifiedCount, upcomingCount };
  },

  /**
   * Programa una confirmación o alerta inmediata para una entrega específica
   */
  scheduleDeliveryNotification(delivery: { id: string; title: string; course?: string; dueDate: string }): boolean {
    return this.sendNativeNotification(`🔔 Alerta de Entrega Programada`, {
      body: `"${delivery.title}" (${delivery.course || 'Materia'}) registrada para el ${delivery.dueDate}. Te avisaremos 48h antes del cierre.`,
      tag: `schedule-${delivery.id}`,
    });
  },
};
