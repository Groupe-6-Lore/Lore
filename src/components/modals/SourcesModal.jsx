import React, { useEffect, useMemo, useRef, useState } from 'react';
import { X, Trash2, ChevronLeft, ChevronRight, Info, ZoomIn, ZoomOut, Check } from 'lucide-react';

// Modal Sources avec toast custom (undo)
const SourcesModal = ({ isOpen, onClose }) => {
  const initialFiles = useMemo(() => ([
    { id: 'f1', name: 'Livre Rogue Trader de base.pdf', sizeMo: 14, cover: '/images/sources/rogue-trader.jpg' },
    { id: 'f2', name: 'Vampire.pdf', sizeMo: 9, cover: '/images/sources/vampire.jpg' },
    { id: 'f3', name: 'Mournblade.pdf', sizeMo: 13, cover: '/images/sources/mournblade.jpg', pages: 198 },
    { id: 'f4', name: 'Dungeonmasters.pdf', sizeMo: 11, cover: '/images/sources/dungeonmasters.jpg' },
    { id: 'f5', name: 'Pathfinder.pdf', sizeMo: 16, cover: '/images/sources/pathfinder.jpg' },
    { id: 'f6', name: 'DandDMonstres.fr', sizeMo: 6, cover: '/images/sources/monsters.jpg' },
  ]), []);

  const [files, setFiles] = useState(initialFiles);
  const [selectedId, setSelectedId] = useState('f3');
  const [page, setPage] = useState(1);
  const [toast, setToast] = useState(null); // {message, actionLabel, onAction}
  const toastTimerRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      setFiles(initialFiles);
      setSelectedId('f3');
      setPage(1);
      hideToast();
    }
  }, [isOpen, initialFiles]);

  const selectedFile = files.find(f => f.id === selectedId) || files[0];
  const totalUsed = files.reduce((sum, f) => sum + (f.sizeMo || 0), 0);
  const [zoom, setZoom] = useState(1);
  const [showInfo, setShowInfo] = useState(false);
  const infoRef = useRef(null);

  useEffect(() => {
    const onDocClick = (e) => {
      if (!infoRef.current) return;
      if (!infoRef.current.contains(e.target)) {
        setShowInfo(false);
      }
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  const showToast = (message, actionLabel, onAction) => {
    hideToast();
    setToast({ message, actionLabel, onAction });
    toastTimerRef.current = setTimeout(() => {
      setToast(null);
    }, 6000);
  };

  const hideToast = () => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
      toastTimerRef.current = null;
    }
    setToast(null);
  };

  const handleDelete = (fileId) => {
    const file = files.find(f => f.id === fileId);
    if (!file) return;
    setFiles(prev => prev.filter(f => f.id !== fileId));
    if (selectedId === fileId && files.length > 1) {
      const next = files.find(f => f.id !== fileId);
      setSelectedId(next?.id || null);
    }
    showToast('Source supprimée', 'Annuler', () => {
      setFiles(prev => {
        const restored = [...prev, file];
        // tri par id initial pour stabilité visuelle
        restored.sort((a, b) => initialFiles.findIndex(x => x.id === a.id) - initialFiles.findIndex(x => x.id === b.id));
        return restored;
      });
      hideToast();
    });
  };

  const close = () => {
    hideToast();
    onClose && onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={close} />

      {/* Panel modal */}
      <div className="relative bg-[#f7f1e5] text-[#1a1a1a] w-full max-w-5xl mx-4 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header Modal */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-black/10 bg[rgba(255,255,255,0.6)] bg-[rgba(255,255,255,0.6)]">
          <div className="flex items-center space-x-3 relative">
            <h3 className="text-2xl font-semibold">Sources</h3>
            <button ref={infoRef} onClick={() => setShowInfo(v => !v)} className="inline-flex items-center cursor-pointer">
              <Info size={18} className="text-black/60 hover:text-black" />
              {showInfo && (
                <div className="absolute top-10 left-0 w-96 text-sm bg-[#1f2937] text-white rounded-lg shadow-xl p-3 z-[1002] text-left">
                  <div className="mb-2">Les sources cochées sont utilisées par l’IA du chatbot. Vous pouvez décocher celles que vous souhaitez ignorer, sauf celles contenant les règles de base de votre JDR.</div>
                  <div>Vous pouvez aussi ajouter des sources pour personnaliser l’expérience, mais cela peut créer des conflits avec les sources officielles.</div>
                </div>
              )}
            </button>
          </div>
          <button onClick={close} className="text-black/60 hover:text-black transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Body - 2 colonnes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Colonne gauche */}
          <div className="p-6 border-r border-black/10">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold">Mes sources</h4>
              <span className="text-sm text-black/60">{totalUsed} Mo utilisés / 100 Mo</span>
            </div>

            <div className="space-y-2 max-h-[380px] overflow-auto pr-1">
              {files.map((file) => (
                <div key={file.id} className={`flex items-center justify-between rounded-lg px-3 py-2 border ${selectedId === file.id ? 'bg-amber-100/40 border-amber-300' : 'bg-white/50 border-black/10'}`}>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setSelectedId(file.id)}
                      aria-label="Sélectionner la source"
                      className={`w-4 h-4 rounded-sm border flex items-center justify-center ${selectedId === file.id ? 'bg-golden border-golden text-dark-blue' : 'bg-white/70 border-black/30'}`}
                    >
                      {selectedId === file.id && <Check size={12} />}
                    </button>
                    <div className="w-6 h-8 bg-gray-300 rounded overflow-hidden flex items-center justify-center">
                      <div className="w-full h-full bg-center bg-cover" style={{ backgroundImage: `url(${file.cover})` }} />
                    </div>
                    <button onClick={() => setSelectedId(file.id)} className="text-left hover:underline">
                      <span className="text-sm font-medium">{file.name}</span>
                    </button>
                  </div>
                  <button onClick={() => handleDelete(file.id)} className="text-red-600 hover:text-red-700 p-1" title="Supprimer">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>

            {/* Actions bas */}
            <div className="mt-4 flex items-center justify-between">
              <div>
                <button className="text-amber-600 hover:text-amber-700" onClick={() => fileInputRef.current?.click()}>+ Ajouter un document</button>
                <input ref={fileInputRef} type="file" accept="application/pdf" className="hidden" onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const url = URL.createObjectURL(file);
                  const newFile = { id: `u-${Date.now()}`, name: file.name, sizeMo: Math.max(1, Math.round(file.size / (1024*1024))), cover: '/images/sources/pdf-generic.png', url, pages: 198 };
                  setFiles(prev => [...prev, newFile]);
                  setSelectedId(newFile.id);
                  setPage(1);
                  setZoom(1);
                }} />
              </div>
              <button className="px-3 py-2 rounded-lg border border-black/20 text-sm hover:bg-black/5">Étendre mon stockage</button>
            </div>
          </div>

          {/* Colonne droite */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="text-lg font-semibold">{selectedFile?.name || '—'}</div>
              <div className="text-sm text-black/60">{selectedFile?.sizeMo ?? 0} Mo</div>
            </div>

            {/* Visualiseur */}
            <div className="relative w-full aspect-[3/4] bg-black/5 rounded-lg overflow-hidden border border-black/10">
              {selectedFile?.url ? (
                <object data={`${selectedFile.url}#page=${page}&zoom=${Math.round(zoom*100)}`} type="application/pdf" className="w-full h-full">
                  <div className="w-full h-full flex items-center justify-center text-sm text-black/60">Aperçu indisponible</div>
                </object>
              ) : (
                <div className="absolute inset-0 bg-center bg-cover" style={{ backgroundImage: `url(${selectedFile?.cover})` }} />
              )}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-3">
              <button className="px-2 py-1 rounded border border-black/20 hover:bg-black/5" onClick={() => setPage(p => Math.max(1, p - 1))}>
                <ChevronLeft size={18} />
              </button>
              <div className="flex items-center space-x-2 text-sm text-black/70">
                <input
                  type="number"
                  value={page}
                  min={1}
                  max={selectedFile?.pages || 198}
                  onChange={(e) => {
                    const v = parseInt(e.target.value || '1', 10);
                    if (!isNaN(v)) setPage(Math.min(Math.max(1, v), selectedFile?.pages || 198));
                  }}
                  className="w-16 px-2 py-1 border border-black/20 rounded text-center bg-white/60"
                />
                <span>/ {String(selectedFile?.pages || 198)}</span>
              </div>
              <button className="px-2 py-1 rounded border border-black/20 hover:bg-black/5" onClick={() => setPage(p => Math.min((selectedFile?.pages || 198), p + 1))}>
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Zoom */}
            <div className="flex items-center justify-center space-x-2 mt-2">
              <button className="px-2 py-1 rounded border border-black/20 hover:bg-black/5" onClick={() => setZoom(z => Math.max(0.5, Math.round((z - 0.1) * 10) / 10))}>
                <ZoomOut size={16} />
              </button>
              <span className="text-sm text-black/70 w-14 text-center">{Math.round(zoom * 100)}%</span>
              <button className="px-2 py-1 rounded border border-black/20 hover:bg-black/5" onClick={() => setZoom(z => Math.min(3, Math.round((z + 0.1) * 10) / 10))}>
                <ZoomIn size={16} />
              </button>
            </div>

            <div className="flex justify-end mt-6">
              <button onClick={close} className="px-4 py-2 rounded-lg bg-golden hover:bg-golden/80 text-dark-blue font-semibold">Fermer</button>
            </div>
          </div>
        </div>
      </div>

      {/* Toast notification */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-[1001]">
          <div className="flex items-center space-x-4 bg-[#2d7d32] text-white px-4 py-3 rounded-lg shadow-xl">
            <span className="font-medium">{toast.message}</span>
            <button onClick={toast.onAction} className="px-3 py-1 rounded border border-pink-300 text-pink-200 hover:bg-pink-300/10">Annuler ×</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SourcesModal;


