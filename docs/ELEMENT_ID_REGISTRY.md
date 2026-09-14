# PropFind – Element ID Registry

> **Purpose:** Single source of truth for every stable `id` attribute across the project.  
> Reference this file in `GENERATE_TESTS.md` Step 3 instead of re-reading HTML files.  
> Update this file whenever a new `id` is added or renamed in any HTML page.

---

## Shared / Global (present on most pages)

| Element ID | Type | Description |
|---|---|---|
| `nav-auth` | `<div>` | Navbar auth slot (Login/Logout button rendered by JS) |

---

## `index.html` — Home / Landing Page

| Element ID | Type | Description |
|---|---|---|
| `main-nav-links` | `<ul>` | Primary navigation link list |
| `tab-rent` | `<button>` | Purpose tab — Rent |
| `tab-buy` | `<button>` | Purpose tab — Buy |
| `tab-lease` | `<button>` | Purpose tab — Lease |
| `search-loc` | `<input text>` | Location search field |
| `search-type` | `<select>` | Property type dropdown |
| `search-bhk` | `<select>` | BHK dropdown |
| `btn-search` | `<button>` | Submit search → redirects to search-results.html |
| `featured-grid` | `<div>` | Container for featured property cards |
| `fav-btn-{id}` | `<button>` | Favourite toggle per card (dynamic; `id` = property ID) |

---

## `login.html` — Login & Register Page (US01)

### Tabs
| Element ID | Type | Description |
|---|---|---|
| `tab-login` | `<button>` | Activate Login form |
| `tab-register` | `<button>` | Activate Register form |

### Login Form (`#form-login`)
| Element ID | Type | Description |
|---|---|---|
| `form-login` | `<form>` | Login form container |
| `login-alert` | `<div>` | Error/info alert message area |
| `login-id` | `<input text>` | Email or username field |
| `login-pwd` | `<input password>` | Password field |
| `btn-login` | `<button submit>` | Submit login |
| `btn-demo-user` | `<button>` | Fill demo credentials (username: demo / demo123) |
| `btn-demo-admin` | `<button>` | Fill admin credentials (username: admin / admin123) |

### Register Form (`#form-register`)
| Element ID | Type | Description |
|---|---|---|
| `form-register` | `<form>` | Register form container |
| `reg-alert` | `<div>` | Error/info alert message area |
| `reg-name` | `<input text>` | Full name field |
| `reg-id` | `<input text>` | Email or username field |
| `reg-pwd` | `<input password>` | Password field |
| `reg-cpwd` | `<input password>` | Confirm password field |
| `strength-fill` | `<div>` | Password strength bar fill (width & colour change) |
| `strength-label` | `<div>` | Password strength label text (Weak / Fair / Good / Strong) |
| `btn-register` | `<button submit>` | Submit registration ("Create Account") |

---

## `search-results.html` — Search Results Page (US02, US03)

### Search Bar
| Element ID | Type | Description |
|---|---|---|
| `search-loc` | `<input text>` | Location / city / pincode search |
| `search-purpose` | `<select>` | Purpose filter (All / Rent / Buy / Lease) |
| `search-type` | `<select>` | Property type quick filter |
| `btn-search` | `<button>` | Trigger search / apply filters |

### Results Header
| Element ID | Type | Description |
|---|---|---|
| `results-count` | `<span>` | Text: "N properties found" |
| `sort-by` | `<select>` | Sort options (Relevance / Price: Low→High / High→Low / Newest / Top Rated) |
| `btn-grid` | `<button>` | Switch to grid view |
| `btn-list` | `<button>` | Switch to list view |
| `compare-btn` | `<a>` | Go to compare page |
| `compare-count` | `<span>` | Number of properties selected for comparison |

