// =============================================
//  MOCK PROPERTY DATA - 10 Sample Properties
// =============================================

const PROPERTIES = [
  {
    id: 1,
    title: "Spacious 3BHK Apartment",
    location: "Koramangala, Bangalore",
    city: "Bangalore",
    pincode: "560034",
    price: 45000,
    priceLabel: "₹45,000/mo",
    purpose: "Rent",
    type: "Apartment",
    bhk: 3,
    area: 1450,
    furnishing: "Semi-Furnished",
    floor: "4th of 10",
    balcony: 2,
    parking: true,
    petFriendly: true,
    powerBackup: true,
    wifi: true,
    water: "24/7",
    cctv: true,
    gated: true,
    availableFrom: "2025-08-01",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80",
      "https://images.unsplash.com/photo-1600607687644-c7f34b5063c8?w=600&q=80"
    ],
    amenities: ["Gym", "Swimming Pool", "Lift", "Security", "Club House"],
    nearby: {
      schools: [{ name: "Delhi Public School", dist: "0.8 km" }],
      hospitals: [{ name: "Manipal Hospital", dist: "1.2 km" }],
      metro: [{ name: "Koramangala Metro", dist: "0.5 km" }],
      supermarkets: [{ name: "More Supermarket", dist: "0.3 km" }]
    },
    localityScore: { safety: 4.2, walkability: 3.8, traffic: 3.5, pollution: 3.2, powerReliability: 4.0 },
    owner: { name: "Rajesh Kumar", phone: "9876543210", email: "rajesh@email.com", type: "Owner" },
    verified: true,
    lat: 12.9352, lng: 77.6245,
    rating: 4.5
  },
  {
    id: 2,
    title: "Cozy 2BHK Flat",
    location: "Indiranagar, Bangalore",
    city: "Bangalore",
    pincode: "560038",
    price: 28000,
    priceLabel: "₹28,000/mo",
    purpose: "Rent",
    type: "Apartment",
    bhk: 2,
    area: 980,
    furnishing: "Fully Furnished",
    floor: "2nd of 6",
    balcony: 1,
    parking: true,
    petFriendly: false,
    powerBackup: true,
    wifi: true,
    water: "24/7",
    cctv: true,
    gated: true,
    availableFrom: "2025-07-15",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80"
    ],
    amenities: ["Lift", "Security", "Power Backup", "Intercom"],
    nearby: {
      schools: [{ name: "National High School", dist: "1.0 km" }],
      hospitals: [{ name: "Sparsh Hospital", dist: "2.0 km" }],
      metro: [{ name: "Indiranagar Metro", dist: "0.4 km" }],
      supermarkets: [{ name: "Reliance Fresh", dist: "0.2 km" }]
    },
    localityScore: { safety: 4.5, walkability: 4.2, traffic: 3.0, pollution: 3.5, powerReliability: 4.3 },
    owner: { name: "Priya Sharma", phone: "9876512345", email: "priya@email.com", type: "Agent" },
    verified: true,
    lat: 12.9784, lng: 77.6408,
    rating: 4.7
  },
  {
    id: 3,
    title: "Premium 4BHK Villa",
    location: "Whitefield, Bangalore",
    city: "Bangalore",
    pincode: "560066",
    price: 8500000,
    priceLabel: "₹85 Lakhs",
    purpose: "Buy",
    type: "Villa",
    bhk: 4,
    area: 2800,
    furnishing: "Unfurnished",
    floor: "Ground",
    balcony: 3,
    parking: true,
    petFriendly: true,
    powerBackup: true,
    wifi: false,
    water: "Borewell + Municipal",
    cctv: true,
    gated: true,
    availableFrom: "2025-09-01",
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80"
    ],
    amenities: ["Garden", "Swimming Pool", "Gym", "Club House", "Park", "Temple"],
    nearby: {
      schools: [{ name: "Whitefield Global School", dist: "1.5 km" }],
      hospitals: [{ name: "Columbia Asia Hospital", dist: "3.0 km" }],
      metro: [{ name: "Whitefield Metro", dist: "2.0 km" }],
      supermarkets: [{ name: "Big Bazaar", dist: "1.0 km" }]
    },
    localityScore: { safety: 4.8, walkability: 3.0, traffic: 2.8, pollution: 3.8, powerReliability: 4.5 },
    owner: { name: "Mohan Reddy", phone: "9845678901", email: "mohan@email.com", type: "Owner" },
    verified: true,
    lat: 12.9698, lng: 77.7500,
    rating: 4.8
  },
  {
    id: 4,
    title: "Studio Apartment Near Metro",
    location: "HSR Layout, Bangalore",
    city: "Bangalore",
    pincode: "560102",
    price: 15000,
    priceLabel: "₹15,000/mo",
    purpose: "Rent",
    type: "Studio",
    bhk: 1,
    area: 450,
    furnishing: "Fully Furnished",
    floor: "3rd of 8",
    balcony: 0,
    parking: false,
    petFriendly: false,
    powerBackup: true,
    wifi: true,
    water: "24/7",
    cctv: true,
    gated: false,
    availableFrom: "2025-07-01",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80"
    ],
    amenities: ["Lift", "Security", "Wi-Fi"],
    nearby: {
      schools: [{ name: "BGS School", dist: "2.0 km" }],
      hospitals: [{ name: "Fortis Hospital", dist: "1.8 km" }],
      metro: [{ name: "HSR Metro", dist: "0.3 km" }],
      supermarkets: [{ name: "D-Mart", dist: "0.6 km" }]
    },
    localityScore: { safety: 3.8, walkability: 4.0, traffic: 3.3, pollution: 3.0, powerReliability: 4.0 },
    owner: { name: "Anil Mehta", phone: "9988776655", email: "anil@email.com", type: "Agent" },
    verified: false,
    lat: 12.9116, lng: 77.6389,
    rating: 4.0
  },
  {
    id: 5,
    title: "2BHK Independent House",
    location: "BTM Layout, Bangalore",
    city: "Bangalore",
    pincode: "560076",
    price: 22000,
    priceLabel: "₹22,000/mo",
    purpose: "Rent",
    type: "Independent House",
    bhk: 2,
    area: 1100,
    furnishing: "Semi-Furnished",
    floor: "Ground",
    balcony: 1,
    parking: true,
    petFriendly: true,
    powerBackup: false,
    wifi: false,
    water: "Municipal",
    cctv: false,
    gated: false,
    availableFrom: "2025-08-15",
    images: [
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80"
    ],
    amenities: ["Garden", "Parking"],
    nearby: {
      schools: [{ name: "Kendriya Vidyalaya", dist: "1.2 km" }],
      hospitals: [{ name: "Apollo Clinic", dist: "0.9 km" }],
      metro: [{ name: "BTM Metro", dist: "1.5 km" }],
      supermarkets: [{ name: "Spencer's", dist: "0.4 km" }]
    },
    localityScore: { safety: 3.5, walkability: 3.8, traffic: 3.0, pollution: 2.8, powerReliability: 3.5 },
    owner: { name: "Sunita Rao", phone: "9123456789", email: "sunita@email.com", type: "Owner" },
    verified: false,
    lat: 12.9166, lng: 77.6101,
    rating: 3.8
  },
  {
    id: 6,
    title: "3BHK Luxury Apartment",
    location: "Banjara Hills, Hyderabad",
    city: "Hyderabad",
    pincode: "500034",
    price: 55000,
    priceLabel: "₹55,000/mo",
    purpose: "Rent",
    type: "Apartment",
    bhk: 3,
    area: 1800,
    furnishing: "Fully Furnished",
    floor: "7th of 15",
    balcony: 2,
    parking: true,
    petFriendly: false,
    powerBackup: true,
    wifi: true,
    water: "24/7",
    cctv: true,
    gated: true,
    availableFrom: "2025-07-20",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&q=80"
    ],
    amenities: ["Gym", "Swimming Pool", "Lift", "Security", "Rooftop Garden"],
    nearby: {
      schools: [{ name: "Oakridge International", dist: "1.8 km" }],
      hospitals: [{ name: "Care Hospital", dist: "1.0 km" }],
      metro: [{ name: "Jubilee Hills Metro", dist: "1.2 km" }],
      supermarkets: [{ name: "Hypermarket", dist: "0.5 km" }]
    },
    localityScore: { safety: 4.5, walkability: 4.0, traffic: 2.5, pollution: 3.2, powerReliability: 4.5 },
    owner: { name: "Venkat Prasad", phone: "9876501234", email: "venkat@email.com", type: "Agent" },
    verified: true,
    lat: 17.4126, lng: 78.4483,
    rating: 4.6
  },
  {
    id: 7,
    title: "Affordable 1BHK Flat",
    location: "Malad West, Mumbai",
    city: "Mumbai",
    pincode: "400064",
    price: 25000,
    priceLabel: "₹25,000/mo",
    purpose: "Rent",
    type: "Apartment",
    bhk: 1,
    area: 550,
    furnishing: "Semi-Furnished",
    floor: "5th of 12",
    balcony: 1,
    parking: false,
    petFriendly: false,
    powerBackup: true,
    wifi: false,
    water: "Municipal",
    cctv: false,
    gated: true,
    availableFrom: "2025-07-10",
    images: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&q=80"
    ],
    amenities: ["Lift", "Security"],
    nearby: {
      schools: [{ name: "Ryan International School", dist: "0.9 km" }],
      hospitals: [{ name: "Criticare Hospital", dist: "1.5 km" }],
      metro: [{ name: "Malad Metro", dist: "0.6 km" }],
      supermarkets: [{ name: "Nature's Basket", dist: "0.4 km" }]
    },
    localityScore: { safety: 3.7, walkability: 4.2, traffic: 2.8, pollution: 2.5, powerReliability: 3.8 },
    owner: { name: "Ravi Nair", phone: "9967812345", email: "ravi@email.com", type: "Owner" },
    verified: true,
    lat: 19.1865, lng: 72.8486,
    rating: 4.1
  },
  {
    id: 8,
    title: "3BHK Builder Floor",
    location: "Sector 62, Noida",
    city: "Noida",
    pincode: "201301",
    price: 18000,
    priceLabel: "₹18,000/mo",
    purpose: "Lease",
    type: "Builder Floor",
    bhk: 3,
    area: 1350,
    furnishing: "Unfurnished",
    floor: "1st of 4",
    balcony: 2,
    parking: true,
    petFriendly: true,
    powerBackup: true,
    wifi: false,
    water: "Borewell",
    cctv: false,
    gated: false,
    availableFrom: "2025-09-15",
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=80"
    ],
    amenities: ["Parking", "Garden"],
    nearby: {
      schools: [{ name: "Amity School", dist: "2.2 km" }],
      hospitals: [{ name: "Kailash Hospital", dist: "1.8 km" }],
      metro: [{ name: "Sector 62 Metro", dist: "0.8 km" }],
      supermarkets: [{ name: "Big Bazaar", dist: "1.2 km" }]
    },
    localityScore: { safety: 3.9, walkability: 3.5, traffic: 3.2, pollution: 3.0, powerReliability: 3.8 },
    owner: { name: "Deepak Garg", phone: "9971234567", email: "deepak@email.com", type: "Owner" },
    verified: false,
    lat: 28.6262, lng: 77.3641,
    rating: 3.9
  },
  {
    id: 9,
    title: "2BHK Sea-View Apartment",
    location: "Versova, Mumbai",
    city: "Mumbai",
    pincode: "400061",
    price: 65000,
    priceLabel: "₹65,000/mo",
    purpose: "Rent",
    type: "Apartment",
    bhk: 2,
    area: 1200,
    furnishing: "Fully Furnished",
    floor: "9th of 18",
    balcony: 2,
    parking: true,
    petFriendly: false,
    powerBackup: true,
    wifi: true,
    water: "24/7",
    cctv: true,
    gated: true,
    availableFrom: "2025-08-01",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80",
      "https://images.unsplash.com/photo-1560184897-ae75f418493e?w=600&q=80"
    ],
    amenities: ["Gym", "Sea View", "Lift", "Security", "Concierge"],
    nearby: {
      schools: [{ name: "Vibgyor School", dist: "1.3 km" }],
      hospitals: [{ name: "Kokilaben Hospital", dist: "4.0 km" }],
      metro: [{ name: "Versova Metro", dist: "0.3 km" }],
      supermarkets: [{ name: "Star Bazaar", dist: "0.7 km" }]
    },
    localityScore: { safety: 4.2, walkability: 4.0, traffic: 2.2, pollution: 3.5, powerReliability: 4.2 },
    owner: { name: "Seema Kapoor", phone: "9820123456", email: "seema@email.com", type: "Agent" },
    verified: true,
    lat: 19.1335, lng: 72.8142,
    rating: 4.9
  },
  {
    id: 10,
    title: "4BHK Penthouse",
    location: "Jubilee Hills, Hyderabad",
    city: "Hyderabad",
    pincode: "500033",
    price: 25000000,
    priceLabel: "₹2.5 Cr",
    purpose: "Buy",
    type: "Penthouse",
    bhk: 4,
    area: 3500,
    furnishing: "Fully Furnished",
    floor: "15th of 15",
    balcony: 4,
    parking: true,
    petFriendly: true,
    powerBackup: true,
    wifi: true,
    water: "24/7",
    cctv: true,
    gated: true,
    availableFrom: "2025-10-01",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80"
    ],
    amenities: ["Private Pool", "Gym", "Home Theatre", "Smart Home", "Terrace Garden", "Concierge"],
    nearby: {
      schools: [{ name: "Chirec School", dist: "2.0 km" }],
      hospitals: [{ name: "Apollo Hospital", dist: "1.5 km" }],
      metro: [{ name: "Jubilee Hills Metro", dist: "1.0 km" }],
      supermarkets: [{ name: "Nature's Basket", dist: "0.8 km" }]
    },
    localityScore: { safety: 5.0, walkability: 3.5, traffic: 2.5, pollution: 3.8, powerReliability: 5.0 },
    owner: { name: "Hari Babu", phone: "9000123456", email: "hari@email.com", type: "Owner" },
    verified: true,
    lat: 17.4315, lng: 78.4072,
    rating: 5.0
  }
];

