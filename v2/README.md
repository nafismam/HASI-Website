# HASI 2.0

A responsive, dependency-free redesign using HASI's existing content and photographs. The original HTML, CSS, images and data are preserved at the repository root. This version lives entirely in `v2/`.

## Develop

From the repository root:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Open `/v2/` on that server. No package installation or build step is required. Use a current browser; the site uses native dialog, WebP and CSS Grid. Search and filters require JavaScript; a fallback links to the original projects page. Email and telephone actions open the visitor's own applications. Copy email requires a secure context (HTTPS or localhost). No messages, donations or subscriptions are collected by this site.

## Publish free on GitHub Pages

The supplied `.github/workflows/pages-v2.yml` deploys both versions. It is manual to avoid changing an existing live site unexpectedly.

1. Push these changes to your GitHub repository.
2. In repository Settings → Pages, choose **GitHub Actions** as the source. GitHub's free Pages hosting requires a public repository under a free account.
3. In Actions, select **Publish HASI website**, choose the branch containing these changes and run it.
4. After successful deployment, use the deployment URL shown by GitHub. With the standard repository domain, version 2 is at `https://nafismam.github.io/HASI-Website/v2/` and the original remains at `https://nafismam.github.io/HASI-Website/`. These URLs are expected destinations, not confirmation of a completed deployment. A configured custom domain changes the base URL.

If the repository already has a Pages workflow, coordinate that workflow before running this one; Pages has one deployment per repository.

## Content and assets

Project archive descriptions are retained from the original website, with current status explicitly left unspecified. Photographs are converted to optimized WebP in `assets/`. No live impact statistics, funding mechanisms or testimonials have been invented. Partner names describe historical relationships documented on the original site. The map is a directions link with no API key or external embed. No third-party fonts, trackers, or frontend libraries are loaded.

Searchable archive: `projects.js`. Layout: `index.html`. Styling: `style.css`. Interactions: `app.js`. Keep project descriptions plain text: the interface escapes them before rendering. Review factual content, photo publication permissions and contact information with HASI before launch.
