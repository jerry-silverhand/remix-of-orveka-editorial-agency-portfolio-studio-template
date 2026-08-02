# Remix of Orveka: Editorial Agency & Portfolio Studio Template

Create a modern editorial photography website where Portfolio and Blog CMS are automatically connected to Lovable Cloud, including listing pages and dynamic detail pages. CMS must be fully synced with no manual wiring.

🗂️ CMS COLLECTIONS (AUTO SYNC TO LOVABLE CLOUD)
📁 Portfolio CMS

Collection name: Portfolio

⚠️ Portfolio uses 4 preview images

Fields:

title (text)

slug (text, unique, auto-generate from title)

category (select)

preview_image_1 (image)

preview_image_2 (image)

preview_image_3 (image)

preview_image_4 (image)

description (rich text)

📰 Blog CMS

Collection name: Blog

⚠️ Blog uses thumbnail URL only (NO image upload)

Fields:

title (text)

slug (text, unique, auto-generate from title)

excerpt (text, max 160 characters)

thumbnail_url (text / URL only)

content (rich text)

publish_date (date)

🧭 PAGES & DYNAMIC ROUTING (AUTO CONNECT)
📄 Portfolio Listing Page

Route: /portfolio

Behavior:

Fetch data from Portfolio CMS

Display image-first cards using preview_image_1

Each card links to:
/portfolio/{slug}

📄 Portfolio Detail Page

Route: /portfolio/{slug}

Behavior:

Auto-fetch Portfolio item by slug

Display:

Title

Category

4 preview images (preview_image_1–4)

Description

📄 Blog Listing Page

Route: /blog

Behavior:

Fetch data from Blog CMS

Display:

Thumbnail rendered from thumbnail_url

Title

Excerpt

Each card links to:
/blog/{slug}

⚠️ Thumbnail MUST render from URL text field only

📄 Blog Detail Page

Route: /blog/{slug}

Behavior:

Auto-fetch Blog item by slug

Display:

Title

Thumbnail (from URL)

Publish date

Rich text content

🔗 LOVABLE CLOUD BINDING RULES

Portfolio & Blog CMS must appear in Lovable Cloud dashboard

CMS is the single source of truth

No static or hardcoded content

New CMS entries appear instantly on site

⚙️ FAIL-SAFE RULES

Auto-generate slug if empty

Auto-create missing CMS fields

Auto-bind CMS to dynamic routes

Prevent CMS disconnect errors

🎨 UI & UX

Editorial, minimal, premium

Rounded cards

Image-first layout

Font: Manrope

Smooth hover & scroll animation

Fully responsive

🧩 DO NOT OMIT

“Ensure Portfolio CMS uses exactly four preview images and Blog CMS uses a single thumbnail rendered from URL only, fully synced with Lovable Cloud.”

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/2b072eed-f0a8-4c29-8076-84aa7f7d24fb).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
