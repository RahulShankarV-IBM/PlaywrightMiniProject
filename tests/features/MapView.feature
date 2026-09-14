@US04
Feature: Map View
  As a user of PropFind
  I want to browse properties on an interactive map
  So that I can visually explore listings and nearby facilities

  Background:
    Given I am on the map view page

  # TC16 ─────────────────────────────────────────────────────────────────────
  @TC16 @US04 @Functional @High
  Scenario: Switch between list and map views
    When I toggle the property markers overlay
    Then the map container should be visible
    And the property list panel should be visible

  # TC17 ─────────────────────────────────────────────────────────────────────
  @TC17 @US04 @Functional @High
  Scenario: View property marker on map
    When I toggle the property markers overlay
    Then the map should display at least one property count

  # TC18 ─────────────────────────────────────────────────────────────────────
  @TC18 @US04 @Functional @High
  Scenario: Open property details from map list panel
    When I toggle the property markers overlay
    Then the property list panel should contain at least one listing

  # TC19 ─────────────────────────────────────────────────────────────────────
  @TC19 @US04 @Functional @High
  Scenario Outline: Apply search and filter on map view
    When I enter "<location>" in the map search field
    And I select "<purpose>" from the map purpose filter
    And I select "<bhk>" from the map BHK filter
    Then the map count indicator should be visible

    Examples:
      | location  | purpose | bhk   |
      | Mumbai    | Rent    | 2 BHK |
      | Delhi     | Buy     | 3 BHK |

  # TC20 ─────────────────────────────────────────────────────────────────────
  @TC20 @US04 @Functional @Medium
  Scenario: View nearby facilities on map
    When I click the schools overlay button
    Then the map container should be visible
    When I click the hospitals overlay button
    Then the map container should be visible
    When I click the metro overlay button
    Then the map container should be visible
