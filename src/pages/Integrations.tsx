import { useI18n } from '@/i18n';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { MessageCircle, Send, Webhook } from 'lucide-react';

const integrations = [
  { key: 'whatsapp' as const, icon: MessageCircle },
  { key: 'telegram' as const, icon: Send },
  { key: 'n8n' as const, icon: Webhook },
];

export default function Integrations() {
  const { t } = useI18n();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t.integrations.title}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {integrations.map(({ key, icon: Icon }) => (
          <Card key={key}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-primary" />
                  <CardTitle className="text-lg">{t.integrations[key]}</CardTitle>
                </div>
                <Switch />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>{t.integrations.apiKey}</Label>
                <Input type="password" dir="ltr" placeholder="••••••••" />
              </div>
              <div className="space-y-2">
                <Label>{t.integrations.webhookUrl}</Label>
                <Input type="url" dir="ltr" placeholder="https://..." />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">{t.integrations.test}</Button>
                <Button size="sm">{t.integrations.save}</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
