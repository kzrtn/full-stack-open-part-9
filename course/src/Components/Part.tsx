import type { JSX } from 'react/jsx-runtime';
import { type CoursePart } from '../App';

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
}

const Part = ({part}: {part: CoursePart}) => {
  let display: JSX.Element;

  switch(part.kind) {
    case "basic":
      display = <div><i>{part.description}</i></div>;
      break;
    case "group":
      display = <div>project exercises {part.groupProjectCount}</div>;
      break;
    case "background":
      display = <><div><i>{part.description}</i></div><div>{part.backgroundMaterial}</div></>;
      break;
    case "special":
      display = <><div><i>{part.description}</i></div><div>required skills: {part.requirements.map((skill, i) => i+1 < part.requirements.length ? `${skill}, ` : skill)}</div></>
      break;
    default:
      return assertNever(part);
  }
  return (
    <div>
      <b>{part.name} {part.exerciseCount}</b>
      {display}
    </div>
  )
}

export default Part