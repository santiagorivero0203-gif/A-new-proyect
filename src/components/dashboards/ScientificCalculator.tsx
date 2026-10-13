import React, { useState } from 'react';
import { CalculatorIcon, RotateCcwIcon } from '../common/Icons';

export const ScientificCalculator: React.FC<{ isEmbedded?: boolean }> = ({ isEmbedded = false }) => {
  const [display, setDisplay] = useState('0');
  const [memoryVal, setMemoryVal] = useState<number | null>(null);
  const [angleMode, setAngleMode] = useState<'RAD' | 'DEG'>('RAD');
  const [history, setHistory] = useState<string>('');

  const appendToDisplay = (value: string) => {
    setDisplay((prev) => (prev === '0' || prev === 'Error' ? value : prev + value));
  };

  const clearAll = () => {
    setDisplay('0');
    setHistory('');
  };

  const backspace = () => {
    setDisplay((prev) => {
      if (prev.length <= 1 || prev === 'Error') return '0';
      return prev.slice(0, -1);
    });
  };

  const calculateResult = () => {
    try {
      setHistory(display + ' =');
      let sanitized = display
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/π/g, `${Math.PI}`)
        .replace(/e(?![a-zA-Z0-9])/g, `${Math.E}`);

      sanitized = sanitized.replace(/\^/g, '**');

      // eslint-disable-next-line @typescript-eslint/no-implied-eval
      const result = Function(`"use strict"; return (${sanitized})`)();

      if (typeof result === 'number' && !isNaN(result) && isFinite(result)) {
        const formatted =
          Math.abs(result) < 1e-6 || Math.abs(result) > 1e10
            ? result.toExponential(4)
            : Number(result.toFixed(8)).toString();
        setDisplay(formatted);
        setMemoryVal(result);
      } else {
        setDisplay('Error');
      }
    } catch {
      setDisplay('Error');
    }
  };

  const applyFunction = (func: string) => {
    try {
      const val = parseFloat(display);
      if (isNaN(val)) return;

      let res = 0;
      switch (func) {
        case 'sin':
          res = angleMode === 'DEG' ? Math.sin((val * Math.PI) / 180) : Math.sin(val);
          break;
        case 'cos':
          res = angleMode === 'DEG' ? Math.cos((val * Math.PI) / 180) : Math.cos(val);
          break;
        case 'tan':
          res = angleMode === 'DEG' ? Math.tan((val * Math.PI) / 180) : Math.tan(val);
          break;
        case 'sqrt':
          if (val < 0) {
            setDisplay('Error');
            return;
          }
          res = Math.sqrt(val);
          break;
        case 'ln':
          if (val <= 0) {
            setDisplay('Error');
            return;
          }
          res = Math.log(val);
          break;
        case 'log10':
          if (val <= 0) {
            setDisplay('Error');
            return;
          }
          res = Math.log10(val);
          break;
        case 'inv':
          if (val === 0) {
            setDisplay('Error');
            return;
          }
          res = 1 / val;
          break;
        default:
          return;
      }
      setHistory(`${func}(${display}) =`);
      setDisplay(Number(res.toFixed(8)).toString());
    } catch {
      setDisplay('Error');
    }
  };

  const insertConstant = (c: 'c' | 'h' | 'G' | 'pi' | 'e') => {
    switch (c) {
      case 'c':
        appendToDisplay('299792458');
        break;
      case 'h':
        appendToDisplay('6.626e-34');
        break;
      case 'G':
        appendToDisplay('6.674e-11');
        break;
      case 'pi':
        appendToDisplay('π');
        break;
      case 'e':
        appendToDisplay('e');
        break;
    }
  };

  return (
    <div
      className={`bg-white border border-slate-200/90 rounded-2xl p-5 shadow-soft ${
        isEmbedded ? 'w-full' : 'max-w-md mx-auto'
      }`}
    >
      {/* Header de la Calculadora */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-slate-100 text-slate-700">
            <CalculatorIcon className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 tracking-wide uppercase">Calculadora Científica</h4>
            <span className="text-[10px] text-slate-400 font-mono">Modo de Alta Precisión</span>
          </div>
        </div>
        <button
          onClick={() => setAngleMode(angleMode === 'RAD' ? 'DEG' : 'RAD')}
          className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
        >
          {angleMode}
        </button>
      </div>

      {/* Pantalla Digital */}
      <div className="p-3.5 mb-3 bg-slate-50 border border-slate-200/80 rounded-xl text-right overflow-hidden shadow-inner font-mono">
        <div className="text-[11px] text-slate-400 h-4 truncate">{history || ' '}</div>
        <div className="text-2xl font-bold text-slate-900 tracking-wider truncate mt-0.5 select-all">
          {display}
        </div>
      </div>

      {/* Constantes Rápidas */}
      <div className="grid grid-cols-5 gap-1 mb-2">
        {(['c', 'h', 'G', 'pi', 'e'] as const).map((constant) => (
          <button
            key={constant}
            onClick={() => insertConstant(constant)}
            className="py-1 px-1.5 rounded-lg text-[11px] font-mono bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 border border-slate-200/50 transition-all text-center"
          >
            {constant === 'pi' ? 'π' : constant}
          </button>
        ))}
      </div>

      {/* Botonera Científica */}
      <div className="grid grid-cols-4 gap-1.5 text-xs font-mono font-medium">
        {/* Fila 1 */}
        <button onClick={() => applyFunction('sin')} className="p-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700">sin</button>
        <button onClick={() => applyFunction('cos')} className="p-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700">cos</button>
        <button onClick={() => applyFunction('tan')} className="p-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700">tan</button>
        <button onClick={clearAll} className="p-2.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200">C</button>

        {/* Fila 2 */}
        <button onClick={() => applyFunction('sqrt')} className="p-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700">√</button>
        <button onClick={() => appendToDisplay('^')} className="p-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700">xʸ</button>
        <button onClick={() => applyFunction('ln')} className="p-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700">ln</button>
        <button onClick={backspace} className="p-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-amber-600 flex items-center justify-center">
          <RotateCcwIcon className="w-3.5 h-3.5" />
        </button>

        {/* Fila 3 */}
        <button onClick={() => appendToDisplay('(')} className="p-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700">(</button>
        <button onClick={() => appendToDisplay(')')} className="p-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700">)</button>
        <button onClick={() => applyFunction('inv')} className="p-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700">1/x</button>
        <button onClick={() => appendToDisplay('÷')} className="p-2.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200">÷</button>

        {/* Numérico */}
        <button onClick={() => appendToDisplay('7')} className="p-2.5 rounded-lg bg-white border border-slate-200/80 hover:bg-slate-50 text-slate-900 font-semibold">7</button>
        <button onClick={() => appendToDisplay('8')} className="p-2.5 rounded-lg bg-white border border-slate-200/80 hover:bg-slate-50 text-slate-900 font-semibold">8</button>
        <button onClick={() => appendToDisplay('9')} className="p-2.5 rounded-lg bg-white border border-slate-200/80 hover:bg-slate-50 text-slate-900 font-semibold">9</button>
        <button onClick={() => appendToDisplay('×')} className="p-2.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200">×</button>

        <button onClick={() => appendToDisplay('4')} className="p-2.5 rounded-lg bg-white border border-slate-200/80 hover:bg-slate-50 text-slate-900 font-semibold">4</button>
        <button onClick={() => appendToDisplay('5')} className="p-2.5 rounded-lg bg-white border border-slate-200/80 hover:bg-slate-50 text-slate-900 font-semibold">5</button>
        <button onClick={() => appendToDisplay('6')} className="p-2.5 rounded-lg bg-white border border-slate-200/80 hover:bg-slate-50 text-slate-900 font-semibold">6</button>
        <button onClick={() => appendToDisplay('-')} className="p-2.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200">-</button>

        <button onClick={() => appendToDisplay('1')} className="p-2.5 rounded-lg bg-white border border-slate-200/80 hover:bg-slate-50 text-slate-900 font-semibold">1</button>
        <button onClick={() => appendToDisplay('2')} className="p-2.5 rounded-lg bg-white border border-slate-200/80 hover:bg-slate-50 text-slate-900 font-semibold">2</button>
        <button onClick={() => appendToDisplay('3')} className="p-2.5 rounded-lg bg-white border border-slate-200/80 hover:bg-slate-50 text-slate-900 font-semibold">3</button>
        <button onClick={() => appendToDisplay('+')} className="p-2.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200">+</button>

        <button onClick={() => appendToDisplay('0')} className="p-2.5 rounded-lg bg-white border border-slate-200/80 hover:bg-slate-50 text-slate-900 font-semibold">0</button>
        <button onClick={() => appendToDisplay('.')} className="p-2.5 rounded-lg bg-white border border-slate-200/80 hover:bg-slate-50 text-slate-900 font-semibold">.</button>
        <button onClick={() => memoryVal !== null && appendToDisplay(memoryVal.toString())} className="p-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700">Ans</button>
        <button onClick={calculateResult} className="p-2.5 rounded-lg bg-[#0071e3] hover:bg-[#005bb5] text-white font-bold shadow-sm">=</button>
      </div>
    </div>
  );
};
