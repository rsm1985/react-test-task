import React from 'react';
import {Line, Pie, Bar} from 'react-chartjs-2';
import './styles.scss'

const state = {
  labels: ['January', 'February', 'March',
    'April', 'May'],
  datasets: [
    {
      label: 'Rainfall',
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
      borderColor: 'rgba(0,128,0,1)',
      borderWidth: 1,
      data: [65, 59, 80, 81, 56]
    }
  ]
}

export default function Marketer() {
  return (
    <div className="marketer">
      <div className="marketer__select">Select</div>
      <div className="marketer__graph">Table</div>
      <div className="marketer__graph">
        <Bar
          data={state}
          width={600}
          height={300}
          options={{
            title: {
              display: true,
              text: 'Comments count',
              fontSize: 18
            },

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

          }}
        /></div>
    </div>
  );
}
