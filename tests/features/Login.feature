@US01
Feature: Login and Registration
  As a user of PropFind
  I want to register and log in
  So that I can access personalised property features

  Background:
    Given I am on the login page

  # TC01 ─────────────────────────────────────────────────────────────────────
  @TC01 @Functional @High
  Scenario Outline: Register with valid details
    When I switch to the Register tab
    And I enter full name "<name>"
    And I enter registration username "<username>"
    And I enter registration password "<password>"
    And I enter confirm password "<password>"
    And I submit the registration form
    Then the account should be created successfully

    Examples:
      | name        | username          | password  |
      | Alice Smith | alice_smith       | Alice@123 |
      | Bob Jones   | bob_jones         | Bob@1234  |

  # TC02 ─────────────────────────────────────────────────────────────────────
  @TC02 @Validation @High
  Scenario: Register with missing mandatory fields
    When I switch to the Register tab
    And I submit the registration form without filling any fields
    Then registration validation messages should be displayed

  # TC03 ─────────────────────────────────────────────────────────────────────
  @TC03 @Negative @High
  Scenario: Register with a duplicate username
    Given a user already exists with username "existing_user" and password "Pass@123"
    When I switch to the Register tab
    And I enter full name "Duplicate User"
    And I enter registration username "existing_user"
    And I enter registration password "Pass@123"
    And I enter confirm password "Pass@123"
    And I submit the registration form
    Then a duplicate account error should be displayed

  # TC04 ─────────────────────────────────────────────────────────────────────
  @TC04 @Functional @High
  Scenario Outline: Login with valid credentials
    Given a user already exists with username "<username>" and password "<password>"
    When I enter login username "<username>"
    And I enter login password "<password>"
    And I submit the login form
    Then the user should be logged in successfully

    Examples:
      | username   | password  |
      | valid_user | Valid@123 |

  # TC05 ─────────────────────────────────────────────────────────────────────
  @TC05 @Negative @High
  Scenario Outline: Login with invalid credentials
    When I enter login username "<username>"
    And I enter login password "<password>"
    And I submit the login form
    Then a login error message should be displayed

    Examples:
      | username      | password     |
      | wrong_user    | wrongpass    |
      | valid_user    | wrongpass    |
