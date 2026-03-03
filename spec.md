# Specification

## Summary
**Goal:** Build AddiScan, a food additive and preservative scanner app where users paste product ingredient text to identify and learn about additives.

**Planned changes:**
- Create a backend database of 80+ food additives/preservatives with fields: name, E-number, category, description, health effects, and common products
- Implement a backend ingredient text parsing function that matches pasted ingredient lists against the database (case-insensitive, supports E-numbers and common names)
- Build a Scan page with a large textarea for pasting/typing ingredient text, an "Analyze Ingredients" button, loading/error states, and results display
- Display results as additive cards showing name, E-number, color-coded category badge, description, and health notes, plus a summary banner with total count found
- Add an Additives Encyclopedia page listing all additives with search by name/E-number and filter by category, with a detail view showing all fields
- Apply a green and white health-and-wellness theme with green/amber/red concern-level color coding on cards, responsive card-based layout, and clean sans-serif typography
- Display the custom app logo (magnifying glass over leaf) in the navbar with navigation between Scan and Encyclopedia pages

**User-visible outcome:** Users can paste ingredient text from a product label to instantly see which additives and preservatives are present, with health notes and category info, and can also browse or search a full encyclopedia of known additives.
