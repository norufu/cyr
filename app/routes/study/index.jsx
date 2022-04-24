import { Link } from "@remix-run/react";

export default function StudyIndexPage() {
    
  return (
      
    <div id="studyDiv" className="flex flex-col content-center items-center">
        <Link to="japanese" className="button">
            Japanese
        </Link>    
    </div>
  );
}
