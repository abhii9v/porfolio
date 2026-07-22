'use client';

import React from 'react';
import { 
  Database, 
  Settings, 
  Cpu, 
  TrendingUp, 
  Activity, 
  RefreshCw, 
  Search, 
  Layers, 
  Terminal, 
  Zap, 
  AlertTriangle,
  Brain,
  ArrowDown
} from 'lucide-react';

interface SystemArchitectureDiagramProps {
  company: string;
}

export default function SystemArchitectureDiagram({ company }: SystemArchitectureDiagramProps) {
  const name = company.toLowerCase();

  if (name.includes('cognitio')) {
    return <CognitioDiagram />;
  }
  if (name.includes('shyftlabs')) {
    return <ShyftLabsDiagram />;
  }
  if (name.includes('intellipaat')) {
    return <IntellipaatDiagram />;
  }

  return null;
}

function FlowArrow({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-6 w-full relative">
      <div className="w-0.5 h-full bg-zinc-200 relative">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-0.5 border-t-4 border-t-zinc-200 border-x-4 border-x-transparent" />
      </div>
      {label && (
        <span className="absolute top-1/2 -translate-y-1/2 bg-white px-2 py-0.5 border border-zinc-150 rounded text-[9px] font-mono text-zinc-400">
          {label}
        </span>
      )}
    </div>
  );
}