### Sidebar Filters
| Element ID | Type | Description |
|---|---|---|
| `f-min` | `<input number>` | Minimum budget (₹) |
| `f-max` | `<input number>` | Maximum budget (₹) |
| `bhk-btn-1` | `<button>` | BHK filter toggle — 1 BHK |
| `bhk-btn-2` | `<button>` | BHK filter toggle — 2 BHK |
| `bhk-btn-3` | `<button>` | BHK filter toggle — 3 BHK |
| `bhk-btn-4` | `<button>` | BHK filter toggle — 4 BHK+ |
| `f-wifi` | `<input checkbox>` | Amenity filter — Wi-Fi Ready |
| `f-parking` | `<input checkbox>` | Amenity filter — Parking |
| `f-pet` | `<input checkbox>` | Amenity filter — Pet Friendly |
| `f-power` | `<input checkbox>` | Amenity filter — Power Backup |
| `f-gated` | `<input checkbox>` | Amenity filter — Gated Community |
| `f-cctv` | `<input checkbox>` | Amenity filter — CCTV |
| `f-verified` | `<input checkbox>` | Amenity filter — Verified Only |
| `type-chk-apartment` | `<input checkbox>` | Property type — Apartment |
| `type-chk-villa` | `<input checkbox>` | Property type — Villa |
| `type-chk-independent-house` | `<input checkbox>` | Property type — Independent House |
| `type-chk-studio` | `<input checkbox>` | Property type — Studio |
| `type-chk-builder-floor` | `<input checkbox>` | Property type — Builder Floor |
| `type-chk-penthouse` | `<input checkbox>` | Property type — Penthouse |
| `btn-apply-filters` | `<button>` | Apply sidebar filters |
| `btn-clear-filters` | `<button>` | Clear all filters (sidebar) |

> **Note:** Furnishing uses `<input type="radio" name="furnish">` with values `""`, `"Fully Furnished"`, `"Semi-Furnished"`, `"Unfurnished"` — no individual `id`. Locate with `this.page.locator("input[name='furnish'][value='...']")`.

### Results Area
| Element ID | Type | Description |
|---|---|---|
| `results-grid` | `<div>` | Property card grid container |
| `no-results` | `<div>` | Empty-state message (hidden class toggled by JS) |
| `btn-clear-filters-empty` | `<button>` | Clear filters button inside no-results state |
| `compare-bar` | `<div>` | Fixed compare bar at page bottom |
| `compare-items` | `<div>` | Chips listing selected properties |
| `btn-compare-now` | `<button>` | Navigate to compare.html |
| `btn-clear-compare` | `<button>` | Clear comparison selection |

### Dynamic IDs (JS template literals)
| Pattern | Description |
|---|---|
| `fav-btn-{id}` | Favourite button per result card |
| `compare-chk-{id}` | Compare checkbox per result card |

---

## `map-view.html` — Map View Page (US04)

| Element ID | Type | Description |
|---|---|---|
| `map-search-input` | `<input text>` | Location search for map |
| `map-purpose` | `<select>` | Purpose filter (All / Rent / Buy / Lease) |
| `map-bhk` | `<select>` | BHK filter (Any / 1 / 2 / 3 / 4+) |
| `btn-props` | `<button>` | Toggle property markers overlay |
| `btn-schools` | `<button>` | Toggle schools facility overlay |
| `btn-hospitals` | `<button>` | Toggle hospitals facility overlay |
| `btn-metro` | `<button>` | Toggle metro stations overlay |
| `map-count` | `<div>` | Text: "Showing N properties" |
| `map-prop-list` | `<div>` | Scrollable property list panel |
| `map` | `<div>` | Leaflet map container |

### Dynamic IDs (JS template literals)
| Pattern | Description |
|---|---|
| `list-{id}` | Property list item (click to focus marker on map) |

---

## `property-detail.html` — Property Detail Page (US05, US06, US09, US10, US14)

### Page Shell
| Element ID | Type | Description |
|---|---|---|
| `detail-content` | `<div>` | Outer content wrapper (rendered by JS based on URL ?id=) |

### Dynamic content (rendered once by JS into `#detail-content`)
| Element ID | Type | Description |
|---|---|---|
| `main-img` | `<img>` | Main property photo |
| `main-img-wrap` | `<div>` | Wrapper for main image |
| `fav-btn` | `<button>` | Favourite toggle (single instance, not ID-per-property here) |
| `virtual-tour` | `<div>` | Virtual tour section |
| `btn-schedule-visit` | `<button>` | Open schedule-visit modal |
| `btn-contact-owner` | `<button>` | Open contact-owner modal |

### Schedule Visit Modal (`#schedule-modal`)
| Element ID | Type | Description |
|---|---|---|
| `schedule-modal` | `<div>` | Modal overlay container |
| `btn-close-schedule-modal` | `<button>` | Close modal |
| `modal-alert` | `<div>` | Alert message inside modal |
| `visit-date` | `<input date>` | Preferred visit date |
| `visit-time` | `<select>` | Preferred visit time slot |
| `visit-name` | `<input text>` | Visitor full name |
| `visit-phone` | `<input tel>` | Visitor mobile number |
| `btn-confirm-booking` | `<button>` | Confirm booking |

