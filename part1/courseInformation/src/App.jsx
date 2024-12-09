

function App() {

  const course = {
    name: 'Half stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }


  const Header = (props) => { 
    return(
      <h1>{props.course}</h1>
    )
  }

  const Content = (props) => {

    const Part = (props) => {
      return (
        <p>
          {props.name} {props.exercises}
        </p>
      )
    }

    return(
        <div>
            <Part {... props.parts[0]} />
            <Part {... props.parts[1]} />
            <Part {... props.parts[2]} />
        </div>
    )
  }

  const Footer = (props) => { 
    return(
      <p>Number of exercises  {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
    )}

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Footer  parts={course.parts} />
    </div>
  )
}

export default App
