// services/chatService.js
import db from "../database/db.js";
import axios from "axios";
import productsModel from "../models/ProductModel.js";
import CategoriesModel from "../models/CategoriesModel.js";


export async function fetchRelevantData(message) {
  const text = message.toLowerCase().trim();
  console.log("🔍 Buscando productos para:", text);

  try {
    // coincidencias directas por nombre/descr
    const searchTerm = `%${text}%`;
    let products = await productsModel.findAll({
      where: {
        [db.Sequelize.Op.or]: [
          db.Sequelize.where(
            db.Sequelize.fn('LOWER', db.Sequelize.col('products.name')),
            'LIKE', searchTerm
          ),
          db.Sequelize.where(
            db.Sequelize.fn('LOWER', db.Sequelize.col('products.description')),
            'LIKE', searchTerm
          )
        ]
      },
      limit: 10,
      include: [
        { model: CategoriesModel, as: "category_data", attributes: ["category_id", "name", "description"] }
      ]
    });

    console.log(`✅ Encontrados ${products.length} productos`);

    // Buscar categorías
    const categories = await CategoriesModel.findAll({
      where: db.Sequelize.where(
        db.Sequelize.fn('LOWER', db.Sequelize.col('name')),
        'LIKE', searchTerm
      ),
      limit: 6
    });
    console.log(`✅ Encontradas ${categories.length} categorías`);

    // si no hay productos, tomar los 10 productos activos con stock
    if (products.length === 0) {
      console.log("🔄 No se encontraron coincidencias directas, cargando fallback de productos disponibles...");
      products = await productsModel.findAll({
        where: {
          stock: { [db.Sequelize.Op.gt]: 0 },
          status: 'active'
        },
        limit: 10,
        include: [
          { model: CategoriesModel, as: "category_data", attributes: ["category_id", "name", "description"] }
        ]
      });
    }

    return { products, categories };

  } catch (err) {
    console.error("❌ Error en fetchRelevantData:", err);
    return { products: [], categories: [] };
  }
}


async function searchWithSynonyms(searchText) {
  try {
    const synonyms = getSynonyms(searchText);
    console.log("🔄 Búsqueda con sinónimos:", synonyms);
    
    if (synonyms.length === 0) return [];

    const conditions = synonyms.map(term => ({
      [db.Sequelize.Op.or]: [
        db.Sequelize.where(
          db.Sequelize.fn('LOWER', db.Sequelize.col('products.name')),
          'LIKE', `%${term}%`
        ),
        db.Sequelize.where(
          db.Sequelize.fn('LOWER', db.Sequelize.col('products.description')),
          'LIKE', `%${term}%`
        )
      ]
    }));

    const extendedProducts = await productsModel.findAll({
      where: {
        [db.Sequelize.Op.or]: conditions
      },
      limit: 10,
      include: [
        {
          model: CategoriesModel,
          as: "category_data",
          attributes: ["category_id", "name", "description"]
        }
      ]
    });

    console.log(`🔍 Búsqueda ampliada encontró: ${extendedProducts.length} productos`);
    return extendedProducts;

  } catch (err) {
    console.error("Error en búsqueda con sinónimos:", err);
    return [];
  }
}

function getSynonyms(text) {
  const synonymMap = {
    'laptop': ['laptop', 'portátil', 'notebook', 'computadora portátil', 'computador portátil'],
    'mouse': ['mouse', 'ratón', 'raton'],
    'ps5': ['ps5', 'playstation', 'play station'],
    'camiseta': ['camiseta', 'tshirt', 't-shirt', 'remera', 'playera'],
    'technology': ['technology', 'tecnología', 'tech', 'tecnologia', 'electrónica'],
    'computadora': ['computadora', 'computer', 'pc', 'ordenador']
  };

  const synonyms = new Set();
  
  Object.keys(synonymMap).forEach(key => {
    if (text.includes(key)) {
      synonymMap[key].forEach(syn => synonyms.add(syn));
    }
  });

  // Si no encuentra sinónimos específicos, usar el texto original
  if (synonyms.size === 0 && text.length > 2) {
    synonyms.add(text);
  }

  return Array.from(synonyms);
}


export function buildPrompt(userMessage, dbContext = {}, userContext = {}) {
  
  const formatProducts = (products) => {
    if (!products || products.length === 0) {
      return "No se encontraron productos relacionados en la base de datos.";
    }
    
    return products.map(p => 
      `- ${p.name} | Precio: $${p.price} | Stock: ${p.stock} | ${p.description || 'Sin descripción'}`
    ).join("\n");
  };

  const formatCategories = (categories) => {
    if (!categories || categories.length === 0) {
      return "No se encontraron categorías relacionadas.";
    }
    
    return categories.map(c => 
      `- ${c.name}${c.description ? `: ${c.description}` : ''}`
    ).join("\n");
  };

  const productsText = formatProducts(dbContext.products);
  const categoriesText = formatCategories(dbContext.categories);

  const system = `Eres un asistente de e-commerce especializado en ayudar a usuarios a encontrar productos. 
Usa EXCLUSIVAMENTE la información de productos y categorías proporcionada. 
Si hay productos relevantes, menciónalos específicamente y ofrece ayuda para comprar.
Si no hay productos que coincidan exactamente, sugiere al usuario reformular su búsqueda.
NUNCA inventes productos, precios o características que no estén en el contexto.`;

  const prompt = `
${system}

INFORMACIÓN DE PRODUCTOS DISPONIBLES:
${productsText}

CATEGORÍAS RELACIONADAS:
${categoriesText}

Pregunta del usuario: "${userMessage}"

Respuesta (sé amable y útil):
`.trim();

  console.log("📋 Prompt construido con éxito");
  return prompt;
}

/**
 * Llamada a Ollama/Gemma
 */
export async function callOllama(prompt) {
  try {
    console.log("🤖 Enviando prompt a Ollama...");
    
    const resp = await axios.post("http://localhost:11434/api/generate", {
      model: "gemma3",
      prompt: prompt,
      stream: false,
      options: {
        temperature: 0.3,
        num_predict: 512,
      }
    }, { 
      timeout: 30000
    });

    const responseText = resp.data?.response || "No se pudo obtener respuesta";
    console.log("✅ Respuesta recibida de Ollama");
    return String(responseText).trim();

  } catch (err) {
    console.error("❌ Error en callOllama:", err.message);
    throw new Error("Error al comunicarse con el modelo de IA: " + err.message);
  }
}

// Función de debug usando Models
export async function debugDatabase() {
  try {
    console.log("🔍 DEBUG: Revisando contenido de la base de datos...");
    
    const allProducts = await productsModel.findAll({
      limit: 10,
      attributes: ['product_id', 'name', 'price', 'stock']
    });
    
    console.log("📦 Productos en la BD:", allProducts.map(p => p.toJSON()));
    
    const allCategories = await CategoriesModel.findAll({
      limit: 10,
      attributes: ['category_id', 'name']
    });
    
    console.log("🏷️ Categorías en la BD:", allCategories.map(c => c.toJSON()));
    
    return { allProducts, allCategories };
  } catch (err) {
    console.error("Error en debug:", err);
  }
}