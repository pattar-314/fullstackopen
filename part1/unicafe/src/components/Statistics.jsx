import { StatisticsLine } from "./StatisticsLine"


export const Statistics = ({good, neutral, bad, total}) => {
  return(
    <div>
      <h1>statistics</h1>
      <br/>
      <table>
        <tbody>
          <StatisticsLine text={'good'} value={good} />
          <StatisticsLine text={'neutral'} value={neutral} />
          <StatisticsLine text={'bad'} value={bad} />
          <StatisticsLine text={'all'} value={total} />
          <StatisticsLine text={'average'} value={total == 0 ? 0 : (good - bad)/total} />
          <StatisticsLine text={'positive'} value={`${total == 0 ? 0 : good/total}%`} />
        </tbody>
        
      </table>
    </div>        
  )

  }