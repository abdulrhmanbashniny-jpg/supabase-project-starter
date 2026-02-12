import { useI18n } from '@/i18n';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Send, TestTube } from 'lucide-react';

export default function Reports() {
  const { t } = useI18n();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t.reports.title}</h1>

      <Tabs defaultValue="overdue">
        <TabsList>
          <TabsTrigger value="overdue">{t.reports.overdueByDept}</TabsTrigger>
          <TabsTrigger value="expiring">{t.reports.expiringIn10Days}</TabsTrigger>
          <TabsTrigger value="unack">{t.reports.unacknowledged}</TabsTrigger>
        </TabsList>

        <TabsContent value="overdue">
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              {t.items.noItems}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="expiring">
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              {t.items.noItems}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="unack">
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              {t.items.noItems}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>{t.reports.weeklyReport}</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-3">
          <Button variant="outline">
            <TestTube className="w-4 h-4 me-2" />
            {t.reports.testSend}
          </Button>
          <Button>
            <Send className="w-4 h-4 me-2" />
            {t.reports.sendNow}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
