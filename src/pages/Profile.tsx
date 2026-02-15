import { useAuth } from '@/contexts/AuthContext';
import { useI18n } from '@/i18n';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Building2, Shield } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export default function Profile() {
  const { user } = useAuth();
  const { t } = useI18n();

  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  const { data: department } = useQuery({
    queryKey: ['department', profile?.department_id],
    queryFn: async () => {
      if (!profile?.department_id) return null;
      const { data, error } = await supabase
        .from('departments')
        .select('name_ar, name_en')
        .eq('id', profile.department_id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!profile?.department_id,
  });

  const roleLabels: Record<string, string> = t.roles;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t.profile?.title ?? 'ملفي الشخصي'}</h1>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                {t.profile?.info ?? 'معلومات المستخدم'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">{t.auth.email}</p>
                <p className="font-medium" dir="ltr">{user?.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t.profile?.fullName ?? 'الاسم'}</p>
                <p className="font-medium">{profile?.full_name || '—'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">User ID</p>
                <p className="font-medium text-xs" dir="ltr">{user?.id || '—'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t.profile?.status ?? 'الحالة'}</p>
                <Badge variant={profile?.is_active ? 'default' : 'destructive'}>
                  {profile?.is_active ? t.status.active : (t.profile?.inactive ?? 'موقوف')}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                {t.profile?.roleAndDept ?? 'الدور والقسم'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">{t.profile?.roles ?? 'الدور'}</p>
                <Badge variant="secondary">
                  {roleLabels[profile?.role_code] || profile?.role_code || '—'}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Building2 className="w-4 h-4" />
                  {t.items.department}
                </p>
                <p className="font-medium mt-1">
                  {department
                    ? (t.dir === 'rtl' ? department.name_ar : department.name_en)
                    : '—'}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
