module.exports = {
  siteMetadata: {
    title: 'Bitcoin.com Cloud Platform',
    description: 'Cloud platform for Bitcoin.com',
    siteUrl: 'https://cloud.bitcoin.com'
  },
  plugins: [
    `gatsby-plugin-flow`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data/`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'cloud-bitcoin-com',
        short_name: 'cloud.bitcoin.com',
        start_url: '/',
        background_color: '#FFFFFF',
        theme_color: '#f9b016',
        display: 'minimal-ui',
        icon: 'src/images/favicon.png' // This path is relative to the root of the site.
      }
    },
    {
      resolve: `gatsby-plugin-google-tagmanager`,
      options: {
        id: 'GTM-5N6TL56',
        includeInDevelopment: false
        // Specify optional GTM environment details.
        // gtmAuth: "YOUR_GOOGLE_TAGMANAGER_ENVIROMENT_AUTH_STRING",
        // gtmPreview: "YOUR_GOOGLE_TAGMANAGER_ENVIROMENT_PREVIEW_NAME",
      }
    },
    'gatsby-plugin-offline',
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-robots-txt`,
    `gatsby-plugin-sitemap`
  ]
}
