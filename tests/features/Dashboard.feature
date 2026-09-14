@US07 @US11
Feature: User Dashboard
  As a registered user of PropFind
  I want to manage my saved favorites, recently viewed properties, and preferences
  So that I can have a personalised property search experience

  Background:
    Given I am logged in and on the dashboard page

  # TC31 ─────────────────────────────────────────────────────────────────────
  @TC31 @US07 @Functional @High
  Scenario: Save a property as favorite
    When I have a property added to favorites
    And I navigate to the Saved Properties section
    Then the property should be listed in favorites

  # TC32 ─────────────────────────────────────────────────────────────────────
  @TC32 @US07 @Functional @High
  Scenario: Remove a favorite property
    Given I have a property in favorites with id 1
    When I navigate to the Saved Properties section
    And I remove the property with id 1 from favorites
    Then the property with id 1 should not be listed in favorites

  # TC33 ─────────────────────────────────────────────────────────────────────
  @TC33 @US07 @Functional @Medium
  Scenario: View recently viewed properties
    Given I have recently viewed properties
    When I navigate to the Recently Viewed section
    Then the recently viewed properties should be displayed

  # TC34 ─────────────────────────────────────────────────────────────────────
  @TC34 @US07 @Functional @Medium
  Scenario: Verify recent-property order
    Given I have recently viewed properties in sequence
    When I navigate to the Recently Viewed section
    Then the most recently viewed property should appear first

  # TC35 ─────────────────────────────────────────────────────────────────────
  @TC35 @US07 @Functional @High
  Scenario: Verify persistence after logout/login
    Given I have saved properties and recently viewed properties
    When I re-authenticate into the dashboard
    Then my favorites and recently viewed properties should remain available

  # TC51 ─────────────────────────────────────────────────────────────────────
  @TC51 @US11 @Functional @High
  Scenario: Save property preferences
    When I navigate to the Preferences section
    And I select preferred city "Bangalore"
    And I select preferred purpose "Rent"
    And I select preferred BHK "2"
    And I enter max budget "40000"
    And I click save preferences
    Then the preferences saved confirmation should be displayed

  # TC52 ─────────────────────────────────────────────────────────────────────
  @TC52 @US11 @Functional @Medium
  Scenario: Enter natural-language requirements
    When I navigate to the Preferences section
    And I enter natural language preference "Looking for a 2BHK furnished apartment near metro"
    And I click save preferences
    Then the preferences saved confirmation should be displayed

  # TC53 ─────────────────────────────────────────────────────────────────────
  @TC53 @US11 @Functional @High
  Scenario: View personalized recommendations
    When I navigate to the Recommendations section
    Then personalized property recommendations should be displayed

  # TC54 ─────────────────────────────────────────────────────────────────────
  @TC54 @US11 @Functional @High
  Scenario: Update preferences
    When I navigate to the Preferences section
    And I select preferred city "Mumbai"
    And I select preferred BHK "3"
    And I click save preferences
    Then the preferences saved confirmation should be displayed
    And the preference recommendations should reflect the updated preferences

  # TC55 ─────────────────────────────────────────────────────────────────────
  @TC55 @US11 @Functional @High
  Scenario: Enable/disable property alerts
    When I navigate to the Preferences section
    And I toggle property alerts
    Then the alert status should be updated
