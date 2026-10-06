import React, { useEffect, useRef, useState, useId } from 'react';
import { createPortal } from 'react-dom';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Phone, Sun, Moon, Contrast } from 'lucide-react';
import logo from '../assets/images/rak-logo-128.png';
import { MAIN_NAV, LEGAL_NAV, isActive } from '../data/navigation';
import { PHONE_DISPLAY, PHONE_HREF, OPENING_HOURS_SHORT } from '../data/practice';
import { BookingButton } from './ui/BookingButtons';
import { cx } from './ui/cx';

// Kopfbereich: Servicezeile (Telefon, Zeiten, Anzeige-Optionen) + Hauptzeile (Logo, Navigation, „Termin buchen“).
// Desktop-Navigation ab 1280 px in eigener Zeile (8 Menüpunkte), darunter ein Menü-Panel.
// Telefon am Handy über die Schnellzugriffsleiste (MobileActions) und im Menü.
// Tastatur: Untermenü per Enter/Leertaste/Pfeil-unten, Escape schließt und setzt den Fokus zurück.

const Logo = () => (
  <Link to="/" className="flex min-w-0 items-center gap-3 rounded-lg" aria-label="Röntgen am Kai – zur Startseite">
    <img src={logo} alt="" width="44" height="41" className="h-10 w-auto shrink-0 sm:h-11" />
    <span className="flex min-w-0 flex-col leading-none">
      <span className="whitespace-nowrap font-display text-lg font-semibold tracking-tight text-slate-900 dark:text-white sm:text-xl">
        Röntgen am Kai
      </span>
      <span className="mt-1 hidden whitespace-nowrap text-xs text-slate-600 dark:text-slate-300 min-[400px]:block sm:text-sm">
        Fachärzte für Radiologie · Graz
      </span>
    </span>
  </Link>
);

const DisplayToggles = ({ isDark, toggleTheme, highContrast, setHighContrast, withLabels = false }) => {
  const base = cx(
    'inline-flex min-h-[40px] items-center justify-center gap-2 rounded-lg border px-3 text-sm transition-colors',
    'border-slate-300 bg-white text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800'
  );
  return (
    <>
      <button type="button" onClick={toggleTheme} aria-pressed={isDark} className={base}>
        {isDark ? <Moon size={16} aria-hidden="true" /> : <Sun size={16} aria-hidden="true" />}
        <span className={withLabels ? undefined : 'sr-only'}>Dunkelmodus</span>
      </button>
      <button type="button" onClick={() => setHighContrast(!highContrast)} aria-pressed={highContrast} className={base}>
        <Contrast size={16} aria-hidden="true" />
        <span className={withLabels ? undefined : 'sr-only'}>Hoher Kontrast</span>
      </button>
    </>
  );
};

