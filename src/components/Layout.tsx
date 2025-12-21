import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu, Home, Gift, User, Coins, Flame, Globe, Info, FileText, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { NavLink } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useUserProgress } from "@/hooks/useUserProgress";

export default function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  const { progress } = useUserProgress();

  const navItems = [
    { title: t('home'), url: "/", icon: Home },
    { title: t('textInput'), url: "/text-input", icon: FileText },
    { title: t('scenarioMode'), url: "/scenario-mode", icon: BookOpen },
    { title: t('rewards'), url: "/rewards", icon: Gift },
    { title: t('profile'), url: "/profile", icon: User },
    { title: t('about'), url: "/about", icon: Info },
  ];

  return (
    <div className="min-h-screen bg-background geometric-pattern" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Top Navigation Bar */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <NavLink to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">ب</span>
              </div>
              <h1 className="text-xl font-bold text-foreground">Botaqiy</h1>
            </NavLink>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.url}
                  to={item.url}
                  className={({ isActive }) =>
                    `nav-item ${isActive ? 'active' : ''}`
                  }
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.title}</span>
                </NavLink>
              ))}
            </nav>

            {/* Language Toggle, Stats & Mobile Menu */}
            <div className="flex items-center gap-4">
              {/* Language Toggle */}
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleLanguage}
                title={language === 'ar' ? 'Switch to English' : 'التبديل للعربية'}
              >
                <Globe className="w-5 h-5" />
              </Button>
              
              {/* Stats Display */}
              <div className="hidden sm:flex items-center gap-3">
                <div className="coin-counter flex items-center gap-1">
                  <Coins className="w-4 h-4" />
                  <span>{progress.coins.toLocaleString()}</span>
                </div>
                <div className="streak-badge flex items-center gap-1">
                  <Flame className="w-4 h-4" />
                  <span>{progress.streak_days}</span>
                </div>
              </div>

              {/* Mobile Menu */}
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="ghost" size="icon">
                    <Menu className="w-6 h-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side={language === 'ar' ? 'left' : 'right'} className="w-80">
                  <SheetHeader>
                  <SheetTitle className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                        <span className="text-primary-foreground font-bold">ب</span>
                      </div>
                      <span>Botaqiy</span>
                    </SheetTitle>
                  </SheetHeader>
                  
                  {/* Mobile Stats */}
                  <div className="flex items-center justify-center gap-4 mt-6 mb-8">
                    <div className="coin-counter flex items-center gap-1">
                      <Coins className="w-4 h-4" />
                      <span>{progress.coins.toLocaleString()}</span>
                    </div>
                    <div className="streak-badge flex items-center gap-1">
                      <Flame className="w-4 h-4" />
                      <span>{progress.streak_days}</span>
                    </div>
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="space-y-2">
                    {navItems.map((item) => (
                      <NavLink
                        key={item.url}
                        to={item.url}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={({ isActive }) =>
                          `nav-item w-full ${isActive ? 'active' : ''}`
                        }
                      >
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.title}</span>
                      </NavLink>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
