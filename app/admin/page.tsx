import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import AdminDashboard from '@/components/admin/AdminDashboard'

export const metadata = { title: 'Admin — NIGOR 2Transport' }

export default function AdminPage() {
  const cookieStore = cookies()
  const auth = cookieStore.get('n2t-admin')?.value
  if (auth !== process.env.ADMIN_SECRET) redirect('/admin/login')
  return <AdminDashboard />
}
