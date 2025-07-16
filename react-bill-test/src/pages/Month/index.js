import { NavBar, DatePicker } from 'antd-mobile'
import './index.scss'
import { useState,useMemo, useEffect } from 'react'
import classNames from 'classnames';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import _, { set } from 'lodash';
import DailyBill from './component/DayBill';

const Month = () => {
  const billList = useSelector(state => state.bill.billList);
  const monthGroup = useMemo(()=>{
    return _.groupBy(billList, (item)=>dayjs(item.date).format('YYYY-MM'));
  },[billList]);
  console.log(monthGroup);

  const [dataVisible, setDataVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState(
    ()=>{
      const date = new Date();
      return dayjs(date).format('YYYY-MM');
    }
  );

  const [currentMonthList, setMonthList] = useState(() => {
    const initialDateStr = dayjs(new Date()).format('YYYY-MM');
    return monthGroup[initialDateStr] || []; // 确保初始值为数组，即使为空
  })

  const monthResult = useMemo(()=>{
    const pay = (currentMonthList && Array.isArray(currentMonthList) ?
                 currentMonthList.filter(item => item.type === 'pay').reduce((a,c)=>a+c.money, 0)
                 : 0); // 如果 currentMonthList 为空或不是数组，pay 默认为 0

    const income = (currentMonthList && Array.isArray(currentMonthList) ?
                    currentMonthList.filter(item=> item.type === 'income').reduce((a,c)=>a+c.money, 0)
                    : 0); // 如果 currentMonthList 为空或不是数组，income 默认为 0
    return{
      pay,
      income,
      balance: income - pay
    }  
  },[currentMonthList]);

  useEffect(()=>{
    const nowDate = dayjs().format('YYYY-MM');
    if(monthGroup[nowDate]){
      setMonthList(monthGroup[nowDate]);
    }
  },[monthGroup])
  const onConfirm = (date) => {
    const dateStr = dayjs(date).format('YYYY-MM');
    setCurrentDate(dateStr);
    setMonthList(monthGroup[dateStr] || []); // 确保即使没有数据也能设置为空数组
    setDataVisible(false);
  }
  const dayGroup = useMemo(()=>{
    const groupData = _.groupBy(billList, (item)=>dayjs(item.date).format('YYYY-MM-DD'));
    const keys = Object.keys(groupData);
    return {
      groupData,
      keys
    }
  },[currentMonthList]);

  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        月度收支
      </NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div className="date" onClick={() => setDataVisible(true)}>
            <span className="text">
              {currentDate + ''}月账单
            </span>
            <span className={classNames('arrow', dataVisible && 'expand')}></span>
          </div>
          {/* 统计区域 */}
          <div className='twoLineOverview'>
            <div className="item">
              <span className="money">{monthResult.pay.toFixed(2)||0.00}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{monthResult.income.toFixed(2)|| 0.00}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{monthResult.balance.toFixed(2)|| 0.00}</span>
              <span className="type">结余</span>
            </div>
          </div>
          {/* 时间选择器 */}
          <DatePicker
            className="kaDate"
            title="记账日期"
            precision="month"
            visible={dataVisible}
            onConfirm={onConfirm}
            onClose={()=>setDataVisible(false)}
            max={new Date()}
          />
        </div>
        {
          dayGroup.keys.map((key)=>{
            return (
              <DailyBill
                key={key}
                date={key}
                billList={dayGroup.groupData[key]}
              />
            )
          })
        }
      </div>
    </div >
  )
}

export default Month