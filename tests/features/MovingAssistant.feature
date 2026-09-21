Feature: Moving Assistant (US15)

  @TC71 @US15 @Functional @High
  Scenario: Access rental and legal support
    Given I am on the moving assistant page
    When I click on the Legal and Rental Support tab
    Then the legal support panel should be visible
    And the rental agreement accordion should be displayed

  @TC72 @US15 @Functional @Medium
  Scenario: Download available documents
    Given I am on the moving assistant page
    When I click on the Documents tab
    Then the documents panel should be visible
    And the rental agreement download button should be present

  @TC73 @US15 @Functional @Medium
  Scenario: View verification checklists
    Given I am on the moving assistant page
    When I click on the Checklists tab
    Then the checklists panel should be visible
    And the tenant documentation checklist should be displayed
    And the property inspection checklist should be displayed

  @TC74 @US15 @Functional @Medium
  Scenario: View moving and setup guidance
    Given I am on the moving assistant page
    When I click on the Moving Guidance tab
    Then the moving guidance panel should be visible

  @TC75 @US15 @Functional @Medium
  Scenario: Track moving and setup progress
    Given I am on the moving assistant page
    When I click on the My Progress tab
    Then the progress panel should be visible
    And the overall progress percentage should be displayed
    And the progress reset button should be present
