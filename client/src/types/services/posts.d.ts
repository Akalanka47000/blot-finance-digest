export interface IGetPostsResponse {
  message: string;
  data: {
    docs: IPost[];
    totalDocs: number;
    page: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    nextPage: number;
    prevPage: number;
  };
}

export interface ICreatePostResponse {
  message: string;
  data: IPost;
}
