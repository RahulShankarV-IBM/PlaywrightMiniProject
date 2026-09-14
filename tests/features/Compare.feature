@US08
Feature: Compare Properties
  As a user of PropFind
  I want to compare properties side by side
  So that I can make an informed decision about which property suits me best

  Background:
    Given I am on the compare page with properties in the compare list

  # TC36 ──────────────────────────────────────────────────────────────────────
  @TC36 @US08 @Functional @High
  Scenario: Compare three properties
    Given the compare list contains three properties
    Then three property columns should be displayed side by side

  # TC37 ──────────────────────────────────────────────────────────────────────
  @TC37 @US08 @Functional @High
  Scenario: Compare property details
    Given the compare list contains two properties
    Then the comparison table should display price, BHK, location and amenities for each property

  # TC38 ──────────────────────────────────────────────────────────────────────
  @TC38 @US08 @Functional @Medium
  Scenario: Compare nearby and locality information
    Given the compare list contains two properties
    Then the comparison table should display nearby school, hospital and metro station information

  # TC39 ──────────────────────────────────────────────────────────────────────
  @TC39 @US08 @Negative @High
  Scenario: Prevent duplicate property in compare list
    Given the compare list contains one property with id 1
    When I attempt to add the same property with id 1 to the compare list again
    Then the compare list should still contain only one entry for that property

  # TC40 ──────────────────────────────────────────────────────────────────────
  @TC40 @US08 @Functional @Medium
  Scenario: Remove a property from comparison
    Given the compare list contains two properties
    When I remove the first property from the comparison
    Then the removed property column should no longer be displayed
