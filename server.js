const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(cors()); // Farklı cihazlardan erişim için
app.use(express.json());

const filePath = 'names.json';

// İsimleri getir
app.get('/names', (req, res) => {
    if (fs.existsSync(filePath)) {
        const names = JSON.parse(fs.readFileSync(filePath));
        res.json(names);
    } else {
        res.json([]);
    }
});

// İsim ekle
app.post('/names', (req, res) => {
    const { name } = req.body;
    if(!name) return res.status(400).json({ message: 'İsim boş olamaz' });

    let names = [];
    if (fs.existsSync(filePath)) {
        names = JSON.parse(fs.readFileSync(filePath));
    }
    names.push(name);
    fs.writeFileSync(filePath, JSON.stringify(names));
    res.json({ message: 'İsim kaydedildi', names });
});

// Sıfırla
app.post('/reset', (req, res) => {
    const { password } = req.body;
    if(password === 'Ömer1234') {
        fs.writeFileSync(filePath, JSON.stringify([]));
        res.json({ message: 'İsimler sıfırlandı' });
    } else {
        res.status(401).json({ message: 'Şifre yanlış' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server ${PORT} çalışıyor...`));
