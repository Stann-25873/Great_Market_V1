import { useEffect, useMemo, useRef, useState } from 'react';

const services = [
  {
    id: 'cars',
    title: 'Cars',
    subtitle: 'Premium rentals',
    description:
      'Reliable vehicles for business trips, family travel, and airport transfers with fast pickup.',
    accent: 'blue',
    icon: (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d="M14 39h36l-4-12a6 6 0 0 0-5.7-4H23.7A6 6 0 0 0 18 27l-4 12Z" />
        <path d="M10 39h44v8a5 5 0 0 1-5 5H15a5 5 0 0 1-5-5v-8Z" />
        <circle cx="20" cy="47" r="5" />
        <circle cx="44" cy="47" r="5" />
      </svg>
    ),
  },
  {
    id: 'houses',
    title: 'Houses',
    subtitle: 'Sales and rentals',
    description:
      'Modern homes, apartments, and villas presented with clarity and a direct contact path.',
    accent: 'orange',
    icon: (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d="M11 30 32 14l21 16v21a3 3 0 0 1-3 3H14a3 3 0 0 1-3-3V30Z" />
        <path d="M25 54V37h14v17" />
      </svg>
    ),
  },
  {
    id: 'student',
    title: 'Student',
    subtitle: 'Study abroad',
    description:
      'Guidance for applications, orientation, and preparation for international study journeys.',
    accent: 'blue',
    icon: (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d="M8 23 32 13l24 10-24 10L8 23Z" />
        <path d="M18 29v10c0 5 9 9 14 9s14-4 14-9V29" />
        <path d="M50 26v12" />
      </svg>
    ),
  },
  {
    id: 'abroad',
    title: 'Abroad',
    subtitle: 'Global support',
    description:
      'Mobility, relocation, furnishing, and support solutions for international projects.',
    accent: 'orange',
    icon: (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d="M10 40h22c8 0 10-12 20-12" />
        <path d="M32 28c8 0 10-10 20-10" />
        <path d="m44 14 10 4-5 10" />
        <path d="M18 48h18" />
      </svg>
    ),
  },
];

const listings = [
  {
    title: 'House A',
    price: '$500/month',
    tag: 'Kigali Heights',
    image:
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'House B',
    price: '$650/month',
    tag: 'Vision Estate',
    image:
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'House C',
    price: '$720/month',
    tag: 'Garden Avenue',
    image:
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'House D',
    price: '$890/month',
    tag: 'Skyline Residences',
    image:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80',
  },
];

const trustStats = [
  {
    value: 100,
    suffix: '+',
    label: 'Active clients',
    description: 'Fast execution with a consistent level of service.',
    icon: '01',
  },
  {
    value: 24,
    suffix: '/7',
    label: 'Smooth support',
    description: 'Always available to accelerate decisions and keep projects moving.',
    icon: '02',
  },
  {
    value: 96,
    suffix: '%',
    label: 'Satisfaction',
    description: 'A clearer, more credible, and more profitable customer experience.',
    icon: '03',
  },
];

const testimonials = [
  {
    name: 'Aline M.',
    role: 'Property investor',
    quote:
      'The website feels clean, fast, and trustworthy. WhatsApp inquiries arrive much faster now.',
  },
  {
    name: 'Kevin R.',
    role: 'Mobility client',
    quote:
      'The presentation feels modern and the cards make people want to contact the team immediately.',
  },
];

const contactDetails = [
  {
    title: 'Phone',
    value: '+250 788 000 000',
    href: 'tel:+250788000000',
  },
  {
    title: 'Email',
    value: 'stanikam2@gmail.com',
    href: 'mailto:stanikam2@gmail.com',
  },
  {
    title: 'Location',
    value: 'Kigali, Rwanda',
  },
];

function BrandLogo({ invert = false }) {
  return (
    <span className={`brand-logo ${invert ? 'brand-logo--invert' : ''}`}>
      <svg className="brand-logo__icon" viewBox="0 0 64 64" aria-hidden="true">
        <rect x="2" y="2" width="60" height="60" rx="18" fill="currentColor" className="brand-logo__bg" />
        <path
          d="M14 37C14 26.5 22.5 18 33 18H50L38 30H31C27.1 30 24 33.1 24 37V45H14V37Z"
          className="brand-logo__accent"
        />
        <path d="M17 31.5L31.5 20L46 31.5V47H35V38H28V47H17V31.5Z" className="brand-logo__house" />
        <circle cx="48.5" cy="16.5" r="5.5" className="brand-logo__dot" />
      </svg>
      <span className="brand-logo__text">GMOS</span>
    </span>
  );
}

