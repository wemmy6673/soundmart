import AdminLayout from "./AdminLayout";

export default function AdminOrders() {
  return (
    <AdminLayout>
      <div className="mb-6">
        <h2 className="font-display text-2xl font-semibold text-gray-900">Orders</h2>
        <p className="text-sm text-gray-400 mt-1">Manage customer orders.</p>
      </div>
      <div className="bg-white border border-gray-100 rounded-2xl p-16 text-center">
        <p className="text-gray-400 text-sm">Orders management coming soon.</p>
      </div>
    </AdminLayout>
  );
}