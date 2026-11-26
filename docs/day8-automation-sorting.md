# Day 8: Automation sorting table

My 12 Toolshop test cases from Week 1. Each one goes through two gates.

- **Gate one:** can we automate it reliably? Stable data, stable UI, no timing guesses.
- **Gate two:** is it worth it? How often it runs, what it costs by hand, how stable the page is, what it costs to keep.

| ID | Test case | Gate one: reliable? | Gate two: worth it? | Decision | Reason |
|---|---|---|---|---|---|
| CJ-10 | TS-101 Search "pliers" shows all matching products | Yes | Yes | **Automate now** | Search is used on every visit and the check is simple: every name contains "pliers". It is already automated from Day 7. |
| CJ-11 | TS-101 Search is not case sensitive | Yes | Yes | **Automate now** | It reuses the same search steps with one more input, so it costs almost nothing to add and keep. |
| CJ-12 | TS-101 Search with no matches | Yes | Yes | **Automate now** | "xyz123" will never match a product, so the data never changes and the result is always the same. |
| CJ-19 | TS-103 Price High to Low shows most expensive first | Yes | Yes | **Automate now** | Checking the order of many prices by hand is slow and easy to get wrong. It is high risk and already found a bug. |
| CJ-17 | TS-104 Quantity 1 is added to the cart | Yes | Yes | **Automate now** | This is the main buying path. Each test starts in a fresh browser, so the cart is always empty. |
| CJ-18 | TS-104 Quantity 3 adds 3 to the cart | Yes | Yes | **Automate now** | It checks the acceptance criteria directly and found the line total bug. It shares steps with CJ-17. |
| CJ-7 | TS-104 Quantity 99 (top boundary) | Not yet | Yes | **Later** | The maximum of 99 is my guess. The story only says "sensible". I will automate it once the product owner confirms the limit. |
| CJ-9 | TS-104 Quantity 100 (above boundary) | Not yet | Yes | **Later** | Same unconfirmed limit as CJ-7. Once confirmed, an API test checks it faster than the UI. |
| CJ-8 | TS-104 Quantity 0 is rejected | Not yet | Yes | **Later** | The expected result is unclear. The box resets to 1, then an error shows but the item is still added. The rule must be agreed first. |
| CJ-13 | TS-102 Category only shows that category | Not yet | Yes | **Later** | It was blocked on Day 3 because "Hand Tools" has no checkbox. I need to rewrite the step first. I also need a clear sign that the filter has loaded. |
| CJ-14 | TS-102 Search plus category | Not yet | Yes | **Later** | It builds on CJ-13, so it waits for the same fixes. |
| CJ-15 | TS-102 Search and category with no overlap | Yes | No | **Never** | CJ-12 already covers "0 results" and CJ-13 already covers other categories being hidden. It would add upkeep but find nothing new. |
