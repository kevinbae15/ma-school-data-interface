# Paperless Parts Coding Challenge: Front-End

This is an open-ended exercise aimed at assessing your technical skills with JavaScript frameworks (or your ability to learn new tools!).

Your objective is to build a browser user interface that downloads a data package and renders it for a user. You may use the JavaScript framework of your choice, but we prefer solutions in [React](https://reactjs.org/). The solution will be evaluated based on user experience (UX), technical implementation, and completeness of the solution.

Aim to spend no more than 3-5 hours on your solution. We know that's not enough time for perfection, but we're interested in seeing how you prioritize.

## Project Objective

This repository contains data files derived from the US Department of Education [College Scorecard](https://collegescorecard.ed.gov/data/) public domain dataset. These files contain a list of colleges and universities in the state of Massachusetts, along with some basic information about these schools, and a list of a academic programs offered by each.

Create a browser-based user interface that displays this dataset in a convenient way for a user.

Consider implementing any of the following features that makes the interface pleasant to use:

- A list/index view that shows many schools
- Pagination or infinite scrolling
- Sorting
- A detail view that shows all information about a particular school

### Data Description

You will be working with three data files:

- `ma_schools.json` contains a list of schools in Massachusetts, where each school is defined by a dictionary.
- `fields.csv` contains descriptions of each key in the school dictionaries.
- `programs.json` contains a dictionary describing the abbreviations of the academic programs listed for each school in the `'PROGRAMS'` key.

### Extending Your Solution

Too easy? You can extend your solution down the stack to demonstrate your technical breadth.

Consider adding any of these features:

- Front-End: Sort suppliers by proximity to the user. Come up with a solution for capturing the user's location and comparing it to each supplier's location.
- Back-End: Rather than downloading static data documents, create a web service that provides the data. Use a relational database to store the search results and create queries to produce JSON serialization.
- DevOps: Deploy your solution on the web or submit a containerized solution that we can run easily.

## Submission Guidelines

### Submitting to Paperless Parts

You may submit a solution using any convenient method, or as discussed in advance. We encourage you to use git for version control.

### Documentation

Please provide some documentation (for example, in a README text or Markdown file) that, at a minimum, provides instructions for running your application. Include any additional information you think we would need to review your solution. If there are features you would complete or add given more time, tell us about those, too!
