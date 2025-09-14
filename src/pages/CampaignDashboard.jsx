import React, { useState, useEffect } from 'react';
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
import toast from 'react-hot-toast';

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

// Composant pour les lignes de texte draggables
const SortableTextLine = ({ id, content, section, isLink, linkUrl, onPaste, onShowContextMenu, type, isHeading, onEdit, onDelete, isEditing, onContentChange }) => {
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

  const handleClick = () => {
    if (isLink && linkUrl) {
      window.open(linkUrl, '_blank');
    }
  };

  const handlePlusClick = (e) => {
    e.stopPropagation();
    if (onShowContextMenu) {
      onShowContextMenu(e, id);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group relative"
      onPaste={onPaste}
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

      {/* Boutons d'édition et suppression - Visible au survol */}
      <div className="absolute right-[-60px] top-1 flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-all duration-200 z-10">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit && onEdit(id, true);
          }}
          className="w-4 h-4 flex items-center justify-center bg-blue-100/80 hover:bg-blue-200/90 rounded-sm transition-colors"
          title="Éditer"
        >
          <Edit2 size={10} className="text-blue-600 hover:text-blue-800" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete && onDelete(id);
          }}
          className="w-4 h-4 flex items-center justify-center bg-red-100/80 hover:bg-red-200/90 rounded-sm transition-colors"
          title="Supprimer"
        >
          <X size={10} className="text-red-600 hover:text-red-800" />
        </button>
      </div>

      {/* Contenu */}
      {isEditing ? (
        <div className="pl-8 space-y-2">
          <textarea
            value={content}
            onChange={(e) => onContentChange && onContentChange(id, e.target.value)}
            className="w-full p-2 border border-gray-200 rounded resize-none focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 bg-white text-gray-900"
            rows={3}
            autoFocus
            placeholder="Tapez votre contenu..."
          />
          {isLink && (
            <div className="space-y-2">
              <label className="text-sm text-gray-600">URL du lien :</label>
              <input
                type="url"
                value={linkUrl || ''}
                onChange={(e) => onContentChange && onContentChange(id, content, e.target.value)}
                className="w-full p-2 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 bg-white text-gray-900"
                placeholder="https://..."
              />
            </div>
          )}
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit && onEdit(id, false)}
              className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 transition-colors"
            >
              ✓ Sauvegarder
            </button>
            <button
              onClick={() => onDelete && onDelete(id)}
              className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600 transition-colors"
            >
              ✕ Supprimer
            </button>
          </div>
        </div>
      ) : isHeading ? (
        type === 'heading1' ? (
          <h1 
            className={`leading-relaxed pl-8 text-3xl font-bold text-light ${isLink ? 'text-golden hover:text-golden/80 cursor-pointer underline' : ''}`}
            onClick={handleClick}
          >
            {isLink && <Link size={14} className="inline mr-2" />}
            {content}
          </h1>
        ) : type === 'heading2' ? (
          <h2 
            className={`leading-relaxed pl-8 text-2xl font-bold text-light ${isLink ? 'text-golden hover:text-golden/80 cursor-pointer underline' : ''}`}
            onClick={handleClick}
          >
            {isLink && <Link size={14} className="inline mr-2" />}
            {content}
          </h2>
        ) : type === 'heading3' ? (
          <h3 
            className={`leading-relaxed pl-8 text-xl font-bold text-light ${isLink ? 'text-golden hover:text-golden/80 cursor-pointer underline' : ''}`}
            onClick={handleClick}
          >
            {isLink && <Link size={14} className="inline mr-2" />}
            {content}
          </h3>
        ) : (
          <div 
            className={`leading-relaxed pl-8 text-light ${isLink ? 'text-golden hover:text-golden/80 cursor-pointer underline' : ''}`}
            onClick={handleClick}
          >
            {isLink && <Link size={14} className="inline mr-2" />}
            {content}
          </div>
        )
      ) : type === 'separator' ? (
        <div className="flex items-center my-4 pl-8">
          <div className="flex-1 h-px bg-light/30"></div>
          <span className="px-3 text-light/60 text-sm">---</span>
          <div className="flex-1 h-px bg-light/30"></div>
        </div>
      ) : (
        <div 
          className={`leading-relaxed pl-8 ${isLink ? 'text-golden hover:text-golden/80 cursor-pointer underline' : 'text-light'}`}
          onClick={handleClick}
        >
          {content.split(/(\*\*.*?\*\*)/).map((part, index) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              const text = part.slice(2, -2);
              return (
                <strong key={index} className="text-golden cursor-pointer hover:text-golden/80">
                  {text}
                </strong>
              );
            }
            return part;
          })}
        </div>
      )}
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


