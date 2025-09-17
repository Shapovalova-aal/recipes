import type { NextConfig } from "next";

/* по умолчанию компонент Image from "next/image" оптимизирует изображение, но при загрузке 
изображений с внешних доменов требуется явно указывать разрешенные источники в конфиге next.config.ts */

const nextConfig: NextConfig = { 
  /* config options here */
  images:{
    remotePatterns:[
        {
            protocol: 'https',
            hostname: 'eda.ru'
        }
    ]
  }
};

export default nextConfig;
