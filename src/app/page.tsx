import Home from "@/app/home";
import LastCommit from "@/components/homepage/LastCommit";

export default function Page() {
  return (
    <Home lastCommit={<LastCommit username="MetallicGoat"/>}/>
  );
}
