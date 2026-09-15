@US02 @US03
Feature: Search Results – Search and Filter Properties
  As a property seeker
  I want to search and filter properties on the Search Results page
  So that I can find properties that match my exact requirements

  Background:
    Given I am on the Search Results page

  # ── US02 – Smart Property Search ─────────────────────────────────────────

  # TC06
  @TC06 @US02 @Functional @High
  Scenario: TC06 – Search using city or locality
    When I type "Bangalore" in the location search field
    And I click the Search button
    Then properties are displayed in the results grid

  # TC07
  @TC07 @US02 @Functional @High
  Scenario Outline: TC07 – Search using Buy / Rent / Lease purpose
    When I select "<purpose>" from the purpose dropdown
    And I click the Search button
    Then properties are displayed in the results grid

    Examples:
      | purpose |
      | Rent    |
      | Buy     |
      | Lease   |

  # TC08
  @TC08 @US02 @Functional @High
  Scenario: TC08 – Apply a budget range filter
    When I enter "10000" in the minimum budget field
    And I enter "30000" in the maximum budget field
    And I click the Apply Filters button
    Then all displayed properties have a price between 10000 and 30000

  # TC09
  @TC09 @US02 @Negative @High
  Scenario: TC09 – Search with no matching results
    When I type "ZZZNOMATCH999" in the location search field
    And I click the Search button
    Then the no-results message is displayed
    And the results grid is empty

  # TC10
  @TC10 @US02 @Functional @Medium
  Scenario: TC10 – Sort search results by price ascending then descending
    When I select sort option "price-asc"
    Then the first result price is less than or equal to the second result price
    When I select sort option "price-desc"
    Then the first result price is greater than or equal to the second result price

  # ── US03 – Advanced Property Filters ────────────────────────────────────

  # TC11
  @TC11 @US03 @Functional @High
  Scenario: TC11 – Filter by property type Apartment
    When I check the "Apartment" property type checkbox
    And I click the Apply Filters button
    Then properties are displayed in the results grid

  # TC12
  @TC12 @US03 @Functional @High
  Scenario: TC12 – Filter by 2 BHK
    When I click the "2" BHK filter button
    Then the "2" BHK button is marked active
    And properties are displayed in the results grid

  # TC13
  @TC13 @US03 @Functional @High
  Scenario: TC13 – Filter by furnishing status Fully Furnished
    When I select the "Fully Furnished" furnishing option
    And I click the Apply Filters button
    Then properties are displayed in the results grid

  # TC14
  @TC14 @US03 @Functional @High
  Scenario: TC14 – Apply multiple filters simultaneously
    When I click the "3" BHK filter button
    And I check the "Parking" amenity checkbox
    And I select "Rent" from the purpose dropdown
    And I click the Apply Filters button
    Then the result count is zero or more

  # TC15
  @TC15 @US03 @Functional @High
  Scenario: TC15 – Clear all filters restores full property list
    Given I note the current result count as the baseline
    When I click the "1" BHK filter button
    And I click the Apply Filters button
    And I click the Clear All button
    Then the result count matches the baseline
    And the "1" BHK button is not active
    And the location field is empty
