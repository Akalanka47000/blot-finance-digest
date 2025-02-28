declare global {
  interface IPost {
    id: string;
    title: string;
    external_article_url: string;
    featured_image_url: string;
    created_at: string;
    updated_at: string;
  }
}

export {};
