# Agentic Layer Documentation

Documentation of the Agentic Layer ecosystem, built with Antora by aggregating content from multiple Git repositories.

## Getting Started

Install all required dependencies:

```shell
npm install
```

Start kroki backend for diagram generation:

```shell
docker compose up -d
```

Generate the documentation site:

```shell
npm run build
```

After successful completion, the generated documentation site will be available in the `build/site` directory.

Troubleshooting tips:
- Ensure all referenced Git repositories and branches are accessible.
- Clear the cache if you encounter issues: `rm -rf .cache/antora`

The project is configured through the `antora-playbook.yml` file.
