import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import { ArrowLeft, Star, Users, Clock, BookOpen, Settings, Bell } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
=======
import { ArrowLeft, Star, Users, Clock, BookOpen } from 'lucide-react';
>>>>>>> parent of 39cef2c (changement 11/09)

const UniverseInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
<<<<<<< HEAD
  const { user } = useAuth();
=======
>>>>>>> parent of 39cef2c (changement 11/09)

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
<<<<<<< HEAD
          <button className="text-light hover:text-golden transition-colors">
            <Settings size={24} />
          </button>
          <button className="text-light hover:text-golden transition-colors">
            <Bell size={24} />
          </button>
          <div className="w-10 h-10 bg-golden rounded-full flex items-center justify-center text-dark font-bold">
            {user?.user_metadata?.username?.[0]?.toUpperCase() || 'U'}
=======
          <div className="w-10 h-10 bg-golden rounded-full flex items-center justify-center text-dark font-bold">
            U
>>>>>>> parent of 39cef2c (changement 11/09)
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
<<<<<<< HEAD
          <span className="text-light/60">›</span>
          <button
            onClick={() => navigate('/campaigns/create')}
            className="hover:text-light transition-colors"
          >
            Créer une campagne
          </button>
          <span className="text-light/60">›</span>
=======
          <span className="text-light/60">/</span>
>>>>>>> parent of 39cef2c (changement 11/09)
          <button
            onClick={() => navigate('/campaigns/create/universe')}
            className="hover:text-light transition-colors"
          >
<<<<<<< HEAD
            Choisir un univers
          </button>
          <span className="text-light/60">›</span>
          <span className="text-golden">{universeInfo.title}</span>
=======
            Créer une campagne
          </button>
          <span className="text-light/60">/</span>
          <span className="text-golden border-b border-golden pb-1">
            Informations univers
          </span>
>>>>>>> parent of 39cef2c (changement 11/09)
        </nav>
      </div>

      {/* Contenu principal */}
