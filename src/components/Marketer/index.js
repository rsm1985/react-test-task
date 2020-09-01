import React, {useState, useEffect} from 'react';
import axios from 'axios';
import dateFormat from "dateformat";
import {Line, Pie, Bar} from 'react-chartjs-2';
import './styles.scss'

const state = {
  labels: ['January', 'February', 'March',
    'April', 'May', 'title'],
  datasets: [
    {
      backgroundColor: [
        '#B21F00',
        '#C9DE00',
        '#2FDE00',
        '#00A6B4',
        '#6800B4'
      ],
      hoverBackgroundColor: [
        '#501800',
        '#4B5000',
        '#175000',
        '#003350',
        '#35014F'
      ],
      lineTension: 0.5,
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 1,
      data: [65, 59, 80, 81, 56, 70]
    }
  ]
}
const getData = (link) => axios.get(link);
const getCommentsCount = (data) => {
  const authors = new Set(data.map(item => item.username))
  const commentCounter = []
  authors.forEach(item => {
    commentCounter.push(data.filter(d => d.username === item).length)
  })
  return {authors: [...authors], counter: commentCounter}
}
const addCommentsDataset = (state, counters, users) => {
  const newState = Object.assign({}, state);
  newState.labels = users;
  newState.datasets[0].data = counters
  return newState
}
export default function Marketer() {
  const [post, setPost] = useState([]);
  const [commentsCount, setCommentsCount] = useState([]);
  const [userComments, setUserComments] = useState([]);
  useEffect(() => {
    getData("http://52.175.201.248:3000/facebook/facebook_post/1")
      .then((response) => {
        const comments = getCommentsCount(response.data.list)
        setUserComments(comments.authors)
        setCommentsCount(comments.counter)
        setPost(response.data.list.slice(0, 5))
      })
  }, []);
  return (
    <div className="marketer">
      <div className="marketer__select">Select</div>
      <div className="marketer__graph">
        {
          post.length
            ? <table className="marketer__table">
              <thead>
              <tr className="marketer__tr marketer__tr_header">
                <td className="marketer__cell">Created</td>
                <td className="marketer__cell">Post text</td>
                <td className="marketer__cell">Likes</td>
                <td className="marketer__cell">Author</td>
              </tr>
              </thead>
              <tbody>
              {
                post.map(
                  ({post_id, created_datetime, post, post_likes, username}, index) =>
                    <tr key={post_id}
                        className={`marketer__tr ${index % 2 !== 0 ? "marketer__tr_lightgreen" : ""}`}>
                      <td className="marketer__cell">{dateFormat(created_datetime, "dd.mm.yyyy HH:MM")}</td>
                      <td className="marketer__cell">{post}</td>
                      <td className="marketer__cell">{post_likes}</td>
                      <td className="marketer__cell"> {username}</td>
                    </tr>)
              }
              </tbody>
            </table>
            : null
        }

      </div>
      <div className="marketer__graph">
        <Bar
          data={addCommentsDataset(state, commentsCount, userComments)}
          width={600}
          height={300}
          options={{
            title: {
              display: true,
              text: 'Comments count',
              fontSize: 18
            },
            legend: {
              display: false
            }
          }}
        />
      </div>
      <div className="marketer__graph">
        <Line
          data={state}
          width={600}
          height={300}
          options={{
            title: {
              display: true,
              text: 'Daily comments',
              fontSize: 18
            },
            legend: {
            display: false
          }
          }}
        /></div>
      <div className="marketer__graph">
        <Pie
          data={state}
          width={600}
          height={300}
          options={{
            title: {
              display: true,
              text: '% Likes',
              fontSize: 18
            },
            legend: {
              display: false
            }
          }}
        /></div>
    </div>
  );
}
