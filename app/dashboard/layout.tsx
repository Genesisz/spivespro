import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Sidebar from '@/components/layout/admin/sidebar';
import { AppUser } from '@/lib/useUser';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  
  // Simple role check without database call
  if (!session || !session.user) {
    redirect('/login');
  }

  // Check if user has admin role from session
  const user = session.user as AppUser;
  if (user.role !== 'admin') {
    redirect('/');
  }

  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-white">
        <div className="min-h-full">
          <div className="container mx-auto px-8 py-8">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
} 