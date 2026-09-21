class AddListingPage {
    constructor(page, baseUrl) {
        this.page    = page;
        this.baseUrl = baseUrl;

        // Progress stepper
        this.listingAlert   = this.page.locator('#listing-alert');
        this.listingForm    = this.page.locator('#listing-form');

        // Section 1 – Basic Info
        this.fTitle   = this.page.locator('#f-title');
        this.fPurpose = this.page.locator('#f-purpose');
        this.fType    = this.page.locator('#f-type');
        this.fPrice   = this.page.locator('#f-price');
        this.fBhk     = this.page.locator('#f-bhk');

        // Section 2 – Location & Details
        this.fCity      = this.page.locator('#f-city');
        this.fLocality  = this.page.locator('#f-locality');
        this.fPincode   = this.page.locator('#f-pincode');
        this.fArea      = this.page.locator('#f-area');
        this.fFloor     = this.page.locator('#f-floor');
        this.fFurnish   = this.page.locator('#f-furnish');
        this.fAvailable = this.page.locator('#f-available');
        this.fDesc      = this.page.locator('#f-desc');

        // Section 3 – Amenities
        this.aWifi    = this.page.locator('#a-wifi');
        this.aParking = this.page.locator('#a-parking');
        this.aLift    = this.page.locator('#a-lift');

        // Section 4 – Media
        this.photoInput   = this.page.locator('#photo-input');
        this.photoPreview = this.page.locator('#photo-preview');

        // Section 5 – Owner Info & Review
        this.fOwnerName  = this.page.locator('#f-owner-name');
        this.fOwnerType  = this.page.locator('#f-owner-type');
        this.fOwnerPhone = this.page.locator('#f-owner-phone');
        this.fOwnerEmail = this.page.locator('#f-owner-email');
        this.fTerms      = this.page.locator('#f-terms');
        this.btnSubmit   = this.page.locator('#btn-submit-listing');

        // Live preview
        this.previewTitle    = this.page.locator('#preview-title');
        this.previewLocation = this.page.locator('#preview-location');
        this.previewPrice    = this.page.locator('#preview-price');

        // Success modal
        this.successModal = this.page.locator('#success-modal');
    }

    async navigateTo() {
        await this.page.goto(this.baseUrl + 'add-listing.html');
        await this.listingForm.waitFor();
    }

    async fillBasicInfo({ title = 'Test Property', purpose = 'Rent', type = 'Apartment', price = '15000', bhk = '2' } = {}) {
        await this.fTitle.fill(title);
        await this.fPurpose.selectOption({ label: purpose });
        await this.fType.selectOption({ label: type });
        await this.fPrice.fill(price);
        await this.fBhk.selectOption(bhk);
    }

    async fillLocationDetails({ city = 'Chennai', locality = 'Anna Nagar', pincode = '600040', area = '1200', floor = '3rd of 10', furnish = 'Fully Furnished', desc = 'Spacious apartment with great amenities.' } = {}) {
        await this.fCity.selectOption({ label: city });
        await this.fLocality.fill(locality);
        await this.fPincode.fill(pincode);
        await this.fArea.fill(area);
        await this.fFloor.fill(floor);
        await this.fFurnish.selectOption({ label: furnish });
        await this.fDesc.fill(desc);
    }

    async selectAmenities() {
        await this.aWifi.check();
        await this.aParking.check();
        await this.aLift.check();
    }

    async fillOwnerInfo({ name = 'Test Owner', type = 'Owner', phone = '9876543210', email = 'owner@test.com' } = {}) {
        await this.fOwnerName.fill(name);
        await this.fOwnerType.selectOption({ label: type });
        await this.fOwnerPhone.fill(phone);
        await this.fOwnerEmail.fill(email);
        await this.fTerms.check();
    }

    async submitListing() {
        await this.btnSubmit.click();
    }

    async submitWithoutFilling() {
        await this.btnSubmit.click();
    }

    async isSuccessModalVisible() {
        return await this.successModal.isVisible();
    }

    async isListingAlertVisible() {
        return await this.listingAlert.isVisible();
    }

    async getPreviewTitle() {
        return await this.previewTitle.textContent();
    }

    async updateTitle(newTitle) {
        await this.fTitle.fill(newTitle);
    }

    async clearTitle() {
        await this.fTitle.fill('');
    }
}

module.exports = { AddListingPage };
