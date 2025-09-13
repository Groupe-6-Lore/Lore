import React, { useState, useCallback, useMemo } from 'react';
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
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GripVertical, 
  Plus, 
  Edit2, 
  Trash2, 
  Link,
  Image,
  FileText,
  Calendar,
  Users,
  Package,
  Search,
  X
} from 'lucide-react';
import toast from 'react-hot-toast';

// Composant pour un bloc éditable
const EditableBlock = ({ 
  id, 
  type, 
  content, 
  isEditing, 
  onEdit, 
  onDelete, 
  onContentChange,
  onInsertAfter,
  children 
}) => {
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
  };

  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });

  const handleContextMenu = (e) => {
    e.preventDefault();
    setContextMenuPosition({ x: e.clientX, y: e.clientY });
    setShowContextMenu(true);
  };

  const getBlockIcon = (blockType) => {
    switch (blockType) {
      case 'text': return <FileText size={16} />;
      case 'heading': return <FileText size={16} />;
      case 'image': return <Image size={16} />;
      case 'card': return <Package size={16} />;
      case 'link': return <Link size={16} />;
      default: return <FileText size={16} />;
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`editable-line group ${isDragging ? 'dragging' : ''}`}
      onContextMenu={handleContextMenu}
    >
      {/* Drag Handle - Très discret */}
      <div
        className="drag-handle"
        {...attributes}
        {...listeners}
      >
        <GripVertical size={12} />
      </div>

      {/* Bouton d'insertion - Très discret */}
      <div className="insert-button">
        <Plus size={10} />
      </div>

      {/* Contenu du bloc - Pas de padding supplémentaire */}
      <div className="line-content">
        {isEditing ? (
          <div className="space-y-2">
            <textarea
              value={content}
              onChange={(e) => onContentChange(id, e.target.value)}
              className="w-full p-2 border border-gray-200 rounded resize-none focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
              rows={3}
              autoFocus
              placeholder="Tapez votre contenu..."
            />
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(id, false)}
                className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 transition-colors"
              >
                ✓
              </button>
              <button
                onClick={() => onDelete(id)}
                className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600 transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
        ) : (
          <div 
            className="cursor-pointer hover:bg-gray-50/30 p-1 rounded-sm transition-colors duration-200"
            onClick={() => onEdit(id, true)}
          >
            <div className="text-gray-800 leading-relaxed">
              {content || <span className="text-gray-400 italic">Cliquez pour éditer...</span>}
            </div>
          </div>
        )}
      </div>

      {/* Menu contextuel */}
      {showContextMenu && (
        <div
          className="context-menu"
          style={{
            left: contextMenuPosition.x,
            top: contextMenuPosition.y,
          }}
        >
          <button
            className="context-menu-item"
            onClick={() => {
              onEdit(id, true);
              setShowContextMenu(false);
            }}
          >
            <Edit2 size={14} />
            <span>Modifier</span>
          </button>
          <button
            className="context-menu-item"
            onClick={() => {
              onInsertAfter(id, 'text');
              setShowContextMenu(false);
            }}
          >
            <Plus size={14} />
            <span>Insérer après</span>
          </button>
          <hr className="my-1" />
          <button
            className="context-menu-item text-red-600"
            onClick={() => {
              onDelete(id);
              setShowContextMenu(false);
            }}
          >
            <Trash2 size={14} />
            <span>Supprimer</span>
          </button>
        </div>
      )}
    </div>
  );
};