// ---- Auth Helpers ----
const Auth = {
  getUsers() { return JSON.parse(localStorage.getItem('prop_users') || '[]'); },
  saveUsers(u) { localStorage.setItem('prop_users', JSON.stringify(u)); },
  getCurrentUser() { return JSON.parse(sessionStorage.getItem('prop_current_user') || 'null'); },
  setCurrentUser(u) { sessionStorage.setItem('prop_current_user', JSON.stringify(u)); },
  logout() { sessionStorage.removeItem('prop_current_user'); window.location.href = 'login.html'; },
  requireLogin() {
    if (!this.getCurrentUser()) { window.location.href = 'login.html'; return false; }
    return true;
  },
  register(name, identifier, password) {
    const id = identifier.trim().toLowerCase();
    const users = this.getUsers();
    const exists = users.find(u => u.email.toLowerCase() === id || u.username.toLowerCase() === id);
    if (exists) return { ok: false, msg: 'Account already exists with this email/username.' };
    const newUser = { id: Date.now(), name: name.trim(), email: id.includes('@') ? id : '', username: id, password, favorites: [], recentlyViewed: [], appointments: [] };
    users.push(newUser);
    this.saveUsers(users);
    this.setCurrentUser(newUser);
    return { ok: true };
  },
  login(identifier, password) {
    const id = identifier.trim().toLowerCase();
    const users = this.getUsers();
    const user = users.find(u => (u.email.toLowerCase() === id || u.username.toLowerCase() === id) && u.password === password);
    if (!user) return { ok: false, msg: 'Invalid email/username or password.' };
    this.setCurrentUser(user);
    return { ok: true };
  },
  updateUser(data) {
    const users = this.getUsers();
    const idx = users.findIndex(u => u.id === data.id);
    if (idx > -1) { users[idx] = data; this.saveUsers(users); this.setCurrentUser(data); }
  },
  toggleFavorite(propId) {
    const user = this.getCurrentUser();
    if (!user) return false;
    const favs = user.favorites || [];
    const i = favs.indexOf(propId);
    if (i > -1) favs.splice(i, 1); else favs.push(propId);
    user.favorites = favs;
    this.updateUser(user);
    return favs.includes(propId);
  },
  isFavorite(propId) {
    const user = this.getCurrentUser();
    return user && (user.favorites || []).includes(propId);
  },
  addRecentlyViewed(propId) {
    const user = this.getCurrentUser();
    if (!user) return;
    let rv = user.recentlyViewed || [];
    rv = rv.filter(id => id !== propId);
    rv.unshift(propId);
    user.recentlyViewed = rv.slice(0, 10);
    this.updateUser(user);
  },
  bookAppointment(appt) {
    const user = this.getCurrentUser();
    if (!user) return;
    user.appointments = user.appointments || [];
    user.appointments.push({ ...appt, id: Date.now() });
    this.updateUser(user);
  },
  cancelAppointment(apptId) {
    const user = this.getCurrentUser();
    if (!user) return;
    user.appointments = (user.appointments || []).filter(a => a.id !== apptId);
    this.updateUser(user);
  },
  // US11: Save/get user preferences
  savePreferences(prefs) {
    const user = this.getCurrentUser();
    if (!user) return;
    user.preferences = prefs;
    this.updateUser(user);
  },
  getPreferences() {
    const user = this.getCurrentUser();
    return (user && user.preferences) ? user.preferences : null;
  },
  // US11: Toggle property alerts
  toggleAlerts(enabled) {
    const user = this.getCurrentUser();
    if (!user) return false;
    user.alertsEnabled = enabled;
    this.updateUser(user);
    return enabled;
  },
  isAlertsEnabled() {
    const user = this.getCurrentUser();
    return user ? !!user.alertsEnabled : false;
  }
};

