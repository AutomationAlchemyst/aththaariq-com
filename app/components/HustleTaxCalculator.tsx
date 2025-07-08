"use client"; // This directive is essential for components with interactivity (useState, onClick, etc.).

import { useState } from 'react';

// Define an interface for the calculation results for type safety.
interface CalculationResult {
  weeklyHours: number;
  weeklyCost: number;
  yearlyHours: number;
  yearlyCost: number;
  taskName: string;
}

export default function HustleTaxCalculator() {
  // State variables to hold the user's input.
  const [taskName, setTaskName] = useState('');
  const [timesPerWeek, setTimesPerWeek] = useState<number | ''>('');
  const [minutesPerTask, setMinutesPerTask] = useState<number | ''>('');
  const [hourlyRate, setHourlyRate] = useState<number | ''>('');

  // State to hold the final calculation result.
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Handles the calculation logic when the button is clicked.
  const handleCalculate = () => {
    // Basic validation to ensure all fields are filled and are numbers.
    if (!taskName || !timesPerWeek || !minutesPerTask || !hourlyRate) {
      setError('Please fill out all fields to calculate the cost.');
      setResult(null);
      return;
    }

    // Clear previous errors if validation passes.
    setError(null);

    // Perform the calculation.
    const totalMinutesPerWeek = timesPerWeek * minutesPerTask;
    const totalHoursPerWeek = totalMinutesPerWeek / 60;
    const totalCostPerWeek = totalHoursPerWeek * hourlyRate;
    const totalHoursPerYear = totalHoursPerWeek * 52;
    const totalCostPerYear = totalCostPerWeek * 52;

    // Set the result state to display the output.
    setResult({
      weeklyHours: totalHoursPerWeek,
      weeklyCost: totalCostPerWeek,
      yearlyHours: totalHoursPerYear,
      yearlyCost: totalCostPerYear,
      taskName: taskName,
    });
  };

  return (
    <div className="space-y-8">
      {/* INPUT FORM */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Task Name Input */}
        <div>
          <label htmlFor="taskName" className="block text-sm font-medium text-gray-300 mb-2">Repetitive Task Name</label>
          <input
            type="text"
            id="taskName"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="e.g., Manual data entry"
            className="w-full bg-gray-900 border border-gray-700 rounded-md p-3 text-white focus:ring-2 focus:ring-cyan-accent focus:border-cyan-accent transition"
          />
        </div>
        {/* Hourly Rate Input */}
        <div>
          <label htmlFor="hourlyRate" className="block text-sm font-medium text-gray-300 mb-2">Your Hourly Rate ($)</label>
          <input
            type="number"
            id="hourlyRate"
            value={hourlyRate}
            onChange={(e) => setHourlyRate(e.target.value === '' ? '' : parseFloat(e.target.value))}
            placeholder="e.g., 50"
            className="w-full bg-gray-900 border border-gray-700 rounded-md p-3 text-white focus:ring-2 focus:ring-cyan-accent focus:border-cyan-accent transition"
          />
        </div>
        {/* Times Per Week Input */}
        <div>
          <label htmlFor="timesPerWeek" className="block text-sm font-medium text-gray-300 mb-2">How many times per week?</label>
          <input
            type="number"
            id="timesPerWeek"
            value={timesPerWeek}
            onChange={(e) => setTimesPerWeek(e.target.value === '' ? '' : parseInt(e.target.value, 10))}
            placeholder="e.g., 5"
            className="w-full bg-gray-900 border border-gray-700 rounded-md p-3 text-white focus:ring-2 focus:ring-cyan-accent focus:border-cyan-accent transition"
          />
        </div>
        {/* Minutes Per Task Input */}
        <div>
          <label htmlFor="minutesPerTask" className="block text-sm font-medium text-gray-300 mb-2">How many minutes per task?</label>
          <input
            type="number"
            id="minutesPerTask"
            value={minutesPerTask}
            onChange={(e) => setMinutesPerTask(e.target.value === '' ? '' : parseInt(e.target.value, 10))}
            placeholder="e.g., 30"
            className="w-full bg-gray-900 border border-gray-700 rounded-md p-3 text-white focus:ring-2 focus:ring-cyan-accent focus:border-cyan-accent transition"
          />
        </div>
      </div>

      {/* ACTION BUTTON */}
      <div className="text-center">
        <button
          onClick={handleCalculate}
          className="bg-cyan-accent text-gray-900 font-bold uppercase py-3 px-10 rounded-md hover:bg-cyan-400 transition-transform transform hover:scale-105"
        >
          Calculate The Real Cost
        </button>
      </div>
      
      {/* ERROR MESSAGE DISPLAY */}
      {error && (
        <div className="text-center bg-rose-900/50 border border-rose-accent text-rose-accent rounded-md p-4">
          <p>{error}</p>
        </div>
      )}

      {/* RESULTS DISPLAY */}
      {result && (
        <div className="text-center bg-gray-900/70 border border-gray-700 rounded-xl p-8 mt-8 animate-fade-in">
          <p className="text-gray-400 text-lg">The "Hustle Tax" for</p>
          <p className="text-cyan-accent text-3xl font-bold mb-6">"{result.taskName}"</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="bg-gray-800 p-4 rounded-lg">
              <p className="text-sm text-gray-400">Time Wasted Per Year</p>
              <p className="text-4xl font-bold text-white">{result.yearlyHours.toFixed(1)} <span className="text-xl text-gray-400">hours</span></p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <p className="text-sm text-gray-400">Money Burned Per Year</p>
              <p className="text-4xl font-bold text-white">${result.yearlyCost.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} <span className="text-xl text-gray-400">/ year</span></p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
