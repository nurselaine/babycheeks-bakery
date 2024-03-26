import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetItemCount } from "../../../hooks/useGetItemCount";
import { BarChart } from '@mui/x-charts/BarChart';
import { Stack } from "@mui/system";
import { LineChart } from "@mui/x-charts";


export default function SalesGraph({totalOrders}){
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
    'pb&ch',
    'white choc',
    'c-butter',
    'M&M\'s'
  ]

  const lineData = [0, 4, 12.8, 22.2, 42, 51.2, 68.5, 74.4, 88, 94.55, 105.60, 112.25, 120.25, 127.90, 158.30, 162.25, 188.80];
  
  const xAxis = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]

  // const xAxis = Array.from({length: totalOrders }, (_, index) => index + 1);

  console.log(itemCounts);

  return (
    <Stack  spacing={{ xs: 1, sm: 2 }} direction="row" justifyContent='center' useFlexGap flexWrap="wrap" >
      <BarChart 
        xAxis={[{
          data: xLabels, scaleType: 'band', categoryGapRatio: 0.75
        }]}
        series={[{data: data, label: 'count', id: 'cookies'}]}
        width={500}
        height={500}
      />
      <LineChart 
        xAxis={[{ data: xAxis }]}
        series={[{ data: lineData }]}
        width={500}
        height={500}
      />
    </Stack>
  )
}