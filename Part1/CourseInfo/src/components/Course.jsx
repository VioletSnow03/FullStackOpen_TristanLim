const Header = ({course}) => <h2>{course}</h2>

const Content = ({parts}) =>
    <>
      {parts.map(part => <Part key={part.id} part={part}/>)}
    </>

const Part = ({part}) => <p>{part.name} {part.exercises}</p>

const Total = ({parts}) => <h4>total of {parts.reduce((sum,part) => sum + part.exercises, 0)} exercises</h4>

const Course = ({course}) => {
  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default Course