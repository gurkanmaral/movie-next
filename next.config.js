/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript:{
    ignoreBuildErrors:true,
  },
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
    images: {
        unoptimized: true,
        domains: ['image.tmdb.org','res.cloudinary.com'], 
        remotePatterns:[
          {
            protocol: "https",
            hostname: "uploadthing.com",
          },
        ],
        
      },
      
      
}

module.exports = nextConfig
