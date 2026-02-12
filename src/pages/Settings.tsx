import { useI18n } from '@/i18n';
import { useTheme } from '@/contexts/ThemeContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function SettingsPage() {
  const { t, lang, setLang } = useI18n();
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t.settings.title}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t.settings.general}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>{t.settings.language}</Label>
              <Select value={lang} onValueChange={(v) => setLang(v as 'ar' | 'en')}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ar">العربية</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>{t.settings.theme}</Label>
              <Select value={theme} onValueChange={(v) => setTheme(v as 'light' | 'dark')}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">{t.settings.light}</SelectItem>
                  <SelectItem value="dark">{t.settings.dark}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t.settings.notifications}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>{t.settings.notificationTime}</Label>
              <Input type="time" defaultValue="07:00" dir="ltr" />
            </div>
            <div className="space-y-2">
              <Label>{t.settings.reminderDaysBefore}</Label>
              <Input type="number" defaultValue={4} min={1} max={30} dir="ltr" />
            </div>
            <div className="space-y-2">
              <Label>{t.settings.weeklyReportEmail}</Label>
              <Input type="email" placeholder="manager@company.com" dir="ltr" />
            </div>
            <Button>{t.settings.save}</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
