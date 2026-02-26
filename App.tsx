
import React, { useState, useEffect } from 'react';
import { DESTINATIONS, ICONS } from './constants';
import { Destination, TravelAlert } from './types';
import MapExplorer from './components/MapExplorer';
import AIChatAssistant from './components/AIChatAssistant';
import SafetyAlerts from './components/SafetyAlerts';
import VRViewer from './components/VRViewer';
import { getSafetyAlerts } from './services/geminiService';

const App: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isVRMode, setIsVRMode] = useState(false);
  const [alerts, setAlerts] = useState<TravelAlert[]>([]);
  const [isLoadingAlerts, setIsLoadingAlerts] = useState(false);

  const activeDestination = DESTINATIONS.find(d => d.id === selectedId);

  useEffect(() => {
    if (selectedId) {
      fetchAlerts(selectedId);
    }
  }, [selectedId]);

  const fetchAlerts = async (id: string) => {
    const dest = DESTINATIONS.find(d => d.id === id);
    if (!dest) return;
    
    setIsLoadingAlerts(true);
    try {
      const data = await getSafetyAlerts(dest.name);
      setAlerts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingAlerts(false);
    }
  };

  return (
    <div className="flex-1 flex overflow-hidden bg-slate-50 relative">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-100/30 rounded-full blur-[100px] -z-10" />

      {/* Sidebar Navigation */}
      <aside className="w-80 h-full flex flex-col p-6 bg-white border-r border-slate-100 z-20 shadow-xl overflow-y-auto">
        <div className="flex items-center gap-2 mb-10">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-1.2-.3-2.4.5-2.8 1.7-.3 1.2.5 2.4 1.7 2.8L11 13l-4 4-2.5-1-1.5 1.5L7 21l3.5 4 1.5-1.5-1-2.5 4-4 2.2 7.2c.3 1.2 1.5 2 2.8 1.7 1.2-.3 2-1.5 1.7-2.8Z"/></svg>
          </div>
          <h1 className="text-xl font-black tracking-tight text-slate-800 uppercase italic">Astra<span className="text-indigo-600">Travel</span></h1>
        </div>

        <div className="space-y-1 mb-8">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 mb-2">Featured Destinations</p>
          {DESTINATIONS.map((dest) => (
            <button
              key={dest.id}
              onClick={() => setSelectedId(dest.id)}
              className={`w-full flex items-center gap-4 p-3 rounded-2xl transition-all group ${
                selectedId === dest.id 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
                  : 'hover:bg-slate-50 text-slate-600'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl overflow-hidden shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform ${selectedId === dest.id ? 'ring-2 ring-white/20' : ''}`}>
                <img src={dest.imageUrl} alt={dest.name} className="w-full h-full object-cover" />
              </div>
              <div className="text-left overflow-hidden">
                <p className="font-bold truncate text-sm">{dest.name}</p>
                <p className={`text-[11px] truncate ${selectedId === dest.id ? 'text-white/70' : 'text-slate-400'}`}>{dest.country}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-auto">
          <SafetyAlerts alerts={alerts} />
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col p-6 overflow-hidden">
        {activeDestination ? (
          <div className="flex-1 flex flex-col gap-6">
            {/* Header / Info Bar */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-4xl font-black text-slate-900 mb-1">{activeDestination.name}</h2>
                <div className="flex items-center gap-3">
                   <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-md text-[10px] font-black uppercase">Safety Score: {activeDestination.safetyScore}</span>
                   <span className="text-slate-400 text-sm flex items-center gap-1">
                     <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                     {activeDestination.country}
                   </span>
                </div>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => setIsVRMode(true)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl shadow-lg shadow-indigo-100 flex items-center gap-2 transition-all active:scale-95 font-bold"
                >
                  <ICONS.Vr />
                  Enter VR Preview
                </button>
                <button 
                  className="bg-white hover:bg-slate-50 text-slate-700 px-6 py-3 rounded-2xl border border-slate-200 flex items-center gap-2 transition-all active:scale-95 font-bold shadow-sm"
                >
                  <ICONS.Map />
                  Full Navigation
                </button>
              </div>
            </div>

            {/* Content Grid */}
            <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">
              {/* Map View */}
              <div className="col-span-12 lg:col-span-7 xl:col-span-8 flex flex-col gap-6">
                <div className="flex-1 relative">
                  <MapExplorer 
                    destinations={DESTINATIONS} 
                    activeId={selectedId} 
                    onSelect={setSelectedId} 
                  />
                  
                  {/* Floating Context Panel */}
                  <div className="absolute bottom-6 right-6 z-10 w-72 bg-white/90 backdrop-blur-md p-5 rounded-3xl shadow-2xl border border-white/30">
                    <h5 className="text-xs font-black uppercase text-indigo-600 mb-3 tracking-widest">Real-Time Context</h5>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-500">Local Time</span>
                        <span className="text-sm font-bold">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-500">Weather</span>
                        <span className="text-sm font-bold flex items-center gap-1">22°C Clear</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-500">Crowd Density</span>
                        <span className="text-sm font-bold text-orange-500">Moderate</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Assistant */}
              <div className="col-span-12 lg:col-span-5 xl:col-span-4 h-full min-h-[400px]">
                <AIChatAssistant activeDestination={activeDestination} />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-10 bg-white/50 rounded-[3rem] border-2 border-dashed border-slate-200">
            <div className="w-32 h-32 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m16 12-4-4-4 4"/><path d="M12 16V8"/></svg>
            </div>
            <h2 className="text-3xl font-black text-slate-800 mb-2">Welcome to AstraTravel</h2>
            <p className="text-slate-500 max-w-md mb-8">Select a destination from the sidebar to begin your immersive AI-supported journey.</p>
            <div className="grid grid-cols-3 gap-4 w-full max-w-lg">
              <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
                <p className="text-indigo-600 font-bold mb-1">VR</p>
                <p className="text-[10px] text-slate-400 uppercase font-black">Previews</p>
              </div>
               <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
                <p className="text-indigo-600 font-bold mb-1">AI</p>
                <p className="text-[10px] text-slate-400 uppercase font-black">Intelligence</p>
              </div>
               <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
                <p className="text-indigo-600 font-bold mb-1">LIVE</p>
                <p className="text-[10px] text-slate-400 uppercase font-black">Safety</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* VR Overlay */}
      {isVRMode && activeDestination && (
        <VRViewer 
          imageUrl={activeDestination.vrImageUrl} 
          onClose={() => setIsVRMode(false)} 
        />
      )}
    </div>
  );
};

export default App;
