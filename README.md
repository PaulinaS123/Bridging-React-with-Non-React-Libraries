# Bridging-React-with-Non-React-Libraries

## Project Overview

This project demonstrates how to integrate a non-React JavaScript library (Chart.js) into a React application using React Hooks.

The application implements a dynamic poll dashboard that allows users to vote for their favorite JavaScript framework. React manages the application state, while Chart.js handles the chart visualization. The integration is accomplished through the use of `useEffect` and `useRef`, allowing React state changes to imperatively update a Chart.js bar chart in real time.

This project illustrates how React can work with third-party libraries that directly manipulate the DOM while avoiding memory leaks and rendering issues.

---

# Learning Objectives

This assignment demonstrates:

- Integration of a non-React JavaScript library with React
- Using `useEffect` as an escape hatch to interact with the DOM
- Managing third-party library instances using `useRef`
- Synchronizing React state with Chart.js visualizations
- Proper cleanup of external resources to prevent memory leaks
- Understanding React lifecycle management

---

# Technologies Used

- React
- Vite
- Chart.js
- JavaScript
- HTML/CSS

---

# Features

- Dynamic voting system
- Real-time chart updates
- React state management
- Chart.js integration
- Imperative chart updates
- Memory leak prevention through cleanup
- Interactive user interface

---

# Project Functionality

The application displays a poll asking users to vote for their favorite JavaScript framework.

Available options:

- React
- Vue
- Angular

When a user clicks a vote button:

1. React state updates.
2. `useEffect` detects the state change.
3. Chart.js data is updated.
4. The chart is redrawn automatically.

---

# Chart.js Integration

## Imperative Instantiation

When the component loads, the application checks whether a chart instance already exists.

If no chart exists:

```javascript
if (!chartInstanceRef.current)
```

A new Chart.js instance is created and stored in:

```javascript
chartInstanceRef.current
```

This ensures that only one chart instance exists at a time.

---

## State Synchronization

When vote counts change:

```javascript
chartInstanceRef.current.data.datasets[0].data =
  Object.values(votes);
```

The chart's data array is updated directly.

Then:

```javascript
chartInstanceRef.current.update();
```

is called to refresh the chart visualization.

---

## Cleanup Function

The application uses a cleanup function inside `useEffect`.

```javascript
return () => {
  if (chartInstanceRef.current) {
    chartInstanceRef.current.destroy();
    chartInstanceRef.current = null;
  }
};
```

### Why Cleanup Is Important

Chart.js attaches event listeners and canvas resources internally.

Without destroying previous chart instances:

- memory leaks can occur
- duplicate event listeners may be attached
- multiple charts may attempt to render on the same canvas
- Chart.js can throw canvas rendering errors

Destroying the chart ensures proper resource management and prevents application instability.

---

# Time Complexity

## Voting Update

Updating a vote count:

```text
O(1)
```

A single value is incremented.

---

## Chart Update

Updating the chart:

```text
O(n)
```

where:

```text
n = number of frameworks displayed
```

because Chart.js must redraw each bar.

---

# Space Complexity

```text
O(n)
```

where:

```text
n = number of chart data points
```

because the chart stores labels and dataset values.

---

# Installation

## Clone Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

---

## Navigate Into Project

```bash
cd react-chart-dashboard
```

---

## Install Dependencies

```bash
npm install
```

---

## Install Chart.js

```bash
npm install chart.js
```

---

## Start Development Server

```bash
npm run dev
```

---

# Test Cases

## Normal Test Cases

### Test Case 1

Action:
- Click "Vote React"

Expected Result:
- React vote count increases
- React bar grows taller

---

### Test Case 2

Action:
- Click "Vote Vue"

Expected Result:
- Vue vote count increases
- Vue bar updates correctly

---

### Test Case 3

Action:
- Click "Vote Angular"

Expected Result:
- Angular vote count increases
- Angular bar updates correctly

---

# Edge Test Cases

### Test Case 1

Action:
- Click React repeatedly

Expected Result:
- Chart continues updating without errors

---

### Test Case 2

Action:
- Alternate rapidly between all voting buttons

Expected Result:
- Chart remains synchronized with state

---

### Test Case 3

Action:
- Refresh page

Expected Result:
- Chart initializes correctly
- No duplicate chart rendering occurs

---

# Project Structure

```text
react-chart-dashboard/
│
├── src/
│   ├── App.jsx
│   └── main.jsx
│
├── package.json
├── README.md
└── vite.config.js
```

---

# Assignment Requirements Covered

- React state management
- useEffect integration
- useRef usage
- Chart.js instantiation
- Chart synchronization
- Chart.js update() method
- Cleanup with destroy()
- Comment explaining cleanup necessity
- Dynamic poll dashboard
- Real-time chart updates

---

# Video Demonstration Checklist

Show:

- Application startup
- Initial chart rendering
- Voting functionality
- Chart updates in real time
- Multiple voting scenarios
- Normal test cases
- Edge test cases

Explain:

- Why useEffect is needed
- Why useRef is needed
- How Chart.js differs from React
- Why cleanup prevents memory leaks
- Time complexity
- Space complexity

---

# Author

Paulina Salomon
