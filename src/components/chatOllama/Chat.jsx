import { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./Chat.css";

export default function Chat() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll al último mensaje
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus en el input cuando se abre el chat
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 300);
    }
  }, [open]);

  const sendMessage = async () => {
    const messageText = text.trim();
    if (!messageText || isLoading) return;

    // Agregar mensaje del usuario
    const userMsg = { sender: "user", text: messageText };
    setMessages(prev => [...prev, userMsg]);
    setText("");
    
    // Mostrar "escribiendo..."
    setIsLoading(true);
    const typingMsg = { sender: "ai", text: "escribiendo...", isTyping: true };
    setMessages(prev => [...prev, typingMsg]);

    try {
      const res = await axios.post("http://localhost:8000/chat/ask", {
        message: messageText
      });

      // Remover el "escribiendo..." y agregar la respuesta real
      setMessages(prev => {
        const withoutTyping = prev.filter(msg => !msg.isTyping);
        const aiMsg = { 
          sender: "ai", 
          text: res.data.reply,
          products: res.data.products // Guardar productos para mostrar
        };
        return [...withoutTyping, aiMsg];
      });

    } catch (error) {
      console.error("Error enviando mensaje:", error);
      
      // Remover "escribiendo..." y mostrar error
      setMessages(prev => {
        const withoutTyping = prev.filter(msg => !msg.isTyping);
        const errorMsg = { 
          sender: "ai", 
          text: "Lo siento, hubo un error. Por favor intenta nuevamente.",
          isError: true
        };
        return [...withoutTyping, errorMsg];
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <>
      {/* BOTÓN BURBUJA */}
      <div className="chat-bubble" onClick={() => setOpen(!open)}>
        {open ? "✖" : "💬"}
      </div>

      {/* MODAL DEL CHAT */}
      {open && (
        <div className="chat-modal">
          <div className="chat-header">
            <div className="chat-header-info">
              <h4>Asistente Virtual</h4>
              <span className="chat-status">🟢 En línea</span>
            </div>
            <div className="chat-header-actions">
              <button className="clear-btn" onClick={clearChat} title="Limpiar chat">
                🗑️
              </button>
              <span className="close-btn" onClick={() => setOpen(false)}>✖</span>
            </div>
          </div>

          <div className="chat-body">
            {messages.length === 0 && (
              <div className="welcome-message">
                <p>¡Hola! 👋 Soy tu asistente virtual.</p>
                <p>Pregúntame sobre nuestros productos y te ayudaré a encontrarlos.</p>
                <div className="suggestions">
                  <span className="suggestion-tag">¿Tienen laptops?</span>
                  <span className="suggestion-tag">Busco mouse inalámbrico</span>
                  <span className="suggestion-tag">Productos de tecnología</span>
                </div>
              </div>
            )}
            
            {messages.map((m, i) => (
              <div key={i}>
                <div
                  className={`chat-msg ${m.sender === "user" ? "user" : "ai"} ${
                    m.isTyping ? "typing" : ""} ${m.isError ? "error" : ""}`
                  }
                >
                  {m.isTyping ? (
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  ) : (
                    <>
                      <div className="message-text">{m.text}</div>
                      {/* Mostrar productos si existen */}
                      {m.products && m.products.length > 0 && (
                        <div className="products-preview">
                          <div className="products-title">Productos encontrados:</div>
                          {m.products.slice(0, 3).map(product => (
                            <div key={product.product_id} className="product-item">
                              <strong>{product.name}</strong> - Bs {product.price}
                            </div>
                          ))}
                          {m.products.length > 3 && (
                            <div className="more-products">+{m.products.length - 3} más</div>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input">
            <input
              ref={inputRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Escribe tu mensaje..."
              disabled={isLoading}
            />
            <button 
              onClick={sendMessage} 
              disabled={isLoading || !text.trim()}
              className={isLoading ? "loading" : ""}
            >
              {isLoading ? "⏳" : "➤"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}