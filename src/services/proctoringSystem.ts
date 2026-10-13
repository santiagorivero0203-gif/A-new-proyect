/**
 * Sistema de Supervisión y Liberación de Hardware de Cámara (ProctoringSystem)
 * Centro de Productividad Estudiantil
 * 
 * Blindaje Crítico de Hardware:
 * Garantiza que cuando un usuario finaliza un examen, apaga el modo enfoque,
 * navega a otra sección o cambia de pestaña, todos los tracks de MediaStream
 * (`navigator.mediaDevices.getUserMedia`) sean detenidos estrictamente con `track.stop()`.
 * La luz verde de la cámara de la laptop o el indicador de la barra de estado en móviles
 * se APAGA por completo de forma garantizada.
 */

class ProctoringSystemManager {
  private activeStream: MediaStream | null = null;
  private isListeningGlobalEvents: boolean = false;
  private faceMeshInstance: any = null;

  constructor() {
    this.initGlobalLifecycleListeners();
  }

  /**
   * Registra listeners globales para liberar la cámara si el usuario cambia de pestaña o cierra la app
   */
  private initGlobalLifecycleListeners(): void {
    if (typeof window === 'undefined' || this.isListeningGlobalEvents) return;

    // 1. Al cambiar de pestaña en el navegador, liberar o pausar hardware de captura
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden' && this.activeStream) {
        console.info('[ProctoringSystem] Pestaña oculta. Liberando hardware de cámara para privacidad y ahorro...');
        this.stopCameraHardware();
      }
    });

    // 2. Al cerrar la ventana o navegar fuera
    window.addEventListener('beforeunload', () => {
      this.stopCameraHardware();
    });

    window.addEventListener('pagehide', () => {
      this.stopCameraHardware();
    });

    this.isListeningGlobalEvents = true;
  }

  /**
   * Inicia el stream de cámara para supervisión de examen o modo enfoque
   */
  async startCamera(constraints: MediaStreamConstraints = { video: { width: 640, height: 480 } }): Promise<MediaStream | null> {
    // Si ya había un stream activo previo, liberarlo primero
    this.stopCameraHardware();

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.warn('[ProctoringSystem] getUserMedia no está disponible en este entorno.');
      return null;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      this.activeStream = stream;
      return stream;
    } catch (err) {
      console.warn('[ProctoringSystem] Permiso de cámara denegado o no disponible:', err);
      return null;
    }
  }

  /**
   * Detiene estricta e inmediatamente todos los tracks de video de la cámara
   * y apaga el indicador de hardware del dispositivo
   */
  stopCameraHardware(): void {
    if (this.activeStream) {
      try {
        const tracks = this.activeStream.getTracks();
        tracks.forEach((track) => {
          track.stop();
          console.info(`[ProctoringSystem] Track detenido con éxito: ${track.kind} (${track.label})`);
        });
      } catch (err) {
        console.warn('[ProctoringSystem] Error al detener tracks de video:', err);
      } finally {
        this.activeStream = null;
      }
    }

    // Detener y liberar instancia de MediaPipe / FaceMesh si estuviese cargada
    if (this.faceMeshInstance) {
      try {
        if (typeof this.faceMeshInstance.close === 'function') {
          this.faceMeshInstance.close();
        }
      } catch (e) {
        console.warn('[ProctoringSystem] Error al cerrar instancia de FaceMesh:', e);
      } finally {
        this.faceMeshInstance = null;
      }
    }
  }

  /**
   * Asocia una instancia de FaceMesh o modelo de visión para su posterior limpieza
   */
  registerVisionModel(modelInstance: any): void {
    this.faceMeshInstance = modelInstance;
  }

  /**
   * Verifica si hay una cámara actualmente activa consumiendo hardware
   */
  isCameraActive(): boolean {
    if (!this.activeStream) return false;
    return this.activeStream.getVideoTracks().some((t) => t.readyState === 'live');
  }

  /**
   * Obtiene la referencia al MediaStream activo
   */
  getActiveStream(): MediaStream | null {
    return this.activeStream;
  }
}

export const proctoringSystem = new ProctoringSystemManager();
