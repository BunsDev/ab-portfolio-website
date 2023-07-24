import { DocumentTypes, allDocuments } from 'contentlayer/generated';

export function getBacklinks(name: string) {
  const backlinkingDocs = allDocuments.filter((doc) =>
    doc.body.raw.includes('[[' + name)
  ) as DocumentTypes[];

  return backlinkingDocs.map((doc) => ({
    title: doc.title,
    slug: doc.slug,
    type: doc.type,
    // line that has the backlink
    excerpt: doc.body.raw
      .split('\n')
      .find((line) => line.includes('[[' + name))
      ?.replace(/\[\[(.+?)\]\]/g, '<span class="highlight">$1</span>'),
  }));
}
