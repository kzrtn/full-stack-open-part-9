import { type CoursePart } from '../App';

const Course = (props: {course: CoursePart}) => {
  return (
    <p>
      {props.course.name} {props.course.exerciseCount}
    </p>
  )
}

export default Course