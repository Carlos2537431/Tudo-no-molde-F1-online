import React, { useEffect, useRef, useState } from "react";
import "./App.css";

// ====================================================================
// Componente Genérico para Fade-In On Scroll (ÚNICO)
// ====================================================================
function FadeInOnScroll({ children }) {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return <div ref={ref} className="fade-on-scroll">{children}</div>;
}

// ====================================================================
// Componente de Timeline
// ====================================================================
function Timeline() {
  const lineRef = useRef(null);

  useEffect(() => {
    function handleScroll() {
      const line = lineRef.current;
      if (!line) return;

      const rect = line.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Verifica se o topo da timeline está visível
      if (rect.top < windowHeight) {
        // Altura visível da linha em relação ao topo da tela
        const visibleHeight = windowHeight - rect.top;
        // Altura total da linha
        const fullHeight = rect.height;
        // Calcula a porcentagem, limitando a 1 (100%)
        const percentage = Math.min(visibleHeight / fullHeight, 1);
        
        // Aplica a variável CSS para animar o progresso
        line.style.setProperty("--line-progress", `${percentage * 100}%`);
      }
    }

    function computeBonusSpan() {
      const line = lineRef.current;
      if (!line) return;
      const bonusItem = line.querySelector('.timeline-item.bonus');
      const totalHeight = line.offsetHeight || 1;
      if (bonusItem) {
        const start = bonusItem.offsetTop;
        const end = start + bonusItem.offsetHeight;
        const startPct = Math.max(0, Math.min(100, (start / totalHeight) * 100));
        const endPct = Math.max(0, Math.min(100, (end / totalHeight) * 100));
        line.style.setProperty('--bonus-start', `${startPct}%`);
        line.style.setProperty('--bonus-end', `${endPct}%`);
      } else {
        line.style.setProperty('--bonus-start', `0%`);
        line.style.setProperty('--bonus-end', `0%`);
      }
    }

    // Chama no mount para corrigir estado inicial
    handleScroll();
    computeBonusSpan();
    
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll); // Recalcula ao redimensionar
    window.addEventListener("resize", computeBonusSpan);
    window.addEventListener("load", computeBonusSpan);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      window.removeEventListener("resize", computeBonusSpan);
      window.removeEventListener("load", computeBonusSpan);
    };
  }, []);

  return (
    <div className="timeline-wrapper">
      <h2 className="timeline-title">
        Vou te mostrar todo o conteúdo que você encontrará no curso <span>TUDO NO MOLDE F1</span>
      </h2>

      <div className="timeline" ref={lineRef}>
        
        {/* Usamos FadeInOnScroll para animar cada item individualmente */}
        <FadeInOnScroll>
            <div className="timeline-item left">
              <h3> Módulo 1 – Fundamentos:</h3>
              <p>• Boas-vindas e apresentação</p>
              <p>• Produtos, materiais e teoria do molde</p>
              <p>• Tipos de unhas, teoria da estrutura no molde</p>
            </div>
        </FadeInOnScroll>

        <FadeInOnScroll>
            <div className="timeline-item right">
              <h3>Módulo 2 – Preparação:</h3>
              <p>• Escolha do molde ideal</p>
              <p>• Preparação física e química</p>
              <p>• Prática em diferentes tipos de unhas</p>
            </div>
        </FadeInOnScroll>

        <FadeInOnScroll>
            <div className="timeline-item left">
              <h3>Módulo 3 – Aplicação:</h3>
              <p>• Alongamento formato Quadrado</p>
              <p>• Alongamento formato Almond</p>
              <p>• Aplicação completa passo a passo</p>
            </div>
        </FadeInOnScroll>

         <FadeInOnScroll>
            <div className="timeline-item right">
              <h3>Módulo 4 – Manutenção:</h3>
              <p>• Manutenção Almond</p>
              <p>• Manutenção Quadrado</p>
            </div>
        </FadeInOnScroll>

         <FadeInOnScroll>
            <div className="timeline-item left">
              <h3>Módulo 5 – Lixamento:</h3>
              <p>• Lixamento técnico detalhado </p>
              
            </div>
        </FadeInOnScroll>
          <FadeInOnScroll>
         <div className="timeline-item right">
              <h3>Módulo 6 – Blindagem e Banho de Gel:</h3>
              <p>•  Aplicação e manutenção de Blindagem</p>
              <p>• Aplicação e manutenção de Banho de Gel</p>
            </div>
        </FadeInOnScroll>
       <FadeInOnScroll>
         <div className="timeline-item left bonus">
              <h3>Módulo (Bonus):</h3>
              <p>•4 tipos de reversa transparente </p>
              <p>•Finalizações de nail art que mais vende </p>
              <p>•Esmaltação em gel </p>
              <p>•Aula de fotografia de unhas </p>
              <p>•Posicionamento no Instagram </p>
              <p>•Ficha de anamnese</p>

            </div>
        </FadeInOnScroll>

        {/* Elementos visuais da Timeline */}
        <div className="timeline-line"></div>
        <div className="timeline-progress"></div>

        <div className="timeline-dot top"></div>
        <div className="timeline-dot bottom"></div>
      </div>
    </div>
  );
}

