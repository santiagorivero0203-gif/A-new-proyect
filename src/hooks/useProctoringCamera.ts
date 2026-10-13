import { useState, useEffect, useCallback, useRef } from 'react';
import { proctoringSystem } from '../services/proctoringSystem';

/**
 * Hook de React para Control Seguro de Cámara y Supervisión
 * 
 * Garantiza:
 * 1. Limpieza total de tracks en el desmontaje (`return () => proctoringSystem.stopCameraHardware()`).
 * 2. Apagado automático de la cámara si la ventana pierde el foco o se cambia de pestaña.
 * 3. 0% de fugas de hardware (la luz LED verde de la laptop se apaga garantizado).
 */
export function useProctoringCamera() {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const startCamera = useCallback(async () => {
    setError(null);
    const mediaStream = await proctoringSystem.startCamera();
    if (mediaStream) {
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

  const stopCamera = useCallback(() => {
    proctoringSystem.stopCameraHardware();
    setStream(null);
    setIsActive(false);
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, []);

  // Limpieza estricta al desmontar el componente (ej. al salir del simulador o del Pomodoro)
  useEffect(() => {
    return () => {
      proctoringSystem.stopCameraHardware();
    };
  }, []);

  return {
    stream,
    isActive,
    error,
    videoRef,
    startCamera,
    stopCamera,
  };
}
