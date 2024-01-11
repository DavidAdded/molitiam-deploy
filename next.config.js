/** @type {import('next').NextConfig} */
const nextConfig = { 
reactStrictMode: true,  
i18n: {    
locales: ["en", "sv"],    
defaultLocale: "sv",    
localeDetection: false  
}
}


module.exports = nextConfig


module.exports = {
  i18n: {
    locales: ['en', 'sv'],
    defaultLocale: 'sv',
  },
}
/** @type {import('next').NextConfig} */

module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/pages/sv',
        permanent: true,
      }
    ]
  },
}