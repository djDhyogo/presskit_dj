import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  Tag,
  Card,
  Logo,
  Eyebrow,
  OutlineWord,
  SectionTitle,
  PosterStatement,
  Quote,
  StatBlock,
  PhotoFrame,
  TimelineItem,
  ContactRow,
} from './components';

const PHOTO = {
  retrato: '/assets/photo-dhyogo-retrato.jpg',
  festa15: '/assets/photo-festa-15-anos.jpg',
  arteAs: '/assets/art-as-de-espadas.jpeg',
  carnaval: '/assets/photo-carnaval-2025.jpg',
  camarote: '/assets/photo-camarote-imperoza.jpg',
  avioes: '/assets/photo-avioes-forro-2023.jpg',
  veraneio: '/assets/photo-veraneio-2025.jpg',
  openA: '/assets/photo-festa-15-anos.jpg',
  openB: '/assets/photo-open-repertorio.jpg',
  openC: '/assets/photo-open-leitura-pista.jpg',
  openD: '/assets/photo-open-conducao.jpg',
};
const DRONE = {
  hd: '/assets/video-drone.mp4',
  sd: '/assets/video-drone-720.mp4',
  poster: '/assets/poster-drone.jpg',
};
const WHATSAPP = '5599991970062';
const WHATSAPP_DISPLAY = '(99) 99197-0062';

const LINKS = [
  { href: '#trajetoria', label: 'Trajetória' },
  { href: '#palcos', label: 'Palcos' },
  { href: '#open-format', label: 'Open format' },
  { href: '#contato', label: 'Contato' },
];

const MARCOS = [
  {
    year: '2011',
    title: 'Primeiras pistas',
    description: 'Início da trajetória profissional em Imperatriz — MA eventos familiares ou indicados pelo público.',
  },
  {
    year: '2012',
    title: 'Texana',
    description: 'Primeira experiência de pista em casa de shows · formação e experiência de pista.',
  },
  {
    year: '2013–2015',
    title: 'A pista cresce',
    description: <>Primeiros grandes eventos particulares e início da atuação em <strong>eventos corporativos</strong>, incluindo a parceria com o <strong>Grupo Mateus</strong>.</>,
    tag: 'Eventos corporativos',
  },
  {
    year: '2016',
    title: 'Expansão regional',
    description: <><strong>Encontro de Som Automotivo</strong> · <strong>Feste Car — João Lisboa</strong>. Novos públicos e eventos fora de Imperatriz.</>,
  },
  {
    year: '2017',
    title: 'Consolidação regional',
    description: <><strong>Feste Car — 2ª edição</strong> · João Lisboa · <strong>Clube do Chinquim</strong>.</>,
  },
  {
    year: '2018–2022',
    title: 'Experiência e consolidação',
    description: <>Uma fase de presença constante em <strong>eventos corporativos, festas particulares, eventos automotivos e eventos regionais</strong>, fortalecendo relacionamentos e repertório.</>,
  },
  {
    year: '2023',
    title: 'Aviões do Forró | Felipe Amorim',
    description: 'Abertura dos shows · Pega Essa Vibe.',
    tag: 'Grandes shows',
  },
  {
    year: '2025',
    title: 'Carnaval de Imperatriz',
    description: <><strong>4 noites no palco principal</strong> · <strong>Camarote Imperoza</strong> · DJ residente.</>,
    tag: 'Grandes palcos',
    current: true,
  },
  {
    year: '2025',
    title: 'Veraneio',
    description: 'DJ oficial da abertura do Veraneio nas Praias Municipais.',
    current: true,
  },
  {
    year: '2025',
    title: 'Frequência Nordestina',
    description: 'Participação em projeto cultural promovido pela Fundação Cultural de Imperatriz.',
    current: true,
  },
  {
    year: '2026',
    title: '15 anos de carreira',
    description: 'Um novo capítulo, mantendo a pista como ponto de partida.',
    tag: 'Próximo capítulo',
    current: true,
  },
];

