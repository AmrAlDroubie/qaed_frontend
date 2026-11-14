# Frontend Development Instructions

## Stack

- Vue 3 with Composition API
- TypeScript
- Tailwind CSS
- Vue Router
- Pinia for shared application state
- Tanstack query to handle request to APIs

## Architecture

- Use Vue Single File Components (.vue).
- Use script setup.
- Separate pages, layouts, and reusable components.
- Reuse existing components before creating new ones.
- Extract repeated patterns into reusable components.

## Figma Implementation

- Use the Figma MCP server to retrieve design context.
- Follow Figma dimensions, typography, colors, and spacing.
- Use real assets and icons instead of approximations.
- Implement responsive layouts.
- When only desktop designs are provided, adapt mobile and tablet layouts using the existing visual style.
- Prefer flexbox and grid over absolute positioning.
- Do not generate React components.
- Avoid hardcoded styles when design tokens exist.

## Code Quality

- Keep components small and maintainable.
- Use props and emits for component communication.
- Do not duplicate component implementations.
- Do not change unrelated files.
- Do not implement backend logic unless requested.
- Try as possiable to avoid svg icons and use lucide icons
- Run the production build and TypeScript checks after code changes.
- Run tests only when explicitly requested.
- When an interaction, popup, or state has no supplied design, Don't use and don't assume existing components and visual conventions to implement it.

## Project aspects

- This Qaed platform system there is three roles in this platform (Admin - Supervisor - Participant)
- The admin only can create the users
- A supervisor can hold multiple supervisor subroles. Preserve all assigned subroles when creating or editing an account.
- there is pages shared between the three section i will tell you that with every prompt because that can effect frontend structure and components structure

## Local Development

- Use local mock data until API integration is requested.
- Mock-data changes may reset on browser refresh. Persistence is not required.
