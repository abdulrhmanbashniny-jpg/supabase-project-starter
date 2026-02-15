import { useAuth } from '@/contexts/AuthContext';
import { useI18n } from '@/i18n';
import { useTheme } from '@/contexts/ThemeContext';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  ClipboardList,
  UserCircle,
  BarChart3,
  Settings,
  Plug,
  FileText,
  LogOut,
  Moon,
  Sun,
  Languages,
  Factory,
} from 'lucide-react';

const navItems = [
  { key: 'dashboard', icon: LayoutDashboard, path: '/' },
  { key: 'items', icon: ClipboardList, path: '/items' },
  { key: 'reports', icon: BarChart3, path: '/reports' },
  { key: 'profile', icon: UserCircle, path: '/me' },
  { key: 'settings', icon: Settings, path: '/settings' },
  { key: 'integrations', icon: Plug, path: '/integrations' },
  { key: 'auditLog', icon: FileText, path: '/audit-log' },
] as const;

export default function DashboardLayout() {
  const { signOut, user } = useAuth();
  const { t, lang, setLang } = useI18n();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <SidebarProvider>
      <Sidebar side={lang === 'ar' ? 'right' : 'left'}>
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shrink-0">
              <Factory className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="min-w-0">
              <h2 className="font-bold text-sm truncate">{t.app.name}</h2>
              <p className="text-xs text-muted-foreground truncate">{t.app.company}</p>
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map(({ key, icon: Icon, path }) => (
                  <SidebarMenuItem key={key}>
                    <SidebarMenuButton
                      isActive={location.pathname === path}
                      onClick={() => navigate(path)}
                      tooltip={t.nav[key]}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{t.nav[key]}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="p-3 space-y-2">
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={toggleTheme}
              title={theme === 'light' ? t.settings.dark : t.settings.light}
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
              title={t.settings.language}
            >
              <Languages className="w-4 h-4" />
            </Button>
          </div>
          <div className="text-xs text-muted-foreground truncate px-2">
            {user?.email}
          </div>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={signOut}>
                <LogOut className="w-4 h-4" />
                <span>{t.nav.logout}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="flex items-center gap-2 border-b px-4 h-14">
          <SidebarTrigger />
        </header>
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
