/**
 * Math utility file for client-side Time Series Forecasting Simulations
 */

// Helper to solve Ordinary Least Squares (OLS) regression: beta = (X^T * X)^-1 * X^T * y
export function solveLinearRegression(X: number[][], y: number[]): number[] {
  const n = X.length;
  if (n === 0) return [];
  const p = X[0].length;

  // X^T * X (size p x p)
  const XT_X: number[][] = Array(p).fill(0).map(() => Array(p).fill(0));
  for (let i = 0; i < p; i++) {
    for (let j = 0; j < p; j++) {
      let sum = 0;
      for (let k = 0; k < n; k++) {
        sum += X[k][i] * X[k][j];
      }
      XT_X[i][j] = sum;
    }
  }

  // X^T * y (size p x 1)
  const XT_y: number[] = Array(p).fill(0);
  for (let i = 0; i < p; i++) {
    let sum = 0;
    for (let k = 0; k < n; k++) {
      sum += X[k][i] * y[k];
    }
    XT_y[i] = sum;
  }

  // Solve XT_X * beta = XT_y using Gaussian Elimination
  const M: number[][] = XT_X.map((row, i) => [...row, XT_y[i]]);
  for (let i = 0; i < p; i++) {
    // Pivot
    let maxEl = Math.abs(M[i][i]);
    let maxRow = i;
    for (let k = i + 1; k < p; k++) {
      if (Math.abs(M[k][i]) > maxEl) {
        maxEl = Math.abs(M[k][i]);
        maxRow = k;
      }
    }

    // Swap rows
    const temp = M[maxRow];
    M[maxRow] = M[i];
    M[i] = temp;

    // Eliminate
    for (let k = i + 1; k < p; k++) {
      const c = -M[k][i] / M[i][i];
      for (let j = i; j <= p; j++) {
        if (i === j) {
          M[k][j] = 0;
        } else {
          M[k][j] += c * M[i][j];
        }
      }
    }
  }

  // Back substitution
  const beta = Array(p).fill(0);
  for (let i = p - 1; i >= 0; i--) {
    let sum = M[i][p];
    for (let j = i + 1; j < p; j++) {
      sum -= M[i][j] * beta[j];
    }
    beta[i] = M[i][i] === 0 ? 0 : sum / M[i][i];
  }

  return beta;
}

// 1. Holt-Winters Additive Seasonality Forecasting Model
export function runHoltWinters(
  data: number[],
  period: number, // Seasonality cycle (e.g. 12 for annual monthly claims, 7 for weekly clicks)
  horizon: number
): {
  fitted: number[];
  forecast: number[];
  confidenceLower: number[];
  confidenceUpper: number[];
  mape: number;
  rmse: number;
} {
  const n = data.length;
  const alpha = 0.2; // Level smoothing
  const beta = 0.1;  // Trend smoothing
  const gamma = 0.3; // Seasonal smoothing

  // Initialize Level, Trend, and Seasonals
  let level = data[0];
  let trend = 0;
  
  // Basic seasonal initialization
  const seasonals = Array(period).fill(0);
  if (n >= period * 2) {
    // Average seasonality index
    const seasonAverages = Array(2).fill(0);
    for (let j = 0; j < 2; j++) {
      let sum = 0;
      for (let i = 0; i < period; i++) {
        sum += data[j * period + i];
      }
      seasonAverages[j] = sum / period;
    }
    
    // Initial trend
    trend = (seasonAverages[1] - seasonAverages[0]) / period;

    // Initial seasonals
    for (let i = 0; i < period; i++) {
      let sum = 0;
      for (let j = 0; j < 2; j++) {
        sum += data[j * period + i] - seasonAverages[j];
      }
      seasonals[i] = sum / 2;
    }
  } else {
    // Fallback if dataset is too small
    trend = (data[n - 1] - data[0]) / n;
    for (let i = 0; i < period; i++) {
      seasonals[i] = data[i % n] - level;
    }
  }

  const fitted: number[] = Array(n).fill(0);
  
  // Fill initial fitted values
  for (let i = 0; i < Math.min(n, period); i++) {
    fitted[i] = data[i];
  }

  // Smooth historical points
  for (let i = period; i < n; i++) {
    const value = data[i];
    const lastLevel = level;
    const lastTrend = trend;
    const lastSeasonal = seasonals[i % period];

    level = alpha * (value - lastSeasonal) + (1 - alpha) * (lastLevel + lastTrend);
    trend = beta * (level - lastLevel) + (1 - beta) * lastTrend;
    seasonals[i % period] = gamma * (value - level) + (1 - gamma) * lastSeasonal;

    fitted[i] = lastLevel + lastTrend + lastSeasonal;
  }

  // Forecast future values
  const forecast: number[] = [];
  const confidenceLower: number[] = [];
  const confidenceUpper: number[] = [];

  // Estimate standard error of residuals
  let residualSumSq = 0;
  let count = 0;
  for (let i = period; i < n; i++) {
    const res = data[i] - fitted[i];
    residualSumSq += res * res;
    count++;
  }
  const stdError = Math.sqrt(residualSumSq / (count || 1));

  for (let h = 1; h <= horizon; h++) {
    const point = level + h * trend + seasonals[(n + h - 1) % period];
    forecast.push(point);
    
    // Analytical CI bands: grows with horizon sqrt(h)
    const margin = 1.96 * stdError * Math.sqrt(h);
    confidenceLower.push(Math.max(0, point - margin));
    confidenceUpper.push(point + margin);
  }

  // Calculate error metrics on training set
  let absErrorPctSum = 0;
  let sqErrorSum = 0;
  let validCount = 0;

  for (let i = period; i < n; i++) {
    if (data[i] !== 0) {
      absErrorPctSum += Math.abs((data[i] - fitted[i]) / data[i]);
      sqErrorSum += (data[i] - fitted[i]) * (data[i] - fitted[i]);
      validCount++;
    }
  }

  const mape = (absErrorPctSum / (validCount || 1)) * 100;
  const rmse = Math.sqrt(sqErrorSum / (validCount || 1));

  return { fitted, forecast, confidenceLower, confidenceUpper, mape, rmse };
}

