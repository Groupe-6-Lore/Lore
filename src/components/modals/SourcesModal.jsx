import React, { useEffect, useMemo, useRef, useState } from 'react';
import { X, Trash2, ChevronLeft, ChevronRight, Info, ZoomIn, ZoomOut, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Modal Sources avec toast custom (undo)
const SourcesModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  // Limites de stockage inspirées de Notion (adaptées à Lore)
  const STORAGE_LIMIT_MB = 100;
  const WARNING_THRESHOLD = 0.8; // 80%
  const MAX_SINGLE_FILE_MB = 100; // Fichier individuel en Mo (plan gratuit)
  const GRACE_DAYS = 3; // Période de grâce de 3 jours

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
  const [errorMessage, setErrorMessage] = useState('');
  const [graceUntil, setGraceUntil] = useState(() => {
    const raw = localStorage.getItem('lore_storage_grace_until');
    return raw ? new Date(raw).getTime() : null;
  });

  // Écouter les événements de navigation depuis le chatbot
  useEffect(() => {
    const handleOpenSourcesWithNavigation = (event) => {
      const { sourceId, page: targetPage, sourceType, sourceTitle } = event.detail;
      
      // Trouver le fichier correspondant
      const targetFile = files.find(file => 
        file.name.toLowerCase().includes(sourceTitle.toLowerCase()) ||
        file.id === sourceId
      );
      
      if (targetFile) {
        // Sélectionner le fichier et naviguer vers la page
        setSelectedId(targetFile.id);
        setPage(targetPage);
        
        // Afficher un message de confirmation
        setToast({
          message: `Navigation vers ${sourceTitle} - Page ${targetPage}`,
          actionLabel: 'Fermer',
          onAction: () => setToast(null)
        });
      } else {
        // Fichier non trouvé, afficher un message d'erreur
        setToast({
          message: `Source "${sourceTitle}" non trouvée dans vos documents`,
          actionLabel: 'Fermer',
          onAction: () => setToast(null)
        });
      }
    };

    window.addEventListener('openSourcesWithNavigation', handleOpenSourcesWithNavigation);
    
    return () => {
      window.removeEventListener('openSourcesWithNavigation', handleOpenSourcesWithNavigation);
    };
  }, [files]);

  useEffect(() => {
    if (!isOpen) {
      setFiles(initialFiles);
      setSelectedId('f3');
      setPage(1);
      hideToast();
      setErrorMessage('');
    }
  }, [isOpen, initialFiles]);

  const selectedFile = files.find(f => f.id === selectedId) || files[0];
  const totalUsed = files.reduce((sum, f) => sum + (f.sizeMo || 0), 0);
  const [zoom, setZoom] = useState(1);
  const [showInfo, setShowInfo] = useState(false);
  const [showStorageToast, setShowStorageToast] = useState(false);
  const infoRef = useRef(null);

  // États dérivés pour limites
  const isNearLimit = totalUsed >= Math.floor(STORAGE_LIMIT_MB * WARNING_THRESHOLD) && totalUsed < STORAGE_LIMIT_MB;
  const isOverLimit = totalUsed >= STORAGE_LIMIT_MB;
  const nowTs = Date.now();
  const isGraceActive = isOverLimit && graceUntil && nowTs <= graceUntil;
  const isLocked = isOverLimit && (!graceUntil || nowTs > graceUntil);
  const graceDaysLeft = isGraceActive ? Math.ceil((graceUntil - nowTs) / (1000 * 60 * 60 * 24)) : 0;

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

  // Activer la période de grâce et envoyer une notification quand on dépasse la limite
  useEffect(() => {
    if (!isOpen) return;
    if (isOverLimit) {
      if (!graceUntil) {
        const until = Date.now() + GRACE_DAYS * 24 * 60 * 60 * 1000;
        setGraceUntil(until);
        localStorage.setItem('lore_storage_grace_until', new Date(until).toISOString());
        try {
          window.dispatchEvent(new CustomEvent('notificationAdded', { detail: {
            id: `notif-${Date.now()}`,
            title: 'Stockage dépassé — Période de grâce',
            message: `Vous avez ${GRACE_DAYS} jours pour libérer de l’espace ou étendre votre stockage.`,
            timestamp: Date.now(),
            read: false
          }}));
        } catch (e) {}
      }
    }
  }, [isOpen, isOverLimit, graceUntil]);

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
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-lg font-semibold">Mes sources</h4>
              <span className="text-sm text-black/60">{totalUsed} Mo utilisés / {STORAGE_LIMIT_MB} Mo</span>
            </div>
            <div className="w-full h-2 bg-black/10 rounded mb-4 overflow-hidden">
              <div className={`${isOverLimit ? 'bg-red-600' : isNearLimit ? 'bg-amber-500' : 'bg-golden'} h-2`} style={{ width: `${Math.min(100, (totalUsed / STORAGE_LIMIT_MB) * 100)}%` }} />
            </div>

            {isNearLimit && !isOverLimit && (
              <div className="mb-3 text-sm bg-amber-100 text-amber-900 border border-amber-300 rounded p-2">
                Vous approchez de la limite de stockage. Pensez à étendre votre stockage ou à supprimer des fichiers inutiles.
              </div>
            )}
            {isOverLimit && isGraceActive && (
              <div className="mb-3 text-sm bg-amber-100 text-amber-900 border border-amber-300 rounded p-2">
                Limite atteinte. Période de grâce active: {graceDaysLeft} jour{graceDaysLeft > 1 ? 's' : ''} restant{graceDaysLeft > 1 ? 's' : ''} pour régulariser.
              </div>
            )}
            {isLocked && (
              <div className="mb-3 text-sm bg-red-100 text-red-900 border border-red-300 rounded p-2">
                Limite atteinte et période de grâce expirée. L’ajout de nouvelles sources est bloqué. Étendez votre stockage pour continuer.
              </div>
            )}

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
                {errorMessage && (
                  <div className="mb-2 text-sm text-red-800 bg-red-100 border border-red-300 rounded p-2">{errorMessage}</div>
                )}
                <button 
                  className={`text-amber-600 hover:text-amber-700 ${isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() => {
                    if (isLocked) { setShowStorageToast(true); return; }
                    fileInputRef.current?.click();
                  }}
                >
                  + Ajouter un document
                </button>
                <input ref={fileInputRef} type="file" accept="application/pdf" className="hidden" onChange={(e) => {
                  setErrorMessage('');
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const sizeMb = Math.max(0, file.size / (1024*1024));
                  if (sizeMb > MAX_SINGLE_FILE_MB) {
                    setErrorMessage(`Votre fichier dépasse la limite de ${MAX_SINGLE_FILE_MB} Mo par fichier du plan gratuit.`);
                    e.target.value = '';
                    return;
                  }
                  if (isLocked) {
                    setShowStorageToast(true);
                    e.target.value = '';
                    return;
                  }
                  const url = URL.createObjectURL(file);
                  const newFile = { id: `u-${Date.now()}`, name: file.name, sizeMo: Math.max(1, Math.round(sizeMb)), cover: '/images/sources/pdf-generic.png', url, pages: 198 };
                  setFiles(prev => [...prev, newFile]);
                  setSelectedId(newFile.id);
                  setPage(1);
                  setZoom(1);
                }} />
              </div>
              <button 
                className="px-3 py-2 rounded-lg border border-black/20 text-sm hover:bg-black/5"
                onClick={() => setShowStorageToast(true)}
              >
                Étendre mon stockage
              </button>
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
                <div className="w-full h-full overflow-auto">
                  <object 
                    data={`${selectedFile.url}#page=${page}`} 
                    type="application/pdf" 
                    className="w-full h-full transition-transform duration-200 ease-in-out"
                    style={{ 
                      transform: `scale(${zoom})`,
                      transformOrigin: 'top left',
                      width: `${100/zoom}%`,
                      height: `${100/zoom}%`
                    }}
                  >
                    <div className="w-full h-full flex items-center justify-center text-sm text-black/60">Aperçu indisponible</div>
                  </object>
                </div>
              ) : (
                <div 
                  className="absolute inset-0 bg-center bg-cover transition-transform duration-200 ease-in-out" 
                  style={{ 
                    backgroundImage: `url(${selectedFile?.cover})`,
                    transform: `scale(${zoom})`,
                    transformOrigin: 'center center'
                  }} 
                />
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
              <button 
                className="px-2 py-1 rounded border border-black/20 hover:bg-black/5 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed" 
                onClick={() => setZoom(z => Math.max(0.5, Math.round((z - 0.1) * 10) / 10))}
                disabled={zoom <= 0.5}
                title="Dézoomer"
              >
                <ZoomOut size={16} />
              </button>
              <button 
                className="px-2 py-1 text-xs text-black/60 hover:text-black/80 transition-colors duration-150"
                onClick={() => setZoom(1)}
                title="Réinitialiser le zoom"
              >
                {Math.round(zoom * 100)}%
              </button>
              <button 
                className="px-2 py-1 rounded border border-black/20 hover:bg-black/5 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed" 
                onClick={() => setZoom(z => Math.min(3, Math.round((z + 0.1) * 10) / 10))}
                disabled={zoom >= 3}
                title="Zoomer"
              >
                <ZoomIn size={16} />
              </button>
            </div>

            <div className="flex justify-end mt-6">
              <button onClick={close} className="px-4 py-2 rounded-lg bg-golden hover:bg-golden/80 text-dark-blue font-semibold">Fermer</button>
            </div>
          </div>
        </div>
      </div>

      {/* Toast notification (Undo) visuellement cohérent */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-[1001]">
          <div className="flex items-center space-x-4 bg-[#F0EAE1] text-[#1a1a1a] px-6 py-4 rounded-lg shadow-xl border border-black/10 max-w-md">
            <span className="font-medium text-sm">{toast.message}</span>
            <button onClick={toast.onAction} className="px-3 py-1 rounded border border-black/20 text-xs hover:bg-black/5 transition-colors">Annuler ×</button>
          </div>
        </div>
      )}

      {/* Toast Achat de stockage */}
      {showStorageToast && (
        <div className="fixed bottom-5 right-5 z-[1002]">
          <div className="flex items-center space-x-4 bg-[#F0EAE1] text-[#1a1a1a] px-6 py-4 rounded-lg shadow-xl border border-black/10 max-w-md">
            <div className="flex-1">
              <div className="font-semibold text-sm mb-1">Achat de stockage supplémentaire</div>
              <div className="text-xs text-black/70 mb-3">
                Vous avez atteint la limite de votre stockage de sources. Pour continuer à enrichir votre univers, vous pouvez acheter de l'espace supplémentaire ou souscrire à notre abonnement.
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => setShowStorageToast(false)}
                  className="px-3 py-1 rounded border border-black/20 text-xs hover:bg-black/5 transition-colors"
                >
                  Fermer
                </button>
                <button 
                  onClick={() => {
                    setShowStorageToast(false);
                    onClose(); // Fermer le modal Sources
                    navigate('/stockage'); // Redirection vers la page stockage
                  }}
                  className="px-3 py-1 rounded bg-golden hover:bg-golden/80 text-dark-blue font-semibold text-xs transition-colors"
                >
                  Voir les options
                </button>
              </div>
            </div>
            <button 
              onClick={() => setShowStorageToast(false)}
              className="text-black/60 hover:text-black transition-colors ml-2"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SourcesModal;


