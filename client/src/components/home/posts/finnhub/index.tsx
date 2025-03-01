import { retrievePosts } from './action';
import { RenderBox } from './render-box';

export async function FinnhubPosts() {
  const posts = await retrievePosts();
  return <RenderBox initialPosts={posts} />;
}

export default FinnhubPosts;
