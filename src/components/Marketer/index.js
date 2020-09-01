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

export default function Marketer() {
  const [filter, setFilter] = useState("all")
  const [post, setPost] = useState([]);
  const [commentsCount, setCommentsCount] = useState([]);
  const [userComments, setUserComments] = useState([]);
  const [dailyCommentsCount, setDailyCommentsCount] = useState([]);
  const [commentsDates, setCommentsDates] = useState([]);
  const [likesCounters, setLikesCounters] = useState([]);
  const [likesUsers, setLikesUsers] = useState([]);

  const onSelectChange = (e) => {
    setFilter(e.target.value)
  }
  const addDataset = (state, counters, labels) => {
    const filterIndexOf = labels.indexOf(filter)
    if(filterIndexOf !== -1) {
      const filteredLabels = labels.filter((item, index) => index === filterIndexOf)
      const filteredCounters = counters.filter((item, index) => index === filterIndexOf)
      return {...state, labels: filteredLabels, datasets:[{...state.datasets[0], data: filteredCounters }]}
    }
    return (
      {...state, labels: labels, datasets:[{...state.datasets[0], data: counters }]}
    )
  }
  const getDailyComments = (data) => {
    const dates = new Set(data.map(({created_datetime}) => dateFormat(created_datetime, "dd.mm.yyyy")))
    const commentByDateCounter = []
    dates.forEach(item => {
      commentByDateCounter.push(data.filter(item => {
        if (filter === "all") {
          return true
        } else return item.username === filter
      }).filter(({created_datetime}) => dateFormat(created_datetime, "dd.mm.yyyy") === item).length)
    })
    return {dates: [...dates], comments: commentByDateCounter}
  }
  const getCommentsCount = (data) => {
    const authors = new Set(data.map(item => item.username))
    const commentCounter = []
    authors.forEach(item => {
      commentCounter.push(data.filter(d => d.username === item).length)
    })
    return {authors: [...authors], counter: commentCounter}
  }
  const getLikesCount = (data) => {



    const likesCounter = []
    const users = new Set(data.filter(item => {
      if (filter === "all") {
        return true
      } else return item.username === filter
    }).map(item => item.username))
    // console.log("users", users)
    users.forEach(item => {
      likesCounter.push(Math.round(Math.random()*100))
    })
    return {users: [...users], counter: likesCounter}
  }
  useEffect(() => {
    getData("http://52.175.201.248:3000/facebook/facebook_post/1")
      .then((response) => {
        const comments = getCommentsCount(response.data.list)
        const dailyComments = getDailyComments(response.data.list)
        const likes = getLikesCount(response.data.list)

        setCommentsCount(comments.counter)
        setUserComments(comments.authors)
        setDailyCommentsCount(dailyComments.comments)
        setCommentsDates(dailyComments.dates)
        setLikesCounters(likes.counter)
        setLikesUsers(likes.users)


        setPost(response.data.list)
      })
  }, []);
  useEffect(() => {
    const dailyComments = getDailyComments(post)
    setCommentsDates(dailyComments.dates)
    setDailyCommentsCount(dailyComments.comments)
    const likes = getLikesCount(post)
    setLikesUsers(likes.users)
    setLikesCounters(likes.counter)

  }, [filter])
  // console.log("likesCounters", likesCounters)
  // console.log("likesUsers", likesUsers)
  return (
    <div className="marketer">
      <div className="marketer__select">
        Select username: &nbsp;
        <select onChange={onSelectChange} defaultValue="all">
          <option value="all">All</option>
          {post.length ? userComments
            .map(item => (<option value={item} key={item}>{item}</option>)) : null}
        </select>
      </div>
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
                post.filter(item => {
                  if(filter === "all") {
                    return true
                  }
                  return item.username === filter
                }).map(
                  ({post_id, created_datetime, post, post_likes, username}, index) =>
                    <tr key={index}
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
          data={addDataset(state, commentsCount, userComments)}
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
          data={addDataset(state, dailyCommentsCount, commentsDates)}
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
            },
            fill: false
          }}
        />
      </div>
      <div className="marketer__graph">
        <Pie
          data={addDataset(state, likesCounters, likesUsers)}
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
