import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { INITIAL_PROPERTIES } from './src/data/initialProperties.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json());

// Ensure data folder exists
const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const PROPERTIES_FILE = path.join(DATA_DIR, 'properties.json');
const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');

// Initialize properties if not present
if (!fs.existsSync(PROPERTIES_FILE)) {
  fs.writeFileSync(PROPERTIES_FILE, JSON.stringify(INITIAL_PROPERTIES, null, 2), 'utf-8');
}

// Initialize inquiries if not present
if (!fs.existsSync(INQUIRIES_FILE)) {
  const initialInquiries = [
    {
      id: 'inq-seed-01',
      fullName: 'Muhammad Tariq',
      phone: '03001234567',
      propertyType: 'Residential Plot',
      budget: 'PKR 36–50 Lac',
      preferredLocation: 'WAPDA Town',
      message: 'Interested in the 5 Marla plot in Sector B. Please share transfer terms and payment milestones.',
      propertyId: 'orakzai-01',
      propertyTitle: '5 Marla Prime Residential Plot',
      status: 'Contacted',
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
    },
    {
      id: 'inq-seed-02',
      fullName: 'Ahmad Khan',
      phone: '03459876543',
      propertyType: 'House',
      budget: 'PKR 1 Crore+',
      preferredLocation: 'Nowshera',
      message: 'Looking for a double-storey 5 or 10 Marla house ready for occupancy.',
      status: 'Pending',
      createdAt: new Date(Date.now() - 3600000 * 5).toISOString()
    }
  ];
  fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(initialInquiries, null, 2), 'utf-8');
}

function getStoredProperties() {
  try {
    const content = fs.readFileSync(PROPERTIES_FILE, 'utf-8');
    return JSON.parse(content);
  } catch (err) {
    return INITIAL_PROPERTIES;
  }
}

function saveProperties(properties: any[]) {
  fs.writeFileSync(PROPERTIES_FILE, JSON.stringify(properties, null, 2), 'utf-8');
}

function getStoredInquiries() {
  try {
    const content = fs.readFileSync(INQUIRIES_FILE, 'utf-8');
    return JSON.parse(content);
  } catch (err) {
    return [];
  }
}

function saveInquiries(inquiries: any[]) {
  fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2), 'utf-8');
}

// ======================== API ROUTES ========================

// 1. GET all properties
app.get('/api/properties', (_req: Request, res: Response) => {
  const properties = getStoredProperties();
  res.json({ success: true, data: properties });
});

// 2. CREATE a new property (Admin)
app.post('/api/properties', (req: Request, res: Response) => {
  const properties = getStoredProperties();
  const newProp = {
    ...req.body,
    id: `orakzai-${Date.now()}`,
    isDemoListing: req.body.isDemoListing !== false, // defaulted to true for demo listings
    createdAt: new Date().toISOString()
  };
  properties.unshift(newProp);
  saveProperties(properties);
  res.status(201).json({ success: true, data: newProp });
});

// 3. UPDATE an existing property (Admin)
app.put('/api/properties/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const properties = getStoredProperties();
  const index = properties.findIndex((p: any) => p.id === id);
  if (index === -1) {
    res.status(404).json({ success: false, message: 'Property not found' });
    return;
  }
  properties[index] = { ...properties[index], ...req.body, id };
  saveProperties(properties);
  res.json({ success: true, data: properties[index] });
});

// 4. DELETE a property (Admin)
app.delete('/api/properties/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  let properties = getStoredProperties();
  properties = properties.filter((p: any) => p.id !== id);
  saveProperties(properties);
  res.json({ success: true, message: 'Property deleted successfully' });
});

// 5. SUBMIT a customer inquiry
app.post('/api/inquiries', (req: Request, res: Response) => {
  const { fullName, phone, propertyType, budget, preferredLocation, message, propertyId, propertyTitle } = req.body;

  if (!fullName || !phone) {
    res.status(400).json({ success: false, message: 'Full Name and Phone Number are required.' });
    return;
  }

  const inquiries = getStoredInquiries();
  const newInquiry = {
    id: `inq-${Date.now()}`,
    fullName: fullName.trim(),
    phone: phone.trim(),
    propertyType: propertyType || 'General Inquiry',
    budget: budget || 'PKR 36–50 Lac',
    preferredLocation: preferredLocation || 'Peshawar',
    message: message ? message.trim() : '',
    propertyId: propertyId || null,
    propertyTitle: propertyTitle || null,
    status: 'Pending',
    createdAt: new Date().toISOString()
  };

  inquiries.unshift(newInquiry);
  saveInquiries(inquiries);

  res.status(201).json({
    success: true,
    data: newInquiry,
    message: 'Inquiry received. Hamid Shah or Bilal Shah will contact you shortly.'
  });
});

// 6. GET all inquiries (Admin)
app.get('/api/inquiries', (_req: Request, res: Response) => {
  const inquiries = getStoredInquiries();
  res.json({ success: true, data: inquiries });
});

// 7. UPDATE inquiry status (Admin)
app.patch('/api/inquiries/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const inquiries = getStoredInquiries();
  const index = inquiries.findIndex((i: any) => i.id === id);
  if (index === -1) {
    res.status(404).json({ success: false, message: 'Inquiry not found' });
    return;
  }
  inquiries[index].status = status;
  saveInquiries(inquiries);
  res.json({ success: true, data: inquiries[index] });
});

// 8. ADMIN LOGIN
app.post('/api/admin/login', (req: Request, res: Response) => {
  const { password } = req.body;
  // Default password for Orakzai Real Estate admin
  if (password === 'orakzai2026' || password === 'orakzai') {
    res.json({
      success: true,
      token: 'admin-session-' + Date.now(),
      adminName: 'Orakzai Real Estate Management'
    });
  } else {
    res.status(401).json({ success: false, message: 'Invalid administrative password.' });
  }
});

// 9. OVERVIEW STATS
app.get('/api/stats', (_req: Request, res: Response) => {
  const properties = getStoredProperties();
  const inquiries = getStoredInquiries();
  res.json({
    success: true,
    data: {
      totalProperties: properties.length,
      availableProperties: properties.filter((p: any) => p.status === 'Available').length,
      totalInquiries: inquiries.length,
      pendingInquiries: inquiries.filter((i: any) => i.status === 'Pending').length,
      startingPriceLac: 36
    }
  });
});

// ======================== DEV / PROD SERVING ========================

async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Orakzai Real Estate Server] Running at http://localhost:${PORT}`);
  });
}

startServer();
