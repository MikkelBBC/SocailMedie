// Ens streg-ikoner til UI'et (navigation, knapper, HUD). Emojis bruges kun i indholdet.
// Alle tegnes i 24×24 med currentColor, så de arver farven fra knappen.

const PATHS = {
  home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9v12h14V9"/><path d="M10 21v-6h4v6"/>',
  exam: '<path d="M22 9.5 12 4.5 2 9.5l10 5 10-5Z"/><path d="M6 11.5V17c3.3 2.3 8.7 2.3 12 0v-5.5"/><path d="M22 9.5V15"/>',
  heart: '<path d="M19.5 5.1a5 5 0 0 0-7.1 0L12 5.5l-.4-.4a5 5 0 0 0-7.1 7.1l.4.4L12 19.7l7.1-7.1.4-.4a5 5 0 0 0 0-7.1Z"/>',
  stats: '<path d="M3 20h18"/><rect x="5" y="11" width="3" height="6" rx="1"/><rect x="10.5" y="5" width="3" height="12" rx="1"/><rect x="16" y="8" width="3" height="9" rx="1"/>',
  flame: '<path d="M12 21.5c3.9 0 7-2.6 7-6.6 0-3.1-1.9-5.4-3.4-7-.4 1.8-1.5 2.9-2.7 3.3.1-3.2-1.2-6.2-3.7-8.7.1 3.4-5.2 6.4-5.2 12.4 0 4 3.1 6.6 8 6.6Z"/>',
  sparkles: '<path d="M11 3.5 12.9 8.6 18 10.5 12.9 12.4 11 17.5 9.1 12.4 4 10.5 9.1 8.6Z"/><path d="M18.5 15.5 19.2 17.3 21 18 19.2 18.7 18.5 20.5 17.8 18.7 16 18 17.8 17.3Z"/>',
  trend: '<path d="m3 17 6-6 4 4 8-8"/><path d="M15 7h6v6"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2"/>',
  close: '<path d="M18 6 6 18M6 6l12 12"/>',
  bolt: '<path d="M13 2.5 4.5 13.5H11l-1 8 8.5-11H12Z"/>',
  calendar: '<rect x="3" y="4.5" width="18" height="16" rx="2.5"/><path d="M3 9.5h18M8 2.5v4M16 2.5v4"/>',
  repeat: '<path d="M17 2.5 20.5 6 17 9.5"/><path d="M3.5 11V9.5a3.5 3.5 0 0 1 3.5-3.5h13.5"/><path d="M7 21.5 3.5 18 7 14.5"/><path d="M20.5 13v1.5a3.5 3.5 0 0 1-3.5 3.5H3.5"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  snow: '<path d="M12 2.5v19M3.8 7.2l16.4 9.6M3.8 16.8l16.4-9.6"/><path d="m9.5 4 2.5 2 2.5-2M9.5 20l2.5-2 2.5 2"/>',
  dice: '<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="8" cy="8" r="1.3" fill="currentColor"/><circle cx="16" cy="8" r="1.3" fill="currentColor"/><circle cx="12" cy="12" r="1.3" fill="currentColor"/><circle cx="8" cy="16" r="1.3" fill="currentColor"/><circle cx="16" cy="16" r="1.3" fill="currentColor"/>',
  bookmark: '<path d="M6 3.5h12v17l-6-4-6 4Z"/>',
};

export function icon(name, size = 24, extra = '') {
  return `<svg class="ic ic-${name}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra}>${PATHS[name] ?? ''}</svg>`;
}

// Fylder alle <i data-icon="navn"> i den statiske HTML.
export function hydrateIcons(root = document) {
  root.querySelectorAll('[data-icon]').forEach((n) => {
    n.outerHTML = icon(n.dataset.icon, Number(n.dataset.size) || 24);
  });
}
