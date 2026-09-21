Feature: Add Listing (US13)

  @TC61 @US13 @Functional @High
  Scenario: Create listing with valid details
    Given I am on the add listing page
    When I fill in the basic listing details with valid information
    And I fill in the location and property details
    And I select amenities for the listing
    And I enter owner information and accept the terms
    And I submit the listing form
    Then the listing success modal should be displayed

  @TC62 @US13 @Validation @High
  Scenario: Create listing with missing mandatory fields
    Given I am on the add listing page
    When I submit the listing form without filling mandatory fields
    Then a listing validation alert should be displayed

  @TC63 @US13 @Functional @Medium
  Scenario: Upload property photos
    Given I am on the add listing page
    When I upload a valid photo to the listing
    Then the photo preview should be displayed

  @TC64 @US13 @Functional @High
  Scenario: Edit existing listing
    Given I am on the add listing page
    When I fill in the basic listing details with valid information
    And I fill in the location and property details
    And I enter owner information and accept the terms
    And I submit the listing form
    Then the listing success modal should be displayed
    When I update the listing title to "Updated Property Title"
    Then the live preview title should reflect "Updated Property Title"

  @TC65 @US13 @Functional @High
  Scenario: Remove existing listing
    Given I am on the add listing page
    When I fill in the basic listing details with valid information
    And I fill in the location and property details
    And I enter owner information and accept the terms
    And I submit the listing form
    Then the listing success modal should be displayed
    When I clear the listing title field
    Then the live preview title should be empty
