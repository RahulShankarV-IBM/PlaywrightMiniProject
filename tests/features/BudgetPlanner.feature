@US12
Feature: Budget Planner
  As a user of PropFind
  I want to calculate my total living costs and affordability
  So that I can choose a property that fits my budget

  Background:
    Given I am on the budget planner page

  # TC56 ──────────────────────────────────────────────────────────────────────
  @TC56 @US12 @Functional @High
  Scenario: Calculate total living cost
    When I enter a monthly rent of 25000
    And I enter maintenance charges of 1000
    And I enter electricity charges of 1500
    And I enter internet charges of 800
    And I click the calculate budget button
    Then the results panel should display the total monthly expenses

  # TC57 ──────────────────────────────────────────────────────────────────────
  @TC57 @US12 @Functional @High
  Scenario: Calculate affordability
    When I enter a monthly salary of 80000
    And I enter a monthly rent of 20000
    And I click the calculate budget button
    Then the results panel should display rent affordability information

  # TC58 ──────────────────────────────────────────────────────────────────────
  @TC58 @US12 @Functional @High
  Scenario: Calculate affordable rent range and savings
    When I enter a monthly salary of 60000
    And I enter a monthly rent of 15000
    And I enter food and grocery expenses of 8000
    And I enter transport expenses of 3000
    And I click the calculate budget button
    Then the results panel should display estimated monthly savings
    And the results panel should display the recommended affordable rent

  # TC59 ──────────────────────────────────────────────────────────────────────
  @TC59 @US12 @Negative @High
  Scenario: Validate invalid financial values
    When I enter an invalid non-numeric value in the salary field
    And I click the calculate budget button
    Then the results panel should display a validation error message

  # TC60 ──────────────────────────────────────────────────────────────────────
  @TC60 @US12 @Functional @Medium
  Scenario: View cost summary on budget planner page
    When I enter a monthly salary of 50000
    And I enter a monthly rent of 12000
    And I click the calculate budget button
    Then the results panel should display the monthly cost breakdown summary
