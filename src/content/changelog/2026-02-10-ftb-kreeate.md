---
project: ftb-kreeate
date: "2026-02-10"
title: "Smarter Issue Creation with Pinned Repos & Auto-Priorities"
summary: "New workflow enhancements including repository pinning, intelligent priority suggestions, and improved reliability with model fallbacks."
changes:
  - type: feature
    title: Pinned repositories
    description: Save frequently used repositories with persisted preferences for quick access
  - type: feature
    title: Issue type presets
    description: Pre-configured templates to accelerate the issue generation workflow
  - type: feature
    title: Auto-suggested priority
    description: AI recommends priority levels immediately after content generation
  - type: feature
    title: Recent issues carousel
    description: Browse and access recently created issues directly below the submission form
  - type: feature
    title: Model fallback support
    description: Automatic failover to DeepSeek V3.2 ensures generation reliability during outages
  - type: improvement
    title: Persistent repository selection
    description: Selected repository now saves locally and persists between browser sessions
  - type: improvement
    title: Compact card layouts
    description: Optimized spacing for issue type cards while maintaining full-width display
  - type: improvement
    title: API rate limiting
    description: Added rate limiting to generate and submit endpoints for improved stability
  - type: improvement
    title: Submission analytics
    description: Track issue submission events and content logs for usage insights
  - type: docs
    title: Updated documentation
    description: Rewrote README with comprehensive project overview and setup instructions
---

- **Pinned repositories** – Save frequently used repos for quick access; your selections persist across sessions
- **Smart priority suggestions** – AI now auto-suggests priority levels immediately after generating issue content  
- **Issue type presets** – Jump-start creation with pre-configured templates for common issue types
- **Recent issues carousel** – View and jump back to recently submitted issues right below the creation form
- **Reliable generation** – Added automatic model fallback to DeepSeek V3.2 if primary AI is unavailable
- **Persistent repo selection** – Your last selected repository is now remembered locally between visits
- **Cleaner layouts** – Issue type cards and recent issues display use space more efficiently
