import { type CoursePart } from '../App';
import Course from './Course';

const Content = ({courseParts}: { courseParts: CoursePart[] }) => {
  return courseParts.map(course => (
    <Course course={course} key={course.name} />
  ))
}

export default Content;