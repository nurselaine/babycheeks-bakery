import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetItemCount } from "../../../hooks/useGetItemCount";
import { BarChart } from '@mui/x-charts/BarChart';


export default function SalesGraph(){
  const [itemCounts, setItemCounts] = new useState([]);
  const menuItems = useSelector((state) => state.cart.menuItems);
  const item_labels = menuItems.map((item) => item.item_name);

  useEffect(() => {
    const fetchItemCounts = async () => {
      const counts = await Promise.all(menuItems.map((item) => useGetItemCount(item.item_id)));
      setItemCounts(counts);
    }
    fetchItemCounts();
  }, [menuItems]);

  const graphConfig = {
    xAxis: [{
      scaleType: 'band',
      data: item_labels,
    }],
    series: itemCounts
  }

  const data = [7, 22, 11, 2, 5, 12];
  const xLabels = [
    'midnight',
    'original',
    'lemon',
    'pb & choco',
    'white choc',
    'cookie butter',
    'original M&M\'s'
  ]

  console.log(itemCounts);

  return (
    <BarChart 
      xAxis={[{
        data: xLabels, scaleType: 'band', categoryGapRatio: 0.75
      }]}
      series={[{data: data, label: 'count', id: 'cookies'}]}
      width={500}
      height={500}
    />
  )
}