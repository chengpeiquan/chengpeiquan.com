export enum ContentProcessorMode {
  /**
   * Only metadata output is provided, suitable for list cache generation.
   *
   * In fact, each processing mode will parse metadata, so there is no need to
   * pass this parameter.
   *
   * Of course, it doesn't matter if it is passed. In this mode, the content
   * processor will not be started to perform unnecessary work.
   *
   * I just record that this situation exists in the product.
   */
  MetaOnly = 'MetaOnly',

  /**
   * Text content output is provided, in this mode, markdown content with images
   * and links removed, suitable for generating content cache for search
   * indexes.
   */
  TextOnly = 'TextOnly',

  /**
   * Metadata and basic HTML output is provided, suitable for RSS subscription
   * sources.
   */
  HtmlOnly = 'HtmlOnly',

  /**
   * All content processing steps are executed, outputting HTML, JSX, with image
   * optimization, etc.
   *
   * By default, this mode is used to output the most complete content.
   */
  FamilyBucket = 'FamilyBucket',
}
