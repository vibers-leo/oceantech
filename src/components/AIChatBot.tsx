'use client';

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
    await wait(800);

    const langLabel = language === 'ko' ? '한국어' : language === 'th' ? 'ภาษาไทย' : 'English';
    addMessage('system', language === 'ko' ? `언어: ${langLabel} 설정 완료` : `Language: ${langLabel} set`);

    await wait(600);
    setIsTyping(false);
    const greeting = language === 'ko'
      ? "안녕하세요! 오션테크 AI 어시스턴트입니다.\n제품이나 수출 관련하여 무엇을 도와드릴까요?"
      : language === 'th'
      ? "สวัสดีครับ! ผมคือ AI Assistant ของ Ocean Tech\nมีอะไรให้ช่วยเกี่ยวกับผลิตภัณฑ์หรือการส่งออกครับ?"
      : "Hello! I am the Ocean Tech AI Assistant.\nHow can I help you regarding our products or export inquiries?";
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

    if (lowerInput.includes('수출') || lowerInput.includes('export') || lowerInput.includes('ส่งออก')) {
      reply = language === 'ko'
        ? "현재 아마존 US 입점과 쇼피 동남아 진출을 준비 중입니다.\n주요 타겟 국가는 싱가포르, 말레이시아, 태국이며, 수출 관련 문의는 Business 페이지에서 직접 남겨주실 수 있습니다."
        : language === 'th'
        ? "เรากำลังเตรียมเข้า Amazon US และ Shopee เอเชียตะวันออกเฉียงใต้ สำหรับสอบถามเกี่ยวกับการส่งออก กรุณาไปที่หน้า Business"
        : "We are currently preparing for Amazon US and Shopee Southeast Asia. For export inquiries, please visit our Business page.";
    } else if (lowerInput.includes('가격') || lowerInput.includes('price') || lowerInput.includes('ราคา')) {
      reply = language === 'ko'
        ? "R-minu 하드왁스 가격 안내:\n• 200g: 9,500원\n• 400g: 14,400원\n• 500g: 14,450원\n• 1000g: 21,140원\n무료 배송이며, 쇼핑 페이지에서 바로 구매하실 수 있습니다."
        : language === 'th'
        ? "ราคา R-minu Hard Wax:\n• 200g: ₩9,500\n• 500g: ₩14,450\n• 1000g: ₩21,140\nจัดส่งฟรี! ไปที่หน้าร้านค้าเพื่อสั่งซื้อ"
        : "R-minu Hard Wax pricing:\n• 200g: ₩9,500\n• 500g: ₩14,450\n• 1000g: ₩21,140\nFree shipping! Visit our Shop page to order.";
    } else if (lowerInput.includes('라캉') || lowerInput.includes('lacan')) {
      reply = language === 'ko'
        ? "라캉 왁스는 전문가 전용 프리미엄 왁스 브랜드입니다.\n전문가 인증을 통해 가입하시면 특별 가격과 교육 자료를 이용하실 수 있습니다.\n라캉 페이지에서 자세한 내용을 확인해주세요."
        : "Lacan Wax is a premium wax brand exclusively for certified professionals.\nVisit the Lacan page for more details on membership and benefits.";
    } else if (lowerInput.includes('알마이너') || lowerInput.includes('rminu') || lowerInput.includes('r-minu') || lowerInput.includes('제품') || lowerInput.includes('product')) {
      reply = language === 'ko'
        ? "R-minu(알마이너)는 전문가용 라캉의 기술력을 홈케어로 확장한 셀프 왁싱 브랜드입니다.\n3가지 핵심 기술(엘라스틱 테크, 모발 응집 테크, 밀착 코팅 테크)이 적용되어 있습니다.\nR-minu 페이지에서 상세 정보를 확인하세요."
        : "R-minu is a premium self-waxing brand with 3 core technologies.\nVisit the R-minu page for detailed product information.";
    } else if (lowerInput.includes('안녕') || lowerInput.includes('hi') || lowerInput.includes('hello') || lowerInput.includes('สวัสดี')) {
      reply = language === 'ko'
        ? "반갑습니다! 제품, 가격, 수출 등 궁금한 점을 물어보세요."
        : language === 'th'
        ? "สวัสดีครับ! ถามได้เลยเกี่ยวกับผลิตภัณฑ์ ราคา หรือการส่งออก"
        : "Hello! Feel free to ask about our products, pricing, or export opportunities.";
    } else {
      reply = language === 'ko'
        ? "죄송합니다. 현재 데모 모드에서는 수출, 가격, 제품(라캉/R-minu) 관련 문의에만 답변 가능합니다.\n더 자세한 문의는 Business 페이지를 이용해주세요."
        : language === 'th'
        ? "ขออภัยครับ ในโหมดเดโม ผมตอบได้เฉพาะเรื่องการส่งออก ราคา และผลิตภัณฑ์เท่านั้น\nกรุณาใช้หน้า Business สำหรับคำถามเพิ่มเติม"
        : "I apologize. In Demo Mode, I can answer inquiries about export, pricing, and products (Lacan/R-minu) only.\nFor detailed inquiries, please use our Business page.";
    }

    setIsTyping(false);
    addMessage('bot', reply);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  const quickActions = language === 'ko'
    ? [
        { label: '제품 정보', query: '알마이너 제품 알려줘' },
        { label: '가격 안내', query: '가격 정보 알려줘' },
        { label: '수출 문의', query: '수출 정보 알려줘' },
      ]
    : language === 'th'
    ? [
        { label: 'ผลิตภัณฑ์', query: 'product info' },
        { label: 'ราคา', query: 'price info' },
        { label: 'ส่งออก', query: 'export info' },
      ]
    : [
        { label: 'Products', query: 'Tell me about R-minu' },
        { label: 'Pricing', query: 'Show me pricing' },
        { label: 'Export', query: 'Tell me about export' },
      ];

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
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(0, 210, 255, 0.1)', border: '1px solid rgba(0, 210, 255, 0.3)' }}>
              <Sparkles className="w-4 h-4 text-[#00d2ff]" />
            </div>
            <div>
              <h3 className={styles.headerTitle}>
                Ocean AI
                <span className={styles.betaTag}>DEMO</span>
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
              {quickActions.map((action, idx) => (
                <button
                  key={idx}
                  onClick={() => { setInput(action.query); setTimeout(() => handleSend(), 0); }}
                  className={styles.actionButton}
                >
                  {action.label}
                </button>
              ))}
            </div>
        )}

        <div className={styles.inputArea}>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={language === 'ko' ? "무엇이든 물어보세요..." : language === 'th' ? "ถามอะไรก็ได้..." : "Ask me anything..."}
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
            Powered by <span style={{ color: '#6b7280', fontWeight: 'bold' }}>Ocean AI</span>
          </div>
        </div>
      </div>
    </>
  );
}
