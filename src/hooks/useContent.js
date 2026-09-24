import { useEffect, useState } from 'react';

export const CONTENT_API_URL = 'http://localhost:5000';

export function useContent(section, fallback) {
  const [items, setItems] = useState(fallback);

  useEffect(() => {
    let active = true;
    fetch(`${CONTENT_API_URL}/api/content/${section}`)
      .then((response) => (response.ok ? response.json() : []))
      .then((data) => {
        if (active && Array.isArray(data)) setItems(data);
      })
      .catch(() => {
        // Keep the local fallback when the CMS is unavailable.
      });
    return () => { active = false; };
  }, [section]);

  return items;
}

export function contentImage(path) {
  if (!path) return '';
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('blob:') ||
    path.startsWith('/@') ||
    path.startsWith('/src/') ||
    path.startsWith('/assets/') ||
    path.startsWith('/achievers/') ||
    path.startsWith('/hero-bg.jpg') ||
    path.startsWith('/principal.png')
  ) {
    return path;
  }
  if (path.startsWith('/uploads/')) {
    return `${CONTENT_API_URL}${path}`;
  }
  return path;
}
