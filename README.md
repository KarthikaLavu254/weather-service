# Weather Service Project

A minimal Node.js (TypeScript + Express) HTTP server that provides weather forecasts using the National Weather Service API.

## Features
- `/weather` endpoint: Accepts `lat` and `lon` query parameters.
- Returns short forecast and temperature characterization (hot/cold/moderate).
- Centralized error handling (400, 502, 500).

## Quick Start

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Build the project:**
   ```sh
   npm run build
   ```
3. **Start the server:**
   ```sh
   npm start
   ```
4. **Development mode:**
   ```sh
   npm run dev
   ```

## Example Request
```
GET /weather?lat=39.7456&lon=-97.0892
```
