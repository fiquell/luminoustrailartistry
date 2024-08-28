import { ReactNode } from 'react'

interface AppLayoutProps {
  children: ReactNode
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return <main>{children}</main>
}

export default AppLayout
