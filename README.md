# Portofolio Aditya Permana

Situs portofolio statis bertema kartu pemain. Dibuat dengan HTML, CSS, dan JavaScript murni, tanpa framework dan tanpa proses build.

## Fitur

- Kartu pemain 3D yang mengikuti kursor atau sentuhan, dengan angka stat yang dihitung naik
- Animasi pembuka ala buka pack kartu (bisa dilewati dengan tombol Lewati atau Esc)
- Pilihan bahasa Indonesia dan Inggris (ID / EN), pilihannya diingat browser
- Pengalaman kerja, proyek, repositori GitHub, keahlian, pendidikan, dan sertifikasi
- Sertifikat dan CV bisa dibuka di jendela popup
- Tampil baik di desktop maupun HP, dan menghormati pengaturan "kurangi gerakan"

## Struktur folder

```
.
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   ├── images/
│   │   ├── aditya.jpg
│   │   └── cv-aditya-permana.jpg
│   └── certificates/
│       ├── google-analytics.jpg
│       ├── revou-software-engineering.jpg
│       ├── seminar-ai-karir-bisnis.jpg
│       ├── flip-english-bootcamp.jpg
│       └── emotional-intelligence.jpg
└── README.md
```

## Menjalankan di komputer

Buka `index.html` di browser (klik dua kali). Tidak perlu server. Font diambil dari Google Fonts, jadi perlu internet agar tampilannya sama persis.

## Deploy ke GitHub Pages

1. Unggah seluruh isi folder ini ke repositori GitHub, dengan `index.html` di akar repositori.
2. Buka **Settings → Pages**.
3. Pada **Build and deployment**, pilih **Deploy from a branch**, lalu branch `main` dan folder `/ (root)`.
4. Simpan. Beberapa menit kemudian situsnya aktif di `https://<username>.github.io/<nama-repo>/`.

## Cara mengubah isi

- **Teks bahasa Indonesia** ada langsung di `index.html`. **Terjemahan Inggrisnya** ada di atribut `data-en` pada elemen yang sama. Kalau mengubah satu, ubah juga yang lain.
- **Foto dan gambar**: ganti file di folder `assets/` dengan nama yang sama.
- **Sertifikat baru**: salin satu blok tombol `tro-btn` di bagian Trophy Room pada `index.html`, lalu ganti `data-src`, `data-alt`, `data-cap`, `data-alt-en`, dan `data-cap-en`.
- **Warna dan tema**: variabel warna ada di bagian `:root` pada `css/style.css`.
- **Angka stat di kartu dan Skill Tree** hanya hiasan bergaya game. Ubah angkanya pada atribut `data-n` (kartu) dan `data-w` (bar skill).

