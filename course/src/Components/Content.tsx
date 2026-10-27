import { type CoursePart } from '../App';
import Course from './Course';

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
}

const Content = ({courseParts}: { courseParts: CoursePart[] }) => {
  return courseParts.map(course => {
    switch(course.kind) {
      case "basic":
        console.log(course.name, course.description, course.exerciseCount);
        break;
      case "group":
        console.log(course.name, course.groupProjectCount, course.exerciseCount);
        break;
      case "background":
        console.log(course.name, course.description, course.exerciseCount, course.backgroundMaterial);
        break;
      default:
        return assertNever(course);
    }
    return (
      <Course course={course} key={course.name} />
    )
  })
}

export default Content;