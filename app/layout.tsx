import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import './globals.css'
import { ThemeProvider } from '@/contexts/ThemeContext'
import Loader from '@/components/Loader'
import { activeFontCssVariables, googleFontHref } from '@/lib/fontTheme'
import { getFontPreviewCss } from '@/lib/fontPreviewDemo'

export const metadata: Metadata = {
  title: 'Foundry Homes — Steel-Framed Homes, Built Your Way',
  description: 'Design and build a steel-framed home or granny flat with clear pricing, trusted NZ suppliers, and a process you can rely on from start to finish.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      style={activeFontCssVariables as CSSProperties}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href={googleFontHref} rel="stylesheet" />
        {/* Prevent flash of wrong theme before React hydrates */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('foundry-theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.setAttribute('data-theme',t);document.documentElement.style.colorScheme=t}catch(e){}})();`,
          }}
        />
        {/* Temporary client font demo: remove with app/font-preview and lib/fontPreviewDemo.ts */}
        <script
          dangerouslySetInnerHTML={{
            __html: getFontPreviewCss(),
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <Loader />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
