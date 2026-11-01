import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2022',
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor-react';
          }
          if (id.includes('node_modules/katex') || id.includes('katex')) {
            return 'vendor-katex';
          }
          if (id.includes('node_modules/@supabase')) {
            return 'vendor-supabase';
          }
          if (id.includes('node_modules/lucide-react')) {
            return 'vendor-icons';
          }
          if (id.includes('node_modules/canvas-confetti')) {
            return 'vendor-ui';
          }
          if (id.includes('simadi_preguntas.json') || id.includes('simadi_guides.json') || id.includes('simadi_real_exam_corpus')) {
            return 'data-simadi';
          }
          if (id.includes('mafe_curriculum_hub') || id.includes('mafe_design_theory_course')) {
            return 'data-mafe-curriculum';
          }
          if (id.includes('ucv_intro_course_data')) {
            return 'data-ucv-curriculum';
          }
          if (id.includes('questionBank')) {
            return 'data-question-bank';
          }
          if (id.includes('UCVInteractiveLabs') || id.includes('MathAlgebraView') || id.includes('ScienceLabView')) {
            return 'academic-labs';
          }
          if (id.includes('CreativeDeliveryBoard')) {
            return 'creative-board';
          }
        },
      },
    },
  },
  server: {
    port: 5174,
    host: true,
  },
});
