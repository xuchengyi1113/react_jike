import classNames from 'classnames'
import { useMemo } from 'react';
import './index.scss'

const DailyBill = ({date, billList}) => {
      const dayResult = useMemo(()=>{
        const pay = (billList && Array.isArray(billList) ?
                     billList.filter(item => item.type === 'pay').reduce((a,c)=>a+c.money, 0)
                     : 0); // 如果 currentMonthList 为空或不是数组，pay 默认为 0
    
        const income = (billList && Array.isArray(billList) ?
                        billList.filter(item=> item.type === 'income').reduce((a,c)=>a+c.money, 0)
                        : 0); // 如果 currentMonthList 为空或不是数组，income 默认为 0
        return{
          pay,
          income,
          balance: income - pay
        }  
      },[billList]);
  return (
    <div className={classNames('dailyBill')}>
      <div className="header">
        <div className="dateIcon">
          <span className="date">{date}</span>
          <span className={classNames('arrow')}></span>
        </div>
        <div className="oneLineOverview">
          <div className="pay">
            <span className="type">支出</span>
            <span className="money">{dayResult.pay.toFixed(2)}</span>
          </div>
          <div className="income">
            <span className="type">收入</span>
            <span className="money">{dayResult.income.toFixed(2)}</span>
          </div>
          <div className="balance">
            <span className="money">{dayResult.balance.toFixed(2)}</span>
            <span className="type">结余</span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default DailyBill