export interface MovieProps {
  Title: string;
  Year: number;
  imdbID: string;
}

export interface MovieRequest {
  data: MovieProps[];
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}
