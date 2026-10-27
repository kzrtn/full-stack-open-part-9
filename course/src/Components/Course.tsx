export interface CoursePart {
  name: string;
  exerciseCount: number;
}

const Course = (props: {course: CoursePart}) => {
  return (
    <p>
      {props.course.name} {props.course.exerciseCount}
    </p>
  )
}

export default Course