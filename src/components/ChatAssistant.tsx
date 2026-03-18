import React, { useState, useEffect, useRef } from "react";
import { MdChat, MdClose, MdSend } from "react-icons/md";
import "./styles/ChatAssistant.css";

const knowledgeBase = {
  name: "Raj Roy",
  roles: ["AI Engineer", "Full Stack Developer"],
  summary: "Entry-level Full Stack / AI Engineer with hands-on experience building scalable MERN stack applications, integrating machine learning models into production web platforms, and developing NLP-based AI solutions.",
  education: "B.E. in Computer Engineering from Marwadi University, Rajkot (Expected May 2026). I've studied Data Structures, Algorithms, DBMS, Web Tech, and AI.",
  experience: "Full Stack Web Developer Intern at Vectrium Ventures (Feb 2025 - May 2025).",
  skills: {
    frontend: "React.js, Next.js, HTML5, CSS3, Tailwind CSS",
    backend: "Node.js, Express.js, REST APIs, Flask, MySQL, Python, SQL",
    ai: "Scikit-learn, TensorFlow, PyTorch, NLP, Model Integration",
    databases: "MongoDB, MySQL",
    tools: "Git, GitHub, Docker, Postman, Vercel, Netlify"
  },
  projects: [
    { title: "LinkLite", desc: "Production-ready URL shortener with Redis caching." },
    { title: "MERN Stack Job Portal", desc: "Full-stack recruitment platform with RBAC." },
    { title: "Hate Speech Detection Model", desc: "Advanced NLP model for content moderation." },
    { title: "Diabetes & Cardio Threat Detector", desc: "Machine learning model for health risk assessment." },
    { title: "Design Folio", desc: "Portfolio showcase with integrated chat." }
  ],
  contact: {
    email: "rajroy17.work@gmail.com",
    github: "https://github.com/rxjroy",
    linkedin: "https://www.linkedin.com/in/rxj-roy/"
  }
};