<<<<<<< HEAD
      <div className="max-w-7xl mx-auto px-6 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Colonne gauche - Image et informations de base */}
          <div>
            {/* Image principale */}
            <div className="aspect-[3/4] bg-light/10 rounded-lg flex items-center justify-center border border-light/20 mb-6">
              <div className="text-light/40 text-8xl font-bold opacity-50">IMG</div>
            </div>
            
            {/* Informations rapides */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-light/10 rounded-lg p-4 text-center">
                <Users className="w-6 h-6 text-golden mx-auto mb-2" />
                <p className="text-light/80 text-sm">{universeInfo.players}</p>
              </div>
              <div className="bg-light/10 rounded-lg p-4 text-center">
                <Clock className="w-6 h-6 text-golden mx-auto mb-2" />
                <p className="text-light/80 text-sm">{universeInfo.duration}</p>
              </div>
            </div>
            
            {/* Note et difficulté */}
            <div className="flex items-center justify-between bg-light/10 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-golden fill-current" />
                <span className="text-light font-semibold">{universeInfo.rating}</span>
              </div>
              <div className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-golden" />
                <span className="text-light/80 text-sm">{universeInfo.difficulty}</span>
              </div>
            </div>
          </div>

          {/* Colonne droite - Détails et actions */}
          <div>
            {/* Titre et éditeur */}
            <h2 className="text-4xl font-bold text-light mb-2 eagle-lake-font">
              {universeInfo.title}
            </h2>
            <p className="text-light/80 text-lg mb-6">{universeInfo.author}</p>
            
            {/* Prix */}
            <div className="mb-8">
              <div className="text-4xl font-bold text-golden mb-2">
                {universeInfo.price}€
              </div>
              <p className="text-light/70 text-sm">Prix de vente recommandé</p>
            </div>
            
            {/* Description */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-light eagle-lake-font mb-4">
                Description
              </h3>
              <p className="text-light/90 leading-relaxed">
                {universeInfo.description}
              </p>
            </div>
            
            {/* Caractéristiques */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-light eagle-lake-font mb-4">
                Caractéristiques
              </h3>
              <ul className="space-y-3">
                {universeInfo.features.map((feature, index) => (
                  <li key={index} className="text-light/80 flex items-start">
                    <span className="text-golden mr-3 mt-1">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Boutons d'action */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handlePurchase}
                className="flex-1 bg-golden hover:bg-golden/80 text-dark px-6 py-4 rounded-lg font-bold text-lg transition-colors flex items-center justify-center space-x-2"
              >
                <span>Acheter {universeInfo.price}€</span>
              </button>
              <button
                onClick={handleChoose}
                className="flex-1 bg-light/20 hover:bg-light/30 text-light border border-light/30 px-6 py-4 rounded-lg font-bold text-lg transition-colors flex items-center justify-center space-x-2"
              >
                <span>Choisir cet univers</span>
              </button>
=======
      <div className="px-6 pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Image et informations principales */}
            <div className="lg:col-span-2">
              <div className="bg-light/10 backdrop-blur-sm rounded-2xl p-8">
                
                {/* Image */}
                <div className="relative h-64 mb-6 rounded-xl overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-golden/20 to-golden/40 flex items-center justify-center">
                    <div className="text-golden/60 text-8xl font-bold opacity-50">JDR</div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-golden text-dark px-3 py-1 rounded-full text-sm font-semibold">
                      {universeInfo.price}€
                    </span>
                  </div>
                </div>

                {/* Titre et auteur */}
                <div className="mb-6">
                  <h1 className="text-3xl font-bold text-light eagle-lake-font mb-2">
                    {universeInfo.title}
                  </h1>
                  <h2 className="text-xl text-golden calligraphy-font mb-2">
                    {universeInfo.subtitle}
                  </h2>
                  <p className="text-light/80 noto-sans-font">
                    par {universeInfo.author}
                  </p>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h3 className="text-light font-semibold text-lg mb-3 calligraphy-font">
                    Description
                  </h3>
                  <p className="text-light/90 noto-sans-font leading-relaxed">
                    {universeInfo.description}
                  </p>
                </div>

                {/* Caractéristiques */}
                <div className="mb-6">
                  <h3 className="text-light font-semibold text-lg mb-3 calligraphy-font">
                    Caractéristiques
                  </h3>
                  <ul className="space-y-2">
                    {universeInfo.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-light/90 noto-sans-font">
                        <div className="w-2 h-2 bg-golden rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Sidebar informations */}
            <div className="lg:col-span-1">
              <div className="bg-light/10 backdrop-blur-sm rounded-2xl p-6 sticky top-6">
                
                {/* Note et avis */}
                <div className="mb-6">
                  <div className="flex items-center mb-2">
                    <Star className="text-golden mr-2" size={20} />
                    <span className="text-light font-semibold text-lg">
                      {universeInfo.rating}/5
                    </span>
                  </div>
                  <p className="text-light/80 text-sm noto-sans-font">
                    Basé sur 1,247 avis
                  </p>
                </div>

                {/* Informations de jeu */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center">
                    <Users className="text-golden mr-3" size={20} />
                    <div>
                      <p className="text-light/80 text-sm noto-sans-font">Joueurs</p>
                      <p className="text-light font-semibold">{universeInfo.players}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock className="text-golden mr-3" size={20} />
                    <div>
                      <p className="text-light/80 text-sm noto-sans-font">Durée</p>
                      <p className="text-light font-semibold">{universeInfo.duration}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <BookOpen className="text-golden mr-3" size={20} />
                    <div>
                      <p className="text-light/80 text-sm noto-sans-font">Difficulté</p>
                      <p className="text-light font-semibold">{universeInfo.difficulty}</p>
                    </div>
                  </div>
                </div>

                {/* Boutons d'action */}
                <div className="space-y-3">
                  <button
                    onClick={handleChoose}
                    className="w-full bg-golden text-dark py-3 px-6 rounded-lg font-semibold hover:bg-golden/80 transition-colors noto-sans-font"
                  >
                    Choisir cet univers
                  </button>
                  
                  <button
                    onClick={handlePurchase}
                    className="w-full bg-light/20 text-light border border-light/30 py-3 px-6 rounded-lg font-semibold hover:bg-light/30 transition-colors noto-sans-font"
                  >
                    Acheter maintenant
                  </button>
                  
                  <button
                    onClick={() => navigate('/campaigns/create/universe')}
                    className="w-full text-light/80 hover:text-light transition-colors noto-sans-font"
                  >
                    Retour à la sélection
                  </button>
                </div>
              </div>
>>>>>>> parent of 39cef2c (changement 11/09)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniverseInfo;
