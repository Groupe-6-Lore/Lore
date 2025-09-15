import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  GripVertical, 
  Plus, 
  Edit2, 
  Trash2, 
  Link,
  Image,
  FileText,
  Package,
  Search,
  X,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import toast from 'react-hot-toast';

const NotionDemo = () => {
  const [blocks, setBlocks] = useState([
    {
      id: 'demo-1',
      type: 'heading',
      content: 'Bienvenue dans l\'éditeur Lore',
      level: 1
    },
    {
      id: 'demo-2',
      type: 'text',
      content: 'Cet éditeur vous permet de créer et organiser vos notes de campagne de manière intuitive, comme dans Notion.'
    },
    {
      id: 'demo-3',
      type: 'text',
      content: 'Vous pouvez :\n• Glisser-déposer les blocs pour les réorganiser\n• Utiliser / pour insérer de nouveaux éléments\n• Clic droit pour accéder aux options\n• Éditer en cliquant sur le contenu'
    },
    {
      id: 'demo-4',
      type: 'card',
      content: 'Carte de rencontre - Marcus le Brave, capitaine de la garde de Pyros'
    },
    {
      id: 'demo-5',
      type: 'text',
      content: 'Les mentions automatiques détectent les personnages, objets et événements dans votre texte.'
    }
  ]);

  const [editingBlock, setEditingBlock] = useState(null);
  const [showSlashMenu, setShowSlashMenu] = useState(false);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });

  const templates = [
    { id: 'text', name: 'Texte', icon: <FileText size={16} />, description: 'Bloc de texte simple' },
    { id: 'heading', name: 'Titre', icon: <FileText size={16} />, description: 'Titre de section' },
    { id: 'image', name: 'Image', icon: <Image size={16} />, description: 'Insérer une image' },
    { id: 'card', name: 'Carte', icon: <Package size={16} />, description: 'Carte interactive' },
    { id: 'link', name: 'Lien', icon: <Link size={16} />, description: 'Lien externe' },
  ];

  const getBlockIcon = (type) => {
    switch (type) {
      case 'text': return <FileText size={16} />;
      case 'heading': return <FileText size={16} />;
      case 'image': return <Image size={16} />;
      case 'card': return <Package size={16} />;
      case 'link': return <Link size={16} />;
      default: return <FileText size={16} />;
    }
  };

  const handleEdit = (id, isEditing) => {
    setEditingBlock(isEditing ? id : null);
  };

  const handleContentChange = (id, newContent) => {
    setBlocks(prev => prev.map(block => 
      block.id === id ? { ...block, content: newContent } : block
    ));
  };

  const handleDelete = (id) => {
    setBlocks(prev => prev.filter(block => block.id !== id));
    toast.success('Bloc supprimé');
  };

  const handleInsertAfter = (afterId, type) => {
    const newBlock = {
      id: `block-${Date.now()}`,
      type,
      content: '',
    };

    setBlocks(prev => {
      const afterIndex = prev.findIndex(block => block.id === afterId);
      return [
        ...prev.slice(0, afterIndex + 1),
        newBlock,
        ...prev.slice(afterIndex + 1)
      ];
    });

    setTimeout(() => handleEdit(newBlock.id, true), 100);
  };

  const handleContextMenu = (e, blockId) => {
    e.preventDefault();
    setContextMenuPosition({ x: e.clientX, y: e.clientY });
    setShowContextMenu(blockId);
  };

  const handleSlashMenuSelect = (template) => {
    const newBlock = {
      id: `block-${Date.now()}`,
      type: template.id,
      content: '',
    };

    setBlocks(prev => [...prev, newBlock]);
    setShowSlashMenu(false);
    setTimeout(() => handleEdit(newBlock.id, true), 100);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-lg p-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <Package size={24} className="mr-3 text-blue-500" />
          Démonstration de l'éditeur Lore
        </h2>

        <div className="space-y-4">
          {blocks.map((block, index) => (
            <motion.div
              key={block.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="editable-line group relative"
              onContextMenu={(e) => handleContextMenu(e, block.id)}
            >
              {/* Drag Handle */}
              <div className="drag-handle">
                <GripVertical size={16} className="text-gray-400" />
              </div>

              {/* Bouton d'insertion */}
              <div className="insert-button">
                <Plus size={12} />
              </div>

              {/* Contenu du bloc */}
              <div className="line-content pl-8">
                {editingBlock === block.id ? (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 mb-2">
                      {getBlockIcon(block.type)}
                      <span className="text-sm text-gray-500 capitalize">{block.type}</span>
                    </div>
                    <textarea
                      value={block.content}
                      onChange={(e) => handleContentChange(block.id, e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={3}
                      autoFocus
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(block.id, false)}
                        className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                      >
                        Sauvegarder
                      </button>
                      <button
                        onClick={() => handleDelete(block.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                ) : (
                  <div 
                    className="cursor-pointer hover:bg-gray-50 p-2 rounded"
                    onClick={() => handleEdit(block.id, true)}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      {getBlockIcon(block.type)}
                      <span className="text-sm text-gray-500 capitalize">{block.type}</span>
                    </div>
                    <div className="text-gray-800 whitespace-pre-line">
                      {block.content || <span className="text-gray-400 italic">Cliquez pour éditer...</span>}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Zone d'ajout rapide */}
        <div className="mt-6 p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
          <p className="text-gray-500 mb-2">Tapez / pour insérer un nouveau bloc</p>
          <button
            onClick={() => setShowSlashMenu(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm"
          >
            <Plus size={16} className="inline mr-2" />
            Ajouter un bloc
          </button>
        </div>

        {/* Menu slash */}
        {showSlashMenu && (
          <div className="slash-menu" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
            <div className="px-4 py-2 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <Search size={16} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher un type de bloc..."
                  className="flex-1 text-sm border-none outline-none"
                  autoFocus
                />
              </div>
            </div>
            <div className="max-h-64 overflow-y-auto">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => handleSlashMenuSelect(template)}
                  className="slash-menu-item"
                >
                  {template.icon}
                  <div className="flex-1">
                    <div className="font-medium">{template.name}</div>
                    <div className="text-xs text-gray-500">{template.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

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
                handleEdit(showContextMenu, true);
                setShowContextMenu(false);
              }}
            >
              <Edit2 size={14} />
              <span>Modifier</span>
            </button>
            <button
              className="context-menu-item"
              onClick={() => {
                handleInsertAfter(showContextMenu, 'text');
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
                handleDelete(showContextMenu);
                setShowContextMenu(false);
              }}
            >
              <Trash2 size={14} />
              <span>Supprimer</span>
            </button>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">Instructions d'utilisation :</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• <strong>Survol</strong> : Les poignées de drag et boutons d'insertion apparaissent</li>
            <li>• <strong>Glisser-déposer</strong> : Utilisez les poignées ⋮⋮ pour réorganiser</li>
            <li>• <strong>Édition</strong> : Cliquez sur le contenu pour éditer</li>
            <li>• <strong>Menu contextuel</strong> : Clic droit pour les options</li>
            <li>• <strong>Insertion</strong> : Tapez / ou cliquez sur + pour ajouter des blocs</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default NotionDemo;


