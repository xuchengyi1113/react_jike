import { Outlet } from "react-router-dom";
import { Button } from "antd-mobile";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getBillList } from "@/store/modules/billStore";

const Layout = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getBillList())
  },[dispatch])
  return (
    <div>
        <Outlet/>
        I am the layout component
        <Button color="primary">测试全局</Button>
        <div className="test">
            <Button color="primary">测试局部</Button>

        </div>
    </div>
    
  );
};

export default Layout;