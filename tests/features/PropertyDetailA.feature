Feature: Property Detail Page (US05 – Property Information & US06 – Nearby Facilities)

  Background:
    Given I am logged in and on the property detail page

  # ---------------------------------------------------------------------------
  # US05 – View Property Details
  # ---------------------------------------------------------------------------

  @TC21 @US05 @Functional @High
  Scenario: TC21 – Open property details page
    When I open a property listing
    Then the property information should be displayed

  @TC22 @US05 @Functional @High
  Scenario: TC22 – Verify price, location, area and BHK
    When I open a property listing
    Then the correct price, location, area and BHK are displayed

  @TC23 @US05 @Functional @Medium
  Scenario: TC23 – View property images
    When I open a property listing
    Then the main property image should load correctly

  @TC24 @US05 @Functional @Medium
  Scenario: TC24 – View virtual tour
    When I open a property listing
    Then the virtual tour section should be visible

  @TC25 @US05 @Functional @Medium
  Scenario: TC25 – View owner or agent information
    When I open a property listing
    Then the owner or agent details should be displayed

  # ---------------------------------------------------------------------------
  # US06 – Nearby Facilities & Locality Insights
  # ---------------------------------------------------------------------------

  @TC26 @US06 @Functional @High
  Scenario: TC26 – View nearby schools and hospitals
    When I open a property listing
    Then the nearby schools and hospitals section should be displayed

  @TC27 @US06 @Functional @High
  Scenario: TC27 – View pharmacies, police and fire stations
    When I open a property listing
    Then the nearby pharmacies, police and fire station information should be displayed

  @TC28 @US06 @Functional @Medium
  Scenario: TC28 – View supermarkets, ATMs and transport
    When I open a property listing
    Then the nearby supermarkets, ATMs and transport options should be displayed

  @TC29 @US06 @Functional @Medium
  Scenario: TC29 – View locality insights
    When I open a property listing
    Then the locality insights section should be displayed with available safety, pollution, traffic and other information

  @TC30 @US06 @Functional @High
  Scenario: TC30 – Access emergency support
    When I open a property listing
    Then the emergency support information should be accessible
