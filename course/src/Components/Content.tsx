import { type CoursePart } from './Course';
import Course from './Course';

export interface ContentProps {
  courseParts: CoursePart[];
}

const Content = ({courseParts}: ContentProps) => {
  return courseParts.map(course => (
    <Course course={course} key={course.name} />
  ))
}

export default Content;