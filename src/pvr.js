const base = "https://reports.hometrack.com/";

/**
 * @param {FetchEvent} event
 * @param {URL} url
 */
export async function pvr(event, url) {
  console.log("\n\nPVR");
  const params = new URLSearchParams(url.search);

  console.log(url.search, params, ...params.keys());

  const authorised =
    event.client.geo?.country_code === "GB__" || params.has("id_provided");

  if (!authorised) {
    return new Response("This service is only available in the UK", {
      status: 403,
    });
  }

  const response = await fetch(
    new URL(
      "/uk/products/market-intelligence/property-valuation-report/",
      base,
    ),
    { backend: "pvr" },
  );

  const text = await response.text();

  return new Response(
    text.replaceAll(/ (src|href)="\/([^\/])+/g, ' $1="/pvr/$2'),
    {
      headers: new Headers({ "Content-Type": "text/html" }),
    },
  );
}