// ====================================================================
// Component Section
// ====================================================================
function Section({ title, text, extra, images }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section className="section-container" ref={sectionRef}>
      <h2 className="section-title">
        {title} <span>TUDO NO MOLDE F1</span>
      </h2>

      <div className="section-card">
        <div className="image-group">
          {images.map((src, i) => (
            <img key={i} src={src} alt={title} className="section-image" />
          ))}
        </div>

        <div className="section-text">
          <p>{text}</p>
          <p className="section-extra">{extra}</p>
        </div>
      </div>
    </section>
  );
}

// ====================================================================
// Depoimentos (carrossel)
// ====================================================================
function Testimonials() {
  const testimonials = [
    <img src="/Depoimento1.jpeg" alt="Depoimento 1" className="testimonial-image" />,
    <img src="/Depoimento2.jpeg" alt="Depoimento 2" className="testimonial-image" />,
    <img src="/Depoimento3.jpeg" alt="Depoimento 3" className="testimonial-image" />,
    <img src="/Depoimento4.jpeg" alt="Depoimento 4" className="testimonial-image" />,
    <img src="/Depoimento5.jpeg" alt="Depoimento 5" className="testimonial-image" />,
    <img src="/Depoimento6.jpeg" alt="Depoimento 6" className="testimonial-image" />,
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setIndex((prev) => (prev + 1) % testimonials.length),
      3000
    );
    return () => clearInterval(interval);
  }, [testimonials.length]); 

  return (
    <section className="testimonials">
      <h2 className="section-title"><span>Depoimentos</span> de alunas</h2>
      <div className="testimonial-box">{testimonials[index]}</div>
    </section>
  );
}

// ====================================================================
// Contagem Regressiva (15 minutos)
// ====================================================================
function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutos em segundos

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  return (
    <div className="countdown-container" role="status" aria-live="polite">
      <div className="countdown-badge">Oferta por tempo limitado</div>
      <h3 className="countdown-title">Contagem regressiva para o fim da oferta</h3>
      <div className="countdown-timer" aria-label={`faltam ${minutes} minutos e ${seconds} segundos`}>
        <span className="countdown-inline-label">Contagem regressiva para o fim da oferta</span>
        <div className="countdown-box">
          <span className="countdown-number">{minutes}</span>
          <span className="countdown-label">Minutos</span>
        </div>
        <span className="countdown-separator">:</span>
        <div className="countdown-box">
          <span className="countdown-number">{seconds}</span>
          <span className="countdown-label">Segundos</span>
        </div>
      </div>
      {timeLeft <= 0 && (
        <p className="countdown-expired">Tempo esgotado! Entre em contato para não perder a vaga.</p>
      )}
    </div>
  );
}

