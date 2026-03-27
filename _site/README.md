# le-nicolas.github.io

This repository contains my personal writing site built with Jekyll and hosted on GitHub Pages.

## Why I wanted Jekyll in the first place

I wanted a blog that was simple, fast, and inexpensive to maintain.

Jekyll made sense because it lets me:

- write posts in Markdown instead of managing a heavy CMS
- keep everything in a normal GitHub repository
- publish a static site without paying for separate hosting
- focus on writing and structure instead of backend maintenance
- use GitHub Pages for a straightforward deploy flow

In short, Jekyll was the right fit because I wanted plain-text writing, static pages, and a setup that stays out of the way.

## Tech stack

- Jekyll
- GitHub Pages
- Markdown posts in `_posts/`
- Shared layouts in `_layouts/`
- Reusable partials in `_includes/`
- Main styling in `css/main.css`

## Project structure

```text
.
|-- _includes/
|-- _layouts/
|-- _posts/
|-- assets/
|-- css/
|-- _config.yml
|-- index.html
`-- Gemfile
```

## Local setup

### 1. Install prerequisites

You need:

- Ruby
- Bundler
- Jekyll

On Windows, the easiest route is usually:

1. Install Ruby with RubyInstaller.
2. Open a new terminal.
3. Install Bundler if needed:

```powershell
gem install bundler
```

### 2. Install project dependencies

From the repository root:

```powershell
bundle install
```

### 3. Run the site locally

```powershell
bundle exec jekyll serve
```

Then open:

```text
http://127.0.0.1:4000
```

### 4. Build the site

```powershell
bundle exec jekyll build
```

The generated output will be written to `_site/`.

## Writing new posts

Add a Markdown file to `_posts/` using Jekyll's date-based naming format:

```text
YYYY-MM-DD-title.markdown
```

Example:

```text
2026-03-27-my-new-post.markdown
```

Each post should include front matter like:

```yaml
---
layout: post
title: "My New Post"
tags: [Writing, Ideas]
comments: true
---
```

## Deploying to GitHub Pages

This repository is intended to be pushed to GitHub and served from:

```text
https://le-nicolas.github.io
```

Basic workflow:

1. Make your changes.
2. Test locally with `bundle exec jekyll serve`.
3. Build with `bundle exec jekyll build`.
4. Commit and push to `main`.

If GitHub Pages is configured to build from this repository, the site will publish automatically after push.

## Notes

- The design has been simplified to keep the reading experience clean and direct.
- The site is meant for readers and fans first, so clarity matters more than visual effects.
