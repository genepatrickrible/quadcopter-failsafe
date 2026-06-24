# Quadcopter Modeling and Fail-Safe Flight Control

Source for the project landing page that aggregates two 2020 papers on quadcopter
dynamic modeling and fault-tolerant control for motor failure, from the Electrical
and Electronics Engineering Institute, University of the Philippines Diliman.

Live at **https://genepatrickrible.github.io/quadcopter-failsafe/**.

## The two papers

| Paper | Venue | DOI |
| ----- | ----- | --- |
| [Fail-Safe Controller Architectures for Quadcopter with Motor Failures](https://arxiv.org/abs/2009.10260) — **Best Presentation Award, ICCAR 2020** | 2020 6th ICCAR, Singapore | [10.1109/ICCAR49639.2020.9108038](https://doi.org/10.1109/ICCAR49639.2020.9108038) |
| [Modeling and Implementation of Quadcopter Autonomous Flight Based on Alternative Methods to Determine Propeller Parameters](https://arxiv.org/abs/2010.08806) | ASTESJ 5(5), 727–741 (2020) | [10.25046/aj050589](https://doi.org/10.25046/aj050589) |

## Repository layout

```
quadcopter-failsafe/
  index.html                 single page, one section per paper
  static/css/index.css       styles (Bulma + overrides)
  static/js/index.js          per-paper Cite-dropdown behavior
  static/images/             favicons, OG image, figure placeholders
  static/pdfs/               hosted author-version PDFs (both papers)
  static/videos/             local MP4s (optional)
  favicon.ico                root favicon (Google probes /favicon.ico)
  sitemap.xml, robots.txt    crawler hints
```

## Things to fill in (search the source for these)

- `{{GSC_TOKEN}}` / `{{BING_TOKEN}}` in `index.html` — paste verification tokens after
  registering the site with Google Search Console and Bing Webmaster Tools.
- `YOUTUBE_ID` (two places, the Videos section) — replace with the 11-character YouTube
  IDs once the flight-demo and controller-tuning clips are uploaded.
- `TODO(media)` placeholder boxes — drop in the teaser clip and the figure images.

## Preview locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## SEO

- Google Scholar `citation_*` meta tags for the flagship (journal) paper.
- Schema.org `Collection` JSON-LD holding both `ScholarlyArticle` entries.
- Canonical URL, keywords, OG/Twitter social card (`static/images/teaser-social.png`).
- Real favicon files referenced by URL, plus `favicon.ico` at the repo root.
- `sitemap.xml` and `robots.txt`.

## Credits

Page template adapted from [Nerfies](https://github.com/nerfies/nerfies.github.io),
used under [CC BY-SA 4.0](http://creativecommons.org/licenses/by-sa/4.0/).
