import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth.jsx';

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    domain: '',
    acceptTerms: false,
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { signIn, signUp } = useAuth();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        // Validation pour l'inscription
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Les mots de passe ne correspondent pas');
        }
        if (!formData.acceptTerms) {
          throw new Error('Vous devez accepter les conditions d\'utilisation');
        }
        
        // Appel signUp avec métadonnées
        await signUp(formData.email, formData.password, {
          username: formData.username,
          domain: formData.domain
        });
      } else {
        // Appel signIn pour la connexion
        await signIn(formData.email, formData.password);
      }
    } catch (error) {
      console.error('Erreur d\'authentification:', error);
      // Les erreurs sont gérées par le hook useAuth avec les toasts
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    // Reset form when switching modes
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      domain: '',
      acceptTerms: false,
      rememberMe: false
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background avec image fantastique */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%234A90E2;stop-opacity:1" /><stop offset="100%" style="stop-color:%236B73FF;stop-opacity:1" /></linearGradient></defs><rect width="1200" height="800" fill="url(%23bg)"/></svg>')`
        }}
      >
        {/* Overlay pour simuler l'ambiance fantasy */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-blue/80 via-primary-blue/60 to-primary-blue/90"></div>
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 flex items-center justify-between min-h-screen px-8 lg:px-16">
        
        {/* Section gauche - Texte d'accueil */}
        <div className="flex-1 max-w-2xl text-light">
          {/* Logo */}
          <div className="mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold tracking-wider text-white eagle-lake-font">
              LORE
            </h1>
          </div>

          {/* Titre et description */}
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight eagle-lake-font">
              {isSignUp 
                ? "Prêt-e à commencer votre prochaine grande aventure ?" 
                : "Bon retour parmi nous !"
              }
            </h2>
            <p className="text-lg lg:text-xl text-light-medium leading-relaxed max-w-xl">
              {isSignUp
                ? "Rejoignez Lore et commencez à façonner vos mondes, vos histoires et vos personnages dès aujourd'hui."
                : "Heureux de vous revoir, aventurier. Le récit continue..."
              }
            </p>
          </div>
        </div>

        {/* Section droite - Formulaire */}
        <div className="w-full max-w-md lg:max-w-lg">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 lg:p-10">
            
            {/* Toggle entre Se connecter / S'inscrire */}
            <div className="flex bg-gray-100 rounded-xl p-1 mb-8">
              <button
                onClick={() => setIsSignUp(false)}
                className={`flex-1 py-3 text-sm font-medium rounded-lg transition-all ${
                  !isSignUp 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Se connecter
              </button>
              <button
                onClick={() => setIsSignUp(true)}
                className={`flex-1 py-3 text-sm font-medium rounded-lg transition-all ${
                  isSignUp 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                S'inscrire
              </button>
            </div>

            {/* Formulaire */}
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Pseudonyme (seulement pour inscription) */}
              {isSignUp && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pseudonyme
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Knightnight"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    required={isSignUp}
                  />
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Adresse e-mail
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="ex : nom@mail.com"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  required
                />
              </div>

              {/* Mot de passe */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mot de passe
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••••"
                    className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Confirmation mot de passe (seulement pour inscription) */}
              {isSignUp && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirmation mot de passe
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="••••••••••"
                      className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      required={isSignUp}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
              )}

              {/* Domaine d'intérêt (seulement pour inscription) */}
              {isSignUp && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Domaine d'intérêt
                  </label>
                  <select
                    name="domain"
                    value={formData.domain}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    required={isSignUp}
                  >
                    <option value="">Univers, système préféré...</option>
                    <option value="dnd5e">Dungeons & Dragons 5e</option>
                    <option value="pathfinder">Pathfinder</option>
                    <option value="call_of_cthulhu">L'Appel de Cthulhu</option>
                    <option value="vampire">Vampire : La Mascarade</option>
                    <option value="warhammer">Warhammer Fantasy</option>
                    <option value="cyberpunk">Cyberpunk 2020/RED</option>
                    <option value="savage_worlds">Savage Worlds</option>
                    <option value="other">Autre</option>
                  </select>
                </div>
              )}

              {/* Mot de passe oublié (seulement pour connexion) */}
              {!isSignUp && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <label className="ml-2 text-sm text-gray-700">
                      Se souvenir de moi
                    </label>
                  </div>
                  <button
                    type="button"
                    className="text-sm text-golden hover:text-golden/80 font-medium"
                  >
                    Mot de passe oublié ?
                  </button>
                </div>
              )}

              {/* Conditions d'utilisation (seulement pour inscription) */}
              {isSignUp && (
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 mt-1"
                    required={isSignUp}
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    J'accepte les{' '}
                    <a href="#" className="text-golden hover:text-golden/80 font-medium">
                      Conditions Générales d'Utilisation
                    </a>{' '}
                    et la{' '}
                    <a href="#" className="text-golden hover:text-golden/80 font-medium">
                      Politique de Confidentialité
                    </a>
                  </label>
                </div>
              )}

              {/* Bouton de soumission */}
              <button
                type="submit"
                disabled={loading || (isSignUp && !formData.acceptTerms)}
                className="w-full bg-gradient-to-r from-golden to-golden text-white font-semibold py-3 px-6 rounded-lg hover:bg-golden/90 focus:ring-2 focus:ring-golden focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Chargement...' : (isSignUp ? 'Créer mon compte' : 'Se connecter')}
              </button>
            </form>

            {/* Lien pour changer de mode */}
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                {isSignUp ? 'Déjà un compte ?' : 'Pas encore de compte ?'}{' '}
                <button
                  onClick={toggleMode}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  {isSignUp ? 'Se connecter' : "S'inscrire"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
