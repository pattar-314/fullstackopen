import Course from "./components/Course"


function App() {

  const courses = [{
    id: 1,
    name: 'Half stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Jim bobs totally real guide to testing',
        exercises: 5,
        id: 4
      },
      {
        name: 'Jim bobs totally real guide to groking',
        exercises: 6,
        id: 4
      }
    ]
  },
  {
    name: 'Node.js',
    id: 2,
    parts: [
      {
        name: 'Routing',
        exercises: 3,
        id: 1
      },
      {
        name: 'Middlewares',
        exercises: 7,
        id: 2
      }
    ]
  }
]

  const courseList = courses.map((c, key) => <Course course={c} key={key} />)


  return (
    <div>
       {courseList}
    </div>
   
  )
}

export default App