function StatCounter({ value, suffix, label, description, icon }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return undefined;
    }

    let frameId = 0;
    let hasAnimated = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated) {
          return;
        }

        hasAnimated = true;
        const startedAt = performance.now();
        const duration = 1400;

        const updateCounter = (now) => {
          const progress = Math.min((now - startedAt) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplayValue(Math.round(value * eased));

          if (progress < 1) {
            frameId = requestAnimationFrame(updateCounter);
          }
        };

        frameId = requestAnimationFrame(updateCounter);
      },
      { threshold: 0.55 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frameId);
    };
  }, [value]);

  return (
    <article className="trust-card reveal" ref={ref}>
      <span className="trust-card__icon" aria-hidden="true">
        {icon}
      </span>
      <div className="trust-card__value">
        {displayValue}
        {suffix}
      </div>
      <h3>{label}</h3>
      <p>{description}</p>
    </article>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [formFeedback, setFormFeedback] = useState('');

  const sections = useMemo(
    () => [
      { id: 'home', label: 'Home' },
      { id: 'services', label: 'Services' },
      { id: 'catalogue', label: 'Catalog' },
      { id: 'about', label: 'About' },
      { id: 'contact', label: 'Contact' },
    ],
    [],
  );

  useEffect(() => {
    document.documentElement.classList.add('js-ready');

    const revealNodes = document.querySelectorAll('.reveal');
    const showAllRevealNodes = () => {
      revealNodes.forEach((node) => node.classList.add('is-visible'));
    };

    if (typeof IntersectionObserver === 'undefined') {
      showAllRevealNodes();
      return () => {
        document.documentElement.classList.remove('js-ready');
      };
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.18 },
    );

    revealNodes.forEach((node) => revealObserver.observe(node));
    const revealFallback = window.setTimeout(showAllRevealNodes, 900);

    const sectionNodes = document.querySelectorAll('[data-section]');
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        rootMargin: '-35% 0px -45% 0px',
        threshold: [0.2, 0.4, 0.6],
      },
    );

    sectionNodes.forEach((node) => sectionObserver.observe(node));

    return () => {
      window.clearTimeout(revealFallback);
      document.documentElement.classList.remove('js-ready');
      revealObserver.disconnect();
      sectionObserver.disconnect();
    };
  }, []);

  const handleScrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { name, email, subject, message } = formData;
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setFormFeedback('Please fill in all fields before sending your message.');
      return;
    }

    const emailBody = [
      `Name: ${name.trim()}`,
      `Email: ${email.trim()}`,
      '',
      message.trim(),
    ].join('\n');

    const mailtoUrl = `mailto:stanikam2@gmail.com?subject=${encodeURIComponent(
      subject.trim(),
    )}&body=${encodeURIComponent(emailBody)}`;

    setFormFeedback('Your email app is opening with a pre-filled message.');
    window.location.href = mailtoUrl;
  };

  return (
    <div className="page-shell">
      <div className="background-orb background-orb--left" aria-hidden="true" />
      <div className="background-orb background-orb--right" aria-hidden="true" />

      <header className="site-header">
        <div className="container header-grid">
          <button
            className="brand-mark"
            type="button"
            onClick={() => handleScrollTo('home')}
            aria-label="Back to home"
          >
            <BrandLogo />
          </button>

          <button
            type="button"
            className={`menu-toggle ${menuOpen ? 'is-open' : ''}`}
            onClick={() => setMenuOpen((current) => !current)}
            aria-expanded={menuOpen}
            aria-label="Open menu"
          >
            <span />
            <span />
            <span />
          </button>

          <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`}>
            {sections.map((section) => (
              <button
                key={section.id}
                type="button"
                className={activeSection === section.id ? 'is-active' : ''}
                onClick={() => handleScrollTo(section.id)}
              >
                {section.label}
              </button>
            ))}
          </nav>

          <a className="whatsapp-chip" href="https://wa.me/250788000000" target="_blank" rel="noreferrer">
            WhatsApp
          </a>
        </div>
      </header>

      <main className="container">
        <section className="hero reveal" id="home" data-section>
          <div className="hero__overlay" />
          <div className="hero__content">
            <span className="eyebrow">GMOS Portfolio 2026</span>
            <h1>Your Trusted Partner in Rwanda</h1>
            <p>
              Housing, car rental, study abroad, and premium support services in one polished,
              high-conversion experience.
            </p>

            <div className="hero__actions">
              <button type="button" className="button button--primary" onClick={() => handleScrollTo('contact')}>
                Call Now
              </button>
              <a
                className="button button--accent"
                href="https://wa.me/250788000000"
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>
            </div>
          </div>

          <aside className="hero__panel reveal">
            <span className="hero__panel-label">Why it converts</span>
            <ul>
              <li>Blue, orange, and white palette aligned with the reference</li>
              <li>Hero, services, listings, about, and contact structure</li>
              <li>Smooth motion, mobile navigation, and interactive cards</li>
            </ul>
          </aside>
        </section>

        <section className="section" id="services" data-section>
          <div className="section-heading reveal">
            <span className="section-heading__kicker">Services</span>
            <h2>Our Services</h2>
            <p>
              A modern reinterpretation of the reference cards with more depth,
              clearer hierarchy, and stronger motion.
            </p>
          </div>

          <div className="services-grid">
            {services.map((service) => (
              <article key={service.id} className={`service-card reveal service-card--${service.accent}`}>
                <div className="service-card__icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <strong>{service.subtitle}</strong>
                <p>{service.description}</p>
                <button type="button" onClick={() => handleScrollTo('contact')}>
                  View
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="catalogue" data-section>
          <div className="section-heading reveal">
            <span className="section-heading__kicker">Catalog</span>
            <h2>Available Now</h2>
            <p>
              This featured listings block keeps the spirit of the reference,
              but with a sharper and more premium execution.
            </p>
          </div>

          <div className="listing-grid">
            {listings.map((listing) => (
              <article key={listing.title} className="listing-card reveal">
                <div
                  className="listing-card__image"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(22,60,146,0.1), rgba(22,60,146,0.35)), url(${listing.image})`,
                  }}
                />
                <div className="listing-card__body">
                  <span>{listing.tag}</span>
                  <h3>{listing.title}</h3>
                  <strong>{listing.price}</strong>
                  <button type="button" onClick={() => handleScrollTo('contact')}>
                    Contact
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section section--compact" id="why-choose-us">
          <div className="section-heading reveal">
            <span className="section-heading__kicker">Credibility</span>
            <h2>Why Choose Us</h2>
          </div>

          <div className="trust-grid">
            {trustStats.map((item) => (
              <StatCounter key={item.label} {...item} />
            ))}
          </div>
        </section>

        <section className="section about-section" id="about" data-section>
          <div className="about-copy reveal">
            <span className="section-heading__kicker">About</span>
            <h2>About Preview</h2>
            <p>
              GMOS is positioned here as a modern service portfolio: a clean brand story,
              a stronger trust layer, and a faster route to conversation.
            </p>
            <p>
              I kept the visual logic of your reference image and pushed it toward a more
              premium 2026 direction with better contrast, more breathing room, and sharper components.
            </p>
            <button type="button" className="button button--accent" onClick={() => handleScrollTo('contact')}>
              Read More
            </button>
          </div>

          <div className="about-media reveal">
            <div className="about-media__frame">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80"
                alt="Team meeting"
              />
            </div>
            <div className="about-media__badge">
              <strong>Fast service</strong>
              <span>Built for conversion and trust</span>
            </div>
          </div>
        </section>

        <section className="section testimonials-section">
          <div className="section-heading reveal">
            <span className="section-heading__kicker">Testimonials</span>
            <h2>Clients Show the Value</h2>
          </div>

          <div className="testimonial-grid">
            {testimonials.map((item) => (
              <article key={item.name} className="testimonial-card reveal">
                <div className="testimonial-card__avatar" aria-hidden="true">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <h3>{item.name}</h3>
                  <span>{item.role}</span>
                  <p>"{item.quote}"</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section contact-section" id="contact" data-section>
          <div className="section-heading reveal">
            <span className="section-heading__kicker">Contact</span>
            <h2>Contact Us</h2>
            <p>Phone, email, location, and form in one clean and responsive section.</p>
          </div>

          <div className="contact-layout">
            <div className="contact-panel reveal">
              {contactDetails.map((item) => (
                <article key={item.title} className="contact-panel__item">
                  <span>{item.title}</span>
                  {item.href ? <a href={item.href}>{item.value}</a> : <strong>{item.value}</strong>}
                </article>
              ))}

              <a
                className="button button--accent button--full"
                href="https://wa.me/250788000000"
                target="_blank"
                rel="noreferrer"
              >
                Chat on WhatsApp
              </a>
            </div>

            <form className="contact-form reveal" onSubmit={handleSubmit}>
              <label>
                Name
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Email
                <input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Subject
                <input
                  type="text"
                  name="subject"
                  placeholder="Housing, car rental, study abroad..."
                  value={formData.subject}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Message
                <textarea
                  rows="5"
                  name="message"
                  placeholder="Tell us what you need"
                  value={formData.message}
                  onChange={handleInputChange}
                />
              </label>
              <button type="submit" className="button button--primary">
                Send Message
              </button>
              {formFeedback ? <p className="form-feedback">{formFeedback}</p> : null}
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <BrandLogo invert />

          <nav className="footer-nav">
            {sections.map((section) => (
              <button key={section.id} type="button" onClick={() => handleScrollTo(section.id)}>
                {section.label}
              </button>
            ))}
          </nav>

          <p className="footer-copy">© 2026 GMOS. Responsive portfolio inspired by your provided reference.</p>
        </div>

        <a className="floating-whatsapp" href="https://wa.me/250788000000" target="_blank" rel="noreferrer">
          WA
        </a>
      </footer>
    </div>
  );
}

export default App;
