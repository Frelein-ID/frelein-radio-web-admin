'use client'

import Container from './_components/layouts/container'
import CustomSidebar from './_components/layouts/sidebar'

export default function App() {
  return (
    <>
      <aside>
        <CustomSidebar></CustomSidebar>
      </aside>
      <Container>
        tips
      </Container>
    </>
  )
}
