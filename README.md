# Dr Ličina Vet - statički sajt

`index.html`, `styles.css`, `main.js`, `assets/`, `robots.txt`, `sitemap.xml`. Nema build koraka.

## Objava na Cloudflare Pages

1. dash.cloudflare.com → Workers & Pages → Create → Pages → **Upload assets** (Direct Upload).
2. Ime projekta npr. `licina-vet`, prevuci ceo sadržaj ovog `site` foldera (ne sam folder iznad njega).
3. Deploy. Sajt je na `https://licina-vet.pages.dev`.
4. Za pravi domen: projekat → Custom domains → Set up a custom domain.

Ako sajt bude na GitHub-u: Connect to Git, Framework preset = None, Build command prazno, Build output directory = `licina-vet/site` (ili `/` ako je repo samo ovaj folder).

## Posle izmene CSS-a ili JS-a

Povećaj broj u `styles.css?v=3` / `main.js?v=3` u `index.html`, inače posetioci do 10 minuta vide stari stil.

## Kad domen bude poznat

Pretraži `DOMEN` u `index.html`, `robots.txt` i `sitemap.xml`:
- zameni `https://DOMEN` pravim domenom,
- otkomentariši `canonical`, `og:url`, `og:image` u `<head>`,
- dodaj `url` i `image` u JSON-LD (napomena stoji odmah ispod njega),
- otkomentariši `Sitemap:` liniju u `robots.txt`.

Ne dodavati `aggregateRating` u JSON-LD.