function CognitioDiagram() {
  return (
    <div className="w-full bg-white border border-zinc-200 rounded-lg p-6 shadow-sm overflow-hidden select-none">
      <div className="text-center mb-6">
        <h4 className="text-sm font-bold text-zinc-800 font-sans">Insurance Claims Forecast & Drift Monitoring</h4>
        <p className="text-xs text-zinc-500 mt-1">Real-time inference and automated retraining pipeline</p>
      </div>

      <div className="flex flex-col items-center space-y-6 max-w-2xl mx-auto">
        {/* Node 1: Input */}
        <div className="flex items-center space-x-3 p-3 bg-zinc-50 border border-zinc-200 rounded-md w-full sm:w-80 shadow-sm transition-all hover:border-zinc-300">
          <Database className="h-4 w-4 text-[#782849] shrink-0" />
          <div className="text-left">
            <span className="text-[10px] font-mono text-zinc-400 uppercase font-semibold">Data Source</span>
            <div className="text-xs font-bold text-zinc-800 font-sans">Healthcare Claims Database (SQL)</div>
          </div>
        </div>

        {/* Down Arrow SVG */}
        <FlowArrow />

        {/* Node 2: Feature Engineering */}
        <div className="flex items-center space-x-3 p-3 bg-[#782849]/5 border border-[#782849]/15 rounded-md w-full sm:w-80 shadow-sm transition-all hover:border-[#782849]/30">
          <Settings className="h-4 w-4 text-[#782849] shrink-0" />
          <div className="text-left">
            <span className="text-[10px] font-mono text-[#782849] uppercase font-semibold">Pipeline Step</span>
            <div className="text-xs font-bold text-zinc-800 font-sans">Feature Engineering</div>
            <div className="text-[10px] text-zinc-500">Lags, Rolling Stats, Demographics</div>
          </div>
        </div>

        {/* Down Arrow SVG */}
        <FlowArrow />

        {/* Node 3: Stacked Regressor */}
        <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-[#4b134f] to-[#782849] text-white border border-[#4b134f] rounded-md w-full sm:w-80 shadow-md">
          <Cpu className="h-4 w-4 text-white shrink-0 animate-pulse" />
          <div className="text-left">
            <span className="text-[10px] font-mono text-white/70 uppercase font-semibold">Machine Learning Model</span>
            <div className="text-xs font-bold font-sans">Stacked Regressor Model</div>
            <div className="text-[10px] text-white/80">XGBoost & LightGBM Ensembles</div>
          </div>
        </div>

        {/* Branching layout */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 relative mt-2 pt-6">
          {/* Connecting Branch Line */}
          <div className="hidden md:block absolute top-0 left-1/4 right-1/4 h-0.5 bg-zinc-200" />
          <div className="hidden md:block absolute top-0 left-1/4 w-0.5 h-6 bg-zinc-200" />
          <div className="hidden md:block absolute top-0 right-1/4 w-0.5 h-6 bg-zinc-200" />

          {/* Left Branch: Inference */}
          <div className="flex flex-col items-center space-y-4">
            <div className="text-xs font-mono text-zinc-400 md:hidden flex items-center justify-center">
              <ArrowDown className="h-3 w-3 mr-1" /> Inference path
            </div>
            <div className="flex items-center space-x-3 p-3 bg-emerald-50 border border-emerald-250 rounded-md w-full shadow-sm transition-all hover:border-emerald-300">
              <TrendingUp className="h-4 w-4 text-emerald-600 shrink-0" />
              <div className="text-left">
                <span className="text-[10px] font-mono text-emerald-600 uppercase font-semibold">Predictions</span>
                <div className="text-xs font-bold text-zinc-800 font-sans">Cost Forecasts (PLPM)</div>
                <div className="text-[10px] text-zinc-550">Forecasting error &lt; 10% MAPE</div>
              </div>
            </div>
            <FlowArrow />
            <div className="flex items-center space-x-3 p-3 bg-zinc-50 border border-zinc-200 rounded-md w-full shadow-sm">
              <Layers className="h-4 w-4 text-zinc-650 shrink-0" />
              <div className="text-left">
                <span className="text-[10px] font-mono text-zinc-400 uppercase font-semibold">Downstream Consumers</span>
                <div className="text-xs font-bold text-zinc-800 font-sans">Actuarial Risk Systems</div>
              </div>
            </div>
          </div>

          {/* Right Branch: Monitoring & MLflow Retraining */}
          <div className="flex flex-col items-center space-y-4">
            <div className="text-xs font-mono text-zinc-400 md:hidden flex items-center justify-center">
              <ArrowDown className="h-3 w-3 mr-1" /> Monitoring path
            </div>
            <div className="flex items-center space-x-3 p-3 bg-amber-50 border border-amber-250 rounded-md w-full shadow-sm transition-all hover:border-amber-300">
              <Activity className="h-4 w-4 text-amber-600 shrink-0" />
              <div className="text-left">
                <span className="text-[10px] font-mono text-amber-600 uppercase font-semibold">MLOps Monitoring</span>
                <div className="text-xs font-bold text-zinc-800 font-sans">Model Drift Detection</div>
                <div className="text-[10px] text-zinc-550">Evaluates PSI & KS metrics</div>
              </div>
            </div>
            <FlowArrow label="If drift > threshold" />
            <div className="flex items-center space-x-3 p-3 bg-rose-50 border border-rose-200 rounded-md w-full shadow-sm">
              <RefreshCw className="h-4 w-4 text-rose-600 shrink-0 animate-spin" style={{ animationDuration: '6s' }} />
              <div className="text-left">
                <span className="text-[10px] font-mono text-rose-650 uppercase font-semibold">Self-Healing Retrain</span>
                <div className="text-xs font-bold text-zinc-800 font-sans">Auto-Retraining Trigger (MLflow)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShyftLabsDiagram() {
  return (
    <div className="w-full bg-white border border-zinc-200 rounded-lg p-6 shadow-sm overflow-hidden select-none">
      <div className="text-center mb-6">
        <h4 className="text-sm font-bold text-zinc-800 font-sans">Hybrid Search & Recommender Engine</h4>
        <p className="text-xs text-zinc-500 mt-1">Real-time personalization and semantic query routing</p>
      </div>

      <div className="flex flex-col items-center space-y-6 max-w-2xl mx-auto">
        {/* Node 1: Input Query */}
        <div className="flex items-center space-x-3 p-3 bg-zinc-50 border border-zinc-200 rounded-md w-full sm:w-80 shadow-sm">
          <Terminal className="h-4 w-4 text-[#782849] shrink-0" />
          <div className="text-left">
            <span className="text-[10px] font-mono text-zinc-400 uppercase font-semibold">Entry Point</span>
            <div className="text-xs font-bold text-zinc-800 font-sans">User Query / Ad Requests</div>
          </div>
        </div>

        {/* Dual Branch for Intent & Embeddings */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 relative mt-2 pt-6 pb-6 border-b border-zinc-150">
          <div className="hidden md:block absolute top-0 left-1/4 right-1/4 h-0.5 bg-zinc-200" />
          <div className="hidden md:block absolute top-0 left-1/4 w-0.5 h-6 bg-zinc-200" />
          <div className="hidden md:block absolute top-0 right-1/4 w-0.5 h-6 bg-zinc-200" />

          {/* Left Branch: LLM Query Intent */}
          <div className="flex flex-col items-center">
            <div className="flex items-center space-x-3 p-3 bg-zinc-50 border border-zinc-200 rounded-md w-full shadow-sm">
              <Brain className="h-4 w-4 text-zinc-650 shrink-0" />
              <div className="text-left">
                <span className="text-[10px] font-mono text-zinc-400 uppercase font-semibold">Intent Analysis</span>
                <div className="text-xs font-bold text-zinc-800 font-sans">LLM Query Intent Detection</div>
              </div>
            </div>
          </div>

          {/* Right Branch: MiniLM Embeddings */}
          <div className="flex flex-col items-center">
            <div className="flex items-center space-x-3 p-3 bg-[#782849]/5 border border-[#782849]/15 rounded-md w-full shadow-sm">
              <Layers className="h-4 w-4 text-[#782849] shrink-0" />
              <div className="text-left">
                <span className="text-[10px] font-mono text-[#782849] uppercase font-semibold">Vectorization</span>
                <div className="text-xs font-bold text-zinc-800 font-sans">paraphrase-MiniLM Embeddings</div>
              </div>
            </div>
          </div>

          {/* Merging connector lines */}
          <div className="hidden md:block absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-zinc-200" />
          <div className="hidden md:block absolute bottom-0 left-1/4 w-0.5 h-6 bg-zinc-200" />
          <div className="hidden md:block absolute bottom-0 right-1/4 w-0.5 h-6 bg-zinc-200" />
        </div>

        {/* Down Arrow for merged flow */}
        <FlowArrow />

        {/* Node 3: Elasticsearch Hybrid Search */}
        <div className="flex items-center space-x-3 p-3 bg-zinc-50 border border-zinc-200 rounded-md w-full sm:w-80 shadow-sm animate-pulse">
          <Search className="h-4 w-4 text-[#782849] shrink-0" />
          <div className="text-left">
            <span className="text-[10px] font-mono text-zinc-400 uppercase font-semibold">Retrieval Stage</span>
            <div className="text-xs font-bold text-zinc-800 font-sans">Elasticsearch Hybrid Vector Search</div>
          </div>
        </div>

        {/* Down Arrow */}
        <FlowArrow />

        {/* Node 4: LightGBM Re-ranker */}
        <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-[#4b134f] to-[#782849] text-white border border-[#4b134f] rounded-md w-full sm:w-80 shadow-md">
          <Cpu className="h-4 w-4 text-white shrink-0" />
          <div className="text-left">
            <span className="text-[10px] font-mono text-white/70 uppercase font-semibold">Ranking Stage</span>
            <div className="text-xs font-bold font-sans">LightGBM CTR Prediction Re-ranker</div>
            <div className="text-[10px] text-white/80">Ranks ads by click likelihood</div>
          </div>
        </div>

        {/* Down Arrow */}
        <FlowArrow />

        {/* Node 5: Personalized Ad Delivery */}
        <div className="flex items-center space-x-3 p-3 bg-emerald-50 border border-emerald-250 rounded-md w-full sm:w-80 shadow-sm">
          <Zap className="h-4 w-4 text-emerald-600 shrink-0" />
          <div className="text-left">
            <span className="text-[10px] font-mono text-emerald-600 uppercase font-semibold">Output Delivery</span>
            <div className="text-xs font-bold text-zinc-800 font-sans">Personalized Ad Delivery</div>
            <div className="text-[10px] text-zinc-550">Latency &lt; 50ms at scale</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function IntellipaatDiagram() {
  return (
    <div className="w-full bg-white border border-zinc-200 rounded-lg p-6 shadow-sm overflow-hidden select-none">
      <div className="text-center mb-6">
        <h4 className="text-sm font-bold text-zinc-800 font-sans">Learner Activity Clustering</h4>
        <p className="text-xs text-zinc-500 mt-1">Behavioral clustering and cheating detection pipeline</p>
      </div>

      <div className="flex flex-col items-center space-y-6 max-w-2xl mx-auto">
        {/* Node 1: Logs */}
        <div className="flex items-center space-x-3 p-3 bg-zinc-50 border border-zinc-200 rounded-md w-full sm:w-80 shadow-sm">
          <Database className="h-4 w-4 text-[#782849] shrink-0" />
          <div className="text-left">
            <span className="text-[10px] font-mono text-zinc-400 uppercase font-semibold">Data Source</span>
            <div className="text-xs font-bold text-zinc-800 font-sans">Platform Learner Activity Logs</div>
            <div className="text-[10px] text-zinc-550">Clickstream, Time Spent, Submissions</div>
          </div>
        </div>

        {/* Down Arrow */}
        <FlowArrow />

        {/* Node 2: Feature Vector Extraction */}
        <div className="flex items-center space-x-3 p-3 bg-[#782849]/5 border border-[#782849]/15 rounded-md w-full sm:w-80 shadow-sm">
          <Settings className="h-4 w-4 text-[#782849] shrink-0" />
          <div className="text-left">
            <span className="text-[10px] font-mono text-[#782849] uppercase font-semibold">Data Processing</span>
            <div className="text-xs font-bold text-zinc-800 font-sans">Feature Vector Extraction</div>
          </div>
        </div>

        {/* Down Arrow */}
        <FlowArrow />

        {/* Node 3: PCA */}
        <div className="flex items-center space-x-3 p-3 bg-zinc-50 border border-zinc-200 rounded-md w-full sm:w-80 shadow-sm">
          <Layers className="h-4 w-4 text-zinc-650 shrink-0" />
          <div className="text-left">
            <span className="text-[10px] font-mono text-zinc-400 uppercase font-semibold">Dimensionality Reduction</span>
            <div className="text-xs font-bold text-zinc-800 font-sans">PCA (Principal Component Analysis)</div>
          </div>
        </div>

        {/* Down Arrow */}
        <FlowArrow />

        {/* Node 4: Clustering Engine */}
        <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-[#4b134f] to-[#782849] text-white border border-[#4b134f] rounded-md w-full sm:w-80 shadow-md">
          <Cpu className="h-4 w-4 text-white shrink-0 animate-pulse" />
          <div className="text-left">
            <span className="text-[10px] font-mono text-white/70 uppercase font-semibold">Clustering Algorithm</span>
            <div className="text-xs font-bold font-sans">K-Means & DBSCAN Engines</div>
            <div className="text-[10px] text-white/80">Groups learner behavioral clusters</div>
          </div>
        </div>

        {/* Down Arrow */}
        <FlowArrow />

        {/* Node 5: Behavior Identification */}
        <div className="flex items-center space-x-3 p-3 bg-amber-50 border border-amber-250 rounded-md w-full sm:w-80 shadow-sm">
          <Activity className="h-4 w-4 text-amber-600 shrink-0" />
          <div className="text-left">
            <span className="text-[10px] font-mono text-amber-600 uppercase font-semibold">Identification State</span>
            <div className="text-xs font-bold text-zinc-800 font-sans">Automated Behavior Identification</div>
          </div>
        </div>

        {/* Down Arrow */}
        <FlowArrow />

        {/* Node 6: Alerts */}
        <div className="flex items-center space-x-3 p-3 bg-rose-50 border border-rose-250 rounded-md w-full sm:w-80 shadow-sm">
          <AlertTriangle className="h-4 w-4 text-rose-600 shrink-0" />
          <div className="text-left">
            <span className="text-[10px] font-mono text-rose-650 uppercase font-semibold">Alerting Output</span>
            <div className="text-xs font-bold text-zinc-800 font-sans">Student Cheating Alerts</div>
            <div className="text-[10px] text-zinc-550">Achieved 80% detection accuracy</div>
          </div>
        </div>
      </div>
    </div>
  );
}
