---
project: uptime-monitor
date: 2026-01-31
title: Initial Release with Real-time Monitoring and PM2 Integration
isMajor: true
changes:
  - type: feature
    title: Response time visualization
    description: Added interactive line charts showing historical response times with color-coded latency indicators and timestamp labels
  - type: feature
    title: PM2 log integration
    description: Stream and view PM2 process logs directly in the UI with pretty formatting, JSON syntax highlighting, and auto-scroll
  - type: improvement
    title: Chart responsiveness
    description: Made latency charts fully responsive with rotated y-axis labels and proper positioning to prevent horizontal scrolling
  - type: improvement
    title: Log viewing experience
    description: Newest-first ordering, merged request logs per ID, and shadcn-style badges for better readability
  - type: feature
    title: Modal-based monitor creation
    description: Moved add monitor form into a modal dialog for cleaner navigation
  - type: fix
    title: Monitor configuration
    description: Allow patching monitor URL and PM2 name after initial creation
---

- Launched uptime monitoring dashboard with Kuma-style statistics and filled response time charts
- Added interactive response time visualization with green/red latency indicators and timestamp labels on the x-axis
- Integrated PM2 log streaming directly into monitor detail views with JSON highlighting, auto-scroll, and configurable line limits
- Redesigned the add monitor workflow with a modal interface to reduce page clutter
- Improved log readability with shadcn-style badges, merged request logs by ID, and newest-first ordering
- Made charts fully responsive with proper y-axis labeling and eliminated horizontal scrolling issues