// ====================================================================
// FAQ (Acordeão)
// ====================================================================
function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "Para quem é este curso?",
      answer:
        "Para manicures e nail designers iniciantes ou que ja atuam na area com procedimentos em gel.",
    },
    {
      question: "Preciso de experiência prévia?",
      answer:
        "Conhecimento básico ajuda, mas o método é direto e prático. Com treino você aplica em clientes rapidamente.",
    },
    {
      question: "Como recebo o acesso?",
      answer:
        "O acesso é liberado imediatamente após a confirmação do pagamento. Você recebe um e-mail com as instruções.",
    },
    {
      question: "Quanto tempo tenho de Acesso?",
      answer: "O tempo de acesso ao curso gravado é de 6 meses.",
    },
    {
      question: "Tem certificado?",
      answer: "Sim, ao concluir as aulas você emite seu certificado digital.",
    },
    {
      question: "E se eu não gostar?",
      answer:
        "Você tem 7 dias de garantia incondicional para pedir reembolso se não curtir o conteúdo.",
    },
  ];

  return (
    <section className="faq-section">
      <h2 className="section-title">
        Perguntas <span>Frequentes</span>
      </h2>
      <div className="faq-container">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className={`faq-item ${activeIndex === i ? "active" : ""}`}
            onClick={() => setActiveIndex(activeIndex === i ? null : i)}
          >
            <div className="faq-question">
              <h3>{faq.question}</h3>
              <span className="faq-icon">{activeIndex === i ? "−" : "+"}</span>
            </div>
            {activeIndex === i && (
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

// ====================================================================
// Componente principal
// ====================================================================
function App() {

  const sections = [
    {
      title: "O que você encontrará no",
      text: "Estrututra com naturalidade ",
      extra: "Gravação profissional e foco no detalhe",
      images: ["/unhas1.jpeg", "/unhas2.jpeg"],
    },
    {
      title: "Aprenda a escolher o molde ideal",
      text: "Preparo correto da unha com encaixe perfeito do molde F1",
      extra: "Aprenda a quantidade correta de produto no molde F1",
      images: ["/unhas3.jpeg", "/unhas4.jpeg"],
    },
    {
      title: "Estrutura no molde F1",
      text: "Estrutura profissional com durabilidade e resistência",
      extra: "Redução de tempo em mesa e dominino total do molde F1",
      images: ["/unhas5.jpeg", "/unhas6.jpeg"],
    },
    {
      title: "Finalização de altíssimo padrão",
      text: "Acabamento fino com pouco lixamento",
      extra: "Estrutura fina e resistente",
      images: ["/unhas7.jpeg", "/unhas8.jpeg"],
    },
  ];

  return (
    <>
      {/* Barra fixa com o contador no topo */}
      <div className="countdown-fixed">
        <CountdownTimer />
      </div>

      <div className="app-container with-fixed-countdown">
        <div className="content-wrapper">
          <div className="text-container">
            <h1 className="main-title">TUDO NO MOLDE F1</h1>
            <h2 className="subtitle">Instrutora Ingrid Pena</h2>

            <p className="description">“Essa não é só mais uma técnica… é o método que vai te fazer dominar o Molde F1 do zero à perfeição!”</p>
            

            <a href="https://pay.kiwify.com.br/iOJCPvL" target="_blank" rel="noopener noreferrer">
              <button className="button">GARANTIR MINHA VAGA</button>
            </a>
          </div>

          <div className="image-container">
            <img src="/ingrid.jpeg" alt="Instrutora" className="main-image" />
            
          </div>
        </div>

        {sections.map((sec, i) => (
          <Section key={i} {...sec} />
        ))}
        
        {/* --- INSERÇÃO DA TIMELINE --- */}
        <FadeInOnScroll>
            <Timeline />
        </FadeInOnScroll>

        {/* SOBRE A INSTRUTORA */}
        <FadeInOnScroll>
          <section className="bio-section">
            <h2 className="bio-title">Quem é <span>Ingrid Pena ?</span></h2>

            <div className="bio-wrapper">
              <div className="bio-image-container"> 
                <img src="/ingrid3.png" className="bio-main-img" alt="Ingrid Pena" /> 
              </div>

              <div className="bio-text">
                <p>Tenho 26 anos, sou cristã, esposa e mãe.</p>
                <p>Sou manicure desde os <strong>12 anos</strong> e, desde o início, sempre busquei  aprimorar meus resultados e minha técnica.</p>
             <p>Por muito tempo senti falta de um curso que fosse realmente didático, simples e direto, que tornasse o aprendizado leve e prático e foi dessa necessidade que nasceu o Tudo no Molde F1.</p>
                <p>Quando decidi criar essa técnica, meu maior objetivo era desenvolver algo simples, funcional e acessível.
Depois de um ano e meio de estudos e testes, o Tudo no Molde F1 se tornou uma realidade e em menos de um ano, já transformou a jornada de mais de 500 alunas, que hoje vivem uma nova fase na profissão, com resultados mais naturais, seguros e de alto padrão.</p>
              </div>
            </div>
          </section>
        </FadeInOnScroll>

        {/* ⭐ DEPOIMENTOS */}
        <FadeInOnScroll>
          <Testimonials />
        </FadeInOnScroll>

        {/* 💳 OFERTA (antes das Perguntas Frequentes) */}
        <FadeInOnScroll>
          <section className="offer">
            <div className="offer-badge">Oferta limitada 24h</div>
            <h2 className="offer-title">Acesso completo de<span className="price-old">R$ 1.497,00</span></h2>
            <div className="price-wrapper">
              <p>Por:</p>
              <p className="price">R$ <span>997</span>,00</p>
              <p className="price-installments">ou em até 12x de R$ <span>103,11</span></p>
            </div>
            <p className="offer-note">Promoção de lançamento: de R$ 1.497 por R$ 997 — válida por 24 horas.</p>
            <a href="https://pay.kiwify.com.br/iOJCPvL" target="_blank" rel="noopener noreferrer">
              <button className="button offer-btn">QUERO COMEÇAR AGORA</button>
            </a>
          </section>
        </FadeInOnScroll>

        {/* ❓ FAQ */}
        <FadeInOnScroll>
          <FAQ />
        </FadeInOnScroll>

        {/* Botão Final no rodapé com texto acima (antes da garantia) */}
        <FadeInOnScroll>
          <div className="final-button-container">
            <p style={{ textAlign: "center", marginBottom: "1rem" }}>Caso ainda tenha duvidas sobre o curso</p>
            <a href="https://wa.me/5519990152578" target="_blank" rel="noopener noreferrer">
              <button className="button final-button">
                <img src="/zap.png" alt="" className="button-icon" aria-hidden="true" />
                Entre em contato agora
              </button>
            </a>
          </div>
        </FadeInOnScroll>

        {/* 🔒 GARANTIA - agora por último */}
        <FadeInOnScroll>
          <section className="guarantee">
            <img src="/garantia.png" className="seal" alt="Garantia" />
            <h2>Garantia incondicional de 7 dias</h2>
            <p>Se você não amar o conteúdo, devolvemos seu dinheiro sem perguntas.</p>
          </section>
        </FadeInOnScroll>
      </div>


    </>
  );
}

export default App;