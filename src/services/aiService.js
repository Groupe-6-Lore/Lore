// Service IA pour traiter les sources et références du jeu de rôle
class AIService {
  constructor() {
    this.sources = new Map();
    this.context = {
      campaign: null,
      universe: null,
      rules: null,
      documents: []
    };
  }

  // Initialiser le contexte avec les données de la campagne
  initializeContext(campaign, universe, rules, documents = []) {
    this.context = {
      campaign,
      universe,
      rules,
      documents
    };
    
    // Indexer les sources pour une recherche rapide
    this.indexSources();
  }

  // Indexer les sources pour la recherche
  indexSources() {
    this.sources.clear();
    
    // Indexer les documents de règles
    if (this.context.rules?.documents) {
      this.context.rules.documents.forEach(doc => {
        this.sources.set(doc.id, {
          type: 'rule',
          title: doc.title,
          content: doc.content,
          category: doc.category,
          tags: doc.tags || []
        });
      });
    }

    // Indexer les documents d'univers
    if (this.context.universe?.documents) {
      this.context.universe.documents.forEach(doc => {
        this.sources.set(doc.id, {
          type: 'universe',
          title: doc.title,
          content: doc.content,
          category: doc.category,
          tags: doc.tags || []
        });
      });
    }

    // Indexer les documents de campagne
    if (this.context.documents) {
      this.context.documents.forEach(doc => {
        this.sources.set(doc.id, {
          type: 'campaign',
          title: doc.title,
          content: doc.content,
          category: doc.category,
          tags: doc.tags || []
        });
      });
    }
  }

  // Traiter une question utilisateur
  async processQuestion(question) {
    try {
      // Analyser la question pour identifier les mots-clés
      const keywords = this.extractKeywords(question);
      
      // Rechercher les sources pertinentes
      const relevantSources = this.findRelevantSources(keywords);
      
      // Générer une réponse basée sur les sources
      const response = await this.generateResponse(question, relevantSources);
      
      return {
        success: true,
        response,
        sources: relevantSources,
        keywords
      };
    } catch (error) {
      console.error('Erreur lors du traitement de la question:', error);
      return {
        success: false,
        error: 'Erreur lors du traitement de votre question',
        response: 'Je suis désolé, une erreur est survenue. Veuillez réessayer.'
      };
    }
  }

  // Extraire les mots-clés de la question
  extractKeywords(question) {
    const stopWords = ['le', 'la', 'les', 'un', 'une', 'des', 'du', 'de', 'et', 'ou', 'mais', 'donc', 'or', 'ni', 'car'];
    const words = question.toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 2 && !stopWords.includes(word));
    
    return [...new Set(words)]; // Supprimer les doublons
  }

  // Trouver les sources pertinentes
  findRelevantSources(keywords) {
    const relevantSources = [];
    
    for (const [id, source] of this.sources) {
      let score = 0;
      
      // Calculer le score de pertinence
      keywords.forEach(keyword => {
        // Recherche dans le titre
        if (source.title.toLowerCase().includes(keyword)) {
          score += 3;
        }
        
        // Recherche dans le contenu
        if (source.content.toLowerCase().includes(keyword)) {
          score += 1;
        }
        
        // Recherche dans les tags
        source.tags.forEach(tag => {
          if (tag.toLowerCase().includes(keyword)) {
            score += 2;
          }
        });
      });
      
      if (score > 0) {
        relevantSources.push({
          ...source,
          id,
          score
        });
      }
    }
    
    // Trier par score décroissant
    return relevantSources.sort((a, b) => b.score - a.score).slice(0, 5);
  }

  // Générer une réponse basée sur les sources
  async generateResponse(question, sources) {
    if (sources.length === 0) {
      return this.generateFallbackResponse(question);
    }

    // Construire le contexte pour la réponse
    const context = this.buildContext(sources);
    
    // Simuler une réponse IA (à remplacer par une vraie API IA)
    return this.simulateAIResponse(question, context, sources);
  }

  // Construire le contexte à partir des sources
  buildContext(sources) {
    let context = `Contexte de la campagne "${this.context.campaign?.nom || 'Inconnue'}":\n`;
    context += `Univers: ${this.context.universe?.nom || 'Inconnu'}\n`;
    context += `Système de règles: ${this.context.rules?.nom || 'Inconnu'}\n\n`;
    
    context += "Sources pertinentes:\n";
    sources.forEach((source, index) => {
      context += `${index + 1}. ${source.title} (${source.type})\n`;
      context += `${source.content.substring(0, 200)}...\n\n`;
    });
    
    return context;
  }

  // Simuler une réponse IA (à remplacer par une vraie API)
  simulateAIResponse(question, context, sources) {
    const responses = [
      `Basé sur les sources de votre univers "${this.context.universe?.nom || 'sélectionné'}", voici ce que je peux vous dire :`,
      `D'après les documents de votre campagne "${this.context.campaign?.nom || 'actuelle'}", je peux vous expliquer que :`,
      `En me basant sur les règles de "${this.context.rules?.nom || 'votre système'}", voici la réponse :`,
      `Selon les sources disponibles dans votre univers, je peux vous dire que :`
    ];
    
    const baseResponse = responses[Math.floor(Math.random() * responses.length)];
    
    // Ajouter des détails basés sur les sources
    let detailedResponse = baseResponse + "\n\n";
    
    if (sources.length > 0) {
      const topSource = sources[0];
      detailedResponse += `**${topSource.title}**\n`;
      detailedResponse += `${topSource.content.substring(0, 300)}...\n\n`;
      
      if (sources.length > 1) {
        detailedResponse += `Autres sources pertinentes :\n`;
        sources.slice(1, 3).forEach(source => {
          detailedResponse += `• ${source.title}\n`;
        });
      }
    }
    
    detailedResponse += `\n*Cette réponse est basée sur ${sources.length} source(s) de votre univers et système de règles.*`;
    
    return detailedResponse;
  }

  // Réponse de secours quand aucune source n'est trouvée
  generateFallbackResponse(question) {
    const fallbackResponses = [
      `Je n'ai pas trouvé d'informations spécifiques sur "${question}" dans les sources de votre univers. Pouvez-vous me donner plus de détails ?`,
      `Cette question ne correspond pas aux documents actuellement disponibles. Avez-vous d'autres sources à ajouter ?`,
      `Je ne trouve pas de référence à "${question}" dans votre univers. Voulez-vous que je vous aide à créer cette information ?`,
      `Les sources actuelles ne contiennent pas d'informations sur ce sujet. Peut-être pourriez-vous ajouter des documents pertinents ?`
    ];
    
    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
  }

  // Ajouter une nouvelle source
  addSource(source) {
    const id = `source_${Date.now()}`;
    this.sources.set(id, {
      ...source,
      id
    });
    return id;
  }

  // Supprimer une source
  removeSource(id) {
    return this.sources.delete(id);
  }

  // Obtenir toutes les sources
  getAllSources() {
    return Array.from(this.sources.values());
  }

  // Obtenir les statistiques
  getStats() {
    const sourcesByType = {};
    for (const source of this.sources.values()) {
      sourcesByType[source.type] = (sourcesByType[source.type] || 0) + 1;
    }
    
    return {
      totalSources: this.sources.size,
      sourcesByType,
      context: {
        hasCampaign: !!this.context.campaign,
        hasUniverse: !!this.context.universe,
        hasRules: !!this.context.rules,
        documentsCount: this.context.documents.length
      }
    };
  }
}

// Instance singleton
const aiService = new AIService();

export default aiService;

