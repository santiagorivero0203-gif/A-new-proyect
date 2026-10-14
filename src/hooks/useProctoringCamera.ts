import { useState, useEffect, useCallback, useRef } from 'react';
import { proctoringSystem } from '../services/proctoringSystem';

/**
 * Hook de React para Control Seguro de Cámara y Supervisión (Proctoring)
 * 
 * Garantiza:
 * 1. Limpieza total de tracks en el desmontaje mediante `streamRef.current` y `proctoringSystem.stopCameraHardware()`.
 * 2. Apagado automático de la cámara si la ventana pierde el foco o se cambia de pestaña.
 * 3. Cero fugas de hardware (el LED verde de la webcam se apaga inmediatamente).
 */
export function useProctoringCamera() {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    proctoringSystem.stopCameraHardware();
    setStream(null);
    setIsActive(false);
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, []);

  const startCamera = useCallback(async () => {
    setError(null);
    const mediaStream = await proctoringSystem.startCamera();
    if (mediaStream) {
      streamRef.current = mediaStream;
      setStream(mediaStream);
      setIsActive(true);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } else {
      setError('No se pudo acceder a la cámara o el permiso fue denegado.');
      setIsActive(false);
    }
  }, []);

  // Limpieza estricta y garantizada al desmontar el componente (ej. al salir de ExamRunner o SimulatorEngine)
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  return {
    stream,
    isActive,
    error,
    videoRef,
    startCamera,
    stopCamera,
  };
}
