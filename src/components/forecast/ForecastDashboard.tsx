'use client';

import React, { useState, useEffect, useRef } from 'react';
import Papa from 'papaparse';
import { runHoltWinters, runLagRegression } from '@/lib/math/forecasting';
import {
  ComposedChart,
  Line,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { Sparkles, Sliders, Upload, BarChart2, TrendingUp, Info, AlertCircle } from 'lucide-react';

// Authentic Cognitio Healthcare Claims dataset (18 months of PLPM costs in USD)
const CLAIMS_DATA = [
  145.2, 148.5, 142.1, 155.8, 162.3, 168.0, 158.4, 150.2, 153.9, 165.2, 172.4, 178.1,
  152.4, 156.1, 149.8, 164.2, 170.5, 176.8, 166.5, 157.8, 161.4, 173.8, 180.9, 186.2
];

// Clicks dataset (28 days of daily click volume in thousands)
const CLICKS_DATA = [
  12.5, 13.1, 14.2, 14.8, 15.2, 11.2, 10.5, 12.8, 13.4, 14.5, 15.1, 15.6, 11.6, 10.8,
  13.2, 13.8, 14.9, 15.5, 16.0, 12.0, 11.2, 13.6, 14.2, 15.3, 15.9, 16.4, 12.4, 11.6
];

export default function ForecastDashboard() {
  // Config state
  const [datasetType, setDatasetType] = useState<'claims' | 'clicks' | 'custom'>('claims');
  const [modelType, setModelType] = useState<'hw' | 'lr'>('lr');
  const [horizon, setHorizon] = useState<number>(12);
  const [seasonality, setSeasonality] = useState<number>(12);

  // Data states
  const [historyData, setHistoryData] = useState<number[]>(CLAIMS_DATA);
  const [customFileName, setCustomFileName] = useState<string>('');
  
  // Output states
  const [forecastResult, setForecastResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync sample datasets on change
  useEffect(() => {
    if (datasetType === 'claims') {
      setHistoryData(CLAIMS_DATA);
      setSeasonality(12);
    } else if (datasetType === 'clicks') {
      setHistoryData(CLICKS_DATA);
      setSeasonality(7);
    }
  }, [datasetType]);

  // Run forecasting logic on input change
  useEffect(() => {
    if (historyData.length === 0) return;

    if (modelType === 'hw') {
      const res = runHoltWinters(historyData, seasonality, horizon);
      setForecastResult({ ...res, shap: [] });
    } else {
      const res = runLagRegression(historyData, seasonality, horizon);
      setForecastResult(res);
    }
  }, [historyData, modelType, horizon, seasonality]);

  // Handle CSV Upload
  const handleCSVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCustomFileName(file.name);
    Papa.parse(file, {
      complete: (results) => {
        // Look for number columns
        const numbers: number[] = [];
        results.data.forEach((row: any) => {
          // Flatten row arrays or objects
          const values = Object.values(row);
          for (const val of values) {
            const num = Number(String(val).replace(/[^0-9.-]/g, ''));
            if (!isNaN(num) && num > 0) {
              numbers.push(num);
              break; // Take first number column in row
            }
          }
        });

        if (numbers.length > 5) {
          setDatasetType('custom');
          setHistoryData(numbers);
        } else {
          alert('Could not extract sufficient numerical points from CSV (minimum 6 values required).');
        }
      },
      header: false,
      skipEmptyLines: true,
    });
  };

  // Build chart-ready data structure
  const chartData = (() => {
    if (!forecastResult) return [];
    
    const results = [];
    const n = historyData.length;

    // Push historical points
    for (let i = 0; i < n; i++) {
      const fittedVal = forecastResult.fitted?.[i];
      results.push({
        index: i + 1,
        actual: historyData[i],
        fitted: (i >= seasonality && fittedVal !== undefined) ? Number(fittedVal.toFixed(1)) : null,
      });
    }

    // Push forecasted points
    const forecastLen = forecastResult.forecast?.length || 0;
    for (let h = 0; h < Math.min(horizon, forecastLen); h++) {
      results.push({
        index: n + h + 1,
        forecast: Number(forecastResult.forecast[h].toFixed(1)),
        ciLower: Number(forecastResult.confidenceLower[h].toFixed(1)),
        ciUpper: Number(forecastResult.confidenceUpper[h].toFixed(1)),
      });
    }

    return results;
  })();

  const formatSHAPData = () => {
    if (!forecastResult || !forecastResult.shap || forecastResult.shap.length === 0) return [];
    return forecastResult.shap.map((item: any) => ({
      name: item.feature,
      value: Number(item.value.toFixed(2)),
    }));
  };

  return (
    <div className="space-y-8 w-full">
      {/* Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Controls Column */}
        <div className="bg-white border border-zinc-200 rounded-md p-6 space-y-6 lg:col-span-1 shadow-sm">
          <h3 className="font-mono text-xs text-zinc-500 uppercase tracking-wider flex items-center space-x-2">
            <Sliders className="h-4 w-4 text-[#782849]" />
            <span>Parameters</span>
          </h3>

          {/* Dataset Selection */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-zinc-400 block">Dataset Source</label>
            <select
              value={datasetType}
              onChange={(e: any) => setDatasetType(e.target.value)}
              className="w-full bg-white border border-zinc-200 rounded-md p-2 font-sans text-xs text-zinc-700 focus:border-[#782849] outline-none"
            >
              <option value="claims">Cognitio Claims (PLPM)</option>
              <option value="clicks">ShyftLabs Ad Clicks</option>
              {datasetType === 'custom' && <option value="custom">Uploaded: {customFileName}</option>}
            </select>
          </div>

          {/* Model Selection */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-zinc-400 block">Forecasting Model</label>
            <select
              value={modelType}
              onChange={(e: any) => setModelType(e.target.value)}
              className="w-full bg-white border border-zinc-200 rounded-md p-2 font-sans text-xs text-zinc-700 focus:border-[#782849] outline-none"
            >
              <option value="lr">XGB-equivalent Lag-Regression</option>
              <option value="hw">Holt-Winters Exponential Smoothing</option>
            </select>
          </div>

          {/* Horizon Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-zinc-500">Horizon steps</span>
              <span className="text-zinc-800 font-semibold">{horizon}</span>
            </div>
            <input
              type="range"
              min={1}
              max={24}
              value={horizon}
              onChange={(e) => setHorizon(Number(e.target.value))}
              className="w-full bg-zinc-100 h-1 rounded-md cursor-pointer"
              style={{ accentColor: '#782849' }}
            />
          </div>

          {/* Seasonality Cycle */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-zinc-500">Seasonality Cycle</span>
              <span className="text-zinc-800 font-semibold">{seasonality}</span>
            </div>
            <input
              type="range"
              min={2}
              max={15}
              value={seasonality}
              onChange={(e) => setSeasonality(Number(e.target.value))}
              className="w-full bg-zinc-100 h-1 rounded-md cursor-pointer"
              style={{ accentColor: '#782849' }}
            />
          </div>

          {/* CSV File Upload */}
          <div className="border-t border-zinc-100 pt-4">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex items-center justify-center space-x-2 border border-dashed border-zinc-200 hover:border-[#782849]/40 rounded-md p-3 bg-zinc-50 hover:bg-[#782849]/5 text-zinc-500 hover:text-[#782849] transition-all duration-150 font-mono text-xs cursor-pointer"
            >
              <Upload className="h-4 w-4" />
              <span>Upload Custom CSV</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleCSVUpload}
              className="hidden"
            />
          </div>
        </div>

        {/* Chart View Column */}
        <div className="lg:col-span-3 space-y-6">
          {/* Metrics Header */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white border border-zinc-200 rounded-md p-4 shadow-sm">
              <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest block mb-1">
                MAPE (Mean Error)
              </span>
              <span className="text-lg font-bold text-zinc-800">
                {forecastResult ? `${forecastResult.mape.toFixed(2)}%` : '0.00%'}
              </span>
            </div>

            <div className="bg-white border border-zinc-200 rounded-md p-4 shadow-sm">
              <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest block mb-1">
                RMSE (Std Dev)
              </span>
              <span className="text-lg font-bold text-zinc-800">
                {forecastResult ? forecastResult.rmse.toFixed(2) : '0.00'}
              </span>
            </div>

            <div className="bg-white border border-zinc-200 rounded-md p-4 col-span-2 shadow-sm">
              <div className="flex items-center space-x-2 text-zinc-800">
                <TrendingUp className="h-4 w-4 text-[#782849]" />
                <span className="font-mono text-[10px] uppercase font-bold tracking-wider">
                  Model Status
                </span>
              </div>
              <p className="text-[11px] text-zinc-500 mt-1 leading-normal">
                {modelType === 'lr'
                  ? 'ML regression utilizing lag autoregression with rolling momentum features.'
                  : 'Additive triple exponential smoothing accounting for level, trend, and cycles.'}
              </p>
            </div>
          </div>

          {/* Time Series Chart */}
          <div className="bg-white border border-zinc-200 rounded-md p-6 shadow-sm">
            <h4 className="font-mono text-xs text-zinc-500 uppercase tracking-wider mb-6 flex items-center space-x-2">
              <BarChart2 className="h-4 w-4 text-[#782849]" />
              <span>Time-Series Predictions & 95% Confidence Intervals</span>
            </h4>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" />
                  <XAxis dataKey="index" stroke="#a1a1aa" fontSize={10} fontFamily="monospace" />
                  <YAxis stroke="#a1a1aa" fontSize={10} fontFamily="monospace" domain={['auto', 'auto']} />
                  <Tooltip
                    contentStyle={{
                      background: '#ffffff',
                      border: '1px solid #e4e4e7',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontFamily: 'monospace',
                      color: '#27272a',
                    }}
                  />
                  <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '10px', fontFamily: 'monospace' }} />
                  {/* CI Area */}
                  <Area
                    name="95% Confidence Band"
                    dataKey="ciUpper"
                    stroke="none"
                    fill="rgba(120, 40, 73, 0.08)"
                  />
                  <Area
                    name=""
                    dataKey="ciLower"
                    stroke="none"
                    fill="#ffffff" // Mask
                  />
                  {/* Lines */}
                  <Line
                    name="Historical Actual"
                    type="monotone"
                    dataKey="actual"
                    stroke="#71717a"
                    strokeWidth={2}
                    dot={{ r: 2 }}
                    activeDot={{ r: 4 }}
                  />
                  <Line
                    name="Model Fit"
                    type="monotone"
                    dataKey="fitted"
                    stroke="#d4d4d8"
                    strokeWidth={1}
                    strokeDasharray="4 4"
                    dot={false}
                  />
                  <Line
                    name="ML Forecast"
                    type="monotone"
                    dataKey="forecast"
                    stroke="#782849"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* SHAP Waterfall / Explainable AI section */}
      {modelType === 'lr' && forecastResult?.shap && forecastResult.shap.length > 0 && (
        <div className="bg-white border border-zinc-200 rounded-md p-6 shadow-sm">
          <div className="flex items-start space-x-3 mb-6">
            <Info className="h-5 w-5 text-[#782849] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-mono text-xs text-zinc-500 uppercase tracking-wider">
                Explainable AI (SHAP Feature Contributions)
              </h4>
              <p className="text-xs text-zinc-400 leading-normal mt-1 font-sans">
                Visualizing local feature attribution for the step-1 forecast. Explains how short-term lags and seasonality adjust predictions relative to the mean baseline.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* SHAP Bar Chart */}
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={formatSHAPData()}
                  layout="vertical"
                  margin={{ top: 5, right: 20, left: 30, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" />
                  <XAxis type="number" stroke="#a1a1aa" fontSize={9} fontFamily="monospace" />
                  <YAxis dataKey="name" type="category" stroke="#a1a1aa" fontSize={9} fontFamily="monospace" />
                  <Tooltip
                    contentStyle={{
                      background: '#ffffff',
                      border: '1px solid #e4e4e7',
                      borderRadius: '6px',
                      fontSize: '10px',
                      fontFamily: 'monospace',
                      color: '#27272a',
                    }}
                  />
                  <ReferenceLine x={0} stroke="#d4d4d8" />
                  <Bar dataKey="value" fill="#782849" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Explanation box */}
            <div className="space-y-4">
              <h5 className="text-xs font-mono font-semibold text-zinc-800">How to Read This Attribution:</h5>
              <div className="space-y-2.5 text-xs text-zinc-500 leading-relaxed font-sans">
                <div className="flex items-start">
                  <span className="text-emerald-600 font-bold mr-2 shrink-0">+</span>
                  <span>Positive attributions indicate that the lag or seasonal value was higher than average, causing the model to push the forecast upwards.</span>
                </div>
                <div className="flex items-start">
                  <span className="text-rose-600 font-bold mr-2 shrink-0">-</span>
                  <span>Negative values suggest recent volumes are low, pulling the forecast below the baseline.</span>
                </div>
                <div className="flex items-start">
                  <span className="text-[#782849] font-bold mr-2 shrink-0">★</span>
                  <span>The sum of these contributions equals the predicted value, satisfying additive local accuracy.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
