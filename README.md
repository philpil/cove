# Castaway Cove

An original, cartoony 3D island escape game built with Three.js. No build step or account required. All models are procedural, with no external model or texture dependencies. Three.js 0.180.0 is vendored for reliable loading.

## Play locally

Run `npm start` (requires Python 3), then open http://localhost:8080. Or serve `dist/` with any static HTTP server. Do not open index.html as a file URL; ES modules require HTTP.

## Controls

- WASD / arrow keys: move relative to the camera.
- Mobile: drag the bottom-left joystick.
- Stand close to a palm: automatically chop it for 4 wood and 1 fibre.
- Walk over plants and coconuts to collect them. Pickups regrow after 55 active seconds.
- E / context button: build near the orange raft flag or rest near the campfire.
- F / Eat button: eat a coconut for 35 energy and 16 health.
- Pause / Escape: pause. Backgrounding also pauses the game.

Build the foundation (12 wood, 4 fibre), mast (10 wood, 4 fibre), and sail (6 wood, 8 fibre), then launch before the 8-minute storm. Dodge three wandering crabs. Rest replenishes health and energy with a 12-second cooldown. Standing still slowly restores energy; low energy slows movement and chopping.

## Saving

LocalStorage key `castaway-cove-v1` saves every three active seconds, after major actions, and when the page is hidden. It preserves position, resources, harvested trees, pickup cooldowns, raft stage, health, energy, elapsed time, and victory. Saves stay in this browser on this device; private browsing or clearing website data may remove them. No time passes while away. Use “Start a fresh adventure” to reset. Invalid save values are validated on load.

## Checks

`npm test` verifies crafting/resource accounting and save recovery. `node --check dist/game.js` checks game syntax. Live browser rendering and physical mobile-device testing are still recommended.

## Files

- `dist/game.js`: procedural scene, controls, gameplay, interface, persistence.
- `dist/rules.js`: crafting rules and save validation.
- `dist/style.css`: responsive HUD and start/pause/help interfaces.
- `dist/vendor/`: Three.js distribution and its MIT licence.

All character and environment designs are original. Three.js is copyright its contributors, distributed under the MIT licence in `dist/vendor/LICENSE.three`.
