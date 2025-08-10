# To-Do List – Vanilla JavaScript

A clean, responsive task manager built with pure JavaScript, HTML and CSS — no frameworks, no dependencies.  
Features inline editing, undo delete, smart prompts and a live completion tracker, all in a single lightweight app.

Designed as a showcase of front-end fundamentals:

- **DOM manipulation** for dynamic task creation and updates
- **LocalStorage persistence** to keep tasks between sessions
- **Accessible controls** with ARIA labels and keyboard support
- **Polished UX** including animated edit highlights and contextual prompts

## Features

- Add tasks via button click or Enter key
- Edit tasks inline with soft Escape-to-cancel logic
- Persist tasks in localStorage using object arrays
- Toggle completion state visually with click
- Clear all tasks with one button
- Undo the last deletion within eight seconds
- Dynamic placeholder text (rotates prompts)
- Real-time completion banner
- Reminder banner appears after inactivity

## Why This Build Matters

This app was structured to emphasize JavaScript fundamentals and DOM-level logic, rather than relying on frameworks or plugins.

All interactions — task creation, edit, delete, undo — are powered by vanilla JS using `addEventListener`, `createElement` and DOM node replacement.

The state (`tasks[]`) is stored in memory and persisted with `localStorage`, demonstrating data flow without external libraries.

## Logic Highlights

- **Inline Editing**: Edits are done in-place by replacing spans with inputs and restoring DOM nodes on Enter or Escape.
- **State Sync**: Edits and toggles update the in-memory task array and resync with `localStorage`.
- **Keyboard UX**: Keyboard-first behavior includes Enter-to-submit and Escape-to-cancel with visual feedback.
- **Undo Delete**: A temporary undo system holds the last deleted task in memory and restores it on button press.

## How to Test

- Type a task and press Enter or click Add.
- Click a task to edit. Press Enter to save or Escape to cancel.
- Mark tasks done by clicking.
- Try deleting and undoing quickly.
- Reload the page — tasks are saved in localStorage.

## Recent Updates (Refactor – August 2025)

- **Prevented accidental completion toggle** when clicking task text to edit
- **Blocked empty renames** – if user clears a task name, the original text is restored
- **Kept completion banner in sync** when toggling tasks
- General code cleanup:
  - Standardized event handling
  - Reduced duplicate logic for add button
  - Improved undo restore behavior with array reinsertion
- All changes merged into `main` via PR for clean commit history
