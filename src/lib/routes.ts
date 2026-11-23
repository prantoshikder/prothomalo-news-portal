/** Single source of truth for internal URLs. */
export const articleHref = (slug: string) => `/news/${slug}`;
export const categoryHref = (slug: string) => `/category/${slug}`;
export const searchHref = (q: string) => `/search?q=${encodeURIComponent(q)}`;
