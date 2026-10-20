import { useState } from "react";

export const CalculatorApp = () => {
  const [display, setDisplay] = useState("0");
  const [prevVal, setPrevVal] = useState(null);
  const [operation, setOperation] = useState(null);
  const [overwrite, setOverwrite] = useState(false);

  const handleDigit = (digit) => {
    if (overwrite || display === "0") {
      setDisplay(digit);
      setOverwrite(false);
    } else {
      setDisplay(display + digit);
    }
  };

  const handleDot = () => {
    if (overwrite) {
      setDisplay("0.");
      setOverwrite(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const handleOp = (op) => {
    const current = parseFloat(display);
    if (prevVal === null) {
      setPrevVal(current);
    } else if (operation) {
      const result = compute(prevVal, current, operation);
      setPrevVal(result);
      setDisplay(String(result));
    }
    setOperation(op);
    setOverwrite(true);
  };

  const compute = (a, b, op) => {
    switch (op) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "×":
        return a * b;
      case "÷":
        return b !== 0 ? a / b : "Error";
      default:
        return b;
    }
  };

  const handleEqual = () => {
    if (prevVal !== null && operation) {
      const current = parseFloat(display);
      const result = compute(prevVal, current, operation);
      setDisplay(String(result));
      setPrevVal(null);
      setOperation(null);
      setOverwrite(true);
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setPrevVal(null);
    setOperation(null);
    setOverwrite(false);
  };

  const handleToggleSign = () => {
    setDisplay(String(-1 * parseFloat(display)));
  };

  const handlePercent = () => {
    setDisplay(String(parseFloat(display) / 100));
  };

  return (
    <div className="flex flex-col h-full bg-[#29292d] text-white p-4 select-none">
      {/* Display Screen */}
      <div className="h-20 bg-[#1d1d20] rounded-xl mb-4 px-4 flex items-end justify-end border border-white/5 pb-2">
        <span className="text-3xl font-mono tabular-nums font-bold truncate max-w-full">
          {display}
        </span>
      </div>

      {/* Keypad */}
      <div className="grid grid-cols-4 gap-2 flex-1">
        <button
          onClick={handleClear}
          className="rounded-xl bg-[#39393d] hover:bg-[#48484e] text-amber-400 font-semibold text-sm transition-colors"
        >
          C
        </button>
        <button
          onClick={handleToggleSign}
          className="rounded-xl bg-[#39393d] hover:bg-[#48484e] text-white/80 font-semibold text-sm transition-colors"
        >
          ±
        </button>
        <button
          onClick={handlePercent}
          className="rounded-xl bg-[#39393d] hover:bg-[#48484e] text-white/80 font-semibold text-sm transition-colors"
        >
          %
        </button>
        <button
          onClick={() => handleOp("÷")}
          className="rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-bold text-lg transition-colors"
        >
          ÷
        </button>

        {["7", "8", "9"].map((d) => (
          <button
            key={d}
            onClick={() => handleDigit(d)}
            className="rounded-xl bg-[#333337] hover:bg-[#424248] text-white font-semibold text-base transition-colors"
          >
            {d}
          </button>
        ))}
        <button
          onClick={() => handleOp("×")}
          className="rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-bold text-lg transition-colors"
        >
          ×
        </button>

        {["4", "5", "6"].map((d) => (
          <button
            key={d}
            onClick={() => handleDigit(d)}
            className="rounded-xl bg-[#333337] hover:bg-[#424248] text-white font-semibold text-base transition-colors"
          >
            {d}
          </button>
        ))}
        <button
          onClick={() => handleOp("-")}
          className="rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-bold text-lg transition-colors"
        >
          -
        </button>

        {["1", "2", "3"].map((d) => (
          <button
            key={d}
            onClick={() => handleDigit(d)}
            className="rounded-xl bg-[#333337] hover:bg-[#424248] text-white font-semibold text-base transition-colors"
          >
            {d}
          </button>
        ))}
        <button
          onClick={() => handleOp("+")}
          className="rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-bold text-lg transition-colors"
        >
          +
        </button>

        <button
          onClick={() => handleDigit("0")}
          className="col-span-2 rounded-xl bg-[#333337] hover:bg-[#424248] text-white font-semibold text-base transition-colors"
        >
          0
        </button>
        <button
          onClick={handleDot}
          className="rounded-xl bg-[#333337] hover:bg-[#424248] text-white font-semibold text-base transition-colors"
        >
          .
        </button>
        <button
          onClick={handleEqual}
          className="rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-bold text-lg transition-colors"
        >
          =
        </button>
      </div>
    </div>
  );
};
