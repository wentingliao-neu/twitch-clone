import Wrapper from "./Wrapper";
import Toggle from "./Toggle";
import Navigation from "./Navigation";

export default function Sidebar() {
   return (
      <Wrapper>
         <Toggle />
         <Navigation />
      </Wrapper>
   );
}
