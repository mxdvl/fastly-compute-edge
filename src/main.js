/// <reference types="@fastly/js-compute" />
import { env } from "fastly:env";
import { pvr } from "./pvr";

addEventListener("fetch", (event) => event.respondWith(handleRequest(event)));

/** @param {FetchEvent} event */
async function handleRequest(event) {
  // Log service version
  console.log(
    "FASTLY_SERVICE_VERSION:",
    env("FASTLY_SERVICE_VERSION") || "local",
  );

  const url = new URL(event.request.url);

  switch (url.pathname) {
    case "/pvr":
      return pvr(event, url);
  }

  const body = JSON.stringify({ ...event.client.geo }, null, 2);

  return new Response(body, {
    status: 200,
    headers: new Headers({ "Content-Type": "application/json; charset=utf-8" }),
  });
}
