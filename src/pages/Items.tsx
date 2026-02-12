import { useState } from 'react';
import { useI18n } from '@/i18n';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Search } from 'lucide-react';

export default function Items() {
  const { t } = useI18n();
  const [departmentFilter, setDepartmentFilter] = useState('all');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold">{t.items.title}</h1>
        <Button>
          <Plus className="w-4 h-4 me-2" />
          {t.items.add}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder={t.items.search} className="ps-9" />
            </div>
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.common.all}</SelectItem>
                <SelectItem value="hr">{t.departments.hr}</SelectItem>
                <SelectItem value="maintenance">{t.departments.maintenance}</SelectItem>
                <SelectItem value="legal">{t.departments.legal}</SelectItem>
                <SelectItem value="collection">{t.departments.collection}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t.items.referenceNo}</TableHead>
                <TableHead>{t.items.name}</TableHead>
                <TableHead>{t.items.department}</TableHead>
                <TableHead>{t.items.expiryDate}</TableHead>
                <TableHead>{t.items.priority}</TableHead>
                <TableHead>{t.items.status}</TableHead>
                <TableHead>{t.common.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                  {t.items.noItems}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
