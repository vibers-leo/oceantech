import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { usePathname } from 'next/navigation';
import { MessageSquare, X, Send, Globe, Sparkles } from 'lucide-react';
import styles from './AIChatBot.module.css';

interface Message {
  id: number;
  role: 'bot' | 'user' | 'system';
  text: React.ReactNode;
  timestamp: Date;
}

export default function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  const pathname = usePathname();

  // Always show, even on admin pages
  const isHidden = false;

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      runGreetingSequence();
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const runGreetingSequence = async () => {
    setIsTyping(true);
    await wait(1000);
    addMessage('system', language === 'ko' ? '접속 환경 분석 중...' : 'Analyzing Connection Environment...');
    
    await wait(800);
    addMessage('system', language === 'ko' ? '서울, 대한민국 (IP: 121.145.***.***) 감지됨' : 'Detected: Seoul, KR');
    
    await wait(800);
    addMessage('system', language === 'ko' ? '선호 언어: 한국어 (ko-KR) 설정 완료' : 'Language set to English (en-US)');
    
    await wait(600);
    setIsTyping(false);
    const greeting = language === 'ko' 
      ? "안녕하세요! 오션테크 AI 어시스턴트입니다.\n2026 수출바우처 및 제품 관련하여 무엇을 도와드릴까요?"
      : "Hello! I am the Ocean Tech AI Assistant.\nHow can I help you regarding Export Vouchers or our products?";
    addMessage('bot', greeting);
  };

  const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const addMessage = (role: 'bot' | 'user' | 'system', text: React.ReactNode) => {
    setMessages(prev => [...prev, {
      id: Date.now(),
      role,
      text,
      timestamp: new Date()
    }]);
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userText = input;
    setInput('');
    addMessage('user', userText);
    setIsTyping(true);

    await wait(1500);

    let reply = "";
    const lowerInput = userText.toLowerCase();

    if (lowerInput.includes('수출') || lowerInput.includes('export')) {
      reply = language === 'ko' 
        ? "현재 2026년 수출바우처 사업 계획이 시스템에 등록되어 있습니다.\n주요 타겟 국가는 [싱가포르, 말레이시아]이며, 목표 매출액은 5만 달러입니다. 관련 문서를 띄워드릴까요?"
        : "The 2026 Export Voucher Plan is registered in the system. Target markets are Singapore and Malaysia with a $50k target. Shall I open the document?";
    } else if (lowerInput.includes('가격') || lowerInput.includes('price')) {
      reply = language === 'ko'
        ? "글로벌 가격 정책을 조회합니다...\n현재 달러 환율 기준, 알마이너 하드 왁스(500g)의 권장 소비자가는 $18.50 (USD)입니다. 마진율 160%가 적용되었습니다."
        : "Checking Global Pricing...\nBased on current rates, the R-minu Hard Wax (500g) MSRP is $18.50 USD. This includes a 160% markup margin.";
    } else if (lowerInput.includes('비전') || lowerInput.includes('vision') || lowerInput.includes('회사') || lowerInput.includes('company')) {
      reply = language === 'ko'
        ? "오션테크의 비전은 [해양 바이오 기술]과 [디지털 뷰티]의 융합입니다.\n바다의 생명력을 데이터 기반의 홈케어 솔루션으로 재해석하여, 글로벌 No.1 스마트 뷰티 기업으로 도약하는 것이 목표입니다."
        : "Ocean Tech's vision is the convergence of [Marine Bio-Tech] and [Digital Beauty].\nWe aim to be the Global No.1 Smart Beauty Company by reinterpreting marine vitality into data-driven home care solutions.";
    } else if (lowerInput.includes('안녕') || lowerInput.includes('hi') || lowerInput.includes('hello')) {
      reply = language === 'ko'
        ? "반갑습니다! 오늘 미팅 준비는 완벽하신가요? 제가 도울 일이 있다면 말씀해주세요."
        : "Greetings! Is everything ready for the meeting? Let me know if I can assist.";
    } else {
      reply = language === 'ko'
        ? "죄송합니다. 현재 데모 모드에서는 [수출], [가격], [제품], [비전] 관련 문의에만 답변할 수 있도록 설정되어 있습니다."
        : "I apologize. In Demo Mode, I am configured to answer inquiries related to [Export], [Price], [Products], and [Vision] only.";
    }

    setIsTyping(false);
    addMessage('bot', reply);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  if (isHidden) return null;

  return (
    <>
      <div className={`${styles.floatingButtonContainer} ${isOpen ? styles.hidden : ''}`}>
        <button
          onClick={() => setIsOpen(true)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={styles.floatingButton}
        >
          <div className={styles.gradientBg}></div>
          <Sparkles className="w-6 h-6 text-[#00d2ff]" />
          
          <div className={`${styles.tooltip} ${isHovered ? styles.visible : ''}`}>
            <span style={{ color: '#00d2ff' }}>AI Agent</span> Online
          </div>
        </button>
      </div>

      <div className={`${styles.chatWindow} ${!isOpen ? styles.closed : ''}`}>
        <div className={styles.header}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#00d2ff]/10 flex items-center justify-center border border-[#00d2ff]/30" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(0, 210, 255, 0.1)', border: '1px solid rgba(0, 210, 255, 0.3)' }}>
              <Sparkles className="w-4 h-4 text-[#00d2ff]" />
            </div>
            <div>
              <h3 className={styles.headerTitle}>
                Ocean AI 
                <span className={styles.betaTag}>BETA</span>
              </h3>
              <p className={styles.statusText}>
                <span className={`${styles.animatePulse}`} style={{ width: '6px', height: '6px', backgroundColor: '#22c55e', borderRadius: '50%', display: 'inline-block' }}></span>
                System Operational
              </p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className={styles.closeButton}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className={styles.messageArea}>
          {messages.map((msg) => (
            <div key={msg.id} className={`${styles.messageRow} ${styles[msg.role]}`}>
              
              {msg.role === 'system' && (
                <div className={styles.systemMessage}>
                   <Globe className="w-3 h-3" /> {msg.text}
                </div>
              )}

              {msg.role !== 'system' && (
                <div className={`${styles.bubble} ${styles[msg.role]}`}>
                  {msg.text}
                </div>
              )}
              {msg.role !== 'system' && (
                <span className={styles.timestamp}>{msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
              )}
            </div>
          ))}

          {isTyping && (
             <div className={`${styles.messageRow} ${styles.bot}`}>
               <div className={`${styles.bubble} ${styles.bot}`} style={{ padding: '12px 16px' }}>
                 <div className={styles.typingIndicator}>
                   <span className={styles.dot} style={{animationDelay: '0s'}}></span>
                   <span className={styles.dot} style={{animationDelay: '0.2s'}}></span>
                   <span className={styles.dot} style={{animationDelay: '0.4s'}}></span>
                 </div>
               </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {messages.length > 0 && messages.length < 5 && (
            <div className={styles.quickActions}>
                <button 
                  onClick={() => { setInput(language === 'ko' ? '수출 정보 알려줘' : 'Tell me export info'); handleSend(); }}
                  className={styles.actionButton}
                >
                   {language === 'ko' ? '📊 수출 계획 확인' : '📊 Check Export Plan'}
                </button>
                <button 
                   onClick={() => { setInput(language === 'ko' ? '가격 정책 보여줘' : 'Show me pricing'); handleSend(); }}
                   className={styles.actionButton}
                >
                   {language === 'ko' ? '💰 글로벌 가격' : '💰 Global Pricing'}
                </button>
                <button 
                   onClick={() => { setInput(language === 'ko' ? '회사 비전이 뭐야?' : 'What is the vision?'); handleSend(); }}
                   className={styles.actionButton}
                >
                   {language === 'ko' ? '🏢 회사 비전' : '🏢 Company Vision'}
                </button>
            </div>
        )}

        <div className={styles.inputArea}>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={language === 'ko' ? "무엇이든 물어보세요..." : "Ask me anything..."}
              className={styles.textInput}
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim()}
              className={styles.sendButton}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <div className={styles.footer}>
            Powered by <span style={{ color: '#6b7280', fontWeight: 'bold' }}>Ocean-Gemini Engine</span>
          </div>
        </div>
      </div>
    </>
  );
}
