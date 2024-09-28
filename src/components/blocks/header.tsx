import { useState } from 'react'
import { Moon, Sun, Menu, PlusCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from './theme-provider'
import LangSwitch from './langswitcher'
import { useTranslation } from 'react-i18next';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const { t } = useTranslation();
  console.log(t);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <header className="sticky top-0 z-50  px-10 border-b bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <a href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">
              {t('header.title')}
            </span>
          </a>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <a href="/complaints">{t('header.complaints')}</a>
            <a href="/suggestions">{t('header.suggestions')}</a>
            <a href="/important">{t('header.important')}</a>
          </nav>
        </div>
        <Button
          className="inline-flex items-center md:hidden"
          onClick={toggleMenu}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <Button asChild variant="default" className="hidden md:inline-flex">
            <a href="/form" className="flex items-center">
              <PlusCircle className="mr-2 h-4 w-4" />
              {t('header.createForm')}
            </a>
          </Button>
          <LangSwitch />
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle Theme"
            className="mr-6"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle Theme</span>
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <nav className="container pb-3 pt-2 md:hidden">
          <a href="/" className="block py-2">
            {t('header.title')}
          </a>
          <a href="/complaints" className="block py-2">
            {t('header.complaints')}
          </a>
          <a href="/suggestions" className="block py-2">
            {t('header.suggestions')}
          </a>
          <a href="/important" className="block py-2">
            {t('header.important')}
          </a>
          <a href="/new-form" className="block py-2">
            {t('header.createForm')}
          </a>
        </nav>
      )}
    </header>
  )
}
