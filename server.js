const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Data Files
const PRODUCTS_FILE = path.join(__dirname, 'data', 'products.json');
const ORDERS_FILE = path.join(__dirname, 'data', 'orders.json');
const CONTACT_FILE = path.join(__dirname, 'data', 'contacts.json');

// Helper Functions
const readData = (file) => {
    if (!fs.existsSync(file)) return [];
    const data = fs.readFileSync(file);
    return JSON.parse(data);
};

const writeData = (file, data) => {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
};

// --- API ROUTES ---

// 1. Get All Products
app.get('/api/products', (req, res) => {
    const products = readData(PRODUCTS_FILE);
    res.json(products);
});

// 2. Get Single Product
app.get('/api/products/:id', (req, res) => {
    const products = readData(PRODUCTS_FILE);
    const product = products.find(p => p.id == req.params.id);
    if (product) res.json(product);
    else res.status(404).json({ message: 'Product not found' });
});

// 3. Add Product (Admin)
app.post('/api/products', (req, res) => {
    const products = readData(PRODUCTS_FILE);
    const newProduct = {
        id: Date.now(),
        ...req.body
    };
    products.push(newProduct);
    writeData(PRODUCTS_FILE, products);
    res.json({ message: 'Product added', product: newProduct });
});

// 4. Update Product (Admin)
app.put('/api/products/:id', (req, res) => {
    let products = readData(PRODUCTS_FILE);
    const index = products.findIndex(p => p.id == req.params.id);
    if (index !== -1) {
        products[index] = { ...products[index], ...req.body };
        writeData(PRODUCTS_FILE, products);
        res.json({ message: 'Product updated', product: products[index] });
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

// 5. Delete Product (Admin)
app.delete('/api/products/:id', (req, res) => {
    let products = readData(PRODUCTS_FILE);
    products = products.filter(p => p.id != req.params.id);
    writeData(PRODUCTS_FILE, products);
    res.json({ message: 'Product deleted' });
});

// 6. Create Order
app.post('/api/orders', (req, res) => {
    const orders = readData(ORDERS_FILE);
    const newOrder = {
        id: 'ORD-' + Date.now(),
        date: new Date().toISOString(),
        status: 'Pending',
        ...req.body
    };
    orders.push(newOrder);
    writeData(ORDERS_FILE, orders);
    res.json({ message: 'Order placed successfully', orderId: newOrder.id });
});

// 7. Get Orders (Admin)
app.get('/api/orders', (req, res) => {
    const orders = readData(ORDERS_FILE);
    res.json(orders);
});

// 8. Update Order Status (Admin)
app.put('/api/orders/:id', (req, res) => {
    let orders = readData(ORDERS_FILE);
    const index = orders.findIndex(o => o.id == req.params.id);
    if (index !== -1) {
        orders[index].status = req.body.status;
        writeData(ORDERS_FILE, orders);
        res.json({ message: 'Order updated' });
    } else {
        res.status(404).json({ message: 'Order not found' });
    }
});

// 9. Contact Form
app.post('/api/contact', (req, res) => {
    const contacts = readData(CONTACT_FILE);
    contacts.push({ id: Date.now(), ...req.body, date: new Date().toISOString() });
    writeData(CONTACT_FILE, contacts);
    res.json({ message: 'Message received' });
});

// 10. Admin Login (Simple Hardcoded for Demo)
app.post('/api/admin/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'admin123') {
        res.json({ success: true, token: 'admin-token-secret' });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