// Desktop-Menüpunkt mit Untermenü (Disclosure-Muster)
const DesktopDropdown = ({ item, pathname }) => {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const btnRef = useRef(null);
  const menuId = useId();
  const active = isActive(item, pathname);

  useEffect(() => setOpen(false), [pathname]);

  // Schließen bei Klick außerhalb, Escape (Fokus zurück auf den Auslöser) und wenn der Fokus das Menü verlässt
  useEffect(() => {
    if (!open) return undefined;
    const wrap = wrapRef.current;
    const onDown = (e) => { if (wrap && !wrap.contains(e.target)) setOpen(false); };
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    const onFocusOut = (e) => { if (!wrap.contains(e.relatedTarget)) setOpen(false); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    wrap.addEventListener('focusout', onFocusOut);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
      wrap.removeEventListener('focusout', onFocusOut);
    };
  }, [open]);

  // Pfeil nach unten öffnet das Menü und setzt den Fokus auf den ersten Eintrag
  const onButtonKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(true);
      requestAnimationFrame(() => wrapRef.current?.querySelector('ul a')?.focus());
    }
  };

  return (
    <li ref={wrapRef} className="relative">
      <button
        ref={btnRef}
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onButtonKeyDown}
        className={cx(navLinkCls(active), 'gap-1')}
      >
        {item.name}
        <ChevronDown size={16} aria-hidden="true" className={cx('transition-transform', open && 'rotate-180')} />
      </button>
      <ul
        id={menuId}
        hidden={!open}
        className="anim-drop-in absolute left-0 top-full z-50 mt-2 w-72 rounded-xl border border-slate-200 bg-white p-2 shadow-lg dark:border-slate-700 dark:bg-slate-900"
      >
        {item.children.map((c) => (
          <li key={c.href + c.name}>
            <NavLink
              to={c.href}
              end
              className={({ isActive: a }) =>
                cx(
                  'block rounded-lg px-3 py-2.5 text-[0.95rem] text-slate-800 hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-slate-800',
                  a && 'bg-brand-50 font-semibold text-brand-800 dark:bg-slate-800 dark:text-brand-300'
                )
              }
            >
              {c.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </li>
  );
};

const navLinkCls = (active) =>
  cx(
    'relative inline-flex min-h-[44px] items-center whitespace-nowrap rounded-lg px-2 text-[0.9375rem] font-medium transition-colors 2xl:px-3',
    'text-slate-700 hover:text-brand dark:text-slate-200 dark:hover:text-brand-300',
    'after:absolute after:inset-x-2 2xl:after:inset-x-3 after:bottom-1 after:h-0.5 after:rounded-full after:transition-colors',
    active ? 'text-brand after:bg-brand dark:text-brand-300 dark:after:bg-brand-300' : 'after:bg-transparent'
  );

// Mobiles Menü-Panel (modal): Fokus bleibt im Panel, Escape schließt, Hintergrund scrollt nicht.
const MobilePanel = ({ open, onClose, pathname, toggles, returnFocusRef }) => {
  const panelRef = useRef(null);
  const [subOpen, setSubOpen] = useState(false);

  useEffect(() => {
    if (!open) return undefined;
    const openedAt = window.location.pathname; // Pfad beim Öffnen merken
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const first = panelRef.current?.querySelector('button, a');
    first?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key !== 'Tab') return;
      const f = panelRef.current.querySelectorAll('a[href], button:not([disabled])');
      const list = Array.from(f).filter((el) => el.offsetParent !== null);
      if (!list.length) return;
      const firstEl = list[0];
      const lastEl = list[list.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) { e.preventDefault(); lastEl.focus(); }
      else if (!e.shiftKey && document.activeElement === lastEl) { e.preventDefault(); firstEl.focus(); }
    };
    document.addEventListener('keydown', onKey);
    const returnTo = returnFocusRef.current;
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
      // Fokus nur zurück auf „Menü“, wenn die Seite gleich bleibt (Escape, Schließen). Nach einem Klick auf
      // eine andere Seite setzt RouteEffects den Fokus auf den Inhalt (#main).
      if (window.location.pathname === openedAt) returnTo?.focus();
    };
  }, [open, onClose, returnFocusRef]);

  if (!open) return null;

  // Portal an <body>: Das Panel liegt so unabhängig vom (klebenden) Header über der ganzen Seite.
  return createPortal(
    <div className="fixed inset-0 z-[70] xl:hidden">
      <div className="anim-fade-in absolute inset-0 bg-slate-900/40" aria-hidden="true" onClick={onClose} />
      <div
        ref={panelRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Hauptmenü"
        className="anim-panel-in absolute inset-y-0 right-0 flex w-full flex-col overflow-y-auto bg-white shadow-xl dark:bg-slate-950 sm:max-w-sm"
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-800">
          <span className="font-display text-lg font-semibold text-slate-900 dark:text-white">Menü</span>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <X size={24} aria-hidden="true" />
            <span className="sr-only">Menü schließen</span>
          </button>
        </div>

        <nav aria-label="Hauptnavigation" className="flex-1 px-3 py-4">
          <ul className="space-y-1">
            {MAIN_NAV.map((item) => {
              const active = isActive(item, pathname);
              const rowCls = cx(
                'flex min-h-[48px] w-full items-center justify-between rounded-lg px-3 text-left text-lg',
                active ? 'bg-brand-50 font-semibold text-brand-800 dark:bg-slate-800 dark:text-brand-300' : 'text-slate-800 hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-slate-800'
              );
              if (item.children) {
                return (
                  <li key={item.href}>
                    <button type="button" className={rowCls} aria-expanded={subOpen} aria-controls="mobile-sub" onClick={() => setSubOpen((o) => !o)}>
                      {item.name}
                      <ChevronDown size={20} aria-hidden="true" className={cx('transition-transform', subOpen && 'rotate-180')} />
                    </button>
                    <ul id="mobile-sub" hidden={!subOpen} className="anim-drop-in mt-1 space-y-1 border-l-2 border-slate-200 pl-3 ml-4 dark:border-slate-700">
                      {item.children.map((c) => (
                        <li key={c.href + c.name}>
                          <NavLink
                            to={c.href}
                            end
                            onClick={onClose}
                            className={({ isActive: a }) =>
                              cx('flex min-h-[44px] items-center rounded-lg px-3 text-base', a ? 'font-semibold text-brand-800 dark:text-brand-300' : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800')
                            }
                          >
                            {c.name}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              }
              return (
                <li key={item.href}>
                  <Link to={item.href} onClick={onClose} className={rowCls} aria-current={active ? 'page' : undefined}>
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="space-y-4 border-t border-slate-200 px-5 py-5 dark:border-slate-800">
          <BookingButton block size="lg" />
          <a
            href={PHONE_HREF}
            className="flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-slate-300 font-semibold text-slate-900 hover:bg-slate-50 dark:border-slate-600 dark:text-white dark:hover:bg-slate-800"
          >
            <Phone size={20} aria-hidden="true" /> {PHONE_DISPLAY}
          </a>
          <div className="flex flex-wrap gap-2">{toggles}</div>
          <ul className="flex gap-5 pt-1 text-sm text-slate-600 dark:text-slate-300">
            {LEGAL_NAV.map((l) => (
              <li key={l.href}><Link to={l.href} onClick={onClose} className="inline-flex min-h-[44px] items-center underline underline-offset-4">{l.name}</Link></li>
            ))}
          </ul>
        </div>
      </div>
    </div>,
    document.body
  );
};

const Header = ({ isDark, toggleTheme, highContrast, setHighContrast }) => {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuBtnRef = useRef(null);
  const closeMenu = React.useCallback(() => setMenuOpen(false), []);

  useEffect(() => setMenuOpen(false), [pathname]);

  // Tatsächliche Header-Höhe als CSS-Variable (Anker-Abstand scroll-padding-top, klebende Seitenleisten).
  // Die festen Werte in index.css bleiben als Startwert bzw. Rückfall ohne ResizeObserver.
  const headerRef = useRef(null);
  useEffect(() => {
    const el = headerRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return undefined;
    const root = document.documentElement;
    const update = () => root.style.setProperty('--header-height', `${Math.round(el.getBoundingClientRect().height)}px`);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      ro.disconnect();
      root.style.removeProperty('--header-height');
    };
  }, []);

  const toggleProps = { isDark, toggleTheme, highContrast, setHighContrast };

  return (
    <header ref={headerRef} className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 dark:border-slate-800 dark:bg-slate-950/95">
      {/* Servicezeile (ab Tablet) */}
      <div className="hidden border-b border-slate-100 bg-slate-50 dark:border-slate-800 dark:bg-slate-900 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-1.5 text-sm text-slate-600 dark:text-slate-300 sm:px-6 lg:px-8">
          <p>
            <span className="font-medium text-slate-800 dark:text-slate-100">Alle Kassen und privat</span>
            <span aria-hidden="true" className="mx-2">·</span>
            {OPENING_HOURS_SHORT} Uhr
          </p>
          <div className="flex items-center gap-2">
            <a href={PHONE_HREF} className="inline-flex min-h-[40px] items-center gap-2 rounded-lg px-2 font-medium text-slate-800 hover:text-brand dark:text-slate-100 dark:hover:text-brand-300">
              <Phone size={16} aria-hidden="true" /> {PHONE_DISPLAY}
            </a>
            <DisplayToggles {...toggleProps} />
          </div>
        </div>
      </div>

      {/* Hauptzeile: Logo + Termin; Navigation ab 1280 px in eigener Zeile (8 Menüpunkte ohne Umbruch) */}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Logo />
        <div className="flex shrink-0 items-center gap-3">
          <BookingButton size="md" className="hidden sm:inline-flex" />
          <button
            ref={menuBtnRef}
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="inline-flex h-11 items-center gap-2 rounded-lg border border-slate-300 px-3 font-medium text-slate-800 hover:bg-slate-100 dark:border-slate-600 dark:text-white dark:hover:bg-slate-800 xl:hidden"
          >
            <Menu size={22} aria-hidden="true" />
            <span>Menü</span>
          </button>
        </div>
      </div>
      <nav aria-label="Hauptnavigation" className="hidden border-t border-slate-100 dark:border-slate-800 xl:block">
        <ul className="mx-auto flex max-w-7xl items-center gap-1 px-5 sm:px-6 lg:px-5">
          {MAIN_NAV.map((item) =>
            item.children ? (
              <DesktopDropdown key={item.href} item={item} pathname={pathname} />
            ) : (
              <li key={item.href}>
                <Link to={item.href} className={navLinkCls(isActive(item, pathname))} aria-current={isActive(item, pathname) ? 'page' : undefined}>
                  {item.name}
                </Link>
              </li>
            )
          )}
        </ul>
      </nav>

      <MobilePanel
        open={menuOpen}
        onClose={closeMenu}
        pathname={pathname}
        returnFocusRef={menuBtnRef}
        toggles={<DisplayToggles {...toggleProps} withLabels />}
      />
    </header>
  );
};

export default Header;
