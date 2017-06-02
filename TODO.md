# TODO

This application was developed as a simple demo application according to the goals outlined in the README.md. The items
listed here fall into two categories: improvements that could be made, and enhancements that expand the scope beyond the
original goal as stated in the README.md.

These TODOs will only be addressed (if ever) once the original goals have been met.

Given that this was my first application using Ionic v2+ (v3 in this case) and Firebase, I plan on keeping this application
around to use as a model, so some expansion / improvements may occur after the original purpose for this application is 
accomplished.

## Improvements

These are items in the existing code base that could be improved

- Team Member Processing (current processing does several find operations)
- Unit Tests
  - Some items are not tested due to limited Firebase experience
  - Some tests seem like they could be more clean

## Enhancements

These are items beyond the original goals outlined in the README.md.

- Validations (the editors basically have none, but I never specified any rules either), I would like to do the following given that this is a demo:
  - Use a template driven form with messages in the HTML for one editor
  - Use a reactive (FormBuilder) form with messages in the code for the other editor
- Full CRUD
  - Add / Remove Teams
  - Add / Remove People
- More Authentication Strategies
- End to End Testing (need to figure out)
