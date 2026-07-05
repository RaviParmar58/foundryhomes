import FontPreviewPanel from '@/components/FontPreviewPanel'
import Navbar from '@/components/Navbar'
import MobileMenu from '@/components/MobileMenu'

export default function FontPreviewPage() {
  return (
    <>
      <Navbar />
      <MobileMenu />
      <main>
        <FontPreviewPanel />
      </main>
    </>
  )
}
