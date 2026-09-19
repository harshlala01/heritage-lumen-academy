import { useEffect, useState } from 'react';

export const CONTENT_API_URL = 'http://localhost:5000';

export function useContent(section, fallback) {
  const [items, setItems] = useState(fallback);

  useEffect(() => {
    let active = true;
    fetch(`${CONTENT_API_URL}/api/content/${section}`)
      .then((response) => (response.ok ? response.json() : []))
      .then((data) => {
        if (active && Array.isArray(data) && data.length > 0) setItems(data);
      })
      .catch(() => {
        // Keep the local fallback when the CMS is unavailable.
      });
    return () => { active = false; };
  }, [section]);

  return items;
}

export function contentImage(path) {
  return path && path.startsWith('http') ? path : `${CONTENT_API_URL}${path || ''}`;
}