### Contact Owner Modal (`#contact-modal`)
| Element ID | Type | Description |
|---|---|---|
| `contact-modal` | `<div>` | Modal overlay container |
| `btn-close-contact-modal` | `<button>` | Close modal |
| `contact-alert` | `<div>` | Alert message inside modal |
| `contact-msg` | `<textarea>` | Inquiry message text |
| `msg-count` | `<span>` | Character count display (N/500) |
| `contact-name` | `<input text>` | Sender full name |
| `contact-phone` | `<input tel>` | Sender mobile number |
| `btn-send-inquiry` | `<button>` | Submit inquiry |

### Report Modal (`#report-modal`)
| Element ID | Type | Description |
|---|---|---|
| `report-modal` | `<div>` | Modal overlay container |
| `btn-close-report-modal` | `<button>` | Close modal |
| `report-reason` | `<select>` | Report reason dropdown |
| `report-alert` | `<div>` | Alert message inside modal |
| `report-detail` | `<textarea>` | Additional report detail |
| `btn-submit-report` | `<button>` | Submit report |

---

## `dashboard.html` — User Dashboard (US07, US11)

### Sidebar Navigation
| Element ID | Type | Description |
|---|---|---|
| `user-avatar` | `<div>` | User initials avatar |
| `user-name` | `<div>` | Logged-in user display name |
| `user-email` | `<div>` | Logged-in user email |
| `nav-overview` | `<a>` | Switch to Overview panel |
| `nav-favorites` | `<a>` | Switch to Saved Properties panel |
| `nav-recent` | `<a>` | Switch to Recently Viewed panel |
| `nav-appointments` | `<a>` | Switch to My Appointments panel |
| `nav-recommendations` | `<a>` | Switch to Recommendations panel |
| `nav-preferences` | `<a>` | Switch to My Preferences panel |

### Panels
| Element ID | Type | Description |
|---|---|---|
| `panel-overview` | `<div>` | Overview panel (stats + upcoming appointments) |
| `greet-name` | `<span>` | Greeting name text |
| `stat-favs` | `<div>` | Saved properties count |
| `stat-appts` | `<div>` | Appointments count |
| `stat-recent` | `<div>` | Recently viewed count |
| `overview-appts` | `<div>` | Upcoming appointment cards |
| `panel-favorites` | `<div>` | Saved Properties panel |
| `favs-list` | `<div>` | Rendered favourite property cards |
| `panel-recent` | `<div>` | Recently Viewed panel |
| `recent-list` | `<div>` | Rendered recently viewed cards |
| `panel-appointments` | `<div>` | My Appointments panel |
| `appts-list` | `<div>` | Rendered appointment rows |
| `panel-recommendations` | `<div>` | Recommendations panel |
| `reco-grid` | `<div>` | Recommended property grid |
| `panel-preferences` | `<div>` | My Preferences panel |

### Preferences Panel
| Element ID | Type | Description |
|---|---|---|
| `alert-status-lbl` | `<span>` | Alerts toggle label (On/Off) |
| `alerts-toggle` | `<input checkbox>` | Enable/disable property alerts |
| `toggle-track` | `<span>` | Visual toggle track (UI element) |
| `toggle-thumb` | `<span>` | Visual toggle thumb (UI element) |
| `pref-saved-alert` | `<div>` | Preferences saved confirmation |
| `pref-nl` | `<textarea>` | Natural language preferences input |
| `pref-city` | `<select>` | Preferred city |
| `pref-purpose` | `<select>` | Preferred purpose |
| `pref-bhk` | `<select>` | Preferred BHK |
| `pref-furnish` | `<select>` | Preferred furnishing |
| `pref-budget` | `<input number>` | Max monthly budget |
| `pref-type` | `<select>` | Preferred property type |
| `pref-amenity-row` | `<div>` | Amenity preference toggles |
| `btn-save-preferences` | `<button>` | Save preferences |
| `pref-reco-grid` | `<div>` | Recommendations grid inside preferences |

### Dynamic IDs (JS template literals)
| Pattern | Description |
|---|---|
| `btn-remove-fav-{id}` | Remove button on each favourite card |
| `btn-cancel-appt-{id}` | Cancel button on each appointment row |

---

## `compare.html` — Compare Properties Page (US08)

| Element ID | Type | Description |
|---|---|---|
| `compare-content` | `<div>` | Comparison table container (rendered by JS) |

### Dynamic IDs (JS template literals)
| Pattern | Description |
|---|---|
| `btn-remove-{id}` | Remove a property column from the comparison |
| `btn-add-more-property` | Add another property (shown when < 3 selected) |

---

## `budget-planner.html` — Budget Planner Page (US12)

