import { type CoursePart } from '../App';
import Part from './Part';

const Content = ({courseParts}: { courseParts: CoursePart[] }) => {
  return courseParts.map(part => 
    <div key={part.name} style={{marginBottom: "10px"}}>
      <Part part={part} />
    </div>
  )
}

export default Content;