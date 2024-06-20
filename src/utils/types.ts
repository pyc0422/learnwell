export type NewVideo = {
  title: string;
  description: string;
  video_url: string;
}

export interface NewComments {
  video_id:string,
  content:string,
  user_id:string
}

export interface Comments extends NewComments {
  created_at:string,
  id:string
}
export type Video =
NewVideo & {
  id:string,
  created_at:string,
  num_comments:number,
  user_id:string,
}