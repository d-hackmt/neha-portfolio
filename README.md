# Prajakta Biradar — Creator Portfolio

Static site (HTML + CSS + JS). No build step, so it runs on Netlify, GitHub Pages or any host.

## Editing content
All text, numbers, brands and links are in **`js/data.js`**. Search for `TODO`.

| What | Where |
|---|---|
| Name, bio, contact, WhatsApp number | `PROFILE` in `js/data.js` |
| Instagram stats and audience | `PROFILE.stats`, `PROFILE.audience` |
| Brand wall (logos + links) | `BRANDS` (logos go in `assets/logos/`) |
| Campaigns | `COLLABS` (screenshots go in `assets/collabs/`) |
| Services, process, testimonials | `SERVICES`, `PROCESS`, `TESTIMONIALS` |
| Portrait and about photo | `assets/images/portrait.jpg`, `assets/images/about.jpg` |
| Colours and fonts | top of `css/style.css` |

## WhatsApp
Every WhatsApp button opens `https://wa.me/<number>?text=<message>`. This is a plain link, so it works on any host:
on phones it opens the WhatsApp app, and on laptops it opens WhatsApp Web or Desktop.
Write the number with the country code and digits only, e.g. `919876543210`.

The enquiry form doesn't need a server. It turns the brand's answers into a WhatsApp message or an email.

## Media kit PDF
The "Download media kit" button opens the print dialog. Choose **Save as PDF** to get a clean one-page-per-section kit.

## Live site
https://d-hackmt.github.io/neha-portfolio/ (GitHub Pages, deployed from `main` / root).

To update: edit the files, then `git add -A && git commit -m "Update" && git push`. The site refreshes in about a minute.

Open a single campaign directly with `?campaign=<brand id>`, e.g. `https://d-hackmt.github.io/neha-portfolio/?campaign=kpilates`.
