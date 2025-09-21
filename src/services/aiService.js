const N8N_WEBHOOK_URL = import.meta?.env?.VITE_N8N_WEBHOOK_URL;

// Service IA pour traiter les questions via webhook N8N uniquement
class AIService {
  constructor() {
    this.context = {
      campaign: null,
      universe: null,
      rules: null
    };
  }

  // Initialiser le contexte avec les données de la campagne
  initializeContext(campaign, universe, rules) {
    this.context = {
      campaign: campaign ? { id: campaign.id, nom: campaign.nom } : null,
      universe: universe ? { id: universe.id, nom: universe.nom } : null,
      rules: rules ? { id: rules.id, nom: rules.nom } : null
    };
    // Aucune source locale n'est utilisée - tout passe par le webhook N8N
  }

  // Traiter une question utilisateur via webhook N8N uniquement
  async processQuestion(question) {
    if (!N8N_WEBHOOK_URL) {
      throw new Error('Webhook obligatoire: VITE_N8N_WEBHOOK_URL manquant');
    }
    
    const url = String(N8N_WEBHOOK_URL).trim();

    const payload = {
      chatInput: question, // <-- envoyer la question dans "chatInput"
      context: {
        campaign: this.context.campaign?.id || null,
        universe: this.context.universe?.id || null,
        rules: this.context.rules?.id || null,
        // Informations contextuelles supplémentaires
        campaignName: this.context.campaign?.nom || null,
        universeName: this.context.universe?.nom || null,
        rulesName: this.context.rules?.nom || null
      }
    };

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(import.meta.env.VITE_N8N_TOKEN ? { 'Authorization': `Bearer ${import.meta.env.VITE_N8N_TOKEN}` } : {})
      },
      body: JSON.stringify(payload)
    });

    const contentType = res.headers.get('content-type') || '';
    const raw = await res.text();

    if (!res.ok) throw new Error(`n8n HTTP ${res.status}: ${raw || '<empty>'}`);
    if (!raw || !raw.trim()) throw new Error('Réponse n8n vide');
    if (!contentType.includes('application/json')) throw new Error('n8n doit renvoyer application/json');

    let data;
    try {
      data = JSON.parse(raw);
    } catch {
      throw new Error(`JSON invalide: ${raw.slice(0, 200)}`);
    }
    
    const answer = pickAnswer(data);
    const sources = pickSources(data);
    
    return {
      success: true,
      response: answer,
      sources,
      keywords: data.keywords || data.tags || []
    };
  }

  // Obtenir les statistiques (simplifiées pour webhook uniquement)
  getStats() {
    return {
      totalSources: 0, // Aucune source locale
      sourcesByType: {}, // Aucune source locale
      context: {
        hasCampaign: !!this.context.campaign,
        hasUniverse: !!this.context.universe,
        hasRules: !!this.context.rules,
        documentsCount: 0 // Aucun document local
      },
      webhookConfigured: !!N8N_WEBHOOK_URL
    };
  }
}

function pickAnswer(d) {
  return (
    d?.answer ??
    d?.response ??
    d?.output ??
    d?.text ??
    d?.message?.content ??
    d?.result?.answer ??
    d?.choices?.[0]?.message?.content ??
    d?.choices?.[0]?.text ??
    'Aucune réponse.'
  );
}

function pickSources(d) {
  const raw =
    d?.sources ??
    d?.citations ??
    d?.docs ??
    d?.documents ??
    d?.context?.sources ??
    [];

  const arr = Array.isArray(raw) ? raw : (Array.isArray(raw?.data) ? raw.data : []);
  return arr.map(s => ({
    id: s.id ?? s.doc_id ?? s.metadata?.id ?? String(Math.random()),
    type: s.type || 'document',
    title: s.title ?? s.metadata?.title ?? 'Document',
    content: s.chunk ?? s.content ?? s.excerpt ?? '',
    score: s.score ?? s.similarity
  }));
}

// Instance singleton
const aiService = new AIService();

export default aiService;