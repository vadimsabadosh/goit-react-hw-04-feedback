import { useState } from 'react';
import FeedbackOptions from './FeedbackOptions';
import Notification from './Notification';
import Section from './Section';
import Statistics from './Statistics/Statistics';

export default function App() {
  const [state, setState] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  function countTotalFeedback() {
    return Object.values(state).reduce((acc, next) => acc + next, 0);
  }

  function countPositiveFeedbackPercentage() {
    return Math.round((state.good / countTotalFeedback()) * 100) || 0;
  }

  function onLeaveFeedback(type) {
    setState(prevState => {
      return {
        ...prevState,
        [type]: prevState[type] + 1,
      };
    });
  }

  const noFeedback = countTotalFeedback() === 0;
  return (
    <div>
      <Section title="Please leave feedback">
        <FeedbackOptions options={{}} onLeaveFeedback={onLeaveFeedback} />
      </Section>
      <Section title="Statistics">
        {noFeedback ? (
          <Notification message="There is no feedback" />
        ) : (
          <Statistics
            good={state.good}
            neutral={state.neutral}
            bad={state.bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage() + '%'}
          />
        )}
      </Section>
    </div>
  );
}
