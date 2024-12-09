

const Course = ({course}) => {
  
  const Header = ({name}) => { 
    return(
      <h1>{name}</h1>
    )
  }
  
  const Part = (part) => {
      return (
        <p>
          {part.name} {part.exercises}
        </p>
      )
    }

  const Content = ({parts}) => {

    const partList = parts.map((p, key) => <Part {...p} key={key} />)

    return(
        <div>
            {partList}
        </div>
    )
  }

  const Footer = (course) => { 
    return(
      <p>Number of exercises  {course.parts.reduce((total, current) => total + current.exercises, 0 )}</p>
    )}


  return (
    <div>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <Footer  parts={course.parts} />
  </div>
  )
}

export default Course