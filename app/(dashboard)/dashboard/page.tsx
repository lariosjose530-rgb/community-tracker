import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { DashboardView } from '@/components/dashboard/DashboardView';

export default async function DashboardPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('username, current_xp, current_streak, longest_streak')
    .eq('id', user.id)
    .single();

  return (
    <DashboardView
      username={profile?.username ?? 'Miembro'}
      initialXp={profile?.current_xp ?? 0}
      initialStreak={profile?.current_streak ?? 0}
      longestStreak={profile?.longest_streak ?? 0}
    />
  );
}
