# NOIR & BLADES — Demo Site

A static, dependency-free barbershop website (HTML/CSS/vanilla JS) built as a
sales demo. Open `index.html` directly in a browser — nothing to install or build.

## Deploy to GitHub Pages

1. Create a new GitHub repo and push these three files (`index.html`, `style.css`, `script.js`).
2. In the repo, go to **Settings → Pages**.
3. Under "Build and deployment", set **Source** to `Deploy from a branch`, branch `main`, folder `/ (root)`.
4. Save — your site will be live at `https://<username>.github.io/<repo-name>/` within a minute or two.

## Placeholders to replace for a real client

Search each file for `PLACEHOLDER` to find every spot that needs a real value:

| What | Where |
|---|---|
| Shop address | `index.html` — "Find Us" section |
| Phone number | `index.html` — Call Now button, footer |
| WhatsApp number | `index.html` (Get Directions block) **and** `script.js` (`WHATSAPP_NUMBER` constant) |
| Instagram link | `index.html` — footer |
| Google Maps link | `index.html` — "Get Directions" button `href` |
| Prices, services, opening hours | `index.html` — "The Craft" and "Find Us" sections |
| Barber names/photos/bios | `index.html` — "Meet The Barbers" section |
| Photography | All `<img src="https://images.unsplash.com/...">` tags — swap for the client's own photos before going live (current images are for demo purposes) |

## Booking form

The booking form has no backend — submitting it shows a confirmation message
only. To make it functional, wire the `bookingForm` submit handler in
`script.js` up to an email service (e.g. Formspree), a booking API, or a
serverless function.

## Structure

```
index.html   — markup, all copy, placeholder comments
style.css    — design tokens + all styling, mobile-first responsive rules at the bottom
script.js    — nav, mobile menu, scroll reveal, gallery lightbox, testimonial carousel, booking form, WhatsApp link
```
