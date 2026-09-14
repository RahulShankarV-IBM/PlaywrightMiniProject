@US05 @US06 @US09 @US10 @US14
Feature: Property Detail Page
  As a property seeker and registered user
  I want to view detailed property info, schedule visits, contact owners, and verify listings
  So that I can make informed and safe property decisions

  # ═══════════════════════════════════════════════════════════════════════════
  # Part A: US05 & US06 – Property Detail & Locality / Nearby Facilities
  # ═══════════════════════════════════════════════════════════════════════════

  # TC21 ──────────────────────────────────────────────────────────────
  @TC21 @US05 @Functional @High
  Scenario: Open property details page
    Given I am on the property detail page for property 1
    Then the property detail content should be displayed

  # TC22 ──────────────────────────────────────────────────────────────
  @TC22 @US05 @Functional @High
  Scenario: Verify price, location, area and BHK
    Given I am on the property detail page for property 1
    Then the property price should be displayed
    And the property location should be displayed
    And the property area should be displayed
    And the property BHK should be displayed

  # TC23 ──────────────────────────────────────────────────────────────
  @TC23 @US05 @Functional @Medium
  Scenario: View property images
    Given I am on the property detail page for property 1
    Then the main property image should be visible

  # TC24 ──────────────────────────────────────────────────────────────
  @TC24 @US05 @Functional @Medium
  Scenario: View virtual tour
    Given I am on the property detail page for property 1
    When I click the virtual tour section
    Then the virtual tour content should be displayed

  # TC25 ──────────────────────────────────────────────────────────────
  @TC25 @US05 @Functional @Medium
  Scenario: View owner/agent information
    Given I am on the property detail page for property 1
    Then the contact owner button should be visible

  # TC26 ──────────────────────────────────────────────────────────────
  @TC26 @US06 @Functional @High
  Scenario: View nearby schools and hospitals
    Given I am on the property detail page for property 1
    Then the nearby facilities section should display schools
    And the nearby facilities section should display hospitals

  # TC27 ──────────────────────────────────────────────────────────────
  @TC27 @US06 @Functional @High
  Scenario: View pharmacies, police stations and fire stations
    Given I am on the property detail page for property 1
    Then the nearby facilities section should display a police station
    And the nearby facilities section should display a fire station

  # TC28 ──────────────────────────────────────────────────────────────
  @TC28 @US06 @Functional @Medium
  Scenario: View supermarkets, ATMs and transport
    Given I am on the property detail page for property 1
    Then the nearby facilities section should display supermarkets
    And the nearby facilities section should display metro stations

  # TC29 ──────────────────────────────────────────────────────────────
  @TC29 @US06 @Functional @Medium
  Scenario: View locality insights
    Given I am on the property detail page for property 1
    Then the locality insights section should be displayed

  # TC30 ──────────────────────────────────────────────────────────────
  @TC30 @US06 @Functional @High
  Scenario: Access emergency support
    Given I am on the property detail page for property 1
    Then the nearby facilities section should display emergency facilities

  # ═══════════════════════════════════════════════════════════════════════════
  # Part B: US09 – Schedule Property Visit
  # ═══════════════════════════════════════════════════════════════════════════

  # TC41 ──────────────────────────────────────────────────────────────────────
  @TC41 @US09 @Functional @High
  Scenario: View available visit dates and time slots
    Given I am on the property detail page as a logged-in user
    When I click the Schedule Visit button
    Then the schedule visit modal should be displayed
    And the visit date and time slot fields should be visible

  # TC42 ──────────────────────────────────────────────────────────────────────
  @TC42 @US09 @Functional @High
  Scenario Outline: Book an available visit slot
    Given I am on the property detail page as a logged-in user
    When I click the Schedule Visit button
    And I select the visit date "<date>"
    And I select the visit time slot "<timeSlot>"
    And I enter visitor name "<name>"
    And I enter visitor phone "<phone>"
    And I confirm the booking
    Then the visit booking should be confirmed successfully

    Examples:
      | date       | timeSlot            | name       | phone      |
      | 2027-01-15 | 10:00 AM – 11:00 AM | Rohit Test | 9876543210 |
      | 2027-02-20 | 3:00 PM – 4:00 PM   | Rohit Test | 9876543210 |

  # TC43 ──────────────────────────────────────────────────────────────────────
  @TC43 @US09 @Negative @High
  Scenario: Prevent booking when required fields are missing
    Given I am on the property detail page as a logged-in user
    When I click the Schedule Visit button
    And I confirm the booking without filling any fields
    Then a booking validation error should be displayed

  # TC44 ──────────────────────────────────────────────────────────────────────
  @TC44 @US09 @Functional @High
  Scenario: Verify booking confirmation is shown after successful booking
    Given I am on the property detail page as a logged-in user
    When I click the Schedule Visit button
    And I select the visit date "2027-03-10"
    And I select the visit time slot "11:00 AM – 12:00 PM"
    And I enter visitor name "Rohit Test"
    And I enter visitor phone "9876543210"
    And I confirm the booking
    Then the visit booking should be confirmed successfully

  # TC45 ──────────────────────────────────────────────────────────────────────
  @TC45 @US09 @Functional @High
  Scenario: Close the schedule visit modal
    Given I am on the property detail page as a logged-in user
    When I click the Schedule Visit button
    Then the schedule visit modal should be displayed
    When I close the schedule visit modal
    Then the schedule visit modal should be closed

  # ═══════════════════════════════════════════════════════════════════════════
  # Part B: US10 – Contact Owner / Send Inquiry
  # ═══════════════════════════════════════════════════════════════════════════

  # TC46 ──────────────────────────────────────────────────────────────────────
  @TC46 @US10 @Functional @High
  Scenario: Open contact owner option on the property page
    Given I am on the property detail page
    Then the Contact Owner button should be visible

  # TC47 ──────────────────────────────────────────────────────────────────────
  @TC47 @US10 @Functional @High
  Scenario: Send a valid inquiry to the owner
    Given I am on the property detail page
    When I click the Contact Owner button
    And I enter inquiry message "Hi, I am interested in this property. Please share more details."
    And I enter contact name "Rohit Test"
    And I enter contact phone "9876543210"
    And I submit the inquiry
    Then the inquiry should be sent successfully

  # TC48 ──────────────────────────────────────────────────────────────────────
  @TC48 @US10 @Validation @Medium
  Scenario: Submit inquiry without entering a message
    Given I am on the property detail page
    When I click the Contact Owner button
    And I enter contact name "Rohit Test"
    And I enter contact phone "9876543210"
    And I submit the inquiry
    Then a contact validation error should be displayed

  # TC49 ──────────────────────────────────────────────────────────────────────
  @TC49 @US10 @Functional @High
  Scenario: Inquiry is registered after submission
    Given I am on the property detail page
    When I click the Contact Owner button
    And I enter inquiry message "I would like to arrange a viewing of this property."
    And I enter contact name "Rohit Test"
    And I enter contact phone "9876543210"
    And I submit the inquiry
    Then the inquiry should be sent successfully

  # TC50 ──────────────────────────────────────────────────────────────────────
  @TC50 @US10 @Negative @Medium
  Scenario: Handle inquiry message that exceeds the character limit
    Given I am on the property detail page
    When I click the Contact Owner button
    And I enter an inquiry message exceeding 500 characters
    And I enter contact name "Rohit Test"
    And I enter contact phone "9876543210"
    And I submit the inquiry
    Then a contact validation error should be displayed

  # ═══════════════════════════════════════════════════════════════════════════
  # Part B: US14 – Property Verification and Safety
  # ═══════════════════════════════════════════════════════════════════════════

  # TC66 ──────────────────────────────────────────────────────────────────────
  @TC66 @US14 @Functional @High
  Scenario: Verified property displays a verification badge
    Given I am on the property detail page
    Then the verified property badge should be displayed

  # TC67 ──────────────────────────────────────────────────────────────────────
  @TC67 @US14 @Functional @High
  Scenario: Report a suspicious listing with a valid reason
    Given I am on the property detail page
    When I open the report listing form
    And I select report reason "Suspicious listing"
    And I submit the report
    Then the report should be submitted successfully

  # TC68 ──────────────────────────────────────────────────────────────────────
  @TC68 @US14 @Validation @Medium
  Scenario: Submit report without selecting a reason
    Given I am on the property detail page
    When I open the report listing form
    And I submit the report without selecting a reason
    Then a report validation error should be displayed

  # TC69 ──────────────────────────────────────────────────────────────────────
  @TC69 @US14 @Functional @High
  Scenario: View property safety information on the detail page
    Given I am on the property detail page
    Then the property safety information section should be displayed

  # TC70 ──────────────────────────────────────────────────────────────────────
  @TC70 @US14 @Functional @Medium
  Scenario: View community facilities listed on the property page
    Given I am on the property detail page
    Then the property amenities section should be displayed
