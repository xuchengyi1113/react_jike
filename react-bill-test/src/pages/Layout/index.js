import { Outlet } from "react-router-dom";
import { Button } from "antd-mobile";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getBillList } from "@/store/modules/billStore";
import { TabBar } from "antd-mobile";
import { useNavigate } from 'react-router-dom';
import './index.scss'
import {
  BillOutline,
  CalculatorOutline,
  AddCircleOutline
} from "antd-mobile-icons";

const tabs = [
  {
    key: '/',
    title: '月度账单',
    icon: <BillOutline />,
  },
  {
    key: '/new',
    title: '记账',
    icon: <AddCircleOutline />,
  },
  {
    key: '/year',
    title: '年度账单',
    icon: <CalculatorOutline />,
  },
];
const Layout = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getBillList())
  },[dispatch])

  const nagivate = useNavigate();
  const switchRoute =(path)=>{
    console.log(path);
    nagivate(path);
  }
  return (
    <div className="layout">
      <div className="container">
        <Outlet/>
      </div>
      <div className="footer">
        <TabBar onChange={switchRoute} defaultActiveKey="/month">
          {tabs.map((tab) => (
            <TabBar.Item key={tab.key} title={tab.title} icon={tab.icon}/>
          ))}
        </TabBar>
      </div>
    </div>
    
  );
};

export default Layout;