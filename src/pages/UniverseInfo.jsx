import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Users, Clock, BookOpen, Settings, Bell } from 'lucide-react';

const UniverseInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Données d'exemple pour la page d'informations
  const universeInfo = {
    id: id,
    title: "Dungeons & Dragons 5e",
    subtitle: "Manuel des joueurs",
    author: "Wizards of the Coast",
    price: 49,
    rating: 4.8,
    players: "3-6 joueurs",
    duration: "3-5 heures",
    difficulty: "Débutant",
    description: "Dungeons & Dragons 5e est le système de jeu de rôle le plus populaire au monde. Cette édition simplifie les règles tout en conservant la profondeur tactique qui fait la renommée de D&D. Parfait pour les débutants comme pour les vétérans.",
    features: [
      "Règles simplifiées et intuitives",
      "Système d'avantage/désavantage",
      "Classes et races diversifiées", 
      "Magie équilibrée",
      "Compatible avec tous les suppléments 5e"
    ],
    image: "/images/dnd5e-full.jpg"
  };

  const handlePurchase = () => {
    // Logique d'achat
    alert('Redirection vers la boutique...');
  };

  const handleChoose = () => {
    navigate('/campaigns/create/configure', { 
      state: { selectedUniverse: universeInfo } 
    });
  };

  return (
    <div className="min-h-screen bg-primary-blue">
      {/* Header */}
      <header className="flex items-center justify-between p-6 bg-primary-blue/90">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/campaigns/create/universe')}
            className="text-light hover:text-golden transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-4xl font-bold tracking-wider text-light eagle-lake-font">LORE</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="text-light hover:text-golden transition-colors">
            <Settings size={24} />
          </button>
          <button className="text-light hover:text-golden transition-colors">
            <Bell size={24} />
          </button>
          <div className="w-10 h-10 bg-golden rounded-full flex items-center justify-center text-dark font-bold">
            U
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="px-6 py-4">
        <nav className="flex items-center space-x-2 text-light/80">
          <button
            onClick={() => navigate('/campaigns')}
            className="hover:text-light transition-colors"
          >
            Mes campagnes
          </button>
          <span className="text-light/60">›</span>
          <button
            onClick={() => navigate('/campaigns/create')}
            className="hover:text-light transition-colors"
          >
            Créer une campagne
          </button>
          <span className="text-light/60">›</span>
          <button
            onClick={() => navigate('/campaigns/create/universe')}
            className="hover:text-light transition-colors"
          >
            Choisir un univers
          </button>
          <span className="text-light/60">›</span>
          <span className="text-golden">{universeInfo.title}</span>
        </nav>
      </div>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-6 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Colonne gauche - Image */}
          <div>
            <div className="aspect-[3/4] bg-light/10 rounded-lg flex items-center justify-center border border-light/20">
              <div className="text-light/40 text-8xl font-bold opacity-50">IMG</div>
            </div>
          </div>

          {/* Colonne droite - Contenu */}
          <div>
            {/* Titre et informations */}
            <h2 className="text-4xl font-bold text-light mb-2 eagle-lake-font">
              {universeInfo.title}
            </h2>
            <p className="text-light/80 text-lg mb-4">{universeInfo.subtitle}</p>
            <p className="text-light/70 mb-6">par {universeInfo.author}</p>

            {/* Rating et infos */}
            <div className="flex items-center space-x-6 mb-8">
              <div className="flex items-center space-x-2">
                <Star className="text-golden" size={20} />
                <span className="text-light font-semibold">{universeInfo.rating}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="text-light/70" size={20} />
                <span className="text-light/70">{universeInfo.players}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="text-light/70" size={20} />
                <span className="text-light/70">{universeInfo.duration}</span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-light eagle-lake-font mb-4">Description</h3>
              <p className="text-light/90 leading-relaxed">{universeInfo.description}</p>
            </div>

            {/* Fonctionnalités */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-light eagle-lake-font mb-4">Fonctionnalités</h3>
              <ul className="space-y-2">
                {universeInfo.features.map((feature, index) => (
                  <li key={index} className="text-light/80 flex items-start">
                    <span className="text-golden mr-2">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Prix et boutons d'action */}
            <div className="flex items-center justify-between">
              <div className="text-4xl font-bold text-golden">
                {universeInfo.price}€
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={handlePurchase}
                  className="bg-light/20 text-light border border-light/30 px-6 py-3 rounded-lg font-semibold hover:bg-light/30 transition-colors"
                >
                  Acheter
                </button>
                <button
                  onClick={handleChoose}
                  className="bg-golden text-dark px-6 py-3 rounded-lg font-bold hover:bg-golden/80 transition-colors"
                >
                  Choisir cet univers
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniverseInfo;