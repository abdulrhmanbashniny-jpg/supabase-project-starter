import { useI18n } from '@/i18n';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ClipboardList, AlertTriangle, XCircle, CheckCircle2 } from 'lucide-react';

const stats = [
  { key: 'totalItems', icon: ClipboardList, value: 0, color: 'text-primary' },
  { key: 'expiringSoon', icon: AlertTriangle, value: 0, color: 'text-warning' },
  { key: 'expired', icon: XCircle, value: 0, color: 'text-destructive' },
  { key: 'acknowledged', icon: CheckCircle2, value: 0, color: 'text-success' },
] as const;

export default function Dashboard() {
  const { t } = useI18n();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t.dashboard.title}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ key, icon: Icon, value, color }) => (
          <Card key={key}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {t.dashboard[key]}
              </CardTitle>
              <Icon className={`w-5 h-5 ${color}`} />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{t.dashboard.upcomingExpirations}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">{t.items.noItems}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{t.dashboard.recentAlerts}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">{t.items.noItems}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
