// --- 1. INISIALISASI DATA (STATE) ---
let state = JSON.parse(localStorage.getItem('expense_data')) || {
    transactions: [],
    categories: ['Food', 'Transport', 'Fun'], // Kategori awal [cite: 21]
    isDarkMode: false
};

let myChart = null;

// --- 2. FUNGSI UTAMA (LOGIKA BISNIS) ---

// Simpan data ke Browser 
const saveData = () => {
    localStorage.setItem('expense_data', JSON.stringify(state));
};

// Hitung Total Saldo [cite: 28, 29]
const updateBalance = () => {
    const total = state.transactions.reduce((acc, item) => acc + item.amount, 0);
    document.getElementById('total-balance').innerText = `$${total.toFixed(2)}`;
};

// Render Grafik (Chart.js) [cite: 31, 32, 34]
const renderChart = () => {
    const ctx = document.getElementById('expense-chart').getContext('2d');
    
    // Hitung data per kategori
    const dataPerCategory = state.categories.map(cat => {
        return state.transactions
            .filter(t => t.category === cat)
            .reduce((sum, t) => sum + t.amount, 0);
    });

    if (myChart) myChart.destroy(); // Hapus chart lama agar tidak error [cite: 61]

    myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: state.categories,
            datasets: [{
                data: dataPerCategory,
                backgroundColor: ['#2ecc71', '#3498db', '#f1c40f', '#e67e22', '#9b59b6']
            }]
        },
        options: { responsive: true }
    });
};

// Tampilkan Daftar Transaksi [cite: 24, 25, 26]
const renderTransactions = (filter = 'all') => {
    const list = document.getElementById('transaction-list');
    list.innerHTML = '';

    const filtered = filter === 'all' 
        ? state.transactions 
        : state.transactions.filter(t => t.category === filter);

    filtered.reverse().forEach((t, index) => {
        const item = document.createElement('div');
        item.className = 'transaction-item';
        item.innerHTML = `
            <div>
                <strong>${t.name}</strong> <br>
                <span class="category-tag">${t.category}</span>
            </div>
            <div style="text-align: right">
                <span style="color: var(--primary-color); font-weight: bold">$${t.amount.toFixed(2)}</span> <br>
                <button onclick="deleteTransaction(${t.id})" style="color: red; border: none; background: none; cursor: pointer">Delete</button>
            </div>
        `;
        list.appendChild(item);
    });
};

// Kelola Dropdown & List Kategori
const renderCategoryUI = () => {
    const select = document.getElementById('category-select');
    const sortSelect = document.getElementById('sort-category');
    const catList = document.getElementById('category-list');
    
    // Reset isi dropdown, tapi sisakan pilihan default "Pilih kategori"
    select.innerHTML = '<option value="" disabled selected>Pilih kategori</option>';
    sortSelect.innerHTML = '<option value="all">Semua Kategori</option>';
    catList.innerHTML = '';

    state.categories.forEach(cat => {
        select.innerHTML += `<option value="${cat}">${cat}</option>`;
        sortSelect.innerHTML += `<option value="${cat}">${cat}</option>`;
        catList.innerHTML += `
            <div class="category-tag-item">
                ${cat}
                <button onclick="deleteCategory('${cat}')">&times;</button>
            </div>
`;    });
};

// --- 3. FUNGSI EVENT (AKSI USER) ---

// Tambah Transaksi 
document.getElementById('transaction-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('item-name').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category-select').value;

    if (name && amount && category) { 
    state.transactions.push({ id: Date.now(), name, amount, category });
    saveData();
    updateUI();
    e.target.reset(); 
    } else {
    alert("Mohon pilih kategori terlebih dahulu!");
    }
});

// Hapus Transaksi 
window.deleteTransaction = (id) => {
    state.transactions = state.transactions.filter(t => t.id !== id);
    saveData();
    updateUI();
};

// Tambah Kategori 
document.getElementById('add-category-btn').addEventListener('click', () => {
    const newCat = document.getElementById('new-category').value.trim();

    // Cek 1: Apakah input kosong?
    if (!newCat) {
        alert("Nama kategori tidak boleh kosong!");
        return;
    }

    // Cek 2: Apakah sudah mencapai batas 5?
    if (state.categories.length >= 5) {
        alert("Maksimal 5 kategori saja ya!");
        return;
    }

    // Cek 3: Apakah kategori sudah ada (Duplikat)?
    if (state.categories.includes(newCat)) {
        alert(`Kategori "${newCat}" sudah ada!`);
        return;
    }

    // Jika semua cek lolos, baru simpan
    state.categories.push(newCat);
    saveData();
    updateUI();
    document.getElementById('new-category').value = '';
});

// Hapus Kategori
window.deleteCategory = (catName) => {
    // Cek: Jangan sampai kosong sama sekali
    if (state.categories.length <= 1) {
        alert("Aplikasi butuh minimal 1 kategori agar bisa berfungsi dengan baik!");
        return; 
    }

    // Tambahkan konfirmasi agar user tidak tidak sengaja menghapus
    const yakin = confirm(`Hapus kategori "${catName}"? Semua transaksi di kategori ini juga akan terhapus.`);
    
    if (yakin) {
        // 1. Hapus kategorinya
        state.categories = state.categories.filter(c => c !== catName);
        
        // 2. SINKRONISASI: Hapus transaksi yang memakai kategori tersebut
        state.transactions = state.transactions.filter(t => t.category !== catName);
        
        saveData();
        updateUI();
    }
};

// Filter/Sort Kategori
document.getElementById('sort-category').addEventListener('change', (e) => {
    renderTransactions(e.target.value);
});

// Dark Mode Toggle
document.getElementById('theme-toggle').addEventListener('click', () => {
    state.isDarkMode = !state.isDarkMode;
    document.body.classList.toggle('dark-theme', state.isDarkMode);
    saveData();
});

// --- 4. RENDER AWAL ---
const updateUI = () => {
    updateBalance();
    renderTransactions();
    renderChart();
    renderCategoryUI();
};

// Jalankan saat pertama kali buka
document.body.classList.toggle('dark-theme', state.isDarkMode);
updateUI();