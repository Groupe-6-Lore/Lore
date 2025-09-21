import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ChatbotPanel from '../components/ChatbotPanel';
import TemplatePanel from '../components/TemplatePanel';
import { 
  ArrowLeft,
  Plus,
  X,
  Users,
  BookOpen,
  Newspaper,
  ChevronRight,
  Archive,
  Trash2,
  Moon,
  Star,
  Target,
  CheckCircle,
  Clock,
  AlertCircle,
  Edit,
  Settings,
  Bell,
  GripVertical,
  Edit2,
  Save,
  Search,
  Package,
  Coins,
  ExternalLink,
  Link,
  Image,
  Upload,
  FileText
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';
import SourcesModal from '../components/modals/SourcesModal';
import PlayersModal from '../components/modals/PlayersModal';
import HistoryModal from '../components/modals/HistoryModal';

// Import des composants de drag & drop
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion, AnimatePresence } from 'framer-motion';

// Composant pour les lignes de texte draggables - Style Notion
const SortableTextLine = ({ id, content, section, isLink, linkUrl, onPaste, onShowContextMenu, type, isHeading, onEdit, onDelete, isEditing, onContentChange, onAddNewLine, onMoveToSection, onSlashCommand }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
  };

  const handleClick = () => {
    if (isLink && linkUrl) {
      if (linkUrl.startsWith('/templates/')) {
        // Navigation vers les templates
        window.location.href = linkUrl;
      } else {
        // Ouverture dans un nouvel onglet pour les autres liens
        window.open(linkUrl, '_blank');
      }
    }
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    setContextMenuPosition({ x: e.clientX, y: e.clientY });
    setShowContextMenu(true);
  };

  const handlePlusClick = (e) => {
    e.stopPropagation();
    if (onShowContextMenu) {
      onShowContextMenu(e, id);
    }
  };

  const handleEdit = () => {
    setShowContextMenu(false);
    // L'édition se fait maintenant directement avec contentEditable
    // Pas besoin d'appeler onEdit
  };

  const handleDelete = () => {
    setShowContextMenu(false);
    onDelete && onDelete(id);
  };

  const handleDuplicate = () => {
    setShowContextMenu(false);
    // Logique de duplication
    console.log('Dupliquer ligne:', id);
  };

  const handleMoveToSection = (newSection) => {
    setShowContextMenu(false);
    if (onMoveToSection) {
      onMoveToSection(id, newSection);
    }
  };

  // Fermer le menu contextuel en cliquant ailleurs
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showContextMenu) {
        setShowContextMenu(false);
      }
    };

    if (showContextMenu) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showContextMenu]);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group relative"
      onPaste={onPaste}
      onContextMenu={handleContextMenu}
    >
      {/* Drag Handle - Visible pendant le drag */}
      <div 
        className={`absolute left-[-30px] top-1 w-4 h-4 cursor-grab transition-all duration-200 text-gray-400 hover:text-gray-600 z-10 flex items-center justify-center ${
          isDragging ? 'opacity-100' : 'opacity-0 group-hover:opacity-80 hover:opacity-100'
        }`}
        {...attributes}
        {...listeners}
      >
        <GripVertical size={12} />
      </div>

      {/* Bouton + - Visible avec fond subtil */}
      <div 
        className="absolute left-[-55px] top-1 w-4 h-4 flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100 hover:opacity-100 z-10 bg-gray-100/80 hover:bg-gray-200/90 rounded-sm"
        onClick={handlePlusClick}
      >
        <Plus size={12} className="text-gray-600 hover:text-gray-800 transition-colors duration-150" />
      </div>


      {/* Contenu - Édition inline Notion-like */}
      {isHeading ? (
        type === 'heading1' ? (
          <h1 
            className={`leading-relaxed pl-8 text-3xl font-bold text-light ${isLink ? 'text-golden hover:text-golden/80 cursor-pointer underline' : 'cursor-text'} transition-colors`}
            contentEditable={!isLink}
            suppressContentEditableWarning={true}
            onBlur={(e) => {
              if (!isLink && onContentChange) {
                onContentChange(id, e.target.textContent);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (onAddNewLine) {
                  const newLineId = Date.now();
                  const newLine = {
                    id: newLineId,
                    content: '',
                    section: section,
                    type: 'text',
                    isLink: false,
                    isHeading: false
                  };
                  onAddNewLine(newLine, id);
                }
              }
              if (e.key === 'Escape') {
                e.target.blur();
              }
              if (e.key === 'Backspace' && e.target.textContent.trim() === '') {
                e.preventDefault();
            onDelete && onDelete(id);
              }
            }}
            onClick={isLink ? handleClick : undefined}
          >
            {isLink && <Link size={14} className="inline mr-2" />}
            {content}
          </h1>
        ) : type === 'heading2' ? (
          <h2 
            className={`leading-relaxed pl-8 text-2xl font-bold text-light ${isLink ? 'text-golden hover:text-golden/80 cursor-pointer underline' : 'cursor-text'} transition-colors`}
            contentEditable={!isLink}
            suppressContentEditableWarning={true}
            onBlur={(e) => {
              if (!isLink && onContentChange) {
                onContentChange(id, e.target.textContent);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (onAddNewLine) {
                  const newLineId = Date.now();
                  const newLine = {
                    id: newLineId,
                    content: '',
                    section: section,
                    type: 'text',
                    isLink: false,
                    isHeading: false
                  };
                  onAddNewLine(newLine, id);
                }
              }
              if (e.key === 'Escape') {
                e.target.blur();
              }
              if (e.key === 'Backspace' && e.target.textContent.trim() === '') {
                e.preventDefault();
                onDelete && onDelete(id);
              }
              // Gestion de la commande /
              if (e.key === '/' && e.target.textContent === '') {
                e.preventDefault();
                if (onSlashCommand) {
                  onSlashCommand(e, id);
                }
              }
            }}
            onClick={isLink ? handleClick : undefined}
          >
            {isLink && <Link size={14} className="inline mr-2" />}
            {content}
          </h2>
        ) : type === 'heading3' ? (
          <h3 
            className={`leading-relaxed pl-8 text-xl font-bold text-light ${isLink ? 'text-golden hover:text-golden/80 cursor-pointer underline' : 'cursor-text'} transition-colors`}
            contentEditable={!isLink}
            suppressContentEditableWarning={true}
            onBlur={(e) => {
              if (!isLink && onContentChange) {
                onContentChange(id, e.target.textContent);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (onAddNewLine) {
                  const newLineId = Date.now();
                  const newLine = {
                    id: newLineId,
                    content: '',
                    section: section,
                    type: 'text',
                    isLink: false,
                    isHeading: false
                  };
                  onAddNewLine(newLine, id);
                }
              }
              if (e.key === 'Escape') {
                e.target.blur();
              }
              if (e.key === 'Backspace' && e.target.textContent.trim() === '') {
                e.preventDefault();
                onDelete && onDelete(id);
              }
              // Gestion de la commande /
              if (e.key === '/' && e.target.textContent === '') {
                e.preventDefault();
                if (onSlashCommand) {
                  onSlashCommand(e, id);
                }
              }
            }}
            onClick={isLink ? handleClick : undefined}
          >
            {isLink && <Link size={14} className="inline mr-2" />}
            {content}
          </h3>
        ) : (
          <div 
            className={`leading-relaxed pl-8 text-light ${isLink ? 'text-golden hover:text-golden/80 cursor-pointer underline' : 'cursor-text'} transition-colors`}
            contentEditable={!isLink}
            suppressContentEditableWarning={true}
            onBlur={(e) => {
              if (!isLink && onContentChange) {
                onContentChange(id, e.target.textContent);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (onAddNewLine) {
                  const newLineId = Date.now();
                  const newLine = {
                    id: newLineId,
                    content: '',
                    section: section,
                    type: 'text',
                    isLink: false,
                    isHeading: false
                  };
                  onAddNewLine(newLine, id);
                }
              }
              if (e.key === 'Escape') {
                e.target.blur();
              }
              if (e.key === 'Backspace' && e.target.textContent.trim() === '') {
                e.preventDefault();
                onDelete && onDelete(id);
              }
              // Gestion de la commande /
              if (e.key === '/' && e.target.textContent === '') {
                e.preventDefault();
                if (onSlashCommand) {
                  onSlashCommand(e, id);
                }
              }
            }}
            onClick={isLink ? handleClick : undefined}
          >
            {isLink && <Link size={14} className="inline mr-2" />}
            {content}
          </div>
        )
      ) : type === 'quest-preview' ? (
        <div className="pl-8 my-4 group relative">
          <div className="bg-slate-800/40 backdrop-blur-md rounded-xl p-6 border border-slate-700/50 shadow-2xl">
            {/* Bouton de suppression */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete && onDelete(id);
              }}
              className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center bg-red-100/80 hover:bg-red-200/90 rounded transition-colors opacity-0 group-hover:opacity-100 z-10"
              title="Supprimer l'aperçu"
            >
              <X size={14} className="text-red-600 hover:text-red-800" />
            </button>
            
            <h3 className="text-lg font-bold text-light eagle-lake-font mb-4">Quêtes</h3>
            
            <div className="space-y-4">
              {(() => {
                // Extraire les données de la quête depuis le contenu
                const questDataMatch = content.match(/APERÇU_QUÊTE:(.+)/);
                if (!questDataMatch) return null;
                
                try {
                  const storedQuestData = JSON.parse(questDataMatch[1]);
                  
                  // Récupérer les données actuelles depuis les templates pour la synchronisation
                  const templateCategories = JSON.parse(localStorage.getItem('lore-quests-categories') || '[]');
                  let currentQuestData = storedQuestData;
                  
                  // Chercher la quête correspondante dans les templates pour la synchronisation
                  templateCategories.forEach(category => {
                    if (category.quests && category.quests.length > 0) {
                      category.quests.forEach(quest => {
                        if (quest.title === storedQuestData.title) {
                          currentQuestData = quest;
                        }
                      });
                    }
                  });
                  
                  const questData = currentQuestData;
                  
                  return (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${
                            questData?.subQuests?.reduce((sum, sub) => sum + sub.current, 0) >= 
                            questData?.subQuests?.reduce((sum, sub) => sum + sub.total, 0) ? 'bg-green-500' :
                            questData?.subQuests?.reduce((sum, sub) => sum + sub.current, 0) > 0 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}></div>
                          <span className="text-white font-medium">{questData?.title}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-white">
                            <span 
                              className="cursor-text hover:bg-white/10 p-1 rounded transition-colors"
                              contentEditable={true}
                              suppressContentEditableWarning={true}
                              onBlur={(e) => {
                                if (onContentChange) {
                                  const newCurrent = parseInt(e.target.textContent) || 0;
                                  const updatedQuestData = { ...questData };
                                  if (updatedQuestData.subQuests) {
                                    // Répartir le nouveau total proportionnellement sur les sous-quêtes
                                    const currentTotal = updatedQuestData.subQuests.reduce((sum, sub) => sum + sub.current, 0);
                                    const ratio = currentTotal > 0 ? newCurrent / currentTotal : 1;
                                    
                                    updatedQuestData.subQuests = updatedQuestData.subQuests.map(sub => ({
                                      ...sub,
                                      current: Math.round(sub.current * ratio)
                                    }));
                                    
                                    const newContent = `APERÇU_QUÊTE:${JSON.stringify(updatedQuestData)}`;
                                    onContentChange(id, newContent);
                                  }
                                }
                              }}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  e.target.blur();
                                }
                                if (e.key === 'Escape') {
                                  e.target.blur();
                                }
                              }}
                              title="Cliquer pour éditer le total actuel"
                            >
                              {questData?.subQuests?.reduce((sum, sub) => sum + sub.current, 0) || 0}
                            </span>/
                            <span 
                              className="cursor-text hover:bg-white/10 p-1 rounded transition-colors"
                              contentEditable={true}
                              suppressContentEditableWarning={true}
                              onBlur={(e) => {
                                if (onContentChange) {
                                  const newTotal = parseInt(e.target.textContent) || 0;
                                  const updatedQuestData = { ...questData };
                                  if (updatedQuestData.subQuests) {
                                    // Répartir le nouveau total proportionnellement sur les sous-quêtes
                                    const currentTotal = updatedQuestData.subQuests.reduce((sum, sub) => sum + sub.total, 0);
                                    const ratio = currentTotal > 0 ? newTotal / currentTotal : 1;
                                    
                                    updatedQuestData.subQuests = updatedQuestData.subQuests.map(sub => ({
                                      ...sub,
                                      total: Math.round(sub.total * ratio)
                                    }));
                                    
                                    const newContent = `APERÇU_QUÊTE:${JSON.stringify(updatedQuestData)}`;
                                    onContentChange(id, newContent);
                                  }
                                }
                              }}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  e.target.blur();
                                }
                                if (e.key === 'Escape') {
                                  e.target.blur();
                                }
                              }}
                              title="Cliquer pour éditer le total maximum"
                            >
                              {questData?.subQuests?.reduce((sum, sub) => sum + sub.total, 0) || 0}
                            </span>
                          </span>
                          <ChevronRight size={16} className="text-white" />
                        </div>
                      </div>
                      <div className="w-full bg-gray-600 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            questData?.subQuests?.reduce((sum, sub) => sum + sub.current, 0) >= 
                            questData?.subQuests?.reduce((sum, sub) => sum + sub.total, 0) ? 'bg-green-500' :
                            questData?.subQuests?.reduce((sum, sub) => sum + sub.current, 0) > 0 ? 'bg-yellow-500' : 'bg-red-500'
                          }`} 
                          style={{ 
                            width: `${questData?.subQuests ? 
                              (questData.subQuests.reduce((sum, sub) => sum + sub.current, 0) / 
                               questData.subQuests.reduce((sum, sub) => sum + sub.total, 0)) * 100 : 0}%` 
                          }}
                        ></div>
                      </div>
                      
                      {/* Sous-quêtes */}
                      {questData?.subQuests && questData.subQuests.map((subQuest, subIndex) => (
                        <div key={subIndex} className="ml-6 space-y-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className={`w-2 h-2 rounded-full ${
                                subQuest.current >= subQuest.total ? 'bg-green-400' :
                                subQuest.current > 0 ? 'bg-yellow-400' : 'bg-red-400'
                              }`}></div>
                              <span className="text-white text-sm">{subQuest.name}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-white text-sm">
                                <span 
                                  className="cursor-text hover:bg-white/10 p-1 rounded transition-colors"
                                  contentEditable={true}
                                  suppressContentEditableWarning={true}
                                  onBlur={(e) => {
                                    if (onContentChange) {
                                      const newCurrent = parseInt(e.target.textContent) || 0;
                                      const updatedQuestData = { ...questData };
                                      if (updatedQuestData.subQuests) {
                                        updatedQuestData.subQuests[subIndex] = {
                                          ...updatedQuestData.subQuests[subIndex],
                                          current: newCurrent
                                        };
                                        
                                        const newContent = `APERÇU_QUÊTE:${JSON.stringify(updatedQuestData)}`;
                                        onContentChange(id, newContent);
                                      }
                                    }
                                  }}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                      e.preventDefault();
                                      e.target.blur();
                                    }
                                    if (e.key === 'Escape') {
                                      e.target.blur();
                                    }
                                  }}
                                  title="Cliquer pour éditer le progrès actuel"
                                >
                                  {subQuest.current}
                                </span>/
                                <span 
                                  className="cursor-text hover:bg-white/10 p-1 rounded transition-colors"
                                  contentEditable={true}
                                  suppressContentEditableWarning={true}
                                  onBlur={(e) => {
                                    if (onContentChange) {
                                      const newTotal = parseInt(e.target.textContent) || 0;
                                      const updatedQuestData = { ...questData };
                                      if (updatedQuestData.subQuests) {
                                        updatedQuestData.subQuests[subIndex] = {
                                          ...updatedQuestData.subQuests[subIndex],
                                          total: newTotal
                                        };
                                        
                                        const newContent = `APERÇU_QUÊTE:${JSON.stringify(updatedQuestData)}`;
                                        onContentChange(id, newContent);
                                      }
                                    }
                                  }}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                      e.preventDefault();
                                      e.target.blur();
                                    }
                                    if (e.key === 'Escape') {
                                      e.target.blur();
                                    }
                                  }}
                                  title="Cliquer pour éditer le total maximum"
                                >
                                  {subQuest.total}
                                </span>
                              </span>
                            </div>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-1.5">
                            <div 
                              className={`h-1.5 rounded-full ${
                                subQuest.current >= subQuest.total ? 'bg-green-400' :
                                subQuest.current > 0 ? 'bg-yellow-400' : 'bg-red-400'
                              }`} 
                              style={{ width: `${(subQuest.current / subQuest.total) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                } catch (error) {
                  console.error('Erreur parsing quest data:', error);
                  return <div className="text-red-400">Erreur d'affichage de la quête</div>;
                }
              })()}
            </div>
          </div>
        </div>
      ) : type === 'merchant-preview' ? (
        <div className="pl-8 my-4 group relative">
          <div className="bg-slate-800/40 backdrop-blur-md rounded-xl p-6 border border-slate-700/50 shadow-2xl">
            {/* Bouton de suppression */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete && onDelete(id);
              }}
              className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center bg-red-100/80 hover:bg-red-200/90 rounded transition-colors opacity-0 group-hover:opacity-100 z-10"
              title="Supprimer l'aperçu"
            >
              <X size={14} className="text-red-600 hover:text-red-800" />
            </button>
            
            <h3 className="text-lg font-bold text-light eagle-lake-font mb-4">Template Marchand</h3>
            
            <div className="space-y-4">
              {(() => {
                // Extraire les données du template depuis le contenu
                const templateDataMatch = content.match(/APERÇU_MARCHAND:(.+)/);
                if (!templateDataMatch) return null;
                
                try {
                  const templateData = JSON.parse(templateDataMatch[1]);
                  
                  return (
                    <div key={templateData.id} className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/30">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-md font-semibold text-light eagle-lake-font">
                          {templateData.name}
                        </h4>
                        <div className="text-sm text-light/80">
                          {templateData.location}
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="text-sm text-light/80 mb-2">
                          PNJ: {templateData.npc}
                        </div>
                        <div className="text-sm text-light leading-relaxed">
                          {templateData.description}
                        </div>
                      </div>
                      
                      {/* Inventaire */}
                      {templateData.inventory && templateData.inventory.length > 0 && (
                        <div className="space-y-2">
                          <h5 className="text-sm font-medium text-light flex items-center gap-2">
                            <Package size={16} />
                            Inventaire ({templateData.inventory.length} objets)
                          </h5>
                          <div className="grid grid-cols-2 gap-2">
                            {templateData.inventory.slice(0, 4).map((item, index) => (
                              <div key={item.id} className="bg-slate-600/20 rounded p-2 text-xs">
                                <div className="text-light font-medium">{item.name}</div>
                                <div className="text-light/70">{item.price} PO</div>
                              </div>
                            ))}
                            {templateData.inventory.length > 4 && (
                              <div className="bg-slate-600/20 rounded p-2 text-xs text-light/70 flex items-center justify-center">
                                +{templateData.inventory.length - 4} autres...
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                } catch (error) {
                  console.error('Erreur lors du parsing des données du template:', error);
                  return <div className="text-red-400">Erreur lors du chargement du template</div>;
                }
              })()}
            </div>
          </div>
        </div>
      ) : type === 'combat-preview' ? (
        <div className="pl-8 my-4 group relative">
          <div className="bg-slate-800/40 backdrop-blur-md rounded-xl p-6 border border-slate-700/50 shadow-2xl">
            {/* Bouton de suppression */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete && onDelete(id);
              }}
              className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center bg-red-100/80 hover:bg-red-200/90 rounded transition-colors opacity-0 group-hover:opacity-100 z-10"
              title="Supprimer l'aperçu"
            >
              <X size={14} className="text-red-600 hover:text-red-800" />
            </button>
            
            <h3 className="text-lg font-bold text-light eagle-lake-font mb-4">Template Combat</h3>
            
            <div className="space-y-4">
              {(() => {
                // Extraire les données du template depuis le contenu
                const templateDataMatch = content.match(/APERÇU_COMBAT:(.+)/);
                if (!templateDataMatch) return null;
                
                try {
                  const templateData = JSON.parse(templateDataMatch[1]);
                  
                  return (
                    <div key={templateData.id} className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/30">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-md font-semibold text-light eagle-lake-font">
                          {templateData.name}
                        </h4>
                        <div className="text-sm text-light/80">
                          {templateData.difficulty}
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="text-sm text-light/80 mb-2">
                          Lieu: {templateData.location}
                        </div>
                        <div className="text-sm text-light/80 mb-2">
                          Récompenses: {templateData.rewards}
                        </div>
                        <div className="text-sm text-light leading-relaxed">
                          {templateData.description}
                        </div>
                      </div>
                      
                      {/* Ennemis */}
                      {templateData.enemies && templateData.enemies.length > 0 && (
                        <div className="space-y-2">
                          <h5 className="text-sm font-medium text-light flex items-center gap-2">
                            <Sword size={16} />
                            Ennemis ({templateData.enemies.length})
                          </h5>
                          <div className="space-y-1">
                            {templateData.enemies.map((enemy, index) => (
                              <div key={index} className="bg-slate-600/20 rounded p-2 text-xs">
                                <div className="text-light font-medium">{enemy.name}</div>
                                <div className="text-light/70">
                                  PV: {enemy.hp} | CA: {enemy.ac} | Att: {enemy.attack} | Dég: {enemy.damage}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                } catch (error) {
                  console.error('Erreur lors du parsing des données du template:', error);
                  return <div className="text-red-400">Erreur lors du chargement du template</div>;
                }
              })()}
            </div>
          </div>
        </div>
      ) : type === 'merchant-card-preview' ? (
        <div className="pl-8 my-4 group relative">
          <div className="bg-slate-800/40 backdrop-blur-md rounded-xl p-6 border border-slate-700/50 shadow-2xl">
            {/* Bouton de suppression */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete && onDelete(id);
              }}
              className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center bg-red-100/80 hover:bg-red-200/90 rounded transition-colors opacity-0 group-hover:opacity-100 z-10"
              title="Supprimer la card"
            >
              <X size={14} className="text-red-600 hover:text-red-800" />
            </button>
            

            {(() => {
              // Extraire les données du template depuis le contenu
              const templateDataMatch = content.match(/MERCHANT_CARD:(.+)/);
              if (!templateDataMatch) {
                console.error('Aucune donnée MERCHANT_CARD trouvée dans le contenu:', content);
                return <div className="text-red-400">Erreur: Données de la card marchand manquantes</div>;
              }
              
              try {
                const templateData = JSON.parse(templateDataMatch[1]);
                
                // Vérifier que les données sont valides
                if (!templateData) {
                  console.error('Template data is null or undefined:', templateData);
                  return <div className="text-red-400">Erreur: Données de template manquantes</div>;
                }
                
                if (!templateData.inventory) {
                  console.error('Inventory is missing:', templateData);
                  return <div className="text-red-400">Erreur: Inventaire manquant</div>;
                }
                
                if (!Array.isArray(templateData.inventory)) {
                  console.error('Inventory is not an array:', templateData.inventory);
                  return <div className="text-red-400">Erreur: Inventaire invalide (pas un tableau)</div>;
                }
                
                // Vérifier que chaque objet de l'inventaire a les bonnes propriétés
                const invalidItems = templateData.inventory.filter(item => 
                  !item.id || !item.name || typeof item.price !== 'number'
                );
                
                if (invalidItems.length > 0) {
                  console.error('Items invalides dans l\'inventaire:', invalidItems);
                  return <div className="text-red-400">Erreur: Objets d'inventaire invalides</div>;
                }
                
                return (
                  <div>
                    <h3 
                      className="text-xl font-bold text-light eagle-lake-font mb-4 cursor-pointer hover:text-golden transition-colors"
                      contentEditable={true}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => {
                        if (onContentChange) {
                          const newName = e.target.textContent;
                          const updatedTemplateData = { ...templateData, name: newName };
                          const newContent = `MERCHANT_CARD:${JSON.stringify(updatedTemplateData)}`;
                          onContentChange(id, newContent);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          e.target.blur();
                        }
                        if (e.key === 'Escape') {
                          e.target.blur();
                        }
                      }}
                      title="Cliquer pour éditer le titre"
                    >
                      {templateData.name}
                    </h3>
                    
                    <div className="space-y-4">
                      <p 
                        className="text-light leading-relaxed cursor-text hover:bg-white/5 p-2 rounded transition-colors"
                        contentEditable={true}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => {
                          if (onContentChange) {
                            const newDescription = e.target.textContent;
                            const updatedTemplateData = { ...templateData, description: newDescription };
                            const newContent = `MERCHANT_CARD:${JSON.stringify(updatedTemplateData)}`;
                            onContentChange(id, newContent);
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            e.target.blur();
                          }
                          if (e.key === 'Escape') {
                            e.target.blur();
                          }
                        }}
                        title="Cliquer pour éditer la description"
                      >
                        {templateData.description}
                      </p>
                      
                      <div className="text-sm text-light/80 font-semibold">
                        PNJ: <span 
                          className="cursor-text hover:bg-white/5 p-1 rounded transition-colors"
                          contentEditable={true}
                          suppressContentEditableWarning={true}
                          onBlur={(e) => {
                            if (onContentChange) {
                              const newNpc = e.target.textContent;
                              const updatedTemplateData = { ...templateData, npc: newNpc };
                              const newContent = `MERCHANT_CARD:${JSON.stringify(updatedTemplateData)}`;
                              onContentChange(id, newContent);
                            }
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              e.target.blur();
                            }
                            if (e.key === 'Escape') {
                              e.target.blur();
                            }
                          }}
                          title="Cliquer pour éditer le PNJ"
                        >
                          {templateData.npc}
                        </span>
                      </div>

                      {/* Tableau d'inventaire - Style Notion */}
                      <div className="bg-white/10 rounded-lg p-4 border border-light/20">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-lg font-semibold text-light flex items-center">
                            <Package size={16} className="mr-2" />
                            Inventaire du marchand
                          </h4>
                          <div className="text-sm text-light/80 font-semibold">
                            Total: <span 
                              className="cursor-text hover:bg-white/10 p-1 rounded transition-colors"
                              contentEditable={true}
                              suppressContentEditableWarning={true}
                              onBlur={(e) => {
                                if (onContentChange) {
                                  const newTotal = parseInt(e.target.textContent) || 0;
                                  // Répartir le nouveau total proportionnellement sur les objets
                                  const currentTotal = templateData.inventory.reduce((sum, item) => sum + item.price, 0);
                                  const ratio = currentTotal > 0 ? newTotal / currentTotal : 1;
                                  
                                  const updatedInventory = templateData.inventory.map(item => ({
                                    ...item,
                                    price: Math.round(item.price * ratio)
                                  }));
                                  
                                  const updatedTemplateData = { ...templateData, inventory: updatedInventory };
                                  const newContent = `MERCHANT_CARD:${JSON.stringify(updatedTemplateData)}`;
                                  onContentChange(id, newContent);
                                }
                              }}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  e.target.blur();
                                }
                                if (e.key === 'Escape') {
                                  e.target.blur();
                                }
                              }}
                              title="Cliquer pour éditer le total"
                            >
                              {templateData.inventory.reduce((sum, item) => sum + item.price, 0)}
                            </span> pièces d'or
                          </div>
                        </div>

                        <div className="space-y-2">
                          {templateData.inventory.map((item, index) => (
                            <div key={item.id} className="flex items-center gap-3 p-2 bg-white/5 rounded">
                              <div className="w-6 h-6 bg-amber-500 rounded flex items-center justify-center text-xs text-white font-bold">
                                {index + 1}
                              </div>
                              <div className="text-light font-medium flex-1">
                                <span 
                                  className="cursor-text hover:bg-white/10 p-1 rounded transition-colors"
                                  contentEditable={true}
                                  suppressContentEditableWarning={true}
                                  onBlur={(e) => {
                                    if (onContentChange) {
                                      const newName = e.target.textContent;
                                      const updatedInventory = templateData.inventory.map(invItem => 
                                        invItem.id === item.id ? { ...invItem, name: newName } : invItem
                                      );
                                      const updatedTemplateData = { ...templateData, inventory: updatedInventory };
                                      const newContent = `MERCHANT_CARD:${JSON.stringify(updatedTemplateData)}`;
                                      onContentChange(id, newContent);
                                    }
                                  }}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                      e.preventDefault();
                                      e.target.blur();
                                    }
                                    if (e.key === 'Escape') {
                                      e.target.blur();
                                    }
                                  }}
                                  title="Cliquer pour éditer le nom de l'objet"
                                >
                                  {item.name}
                                </span>
                              </div>
                              <div className="text-light/80">
                                <span 
                                  className="cursor-text hover:bg-white/10 p-1 rounded transition-colors"
                                  contentEditable={true}
                                  suppressContentEditableWarning={true}
                                  onBlur={(e) => {
                                    if (onContentChange) {
                                      const newPrice = parseInt(e.target.textContent) || 0;
                                      const updatedInventory = templateData.inventory.map(invItem => 
                                        invItem.id === item.id ? { ...invItem, price: newPrice } : invItem
                                      );
                                      const updatedTemplateData = { ...templateData, inventory: updatedInventory };
                                      const newContent = `MERCHANT_CARD:${JSON.stringify(updatedTemplateData)}`;
                                      onContentChange(id, newContent);
                                    }
                                  }}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                      e.preventDefault();
                                      e.target.blur();
                                    }
                                    if (e.key === 'Escape') {
                                      e.target.blur();
                                    }
                                  }}
                                  title="Cliquer pour éditer le prix"
                                >
                                  {item.price}
                                </span> PO
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              } catch (error) {
                console.error('Erreur lors du parsing des données du template:', error);
                return <div className="text-red-400">Erreur lors du chargement du template</div>;
              }
            })()}
          </div>
        </div>
      ) : type === 'combat-preview' ? (
        <div className="pl-8 my-4 group relative">
          <div className="bg-slate-800/40 backdrop-blur-md rounded-xl p-6 border border-slate-700/50 shadow-2xl">
            {/* Bouton de suppression */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete && onDelete(id);
              }}
              className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center bg-red-100/80 hover:bg-red-200/90 rounded transition-colors opacity-0 group-hover:opacity-100 z-10"
              title="Supprimer la card"
            >
              <X size={14} className="text-red-600 hover:text-red-800" />
            </button>
            
            {(() => {
              // Extraire les données du template depuis le contenu
              const templateDataMatch = content.match(/APERÇU_COMBAT:(.+)/);
              if (!templateDataMatch) {
                console.error('Aucune donnée APERÇU_COMBAT trouvée dans le contenu:', content);
                return <div className="text-red-400">Erreur: Données de la card combat manquantes</div>;
              }
              
              try {
                const templateData = JSON.parse(templateDataMatch[1]);
                
                // Vérifier que les données sont valides
                if (!templateData) {
                  console.error('Template data is null or undefined:', templateData);
                  return <div className="text-red-400">Erreur: Données de template manquantes</div>;
                }
                
                if (!templateData.enemies) {
                  console.error('Enemies is missing:', templateData);
                  return <div className="text-red-400">Erreur: Ennemis manquants</div>;
                }
                
                if (!Array.isArray(templateData.enemies)) {
                  console.error('Enemies is not an array:', templateData.enemies);
                  return <div className="text-red-400">Erreur: Ennemis invalides (pas un tableau)</div>;
                }
                
                return (
                  <div>
                    <h3 
                      className="text-xl font-bold text-light eagle-lake-font mb-4 cursor-pointer hover:text-golden transition-colors"
                      contentEditable={true}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => {
                        if (onContentChange) {
                          const newName = e.target.textContent;
                          const updatedTemplateData = { ...templateData, name: newName };
                          const newContent = `APERÇU_COMBAT:${JSON.stringify(updatedTemplateData)}`;
                          onContentChange(id, newContent);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          e.target.blur();
                        }
                        if (e.key === 'Escape') {
                          e.target.blur();
                        }
                      }}
                      title="Cliquer pour éditer le titre"
                    >
                      {templateData.name}
                    </h3>
                    
                    <div className="space-y-4">
                      <p 
                        className="text-light leading-relaxed cursor-text hover:bg-white/5 p-2 rounded transition-colors"
                        contentEditable={true}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => {
                          if (onContentChange) {
                            const newDescription = e.target.textContent;
                            const updatedTemplateData = { ...templateData, description: newDescription };
                            const newContent = `APERÇU_COMBAT:${JSON.stringify(updatedTemplateData)}`;
                            onContentChange(id, newContent);
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            e.target.blur();
                          }
                          if (e.key === 'Escape') {
                            e.target.blur();
                          }
                        }}
                        title="Cliquer pour éditer la description"
                      >
                        {templateData.description}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="text-light/80 font-semibold">
                          Lieu: <span 
                            className="cursor-text hover:bg-white/5 p-1 rounded transition-colors"
                            contentEditable={true}
                            suppressContentEditableWarning={true}
                            onBlur={(e) => {
                              if (onContentChange) {
                                const newLocation = e.target.textContent;
                                const updatedTemplateData = { ...templateData, location: newLocation };
                                const newContent = `APERÇU_COMBAT:${JSON.stringify(updatedTemplateData)}`;
                                onContentChange(id, newContent);
                              }
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                e.target.blur();
                              }
                              if (e.key === 'Escape') {
                                e.target.blur();
                              }
                            }}
                            title="Cliquer pour éditer le lieu"
                          >
                            {templateData.location}
                          </span>
                        </div>
                        
                        <div className="text-light/80 font-semibold">
                          Difficulté: <span 
                            className="cursor-text hover:bg-white/5 p-1 rounded transition-colors"
                            contentEditable={true}
                            suppressContentEditableWarning={true}
                            onBlur={(e) => {
                              if (onContentChange) {
                                const newDifficulty = e.target.textContent;
                                const updatedTemplateData = { ...templateData, difficulty: newDifficulty };
                                const newContent = `APERÇU_COMBAT:${JSON.stringify(updatedTemplateData)}`;
                                onContentChange(id, newContent);
                              }
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                e.target.blur();
                              }
                              if (e.key === 'Escape') {
                                e.target.blur();
                              }
                            }}
                            title="Cliquer pour éditer la difficulté"
                          >
                            {templateData.difficulty}
                          </span>
                        </div>
                      </div>

                      <div className="text-sm text-light/80 font-semibold">
                        Récompenses: <span 
                          className="cursor-text hover:bg-white/5 p-1 rounded transition-colors"
                          contentEditable={true}
                          suppressContentEditableWarning={true}
                          onBlur={(e) => {
                            if (onContentChange) {
                              const newRewards = e.target.textContent;
                              const updatedTemplateData = { ...templateData, rewards: newRewards };
                              const newContent = `APERÇU_COMBAT:${JSON.stringify(updatedTemplateData)}`;
                              onContentChange(id, newContent);
                            }
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              e.target.blur();
                            }
                            if (e.key === 'Escape') {
                              e.target.blur();
                            }
                          }}
                          title="Cliquer pour éditer les récompenses"
                        >
                          {templateData.rewards}
                        </span>
                      </div>

                      {/* Tableau des ennemis - Style Notion */}
                      <div className="bg-white/10 rounded-lg p-4 border border-light/20">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-lg font-semibold text-light flex items-center">
                            <Target size={16} className="mr-2" />
                            Ennemis
                          </h4>
                        </div>

                        <div className="space-y-2">
                          {templateData.enemies.map((enemy, index) => (
                            <div key={index} className="flex items-center gap-3 p-2 bg-white/5 rounded">
                              <div className="w-6 h-6 bg-red-500 rounded flex items-center justify-center text-xs text-white font-bold">
                                {index + 1}
                              </div>
                              <div className="text-light font-medium flex-1">
                                <span 
                                  className="cursor-text hover:bg-white/10 p-1 rounded transition-colors"
                                  contentEditable={true}
                                  suppressContentEditableWarning={true}
                                  onBlur={(e) => {
                                    if (onContentChange) {
                                      const newName = e.target.textContent;
                                      const updatedEnemies = templateData.enemies.map((en, i) => 
                                        i === index ? { ...en, name: newName } : en
                                      );
                                      const updatedTemplateData = { ...templateData, enemies: updatedEnemies };
                                      const newContent = `APERÇU_COMBAT:${JSON.stringify(updatedTemplateData)}`;
                                      onContentChange(id, newContent);
                                    }
                                  }}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                      e.preventDefault();
                                      e.target.blur();
                                    }
                                    if (e.key === 'Escape') {
                                      e.target.blur();
                                    }
                                  }}
                                  title="Cliquer pour éditer le nom de l'ennemi"
                                >
                                  {enemy.name}
                                </span>
                              </div>
                              <div className="text-light/80 text-sm space-x-2">
                                <span>PV: <span 
                                  className="cursor-text hover:bg-white/10 p-1 rounded transition-colors"
                                  contentEditable={true}
                                  suppressContentEditableWarning={true}
                                  onBlur={(e) => {
                                    if (onContentChange) {
                                      const newHp = parseInt(e.target.textContent) || 0;
                                      const updatedEnemies = templateData.enemies.map((en, i) => 
                                        i === index ? { ...en, hp: newHp } : en
                                      );
                                      const updatedTemplateData = { ...templateData, enemies: updatedEnemies };
                                      const newContent = `APERÇU_COMBAT:${JSON.stringify(updatedTemplateData)}`;
                                      onContentChange(id, newContent);
                                    }
                                  }}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                      e.preventDefault();
                                      e.target.blur();
                                    }
                                    if (e.key === 'Escape') {
                                      e.target.blur();
                                    }
                                  }}
                                  title="Cliquer pour éditer les PV"
                                >
                                  {enemy.hp}
                                </span></span>
                                <span>CA: <span 
                                  className="cursor-text hover:bg-white/10 p-1 rounded transition-colors"
                                  contentEditable={true}
                                  suppressContentEditableWarning={true}
                                  onBlur={(e) => {
                                    if (onContentChange) {
                                      const newAc = parseInt(e.target.textContent) || 0;
                                      const updatedEnemies = templateData.enemies.map((en, i) => 
                                        i === index ? { ...en, ac: newAc } : en
                                      );
                                      const updatedTemplateData = { ...templateData, enemies: updatedEnemies };
                                      const newContent = `APERÇU_COMBAT:${JSON.stringify(updatedTemplateData)}`;
                                      onContentChange(id, newContent);
                                    }
                                  }}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                      e.preventDefault();
                                      e.target.blur();
                                    }
                                    if (e.key === 'Escape') {
                                      e.target.blur();
                                    }
                                  }}
                                  title="Cliquer pour éditer la CA"
                                >
                                  {enemy.ac}
                                </span></span>
                                <span>Att: <span 
                                  className="cursor-text hover:bg-white/10 p-1 rounded transition-colors"
                                  contentEditable={true}
                                  suppressContentEditableWarning={true}
                                  onBlur={(e) => {
                                    if (onContentChange) {
                                      const newAttack = e.target.textContent;
                                      const updatedEnemies = templateData.enemies.map((en, i) => 
                                        i === index ? { ...en, attack: newAttack } : en
                                      );
                                      const updatedTemplateData = { ...templateData, enemies: updatedEnemies };
                                      const newContent = `APERÇU_COMBAT:${JSON.stringify(updatedTemplateData)}`;
                                      onContentChange(id, newContent);
                                    }
                                  }}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                      e.preventDefault();
                                      e.target.blur();
                                    }
                                    if (e.key === 'Escape') {
                                      e.target.blur();
                                    }
                                  }}
                                  title="Cliquer pour éditer l'attaque"
                                >
                                  {enemy.attack}
                                </span></span>
                                <span>Dég: <span 
                                  className="cursor-text hover:bg-white/10 p-1 rounded transition-colors"
                                  contentEditable={true}
                                  suppressContentEditableWarning={true}
                                  onBlur={(e) => {
                                    if (onContentChange) {
                                      const newDamage = e.target.textContent;
                                      const updatedEnemies = templateData.enemies.map((en, i) => 
                                        i === index ? { ...en, damage: newDamage } : en
                                      );
                                      const updatedTemplateData = { ...templateData, enemies: updatedEnemies };
                                      const newContent = `APERÇU_COMBAT:${JSON.stringify(updatedTemplateData)}`;
                                      onContentChange(id, newContent);
                                    }
                                  }}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                      e.preventDefault();
                                      e.target.blur();
                                    }
                                    if (e.key === 'Escape') {
                                      e.target.blur();
                                    }
                                  }}
                                  title="Cliquer pour éditer les dégâts"
                                >
                                  {enemy.damage}
                                </span></span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              } catch (error) {
                console.error('Erreur lors du parsing des données du template:', error);
                return <div className="text-red-400">Erreur lors du chargement du template</div>;
              }
            })()}
          </div>
        </div>
      ) : type === 'combat-card-preview' ? (
        <div className="pl-8 my-4 group relative">
          <div className="bg-slate-800/40 backdrop-blur-md rounded-xl p-6 border border-slate-700/50 shadow-2xl">
            {/* Bouton de suppression */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete && onDelete(id);
              }}
              className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center bg-red-100/80 hover:bg-red-200/90 rounded transition-colors opacity-0 group-hover:opacity-100 z-10"
              title="Supprimer la card"
            >
              <X size={14} className="text-red-600 hover:text-red-800" />
            </button>
            
            {(() => {
              // Extraire les données du template depuis le contenu
              const templateDataMatch = content.match(/COMBAT_CARD:(.+)/);
              if (!templateDataMatch) {
                console.error('Aucune donnée COMBAT_CARD trouvée dans le contenu:', content);
                return <div className="text-red-400">Erreur: Données de la card combat manquantes</div>;
              }
              
              try {
                const templateData = JSON.parse(templateDataMatch[1]);
                
                // Vérifier que les données sont valides
                if (!templateData) {
                  console.error('Template data is null or undefined:', templateData);
                  return <div className="text-red-400">Erreur: Données de template manquantes</div>;
                }
                
                if (!templateData.enemies) {
                  console.error('Enemies is missing:', templateData);
                  return <div className="text-red-400">Erreur: Ennemis manquants</div>;
                }
                
                if (!Array.isArray(templateData.enemies)) {
                  console.error('Enemies is not an array:', templateData.enemies);
                  return <div className="text-red-400">Erreur: Ennemis invalides (pas un tableau)</div>;
                }
                
                return (
                  <div>
                    <h3 
                      className="text-xl font-bold text-light eagle-lake-font mb-4 cursor-pointer hover:text-golden transition-colors"
                      contentEditable={true}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => {
                        if (onContentChange) {
                          const newName = e.target.textContent;
                          const updatedTemplateData = { ...templateData, name: newName };
                          const newContent = `COMBAT_CARD:${JSON.stringify(updatedTemplateData)}`;
                          onContentChange(id, newContent);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          e.target.blur();
                        }
                        if (e.key === 'Escape') {
                          e.target.blur();
                        }
                      }}
                      title="Cliquer pour éditer le titre"
                    >
                      {templateData.name}
                    </h3>
                    
                    <div className="space-y-4">
                      <p 
                        className="text-light leading-relaxed cursor-text hover:bg-white/5 p-2 rounded transition-colors"
                        contentEditable={true}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => {
                          if (onContentChange) {
                            const newDescription = e.target.textContent;
                            const updatedTemplateData = { ...templateData, description: newDescription };
                            const newContent = `COMBAT_CARD:${JSON.stringify(updatedTemplateData)}`;
                            onContentChange(id, newContent);
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            e.target.blur();
                          }
                          if (e.key === 'Escape') {
                            e.target.blur();
                          }
                        }}
                        title="Cliquer pour éditer la description"
                      >
                        {templateData.description}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="text-light/80 font-semibold">
                          Lieu: <span 
                            className="cursor-text hover:bg-white/5 p-1 rounded transition-colors"
                            contentEditable={true}
                            suppressContentEditableWarning={true}
                            onBlur={(e) => {
                              if (onContentChange) {
                                const newLocation = e.target.textContent;
                                const updatedTemplateData = { ...templateData, location: newLocation };
                                const newContent = `COMBAT_CARD:${JSON.stringify(updatedTemplateData)}`;
                                onContentChange(id, newContent);
                              }
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                e.target.blur();
                              }
                              if (e.key === 'Escape') {
                                e.target.blur();
                              }
                            }}
                            title="Cliquer pour éditer le lieu"
                          >
                            {templateData.location}
                          </span>
                        </div>
                        
                        <div className="text-light/80 font-semibold">
                          Difficulté: <span 
                            className="cursor-text hover:bg-white/5 p-1 rounded transition-colors"
                            contentEditable={true}
                            suppressContentEditableWarning={true}
                            onBlur={(e) => {
                              if (onContentChange) {
                                const newDifficulty = e.target.textContent;
                                const updatedTemplateData = { ...templateData, difficulty: newDifficulty };
                                const newContent = `COMBAT_CARD:${JSON.stringify(updatedTemplateData)}`;
                                onContentChange(id, newContent);
                              }
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                e.target.blur();
                              }
                              if (e.key === 'Escape') {
                                e.target.blur();
                              }
                            }}
                            title="Cliquer pour éditer la difficulté"
                          >
                            {templateData.difficulty}
                          </span>
                        </div>
                      </div>

                      <div className="text-sm text-light/80 font-semibold">
                        Récompenses: <span 
                          className="cursor-text hover:bg-white/5 p-1 rounded transition-colors"
                          contentEditable={true}
                          suppressContentEditableWarning={true}
                          onBlur={(e) => {
                            if (onContentChange) {
                              const newRewards = e.target.textContent;
                              const updatedTemplateData = { ...templateData, rewards: newRewards };
                              const newContent = `COMBAT_CARD:${JSON.stringify(updatedTemplateData)}`;
                              onContentChange(id, newContent);
                            }
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              e.target.blur();
                            }
                            if (e.key === 'Escape') {
                              e.target.blur();
                            }
                          }}
                          title="Cliquer pour éditer les récompenses"
                        >
                          {templateData.rewards}
                        </span>
                      </div>

                      {/* Tableau des ennemis - Style Notion */}
                      <div className="bg-white/10 rounded-lg p-4 border border-light/20">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-lg font-semibold text-light flex items-center">
                            <Target size={16} className="mr-2" />
                            Ennemis
                          </h4>
                        </div>

                        <div className="space-y-2">
                          {templateData.enemies.map((enemy, index) => (
                            <div key={index} className="flex items-center gap-3 p-2 bg-white/5 rounded">
                              <div className="w-6 h-6 bg-red-500 rounded flex items-center justify-center text-xs text-white font-bold">
                                {index + 1}
                              </div>
                              <div className="text-light font-medium flex-1">
                                <span 
                                  className="cursor-text hover:bg-white/10 p-1 rounded transition-colors"
                                  contentEditable={true}
                                  suppressContentEditableWarning={true}
                                  onBlur={(e) => {
                                    if (onContentChange) {
                                      const newName = e.target.textContent;
                                      const updatedEnemies = templateData.enemies.map((en, i) => 
                                        i === index ? { ...en, name: newName } : en
                                      );
                                      const updatedTemplateData = { ...templateData, enemies: updatedEnemies };
                                      const newContent = `COMBAT_CARD:${JSON.stringify(updatedTemplateData)}`;
                                      onContentChange(id, newContent);
                                    }
                                  }}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                      e.preventDefault();
                                      e.target.blur();
                                    }
                                    if (e.key === 'Escape') {
                                      e.target.blur();
                                    }
                                  }}
                                  title="Cliquer pour éditer le nom de l'ennemi"
                                >
                                  {enemy.name}
                                </span>
                              </div>
                              <div className="text-light/80 text-sm space-x-2">
                                <span>PV: <span 
                                  className="cursor-text hover:bg-white/10 p-1 rounded transition-colors"
                                  contentEditable={true}
                                  suppressContentEditableWarning={true}
                                  onBlur={(e) => {
                                    if (onContentChange) {
                                      const newHp = parseInt(e.target.textContent) || 0;
                                      const updatedEnemies = templateData.enemies.map((en, i) => 
                                        i === index ? { ...en, hp: newHp } : en
                                      );
                                      const updatedTemplateData = { ...templateData, enemies: updatedEnemies };
                                      const newContent = `COMBAT_CARD:${JSON.stringify(updatedTemplateData)}`;
                                      onContentChange(id, newContent);
                                    }
                                  }}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                      e.preventDefault();
                                      e.target.blur();
                                    }
                                    if (e.key === 'Escape') {
                                      e.target.blur();
                                    }
                                  }}
                                  title="Cliquer pour éditer les PV"
                                >
                                  {enemy.hp}
                                </span></span>
                                <span>CA: <span 
                                  className="cursor-text hover:bg-white/10 p-1 rounded transition-colors"
                                  contentEditable={true}
                                  suppressContentEditableWarning={true}
                                  onBlur={(e) => {
                                    if (onContentChange) {
                                      const newAc = parseInt(e.target.textContent) || 0;
                                      const updatedEnemies = templateData.enemies.map((en, i) => 
                                        i === index ? { ...en, ac: newAc } : en
                                      );
                                      const updatedTemplateData = { ...templateData, enemies: updatedEnemies };
                                      const newContent = `COMBAT_CARD:${JSON.stringify(updatedTemplateData)}`;
                                      onContentChange(id, newContent);
                                    }
                                  }}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                      e.preventDefault();
                                      e.target.blur();
                                    }
                                    if (e.key === 'Escape') {
                                      e.target.blur();
                                    }
                                  }}
                                  title="Cliquer pour éditer la CA"
                                >
                                  {enemy.ac}
                                </span></span>
                                <span>Att: <span 
                                  className="cursor-text hover:bg-white/10 p-1 rounded transition-colors"
                                  contentEditable={true}
                                  suppressContentEditableWarning={true}
                                  onBlur={(e) => {
                                    if (onContentChange) {
                                      const newAttack = e.target.textContent;
                                      const updatedEnemies = templateData.enemies.map((en, i) => 
                                        i === index ? { ...en, attack: newAttack } : en
                                      );
                                      const updatedTemplateData = { ...templateData, enemies: updatedEnemies };
                                      const newContent = `COMBAT_CARD:${JSON.stringify(updatedTemplateData)}`;
                                      onContentChange(id, newContent);
                                    }
                                  }}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                      e.preventDefault();
                                      e.target.blur();
                                    }
                                    if (e.key === 'Escape') {
                                      e.target.blur();
                                    }
                                  }}
                                  title="Cliquer pour éditer l'attaque"
                                >
                                  {enemy.attack}
                                </span></span>
                                <span>Dég: <span 
                                  className="cursor-text hover:bg-white/10 p-1 rounded transition-colors"
                                  contentEditable={true}
                                  suppressContentEditableWarning={true}
                                  onBlur={(e) => {
                                    if (onContentChange) {
                                      const newDamage = e.target.textContent;
                                      const updatedEnemies = templateData.enemies.map((en, i) => 
                                        i === index ? { ...en, damage: newDamage } : en
                                      );
                                      const updatedTemplateData = { ...templateData, enemies: updatedEnemies };
                                      const newContent = `COMBAT_CARD:${JSON.stringify(updatedTemplateData)}`;
                                      onContentChange(id, newContent);
                                    }
                                  }}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                      e.preventDefault();
                                      e.target.blur();
                                    }
                                    if (e.key === 'Escape') {
                                      e.target.blur();
                                    }
                                  }}
                                  title="Cliquer pour éditer les dégâts"
                                >
                                  {enemy.damage}
                                </span></span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              } catch (error) {
                console.error('Erreur lors du parsing des données du template:', error);
                return <div className="text-red-400">Erreur lors du chargement du template</div>;
              }
            })()}
          </div>
        </div>
      ) : type === 'page' ? (
        <div 
          className="leading-relaxed pl-8 text-light cursor-text my-4 p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
          contentEditable={true}
          suppressContentEditableWarning={true}
          onBlur={(e) => {
            if (onContentChange) {
              onContentChange(id, e.target.textContent);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              if (onAddNewLine) {
                const newLineId = Date.now();
                const newLine = {
                  id: newLineId,
                  content: '',
                  section: section,
                  type: 'text',
                  isLink: false,
                  isHeading: false
                };
                onAddNewLine(newLine, id);
              }
            }
            if (e.key === 'Escape') {
              e.target.blur();
            }
            if (e.key === 'Backspace' && e.target.textContent.trim() === '') {
              e.preventDefault();
              onDelete && onDelete(id);
            }
            // Gestion de la commande /
            if (e.key === '/' && e.target.textContent === '') {
              e.preventDefault();
              if (onSlashCommand) {
                onSlashCommand(e, id);
              }
            }
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-golden">📄</span>
            <span className="text-golden font-medium">Page</span>
            <button
              onClick={() => navigateToPage(id)}
              className="ml-auto px-3 py-1 bg-golden/20 hover:bg-golden/30 text-golden rounded-md text-sm transition-colors"
            >
              Ouvrir
            </button>
          </div>
          {content}
        </div>
      ) : type === 'table' ? (
        <div className="pl-8 my-4">
          <div className="bg-white/5 rounded-lg border border-white/10 p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-golden">📊</span>
              <span className="text-golden font-medium">Tableau</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <tbody>
                  {Array.from({ length: rows || 3 }).map((_, rowIndex) => (
                    <tr key={rowIndex}>
                      {Array.from({ length: cols || 3 }).map((_, colIndex) => (
                        <td 
                          key={colIndex}
                          className="border border-white/20 p-2 min-w-[100px]"
                          contentEditable={true}
                          suppressContentEditableWarning={true}
                          onBlur={(e) => {
                            if (onContentChange) {
                              // Mettre à jour les données du tableau
                              const newData = [...(data || [])];
                              if (!newData[rowIndex]) newData[rowIndex] = [];
                              newData[rowIndex][colIndex] = e.target.textContent;
                              onContentChange(id, JSON.stringify({ rows, cols, data: newData }));
                            }
                          }}
                        >
                          {data && data[rowIndex] && data[rowIndex][colIndex] ? data[rowIndex][colIndex] : ''}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : type === 'separator' ? (
        <div 
          className="leading-relaxed pl-8 text-light cursor-text my-8"
          contentEditable={true}
          suppressContentEditableWarning={true}
          onBlur={(e) => {
            if (onContentChange) {
              onContentChange(id, e.target.textContent);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              if (onAddNewLine) {
                const newLineId = Date.now();
                const newLine = {
                  id: newLineId,
                  content: '',
                  section: section,
                  type: 'text',
                  isLink: false,
                  isHeading: false
                };
                onAddNewLine(newLine, id);
              }
            }
            if (e.key === 'Escape') {
              e.target.blur();
            }
            if (e.key === 'Backspace' && e.target.textContent.trim() === '') {
              e.preventDefault();
              onDelete && onDelete(id);
            }
          }}
          style={{
            minHeight: '2px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
            paddingBottom: '8px',
            marginBottom: '16px',
            color: 'transparent',
            caretColor: 'white'
          }}
        >
          &nbsp;
        </div>
      ) : (
        <div 
          className={`leading-relaxed pl-8 ${isLink ? 'text-golden hover:text-golden/80 cursor-pointer underline' : 'text-light cursor-text'} transition-colors`}
          contentEditable={!isLink}
          suppressContentEditableWarning={true}
          onBlur={(e) => {
            if (!isLink && onContentChange) {
              onContentChange(id, e.target.textContent);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              if (onAddNewLine) {
                const newLineId = Date.now();
                const newLine = {
                  id: newLineId,
                  content: '',
                  section: section,
                  type: 'text',
                  isLink: false,
                  isHeading: false
                };
                onAddNewLine(newLine, id);
              }
            }
            if (e.key === 'Escape') {
              e.target.blur();
            }
            if (e.key === 'Backspace' && e.target.textContent.trim() === '') {
              e.preventDefault();
              onDelete && onDelete(id);
            }
          }}
          onClick={isLink ? handleClick : undefined}
          dangerouslySetInnerHTML={{ 
            __html: (() => {
              // Récupérer les liens stockés
              const storedLinks = JSON.parse(localStorage.getItem('lore-dashboard-links') || '[]');
              
              // Traiter le contenu avec les liens stockés et le markdown
              let processedContent = content
                .split(/(\[.*?\]\(.*?\)|\*\*.*?\*\*)/)
                .map((part, index) => {
                  // Gérer les liens markdown [texte](url)
                  if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
                    const match = part.match(/\[(.*?)\]\((.*?)\)/);
                    if (match) {
                      const [, text, url] = match;
                      return `<a href="${url}" target="_blank" class="text-golden hover:text-golden/80 cursor-pointer underline font-semibold" key="${index}">${text}</a>`;
                    }
                  }
                  // Gérer le texte en gras **texte**
            if (part.startsWith('**') && part.endsWith('**')) {
              const text = part.slice(2, -2);
                    return `<strong key="${index}" class="text-golden">${text}</strong>`;
            }
            return part;
                }).join('');
              
              // Appliquer les liens stockés
              storedLinks.forEach(linkInfo => {
                if (processedContent.includes(linkInfo.text)) {
                  const linkHtml = `<a href="${linkInfo.url}" target="_blank" class="text-golden hover:text-golden/80 cursor-pointer underline font-semibold">${linkInfo.text}</a>`;
                  processedContent = processedContent.replace(linkInfo.text, linkHtml);
                }
              });
              
              return processedContent;
            })()
          }}
        />
      )}

      {/* Menu contextuel Notion-like */}
      {showContextMenu && (
        <div
          className="fixed bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-[10000] min-w-[200px]"
          style={{
            left: contextMenuPosition.x,
            top: contextMenuPosition.y,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={handleEdit}
            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
          >
            <Edit size={14} />
            <span>Modifier</span>
          </button>
          <button
            onClick={handleDuplicate}
            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
          >
            <Copy size={14} />
            <span>Dupliquer</span>
          </button>
          <button
            onClick={() => {
              setShowContextMenu(false);
              // Créer un séparateur après cette ligne
              const newSeparator = {
                id: `separator-${Date.now()}`,
                content: '---',
                section: section,
                type: 'separator',
                isSeparator: true
              };
              if (onAddNewLine) {
                onAddNewLine(newSeparator, id);
              }
            }}
            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
          >
            <span className="text-lg">---</span>
            <span>Ajouter un séparateur</span>
          </button>
          <div className="border-t border-gray-100 my-1"></div>
          <div className="px-4 py-1 text-xs text-gray-500 font-medium">Déplacer vers</div>
          <button
            onClick={() => handleMoveToSection('situation')}
            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
            disabled={section === 'situation'}
          >
            Situation initiale
          </button>
          <button
            onClick={() => handleMoveToSection('debut')}
            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
            disabled={section === 'debut'}
          >
            Début de la partie
          </button>
          <div className="border-t border-gray-100 my-1"></div>
          <button
            onClick={handleDelete}
            className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
          >
            <Trash2 size={14} />
            <span>{type === 'separator' ? 'Supprimer le séparateur' : 'Supprimer'}</span>
          </button>
        </div>
      )}
    </div>
  );
};

// Composant pour la card marchand intégrée dans le flux TextLines
const MerchantCardTextLine = ({ id, campaign, merchantInventory, onShowContextMenu, onPaste, onEdit, onDelete, isEditing, ...inventoryProps }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
  };

  return (
    <div 
      ref={setNodeRef}
      style={style}
      className="group relative bg-slate-800/40 backdrop-blur-md rounded-xl p-6 border border-slate-700/50 shadow-2xl my-4"
    >
      {/* Drag Handle */}
      <div 
        className={`absolute left-2 top-2 w-6 h-6 cursor-grab transition-all duration-200 text-gray-400 hover:text-gray-600 z-10 flex items-center justify-center bg-gray-100/80 hover:bg-gray-200/90 rounded ${
          isDragging ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}
        {...attributes}
        {...listeners}
      >
        <GripVertical size={14} />
      </div>

      {/* Bouton + */}
      <div 
        className="absolute left-10 top-2 w-6 h-6 flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100 hover:opacity-100 z-10 bg-blue-100/80 hover:bg-blue-200/90 rounded"
        onClick={(e) => onShowContextMenu && onShowContextMenu(e, 'merchant-card')}
      >
        <Plus size={14} className="text-blue-600 hover:text-blue-800 transition-colors duration-150" />
      </div>

      {/* Boutons d'édition et suppression - Visible au survol */}
      <div className="absolute right-2 top-2 flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-all duration-200 z-10">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit && onEdit(id, true);
          }}
          className="w-6 h-6 flex items-center justify-center bg-green-100/80 hover:bg-green-200/90 rounded transition-colors"
          title="Éditer"
        >
          <Edit2 size={14} className="text-green-600 hover:text-green-800" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete && onDelete(id);
          }}
          className="w-6 h-6 flex items-center justify-center bg-red-100/80 hover:bg-red-200/90 rounded transition-colors"
          title="Supprimer"
        >
          <X size={14} className="text-red-600 hover:text-red-800" />
        </button>
      </div>

      <h3 
        className="text-xl font-bold text-light eagle-lake-font mb-4 cursor-pointer hover:text-golden transition-colors"
        onClick={() => {
          // Créer un template "Rencontre avec un marchand" basé sur les données actuelles
          const merchantTemplate = {
            id: `merchant-${Date.now()}`,
            name: campaign?.rencontre.title || 'Rencontre avec un marchand',
            category: 'modeles-simples',
            description: campaign?.rencontre.content || 'Un marchand itinérant propose ses marchandises aux aventuriers. Ses étals regorgent d\'objets mystérieux et d\'artefacts anciens, mais attention à ses prix...',
            location: 'Marché local',
            npc: campaign?.rencontre.npc || 'Marcus le Marchand',
            inventory: merchantInventory || [],
            tags: [
              { name: 'Marchand', color: 'bg-blue-600' },
              { name: 'Commerce', color: 'bg-green-600' },
              { name: 'Social', color: 'bg-purple-600' }
            ]
          };
          
          // Sauvegarder le template dans localStorage
          const existingTemplates = JSON.parse(localStorage.getItem('lore-templates-data') || '[]');
          const updatedTemplates = [...existingTemplates, merchantTemplate];
          localStorage.setItem('lore-templates-data', JSON.stringify(updatedTemplates));
          
          // Afficher une notification
          toast.success(`Template "${merchantTemplate.name}" créé avec succès !`);
        }}
        title="Cliquer pour créer un template"
      >
        {campaign?.rencontre.title}
      </h3>
      
      <div className="space-y-4" onPaste={onPaste}>
        <p className="text-light leading-relaxed">{campaign?.rencontre.content}</p>
        <div className="text-sm text-light/80 font-semibold">
          PNJ: {campaign?.rencontre.npc}
        </div>

        {/* Tableau d'inventaire - Style Notion */}
        <div className="bg-white/10 rounded-lg p-4 border border-light/20">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-light flex items-center">
              <Package size={16} className="mr-2" />
              Inventaire du marchand
            </h4>
            <div className="text-sm text-light/80 font-semibold">
              Total: {inventoryProps.editingTotal ? (
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    value={inventoryProps.totalValue}
                    onChange={(e) => inventoryProps.setTotalValue(parseInt(e.target.value) || 0)}
                    className="w-20 px-2 py-1 text-sm bg-white/20 border border-light/30 rounded text-light placeholder-light/50 focus:outline-none focus:border-golden"
                    autoFocus
                  />
                  <span>pièces d'or</span>
                  <button
                    onClick={inventoryProps.handleSaveTotal}
                    className="p-1 text-green-400 hover:text-green-300 transition-colors"
                    title="Sauvegarder"
                  >
                    <CheckCircle size={14} />
                  </button>
                  <button
                    onClick={inventoryProps.handleCancelTotalEdit}
                    className="p-1 text-red-400 hover:text-red-300 transition-colors"
                    title="Annuler"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={inventoryProps.handleEditTotal}
                  className="hover:text-light transition-colors"
                >
                  {inventoryProps.getTotalValue()} pièces d'or
                </button>
              )}
            </div>
          </div>

          <div className="space-y-2">
            {merchantInventory.map((item, index) => (
              <div key={item.id} className="flex items-center gap-3 p-2 bg-white/5 rounded">
                <div className="w-6 h-6 bg-amber-500 rounded flex items-center justify-center text-xs text-white font-bold">
                  {index + 1}
                </div>
                <div className="text-light font-medium">
                  {inventoryProps.editingTableField === `${item.id}-name` ? (
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={inventoryProps.editingTableValue}
                        onChange={(e) => inventoryProps.setEditingTableValue(e.target.value)}
                        className="w-full px-2 py-1 text-sm bg-white/20 border border-light/30 rounded text-light placeholder-light/50 focus:outline-none focus:border-golden"
                        autoFocus
                      />
                      <button
                        onClick={() => inventoryProps.handleSaveTableField(item.id, 'name')}
                        className="p-1 text-green-400 hover:text-green-300 transition-colors"
                        title="Sauvegarder"
                      >
                        <CheckCircle size={14} />
                      </button>
                      <button
                        onClick={inventoryProps.handleCancelTableEdit}
                        className="p-1 text-red-400 hover:text-red-300 transition-colors"
                        title="Annuler"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => inventoryProps.handleEditTableField(item.id, 'name', item.name)}
                      className="w-full text-left hover:bg-light/10 p-1 rounded transition-colors"
                    >
                      {item.name}
                    </button>
                  )}
                </div>
                <div className="text-light/80">
                  {inventoryProps.editingTableField === `${item.id}-price` ? (
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        value={inventoryProps.editingTableValue}
                        onChange={(e) => inventoryProps.setEditingTableValue(e.target.value)}
                        className="w-full px-2 py-1 text-sm bg-white/20 border border-light/30 rounded text-light placeholder-light/50 focus:outline-none focus:border-golden"
                        autoFocus
                      />
                      <button
                        onClick={() => inventoryProps.handleSaveTableField(item.id, 'price')}
                        className="p-1 text-green-400 hover:text-green-300 transition-colors"
                        title="Sauvegarder"
                      >
                        <CheckCircle size={14} />
                      </button>
                      <button
                        onClick={inventoryProps.handleCancelTableEdit}
                        className="p-1 text-red-400 hover:text-red-300 transition-colors"
                        title="Annuler"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => inventoryProps.handleEditTableField(item.id, 'price', item.price)}
                      className="w-full text-left hover:bg-light/10 p-1 rounded transition-colors"
                    >
                      {item.price} PO
                    </button>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => inventoryProps.handleDeleteItem(item.id)}
                    className="p-1 text-red-400 hover:text-red-300 transition-colors"
                    title="Supprimer"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={inventoryProps.handleAddItem}
            className="w-full mt-4 bg-golden hover:bg-golden/80 text-dark-blue py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 font-semibold"
          >
            <Plus size={16} />
            <span>Ajouter un objet</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Composant pour les zones de drop entre les éléments
const DropZone = ({ id, isActive, onTemplateDrop, targetIndex }) => {
  return (
    <motion.div
      className={`h-2 transition-all duration-200 ${
        isActive 
          ? 'bg-blue-500/50 border-2 border-dashed border-blue-500' 
          : 'bg-transparent hover:bg-gray-300/20'
      }`}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => onTemplateDrop && onTemplateDrop(e, targetIndex)}
      initial={{ height: 0, opacity: 0 }}
      animate={{ 
        height: isActive ? 8 : 2, 
        opacity: isActive ? 1 : 0.3 
      }}
      whileHover={{ 
        height: 6, 
        opacity: 0.8,
        backgroundColor: 'rgba(59, 130, 246, 0.3)'
      }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    />
  );
};



// Composant pour la card marchand draggable
const DraggableMerchantCard = ({ campaign, merchantInventory, onShowContextMenu, onPaste, id, onEdit, onDelete, isEditing, ...inventoryProps }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
  };

  return (
    <div 
      ref={setNodeRef}
      style={style}
      className="group relative bg-slate-800/40 backdrop-blur-md rounded-xl p-6 border border-slate-700/50 shadow-2xl"
    >
      {/* Drag Handle */}
      <div 
        className={`absolute left-2 top-2 w-6 h-6 cursor-grab transition-all duration-200 text-gray-400 hover:text-gray-600 z-10 flex items-center justify-center bg-gray-100/80 hover:bg-gray-200/90 rounded ${
          isDragging ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}
        {...attributes}
        {...listeners}
      >
        <GripVertical size={14} />
      </div>

      {/* Bouton + */}
      <div 
        className="absolute left-10 top-2 w-6 h-6 flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100 hover:opacity-100 z-10 bg-blue-100/80 hover:bg-blue-200/90 rounded"
        onClick={(e) => onShowContextMenu && onShowContextMenu(e, 'merchant-card')}
      >
        <Plus size={14} className="text-blue-600 hover:text-blue-800 transition-colors duration-150" />
      </div>

      {/* Boutons d'édition et suppression - Visible au survol */}
      <div className="absolute right-2 top-2 flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-all duration-200 z-10">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit && onEdit(id, true);
          }}
          className="w-6 h-6 flex items-center justify-center bg-green-100/80 hover:bg-green-200/90 rounded transition-colors"
          title="Éditer"
        >
          <Edit2 size={14} className="text-green-600 hover:text-green-800" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete && onDelete(id);
          }}
          className="w-6 h-6 flex items-center justify-center bg-red-100/80 hover:bg-red-200/90 rounded transition-colors"
          title="Supprimer"
        >
          <X size={14} className="text-red-600 hover:text-red-800" />
        </button>
      </div>

      <h3 
        className="text-xl font-bold text-light eagle-lake-font mb-4 cursor-pointer hover:text-golden transition-colors"
        onClick={() => {
          // Créer un template "Rencontre avec un marchand" basé sur les données actuelles
          const merchantTemplate = {
            id: `merchant-${Date.now()}`,
            name: campaign?.rencontre.title || 'Rencontre avec un marchand',
            category: 'modeles-simples',
            description: campaign?.rencontre.content || 'Un marchand itinérant propose ses marchandises aux aventuriers. Ses étals regorgent d\'objets mystérieux et d\'artefacts anciens, mais attention à ses prix...',
            location: 'Marché local',
            npc: campaign?.rencontre.npc || 'Marcus le Marchand',
            inventory: merchantInventory || [],
            tags: [
              { name: 'Marchand', color: 'bg-blue-600' },
              { name: 'Commerce', color: 'bg-green-600' },
              { name: 'Social', color: 'bg-purple-600' }
            ]
          };
          
          // Sauvegarder le template dans localStorage
          const existingTemplates = JSON.parse(localStorage.getItem('lore-templates-data') || '[]');
          const updatedTemplates = [...existingTemplates, merchantTemplate];
          localStorage.setItem('lore-templates-data', JSON.stringify(updatedTemplates));
          
          // Afficher une notification
          toast.success(`Template "${merchantTemplate.name}" créé avec succès !`);
        }}
        title="Cliquer pour créer un template"
      >
        {campaign?.rencontre.title}
      </h3>
      
      <div className="space-y-4" onPaste={onPaste}>
        <p className="text-light leading-relaxed">{campaign?.rencontre.content}</p>
        <div className="text-sm text-light/80 font-semibold">
          PNJ: {campaign?.rencontre.npc}
        </div>

        {/* Tableau d'inventaire - Style Notion */}
        <div className="bg-white/10 rounded-lg p-4 border border-light/20">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-light flex items-center">
              <Package size={16} className="mr-2" />
              Inventaire du marchand
            </h4>
            <div className="text-sm text-light/80 font-semibold">
              Total: {inventoryProps.editingTotal ? (
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    value={inventoryProps.totalValue}
                    onChange={(e) => inventoryProps.setTotalValue(parseInt(e.target.value) || 0)}
                    className="w-20 px-2 py-1 text-sm bg-white/20 border border-light/30 rounded text-light placeholder-light/50 focus:outline-none focus:border-golden"
                    autoFocus
                  />
                  <span>pièces d'or</span>
                  <button
                    onClick={inventoryProps.handleSaveTotal}
                    className="p-1 text-green-400 hover:text-green-300 transition-colors"
                    title="Sauvegarder"
                  >
                    <CheckCircle size={14} />
                  </button>
                  <button
                    onClick={inventoryProps.handleCancelTotalEdit}
                    className="p-1 text-red-400 hover:text-red-300 transition-colors"
                    title="Annuler"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={inventoryProps.handleEditTotal}
                  className="hover:bg-light/10 p-1 rounded transition-colors"
                >
                  {inventoryProps.getTotalValue()} pièces d'or
                </button>
              )}
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-light/20">
            <div className="grid grid-cols-4 gap-4 p-3 bg-light/10 text-sm font-semibold text-light border-b border-light/20">
              <div>Objet</div>
              <div>Nom</div>
              <div>Prix</div>
              <div>Actions</div>
            </div>
            {merchantInventory.map((item, index) => (
              <div key={item.id} className="grid grid-cols-4 gap-4 p-3 border-b border-light/10 last:border-b-0">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-amber-500 rounded flex items-center justify-center text-xs text-white font-bold">
                    {index + 1}
                  </div>
                </div>
                <div className="text-light font-medium">
                  {inventoryProps.editingTableField === `${item.id}-name` ? (
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={inventoryProps.editingTableValue}
                        onChange={(e) => inventoryProps.setEditingTableValue(e.target.value)}
                        className="w-full px-2 py-1 text-sm bg-white/20 border border-light/30 rounded text-light placeholder-light/50 focus:outline-none focus:border-golden"
                        autoFocus
                      />
                      <button
                        onClick={() => inventoryProps.handleSaveTableField(item.id, 'name')}
                        className="p-1 text-green-400 hover:text-green-300 transition-colors"
                        title="Sauvegarder"
                      >
                        <CheckCircle size={14} />
                      </button>
                      <button
                        onClick={inventoryProps.handleCancelTableEdit}
                        className="p-1 text-red-400 hover:text-red-300 transition-colors"
                        title="Annuler"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => inventoryProps.handleEditTableField(item.id, 'name', item.name)}
                      className="w-full text-left hover:bg-light/10 p-1 rounded transition-colors"
                    >
                      {item.name}
                    </button>
                  )}
                </div>
                <div className="text-light/80">
                  {inventoryProps.editingTableField === `${item.id}-price` ? (
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        value={inventoryProps.editingTableValue}
                        onChange={(e) => inventoryProps.setEditingTableValue(e.target.value)}
                        className="w-full px-2 py-1 text-sm bg-white/20 border border-light/30 rounded text-light placeholder-light/50 focus:outline-none focus:border-golden"
                        autoFocus
                      />
                      <button
                        onClick={() => inventoryProps.handleSaveTableField(item.id, 'price')}
                        className="p-1 text-green-400 hover:text-green-300 transition-colors"
                        title="Sauvegarder"
                      >
                        <CheckCircle size={14} />
                      </button>
                      <button
                        onClick={inventoryProps.handleCancelTableEdit}
                        className="p-1 text-red-400 hover:text-red-300 transition-colors"
                        title="Annuler"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => inventoryProps.handleEditTableField(item.id, 'price', item.price)}
                      className="w-full text-left hover:bg-light/10 p-1 rounded transition-colors"
                    >
                      {item.price} PO
                    </button>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => inventoryProps.handleDeleteItem(item.id)}
                    className="p-1 text-red-400 hover:text-red-300 transition-colors"
                    title="Supprimer"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={inventoryProps.handleAddItem}
            className="w-full mt-4 bg-golden hover:bg-golden/80 text-dark-blue py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 font-semibold"
          >
            <Plus size={16} />
            <span>Ajouter un objet</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Composant pour les suggestions IA
const SuggestionsPanel = ({ suggestions, onClose, onApplySuggestion }) => {
  if (!suggestions.length) return null;

  return (
    <motion.div 
      className="fixed top-4 right-4 w-80 bg-slate-800/90 backdrop-blur-md rounded-lg border border-slate-700/50 shadow-2xl z-50 p-4"
      initial={{ opacity: 0, x: 300, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.9 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="flex items-center justify-between mb-3">
        <motion.h3 
          className="text-light font-semibold text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          💡 Suggestions IA
        </motion.h3>
        <motion.button
          onClick={onClose}
          className="text-light/60 hover:text-light transition-colors"
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
        >
          <X size={16} />
        </motion.button>
      </div>
      
      <div className="space-y-2">
        <AnimatePresence>
          {suggestions.map((suggestion, index) => (
            <motion.div
              key={suggestion.id}
              className={`p-3 rounded-lg border transition-all duration-200 cursor-pointer hover:shadow-lg ${
                suggestion.priority === 'high' 
                  ? 'bg-red-500/20 border-red-500/50' 
                  : suggestion.priority === 'medium'
                  ? 'bg-yellow-500/20 border-yellow-500/50'
                  : 'bg-blue-500/20 border-blue-500/50'
              }`}
              onClick={() => onApplySuggestion(suggestion)}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ 
                duration: 0.2, 
                delay: index * 0.1,
                ease: "easeOut" 
              }}
              whileHover={{ 
                scale: 1.02, 
                y: -2,
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-light font-medium text-sm">{suggestion.title}</div>
              <div className="text-light/70 text-xs mt-1">{suggestion.description}</div>
              <motion.div 
                className={`text-xs mt-2 px-2 py-1 rounded-full inline-block ${
                  suggestion.priority === 'high' 
                    ? 'bg-red-500/30 text-red-300' 
                    : suggestion.priority === 'medium'
                    ? 'bg-yellow-500/30 text-yellow-300'
                    : 'bg-blue-500/30 text-blue-300'
                }`}
                whileHover={{ scale: 1.05 }}
              >
                {suggestion.priority === 'high' ? 'Priorité haute' : 
                 suggestion.priority === 'medium' ? 'Priorité moyenne' : 'Priorité basse'}
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const CampaignDashboard = () => {
  const { campaignId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Debug logs
  console.log('CampaignDashboard - campaignId:', campaignId);
  console.log('CampaignDashboard - user:', user);

  // États pour la gestion des données
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // États pour l'interface utilisateur
  const [showHistoryMenu, setShowHistoryMenu] = useState(false);
  const [showSources, setShowSources] = useState(false);
  const [showPlayers, setShowPlayers] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  
  // État pour gérer les assignations de personnages aux joueurs
  const [characterAssignments, setCharacterAssignments] = useState({
    '1': 'Elandra',
    '2': 'Thorin', 
    '3': 'Kael',
    '4': 'Seraphine'
  });
  
  // État pour gérer les joueurs de la campagne
  const [campaignPlayers, setCampaignPlayers] = useState([
    { id: '1', name: 'Alexis', character: 'Elandra', initials: 'A', playerImage: '/images/players/alexis.jpg', characterImage: '/images/characters/elandra.jpg', status: 'active' },
    { id: '2', name: 'Marine', character: 'Thorin', initials: 'M', playerImage: '/images/players/marine.jpg', characterImage: '/images/characters/thorin.jpg', status: 'active' },
    { id: '3', name: 'Thomas', character: 'Kael', initials: 'T', playerImage: '/images/players/thomas.jpg', characterImage: '/images/characters/kael.jpg', status: 'active' },
    { id: '4', name: 'Sophie', character: 'Seraphine', initials: 'S', playerImage: '/images/players/sophie.jpg', characterImage: '/images/characters/seraphine.jpg', status: 'active' },
  ]);

  // États pour les données de la campagne
  const [campaignData, setCampaignData] = useState(null);
  const [isDefaultCampaign, setIsDefaultCampaign] = useState(false);

  // Charger les données de la campagne depuis sessionStorage
  useEffect(() => {
    const campaignDataFromStorage = sessionStorage.getItem('campaignData');
    if (campaignDataFromStorage) {
      try {
        const data = JSON.parse(campaignDataFromStorage);
        console.log('Données de campagne chargées:', data);
        
        setCampaignData(data);
        setIsDefaultCampaign(data.id === 'default-campaign');
        
        // Convertir les joueurs de la campagne au format de la modale
        if (data.players && data.players.length > 0) {
          const formattedPlayers = data.players.map(player => ({
            id: player.id,
            name: player.name,
            character: player.character_name,
            initials: player.name[0]?.toUpperCase() || '?',
            playerImage: `/images/players/${player.name.toLowerCase()}.jpg`,
            characterImage: player.character_name ? `/images/characters/${player.character_name.toLowerCase().replace(/\s+/g, '')}.jpg` : null,
            status: player.status
          }));
          
          setCampaignPlayers(formattedPlayers);
          
          // Mettre à jour les assignations de personnages
          const assignments = {};
          data.players.forEach(player => {
            if (player.character_name) {
              assignments[player.id] = player.character_name;
            }
          });
          setCharacterAssignments(assignments);
        } else {
          // Nouvelle campagne sans joueurs
          setCampaignPlayers([]);
          setCharacterAssignments({});
        }
        
        // Nettoyer sessionStorage après utilisation
        sessionStorage.removeItem('campaignData');
      } catch (error) {
        console.error('Erreur lors du chargement des données de campagne:', error);
      }
    }
  }, []);

  // Fonction pour sauvegarder les joueurs de la campagne
  const saveCampaignPlayers = (players) => {
    // Convertir les joueurs au format de la campagne
    const campaignFormatPlayers = players.map(player => ({
      id: player.id,
      name: player.name,
      character_name: player.character,
      status: player.status
    }));
    
    // Sauvegarder dans localStorage pour la persistance
    const campaignId = params.id;
    const savedCampaigns = JSON.parse(localStorage.getItem('demoCampaigns') || '[]');
    const updatedCampaigns = savedCampaigns.map(campaign => {
      if (campaign.id === campaignId) {
        return {
          ...campaign,
          players: campaignFormatPlayers
        };
      }
      return campaign;
    });
    
    localStorage.setItem('demoCampaigns', JSON.stringify(updatedCampaigns));
    console.log('Joueurs de campagne sauvegardés:', campaignFormatPlayers);
  };
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null);
  const [notifications, setNotifications] = useState([]);
  const [selectedSessions, setSelectedSessions] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [saveStatus, setSaveStatus] = useState('saved'); // 'saved', 'saving', 'unsaved'
  const [lastSaveTime, setLastSaveTime] = useState(null);

  // États pour le système de mentions dynamiques
  const [currentMentionImage, setCurrentMentionImage] = useState(null);
  const [currentMentionName, setCurrentMentionName] = useState('');
  const [currentMentionType, setCurrentMentionType] = useState('');

  // États pour le drag & drop
  const [activeId, setActiveId] = useState(null);
  const [draggedItem, setDraggedItem] = useState(null);
  const [textLines, setTextLines] = useState([]);

  // Contenu des textes selon la campagne
  const getTextContent = (campaignId) => {
    const baseTextContents = {
      1: [
    {
      id: 'line-1',
      content: 'Dans les terres brûlées du Royaume de Cendres, où les volcans crachent leur colère depuis des siècles, une prophétie ancienne se réveille.',
      section: 'situation'
    },
    {
      id: 'line-2',
      content: 'Les héros, guidés par les signes des anciens, doivent découvrir la source de cette corruption avant que les forces des ténèbres ne réduisent en cendres tout ce qui reste de la civilisation.',
      section: 'situation'
    },
    {
      id: 'line-3',
      content: 'La session commence dans la taverne "Le Dragon de Bronze", au cœur de Pyros. Un messager essoufflé fait irruption, portant une missive scellée du **Conseil des Flammes**.',
      section: 'debut'
    },
    {
      id: 'line-4',
      content: '**Thorin Barbe-de-Fer**, le nain forgeron, examine la missive avec attention. Il reconnaît le sceau du **Roi des Cendres**.',
      section: 'debut'
    },
    {
      id: 'line-5',
      content: 'Lien vers la carte de Pyros',
      section: 'debut',
      isLink: true,
      linkUrl: 'https://example.com/pyros-map'
    }
      ],
      2: [
        {
          id: 'line-1',
          content: 'Dans les profondeurs des Forêts d\'Émeraude, où la magie ancienne coule comme la sève des arbres millénaires, une relique sacrée a été perdue.',
          section: 'situation'
        },
        {
          id: 'line-2',
          content: 'Les héros doivent traverser les dangers de la forêt enchantée pour retrouver la Relique d\'Émeraude avant que les forces du mal ne s\'en emparent.',
          section: 'situation'
        },
        {
          id: 'line-3',
          content: 'La session commence dans le sanctuaire druidique de **Eldrin le Sage**. Les héros reçoivent une vision prophétique de la relique perdue.',
          section: 'debut'
        },
        {
          id: 'line-4',
          content: '**Luna Étoile-d\'Argent**, l\'elfe druide, interprète les signes de la nature. Elle sent que le temps presse.',
          section: 'debut'
        },
        {
          id: 'line-5',
          content: 'Lien vers la carte de la forêt',
          section: 'debut',
          isLink: true,
          linkUrl: 'https://example.com/forest-map'
        }
      ],
      3: [
        {
          id: 'line-1',
          content: 'Dans le Désert de Sable, où les pyramides oubliées gardent leurs secrets depuis des millénaires, une tombe ancienne a été découverte.',
          section: 'situation'
        },
        {
          id: 'line-2',
          content: 'Les héros doivent explorer la tombe du Pharaon oublié et affronter les malédictions qui la protègent pour découvrir ses trésors légendaires.',
          section: 'situation'
        },
        {
          id: 'line-3',
          content: 'La session commence dans le campement de **Dr. Amara Khaled**. L\'archéologue présente ses découvertes aux héros.',
          section: 'debut'
        },
        {
          id: 'line-4',
          content: '**Marcus le Chercheur**, l\'aventurier expérimenté, examine les artefacts découverts. Il reconnaît des symboles anciens.',
          section: 'debut'
        },
        {
          id: 'line-5',
          content: 'Lien vers la carte du désert',
          section: 'debut',
          isLink: true,
          linkUrl: 'https://example.com/desert-map'
        }
      ],
      4: [
        {
          id: 'line-1',
          content: 'Dans la Cité des Ombres, où les secrets se cachent dans chaque ruelle sombre, un culte maléfique prépare un rituel destructeur.',
          section: 'situation'
        },
        {
          id: 'line-2',
          content: 'Les héros doivent infiltrer le culte des Ombres et déjouer leurs plans avant qu\'ils ne plongent la cité dans les ténèbres éternelles.',
          section: 'situation'
        },
        {
          id: 'line-3',
          content: 'La session commence dans la taverne "L\'Ombre Silencieuse". Un espion infiltré contacte discrètement les héros.',
          section: 'debut'
        },
        {
          id: 'line-4',
          content: '**Shadow**, l\'espion mystérieux, révèle des informations cruciales sur les activités du culte dans la cité.',
          section: 'debut'
        },
        {
          id: 'line-5',
          content: 'Lien vers la carte de la cité',
          section: 'debut',
          isLink: true,
          linkUrl: 'https://example.com/city-map'
        }
      ],
      5: [
        {
          id: 'line-1',
          content: 'Dans les Terres Gelées, où le froid mordant et les tempêtes de neige règnent en maîtres, une forteresse ancienne gît sous la glace.',
          section: 'situation'
        },
        {
          id: 'line-2',
          content: 'Les héros doivent libérer la forteresse du Roi de Glace et briser la malédiction qui maintient la région dans un hiver éternel.',
          section: 'situation'
        },
        {
          id: 'line-3',
          content: 'La session commence dans l\'auberge "Le Refuge du Voyageur". Un guide expérimenté propose ses services aux héros.',
          section: 'debut'
        },
        {
          id: 'line-4',
          content: '**Bjorn le Trappeur**, le guide nordique, partage ses connaissances sur les dangers des terres gelées.',
          section: 'debut'
        },
        {
          id: 'line-5',
          content: 'Lien vers la carte des terres gelées',
          section: 'debut',
          isLink: true,
          linkUrl: 'https://example.com/frozen-lands-map'
        }
      ]
      ,
      6: [
        {
          id: 'line-1',
          content: 'Au cœur des Dunes d\'Azir, les vents soulèvent des vagues de sable qui dévoilent parfois des ruines figées hors du temps.',
          section: 'situation'
        },
        {
          id: 'line-2',
          content: 'Une fracture temporelle menace d\'engloutir le royaume dans une tempête infinie si l\'ancre n\'est pas stabilisée.',
          section: 'situation'
        },
        {
          id: 'line-3',
          content: 'La session débute sous la tente de **Maître Kael**, chronomancien, qui révèle une carte mouvante indiquant des points de rupture.',
          section: 'debut'
        },
        {
          id: 'line-4',
          content: '**Sahir des Sables**, un guide nomade, propose de mener le groupe jusqu\'à une oasis figée depuis un siècle.',
          section: 'debut'
        },
        {
          id: 'line-5',
          content: 'Lien vers la carte des Dunes d\'Azir',
          section: 'debut',
          isLink: true,
          linkUrl: 'https://example.com/azir-dunes-map'
        }
      ],
      7: [
        {
          id: 'line-1',
          content: 'Dans l\'Archipel d\'Argos, une brume maudite engloutit les rivages et fait disparaître navires et villages.',
          section: 'situation'
        },
        {
          id: 'line-2',
          content: 'Seul le phare antique peut percer les brumes s\'il est rallumé avec une lentille mythique perdue depuis des âges.',
          section: 'situation'
        },
        {
          id: 'line-3',
          content: 'La session commence sur le pont de la goélette de **Capitaine Mora**, cap sur l\'île du Phare noyée dans les brumes.',
          section: 'debut'
        },
        {
          id: 'line-4',
          content: '**Fray le Cartographe** déploie des cartes détrempées où apparaissent des récifs mouvants et des zones chantées par les sirènes.',
          section: 'debut'
        },
        {
          id: 'line-5',
          content: 'Lien vers la carte de l\'archipel',
          section: 'debut',
          isLink: true,
          linkUrl: 'https://example.com/argos-archipelago-map'
        }
      ],
      8: [
        {
          id: 'line-1',
          content: 'À Valoria, les rumeurs parlent d\'une arme légendaire dont les fragments resurgissent dans les bas-fonds et les salons du pouvoir.',
          section: 'situation'
        },
        {
          id: 'line-2',
          content: 'Des guildes rivales s\'affrontent pour assembler les Lames du Destin et changer l\'avenir de la cité.',
          section: 'situation'
        },
        {
          id: 'line-3',
          content: 'La session s\'ouvre dans l\'atelier de **Maître Roderic**; un fragment d\'obsidienne pulse d\'une lumière sombre sur l\'établi.',
          section: 'debut'
        },
        {
          id: 'line-4',
          content: '**Isha la Fine-Lame** propose une infiltration nocturne d\'un atelier clandestin pour récupérer un second fragment.',
          section: 'debut'
        },
        {
          id: 'line-5',
          content: 'Plan de la Cité de Valoria',
          section: 'debut',
          isLink: true,
          linkUrl: 'https://example.com/valoria-city-map'
        }
      ],
      9: [
        {
          id: 'line-1',
          content: 'Dans les montagnes d\'Ur-Khal, des grondements profonds et des glissements de terrain annoncent l\'éveil de colosses de pierre.',
          section: 'situation'
        },
        {
          id: 'line-2',
          content: 'Des autels runiques doivent être scellés avant que les Titans ne se lèvent et ne ravagent les vallées.',
          section: 'situation'
        },
        {
          id: 'line-3',
          content: 'La session commence dans une grotte-atelier où **Selem le Lithomancien** grave des runes de scellement sur des pierres rituelles.',
          section: 'debut'
        },
        {
          id: 'line-4',
          content: '**Garruk Brise-Pente**, un guide montagnard, décrit un col effondré menant au premier autel runique.',
          section: 'debut'
        },
        {
          id: 'line-5',
          content: 'Carte des Montagnes d\'Ur-Khal',
          section: 'debut',
          isLink: true,
          linkUrl: 'https://example.com/ur-khal-mountains-map'
        }
      ],
      10: [
        {
          id: 'line-1',
          content: 'Les Plaines Pourpres sont recouvertes d\'une brume écarlate qui corrompt plantes, bêtes et voyageurs.',
          section: 'situation'
        },
        {
          id: 'line-2',
          content: 'Un élixir pourpre pourrait dissiper le voile, mais il faut des ingrédients rares et instables.',
          section: 'situation'
        },
        {
          id: 'line-3',
          content: 'La session débute dans le laboratoire mobile de **Maëla de Rubis**, où des alambics crachotent des vapeurs carmin.',
          section: 'debut'
        },
        {
          id: 'line-4',
          content: '**Oren la Boussole**, éclaireur, apporte des échantillons de spores écarlates prélevés près d\'un monolithe gravé.',
          section: 'debut'
        },
        {
          id: 'line-5',
          content: 'Carte des Plaines Pourpres',
          section: 'debut',
          isLink: true,
          linkUrl: 'https://example.com/crimson-plains-map'
        }
      ]
    };
    
    const baseContent = baseTextContents[campaignId] || baseTextContents[1];
    
    // Ajouter automatiquement les titres de sections
    const contentWithSections = [];
    let hasSituationTitle = false;
    let hasDebutTitle = false;
    
    baseContent.forEach((line, index) => {
      // Ajouter le titre "Situation initiale" avant la première ligne de situation
      if (line.section === 'situation' && !hasSituationTitle) {
        contentWithSections.push({
          id: 'section-situation',
          content: 'Situation initiale',
          section: 'situation',
          type: 'heading2',
          isHeading: true
        });
        hasSituationTitle = true;
      }
      
      // Ajouter le titre "Début de la partie" avant la première ligne de début
      if (line.section === 'debut' && !hasDebutTitle) {
        contentWithSections.push({
          id: 'section-debut',
          content: 'Début de la partie',
          section: 'debut',
          type: 'heading2',
          isHeading: true
        });
        hasDebutTitle = true;
      }
      
      contentWithSections.push(line);
    });
    
    return contentWithSections;
  };

  // Templates disponibles avec catégories (5 catégories principales)

  // Templates pour le menu contextuel (éléments d'édition)
  const [contextTemplates] = useState([
    // Blocs de base
    { id: 'context-text', type: 'text', name: 'Texte', icon: '📝', description: 'Bloc de texte simple', content: 'Nouveau texte...', category: 'Blocs de base' },
    { id: 'context-heading1', type: 'heading1', name: 'Titre 1', icon: 'H1', description: 'Titre principal', content: 'Titre principal', category: 'Blocs de base' },
    { id: 'context-heading2', type: 'heading2', name: 'Titre 2', icon: 'H2', description: 'Sous-titre', content: 'Sous-titre', category: 'Blocs de base' },
    { id: 'context-heading3', type: 'heading3', name: 'Titre 3', icon: 'H3', description: 'Titre de section', content: 'Titre de section', category: 'Blocs de base' },
    { id: 'context-bullet', type: 'bullet', name: 'Liste à puces', icon: '•', description: 'Liste avec puces', content: '• Nouvel élément', category: 'Blocs de base' },
    { id: 'context-number', type: 'number', name: 'Liste numérotée', icon: '1.', description: 'Liste avec numéros', content: '1. Nouvel élément', category: 'Blocs de base' },
    
    // Quêtes
    { id: 'context-quest', type: 'quest', name: 'Quête', icon: '🎯', description: 'Nouvelle quête', content: 'Nouvelle quête à développer...', category: 'Quêtes' },
    { id: 'context-major-quest', type: 'major-quest', name: 'Quête majeure', icon: '👑', description: 'Quête principale de campagne', content: 'Quête majeure : ', category: 'Quêtes' },
    { id: 'context-side-quest', type: 'side-quest', name: 'Quête secondaire', icon: '⭐', description: 'Quête optionnelle', content: 'Quête secondaire : ', category: 'Quêtes' },
    
    // Personnages
    { id: 'context-npc', type: 'npc', name: 'PNJ', icon: '👤', description: 'Personnage non-joueur', content: 'Nouveau PNJ à créer...', category: 'Personnages' },
    { id: 'context-villain', type: 'villain', name: 'Antagoniste', icon: '😈', description: 'Méchant ou ennemi', content: 'Antagoniste : ', category: 'Personnages' },
    { id: 'context-ally', type: 'ally', name: 'Allié', icon: '🤝', description: 'Personnage allié', content: 'Allié : ', category: 'Personnages' },
    
    // Objets
    { id: 'context-item', type: 'item', name: 'Objet', icon: '⚔️', description: 'Objet magique ou équipement', content: 'Nouvel objet à décrire...', category: 'Objets' },
    { id: 'context-weapon', type: 'weapon', name: 'Arme', icon: '🗡️', description: 'Arme de combat', content: 'Arme : ', category: 'Objets' },
    { id: 'context-armor', type: 'armor', name: 'Armure', icon: '🛡️', description: 'Protection corporelle', content: 'Armure : ', category: 'Objets' },
    
    // Événements
    { id: 'context-encounter', type: 'encounter', name: 'Rencontre', icon: '⚔️', description: 'Événement de combat', content: 'Rencontre : ', category: 'Événements' },
    { id: 'context-trap', type: 'trap', name: 'Piège', icon: '🕳️', description: 'Danger caché', content: 'Piège : ', category: 'Événements' },
    { id: 'context-puzzle', type: 'puzzle', name: 'Énigme', icon: '🧩', description: 'Défi intellectuel', content: 'Énigme : ', category: 'Événements' },
    
    // Séparateur
    { id: 'context-separator', type: 'separator', name: 'Séparateur', icon: '---', description: 'Ligne de séparation', content: '', category: 'Formatage' },
    
    // Actions de copier-coller
    { id: 'context-copy', type: 'copy', name: 'Copier', icon: '📋', description: 'Copier ce bloc', content: '', category: 'Actions' },
    { id: 'context-paste', type: 'paste', name: 'Coller', icon: '📄', description: 'Coller un bloc', content: '', category: 'Actions' }
  ]);

  // Éléments du menu d'insertion rapide (commande /)
  const [slashMenuItems] = useState([
    // Blocs de base
    { id: 'slash-text', type: 'text', name: 'Texte', icon: '📝', description: 'Bloc de texte simple', content: '', category: 'Blocs' },
    { id: 'slash-heading1', type: 'heading1', name: 'Titre 1', icon: '📰', description: 'Titre principal', content: 'Titre principal', category: 'Blocs' },
    { id: 'slash-heading2', type: 'heading2', name: 'Titre 2', icon: '📄', description: 'Sous-titre', content: 'Sous-titre', category: 'Blocs' },
    { id: 'slash-heading3', type: 'heading3', name: 'Titre 3', icon: '📋', description: 'Titre de section', content: 'Titre de section', category: 'Blocs' },
    
    // Formatage
    { id: 'slash-separator', type: 'separator', name: 'Séparateur', icon: '---', description: 'Ligne de séparation', content: '', category: 'Formatage' },
    { id: 'slash-table', type: 'table', name: 'Tableau', icon: '📊', description: 'Tableau avec colonnes', content: '', category: 'Formatage' },
    
    // Pages et navigation
    { id: 'slash-page', type: 'page', name: 'Nouvelle page', icon: '📄', description: 'Créer une nouvelle page', content: 'Nouvelle page', category: 'Pages' },
    { id: 'slash-link', type: 'link', name: 'Lien', icon: '🔗', description: 'Lien vers une page', content: 'Lien vers ', category: 'Pages' },
    
    // Événements
    { id: 'slash-encounter', type: 'encounter', name: 'Rencontre', icon: '⚔️', description: 'Événement de combat', content: 'Rencontre : ', category: 'Événements' },
    { id: 'slash-trap', type: 'trap', name: 'Piège', icon: '🕳️', description: 'Danger caché', content: 'Piège : ', category: 'Événements' },
    { id: 'slash-puzzle', type: 'puzzle', name: 'Énigme', icon: '🧩', description: 'Défi intellectuel', content: 'Énigme : ', category: 'Événements' }
  ]);

  // États pour l'IA et l'automatisation
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [dependencies, setDependencies] = useState({});
  const [selectedElement, setSelectedElement] = useState(null);

  // États pour le menu contextuel
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const [contextMenuTarget, setContextMenuTarget] = useState(null);
  const [contextMenuSearch, setContextMenuSearch] = useState('');
  const [selectedContextMenuItem, setSelectedContextMenuItem] = useState(0);

  // États pour l'édition en ligne
  const [editingLines, setEditingLines] = useState({});
  const [editingCards, setEditingCards] = useState({});

  // États pour le copier-coller intelligent
  const [copiedBlock, setCopiedBlock] = useState(null);
  const [showCopyNotification, setShowCopyNotification] = useState(false);

  // États pour le menu d'insertion rapide
  const [showSlashMenu, setShowSlashMenu] = useState(false);
  const [slashMenuPosition, setSlashMenuPosition] = useState({ x: 0, y: 0 });
  const [slashMenuTarget, setSlashMenuTarget] = useState(null);
  const [slashMenuSearch, setSlashMenuSearch] = useState('');
  const [selectedSlashMenuItem, setSelectedSlashMenuItem] = useState(0);

  // États pour la navigation entre pages
  const [currentPage, setCurrentPage] = useState(null);
  const [pageHistory, setPageHistory] = useState([]);

  // Données de campagne selon l'ID
  useEffect(() => {
    const getCampaignData = (id) => {
      // Récupérer les données des templates depuis localStorage
      const templateCategories = JSON.parse(localStorage.getItem('lore-quests-categories') || '[]');
      
      // Convertir les données des templates en format dashboard
      const convertTemplateQuestsToDashboard = (categories) => {
        const dashboardQuests = [];
        
        categories.forEach(category => {
          if (category.quests && category.quests.length > 0) {
            category.quests.forEach(quest => {
              // Calculer le progrès total de la quête
              const totalProgress = quest.subQuests ? 
                quest.subQuests.reduce((sum, sub) => sum + sub.total, 0) : 0;
              const currentProgress = quest.subQuests ? 
                quest.subQuests.reduce((sum, sub) => sum + sub.current, 0) : 0;
              
              dashboardQuests.push({
                type: 'major',
                name: quest.title,
                completed: currentProgress,
                total: totalProgress,
                status: currentProgress >= totalProgress ? 'completed' : 
                       currentProgress > 0 ? 'in_progress' : 'not_started',
                subQuests: quest.subQuests || []
              });
            });
          }
        });
        
        return dashboardQuests;
      };
      
      const campaigns = {
        1: {
          id: 1,
      title: 'Les Gardiens de la Flamme Éternelle',
      universe: 'Royaume de Cendres',
      game_system: 'D&D 5e',
      queteMajeure: 'Récupérer la Flamme Éternelle',
      rencontre: {
        title: 'Rencontre avec un marchand',
        content: 'Un marchand itinérant propose ses marchandises aux aventuriers. Ses étals regorgent d\'objets mystérieux et d\'artefacts anciens, mais attention à ses prix...',
        npc: 'Marcus le Marchand'
      },
      quests: convertTemplateQuestsToDashboard(templateCategories)
        },
        2: {
          id: 2,
          title: 'La Relique d\'Émeraude',
          universe: 'Forêts d\'Émeraude',
          game_system: 'D&D 5e',
          queteMajeure: 'Trouver la Relique d\'Émeraude perdue',
          rencontre: {
            title: 'Rencontre avec un druide',
            content: 'Un ancien druide révèle les secrets de la forêt et guide les héros vers la relique sacrée.',
            npc: 'Eldrin le Sage'
          },
          quests: [
            { type: 'major', name: 'Major quest', completed: 2, total: 3, status: 'in_progress' },
            { type: 'minor', name: 'Minor quest', completed: 3, total: 5, status: 'in_progress' },
            { type: 'minor', name: 'Minor quest', completed: 2, total: 3, status: 'in_progress' },
            { type: 'minor', name: 'Minor quest', completed: 1, total: 2, status: 'in_progress' },
            { type: 'minor', name: 'Minor quest', completed: 0, total: 1, status: 'not_started' }
          ]
        },
        3: {
          id: 3,
          title: 'La Tombe Oubliée',
          universe: 'Désert de Sable',
          game_system: 'D&D 5e',
          queteMajeure: 'Explorer la tombe du Pharaon oublié',
          rencontre: {
            title: 'Rencontre avec un archéologue',
            content: 'Un archéologue passionné partage ses découvertes sur l\'ancienne civilisation et guide les héros.',
            npc: 'Dr. Amara Khaled'
          },
          quests: [
            { type: 'major', name: 'Major quest', completed: 0, total: 1, status: 'not_started' },
            { type: 'minor', name: 'Minor quest', completed: 1, total: 4, status: 'in_progress' },
            { type: 'minor', name: 'Minor quest', completed: 0, total: 2, status: 'not_started' },
            { type: 'minor', name: 'Minor quest', completed: 0, total: 3, status: 'not_started' },
            { type: 'minor', name: 'Minor quest', completed: 0, total: 1, status: 'not_started' }
          ]
        },
        4: {
          id: 4,
          title: 'Le Pacte des Ombres',
          universe: 'Cité des Ombres',
          game_system: 'D&D 5e',
          queteMajeure: 'Démasquer le culte des Ombres',
          rencontre: {
            title: 'Rencontre avec un espion',
            content: 'Un espion infiltré révèle des informations cruciales sur les activités du culte dans la cité.',
            npc: 'Shadow'
          },
          quests: [
            { type: 'major', name: 'Major quest', completed: 1, total: 4, status: 'in_progress' },
            { type: 'minor', name: 'Minor quest', completed: 2, total: 3, status: 'in_progress' },
            { type: 'minor', name: 'Minor quest', completed: 1, total: 2, status: 'in_progress' },
            { type: 'minor', name: 'Minor quest', completed: 0, total: 2, status: 'not_started' },
            { type: 'minor', name: 'Minor quest', completed: 0, total: 1, status: 'not_started' }
          ]
        },
        5: {
          id: 5,
          title: 'La Forteresse de Givre',
          universe: 'Terres Gelées',
          game_system: 'D&D 5e',
          queteMajeure: 'Libérer la forteresse du Roi de Glace',
          rencontre: {
            title: 'Rencontre avec un guide',
            content: 'Un guide expérimenté aide les héros à naviguer dans les terres gelées et à survivre au froid.',
            npc: 'Bjorn le Trappeur'
          },
          quests: [
            { type: 'major', name: 'Major quest', completed: 0, total: 2, status: 'not_started' },
            { type: 'minor', name: 'Minor quest', completed: 0, total: 3, status: 'not_started' },
            { type: 'minor', name: 'Minor quest', completed: 0, total: 2, status: 'not_started' },
            { type: 'minor', name: 'Minor quest', completed: 0, total: 1, status: 'not_started' },
            { type: 'minor', name: 'Minor quest', completed: 0, total: 1, status: 'not_started' }
          ]
        },
        6: {
          id: 6,
          title: 'Les Sables du Temps',
          universe: 'Dunes d’Azir',
          game_system: 'D&D 5e',
          queteMajeure: 'Empêcher la tempête temporelle d’engloutir le royaume',
          rencontre: {
            title: 'Rencontre avec un chronomancien',
            content: 'Un mage du temps met en garde contre une fracture temporelle imminente dans le désert.',
            npc: 'Maître Kael'
          },
          quests: [
            { type: 'major', name: 'Stabiliser l’ancre temporelle', completed: 0, total: 3, status: 'in_progress' },
            { type: 'minor', name: 'Récupérer des sables d’ambre', completed: 1, total: 5, status: 'in_progress' },
            { type: 'minor', name: 'Explorer une oasis figée', completed: 0, total: 1, status: 'not_started' },
            { type: 'minor', name: 'Secourir une caravane', completed: 0, total: 1, status: 'not_started' },
            { type: 'minor', name: 'Négocier avec les nomades', completed: 0, total: 2, status: 'not_started' }
          ]
        },
        7: {
          id: 7,
          title: 'Le Phare des Brumes',
          universe: 'Archipel d’Argos',
          game_system: 'D&D 5e',
          queteMajeure: 'Rallumer le phare antique pour dissiper les brumes maudites',
          rencontre: {
            title: 'Rencontre avec une capitaine corsaire',
            content: 'Une capitaine propose d’escorter les héros entre les récifs mortels.',
            npc: 'Capitaine Mora'
          },
          quests: [
            { type: 'major', name: 'Trouver la lentille mythique', completed: 1, total: 3, status: 'in_progress' },
            { type: 'minor', name: 'Éviter les sirènes', completed: 2, total: 4, status: 'in_progress' },
            { type: 'minor', name: 'Calibrer la lumière', completed: 0, total: 1, status: 'not_started' },
            { type: 'minor', name: 'Cartographier les récifs', completed: 0, total: 2, status: 'not_started' },
            { type: 'minor', name: 'Récupérer des pièces anciennes', completed: 0, total: 3, status: 'not_started' }
          ]
        },
        8: {
          id: 8,
          title: 'Les Lames du Destin',
          universe: 'Cité de Valoria',
          game_system: 'D&D 5e',
          queteMajeure: 'Empêcher l’assemblage d’une arme légendaire',
          rencontre: {
            title: 'Rencontre avec un maître d’armes',
            content: 'Un forgeron renommé confie une pièce cruciale à protéger coûte que coûte.',
            npc: 'Maître Roderic'
          },
          quests: [
            { type: 'major', name: 'Protéger le fragment d’obsidienne', completed: 1, total: 4, status: 'in_progress' },
            { type: 'minor', name: 'Infiltrer un atelier clandestin', completed: 0, total: 1, status: 'not_started' },
            { type: 'minor', name: 'Démasquer un contrebandier', completed: 0, total: 2, status: 'not_started' },
            { type: 'minor', name: 'Duel sur la place centrale', completed: 0, total: 1, status: 'not_started' },
            { type: 'minor', name: 'Convaincre le Conseil', completed: 0, total: 1, status: 'not_started' }
          ]
        },
        9: {
          id: 9,
          title: 'La Marche des Titans',
          universe: 'Montagnes d’Ur-Khal',
          game_system: 'D&D 5e',
          queteMajeure: 'Arrêter l’éveil de colosses de pierre',
          rencontre: {
            title: 'Rencontre avec un géologue mystique',
            content: 'Un sage des pierres explique les signes annonciateurs de l’éveil des titans.',
            npc: 'Selem le Lithomancien'
          },
          quests: [
            { type: 'major', name: 'Sceller trois autels runiques', completed: 0, total: 3, status: 'in_progress' },
            { type: 'minor', name: 'Repérer un col effondré', completed: 0, total: 1, status: 'not_started' },
            { type: 'minor', name: 'Récupérer de la poudre d’obsidienne', completed: 0, total: 2, status: 'not_started' },
            { type: 'minor', name: 'Négocier avec les géants', completed: 0, total: 1, status: 'not_started' },
            { type: 'minor', name: 'Évacuer un village', completed: 0, total: 1, status: 'not_started' }
          ]
        },
        10: {
          id: 10,
          title: 'Le Voile Cramoisi',
          universe: 'Plaines Pourpres',
          game_system: 'D&D 5e',
          queteMajeure: 'Dissiper une brume sanguine qui corrompt la terre',
          rencontre: {
            title: 'Rencontre avec une alchimiste',
            content: 'Une alchimiste cherche un catalyseur rare pour purifier l’atmosphère.',
            npc: 'Maëla de Rubis'
          },
          quests: [
            { type: 'major', name: 'Concocter l’élixir pourpre', completed: 0, total: 2, status: 'in_progress' },
            { type: 'minor', name: 'Récolter des spores écarlates', completed: 0, total: 3, status: 'not_started' },
            { type: 'minor', name: 'Étudier un monolithe', completed: 0, total: 1, status: 'not_started' },
            { type: 'minor', name: 'Protéger une caravane d’herboristes', completed: 0, total: 1, status: 'not_started' },
            { type: 'minor', name: 'Tester l’élixir', completed: 0, total: 1, status: 'not_started' }
          ]
        }
      };
      
      return campaigns[id] || campaigns[1]; // Fallback vers la campagne 1
    };

    const mockCampaign = getCampaignData(parseInt(campaignId));
    setCampaign(mockCampaign);
    setLoading(false);
  }, [campaignId]);

  // Écouter les changements dans les données des templates pour mettre à jour le dashboard
  useEffect(() => {
    const handleStorageChange = () => {
      if (campaignId) {
        const getCampaignData = (id) => {
          // Récupérer les données des templates depuis localStorage
          const templateCategories = JSON.parse(localStorage.getItem('lore-quests-categories') || '[]');
          
          // Convertir les données des templates en format dashboard
          const convertTemplateQuestsToDashboard = (categories) => {
            const dashboardQuests = [];
            
            categories.forEach(category => {
              if (category.quests && category.quests.length > 0) {
                category.quests.forEach(quest => {
                  // Calculer le progrès total de la quête
                  const totalProgress = quest.subQuests ? 
                    quest.subQuests.reduce((sum, sub) => sum + sub.total, 0) : 0;
                  const currentProgress = quest.subQuests ? 
                    quest.subQuests.reduce((sum, sub) => sum + sub.current, 0) : 0;
                  
                  dashboardQuests.push({
                    type: 'major',
                    name: quest.title,
                    completed: currentProgress,
                    total: totalProgress,
                    status: currentProgress >= totalProgress ? 'completed' : 
                           currentProgress > 0 ? 'in_progress' : 'not_started',
                    subQuests: quest.subQuests || []
                  });
                });
              }
            });
            
            return dashboardQuests;
          };
          
          const campaigns = {
            1: {
              id: 1,
              title: 'Les Gardiens de la Flamme Éternelle',
              universe: 'Royaume de Cendres',
              game_system: 'D&D 5e',
              queteMajeure: 'Récupérer la Flamme Éternelle',
              rencontre: {
                title: 'Rencontre avec un marchand',
                content: 'Un marchand mystérieux propose des objets magiques aux héros dans les ruines anciennes.',
                npc: 'Marcus le Marchand'
              },
              quests: convertTemplateQuestsToDashboard(templateCategories)
            }
          };
          
          return campaigns[id] || campaigns[1];
        };

        const updatedCampaign = getCampaignData(parseInt(campaignId));
        setCampaign(updatedCampaign);
      }
    };

    // Écouter les changements dans localStorage
    window.addEventListener('storage', handleStorageChange);
    
    // Écouter les changements dans la même fenêtre (pour les modifications locales)
    const interval = setInterval(() => {
      const currentData = localStorage.getItem('lore-quests-categories');
      if (currentData !== (window.lastQuestData || '')) {
        window.lastQuestData = currentData;
        handleStorageChange();
      }
    }, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [campaignId]);

  // Initialiser les textLines selon la campagne
  useEffect(() => {
    if (campaignId) {
      // Essayer de charger les textLines sauvegardées
      const savedTextLines = localStorage.getItem(`lore_campaign_${campaignId}_textLines`);
      
      if (savedTextLines) {
        try {
          const parsedTextLines = JSON.parse(savedTextLines);
          setTextLines(parsedTextLines);
        } catch (error) {
          console.error('Erreur lors du chargement des textLines sauvegardées:', error);
          // Fallback vers le contenu par défaut
          const campaignTexts = getTextContent(parseInt(campaignId));
          setTextLines(campaignTexts);
        }
      } else {
        // Pas de sauvegarde, utiliser le contenu par défaut
        const campaignTexts = getTextContent(parseInt(campaignId));
        setTextLines(campaignTexts);
      }
    }
  }, [campaignId]);

  // Initialiser les sessions avec les données d'exemple
  useEffect(() => {
    const initialSessions = [
      {
        id: 'session-1',
        title: 'Session 1 - L\'arrivée à Pyros',
        date: '15/03/2025',
        duration: '4h 30min',
        players: ['Alice', 'Bob', 'Charlie', 'Diana'],
        summary: 'Les héros arrivent à Pyros et découvrent les premiers signes de corruption. Rencontre avec le capitaine Marcus.',
        status: 'completed'
      },
      {
        id: 'session-2',
        title: 'Session 2 - Les tunnels volcaniques',
        date: '22/03/2025',
        duration: '3h 45min',
        players: ['Alice', 'Bob', 'Charlie', 'Diana'],
        summary: 'Exploration des tunnels souterrains et découverte des créatures de magma. Combat épique contre un élémentaire de feu.',
        status: 'completed'
      },
      {
        id: 'session-3',
        title: 'Session 3 - Le sanctuaire perdu',
        date: '29/03/2025',
        duration: '5h 15min',
        players: ['Alice', 'Bob', 'Charlie', 'Diana'],
        summary: 'Découverte du sanctuaire perdu des anciens gardiens. Révélations sur la prophétie et les clés de la Flamme Éternelle.',
        status: 'in_progress'
      }
    ];
    setSessions(initialSessions);
  }, []);

  // Fermer le menu utilisateur au clic extérieur ou avec Échap
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showUserMenu && userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShowUserMenu(false);
      }
    };
    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [showUserMenu]);

  // Inventaire du marchand
  const [merchantInventory, setMerchantInventory] = useState([
    { id: 1, name: 'Potion de soins', price: 50, description: 'Restaure 2d4+2 points de vie' },
    { id: 2, name: 'Épée enchantée', price: 150, description: 'Épée longue +1' },
    { id: 3, name: 'Bouclier magique', price: 200, description: 'Bouclier +1' }
  ]);

  // États pour l'édition
  const [editingTableField, setEditingTableField] = useState(null);
  const [editingTableValue, setEditingTableValue] = useState('');
  const [editingTotal, setEditingTotal] = useState(false);
  const [totalValue, setTotalValue] = useState(400);

  // Fonctions pour l'inventaire du marchand
  const handleAddItem = () => {
    const newId = Math.max(...merchantInventory.map(item => item.id)) + 1;
    const newItem = {
      id: newId,
      name: 'Nouvel objet',
      price: 0,
      description: 'Description à ajouter'
    };
    setMerchantInventory([...merchantInventory, newItem]);
    setEditingTableField(`${newId}-name`);
    setEditingTableValue('Nouvel objet');
  };

  const handleDeleteItem = (id) => {
    setMerchantInventory(merchantInventory.filter(item => item.id !== id));
  };

  const handleEditTableField = (id, field, value) => {
    setEditingTableField(`${id}-${field}`);
    setEditingTableValue(value);
  };

  const handleSaveTableField = (id, field) => {
    setMerchantInventory(merchantInventory.map(item => 
      item.id === id ? { ...item, [field]: editingTableValue } : item
    ));
    setEditingTableField(null);
    setEditingTableValue('');
  };

  const handleCancelTableEdit = () => {
    setEditingTableField(null);
    setEditingTableValue('');
  };

  const getTotalValue = () => {
    return merchantInventory.reduce((total, item) => total + item.price, 0);
  };

  const handleEditTotal = () => {
    setEditingTotal(true);
    setTotalValue(getTotalValue());
  };

  const handleSaveTotal = () => {
    setEditingTotal(false);
  };

  const handleCancelTotalEdit = () => {
    setEditingTotal(false);
  };

  // Fonction de sauvegarde manuelle
  const handleManualSave = async () => {
    setSaveStatus('saving');
    
    try {
      // Sauvegarder les textLines
      if (campaignId && textLines.length > 0) {
        localStorage.setItem(`lore_campaign_${campaignId}_textLines`, JSON.stringify(textLines));
      }
      
      // Sauvegarder les templates
      const templates = JSON.parse(localStorage.getItem('lore-templates-data') || '[]');
      localStorage.setItem('lore-templates-data', JSON.stringify(templates));
      
      // Sauvegarder les quêtes
      const quests = JSON.parse(localStorage.getItem('lore-quests-categories') || '[]');
      localStorage.setItem('lore-quests-categories', JSON.stringify(quests));
      
      // Simuler un délai de sauvegarde
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setSaveStatus('saved');
      setLastSaveTime(new Date());
      toast.success('Sauvegarde effectuée avec succès !');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      setSaveStatus('unsaved');
      toast.error('Erreur lors de la sauvegarde');
    }
  };

  // Fonction pour détecter les mentions dans le texte
  const detectMentions = (text) => {
    const mentionRegex = /\*\*([^*]+)\*\*/g;
    const mentions = [];
    let match;
    
    while ((match = mentionRegex.exec(text)) !== null) {
      const name = match[1];
      let type = 'Personnage';
      let image = '/images/characters/default.jpg';
      
      // Détection intelligente du type basée sur le nom
      if (name.includes('Conseil') || name.includes('Guild') || name.includes('Ordre')) {
        type = 'Organisation';
        image = '/images/organizations/default.jpg';
      } else if (name.includes('Roi') || name.includes('Reine') || name.includes('Seigneur') || name.includes('Dame')) {
        type = 'Personnage Important';
        image = '/images/characters/important.jpg';
      } else if (name.includes('Taverne') || name.includes('Château') || name.includes('Tour') || name.includes('Temple')) {
        type = 'Lieu';
        image = '/images/locations/default.jpg';
      } else if (name.includes('Épée') || name.includes('Bâton') || name.includes('Armure') || name.includes('Anneau')) {
        type = 'Objet';
        image = '/images/objects/default.jpg';
      }
      
      mentions.push({
        name: name,
        type: type,
        image: image
      });
    }
    
    return mentions;
  };

  // Fonction pour mettre à jour l'image dynamique
  const updateDynamicImage = () => {
    const allText = textLines.map(line => line.content).join(' ');
    const mentions = detectMentions(allText);
    
    if (mentions.length > 0) {
      const firstMention = mentions[0];
      setCurrentMentionImage(firstMention.image);
      setCurrentMentionName(firstMention.name);
      setCurrentMentionType(firstMention.type);
    } else {
      setCurrentMentionImage(null);
      setCurrentMentionName('');
      setCurrentMentionType('');
    }
  };

  // Fonctions pour les sessions
  const handleSessionSelect = (sessionId) => {
    setSelectedSessions(prev => 
      prev.includes(sessionId) 
        ? prev.filter(id => id !== sessionId)
        : [...prev, sessionId]
    );
  };

  const handleViewSelectedSessions = () => {
    console.log('Sessions sélectionnées:', selectedSessions);
    setShowHistoryMenu(false);
  };

  const handleCreateNewSession = () => {
    const newSessionId = `session-${Date.now()}`;
    const currentDate = new Date().toLocaleDateString('fr-FR');
    const newSession = {
      id: newSessionId,
      title: `Session ${sessions.length + 1} - Nouvelle partie`,
      date: currentDate,
      duration: '0h 00min',
      players: ['Alice', 'Bob', 'Charlie', 'Diana'],
      summary: 'Nouvelle session créée. Prêt à commencer l\'aventure !',
      status: 'planned'
    };
    
    setSessions(prevSessions => [newSession, ...prevSessions]);
    setSelectedSessions([newSessionId]);
    setShowHistoryMenu(true);
  };

  // Fonction pour obtenir la couleur des quêtes
  const getQuestColor = (quest) => {
    if (quest.status === 'completed') return 'bg-green-500';
    if (quest.status === 'in_progress') return 'bg-yellow-500';
    return 'bg-red-500';
  };

  // Configuration des capteurs pour le drag & drop
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Fonctions de drag & drop
  const handleDragStart = (event) => {
    setActiveId(event.active.id);
    const item = textLines.find(line => line.id === event.active.id);
    setDraggedItem(item);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id && over) {
        // Pour les textLines, gérer le réordonnancement complet avec changement de section
        setTextLines((items) => {
          const oldIndex = items.findIndex(item => item.id === active.id);
          const newIndex = items.findIndex(item => item.id === over.id);
          
          if (oldIndex !== -1 && newIndex !== -1) {
            const newItems = [...items];
            const [movedItem] = newItems.splice(oldIndex, 1);
            
            // Déterminer la nouvelle section basée sur la position
            const targetSection = determineSectionFromIndex(newIndex, items);
            movedItem.section = targetSection;
            
            // Insérer à la nouvelle position
            if (oldIndex < newIndex) {
              newItems.splice(newIndex - 1, 0, movedItem);
            } else {
              newItems.splice(newIndex, 0, movedItem);
            }
            
            return newItems;
          }
          return items;
        });
    }
    setActiveId(null);
    setDraggedItem(null);
  };

  // Fonction pour déterminer la section basée sur l'index
  const determineSectionFromIndex = (index, items) => {
    const situationCount = items.filter(item => item.section === 'situation').length;
    return index <= situationCount ? 'situation' : 'debut';
  };

  // Fonction pour déplacer une ligne vers une autre section
  const handleMoveLineToSection = (lineId, newSection) => {
    setTextLines((items) => {
      return items.map(item => 
        item.id === lineId 
          ? { ...item, section: newSection }
          : item
      );
    });
  };

  // Fonction pour gérer le drop des templates
  const handleTemplateDrop = (e, targetIndex) => {
    e.preventDefault();
    try {
      const templateData = JSON.parse(e.dataTransfer.getData('application/json'));
      const newLine = {
        id: `template-${Date.now()}`,
        content: templateData.content,
        section: 'situation', // Par défaut dans situation
        type: templateData.type,
        template: true
      };
      
      setTextLines((items) => {
        const newItems = [...items];
        newItems.splice(targetIndex, 0, newLine);
        return newItems;
      });
      
      // Générer des suggestions après l'ajout
      // generateSuggestions(newLine); // Temporairement désactivé
      
      toast.success(`${templateData.name} ajouté avec succès !`);
    } catch (error) {
      console.error('Erreur lors du drop du template:', error);
    }
  };

  // Fonction pour générer des suggestions automatiques
  const generateSuggestions = (newItem) => {
    const newSuggestions = [];
    
    // Suggestions basées sur le type d'élément
    if (newItem.type === 'quest') {
      newSuggestions.push({
        id: 'suggestion-1',
        type: 'npc',
        title: 'Ajouter un PNJ lié',
        description: 'Cette quête pourrait bénéficier d\'un personnage clé',
        priority: 'high'
      });
      newSuggestions.push({
        id: 'suggestion-2',
        type: 'location',
        title: 'Définir un lieu',
        description: 'Où se déroule cette quête ?',
        priority: 'medium'
      });
    }
    
    if (newItem.type === 'npc') {
      newSuggestions.push({
        id: 'suggestion-3',
        type: 'quest',
        title: 'Créer une quête',
        description: 'Ce personnage pourrait donner une quête',
        priority: 'medium'
      });
    }
    
    // Suggestions basées sur le contenu
    const content = newItem.content.toLowerCase();
    if (content.includes('magique') || content.includes('enchanté')) {
      newSuggestions.push({
        id: 'suggestion-4',
        type: 'item',
        title: 'Objet magique',
        description: 'Ajouter un objet magique lié',
        priority: 'low'
      });
    }
    
    setSuggestions(newSuggestions);
    setShowSuggestions(true);
  };

  // Fonction pour détecter les dépendances
  const detectDependencies = () => {
    const deps = {};
    
    textLines.forEach(line => {
      if (line.type === 'quest') {
        // Chercher des références à des PNJs dans le contenu
        const npcMatches = line.content.match(/(?:personnage|PNJ|marchand|roi|mage|guerrier)/gi);
        if (npcMatches) {
          deps[line.id] = {
            ...deps[line.id],
            npcs: npcMatches.length
          };
        }
        
        // Chercher des références à des lieux
        const locationMatches = line.content.match(/(?:taverne|château|forêt|montagne|ville)/gi);
        if (locationMatches) {
          deps[line.id] = {
            ...deps[line.id],
            locations: locationMatches.length
          };
        }
      }
    });
    
    setDependencies(deps);
  };

  // Auto-organisation basée sur le contenu
  const autoOrganize = () => {
    setTextLines((items) => {
      return items.sort((a, b) => {
        // Priorité : quêtes > PNJs > lieux > objets
        const priority = { quest: 4, npc: 3, location: 2, item: 1 };
        const aPriority = priority[a.type] || 0;
        const bPriority = priority[b.type] || 0;
        
        if (aPriority !== bPriority) {
          return bPriority - aPriority;
        }
        
        // Si même priorité, trier par longueur de contenu
        return b.content.length - a.content.length;
      });
    });
    
    toast.success('Contenu réorganisé automatiquement !');
  };

  // Fonction pour appliquer une suggestion
  const applySuggestion = (suggestion) => {
    const template = templates.find(t => t.type === suggestion.type);
    if (template) {
      const newLine = {
        id: `suggestion-${Date.now()}`,
        content: template.content,
        section: 'situation',
        type: template.type,
        template: true,
        fromSuggestion: true
      };
      
      setTextLines((items) => {
        const newItems = [...items];
        newItems.push(newLine);
        return newItems;
      });
      
      toast.success(`Suggestion appliquée : ${suggestion.title}`);
    }
    
    // Retirer la suggestion de la liste
    setSuggestions(prev => prev.filter(s => s.id !== suggestion.id));
  };

  // Fonction pour fermer les suggestions
  const closeSuggestions = () => {
    setShowSuggestions(false);
    setSuggestions([]);
  };

  // Fonction pour traiter le collage de liens
  const handlePaste = (e) => {
    const pastedText = e.clipboardData.getData('text');
    
    // Détecter si c'est un lien vers une page de template
    const linkPattern = /\/campaigns\/[^\/]+\/(quest|npc|item|location)\/([^\/\s]+)/;
    const match = pastedText.match(linkPattern);
    
    if (match) {
      e.preventDefault();
      const [, type, name] = match;
      
      // Créer un nouveau bloc avec le lien
      const newLine = {
        id: `link-${Date.now()}`,
        content: `[${type === 'quest' ? 'Quête' : type === 'npc' ? 'Personnage' : type === 'item' ? 'Objet' : 'Lieu'}: ${name}]`,
        section: 'situation',
        type: type,
        isLink: true,
        linkUrl: pastedText
      };
      
      // Ajouter la ligne à la fin
      setTextLines(prev => [...prev, newLine]);
      toast.success(`Lien vers ${type} ajouté !`);
      return;
    }
    
    // Détecter si c'est un lien de consultation de template combat
    if (pastedText.includes('Combat simple') && pastedText.includes('consultation')) {
      e.preventDefault();
      
      // Créer les données du template combat identiques à la card du dashboard
      const combatTemplate = {
        id: 'combat-simple',
        name: 'Combat simple',
        category: 'modeles-simples',
        location: 'Route forestière',
        difficulty: 'Facile',
        rewards: '2d6 pièces d\'or, potion de soins mineure',
        description: 'Une embuscade tendue par des brigands sur la route forestière. Les bandits, motivés par la cupidité, attaquent sans pitié avec leurs armes de fortune. Un combat rapide mais intense s\'engage.',
        enemies: [
          { name: 'Bandit', hp: 15, ac: 12, attack: '+3', damage: '1d6+1' },
          { name: 'Chef bandit', hp: 25, ac: 14, attack: '+5', damage: '1d8+2' }
        ],
        tags: [
          { name: 'Combat', color: 'bg-red-600' },
          { name: 'Brigands', color: 'bg-orange-600' },
          { name: 'Route', color: 'bg-yellow-600' }
        ]
      };
      
      // Vérifier que les données sont valides avant de continuer
      if (!combatTemplate.enemies || !Array.isArray(combatTemplate.enemies)) {
        console.error('Données de template combat invalides:', combatTemplate);
        toast.error('Erreur lors de la création de la card combat');
        return;
      }
      
      // Créer un aperçu qui ressemble à la card du dashboard
      const newLine = {
        id: `combat-card-preview-${Date.now()}`,
        content: `COMBAT_CARD:${JSON.stringify(combatTemplate)}`,
        section: 'debut',
        type: 'combat-card-preview',
        isLink: false,
        templateData: combatTemplate
      };
      
      // Debug: Afficher les données créées
      console.log('Création de la card combat avec les données:', combatTemplate);
      console.log('Contenu de la ligne:', newLine.content);
      
      setTextLines(prev => [...prev, newLine]);
      toast.success(`Card combat "${combatTemplate.name}" ajoutée !`);
      return;
    }
    
    // Détecter si c'est un lien de consultation de template marchand
    if (pastedText.includes('Rencontre avec un marchand') && pastedText.includes('consultation')) {
      e.preventDefault();
      
      // Créer les données du template marchand identiques à la card du dashboard
      const merchantTemplate = {
        id: 'marchand',
        name: 'Rencontre avec un marchand',
        category: 'modeles-simples',
        location: 'Marché local',
        npc: 'Marcus le Marchand',
        description: 'Un marchand itinérant propose ses marchandises aux aventuriers. Ses étals regorgent d\'objets mystérieux et d\'artefacts anciens, mais attention à ses prix...',
        inventory: [
          { id: 1, name: 'Potion de soins mineure', price: 25 },
          { id: 2, name: 'Parchemin de bouclier', price: 50 },
          { id: 3, name: 'Pierre de sort', price: 100 },
          { id: 4, name: 'Corde de soie', price: 10 },
          { id: 5, name: 'Torche éternelle', price: 15 }
        ],
        tags: [
          { name: 'Marchand', color: 'bg-blue-600' },
          { name: 'Commerce', color: 'bg-green-600' },
          { name: 'Social', color: 'bg-purple-600' }
        ]
      };
      
      // Vérifier que les données sont valides avant de continuer
      if (!merchantTemplate.inventory || !Array.isArray(merchantTemplate.inventory)) {
        console.error('Données de template marchand invalides:', merchantTemplate);
        toast.error('Erreur lors de la création de la card marchand');
        return;
      }
      
      // Créer un aperçu qui ressemble à la card du dashboard
      const newLine = {
        id: `merchant-card-preview-${Date.now()}`,
        content: `MERCHANT_CARD:${JSON.stringify(merchantTemplate)}`,
        section: 'debut',
        type: 'merchant-card-preview',
        isLink: false,
        templateData: merchantTemplate
      };
      
      // Debug: Afficher les données créées
      console.log('Création de la card marchand avec les données:', merchantTemplate);
      console.log('Contenu de la ligne:', newLine.content);
      
      setTextLines(prev => [...prev, newLine]);
      toast.success(`Card marchand "${merchantTemplate.name}" ajoutée !`);
      return;
    }
    
    // Détecter si c'est un nom de quête copié depuis les templates
    const questNames = ['Libérer les otages alliés', 'Libérer les chasseurs de la forêt écarlate', 'Sauver les mages d\'Arkanix'];
    const isQuestName = questNames.some(questName => pastedText.trim() === questName);
    
    if (isQuestName) {
      e.preventDefault();
      
      // Récupérer les données de la quête depuis les templates
      const templateCategories = JSON.parse(localStorage.getItem('lore-quests-categories') || '[]');
      let questData = null;
      
      templateCategories.forEach(category => {
        if (category.quests && category.quests.length > 0) {
          category.quests.forEach(quest => {
            if (quest.title === pastedText) {
              questData = quest;
            }
          });
        }
      });
      
      if (questData) {
        // Créer un aperçu de quête comme dans le dashboard
        const newLine = {
          id: `quest-preview-${Date.now()}`,
          content: `APERÇU_QUÊTE:${JSON.stringify(questData)}`,
          section: 'debut',
          type: 'quest-preview',
          isLink: false,
          questData: questData
        };
        
        // Ajouter la ligne à la fin
        setTextLines(prev => {
          const newLines = [...prev, newLine];
          console.log('Aperçu de quête ajouté:', newLine);
          return newLines;
        });
        toast.success(`Aperçu de la quête "${pastedText}" ajouté !`);
        return;
      }
    }
    
    // Détecter si c'est un nom de template marchand
    const merchantNames = ['Rencontre avec un marchand', 'Nouvelle rencontre'];
    const isMerchantName = merchantNames.some(merchantName => pastedText.trim() === merchantName);
    
    if (isMerchantName) {
      e.preventDefault();
      
      // Créer les données du template marchand
      const merchantTemplate = {
        id: 'marchand',
        name: 'Rencontre avec un marchand',
        category: 'modeles-simples',
        location: 'Marché local',
        npc: 'Marcus le Marchand',
        description: 'Un marchand itinérant propose ses marchandises aux aventuriers. Ses étals regorgent d\'objets mystérieux et d\'artefacts anciens, mais attention à ses prix...',
        inventory: [
          { id: 1, name: 'Potion de soins mineure', price: 25 },
          { id: 2, name: 'Parchemin de bouclier', price: 50 },
          { id: 3, name: 'Pierre de sort', price: 100 },
          { id: 4, name: 'Corde de soie', price: 10 },
          { id: 5, name: 'Torche éternelle', price: 15 }
        ],
        tags: [
          { name: 'Marchand', color: 'bg-blue-600' },
          { name: 'Commerce', color: 'bg-green-600' },
          { name: 'Social', color: 'bg-purple-600' }
        ]
      };
      
      // Créer un aperçu de template marchand
      const newLine = {
        id: `merchant-preview-${Date.now()}`,
        content: `APERÇU_MARCHAND:${JSON.stringify(merchantTemplate)}`,
        section: 'debut',
        type: 'merchant-preview',
        isLink: false,
        templateData: merchantTemplate
      };
      
      setTextLines(prev => [...prev, newLine]);
      toast.success(`Aperçu du template "${merchantTemplate.name}" ajouté !`);
      return;
    }
    
    // Détecter si c'est un nom de template combat
    const combatNames = ['Combat simple'];
    const isCombatName = combatNames.some(combatName => pastedText.trim() === combatName);
    
    if (isCombatName) {
      e.preventDefault();
      
      // Créer les données du template combat
      const combatTemplate = {
        id: 'combat-simple',
        name: 'Combat simple',
        category: 'modeles-simples',
        location: 'Route forestière',
        difficulty: 'Facile',
        rewards: '2d6 pièces d\'or, potion de soins mineure',
        description: 'Une embuscade tendue par des brigands sur la route forestière. Les bandits, motivés par la cupidité, attaquent sans pitié avec leurs armes de fortune. Un combat rapide mais intense s\'engage.',
        enemies: [
          { name: 'Bandit', hp: 15, ac: 12, attack: '+3', damage: '1d6+1' },
          { name: 'Chef bandit', hp: 25, ac: 14, attack: '+5', damage: '1d8+2' }
        ],
        tags: [
          { name: 'Combat', color: 'bg-red-600' },
          { name: 'Brigands', color: 'bg-orange-600' },
          { name: 'Route', color: 'bg-yellow-600' }
        ]
      };
      
      // Créer un aperçu de template combat
      const newLine = {
        id: `combat-preview-${Date.now()}`,
        content: `APERÇU_COMBAT:${JSON.stringify(combatTemplate)}`,
        section: 'debut',
        type: 'combat-preview',
        isLink: false,
        templateData: combatTemplate
      };
      
      setTextLines(prev => [...prev, newLine]);
      toast.success(`Aperçu du template "${combatTemplate.name}" ajouté !`);
      return;
    }
  };

  // Fonction pour afficher le menu contextuel
  const handleShowContextMenu = (e, targetId) => {
    e.preventDefault();
    
    const rect = e.currentTarget.getBoundingClientRect();
    const menuWidth = 320; // Largeur approximative du menu
    const menuHeight = 400; // Hauteur approximative du menu
    
    let x = rect.right + 10; // Position par défaut à droite du bouton
    let y = rect.top;
    
    // Vérifier si le menu sort à droite de l'écran
    if (x + menuWidth > window.innerWidth) {
      x = rect.left - menuWidth - 10; // Positionner à gauche du bouton
    }
    
    // Vérifier si le menu sort en bas de l'écran
    if (y + menuHeight > window.innerHeight) {
      y = window.innerHeight - menuHeight - 10; // Ajuster vers le haut
    }
    
    // Vérifier si le menu sort en haut de l'écran
    if (y < 10) {
      y = 10; // Position minimale
    }
    
    setContextMenuPosition({ x, y });
    setContextMenuTarget(targetId);
    setShowContextMenu(true);
  };

  // Fonction pour fermer le menu contextuel
  const handleCloseContextMenu = () => {
    setShowContextMenu(false);
    setContextMenuTarget(null);
    setContextMenuSearch('');
    setSelectedContextMenuItem(0);
  };

  // Fonctions pour l'édition en ligne
  const handleEditLine = (id, isEditing) => {
    setEditingLines(prev => ({
      ...prev,
      [id]: isEditing
    }));
  };

  const handleDeleteLine = (id) => {
    setTextLines(prev => prev.filter(line => line.id !== id));
    setEditingLines(prev => {
      const newEditing = { ...prev };
      delete newEditing[id];
      return newEditing;
    });
  };

  const handleContentChange = (id, newContent, newLinkUrl = null) => {
    setTextLines(prev => prev.map(line => {
      if (line.id === id) {
        // Si c'est une card marchand, mettre à jour aussi les templates
        if (line.type === 'merchant-card-preview') {
          const templateDataMatch = newContent.match(/MERCHANT_CARD:(.+)/);
          if (templateDataMatch) {
            try {
              const templateData = JSON.parse(templateDataMatch[1]);
              // Vérifier que les données sont valides
              if (templateData && templateData.inventory && Array.isArray(templateData.inventory)) {
                // Mettre à jour les templates dans localStorage
                const templates = JSON.parse(localStorage.getItem('lore-templates-data') || '[]');
                const updatedTemplates = templates.map(t => 
                  (t.id === 'marchand' || t.name === 'Rencontre avec un marchand') ? templateData : t
                );
                localStorage.setItem('lore-templates-data', JSON.stringify(updatedTemplates));
                
                // Mettre à jour aussi la card marchand du dashboard
                setMerchantInventory(templateData.inventory);
              }
            } catch (error) {
              console.error('Erreur lors de la mise à jour des templates:', error);
            }
          }
        }
        
        // Si c'est un aperçu de quête, mettre à jour aussi les templates
        if (line.type === 'quest-preview') {
          const questDataMatch = newContent.match(/APERÇU_QUÊTE:(.+)/);
          if (questDataMatch) {
            try {
              const questData = JSON.parse(questDataMatch[1]);
              // Mettre à jour les quêtes dans localStorage
              const templateCategories = JSON.parse(localStorage.getItem('lore-quests-categories') || '[]');
              const updatedCategories = templateCategories.map(category => {
                if (category.quests && category.quests.length > 0) {
                  const updatedQuests = category.quests.map(quest => {
                    if (quest.title === questData.title) {
                      return questData;
                    }
                    return quest;
                  });
                  return { ...category, quests: updatedQuests };
                }
                return category;
              });
              localStorage.setItem('lore-quests-categories', JSON.stringify(updatedCategories));
            } catch (error) {
              console.error('Erreur lors de la mise à jour de la quête:', error);
            }
          }
        }
        
        // Si c'est un aperçu de combat, mettre à jour aussi les templates
        if (line.type === 'combat-preview') {
          const combatDataMatch = newContent.match(/APERÇU_COMBAT:(.+)/);
          if (combatDataMatch) {
            try {
              const combatData = JSON.parse(combatDataMatch[1]);
              // Mettre à jour les templates dans localStorage
              const templates = JSON.parse(localStorage.getItem('lore-templates-data') || '[]');
              const updatedTemplates = templates.map(t => 
                (t.id === 'combat-simple' || t.name === 'Combat simple') ? combatData : t
              );
              localStorage.setItem('lore-templates-data', JSON.stringify(updatedTemplates));
            } catch (error) {
              console.error('Erreur lors de la mise à jour du template combat:', error);
            }
          }
        }
        
        // Si c'est une card combat, mettre à jour aussi les templates
        if (line.type === 'combat-card-preview') {
          const combatDataMatch = newContent.match(/COMBAT_CARD:(.+)/);
          if (combatDataMatch) {
            try {
              const combatData = JSON.parse(combatDataMatch[1]);
              // Mettre à jour les templates dans localStorage
              const templates = JSON.parse(localStorage.getItem('lore-templates-data') || '[]');
              const updatedTemplates = templates.map(t => 
                (t.id === 'combat-simple' || t.name === 'Combat simple') ? combatData : t
              );
              localStorage.setItem('lore-templates-data', JSON.stringify(updatedTemplates));
            } catch (error) {
              console.error('Erreur lors de la mise à jour du template combat:', error);
            }
          }
        }
        
        return { 
          ...line, 
          content: newContent,
          ...(newLinkUrl !== null && { linkUrl: newLinkUrl })
        };
      }
      return line;
    }));
  };

  const handleAddNewLine = (newLine, afterId) => {
    setTextLines(prev => {
      const index = prev.findIndex(line => line.id === afterId);
      if (index === -1) return [...prev, newLine];
      return [...prev.slice(0, index + 1), newLine, ...prev.slice(index + 1)];
    });
    // Mettre la nouvelle ligne en mode édition
    setEditingLines(prev => ({
      ...prev,
      [newLine.id]: true
    }));
  };

  const handleLinkUrlChange = (id, newLinkUrl) => {
    setTextLines(prev => prev.map(line => 
      line.id === id ? { ...line, linkUrl: newLinkUrl } : line
    ));
  };

  // Fonctions pour l'édition des cartes
  const handleEditCard = (cardId, isEditing) => {
    setEditingCards(prev => ({
      ...prev,
      [cardId]: isEditing
    }));
  };

  const handleDeleteCard = (cardId) => {
    // Logique pour supprimer une carte si nécessaire
    console.log('Suppression de la carte:', cardId);
  };

  // Fonction pour filtrer les templates selon la recherche
  const getFilteredTemplates = () => {
    if (!contextMenuSearch.trim()) {
      return contextTemplates;
    }
    
    const searchTerm = contextMenuSearch.toLowerCase();
    return contextTemplates.filter(template => 
      template.name.toLowerCase().includes(searchTerm) ||
      template.description.toLowerCase().includes(searchTerm) ||
      template.category.toLowerCase().includes(searchTerm)
    );
  };

  // Fonction pour gérer la navigation au clavier dans le menu contextuel
  const handleContextMenuKeyDown = (e) => {
    const filteredTemplates = getFilteredTemplates();
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedContextMenuItem(prev => 
          prev < filteredTemplates.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedContextMenuItem(prev => 
          prev > 0 ? prev - 1 : filteredTemplates.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (filteredTemplates[selectedContextMenuItem]) {
          handleAddElement(filteredTemplates[selectedContextMenuItem].type);
        }
        break;
      case 'Escape':
        e.preventDefault();
        handleCloseContextMenu();
        break;
    }
  };

  // Fonction pour ajouter un élément via le menu contextuel
  const handleAddElement = (type) => {
    const template = contextTemplates.find(t => t.type === type);
    if (template) {
      let newLine;
      
      // Gestion spéciale pour les titres
      if (type === 'heading1') {
        newLine = {
          id: `context-${Date.now()}`,
          content: 'Titre principal',
          section: 'situation',
          type: 'heading1',
          template: true,
          isHeading: true
        };
      } else if (type === 'heading2') {
        newLine = {
          id: `context-${Date.now()}`,
          content: 'Sous-titre',
          section: 'situation',
          type: 'heading2',
          template: true,
          isHeading: true
        };
      } else if (type === 'heading3') {
        newLine = {
          id: `context-${Date.now()}`,
          content: 'Titre de section',
          section: 'situation',
          type: 'heading3',
          template: true,
          isHeading: true
        };
      } else if (type === 'separator') {
        newLine = {
          id: `context-${Date.now()}`,
          content: '',
          section: 'situation',
          type: 'separator',
          template: true,
          isSeparator: true
        };
      } else if (type === 'copy') {
        copyBlock(contextMenuTarget);
        handleCloseContextMenu();
        return;
      } else if (type === 'paste') {
        const targetIndex = textLines.findIndex(item => item.id === contextMenuTarget);
        pasteBlock(targetIndex + 1);
        handleCloseContextMenu();
        return;
      } else {
        newLine = {
          id: `context-${Date.now()}`,
          content: template.content,
          section: 'situation',
          type: template.type,
          template: true
        };
      }
      
      setTextLines((items) => {
        const newItems = [...items];
        const targetIndex = items.findIndex(item => item.id === contextMenuTarget);
        if (targetIndex !== -1) {
          newItems.splice(targetIndex + 1, 0, newLine);
        } else {
          newItems.push(newLine);
        }
        return newItems;
      });
      
      toast.success(`${template.name} ajouté avec succès !`);
    }
    handleCloseContextMenu();
  };

  // Fonction pour déplacer un élément sélectionné avec les flèches
  const moveSelectedElement = (direction) => {
    if (!selectedElement) {
      toast.info('Aucun élément sélectionné');
      return;
    }

    setTextLines((items) => {
      const currentIndex = items.findIndex(item => item.id === selectedElement);
      if (currentIndex === -1) return items;

      const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
      if (newIndex < 0 || newIndex >= items.length) {
        toast.info('Impossible de déplacer l\'élément dans cette direction');
        return items;
      }

      return arrayMove(items, currentIndex, newIndex);
    });

    toast.success(`Élément déplacé vers le ${direction === 'up' ? 'haut' : 'bas'}`);
  };

  // Gestion des raccourcis clavier (Ctrl+C, Ctrl+V, Échap)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Échap : Fermer les suggestions et le menu contextuel
      if (e.key === 'Escape') {
        closeSuggestions();
        handleCloseContextMenu();
      }
      
      // Ctrl+C : Copier le bloc sélectionné
      if (e.ctrlKey && e.key === 'c' && !e.target.contentEditable) {
        e.preventDefault();
        const selectedElement = document.querySelector('.text-line.selected');
        if (selectedElement) {
          const blockId = selectedElement.dataset.blockId;
          if (blockId) {
            copyBlock(parseInt(blockId));
          }
        }
      }
      
      // Ctrl+V : Coller le bloc
      if (e.ctrlKey && e.key === 'v' && !e.target.contentEditable) {
        e.preventDefault();
        const targetIndex = textLines.length; // Coller à la fin par défaut
        pasteBlock(targetIndex);
      }
      
      // Gestion du menu d'insertion rapide
      if (showSlashMenu) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedSlashMenuItem(prev => Math.min(prev + 1, filteredSlashItems.length - 1));
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedSlashMenuItem(prev => Math.max(prev - 1, 0));
        } else if (e.key === 'Enter') {
          e.preventDefault();
          if (filteredSlashItems[selectedSlashMenuItem]) {
            handleSlashMenuSelect(filteredSlashItems[selectedSlashMenuItem]);
          }
        } else if (e.key === 'Escape') {
          e.preventDefault();
          setShowSlashMenu(false);
        } else if (e.key.length === 1) {
          // Ajouter le caractère à la recherche
          setSlashMenuSearch(prev => prev + e.key);
          setSelectedSlashMenuItem(0);
        } else if (e.key === 'Backspace') {
          e.preventDefault();
          setSlashMenuSearch(prev => prev.slice(0, -1));
          setSelectedSlashMenuItem(0);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [textLines, copiedBlock, showSlashMenu, selectedSlashMenuItem]);

  // Fermer le menu contextuel quand on clique ailleurs
  useEffect(() => {
    const handleClickOutside = () => {
      if (showContextMenu) {
        handleCloseContextMenu();
      }
    };

    if (showContextMenu) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showContextMenu]);

  // Mettre à jour l'image dynamique quand le contenu change
  useEffect(() => {
    updateDynamicImage();
  }, [textLines]);

  // Sauvegarder automatiquement les textLines dans localStorage
  useEffect(() => {
    if (campaignId && textLines.length > 0) {
      localStorage.setItem(`lore_campaign_${campaignId}_textLines`, JSON.stringify(textLines));
      setSaveStatus('saved');
      setLastSaveTime(new Date());
    }
  }, [textLines, campaignId]);

  // Détecter les changements non sauvegardés
  useEffect(() => {
    if (textLines.length > 0) {
      setSaveStatus('unsaved');
    }
  }, [textLines]);

  // Sauvegarde automatique périodique
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      if (campaignId && textLines.length > 0 && saveStatus === 'unsaved') {
        localStorage.setItem(`lore_campaign_${campaignId}_textLines`, JSON.stringify(textLines));
        setSaveStatus('saved');
        setLastSaveTime(new Date());
        console.log('Sauvegarde automatique effectuée');
      }
    }, 30000); // Sauvegarde automatique toutes les 30 secondes

    return () => clearInterval(autoSaveInterval);
  }, [campaignId, textLines, saveStatus]);

  // Sauvegarde avant fermeture de la page
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (saveStatus === 'unsaved') {
        // Sauvegarder immédiatement
        if (campaignId && textLines.length > 0) {
          localStorage.setItem(`lore_campaign_${campaignId}_textLines`, JSON.stringify(textLines));
        }
        
        // Avertir l'utilisateur
        e.preventDefault();
        e.returnValue = 'Vous avez des modifications non sauvegardées. Êtes-vous sûr de vouloir quitter ?';
        return e.returnValue;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [saveStatus, campaignId, textLines]);

  // Mettre à jour les aperçus de quêtes et cartes marchand quand les données des templates changent
  useEffect(() => {
    const updatePreviews = () => {
      setTextLines(prev => {
        return prev.map(line => {
          if (line.type === 'quest-preview') {
            // Forcer la mise à jour en modifiant légèrement le contenu
            return { ...line, lastUpdate: Date.now() };
          }
          if (line.type === 'merchant-card-preview') {
            // Mettre à jour les données de la card marchand depuis les templates
            const templateDataMatch = line.content.match(/MERCHANT_CARD:(.+)/);
            if (templateDataMatch) {
              try {
                const currentTemplateData = JSON.parse(templateDataMatch[1]);
                // Récupérer les données mises à jour depuis localStorage
                const templates = JSON.parse(localStorage.getItem('lore-templates-data') || '[]');
                const updatedTemplate = templates.find(t => t.id === 'marchand' || t.name === 'Rencontre avec un marchand');
                
                if (updatedTemplate && updatedTemplate.inventory) {
                  const updatedContent = `MERCHANT_CARD:${JSON.stringify(updatedTemplate)}`;
                  return { ...line, content: updatedContent, lastUpdate: Date.now() };
                }
              } catch (error) {
                console.error('Erreur lors de la mise à jour de la card marchand:', error);
                // En cas d'erreur, retourner la ligne sans modification
                return line;
              }
            }
            return { ...line, lastUpdate: Date.now() };
          }
          
          if (line.type === 'combat-preview') {
            // Mettre à jour les données de la card combat depuis les templates
            const templateDataMatch = line.content.match(/APERÇU_COMBAT:(.+)/);
            if (templateDataMatch) {
              try {
                const currentTemplateData = JSON.parse(templateDataMatch[1]);
                // Récupérer les données mises à jour depuis localStorage
                const templates = JSON.parse(localStorage.getItem('lore-templates-data') || '[]');
                const updatedTemplate = templates.find(t => t.id === 'combat-simple' || t.name === 'Combat simple');
                
                if (updatedTemplate && updatedTemplate.enemies) {
                  const updatedContent = `APERÇU_COMBAT:${JSON.stringify(updatedTemplate)}`;
                  return { ...line, content: updatedContent, lastUpdate: Date.now() };
                }
              } catch (error) {
                console.error('Erreur lors de la mise à jour de la card combat:', error);
                // En cas d'erreur, retourner la ligne sans modification
                return line;
              }
            }
            return { ...line, lastUpdate: Date.now() };
          }
          
          if (line.type === 'combat-card-preview') {
            // Mettre à jour les données de la card combat depuis les templates
            const templateDataMatch = line.content.match(/COMBAT_CARD:(.+)/);
            if (templateDataMatch) {
              try {
                const currentTemplateData = JSON.parse(templateDataMatch[1]);
                // Récupérer les données mises à jour depuis localStorage
                const templates = JSON.parse(localStorage.getItem('lore-templates-data') || '[]');
                const updatedTemplate = templates.find(t => t.id === 'combat-simple' || t.name === 'Combat simple');
                
                if (updatedTemplate && updatedTemplate.enemies) {
                  const updatedContent = `COMBAT_CARD:${JSON.stringify(updatedTemplate)}`;
                  return { ...line, content: updatedContent, lastUpdate: Date.now() };
                }
              } catch (error) {
                console.error('Erreur lors de la mise à jour de la card combat:', error);
                // En cas d'erreur, retourner la ligne sans modification
                return line;
              }
            }
            return { ...line, lastUpdate: Date.now() };
          }
          return line;
        });
      });
    };

    // Écouter les changements dans localStorage pour les templates
    const interval = setInterval(() => {
      const currentQuestData = localStorage.getItem('lore-quests-categories');
      const currentTemplateData = localStorage.getItem('lore-templates-data');
      
      if (currentQuestData !== (window.lastQuestTemplateData || '') || 
          currentTemplateData !== (window.lastTemplateData || '')) {
        window.lastQuestTemplateData = currentQuestData;
        window.lastTemplateData = currentTemplateData;
        updatePreviews();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Fonction pour réinitialiser le contenu d'une campagne
  const resetCampaignContent = () => {
    if (campaignId) {
      const defaultContent = getTextContent(parseInt(campaignId));
      setTextLines(defaultContent);
      localStorage.removeItem(`lore_campaign_${campaignId}_textLines`);
      toast.success('Contenu de la campagne réinitialisé !');
    }
  };

  // Fonctions pour le copier-coller intelligent
  const copyBlock = (blockId) => {
    const block = textLines.find(line => line.id === blockId);
    if (block) {
      setCopiedBlock(block);
      setShowCopyNotification(true);
      setTimeout(() => setShowCopyNotification(false), 2000);
      
      // Copier dans le presse-papier du navigateur
      navigator.clipboard.writeText(JSON.stringify(block)).catch(err => {
        console.error('Erreur lors de la copie:', err);
      });
      
      toast.success('Bloc copié !');
    }
  };

  const pasteBlock = (targetIndex) => {
    if (copiedBlock) {
      const newBlock = {
        ...copiedBlock,
        id: Date.now(), // Nouvel ID unique
        content: copiedBlock.content
      };
      
      setTextLines((items) => {
        const newItems = [...items];
        newItems.splice(targetIndex, 0, newBlock);
        return newItems;
      });
      
      toast.success('Bloc collé !');
    } else {
      // Essayer de coller depuis le presse-papier
      navigator.clipboard.readText().then(text => {
        try {
          const block = JSON.parse(text);
          const newBlock = {
            ...block,
            id: Date.now(),
            content: block.content
          };
          
          setTextLines((items) => {
            const newItems = [...items];
            newItems.splice(targetIndex, 0, newBlock);
            return newItems;
          });
          
          toast.success('Bloc collé depuis le presse-papier !');
        } catch (error) {
          // Coller comme texte simple
          const newBlock = {
            id: Date.now(),
            content: text,
            section: 'situation',
            type: 'text',
            isLink: false,
            isHeading: false
          };
          
          setTextLines((items) => {
            const newItems = [...items];
            newItems.splice(targetIndex, 0, newBlock);
            return newItems;
          });
          
          toast.success('Texte collé !');
        }
      }).catch(err => {
        console.error('Erreur lors du collage:', err);
        toast.error('Erreur lors du collage');
      });
    }
  };

  // Fonctions pour le menu d'insertion rapide
  const handleSlashCommand = (e, blockId) => {
    if (e.key === '/' && e.target.textContent === '') {
      e.preventDefault();
      setSlashMenuTarget(blockId);
      setSlashMenuPosition({ x: e.clientX, y: e.clientY });
      setShowSlashMenu(true);
      setSlashMenuSearch('');
      setSelectedSlashMenuItem(0);
    }
  };

  const handleSlashMenuSelect = (item) => {
    if (item.type === 'table') {
      createTable(3, 3, slashMenuTarget);
    } else if (item.type === 'page') {
      createNewPage(item.content, slashMenuTarget);
    } else {
      // Créer un bloc normal
      const newLine = {
        id: Date.now(),
        content: item.content,
        section: 'situation',
        type: item.type,
        isLink: item.type === 'link',
        isHeading: item.type.startsWith('heading'),
        isSeparator: item.type === 'separator'
      };
      
      setTextLines((items) => {
        const newItems = [...items];
        const targetIndex = items.findIndex(item => item.id === slashMenuTarget);
        if (targetIndex !== -1) {
          newItems.splice(targetIndex + 1, 0, newLine);
        } else {
          newItems.push(newLine);
        }
        return newItems;
      });
    }
    
    setShowSlashMenu(false);
    toast.success(`${item.name} ajouté !`);
  };

  const createTable = (rows, cols, targetId) => {
    const table = {
      id: Date.now(),
      type: 'table',
      content: '',
      rows: rows,
      cols: cols,
      data: Array(rows).fill().map(() => Array(cols).fill('')),
      section: 'situation'
    };
    
    setTextLines((items) => {
      const newItems = [...items];
      const targetIndex = items.findIndex(item => item.id === targetId);
      if (targetIndex !== -1) {
        newItems.splice(targetIndex + 1, 0, table);
      } else {
        newItems.push(table);
      }
      return newItems;
    });
  };

  const createNewPage = (title, targetId) => {
    const newPage = {
      id: Date.now(),
      type: 'page',
      content: title,
      isPage: true,
      children: [],
      section: 'situation'
    };
    
    setTextLines((items) => {
      const newItems = [...items];
      const targetIndex = items.findIndex(item => item.id === targetId);
      if (targetIndex !== -1) {
        newItems.splice(targetIndex + 1, 0, newPage);
      } else {
        newItems.push(newPage);
      }
      return newItems;
    });
  };

  // Fonctions de navigation entre pages
  const navigateToPage = (pageId) => {
    const page = textLines.find(line => line.id === pageId && line.type === 'page');
    if (page) {
      // Sauvegarder la page actuelle dans l'historique
      if (currentPage) {
        setPageHistory(prev => [...prev, currentPage]);
      }
      setCurrentPage(page);
      toast.success(`Navigation vers: ${page.content}`);
    }
  };

  const goBackToMainPage = () => {
    if (pageHistory.length > 0) {
      const previousPage = pageHistory[pageHistory.length - 1];
      setPageHistory(prev => prev.slice(0, -1));
      setCurrentPage(previousPage);
    } else {
      setCurrentPage(null);
    }
  };

  const goToMainDashboard = () => {
    setCurrentPage(null);
    setPageHistory([]);
  };

  // Filtrer les éléments du menu d'insertion rapide
  const filteredSlashItems = slashMenuItems.filter(item => 
    item.name.toLowerCase().includes(slashMenuSearch.toLowerCase()) ||
    item.description.toLowerCase().includes(slashMenuSearch.toLowerCase())
  );

  // Charger les notifications au montage du composant
  useEffect(() => {
    const savedNotifications = JSON.parse(localStorage.getItem('lore_notifications') || '[]');
    setNotifications(savedNotifications);
  }, []);

  // Écouter les nouvelles notifications
  useEffect(() => {
    const handleNotificationAdded = (event) => {
      const newNotification = event.detail;
      setNotifications(prev => [newNotification, ...prev]);
    };

    window.addEventListener('notificationAdded', handleNotificationAdded);
    return () => window.removeEventListener('notificationAdded', handleNotificationAdded);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-primary-blue flex items-center justify-center">
        <div className="text-light text-xl">Chargement...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-primary-blue flex items-center justify-center">
        <div className="text-light text-xl">Erreur: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-blue">
      {/* Header Lore fixe */}
      <header className="flex items-center justify-between p-6 bg-primary-blue border-b border-light/10">
        <h1 className="text-4xl font-bold tracking-wider text-light eagle-lake-font">LORE</h1>
        
        <div className="flex items-center space-x-6">
          {/* Indicateur de sauvegarde */}
          <div className="flex items-center space-x-2">
            {saveStatus === 'saving' && (
              <div className="flex items-center space-x-2 text-yellow-400">
                <div className="w-3 h-3 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm">Sauvegarde...</span>
              </div>
            )}
            {saveStatus === 'saved' && (
              <div className="flex items-center space-x-2 text-green-400">
                <CheckCircle size={16} />
                <span className="text-sm">
                  Sauvegardé{lastSaveTime && ` à ${lastSaveTime.toLocaleTimeString()}`}
                </span>
              </div>
            )}
            {saveStatus === 'unsaved' && (
              <div className="flex items-center space-x-2 text-red-400">
                <AlertCircle size={16} />
                <span className="text-sm">Non sauvegardé</span>
              </div>
            )}
          </div>

          {/* Bouton de sauvegarde manuelle */}
          <button
            onClick={handleManualSave}
            disabled={saveStatus === 'saving'}
            className="flex items-center space-x-2 px-4 py-2 bg-golden text-[#552E1A] rounded-lg hover:bg-golden/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Sauvegarder manuellement"
          >
            <Save size={16} />
            <span className="text-sm font-medium">Sauvegarder</span>
          </button>

          {/* Navigation des pages */}
          {currentPage && (
            <div className="flex items-center space-x-2 text-golden">
              <button
                onClick={goToMainDashboard}
                className="hover:text-golden/80 transition-colors"
              >
                Dashboard
              </button>
              <span>/</span>
              <span>{currentPage.content}</span>
              <button
                onClick={goBackToMainPage}
                className="ml-2 px-2 py-1 bg-golden/20 hover:bg-golden/30 rounded text-sm transition-colors"
              >
                ← Retour
              </button>
            </div>
          )}
          
          {/* Bouton Sources hexagonal bleu */}
          <button onClick={() => setShowSources(true)} className="relative">
            <div className="w-12 h-12 bg-blue-500 transform rotate-45 rounded-sm flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
              <span className="text-white font-bold text-[10px] transform -rotate-45">Sources</span>
            </div>
          </button>
          {/* Bouton Joueurs hexagonal vert */}
          <button 
            onClick={() => setShowPlayers(true)}
            className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg transition-colors"
          >
            <Users size={20} />
          </button>
          
          {/* Bouton Notifications */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="bg-light/20 hover:bg-light/30 text-light p-3 rounded-lg transition-colors relative"
            >
              <Bell size={20} />
              {notifications.filter(n => !n.read).length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {notifications.filter(n => !n.read).length}
                </span>
              )}
            </button>
            
            {/* Dropdown Notifications */}
            {showNotifications && (
              <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-800">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-gray-500 text-center">Aucune notification</div>
                  ) : (
                    notifications.map(notification => (
                      <div 
                        key={notification.id} 
                        className={`p-4 border-b border-gray-100 hover:bg-gray-50 ${!notification.read ? 'bg-[#f7f1e5]' : ''}`}
                        onClick={() => {
                          // Marquer comme lu
                          const updatedNotifications = notifications.map(n => 
                            n.id === notification.id ? { ...n, read: true } : n
                          );
                          setNotifications(updatedNotifications);
                          localStorage.setItem('lore_notifications', JSON.stringify(updatedNotifications));
                        }}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${!notification.read ? 'bg-golden' : 'bg-gray-300'}`}></div>
                          <div className="flex-1">
                            <div className="font-medium text-gray-800">{notification.title}</div>
                            <div className="text-sm text-gray-600 mt-1">{notification.message}</div>
                            {notification.details && (
                              <div className="text-xs text-gray-500 mt-1 italic">"{notification.details}"</div>
                            )}
                            <div className="text-xs text-gray-400 mt-1">
                              {new Date(notification.timestamp).toLocaleString('fr-FR')}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                {notifications.length > 0 && (
                  <div className="p-3 border-t border-gray-200">
                    <button 
                      onClick={() => {
                        const allRead = notifications.map(n => ({ ...n, read: true }));
                        setNotifications(allRead);
                        localStorage.setItem('lore_notifications', JSON.stringify(allRead));
                      }}
                      className="text-sm text-black hover:text-gray-700"
                    >
                      Marquer tout comme lu
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Bouton Paramètres */}
          <button className="bg-light/20 hover:bg-light/30 text-light p-3 rounded-lg transition-colors">
            <Settings size={20} />
          </button>
          
          {/* Avatar utilisateur + menu */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setShowUserMenu(prev => !prev)}
              className="w-10 h-10 bg-golden rounded-full flex items-center justify-center text-dark font-bold focus:outline-none focus:ring-2 focus:ring-golden/60"
              title="Profil"
            >
              {user?.user_metadata?.username?.[0]?.toUpperCase() || 'U'}
            </button>

            {showUserMenu && (
              <div
                className="absolute right-0 mt-2 w-52 bg-[#F0EAE1] text-gray-800 rounded-lg shadow-xl border border-black/5 z-[9999] origin-top-right transform transition-all duration-150"
                style={{
                  boxShadow: '0px 12px 32px rgba(0,0,0,0.35), 0 2px 6px rgba(0,0,0,0.15)'
                }}
                onClick={(e) => e.stopPropagation()}
              >
              <div className="py-2">
                <button className="w-full text-left px-4 py-2 hover:bg-black/5 transition-colors">Profil</button>
                <button 
                  className="w-full text-left px-4 py-2 hover:bg-black/5 transition-colors"
                  onClick={() => {
                    setShowUserMenu(false);
                    navigate('/abonnement');
                  }}
                >
                  Abonnement
                </button>
                <button className="w-full text-left px-4 py-2 hover:bg-black/5 transition-colors">Stockage</button>
                <button className="w-full text-left px-4 py-2 hover:bg-black/5 transition-colors">Confidentialité</button>
                <div className="my-1 border-t border-black/10"></div>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-black/5 transition-colors text-red-700"
                  onClick={async () => {
                    try {
                      await supabase.auth.signOut();
                      // Forcer la redirection vers la page de connexion
                      window.location.href = '/';
                    } catch (e) {
                      console.error('Erreur de déconnexion:', e);
                      // Même en cas d'erreur, rediriger vers la page de connexion
                      window.location.href = '/';
                    } finally {
                      setShowUserMenu(false);
                    }
                  }}
                >
                  Déconnexion
                </button>
              </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="px-32 py-6">
        <nav className="flex items-center space-x-2 text-light/80">
          <button
            onClick={() => navigate('/campaigns')}
            className="hover:text-light transition-colors"
          >
            Mes campagnes
          </button>
          <ChevronRight size={16} className="text-light/60" />
          <span className="text-golden">
            {campaign?.title}
          </span>
        </nav>
      </div>

      {/* Titre principal */}
      <div className="px-32 mb-12 mt-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-4xl lg:text-5xl font-bold text-light eagle-lake-font border-b-2 border-golden pb-2 inline-block">
            {campaign?.title}
          </h2>
          
          {/* Boutons d'action */}
          <div className="flex items-center space-x-4">
            {/* Bouton Historique */}
            <div className="relative">
              <button
                onClick={() => setShowHistoryMenu(!showHistoryMenu)}
                className="bg-light/20 hover:bg-light/30 text-light px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
              >
                <Archive size={16} />
                <span>Historique</span>
                <ChevronRight size={14} className={`transform transition-transform ${showHistoryMenu ? 'rotate-90' : ''}`} />
              </button>
            </div>
            
            {/* Bouton Nouvelle partie */}
            <button 
              onClick={handleCreateNewSession}
              className="bg-golden hover:bg-golden/80 text-dark-blue px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 font-bold"
            >
              <Plus size={16} />
              <span>Nouvelle partie</span>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            {campaignData ? (
              <div>
                <h2 className="text-2xl font-bold text-light mb-2">{campaignData.title}</h2>
                <p className="text-light/80 text-lg">{campaignData.game_system} • {campaignData.universe}</p>
              </div>
            ) : (
              <p className="text-light/80 text-lg">{campaign?.game_system} • {campaign?.universe}</p>
            )}
          </div>
          <div className="text-right">
            <p className="text-light/60 text-sm">{new Date().toLocaleDateString('fr-FR')}</p>
          </div>
        </div>

        {/* Séparateur */}
        <div className="border-t border-light/20 mt-4"></div>
      </div>

      {/* Contenu principal */}
      <div className="px-32 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Zone centrale - 3 colonnes */}
          <div className="lg:col-span-3 space-y-12">
            {isDefaultCampaign ? (
              // Contenu pour "Les Échos de Nerath" (campagne existante)
              <>
            {/* Notes de campagne - Style Notion avec Drag & Drop */}
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
               <SortableContext items={textLines.map(line => line.id)} strategy={verticalListSortingStrategy}>
                <div className="space-y-12">
                  {/* Toutes les lignes dans un contexte unifié - Style Notion */}
                    <div className="pl-8">
                      <div className="space-y-1">
                        {/* Zone de drop au début */}
                        <DropZone 
          id="drop-start-all"
                          isActive={false}
                          onTemplateDrop={handleTemplateDrop}
                          targetIndex={0}
                        />
        {(currentPage ? [currentPage] : textLines).map((line, index) => (
                           <React.Fragment key={line.id}>
                             <SortableTextLine
                               id={line.id}
                               content={line.content}
                               section={line.section}
                               isLink={line.isLink}
                               linkUrl={line.linkUrl}
                               onPaste={handlePaste}
                               onShowContextMenu={handleShowContextMenu}
                               type={line.type}
                               isHeading={line.isHeading}
                               onEdit={handleEditLine}
                               onDelete={handleDeleteLine}
                               isEditing={editingLines[line.id]}
                               onContentChange={handleContentChange}
                            onAddNewLine={handleAddNewLine}
                            onMoveToSection={handleMoveLineToSection}
                            onSlashCommand={handleSlashCommand}
                             />
                          {index < textLines.length - 1 && (
                               <DropZone 
                                 id={`drop-${line.id}`} 
                                 isActive={activeId === line.id}
                                 onTemplateDrop={handleTemplateDrop}
                                 targetIndex={index + 1}
                               />
                             )}
                           </React.Fragment>
                         ))}
                        {/* Zone de drop à la fin */}
                        <DropZone 
        id="drop-end-all" 
                          isActive={false}
                          onTemplateDrop={handleTemplateDrop}
                          targetIndex={textLines.length}
                        />
                        
                        
                      </div>
                    </div>
                  </div>
</SortableContext>

{/* Notification de copie */}
{showCopyNotification && (
  <div className="fixed top-4 right-4 bg-golden text-white px-4 py-2 rounded-lg shadow-lg z-50 flex items-center gap-2">
    <span>📋</span>
    <span>Bloc copié !</span>
  </div>
)}

{/* Menu d'insertion rapide */}
{showSlashMenu && (
  <div 
    className="fixed bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-w-sm w-full"
    style={{ 
      left: Math.min(slashMenuPosition.x, window.innerWidth - 320),
      top: Math.min(slashMenuPosition.y, window.innerHeight - 400)
    }}
  >
    <div className="p-3 border-b border-gray-100">
      <input
        type="text"
        placeholder="Rechercher..."
        value={slashMenuSearch}
        onChange={(e) => setSlashMenuSearch(e.target.value)}
        className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-golden"
        autoFocus
                        />
                      </div>
    <div className="max-h-80 overflow-y-auto">
      {filteredSlashItems.map((item, index) => (
        <div
          key={item.id}
          className={`px-4 py-3 cursor-pointer flex items-center gap-3 hover:bg-gray-50 ${
            index === selectedSlashMenuItem ? 'bg-golden/10 border-r-2 border-golden' : ''
          }`}
          onClick={() => handleSlashMenuSelect(item)}
        >
          <span className="text-lg">{item.icon}</span>
          <div className="flex-1">
            <div className="font-medium text-gray-900">{item.name}</div>
            <div className="text-sm text-gray-500">{item.description}</div>
                    </div>
          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
            {item.category}
          </span>
                  </div>
      ))}
      {filteredSlashItems.length === 0 && (
        <div className="px-4 py-3 text-gray-500 text-center">
          Aucun élément trouvé
                </div>
      )}
    </div>
  </div>
)}
              
               <DragOverlay>
                 {draggedItem ? (
                   <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-gray-300">
                     <p className="text-gray-800 text-sm">
                       {draggedItem.content}
                     </p>
                   </div>
                 ) : null}
               </DragOverlay>

               {/* Quête majeure - Lien simple */}
               <div className="pl-8">
                 <button
                   onClick={() => navigate(`/campaigns/${campaignId}/quest/major`)}
                   className="flex items-center space-x-2 text-golden hover:text-golden/80 transition-colors"
                 >
                   <Link size={16} />
                   <span className="font-semibold">{campaign?.queteMajeure}</span>
                 </button>
               </div>


            </DndContext>
              </>
            ) : (
              // Contenu pour les nouvelles campagnes (vide, à remplir)
              <div className="text-center py-16">
                <div className="bg-light/10 backdrop-blur-sm rounded-2xl p-8 border border-light/20">
                  <BookOpen size={64} className="text-light/60 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-light mb-2">Votre campagne vous attend</h2>
                  <p className="text-light/70 mb-6">
                    Commencez à écrire votre histoire en utilisant les templates à droite ou en tapant directement ici.
                  </p>
                  <div className="text-sm text-light/60">
                    <p>• Utilisez <kbd className="bg-light/20 px-2 py-1 rounded">/</kbd> pour insérer des éléments</p>
                    <p>• Glissez-déposez des templates depuis le panneau de droite</p>
                    <p>• Le chatbot IA est là pour vous aider</p>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Sidebar droite - 1 colonne */}
          <div className="lg:col-span-1 space-y-6 lg:space-y-8">

            {/* Image dynamique basée sur les mentions */}
            <div className="bg-light/15 backdrop-blur-sm rounded-2xl p-4 border border-light/20 shadow-xl">
              <div className="aspect-square bg-gradient-to-br from-primary-blue to-dark-blue rounded-lg flex items-center justify-center relative overflow-hidden group cursor-pointer transition-all duration-200 hover:shadow-lg">
                {isDefaultCampaign && currentMentionImage ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <img 
                      src={currentMentionImage} 
                      alt={currentMentionName}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute bottom-2 left-2 right-2 bg-black/70 rounded px-2 py-1">
                      <div className="text-xs text-light font-semibold truncate">{currentMentionName}</div>
                      <div className="text-xs text-light/80 truncate">{currentMentionType}</div>
                    </div>
                  </div>
                ) : (
                  <>
                    <Moon size={48} className="text-light/60 mb-2" />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-blue/50 to-transparent"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="bg-black/50 rounded-lg p-3 text-center">
                        <Upload size={24} className="text-light mx-auto mb-2" />
                        <div className="text-sm text-light">Cliquez pour importer</div>
                        <div className="text-xs text-light/80">JPG, PNG, GIF (max 5MB)</div>
                      </div>
                    </div>
                    <div className="absolute bottom-2 left-2 right-2 text-center">
                      <div className="text-sm text-light/80">
                        {isDefaultCampaign ? 'Aucune mention détectée' : 'Image de campagne'}
                      </div>
                      <div className="text-xs text-light/60 mt-1">
                        {isDefaultCampaign ? 'L\'image apparaîtra automatiquement' : 'Ajoutez une image pour votre campagne'}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>


          </div>
        </div>
      </div>

      {/* Modal Historique */}
      <HistoryModal isOpen={showHistoryMenu} onClose={() => setShowHistoryMenu(false)} />

       {/* Panneau de suggestions IA */}
       {showSuggestions && (
         <SuggestionsPanel
           suggestions={suggestions}
           onClose={closeSuggestions}
           onApplySuggestion={applySuggestion}
         />
       )}

       {/* Menu contextuel style Notion avec recherche */}
       {showContextMenu && (
         <div 
           className="fixed bg-white rounded-lg shadow-xl border border-gray-200 z-50 min-w-[280px] max-w-[320px]"
           style={{ 
             left: contextMenuPosition.x, 
             top: contextMenuPosition.y
           }}
           onClick={(e) => e.stopPropagation()}
           onKeyDown={handleContextMenuKeyDown}
           tabIndex={-1}
         >
           {/* Barre de recherche */}
           <div className="px-3 py-2 border-b border-gray-100">
             <div className="flex items-center space-x-2">
               <Search size={14} className="text-gray-400" />
               <input
                 type="text"
                 placeholder="Rechercher un template..."
                 value={contextMenuSearch}
                 onChange={(e) => {
                   setContextMenuSearch(e.target.value);
                   setSelectedContextMenuItem(0);
                 }}
                 className="flex-1 text-sm border-none outline-none bg-transparent text-gray-900 placeholder-gray-500"
                 autoFocus
               />
             </div>
           </div>

           {/* Liste des templates */}
           <div className="max-h-64 overflow-y-auto py-1">
             {(() => {
               const filteredTemplates = getFilteredTemplates();
               return filteredTemplates.length > 0 ? (
                 filteredTemplates.map((template, index) => (
                 <button
                   key={template.id}
                   onClick={() => handleAddElement(template.type)}
                   className={`w-full text-left px-3 py-2 text-sm flex items-center space-x-3 transition-colors ${
                     index === selectedContextMenuItem 
                       ? 'bg-blue-50 text-blue-700' 
                       : 'hover:bg-gray-50 text-gray-900'
                   }`}
                 >
                   <span className="text-lg flex-shrink-0">{template.icon}</span>
                   <div className="flex-1 min-w-0">
                     <div className="font-medium truncate">{template.name}</div>
                     <div className="text-xs text-gray-600 truncate">{template.description}</div>
                     <div className="text-xs text-gray-500 truncate">{template.category}</div>
                   </div>
                 </button>
                 ))
               ) : (
                 <div className="px-3 py-4 text-sm text-gray-700 text-center">
                   Aucun template trouvé
                 </div>
               );
             })()}
           </div>

           {/* Footer avec raccourcis */}
           <div className="px-3 py-2 border-t border-gray-100 bg-gray-50 rounded-b-lg">
             <div className="flex items-center justify-between text-xs text-gray-700">
               <span>↑↓ Naviguer</span>
               <span>↵ Sélectionner</span>
               <span>Esc Fermer</span>
             </div>
           </div>
         </div>
       )}

       {/* Chatbot IA Panel */}
       <ChatbotPanel 
         campaign={campaign}
         universe={campaign?.univers}
         rules={campaign?.regles}
       />

       {/* Template Panel avec languettes */}
      <TemplatePanel 
        characterAssignments={characterAssignments}
        onUpdateAssignments={setCharacterAssignments}
        campaignPlayers={campaignPlayers}
      />

      {/* Modal Sources */}
      <SourcesModal isOpen={showSources} onClose={() => setShowSources(false)} />

      {/* Modal Players */}
      <PlayersModal 
        isOpen={showPlayers} 
        onClose={() => setShowPlayers(false)}
        characterAssignments={characterAssignments}
        onRemoveAssignment={(playerId) => {
          setCharacterAssignments(prev => {
            const newAssignments = { ...prev };
            delete newAssignments[playerId];
            return newAssignments;
          });
        }}
        campaignPlayers={campaignPlayers}
        onUpdatePlayers={(updatedPlayers) => {
          setCampaignPlayers(updatedPlayers);
          // Sauvegarder les changements dans la campagne spécifique
          saveCampaignPlayers(updatedPlayers);
        }}
        onUpdateAssignments={setCharacterAssignments}
        onRemovePlayer={(playerId) => {
          const updatedPlayers = campaignPlayers.filter(player => player.id !== playerId);
          setCampaignPlayers(updatedPlayers);
          saveCampaignPlayers(updatedPlayers);
          
          // Supprimer aussi l'assignation si elle existe
          setCharacterAssignments(prev => {
            const newAssignments = { ...prev };
            delete newAssignments[playerId];
            return newAssignments;
          });
        }}
      />
     </div>
   );
 };

export default CampaignDashboard;