// Composant pour la card quêtes draggable
const DraggableQuestCard = ({ campaign, onShowContextMenu, id, onEdit, onDelete, isEditing }) => {
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
      className="group relative bg-slate-800/40 backdrop-blur-md rounded-xl p-6 border border-slate-700/50 shadow-2xl max-w-sm"
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
        onClick={(e) => onShowContextMenu && onShowContextMenu(e, 'quest-card')}
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

      <h3 className="text-lg font-bold text-light eagle-lake-font mb-4">Quêtes</h3>
      
      <div className="space-y-4">
        {/* Quête majeure */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span className="text-white font-medium">Major quest</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-white">50%</span>
              <ChevronRight size={16} className="text-white" />
            </div>
          </div>
          <div className="w-full bg-gray-600 rounded-full h-2">
            <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '50%' }}></div>
          </div>
        </div>

        {/* Quêtes mineures */}
        {campaign?.quests?.map((quest, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  quest.status === 'completed' ? 'bg-green-500' :
                  quest.status === 'in_progress' ? 'bg-yellow-500' : 'bg-red-500'
                }`}></div>
                <span className="text-white font-medium">{quest.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-white">{quest.completed}/{quest.total}</span>
                <ChevronRight size={16} className="text-white" />
              </div>
            </div>
            <div className="w-full bg-gray-600 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${
                  quest.status === 'completed' ? 'bg-green-500' :
                  quest.status === 'in_progress' ? 'bg-yellow-500' : 'bg-red-500'
                }`} 
                style={{ width: `${(quest.completed / quest.total) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
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

      <h3 className="text-xl font-bold text-light eagle-lake-font mb-4">{campaign?.rencontre.title}</h3>
      
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
  const [selectedSessions, setSelectedSessions] = useState([]);
  const [sessions, setSessions] = useState([]);

  // États pour le système de mentions dynamiques
  const [currentMentionImage, setCurrentMentionImage] = useState(null);
  const [currentMentionName, setCurrentMentionName] = useState('');
  const [currentMentionType, setCurrentMentionType] = useState('');

  // États pour le drag & drop
  const [activeId, setActiveId] = useState(null);
  const [draggedItem, setDraggedItem] = useState(null);
  const [textLines, setTextLines] = useState([
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
  ]);

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
    { id: 'context-separator', type: 'separator', name: 'Séparateur', icon: '---', description: 'Ligne de séparation', content: '---', category: 'Formatage' }
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

  // Données de campagne d'exemple
  useEffect(() => {
    const mockCampaign = {
      id: campaignId,
      title: 'Les Gardiens de la Flamme Éternelle',
      universe: 'Royaume de Cendres',
      game_system: 'D&D 5e',
      queteMajeure: 'Récupérer la Flamme Éternelle',
      rencontre: {
        title: 'Rencontre avec un marchand',
        content: 'Un marchand mystérieux propose des objets magiques aux héros dans les ruines anciennes.',
        npc: 'Marcus le Marchand'
      },
      quests: [
        { type: 'major', name: 'Major quest', completed: 1, total: 2, status: 'in_progress' },
        { type: 'minor', name: 'Minor quest', completed: 5, total: 5, status: 'completed' },
        { type: 'minor', name: 'Minor quest', completed: 4, total: 4, status: 'completed' },
        { type: 'minor', name: 'Minor quest', completed: 2, total: 4, status: 'in_progress' },
        { type: 'minor', name: 'Minor quest', completed: 0, total: 1, status: 'not_started' }
      ]
    };
    setCampaign(mockCampaign);
    setLoading(false);
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
      setTextLines((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        
        if (oldIndex !== -1 && newIndex !== -1) {
          // Logique pour drop entre les éléments
          const newItems = [...items];
          const [movedItem] = newItems.splice(oldIndex, 1);
          
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
      
      setTextLines((items) => {
        const newItems = [...items];
        newItems.push(newLine);
        return newItems;
      });
      
      toast.success(`Lien ${type} ajouté avec succès !`);
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
    setTextLines(prev => prev.map(line => 
      line.id === id ? { 
        ...line, 
        content: newContent,
        ...(newLinkUrl !== null && { linkUrl: newLinkUrl })
      } : line
    ));
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
          content: '---',
          section: 'situation',
          type: 'separator',
          template: true,
          isSeparator: true
        };
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

  // Fermer les suggestions avec Échap uniquement
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Échap : Fermer les suggestions et le menu contextuel
      if (e.key === 'Escape') {
        closeSuggestions();
        handleCloseContextMenu();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

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
          {/* Bouton News hexagonal vert */}
          <button className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg transition-colors">
            <Newspaper size={20} />
          </button>
          
          {/* Bouton Notifications */}
          <button className="bg-light/20 hover:bg-light/30 text-light p-3 rounded-lg transition-colors">
            <Bell size={20} />
          </button>
          
          {/* Bouton Paramètres */}
          <button className="bg-light/20 hover:bg-light/30 text-light p-3 rounded-lg transition-colors">
            <Settings size={20} />
          </button>
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
            <p className="text-light/80 text-lg">{campaign?.game_system} • {campaign?.universe}</p>
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
            {/* Notes de campagne - Style Notion avec Drag & Drop */}
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
               <SortableContext items={[...textLines.map(line => line.id), 'merchant-card']} strategy={verticalListSortingStrategy}>
                <div className="space-y-12">
                  {/* Section Situation initiale */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-light calligraphy-font italic">Situation initiale</h3>
                    <div className="pl-8">
                      <div className="space-y-1">
                        {/* Zone de drop au début */}
                        <DropZone 
                          id="drop-start-situation" 
                          isActive={false}
                          onTemplateDrop={handleTemplateDrop}
                          targetIndex={0}
                        />
                         {textLines.filter(line => line.section === 'situation').map((line, index, array) => (
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
                             />
                             {index < array.length - 1 && (
                               <DropZone 
                                 id={`drop-${line.id}`} 
                                 isActive={activeId === line.id}
                                 onTemplateDrop={handleTemplateDrop}
                                 targetIndex={textLines.findIndex(l => l.id === line.id) + 1}
                               />
                             )}
                           </React.Fragment>
                         ))}
                        {/* Zone de drop à la fin */}
                        <DropZone 
                          id="drop-end-situation" 
                          isActive={false}
                          onTemplateDrop={handleTemplateDrop}
                          targetIndex={textLines.length}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section Début de la partie */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-light calligraphy-font italic">Début de la partie</h3>
                    <div className="pl-8">
                      <div className="space-y-1">
                        {/* Zone de drop au début */}
                        <DropZone 
                          id="drop-start-debut" 
                          isActive={false}
                          onTemplateDrop={handleTemplateDrop}
                          targetIndex={textLines.filter(line => line.section === 'situation').length}
                        />
                         {textLines.filter(line => line.section === 'debut').map((line, index, array) => (
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
                             />
                             {index < array.length - 1 && (
                               <DropZone 
                                 id={`drop-${line.id}`} 
                                 isActive={activeId === line.id}
                                 onTemplateDrop={handleTemplateDrop}
                                 targetIndex={textLines.findIndex(l => l.id === line.id) + 1}
                               />
                             )}
                           </React.Fragment>
                         ))}
                        {/* Zone de drop à la fin */}
                        <DropZone 
                          id="drop-end-debut" 
                          isActive={false}
                          onTemplateDrop={handleTemplateDrop}
                          targetIndex={textLines.length}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </SortableContext>
              
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

               {/* Cartes et templates - Style Notion */}
               <div className="pl-8 space-y-4">
                 <DraggableMerchantCard
                   id="merchant-card"
                   campaign={campaign}
                   merchantInventory={merchantInventory}
                   onShowContextMenu={handleShowContextMenu}
                   onPaste={handlePaste}
                   onEdit={handleEditCard}
                   onDelete={handleDeleteCard}
                   isEditing={editingCards['merchant-card']}
                   editingTotal={editingTotal}
                   totalValue={totalValue}
                   setTotalValue={setTotalValue}
                   handleSaveTotal={handleSaveTotal}
                   handleCancelTotalEdit={handleCancelTotalEdit}
                   handleEditTotal={handleEditTotal}
                   getTotalValue={getTotalValue}
                   editingTableField={editingTableField}
                   editingTableValue={editingTableValue}
                   setEditingTableValue={setEditingTableValue}
                   handleSaveTableField={handleSaveTableField}
                   handleCancelTableEdit={handleCancelTableEdit}
                   handleEditTableField={handleEditTableField}
                   handleDeleteItem={handleDeleteItem}
                   handleAddItem={handleAddItem}
                 />
               </div>

            </DndContext>

          </div>

          {/* Sidebar droite - 1 colonne */}
          <div className="lg:col-span-1 space-y-6 lg:space-y-8">

            {/* Image dynamique basée sur les mentions */}
            <div className="bg-light/15 backdrop-blur-sm rounded-2xl p-4 border border-light/20 shadow-xl">
              <div className="aspect-square bg-gradient-to-br from-primary-blue to-dark-blue rounded-lg flex items-center justify-center relative overflow-hidden group cursor-pointer transition-all duration-200 hover:shadow-lg">
                {currentMentionImage ? (
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
                      <div className="text-sm text-light/80">Aucune mention détectée</div>
                      <div className="text-xs text-light/60 mt-1">L'image apparaîtra automatiquement</div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Card Quêtes */}
            <DraggableQuestCard
              id="quest-card"
              campaign={campaign}
              onShowContextMenu={handleShowContextMenu}
              onEdit={handleEditCard}
              onDelete={handleDeleteCard}
              isEditing={editingCards['quest-card']}
            />

          </div>
        </div>
      </div>

      {/* Modal Historique */}
      {showHistoryMenu && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]" onClick={() => setShowHistoryMenu(false)}>
          <div className="bg-white rounded-lg shadow-xl border border-gray-200 w-full max-w-4xl max-h-[80vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-semibold text-gray-800">Sessions historiques</h3>
                <button
                  onClick={() => setShowHistoryMenu(false)}
                  className="text-gray-400 hover:text-gray-600 p-2"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                {sessions.map((session) => (
                  <div
                    key={session.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                      selectedSessions.includes(session.id)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleSessionSelect(session.id)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-800 text-sm">{session.title}</h4>
                      <input
                        type="checkbox"
                        checked={selectedSessions.includes(session.id)}
                        onChange={() => handleSessionSelect(session.id)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </div>
                    <div className="text-xs text-gray-600 mb-2">
                      <div className="flex items-center space-x-2 mb-1">
                        <span>📅 {session.date}</span>
                        <span>⏱️ {session.duration}</span>
                      </div>
                      <div className="mb-2">
                        <span className="text-xs text-gray-500">
                          Joueurs: {session.players.join(', ')}
                        </span>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        session.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : session.status === 'in_progress'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {session.status === 'completed' ? 'Terminée' : 
                         session.status === 'in_progress' ? 'En cours' : 'Planifiée'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-700 line-clamp-3">{session.summary}</p>
                  </div>
                ))}
              </div>
              
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
                <span className="text-sm text-gray-600">
                  {selectedSessions.length} session(s) sélectionnée(s)
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedSessions([])}
                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Tout désélectionner
                  </button>
                  <button
                    onClick={handleViewSelectedSessions}
                    className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm transition-colors"
                  >
                    Voir les sessions
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
       <TemplatePanel />
     </div>
   );
 };

export default CampaignDashboard;
