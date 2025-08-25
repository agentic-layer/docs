# Antora Playbook

> **🔒 Private Repository** - Documentation management. Private due to secret Tokens used in Github workflows.

A documentation site generator configuration that aggregates and publishes documentation from multiple Git repositories into a unified, searchable documentation website for the Agentic Layer ecosystem.

----

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Publishing](#publishing)
- [Contributing](#contributing)

----

## Prerequisites

| Component | Version/Notes |
|-----------|---------------|
| Node.js | >= 18.x |
| npm | Comes with Node.js |
| Antora | Latest stable version |
| Git | For accessing remote documentation sources |
| Internet connection | For fetching documentation from GitHub repositories |

## Getting Started

### Installation

Install all required dependencies:

```bash
npm install
```

### Starting the Documentation Build

Generate the documentation site:

```bash
npx antora antora-playbook.yml
```

After successful completion, the generated documentation site will be available in the `build/site` directory.

Troubleshooting tips:
- Ensure all referenced Git repositories and branches are accessible.
- Clear the cache if you encounter issues: `rm -rf .cache/antora`

## Configuration

The project is configured through the `antora-playbook.yml` file, which defines:

### Site Configuration
- **Title**: Agentic Layer Documentation
- **URL**: https://agentic-layer.github.io/antora-playbook/
- **Start Page**: home::index.adoc

### Content Sources
Source repositories are defined in `content.sources` array of `antora-playbook.yml`.

### UI Configuration
- Uses the default Antora UI theme from GitLab
- Custom UI overrides are stored in `supplemental-ui/` directory
- Navigation includes links to source Git repositories

### Output Configuration
- Generated site output: `build/site/`
- Cache directory: `.cache/antora/` (for performance optimization)

## Publishing
The playbook is set up for GitHub Pages deployment defined in `./.github/workflows/deploy-docs.yml`.

## Contributing

### Adding New GitHub Repositories

To add a new GitHub repository as a documentation source to the antora-playbook:

1. **Repository Requirements**
   - Set up the following documentation structure in your new source repository `root`: 
      ```
      docs
      ├── antora.yml
      └── modules
          └── ROOT
              ├── nav.adoc
              ├── pages
              │   └── index.adoc
              └── partials
                  ├── explanation.adoc
                  ├── how-to-guides.adoc
                  ├── reference.adoc
                  └── tutorials.adoc
      
      ```   

   - `antora.yml` describes the component. Example:
     ```yaml
      name: <COMPONENT_NAME>
      title: <COMPONENT_TITLE>
      version: main # or your versioning scheme
      start_page: ROOT:index.adoc
      nav:
      - modules/ROOT/nav.adoc
     ```

2. **Update antora-playbook.yml**
   - Add a new entry to the `content.sources` array
   - Specify the GitHub repository URL
   - Define which branches to include (use `['feature/*']` for development, `[main]` for production)
   - Set the `start_path` if documentation is not in the root (typically `docs`)

   Example:
   ```yaml
   - url: https://github.com/agentic-layer/your-new-repo.git
     branches: ['feature/*']  # Change to [main] when production-ready
     start_path: docs
   ```

3. **Test the Configuration**
   - Run `npx antora antora-playbook.yml` locally to verify the build works
   - Check that the new documentation appears correctly in the generated site
   - Ensure all links and cross-references function properly


### Development Guidelines

- Follow the existing Antora playbook configuration patterns
- Test documentation builds locally before pushing changes
- Ensure all referenced Git repositories and branches are accessible
- Update branch references from `feature/*` to `main` when components are production-ready