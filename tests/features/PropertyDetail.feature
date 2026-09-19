Feature: Property Detail Page (US09 – Schedule Visit, US10 – Contact Owner, US14 – Verified & Report)

  Background:
    Given I am on the property detail page as a logged-in user

  # ---------------------------------------------------------------------------
  # US09 – Schedule Property Visit  (TC41–TC45)
  # ---------------------------------------------------------------------------

  @TC41 @US09 @Functional @High
  Scenario: TC41 – View available visit dates and time slots
    When I click the Schedule Visit button
    Then the schedule visit modal should be displayed
    And the visit date and time slot fields should be visible

  @TC42 @US09 @Functional @High
  Scenario: TC42 – Book an available slot
    When I click the Schedule Visit button
    And I select the visit date "2025-12-01"
    And I select the visit time slot "10:00 AM – 11:00 AM"
    And I enter visitor name "Rohit Kumar"
    And I enter visitor phone "9876543210"
    And I confirm the booking
    Then the visit booking should be confirmed successfully

  @TC43 @US09 @Negative @High
  Scenario: TC43 – Prevent booking without filling required fields
    When I click the Schedule Visit button
    And I confirm the booking without filling any fields
    Then a booking validation error should be displayed

  @TC44 @US09 @Functional @High
  Scenario: TC44 – Verify booking confirmation notification
    When I click the Schedule Visit button
    And I select the visit date "2025-12-01"
    And I select the visit time slot "11:00 AM – 12:00 PM"
    And I enter visitor name "Rohit Kumar"
    And I enter visitor phone "9876543210"
    And I confirm the booking
    Then the visit booking should be confirmed successfully

  @TC45 @US09 @Functional @High
  Scenario: TC45 – View and cancel scheduled visit (close modal)
    When I click the Schedule Visit button
    Then the schedule visit modal should be displayed
    When I close the schedule visit modal
    Then the schedule visit modal should be closed

  # ---------------------------------------------------------------------------
  # US10 – Contact Owner / Inquiry  (TC46–TC50)
  # ---------------------------------------------------------------------------

  @TC46 @US10 @Functional @High
  Scenario: TC46 – Open contact option
    Then the Contact Owner button should be visible

  @TC47 @US10 @Functional @High
  Scenario: TC47 – Send valid inquiry
    When I click the Contact Owner button
    And I enter inquiry message "I am interested in this property. Please share more details."
    And I enter contact name "Rohit Kumar"
    And I enter contact phone "9876543210"
    And I submit the inquiry
    Then the inquiry should be sent successfully

  @TC48 @US10 @Validation @Medium
  Scenario: TC48 – Submit empty inquiry
    When I click the Contact Owner button
    And I submit the inquiry
    Then a contact validation error should be displayed

  @TC49 @US10 @Functional @High
  Scenario: TC49 – Verify inquiry is delivered to owner or agent
    When I click the Contact Owner button
    And I enter inquiry message "Please let me know if the property is still available."
    And I enter contact name "Rohit Kumar"
    And I enter contact phone "9876543210"
    And I submit the inquiry
    Then the inquiry should be sent successfully

  @TC50 @US10 @Negative @Medium
  Scenario: TC50 – Handle excessively long inquiry message
    When I click the Contact Owner button
    And I enter an inquiry message exceeding 500 characters
    And I submit the inquiry
    Then a contact validation error should be displayed

  # ---------------------------------------------------------------------------
  # US14 – Verified Listing, Report & Safety  (TC66–TC70)
  # ---------------------------------------------------------------------------

  @TC66 @US14 @Functional @High
  Scenario: TC66 – View verified property badge
    Then the verified property badge should be displayed

  @TC67 @US14 @Functional @High
  Scenario: TC67 – Report suspicious listing
    When I open the report listing form
    And I select report reason "Fraudulent Listing"
    And I submit the report
    Then the report should be submitted successfully

  @TC68 @US14 @Validation @Medium
  Scenario: TC68 – Submit report without selecting a reason
    When I open the report listing form
    And I submit the report without selecting a reason
    Then a report validation error should be displayed

  @TC69 @US14 @Functional @High
  Scenario: TC69 – View property safety information
    Then the property safety information section should be displayed

  @TC70 @US14 @Functional @Medium
  Scenario: TC70 – View community facilities
    Then the property amenities section should be displayed