const GENEROS = ['Flashback', 'Pop', 'Funk', 'Sertanejo', 'Eletrônico', 'Dance', 'Nacional', 'Internacional'];
const TIPOS = ['Casamento', '15 anos', 'Corporativo', 'Carnaval'];
const ETAPAS = [
  ['01', 'Briefing', 'Quem é o público, o que não pode faltar, o que não pode tocar.'],
  ['02', 'Repertório sob medida', 'Montado para o evento, não um set reaproveitado.'],
  ['03', 'Leitura de pista', 'Ajuste em tempo real.'],
  ['04', 'Condução até o fim', 'A última hora com o cuidado da primeira.'],
];

function downloadPdf() {
  document.body.classList.add('is-print-preview');
  window.setTimeout(() => {
    window.print();
    window.setTimeout(() => {
      if (!new URLSearchParams(window.location.search).has('print')) {
        document.body.classList.remove('is-print-preview');
      }
    }, 300);
  }, 50);
}

function Nav() {
  const [open, setOpen] = useState(false);

  function go() {
    setOpen(false);
  }

  return (
    <header className={open ? 'nav is-open' : 'nav'}>
      <div className="shell nav-inner">
        <a href="#topo" className="nav-brand" onClick={go} aria-label="DJ DHYOGO — início">
          <Logo height={22} />
        </a>
        <nav className="nav-links" aria-label="Seções">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="nav-link">{l.label}</a>
          ))}
        </nav>
        <div className="nav-actions">
          <button className="nav-print-btn no-print" type="button" onClick={downloadPdf}>
            Baixar PDF
          </button>
          <span className="nav-cta-desktop no-print">
            <Button size="sm" variant="primary" icon="→" href="#contato">Orçamento</Button>
          </span>
          <button className="nav-menu-btn no-print" type="button" aria-expanded={open} aria-controls="menu-mobile" onClick={() => setOpen((v) => !v)}>
            {open ? 'Fechar' : 'Menu'}
          </button>
        </div>
      </div>
      <div id="menu-mobile" className="nav-drawer no-print">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={go}>{l.label}</a>
        ))}
        <a href="#contato" onClick={go}>Orçamento</a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="topo" className="hero section-anchor print-sheet">
      <img className="hero-photo" src={PHOTO.retrato} alt="DJ Dhyogo" />
      <span className="hero-wash" aria-hidden="true" />
      <div className="shell hero-shell">
        <div className="print-hero-brand">
          <Logo height={22} />
        </div>
        <div className="hero-copy">
          <Eyebrow>DJ open format · Imperatriz — MA · desde 2011</Eyebrow>
          <PosterStatement as="h1" className="hero-title" size="clamp(44px, 5.6vw, 82px)" highlight="Uma experiência.">
            Uma trajetória.<br />Muitos públicos.
          </PosterStatement>
          <p className="hero-lead">Casamento, 15 anos, carnaval, corporativo. Muda o público, muda o repertório — não muda o padrão.</p>
          <div className="hero-stats">
            <StatBlock caption="Experiência" value="+15" label="Anos de pista" size="md" />
            <StatBlock caption="Eventos" value="+1000" label="Realizados" size="md" />
          </div>
          <div className="hero-cta no-print">
            <Button variant="primary" icon="→" href="#contato">Consultar data</Button>
            <Button variant="ghost" icon="→" href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer">Falar no WhatsApp</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Trajetoria() {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const timeline = timelineRef.current;
    if (!section || !timeline) return;

    const quote = section.querySelector('.trajetoria-quote');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const printing = () => document.body.classList.contains('is-print-preview') || window.matchMedia('print').matches;

    if (reduce || printing()) return undefined;

    section.classList.add('is-scroll');
    let raf = 0;

    function update() {
      raf = 0;
      if (printing()) return;
      const events = timeline.querySelectorAll('.timeline-event');
      const vh = window.innerHeight;
      const pin = section.querySelector('.trajetoria-pin');
      const stacked = window.matchMedia('(max-width: 980px)').matches;
      let focusY = vh * 0.42;
      if (stacked && pin) {
        const pinBottom = pin.getBoundingClientRect().bottom;
        const remain = Math.max(96, vh - pinBottom);
        focusY = pinBottom + remain * 0.34;
      }
      const first = events[0];
      const last = events[events.length - 1];
      const start = first ? first.getBoundingClientRect().top + 8 : timeline.getBoundingClientRect().top;
      const end = last ? last.getBoundingClientRect().top + 8 : start + 1;
      const progress = Math.min(1, Math.max(0, (focusY - start) / Math.max(1, end - start)));
      timeline.style.setProperty('--timeline-progress', progress.toFixed(4));

      if (quote) {
        const qr = quote.getBoundingClientRect();
        const qMid = qr.top + qr.height * 0.45;
        let fade = qMid < focusY
          ? Math.max(0, 1 - (focusY - qMid) / (vh * 0.36))
          : Math.max(0.2, 1 - (qMid - focusY) / (vh * 0.5));
        if (stacked && pin) {
          const pinBottom = pin.getBoundingClientRect().bottom;
          if (qr.bottom <= pinBottom + 6) fade = 0;
          else if (qr.top < pinBottom + 20) {
            fade = Math.min(fade, Math.max(0, (qr.bottom - pinBottom) / Math.max(40, qr.height)));
          }
        }
        quote.style.setProperty('--quote-opacity', fade.toFixed(3));
        quote.classList.toggle('is-active', fade > 0.55);
      }

      events.forEach((el) => {
        const r = el.getBoundingClientRect();
        const mid = r.top + Math.min(36, r.height * 0.28);
        let opacity;
        if (mid > focusY) {
          const t = 1 - Math.min(1, Math.max(0, (mid - focusY) / (vh * 0.48)));
          opacity = 0.1 + t * 0.9;
        } else {
          const t = Math.min(1, Math.max(0, (focusY - mid) / (vh * 0.34)));
          opacity = 1 - t;
        }
        if (stacked && pin) {
          const pinBottom = pin.getBoundingClientRect().bottom;
          if (r.bottom <= pinBottom + 10) {
            opacity = 0;
          } else if (r.top < pinBottom + 36) {
            const cover = (pinBottom + 36 - r.top) / Math.max(52, r.height * 0.6);
            opacity = Math.min(opacity, Math.max(0, 1 - cover));
          }
        }
        if (opacity < 0.12) opacity = 0;
        const seen = mid < focusY + 80;
        el.style.setProperty('--event-opacity', opacity.toFixed(3));
        el.classList.toggle('is-seen', seen);
        el.classList.toggle('is-active', false);
      });

      let best = null;
      let bestDist = Infinity;
      events.forEach((el) => {
        const r = el.getBoundingClientRect();
        const mid = r.top + Math.min(36, r.height * 0.28);
        const dist = Math.abs(mid - focusY);
        if (dist < bestDist) {
          bestDist = dist;
          best = el;
        }
      });
      if (best && bestDist < vh * 0.28) best.classList.add('is-active');
    }

    function onScroll() {
      if (!raf) raf = requestAnimationFrame(update);
    }

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      section.classList.remove('is-scroll');
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="trajetoria" ref={sectionRef} className="shell trajetoria section-anchor print-sheet print-flow">
      <div className="trajetoria-intro">
        <div className="trajetoria-pin">
          <SectionTitle
            eyebrow="Capítulo 02 — Trajetória"
            size="display-2"
            lead={
              <>
                Da primeira pista aos <mark className="quote-mark">grandes palcos</mark>. Uma trajetória construída ao longo de 15 anos, entre casas de shows, eventos particulares, corporativos, eventos automotivos e grandes apresentações públicas.
              </>
            }
          >
            Quinze anos de pista
          </SectionTitle>
        </div>
        <div className="trajetoria-side">
          <Quote className="trajetoria-quote" attribution="DJ Dhyogo">
            <mark className="quote-mark">Texana</mark> foi a escola. Leitura de pista toda semana, sem ensaio. Sempre lembro dela.
          </Quote>
          <ul className="timeline" ref={timelineRef}>
            <li className="timeline-fill" aria-hidden="true" />
            {MARCOS.map((m, i) => (
              <TimelineItem
                key={`${m.year}-${m.title}`}
                year={m.year}
                title={m.title}
                active={!!m.current}
                last={i === MARCOS.length - 1}
                description={
                  <>
                    {m.description}
                    {m.tag ? (
                      <span className="timeline-tag">
                        <Tag size="sm" tone={m.current ? 'brand' : 'lilas'}>{m.tag}</Tag>
                      </span>
                    ) : null}
                  </>
                }
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Palcos() {
  return (
    <section id="palcos" className="palcos section-anchor print-sheet">
      <OutlineWord className="palcos-word" size="clamp(120px, 18vw, 240px)" style={{ position: 'absolute', right: '-40px', bottom: '-30px' }}>PALCOS</OutlineWord>
      <div className="shell palcos-inner">
        <SectionTitle
          eyebrow="Capítulo 03 — Grandes palcos"
          size="title-1"
          lead="Quatro noites no palco principal do Carnaval de Imperatriz 2025, residência no Camarote Imperoza, abertura do Aviões do Forró em 2023 e do Veraneio 2025."
        >
          Quando a pista é a cidade inteira
        </SectionTitle>
        <div className="palcos-grid">
          <PhotoFrame src={PHOTO.carnaval} alt="DJ Dhyogo no Carnaval de Imperatriz 2025" ratio="3/4" objectPosition="50% 42%" tint={false} grade={false} caption="Carnaval 2025" />
          <PhotoFrame src={PHOTO.camarote} alt="Camarote Imperoza" ratio="3/4" objectPosition="55% 35%" tint={false} grade={false} caption="Camarote Imperoza" />
          <PhotoFrame src={PHOTO.avioes} alt="Aviões do Forró — 2023" ratio="3/4" objectPosition="35% 40%" tint={false} grade={false} caption="Aviões do Forró — 2023" />
          <PhotoFrame src={PHOTO.veraneio} alt="Veraneio 2025" ratio="3/4" objectPosition="30% 25%" tint={false} grade={false} caption="Veraneio 2025" />
        </div>
      </div>
    </section>
  );
}

function DroneFilm() {
  const ref = useRef(null);
  const videoRef = useRef(null);
  const [src] = useState(() => (window.matchMedia('(max-width: 900px)').matches ? DRONE.sd : DRONE.hd));
  const [reduce] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const box = ref.current;
    const video = videoRef.current;
    if (!box || !video) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (!reduce) video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(box);
    return () => io.disconnect();
  }, [reduce]);

  return (
    <div ref={ref} className={`open-film no-print ${visible ? 'is-visible' : ''}`}>
      <video
        ref={videoRef}
        src={src}
        poster={DRONE.poster}
        muted
        loop
        playsInline
        preload="metadata"
        controls={reduce}
        aria-label="Imagens aéreas de drone de uma apresentação do DJ Dhyogo"
      />
    </div>
  );
}

function OpenFormat() {
  const [sel, setSel] = useState('Flashback');
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const shots = [PHOTO.openA, PHOTO.openB, PHOTO.openC, PHOTO.openD];

  useEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    if (!section || !grid) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const printing = () => document.body.classList.contains('is-print-preview') || window.matchMedia('print').matches;
    if (reduce || printing()) return undefined;

    section.classList.add('is-scroll');
    let raf = 0;

    function update() {
      raf = 0;
      if (printing()) return;
      const cards = grid.querySelectorAll('.method-card');
      const vh = window.innerHeight;
      const pin = section.querySelector('.open-pin');
      const stacked = window.matchMedia('(max-width: 980px)').matches;
      let focusY = vh * 0.46;
      if (stacked && pin) {
        const pinBottom = pin.getBoundingClientRect().bottom;
        const remain = Math.max(120, vh - pinBottom);
        focusY = pinBottom + remain * 0.42;
      }

      const anchor = (el) => {
        const r = el.getBoundingClientRect();
        return r.top + r.height * 0.42;
      };

      cards.forEach((el) => {
        const r = el.getBoundingClientRect();
        const mid = anchor(el);
        let opacity;
        if (stacked && pin) {
          const pinBottom = pin.getBoundingClientRect().bottom;
          if (r.bottom <= pinBottom + 8) {
            opacity = 0;
          } else if (r.top >= pinBottom) {
            const dist = r.top - pinBottom;
            const t = 1 - Math.min(1, dist / (vh * 0.62));
            opacity = 0.12 + t * 0.88;
          } else {
            const visible = (Math.min(r.bottom, vh) - pinBottom) / r.height;
            opacity = Math.max(0, Math.min(1, visible));
          }
        } else if (mid > focusY) {
          const t = 1 - Math.min(1, Math.max(0, (mid - focusY) / (vh * 0.55)));
          opacity = 0.14 + t * 0.86;
        } else {
          const t = Math.min(1, Math.max(0, (focusY - mid) / (vh * 0.42)));
          opacity = 1 - t;
        }
        if (opacity < 0.08) opacity = 0;
        el.style.setProperty('--event-opacity', opacity.toFixed(3));
        el.classList.toggle('is-active', false);
      });

      let best = null;
      let bestDist = Infinity;
      cards.forEach((el) => {
        const mid = anchor(el);
        const dist = Math.abs(mid - focusY);
        if (dist < bestDist) {
          bestDist = dist;
          best = el;
        }
      });
      if (best && bestDist < vh * 0.34) best.classList.add('is-active');
    }

    function onScroll() {
      if (!raf) raf = requestAnimationFrame(update);
    }

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      section.classList.remove('is-scroll');
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const chips = (className) => (
    <div className={`chip-row ${className}`} role="list">
      {GENEROS.map((x) => (
        <button key={x} type="button" className="chip-btn" onClick={() => setSel(x)} aria-pressed={sel === x}>
          <Tag tone={sel === x ? 'solid' : 'outline'}>{x}</Tag>
        </button>
      ))}
    </div>
  );

  return (
    <section id="open-format" ref={sectionRef} className="shell open-format section-anchor print-sheet">
      <div className="open-split">
        <div className="open-copy">
          <div className="open-pin">
            <SectionTitle eyebrow="Capítulo 07 — Open format" size="title-1">Não é tocar de tudo</SectionTitle>
            <PosterStatement size="clamp(26px, 2.6vw, 38px)" style={{ maxWidth: '22ch' }}>
              É saber o quê, para quem — <span style={{ color: 'var(--text-accent)' }}>e quando.</span>
            </PosterStatement>
          </div>
          {chips('chips-desk')}
        </div>
        <div className="open-stage">
          {chips('chips-mobile')}
          <div className="method-grid" ref={gridRef}>
          {ETAPAS.map((s, i) => (
            <Card key={s[0]} tone="glass" padding="none" hoverable className="method-card">
              <PhotoFrame
                className="method-shot"
                src={shots[i]}
                alt=""
                ratio="4/5"
                objectPosition={i === 0 ? '50% 35%' : i === 1 ? '50% 40%' : i === 2 ? '50% 45%' : '55% 40%'}
                tint={false}
                grade={false}
                radius="0"
                placeholder={`Foto ${s[0]}`}
              />
              <div className="method-legend">
                <div className="method-num">{s[0]}</div>
                <div className="method-title">{s[1]}</div>
                <div className="method-body">{s[2]}</div>
              </div>
            </Card>
          ))}
          </div>
        </div>
      </div>
      <DroneFilm />
    </section>
  );
}

function Orcamento() {
  const [tipo, setTipo] = useState('Casamento');
  const [sent, setSent] = useState(false);

  function onSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const nome = String(data.get('nome') || '').trim();
    const dataEvento = String(data.get('data') || '').trim();
    const whatsapp = String(data.get('whatsapp') || '').trim();
    const mensagem = [
      'Olá, Dhyogo. Gostaria de consultar uma data.',
      '',
      `Nome: ${nome}`,
      `Tipo: ${tipo}`,
      `Data: ${dataEvento}`,
      `WhatsApp: ${whatsapp}`,
    ].join('\n');
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensagem)}`, '_blank', 'noopener,noreferrer');
    setSent(true);
  }

  return (
    <section id="contato" className="contato section-anchor print-sheet is-last">
      <div className="shell contato-split">
        <div className="contato-copy">
          <SectionTitle eyebrow="Capítulo 09 — Contato" size="title-1" lead="Seu evento tem público. Ele merece quem saiba lê-lo.">
            Contato
          </SectionTitle>
          <div>
            <ContactRow label="WhatsApp" value={WHATSAPP_DISPLAY} href={`https://wa.me/${WHATSAPP}`} />
            <ContactRow label="Instagram" value="@dhyogodj" href="https://instagram.com/dhyogodj" />
            <ContactRow label="Site" value="dhyogo.com.br" href="https://dhyogo.com.br" />
            <ContactRow label="CNPJ" value="55.996.625/0001-47" />
          </div>
        </div>
        <Card tone="glass" padding="xl" className="consulta-card no-print">
          {sent ? (
            <div className="consulta-done">
              <h3>Recebido.</h3>
              <p>A conversa abre no WhatsApp. Se não abriu, fale pelo número {WHATSAPP_DISPLAY}.</p>
              <Button variant="ghost" icon="→" onClick={() => setSent(false)}>Enviar outra consulta</Button>
            </div>
          ) : (
            <form className="consulta" onSubmit={onSubmit}>
              <div className="chip-row" role="group" aria-label="Tipo de evento">
                {TIPOS.map((t) => (
                  <button key={t} type="button" className="chip-btn" onClick={() => setTipo(t)} aria-pressed={tipo === t}>
                    <Tag size="sm" tone={tipo === t ? 'solid' : 'outline'}>{t}</Tag>
                  </button>
                ))}
              </div>
              <input className="consulta-input" name="nome" required autoComplete="name" placeholder="Nome" />
              <input className="consulta-input" name="data" required placeholder="Data do evento" />
              <input className="consulta-input" name="whatsapp" required autoComplete="tel" inputMode="tel" placeholder="WhatsApp" />
              <Button variant="primary" size="lg" full icon="→" type="submit">Enviar consulta</Button>
            </form>
          )}
        </Card>
      </div>
      <div className="shell">
        <footer className="rodape">
          <div className="rodape-inner">
            <Logo height={18} tone="lilas" />
            <span className="rodape-meta">Imperatriz — MA · CNPJ 55.996.625/0001-47</span>
            <a className="rodape-link" href="/privacy-policy.html">Política de Privacidade</a>
          </div>
        </footer>
      </div>
    </section>
  );
}

export default function App() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has('print') || params.has('pdf')) {
      document.body.classList.add('is-print-preview');
    }
  }, []);

  return (
    <div className="site">
      <Nav />
      <main>
        <Hero />
        <Trajetoria />
        <Palcos />
        <OpenFormat />
        <Orcamento />
      </main>
    </div>
  );
}
