import AdminLayout from "./AdminLayout";

export default function AdminUsers() {
  return (
    <AdminLayout>
      <div className="mb-6">
        <h2 className="font-display text-2xl font-semibold text-gray-900">Users</h2>
        <p className="text-sm text-gray-400 mt-1">Manage registered users.</p>
      </div>
      <div className="bg-white border border-gray-100 rounded-2xl p-16 text-center">
        <p className="text-gray-400 text-sm">User management coming soon.</p>
      </div>
    </AdminLayout>
  );
}