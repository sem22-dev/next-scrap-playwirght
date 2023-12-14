
import DisplayFollowers from "./followerDisplay";

export default async function TwitterFollowerCount({
  params,
}: {
  params: { username: string };
}) {
  
  return (
    <div>
        <DisplayFollowers username={params.username}/>
    </div>
  );
}