const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! I'm Raj's assistant. Ask me anything about his skills, projects, or experience!", isUser: false }
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  const suggestions = [
    { label: "Skills", query: "What are your skills?" },
    { label: "Projects", query: "Show me your projects" },
    { label: "Resume", query: "Can I see your resume?" },
    { label: "Contact", query: "How to contact you?" },
  ];

  const handleSend = (text?: string) => {
    const userMessage = text || inputValue.trim();
    if (!userMessage) return;

    setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
    setInputValue("");

    // Simple response logic
    setTimeout(() => {
      const response = getResponse(userMessage.toLowerCase());
      setMessages(prev => [...prev, { text: response, isUser: false }]);
    }, 600);
  };

  const handleSuggestion = (query: string) => {
    handleSend(query);
  };

  const getResponse = (query: string): string => {
    const words = query.toLowerCase().split(/\W+/);
    
    const categories = [
      {
        id: "greetings",
        keywords: ["hi", "hello", "hey", "greetings", "morning", "evening", "sup"],
        response: "Hello! I'm Raj's AI assistant. How can I help you today?"
      },
      {
        id: "skills",
        keywords: ["skill", "skills", "tech", "stack", "languages", "programming", "technologies", "frontend", "backend", "ai", "ml", "machine", "learning"],
        response: `Raj is a Full Stack & AI Engineer. His expertise includes:\n\n**Frontend**:\n${knowledgeBase.skills.frontend}\n\n**Backend**:\n${knowledgeBase.skills.backend}\n\n**AI/ML & Data**:\n${knowledgeBase.skills.ai}\n\n**Databases & Tools**:\n${knowledgeBase.skills.databases}, ${knowledgeBase.skills.tools}`
      },
      {
        id: "projects",
        keywords: ["project", "projects", "work", "portfolio", "built", "made", "developed", "linklite", "job", "portal", "detection", "detector", "folio"],
        response: `Raj has developed several impressive projects:\n\n${knowledgeBase.projects.map(p => `**${p.title}**\n${p.desc}`).join("\n\n")}`
      },
      {
        id: "resume",
        keywords: ["resume", "cv", "portfolio", "pdf"],
        response: `You can view or download Raj's resume here:\n[**Download Resume**](https://drive.google.com/file/d/1rpt6AY6s7iJd9RQxx6uJ3cerQk2YT7s0/view?usp=sharing)`
      },
      {
        id: "education",
        keywords: ["education", "study", "university", "college", "degree", "graduation", "marwadi", "student", "coursework"],
        response: `**Education**:\n${knowledgeBase.education}`
      },
      {
        id: "experience",
        keywords: ["experience", "job", "intern", "internship", "vectrium", "work", "career", "history"],
        response: `**Work Experience**:\n${knowledgeBase.experience}`
      },
      {
        id: "contact",
        keywords: ["contact", "email", "reach", "social", "github", "linkedin", "mail", "message"],
        response: `You can reach Raj via email at:\n**${knowledgeBase.contact.email}**\n\n**Social Profiles**:\n- GitHub: ${knowledgeBase.contact.github}\n- LinkedIn: ${knowledgeBase.contact.linkedin}`
      },
      {
        id: "bio",
        keywords: ["who", "about", "bio", "summary", "raj", "him", "profile"],
        response: `**${knowledgeBase.name}**\n*${knowledgeBase.roles.join(" & ")}*\n\n${knowledgeBase.summary}`
      }
    ];

    let bestMatch = { id: "", score: 0 };

    categories.forEach(cat => {
      let score = 0;
      cat.keywords.forEach(kw => {
        if (words.includes(kw)) score += 2;
        else if (query.includes(kw)) score += 1;
      });
      if (score > bestMatch.score) {
        bestMatch = { id: cat.id, score };
      }
    });

    if (bestMatch.score > 0) {
      const match = categories.find(c => c.id === bestMatch.id);
      return match ? match.response : "";
    }
    
    return "I'm not quite sure I understand. Try asking about Raj's skills, projects, experience, or how to contact him!";
  };

  const formatMessage = (text: string) => {
    return text.split("\n").map((line, i) => (
      <div key={i} style={{ marginBottom: line.trim() === "" ? "10px" : "4px" }}>
        {line.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g).map((part, j) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return <strong key={j} style={{ color: "var(--accentColor)" }}>{part.slice(2, -2)}</strong>;
          }
          if (part.startsWith("[") && part.includes("](")) {
            const match = part.match(/\[(.*?)\]\((.*?)\)/);
            if (match) {
              return (
                <a key={j} href={match[2]} target="_blank" rel="noopener noreferrer" style={{ color: "var(--accentColor)", textDecoration: "underline" }}>
                  {match[1]}
                </a>
              );
            }
          }
          return part;
        })}
      </div>
    ));
  };

  return (
    <div className="chat-assistant-container" ref={chatRef}>
      {/* Chat Window */}
      <div className={`chat-window ${isOpen ? "open" : ""}`} data-cursor="disable">
        <div className="chat-header">
          <span>Raj's AI Assistant</span>
          <button onClick={() => setIsOpen(false)} aria-label="Close chat">
            <MdClose />
          </button>
        </div>
        
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.isUser ? "user" : "assistant"}`}>
               {formatMessage(msg.text)}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions */}
        <div className="chat-suggestions">
          {suggestions.map((s, i) => (
            <button key={i} onClick={() => handleSuggestion(s.query)} className="suggestion-btn">
              {s.label}
            </button>
          ))}
        </div>

        <div className="chat-input" onKeyDown={(e) => e.key === "Enter" && handleSend()}>
          <input
            type="text"
            placeholder="Ask me something..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button onClick={() => handleSend()} aria-label="Send message">
            <MdSend />
          </button>
        </div>
      </div>

      {/* Toggle Button */}
      <button 
        className={`chat-toggle-btn ${isOpen ? "hidden" : ""}`}
        onClick={() => setIsOpen(true)}
        aria-label="Open chat assistant"
        data-cursor="icons"
      >
        <MdChat />
        <span className="chat-tooltip">Ask AI</span>
      </button>
    </div>
  );
};

export default ChatAssistant;