// ---- Default Demo Accounts (pre-loaded on every page) ----
(function seedDefaultUsers() {
  const DEFAULT_USERS = [
    {
      id: 1001,
      name: 'Demo User',
      email: 'demo@propfind.com',
      username: 'demo',
      password: 'demo123',
      favorites: [1, 3],
      recentlyViewed: [1, 2, 3],
      appointments: []
    },
    {
      id: 1002,
      name: 'Admin User',
      email: 'admin@propfind.com',
      username: 'admin',
      password: 'admin123',
      favorites: [2, 5, 9],
      recentlyViewed: [2, 5, 9, 10],
      appointments: []
    }
  ];
  const existing = JSON.parse(localStorage.getItem('prop_users') || '[]');
  DEFAULT_USERS.forEach(def => {
    const alreadyExists = existing.find(u => u.id === def.id);
    if (!alreadyExists) existing.push(def);
  });
  localStorage.setItem('prop_users', JSON.stringify(existing));
})();

// ---- Utility Helpers ----
function showToast(msg, type = '') {
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}

function formatScore(val) {
  const stars = Math.round(val);
  return '★'.repeat(stars) + '☆'.repeat(5 - stars);
}

function getPropertyById(id) {
  return PROPERTIES.find(p => p.id === parseInt(id));
}

function renderNavUser() {
  const user = Auth.getCurrentUser();
  const navEl = document.getElementById('nav-auth');
  if (!navEl) return;
  if (user) {
    navEl.innerHTML = `
      <span style="font-size:0.9rem;color:var(--text-muted)">Hi, ${user.name.split(' ')[0]}</span>
      <a href="dashboard.html" class="nav-avatar">${user.name[0].toUpperCase()}</a>
      <button class="btn btn-sm btn-outline" onclick="Auth.logout()">Logout</button>
    `;
  } else {
    navEl.innerHTML = `
      <a href="login.html" class="btn btn-sm btn-outline">Login</a>
      <a href="login.html?tab=register" class="btn btn-sm btn-primary">Register</a>
    `;
  }
}
