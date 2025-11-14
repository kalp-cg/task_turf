import { useEffect } from 'react';
import { seoHelpers } from '../utils/accessibility';

/**
 * SEO component for managing document head metadata
 */
const SEO = ({ 
  title, 
  description, 
  keywords = [],
  image,
  url,
  type = 'website',
  structuredData,
  canonical,
  noindex = false 
}) => {
  useEffect(() => {
    // Set page title
    if (title) {
      document.title = seoHelpers.generatePageTitle(title);
    }

    // Create or update meta tags
    const updateMetaTag = (name, content, property = false) => {
      if (!content) return;
      
      const attribute = property ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (meta) {
        meta.setAttribute('content', content);
      } else {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        meta.setAttribute('content', content);
        document.head.appendChild(meta);
      }
    };

    // Update meta description
    if (description) {
      updateMetaTag('description', seoHelpers.generateMetaDescription(description));
    }

    // Update keywords
    if (keywords.length > 0) {
      updateMetaTag('keywords', keywords.join(', '));
    }

    // Open Graph tags
    updateMetaTag('og:title', title ? seoHelpers.generatePageTitle(title) : 'TaskTurf - Home Services Platform', true);
    updateMetaTag('og:description', description || 'Find and book trusted home service professionals. Cleaning, plumbing, electrical, and more.', true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:site_name', 'TaskTurf', true);
    
    if (image) {
      updateMetaTag('og:image', image, true);
      updateMetaTag('og:image:alt', `${title} - TaskTurf`, true);
    }
    
    if (url) {
      updateMetaTag('og:url', url, true);
    }

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title ? seoHelpers.generatePageTitle(title) : 'TaskTurf');
    updateMetaTag('twitter:description', description || 'Find and book trusted home service professionals');
    if (image) {
      updateMetaTag('twitter:image', image);
    }

    // Canonical URL
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]');
      if (link) {
        link.setAttribute('href', canonical);
      } else {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        link.setAttribute('href', canonical);
        document.head.appendChild(link);
      }
    }

    // Robots meta tag
    if (noindex) {
      updateMetaTag('robots', 'noindex, nofollow');
    } else {
      updateMetaTag('robots', 'index, follow');
    }

    // Structured data
    if (structuredData) {
      let script = document.querySelector('script[type="application/ld+json"]');
      if (script) {
        script.textContent = JSON.stringify(structuredData);
      } else {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(structuredData);
        document.head.appendChild(script);
      }
    }

  }, [title, description, keywords, image, url, type, structuredData, canonical, noindex]);

  return null; // This component doesn't render anything
};

export default SEO;