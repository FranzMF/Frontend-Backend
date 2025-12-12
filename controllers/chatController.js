// controllers/chatController.js
import { fetchRelevantData, buildPrompt, callOllama } from "../services/chatServices.js";

export const askChat = async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message || !message.trim()) {
      return res.status(400).json({ error: "Mensaje vacío" });
    }

    console.log(`💬 Mensaje recibido: "${message}"`);

    // 1) Obtener datos relevantes de la BD
    const dbContext = await fetchRelevantData(message);
    
    console.log("📊 Contexto de BD:", {
      productos: dbContext.products?.length || 0,
      categorias: dbContext.categories?.length || 0
    });

    // 2) User context
    const userContext = {};
    if (req.user) {
      userContext.userId = req.user.user_id;
      userContext.name = req.user.first_name;
    }

    // 3) Construir prompt
    const prompt = buildPrompt(message, dbContext, userContext);

    // 4) Llamar a Ollama
    const aiReply = await callOllama(prompt);

    // 5) Respuesta al frontend
    const payload = {
      reply: aiReply,
      products: dbContext.products || [],
      searchContext: {
        originalMessage: message,
        productsFound: dbContext.products?.length || 0,
        categoriesFound: dbContext.categories?.length || 0
      }
    };

    console.log("✅ Respuesta enviada al cliente");
    res.json(payload);

  } catch (err) {
    console.error("💥 Error en chatController:", err);
    res.status(500).json({ 
      error: "Error interno en el chat. Por favor intenta nuevamente.",
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};