### Inputs
| Element ID | Type | Description |
|---|---|---|
| `inp-salary` | `<input number>` | Monthly take-home salary |
| `inp-rent` | `<input range>` | Monthly rent slider |
| `rent-val` | `<span>` | Live rent value display |
| `inp-maintenance` | `<input number>` | Maintenance charges |
| `inp-electricity` | `<input number>` | Electricity bill |
| `inp-internet` | `<input number>` | Internet / broadband cost |
| `inp-parking` | `<input number>` | Parking charges |
| `inp-food` | `<input number>` | Food & groceries |
| `inp-transport` | `<input number>` | Transport / commute |
| `inp-other` | `<input number>` | Other monthly expenses |
| `inp-deposit` | `<input number>` | Security deposit (auto-calculated or manual override) |
| `inp-moving` | `<input number>` | One-time moving cost |
| `btn-calculate` | `<button>` | Trigger budget calculation |

### Output
| Element ID | Type | Description |
|---|---|---|
| `results-panel` | `<div>` | Budget summary and affordability result area |

---

## `add-listing.html` — Add Listing / Post Property Page (US13)

### Progress Stepper
| Element ID | Type | Description |
|---|---|---|
| `step-1` … `step-5` | `<div>` | Step indicators (active class set by JS) |
| `listing-alert` | `<div>` | Global form alert |
| `listing-form` | `<form>` | Multi-section listing form |

### Section 1 — Basic Info
| Element ID | Type | Description |
|---|---|---|
| `section-1` | `<div>` | Section container |
| `f-title` | `<input text>` | Property title |
| `f-purpose` | `<select>` | Purpose (Rent / Buy / Lease) |
| `f-type` | `<select>` | Property type |
| `f-price` | `<input number>` | Monthly rent or sale price |
| `f-bhk` | `<select>` | BHK count |

### Section 2 — Location & Details
| Element ID | Type | Description |
|---|---|---|
| `section-2` | `<div>` | Section container |
| `f-city` | `<select>` | City |
| `f-locality` | `<input text>` | Locality / area name |
| `f-pincode` | `<input text>` | 6-digit pincode |
| `f-area` | `<input number>` | Area in sqft |
| `f-floor` | `<input text>` | Floor info (e.g. "3rd of 10") |
| `f-balcony` | `<select>` | Number of balconies |
| `f-furnish` | `<select>` | Furnishing status |
| `f-available` | `<input date>` | Available from date |
| `f-water` | `<select>` | Water availability |
| `f-desc` | `<textarea>` | Property description |
| `desc-count` | `<div>` | Character count (N/500) |

### Section 3 — Amenities
| Element ID | Type | Description |
|---|---|---|
| `section-3` | `<div>` | Section container |
| `a-gym` | `<input checkbox>` | Gym |
| `a-pool` | `<input checkbox>` | Swimming Pool |
| `a-lift` | `<input checkbox>` | Lift |
| `a-security` | `<input checkbox>` | Security |
| `a-wifi` | `<input checkbox>` | Wi-Fi Ready |
| `a-parking` | `<input checkbox>` | Parking |
| `a-pet` | `<input checkbox>` | Pet Friendly |
| `a-power` | `<input checkbox>` | Power Backup |
| `a-cctv` | `<input checkbox>` | CCTV |
| `a-gated` | `<input checkbox>` | Gated Community |
| `a-garden` | `<input checkbox>` | Garden |
| `a-club` | `<input checkbox>` | Club House |
| `a-play` | `<input checkbox>` | Play Area |
| `a-park` | `<input checkbox>` | Park |
| `a-intercom` | `<input checkbox>` | Intercom |
| `f-tenant` | `<select>` | Preferred tenant type |
| `f-notice` | `<select>` | Notice period |

### Section 4 — Media
| Element ID | Type | Description |
|---|---|---|
| `section-4` | `<div>` | Section container |
| `photo-input` | `<input file>` | Photo upload (multiple images) |
| `photo-preview` | `<div>` | Image thumbnail preview strip |
| `f-video` | `<input url>` | Video tour link (YouTube / Drive) |

### Section 5 — Owner Info & Review
| Element ID | Type | Description |
|---|---|---|
| `section-5` | `<div>` | Section container |
| `f-owner-name` | `<input text>` | Owner full name |
| `f-owner-type` | `<select>` | Owner type (Owner / Agent / Builder) |
| `f-owner-phone` | `<input tel>` | Owner phone number |
| `f-owner-email` | `<input email>` | Owner email |
| `f-terms` | `<input checkbox>` | Terms & conditions acceptance |
| `btn-submit-listing` | `<button submit>` | Submit the listing |

