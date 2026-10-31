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

## Portfolio PDF
The "Download portfolio (PDF)" button serves `Prajakta-Biradar-Portfolio.pdf`. It is generated from `media-kit.html` (same data as the site): open it in Chrome → Print → Save as PDF, margins None, background graphics on.

