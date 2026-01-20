# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Story Hacker is a puzzle-deduction game with two modes:
- **Story Mode**: Narrative puzzles where players deduce PIN codes from story clues
- **Deduction Mode**: Logic puzzles with progressive hint reveals on wrong guesses

Built with Next.js 14 (App Router), React 18, TypeScript, and Tailwind CSS.

## Commands

```bash
npm run dev     # Start development server (localhost:3000)
npm run build   # Build for production
npm run lint    # Run ESLint
npm start       # Start production server
```

## Architecture

### Directory Structure

- `app/` - Next.js App Router pages with dynamic `[episodeId]` routes
- `components/ui/` - Reusable UI: PinDisplay, InputArea, HeartsDisplay
- `components/screens/` - Full game screens: StoryGamePlay, DeductionGamePlay
- `components/illustrations/` - Episode-specific illustration components
- `hooks/` - Custom hooks: useGameState, useTypingEffect, useLocalStorage
- `lib/` - Types (`types.ts`) and utilities (`utils.ts`)
- `data/` - Episode content: `storyEpisodes.ts`, `deductionEpisodes.ts`

### Key Patterns

**Game State**: Two separate hooks in `hooks/useGameState.ts`:
- `useStoryGameState()` - Manages PIN input, turns, hints, stage progression
- `useDeductionGameState()` - Similar but with progressive clue reveals

**Data Structure**: Episodes contain multiple stages, each with:
- Story: story text, clue, hint, answers[], lockType (pin4|pin6), maxTurns
- Deduction: situation, clues[], answer, maxTurns

**Client Components**: All pages use `'use client'` directive - pure client-side rendering.

**LocalStorage**: Progress persisted via `useLocalStorage` hook (SSR-safe with initialization guard).

**Illustrations**: Components keyed by `episodeId-stageId` for dynamic rendering.

### Styling

Tailwind CSS with custom hacker theme colors: `hacker-emerald`, `hacker-rose`, `hacker-cyan`, `hacker-gold`. Custom animations (glow, scanline, glitch) defined in `tailwind.config.ts` and `globals.css`. Mobile-first with max-width 448px constraint.

## Testing

E2E 테스트는 Playwright MCP agents를 사용합니다:
- **playwright-test-planner**: 테스트 계획 작성
- **playwright-test-generator**: 테스트 코드 생성
- **playwright-test-healer**: 실패한 테스트 디버깅 및 수정

테스트 파일은 `specs/` 디렉토리에 저장됩니다.

## Adding Content

New episodes: Add to `data/storyEpisodes.ts` or `data/deductionEpisodes.ts` following existing patterns. Episode illustrations go in `components/illustrations/` with matching episodeId-stageId keys.