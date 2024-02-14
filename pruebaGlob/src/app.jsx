import React, { useEffect, useState } from "react";

const CAT_ENDPOINT_RANDON_FACT = "https://catfact.ninja/fact";
//const CAT_ENDPOINT_IMAGE_URL = `https://cataas.com/cat/says/${firstWord}?size=50&color=red&json=true`;
const CAT_PREFIX_IMAGE_URL = `https://cataas.com`;

export default function App() {
  const [fact, setFact] = useState("fact");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    fetch(CAT_ENDPOINT_RANDON_FACT)
      .then((response) => response.json())
      .then((data) => setFact(data.fact));

    const threeFirstWord = fact.split(" ", 3).join(" ");

    fetch(
      `https://cataas.com/cat/says/${threeFirstWord}?size=50&color=red&json=true`
    )
      .then((res) => res.json())
      .then((response) => {
        const { url } = response;
        setImageUrl(url);
      });
  }, []);

  return (
    <main>
      <h1>App de gatitos</h1>
      {!!fact && <p>{fact}</p>}
      {imageUrl && (
        <img
          src={`${CAT_PREFIX_IMAGE_URL}${imageUrl}`}
          alt={`image extracted  from ${fact}`}
        />
      )}
    </main>
  );
}
