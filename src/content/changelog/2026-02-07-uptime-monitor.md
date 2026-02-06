---
project: uptime-monitor
date: 2026-02-07
title: "Moni8 Rebrand, Response Time Charts & PM2 Log Viewer"
summary: "Major release featuring Moni8 rebranding, visual latency history, and integrated PM2 log monitoring."
isMajor: true
changes:
  - type: feature
    title: "Rebrand to Moni8"
    description: "Complete rebrand with new identity, open-link buttons for monitored hosts, and improved LAN/internal network support"
  - type: feature
    title: "Response time history visualization"
    description: "Interactive line charts showing latency over time with color-coded status indicators, timestamp labels, and responsive SVG rendering"
  - type: feature
    title: "PM2 logs integration"
    description: "Per-monitor log viewer with pretty-printed formatting, JSON syntax highlighting, auto-scroll to newest entries, and consolidated request tracking"
  - type: feature
    title: "Self-hosting support"
    description: "Production deployment guide with PM2 ecosystem configuration and optimized logging settings for private infrastructure"
  - type: improvement
    title: "Modal-based monitor management"
    description: "Moved add-monitor form into a modal dialog and enabled editing of URLs and PM2 process names after creation"
  - type: improvement
    title: "Enhanced log readability"
    description: "Tailwind-styled badges, 200-line defaults, newest-first ordering, and merged Fastify request logs for cleaner display"
  - type: fix
    title: "Responsive chart layout"
    description: "Eliminated horizontal scrolling on mobile devices and repositioned Y-axis labels outside chart boundaries to prevent stretching"
---

- Rebranded the project to **Moni8** with refreshed documentation and one-click link opening for monitored hosts
- Added interactive response time history charts with green/red status indicators and timestamp labels
- New PM2 log viewer per monitor featuring JSON syntax highlighting, auto-scrolling, and consolidated request logs
- Released self-hosting guide with production mode optimizations that disable verbose PM2 logging
- Redesigned the "Add Monitor" interface as a modal dialog to reduce page clutter
- Improved log readability with Tailwind-styled badges, 200-line defaults, and newest-first ordering
- Enabled editing of monitor URLs and PM2 process names after creation via API patches
- Fixed responsive layout issues in latency charts and repositioned axis labels for better readability
