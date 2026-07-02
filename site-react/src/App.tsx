import { Routes, Route, Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ProjectsPage from './pages/ProjectsPage'
import ProjectDetailPage from './pages/ProjectDetailPage'
import ContactPage from './pages/ContactPage'
import BlogPage from './pages/BlogPage'
import PaymentPlansPage from './pages/PaymentPlansPage'
import WhatsAppButton from './components/WhatsAppButton'
import ScrollUX from './components/ScrollUX'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: 'easeIn' } },
}

function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      {children}
    </motion.div>
  )
}

function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollUX />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default function App() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<Layout />}>
          <Route index element={<PageTransition><HomePage /></PageTransition>} />
          <Route path="about" element={<PageTransition><AboutPage /></PageTransition>} />
          <Route path="projects" element={<PageTransition><ProjectsPage /></PageTransition>} />
          <Route path="projects/:slug" element={<PageTransition><ProjectDetailPage /></PageTransition>} />
          <Route path="contact" element={<PageTransition><ContactPage /></PageTransition>} />
          <Route path="blog" element={<PageTransition><BlogPage /></PageTransition>} />
          <Route path="payment-plans" element={<PageTransition><PaymentPlansPage /></PageTransition>} />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}
