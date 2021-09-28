# Monorepo POC
This is a Monorepo POC using Lerna to build React app dependencies. See: https://storybook.chasespencer.dev for an interactive view of these components.

## Versioning
This project uses Lerna to detect changes to packages and apply versions based on commit history. We use Conventional Commits to determine this see: https://www.conventionalcommits.org. 

## Deployment
When a new version of a package is ready it is deployed to the GitHub registry for consumer applications to use. It also deploys to the Storybook instance via Cloudflare Pages see: https://storybook.chasespencer.dev.

## TODO List
- [x] Install eslint with strict rule sets
- [x] Install Storybook for displaying components
- [x] Setup Lerna versioning
- [x] Setup Lerna publishing to our custom npm registry
- [x] Install and configure Husky to enforce Conventional Commits
- [X] Setup CI pipeline GitHub Actions
- [X] Setup Cloudflare to deploy the Storybook instance
- [X] Display shared components using Storybook
- [X] Rebuild the picklist component using React as one of the shared components
- [X] Setup test coverage to display in Storybook
- [X] Full unit test coverage
- [ ] Make components theme-able
- [ ] Make isolate component styles using modules
- [ ] Create a readme for the picklist component
- [ ] Use FakerJS to harden tests
- [X] Convert styles from SCSS to Styled-Components or Setup webpack for preprocessing/bundling
