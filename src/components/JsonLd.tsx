/** Renders one or more schema.org objects as a single JSON-LD @graph. */
export default function JsonLd({ data }: { data: object | object[] }) {
  const graph = Array.isArray(data) ? data : [data];
  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": graph });
  return (
    <script
      type="application/ld+json"
      // Escape "<" so article text can never close the script tag.
      dangerouslySetInnerHTML={{ __html: json.replace(/</g, "\\u003c") }}
    />
  );
}
