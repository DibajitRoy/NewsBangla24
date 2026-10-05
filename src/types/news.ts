export interface Article {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  imageAlt: string;
}

export interface Section {
  curationId: string;
  title: string;
  articles: Article[];
}