import React from 'react';
import { Link } from 'react-router-dom';
import { cx } from './cx';

// Einheitliche Schaltflächen. Rendert je nach Ziel einen <Link> (intern), <a> (extern, tel:, mailto:)
// oder <button>. Mindesthöhe 44 px (Touch-Ziel), sichtbarer Fokusring.
const variants = {
  primary:
    'bg-brand text-white hover:bg-brand-700 active:bg-brand-800 shadow-sm',
  secondary:
    'bg-white text-slate-900 border border-slate-300 hover:border-slate-400 hover:bg-slate-50 dark:bg-slate-900 dark:text-white dark:border-slate-600 dark:hover:bg-slate-800',
  subtle:
    'bg-brand-50 text-brand-800 hover:bg-brand-100 dark:bg-slate-800 dark:text-brand-200 dark:hover:bg-slate-700',
  ghost:
    'text-brand hover:bg-brand-50 dark:text-brand-300 dark:hover:bg-slate-800',
  inverse:
    'bg-white text-brand-800 hover:bg-brand-50',
};
const sizes = {
  sm: 'min-h-[40px] px-4 text-sm gap-2',
  md: 'min-h-[48px] px-5 text-base gap-2',
  lg: 'min-h-[56px] px-7 text-lg gap-3',
};

export const buttonClasses = ({ variant = 'primary', size = 'md', block = false, className } = {}) =>
  cx(
    'inline-flex items-center justify-center rounded-xl font-semibold transition-colors duration-150',
    'disabled:cursor-not-allowed disabled:opacity-60',
    variants[variant],
    sizes[size],
    block && 'w-full',
    className
  );

const Button = ({ to, href, external = false, variant, size, block, icon: Icon, iconRight: IconRight, className, children, ...rest }) => {
  const cls = buttonClasses({ variant, size, block, className });
  const content = (
    <>
      {Icon && <Icon size={size === 'sm' ? 16 : 20} aria-hidden="true" className="shrink-0" />}
      <span>{children}</span>
      {IconRight && <IconRight size={size === 'sm' ? 16 : 18} aria-hidden="true" className="shrink-0" />}
    </>
  );
  if (to) return <Link to={to} className={cls} {...rest}>{content}</Link>;
  if (href) {
    const ext = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
    return (
      <a href={href} className={cls} {...ext} {...rest}>
        {content}
        {external && <span className="sr-only"> (öffnet in neuem Fenster)</span>}
      </a>
    );
  }
  return <button type="button" className={cls} {...rest}>{content}</button>;
};

export default Button;
