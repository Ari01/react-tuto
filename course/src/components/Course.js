import React from 'react'

const Header = (props) => (
    <h1>{props.course}</h1>
  )
  
  const Part = ({ part, exercise }) => (
    <p> {part} {exercise} </p>
  )
  
  const Content = ({ parts }) => {
    return (
      <div>
        {parts.map(part => <Part key={part.id} part={part.name} exercise={part.exercises} />)}
      </div>
    )
  }
  
  const Total = ({ parts }) => {
    const res = parts.reduce((s, p) => {
      return s + p.exercises
    }, 0)
  
    return (
      <h3>
        total of exercises {res}
      </h3>
    )
  }
  
  const Course = ({ courses }) => {
    return (
      courses.map(course =>
        <div key={course.id}>
          <Header course={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>
      )
    )
  }

export default Course