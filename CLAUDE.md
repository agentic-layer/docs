# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Antora documentation site generator that aggregates and publishes documentation from multiple Git repositories into a unified documentation website for the Agentic Layer ecosystem. It combines documentation from home docs, architecture docs, agent runtime operator, and observability dashboard into a single searchable site deployed to GitHub Pages.

## Common Commands

### Building Documentation
```bash
# Install Antora globally (required)
npm install -g @antora/cli @antora/site-generator

# Build the documentation site
npx antora antora-playbook.yml
# or if installed globally:
antora antora-playbook.yml
```

### Development
```bash
# Clear cache if encountering issues
rm -rf .cache/antora

# Check generated output
ls build/site/
```

## Architecture

### Core Configuration
- **`antora-playbook.yml`**: Main configuration file defining site settings, content sources, UI bundle, and output directory
- **Content Sources**: Documentation is pulled from multiple GitHub repositories:
  - `agentic-layer/documentation` (home and architecture docs)
  - `agentic-layer/agent-runtime-operator`
  - `agentic-layer/observability-dashboard`

### UI Customization
- **`supplemental-ui/`**: Contains Handlebars templates that override the default Antora UI
- **`supplemental-ui/partials/header-content.hbs`**: Custom header with dropdown navigation to source Git repositories
- **UI Bundle**: Uses default Antora UI from GitLab with custom supplemental files

### Build Process
- **Input**: AsciiDoc files from multiple Git repositories
- **Processing**: Antora aggregates content based on `antora.yml` component descriptors in source repos
- **Output**: Static site generated to `build/site/`
- **Cache**: `.cache/antora/` directory for performance optimization

### Deployment
- **GitHub Actions**: `.github/workflows/deploy-docs.yml` handles automated deployment
- **Triggers**: Pushes to main branch, manual dispatch, daily cron schedule
- **Target**: GitHub Pages at `docs.agentic-layer.ai`

## Adding New Documentation Sources

To add a new repository to the documentation site:

1. Ensure the source repository has proper Antora structure:
   ```
   docs/
   ├── antora.yml
   └── modules/ROOT/
       ├── nav.adoc
       └── pages/
           └── index.adoc
   ```

2. Add entry to `content.sources` array in `antora-playbook.yml`:
   ```yaml
   - url: https://github.com/agentic-layer/new-repo.git
     branches: [main]
     start_path: docs
   ```

3. Test build locally before deploying

## File Structure Notes
- No package.json or traditional Node.js project structure
- No linting or testing commands - this is a documentation aggregation project
- The project relies on Antora's built-in validation and processing