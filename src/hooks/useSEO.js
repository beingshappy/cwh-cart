import { useEffect } from 'react'

/**
 * Custom hook to manage page SEO (title and meta description)
 * @param {Object} options - SEO options
 * @param {string} options.title - Page title suffix
 * @param {string} options.description - Page meta description (optional)
 * @param {boolean} options.fullTitle - If true, use title as is. Else, append brand name.
 */
export function useSEO({ title, description, fullTitle = false }) {
  const brandName = 'CWH Cart'
  const defaultDesc = 'Experience the pinnacle of luxury shopping with CWH Cart. Curated collections of world-class premium products.'

  useEffect(() => {
    // Set Title
    const pageTitle = fullTitle ? title : `${title} | ${brandName} — Premium Shopping`
    document.title = pageTitle

    // Set Meta Description
    let metaDescription = document.querySelector('meta[name="description"]')
    if (!metaDescription) {
      metaDescription = document.createElement('meta')
      metaDescription.name = 'description'
      document.head.appendChild(metaDescription)
    }
    metaDescription.setAttribute('content', description || defaultDesc)

    // Optional: Update OG/Twitter titles too
    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) ogTitle.setAttribute('content', pageTitle)
    
    const twitterTitle = document.querySelector('meta[property="twitter:title"]')
    if (twitterTitle) twitterTitle.setAttribute('content', pageTitle)

    return () => {
      // Restore default title on unmount if needed, but usually routers handle this
    }
  }, [title, description, fullTitle])
}