// Composant principal de l'éditeur
const NotionStyleEditor = ({ initialBlocks = [], onBlocksChange }) => {
  const [blocks, setBlocks] = useState(initialBlocks);
  const [activeId, setActiveId] = useState(null);
  const [showSlashMenu, setShowSlashMenu] = useState(false);
  const [slashMenuPosition, setSlashMenuPosition] = useState({ x: 0, y: 0 });
  const [editingBlock, setEditingBlock] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Templates disponibles pour le menu slash
  const slashTemplates = [
    { id: 'text', name: 'Texte', icon: <FileText size={16} />, description: 'Bloc de texte simple' },
    { id: 'heading', name: 'Titre', icon: <FileText size={16} />, description: 'Titre de section' },
    { id: 'image', name: 'Image', icon: <Image size={16} />, description: 'Insérer une image' },
    { id: 'card', name: 'Carte', icon: <Package size={16} />, description: 'Carte interactive' },
    { id: 'link', name: 'Lien', icon: <Link size={16} />, description: 'Lien externe' },
  ];

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setBlocks((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        const newBlocks = arrayMove(items, oldIndex, newIndex);
        onBlocksChange?.(newBlocks);
        return newBlocks;
      });
    }

    setActiveId(null);
  };

  const handleEdit = useCallback((id, isEditing) => {
    setEditingBlock(isEditing ? id : null);
  }, []);

  const handleContentChange = useCallback((id, newContent) => {
    setBlocks(prev => {
      const newBlocks = prev.map(block => 
        block.id === id ? { ...block, content: newContent } : block
      );
      onBlocksChange?.(newBlocks);
      return newBlocks;
    });
  }, [onBlocksChange]);

  const handleDelete = useCallback((id) => {
    setBlocks(prev => {
      const newBlocks = prev.filter(block => block.id !== id);
      onBlocksChange?.(newBlocks);
      return newBlocks;
    });
    toast.success('Bloc supprimé');
  }, [onBlocksChange]);

  const handleInsertAfter = useCallback((afterId, type) => {
    const newBlock = {
      id: `block-${Date.now()}`,
      type,
      content: '',
    };

    setBlocks(prev => {
      const afterIndex = prev.findIndex(block => block.id === afterId);
      const newBlocks = [
        ...prev.slice(0, afterIndex + 1),
        newBlock,
        ...prev.slice(afterIndex + 1)
      ];
      onBlocksChange?.(newBlocks);
      return newBlocks;
    });

    // Éditer le nouveau bloc
    setTimeout(() => handleEdit(newBlock.id, true), 100);
  }, [onBlocksChange, handleEdit]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === '/') {
      setSlashMenuPosition({ x: e.clientX, y: e.clientY });
      setShowSlashMenu(true);
    }
  }, []);

  const handleSlashMenuSelect = useCallback((template) => {
    const newBlock = {
      id: `block-${Date.now()}`,
      type: template.id,
      content: '',
    };

    setBlocks(prev => {
      const newBlocks = [...prev, newBlock];
      onBlocksChange?.(newBlocks);
      return newBlocks;
    });

    setShowSlashMenu(false);
    setTimeout(() => handleEdit(newBlock.id, true), 100);
  }, [onBlocksChange, handleEdit]);

  // Fermer les menus au clic extérieur
  React.useEffect(() => {
    const handleClickOutside = () => {
      setShowSlashMenu(false);
    };

    if (showSlashMenu) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showSlashMenu]);

  return (
    <div className="notion-editor" onKeyDown={handleKeyDown}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={blocks.map(block => block.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            <AnimatePresence>
              {blocks.map((block) => (
                <motion.div
                  key={block.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <EditableBlock
                    id={block.id}
                    type={block.type}
                    content={block.content}
                    isEditing={editingBlock === block.id}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onContentChange={handleContentChange}
                    onInsertAfter={handleInsertAfter}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </SortableContext>

        <DragOverlay>
          {activeId ? (
            <div className="opacity-50 transform rotate-2">
              {blocks.find(block => block.id === activeId) && (
                <EditableBlock
                  id={activeId}
                  type={blocks.find(block => block.id === activeId).type}
                  content={blocks.find(block => block.id === activeId).content}
                  isEditing={false}
                  onEdit={() => {}}
                  onDelete={() => {}}
                  onContentChange={() => {}}
                  onInsertAfter={() => {}}
                />
              )}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Menu slash - Version discrète */}
      {showSlashMenu && (
        <div
          className="slash-menu"
          style={{
            left: slashMenuPosition.x,
            top: slashMenuPosition.y,
          }}
        >
          <div className="px-3 py-2 border-b border-gray-100">
            <div className="flex items-center space-x-2">
              <Search size={14} className="text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher..."
                className="flex-1 text-sm border-none outline-none"
                autoFocus
              />
            </div>
          </div>
          <div className="max-h-48 overflow-y-auto">
            {slashTemplates.map((template) => (
              <button
                key={template.id}
                onClick={() => handleSlashMenuSelect(template)}
                className="slash-menu-item"
              >
                {template.icon}
                <div className="flex-1">
                  <div className="font-medium text-sm">{template.name}</div>
                  <div className="text-xs text-gray-400">{template.description}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Zone d'ajout rapide - Discrète */}
      <div className="mt-2 p-2 border border-dashed border-gray-200 rounded text-center">
        <p className="text-gray-400 text-xs mb-1">Tapez / pour insérer un nouveau bloc</p>
        <button
          onClick={() => setShowSlashMenu(true)}
          className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-2 py-1 rounded text-xs transition-colors"
        >
          <Plus size={12} className="inline mr-1" />
          +
        </button>
      </div>
    </div>
  );
};

export default NotionStyleEditor;
