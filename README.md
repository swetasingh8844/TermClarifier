# Term Clarifier App

A single-screen React Native (Expo) app that helps users clarify any term they type in. The app fetches definitions from the Dictionary API and displays them in a clean, user-friendly interface.

![TermClarifier](https://github.com/user-attachments/assets/9745eb3e-68ae-47ae-ac69-9bbcbad261a3)

## Features

- Input box for users to type terms
- Fetches definitions via the Dictionary API
- Displays results in a card format
- Highlights synonyms with a distinct style
- Shows loading indicator while fetching
- Provides friendly error handling
- Clean, modern UI

## Setup & Run Instructions

### Prerequisites

- Node.js (v12 or newer)
- npm or yarn
- Expo CLI

### Installation

1. Clone this repository:
```bash
git clone https://github.com/yourusername/term-clarifier.git
cd term-clarifier
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npx expo start
```

4. Open the app:
   - For iOS: Press 'i' in the terminal or scan the QR code with your camera
   - For Android: Press 'a' in the terminal or scan the QR code with the Expo Go app
   - For web: Press 'w' in the terminal

### Running Tests

```bash
npm test
# or
yarn test
```

## Time Spent & Next Steps

**Time spent:** 5 hours

- Design and planning: 1 hour
- Core implementation: 3 hours
- Testing and bug fixes: 1 hour

**Next steps with more time:**

1. Add a history feature to save previous searches
2. Implement a "word of the day" feature on the home screen
3. Add pronunciation audio using the API's audio links
4. Create custom themes and a dark mode option
5. Add animations for a more polished feel
6. Implement offline caching for previously searched terms
7. Add the ability to bookmark favorite terms
8. Improve accessibility features
9. Add more comprehensive error handling and retry mechanisms
10. Implement analytics to track user behavior and improve UX

## Tech Stack

- React Native
- Expo
- JavaScript/ES6+
- Dictionary API (https://api.dictionaryapi.dev/)
