export default function DashboardPage() {
  return (
    <div>
      {/* Sesuai gambar, judul "Dashboard" ada di kiri atas */}
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-xl font-semibold mb-2">Selamat Datang, Admin!</h2>
        <p className="text-gray-600">
          Gunakan menu di sebelah kiri untuk mengelola Artikel, Produk, Kategori, dan Jasa untuk website Bali Limestone.
        </p>
      </div>
    </div>
  );
}