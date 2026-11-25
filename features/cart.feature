Feature: Choose a quantity before adding to the cart
  As a customer
  I want to choose a quantity before adding a product to the cart
  So that I can buy more than one item at once

  Background:
    Given the customer is on the Toolshop site and is not signed in
    And the cart is empty
    And the customer is on the Pliers product page

  Scenario: The customer adds one item to the cart
    When the customer sets the quantity to 1
    And the customer adds the product to the cart
    Then a message says the product was added
    And the cart shows 1 Pliers
    And the line total is the price of one Pliers

  Scenario: The customer adds three items to the cart
    When the customer sets the quantity to 3
    And the customer adds the product to the cart
    Then a message says the product was added
    And the cart shows 3 Pliers
    And the line total is 3 times the price of one Pliers

  Scenario: The customer cannot add a quantity of 0
    When the customer sets the quantity to 0
    And the customer adds the product to the cart
    Then the product is not added to the cart
    And the cart stays empty
