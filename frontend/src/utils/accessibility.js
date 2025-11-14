// Accessibility utilities and ARIA helpers

/**
 * Generate unique IDs for form elements and ARIA relationships
 */
export const generateId = (prefix = 'element') => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * ARIA announcement utility for screen readers
 */
export const announceToScreenReader = (message, priority = 'polite') => {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

/**
 * Keyboard navigation helper
 */
export const handleKeyboardNavigation = (event, onEnter, onEscape) => {
  switch (event.key) {
    case 'Enter':
      event.preventDefault();
      onEnter?.(event);
      break;
    case 'Escape':
      event.preventDefault();
      onEscape?.(event);
      break;
    case 'Tab':
      // Allow natural tab behavior
      break;
    default:
      break;
  }
};

/**
 * Focus management utilities
 */
export const focusManagement = {
  // Trap focus within an element (for modals)
  trapFocus: (container) => {
    const focusableElements = container.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (event) => {
      if (event.key === 'Tab') {
        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            event.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            event.preventDefault();
          }
        }
      }
    };

    container.addEventListener('keydown', handleTabKey);
    return () => container.removeEventListener('keydown', handleTabKey);
  },

  // Focus the first focusable element
  focusFirst: (container) => {
    const firstFocusable = container.querySelector(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select, [tabindex]:not([tabindex="-1"])'
    );
    firstFocusable?.focus();
  },

  // Return focus to a specific element
  returnFocus: (element) => {
    element?.focus();
  }
};

/**
 * ARIA attributes helpers
 */
export const ariaAttributes = {
  // Button states
  button: (isPressed, isExpanded, controls) => ({
    'aria-pressed': isPressed ? 'true' : 'false',
    'aria-expanded': isExpanded !== undefined ? (isExpanded ? 'true' : 'false') : undefined,
    'aria-controls': controls,
    'role': 'button'
  }),

  // Form field helpers
  formField: (fieldId, labelId, describedBy, required = false, invalid = false) => ({
    'id': fieldId,
    'aria-labelledby': labelId,
    'aria-describedby': describedBy,
    'aria-required': required ? 'true' : 'false',
    'aria-invalid': invalid ? 'true' : 'false'
  }),

  // Modal/dialog
  modal: (titleId, describedBy) => ({
    'role': 'dialog',
    'aria-modal': 'true',
    'aria-labelledby': titleId,
    'aria-describedby': describedBy
  }),

  // Navigation
  navigation: (label, current) => ({
    'role': 'navigation',
    'aria-label': label,
    'aria-current': current
  }),

  // Status/live regions
  status: (polite = true) => ({
    'aria-live': polite ? 'polite' : 'assertive',
    'aria-atomic': 'true'
  })
};

/**
 * Screen reader only CSS class
 */
export const srOnlyClass = 'absolute w-px h-px p-0 m-[-1px] overflow-hidden whitespace-nowrap border-0';

/**
 * Color contrast checker utility
 */
export const colorContrast = {
  // Check if color meets WCAG AA standard (4.5:1 ratio)
  meetsAAStandard: (foreground, background) => {
    // Simplified check - in real implementation, you'd calculate actual contrast ratio
    // This is a placeholder for the concept
    return true;
  },

  // Get accessible text color for background
  getAccessibleTextColor: (backgroundColor) => {
    // Simplified logic - return white for dark backgrounds, dark for light
    // In real implementation, you'd calculate luminance
    return backgroundColor.includes('dark') || backgroundColor.includes('black') ? '#ffffff' : '#0D1B2A';
  }
};

/**
 * SEO metadata helpers
 */
export const seoHelpers = {
  // Generate page title
  generatePageTitle: (pageTitle, siteName = 'TaskTurf') => {
    return pageTitle ? `${pageTitle} | ${siteName}` : siteName;
  },

  // Generate meta description
  generateMetaDescription: (description, maxLength = 160) => {
    if (!description) return '';
    return description.length > maxLength 
      ? description.substring(0, maxLength - 3) + '...'
      : description;
  },

  // Generate structured data for service
  generateServiceStructuredData: (service) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': service.name,
    'description': service.description,
    'provider': {
      '@type': 'Organization',
      'name': 'TaskTurf'
    },
    'offers': {
      '@type': 'Offer',
      'price': service.price,
      'priceCurrency': 'USD'
    }
  })
};

/**
 * Accessible form validation messages
 */
export const validationMessages = {
  required: (fieldName) => `${fieldName} is required`,
  email: 'Please enter a valid email address',
  minLength: (min) => `Must be at least ${min} characters long`,
  maxLength: (max) => `Must be no more than ${max} characters long`,
  pattern: (pattern) => `Must match the required format: ${pattern}`
};