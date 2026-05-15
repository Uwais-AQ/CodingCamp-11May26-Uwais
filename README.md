# 💰 Expense & Budget Visualizer
A professional, production-ready expense tracking web application built with Vanilla JavaScript.

---

## 📝 Deskripsi Proyek
Proyek ini dikembangkan sebagai bagian dari tugas Software Development. Aplikasi ini membantu pengguna untuk mencatat pengeluaran harian, mengelola kategori secara kustom, dan memvisualisasikan data dalam bentuk grafik yang interaktif.

## ✨ Fitur Utama (MVP)
- **Input Form Berbasis Validasi**: Input Nama Barang, Jumlah, dan Kategori yang aman.
- **Total Balance Otomatis**: Saldo terhitung secara real-time setiap ada perubahan data.
- **Daftar Transaksi**: List yang bisa di-scroll dengan fitur hapus data.
- **Visualisasi Chart.js**: Pie chart interaktif untuk melihat distribusi pengeluaran per kategori.

## 🚀 Fitur Tambahan (Optional Challenges)
1. **Custom Categories**: Pengguna bisa menambah dan menghapus hingga maksimal 5 kategori kustom.
2. **Filter & Sort**: Kemampuan menyaring riwayat transaksi berdasarkan kategori tertentu.
3. **Dark/Light Mode**: Tema Gelap dengan palet warna Biru Tua yang modern dan nyaman di mata.
4. **Data Persistence**: Menggunakan `localStorage` agar data tetap tersimpan meskipun browser di-refresh.

## 🛠️ Tech Stack
- **HTML5**: Struktur semantik.
- **CSS3**: Layout responsif (Flexbox & Grid) dengan Custom Variables.
- **JavaScript (ES6+)**: Logika aplikasi murni tanpa framework.
- **Chart.js**: Library untuk visualisasi data.

## 📂 Struktur Folder
```text
CodingCamp-11May26-uwaisaq/
├── .kiro/              # Metadata Kiro (Wajib untuk validasi)
├── css/
│   └── style.css       # Custom styling & Dark Mode
├── js/
│   └── app.js          # Core logic & State management
└── index.html          # Halaman utama