// 2. Autoregressive Lag-Regression Forecasting Model
export function runLagRegression(
  data: number[],
  period: number,
  horizon: number
): {
  fitted: number[];
  forecast: number[];
  confidenceLower: number[];
  confidenceUpper: number[];
  mape: number;
  rmse: number;
  shap: { feature: string; value: number }[];
} {
  const n = data.length;
  // Features: [Intercept, Lag-1, Lag-Period, Rolling-Mean-3]
  // We need at least period + 3 points to train
  const minPoints = period + 3;
  if (n < minPoints) {
    // Fallback: Holt-Winters
    const hw = runHoltWinters(data, period, horizon);
    return { ...hw, shap: [] };
  }

  const X: number[][] = [];
  const y: number[] = [];

  for (let i = minPoints; i < n; i++) {
    const lag1 = data[i - 1];
    const lagPeriod = data[i - period];
    const roll3 = (data[i - 1] + data[i - 2] + data[i - 3]) / 3;

    X.push([1, lag1, lagPeriod, roll3]);
    y.push(data[i]);
  }

  // Solve OLS coefficients: [c_intercept, w_lag1, w_lagPeriod, w_roll3]
  const weights = solveLinearRegression(X, y);

  const fitted: number[] = Array(n).fill(0);
  for (let i = 0; i < minPoints; i++) {
    fitted[i] = data[i]; // Pad initial
  }

  for (let i = minPoints; i < n; i++) {
    const lag1 = data[i - 1];
    const lagPeriod = data[i - period];
    const roll3 = (data[i - 1] + data[i - 2] + data[i - 3]) / 3;
    fitted[i] = weights[0] + weights[1] * lag1 + weights[2] * lagPeriod + weights[3] * roll3;
  }

  // Rollout forecast (autoregressive recursion)
  const forecast: number[] = [];
  const confidenceLower: number[] = [];
  const confidenceUpper: number[] = [];
  const rollingHistory = [...data];

  let residualSumSq = 0;
  for (let i = minPoints; i < n; i++) {
    const res = data[i] - fitted[i];
    residualSumSq += res * res;
  }
  const stdError = Math.sqrt(residualSumSq / ((n - minPoints) || 1));

  for (let h = 1; h <= horizon; h++) {
    const cursor = rollingHistory.length;
    const lag1 = rollingHistory[cursor - 1];
    const lagPeriod = rollingHistory[cursor - period];
    const roll3 = (rollingHistory[cursor - 1] + rollingHistory[cursor - 2] + rollingHistory[cursor - 3]) / 3;

    const point = weights[0] + weights[1] * lag1 + weights[2] * lagPeriod + weights[3] * roll3;
    forecast.push(point);
    rollingHistory.push(point); // Add to history for subsequent steps

    const margin = 1.96 * stdError * Math.sqrt(h);
    confidenceLower.push(Math.max(0, point - margin));
    confidenceUpper.push(point + margin);
  }

  // Calculate training error
  let absErrorPctSum = 0;
  let sqErrorSum = 0;
  let validCount = 0;
  for (let i = minPoints; i < n; i++) {
    absErrorPctSum += Math.abs((data[i] - fitted[i]) / data[i]);
    sqErrorSum += (data[i] - fitted[i]) * (data[i] - fitted[i]);
    validCount++;
  }
  const mape = (absErrorPctSum / (validCount || 1)) * 100;
  const rmse = Math.sqrt(sqErrorSum / (validCount || 1));

  // Compute mock SHAP contributions for the first forecasted point
  const lastIndex = n - 1;
  const meanLag1 = data.reduce((s, v) => s + v, 0) / n;
  
  // SHAP approximation: Weight * (FeatureValue - MeanFeatureValue)
  const lag1Val = data[lastIndex];
  const lagPeriodVal = data[lastIndex - period + 1];
  const roll3Val = (data[lastIndex] + data[lastIndex - 1] + data[lastIndex - 2]) / 3;

  const shap = [
    { feature: 'Baseline (Intercept)', value: weights[0] },
    { feature: 'Short-term Trend (Lag-1)', value: weights[1] * (lag1Val - meanLag1) },
    { feature: 'Seasonality Cycle (Lag-P)', value: weights[2] * (lagPeriodVal - meanLag1) },
    { feature: 'Rolling Momentum (Roll-3)', value: weights[3] * (roll3Val - meanLag1) },
  ];

  return { fitted, forecast, confidenceLower, confidenceUpper, mape, rmse, shap };
}