### Live Preview Card
| Element ID | Type | Description |
|---|---|---|
| `preview-img` | `<div>` | Preview card image slot |
| `preview-title` | `<div>` | Live preview title |
| `preview-location` | `<div>` | Live preview location |
| `preview-price` | `<div>` | Live preview price |
| `preview-meta` | `<div>` | Live preview BHK / type meta |
| `success-modal` | `<div>` | Success confirmation modal (shown after submission) |

---

## `moving-assistant.html` — Moving Assistant Page (US15)

### Tab Navigation
| Element ID | Type | Description |
|---|---|---|
| `tabs-bar` | `<div>` | Tab navigation container |
| `tab-btn-support` | `<button>` | Tab — Legal & Rental Support |
| `tab-btn-documents` | `<button>` | Tab — Documents |
| `tab-btn-checklist` | `<button>` | Tab — Checklists |
| `tab-btn-guidance` | `<button>` | Tab — Moving Guidance |
| `tab-btn-progress` | `<button>` | Tab — My Progress |

### Tab Panels
| Element ID | Type | Description |
|---|---|---|
| `tab-support` | `<div>` | Legal & Rental Support panel |
| `tab-documents` | `<div>` | Documents panel |
| `tab-checklist` | `<div>` | Checklists panel |
| `tab-guidance` | `<div>` | Moving Guidance panel |
| `tab-progress` | `<div>` | My Progress panel |

### Legal Support Accordions
| Element ID | Type | Description |
|---|---|---|
| `acc1` / `acc1-icon` | `<div>` / `<span>` | "What should a rental agreement include?" |
| `acc2` / `acc2-icon` | `<div>` / `<span>` | "11-month vs 12-month lease" |
| `acc3` / `acc3-icon` | `<div>` / `<span>` | "How to handle security deposit disputes?" |
| `acc4` / `acc4-icon` | `<div>` / `<span>` | "Tenant rights under Indian law" |

### Documents Panel
| Element ID | Type | Description |
|---|---|---|
| `doc-alert` | `<div>` | Alert message area |
| `btn-dl-rental-agreement` | `<button>` | Download Rental Agreement PDF |
| `btn-dl-leave-licence` | `<button>` | Download Leave & Licence Agreement PDF |
| `btn-dl-inventory` | `<button>` | Download Inventory Checklist PDF |
| `btn-dl-tenant-verification` | `<button>` | Download Tenant Verification Form PDF |
| `btn-dl-kyc` | `<button>` | Download KYC Checklist PDF |
| `doc-upload` | `<input file>` | Upload personal documents |
| `uploaded-docs` | `<div>` | Uploaded documents list |

### Checklist Panel
| Element ID | Type | Description |
|---|---|---|
| `checklist-tenant` | `<div>` | Tenant documentation checklist container |
| `checklist-property` | `<div>` | Property inspection checklist container |
| `checklist-movein` | `<div>` | Move-in day checklist container |

### Progress Panel
| Element ID | Type | Description |
|---|---|---|
| `prog-pct` | `<span>` | Overall progress percentage text |
| `prog-fill` | `<div>` | Overall progress bar fill |
| `prog-label` | `<div>` | Overall progress label (N of M tasks) |
| `prog-tenant` | `<div>` | Tenant checklist progress bar fill |
| `prog-tenant-lbl` | `<div>` | Tenant checklist percentage label |
| `prog-property` | `<div>` | Property checklist progress bar fill |
| `prog-property-lbl` | `<div>` | Property checklist percentage label |
| `prog-movein` | `<div>` | Move-in checklist progress bar fill |
| `prog-movein-lbl` | `<div>` | Move-in checklist percentage label |
| `prog-docs` | `<div>` | Documents progress bar fill |
| `prog-docs-lbl` | `<div>` | Documents percentage label |
| `progress-reminders` | `<div>` | Reminder message area |
| `btn-reset-progress` | `<button>` | Reset all checklist progress |

### Dynamic IDs (JS template literals)
| Pattern | Description |
|---|---|
| `ci-{cid}` | Checklist item container |
| `chk-{cid}` | Checklist item checkbox |

---

## Maintenance Notes

- When you add or rename an `id` in any HTML file, update this table immediately.
- Dynamic ID patterns (e.g. `fav-btn-{id}`) use `this.page.locator(\`#fav-btn-${id}\`)` in Playwright.
- The `name="furnish"` radio group in `search-results.html` is the **only** interactive filter group without individual `id` attributes; locate it with `this.page.locator("input[name='furnish'][value='...']")`.
