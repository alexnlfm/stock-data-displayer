import { useState, useEffect } from 'react';
import moment from 'moment';

const URL_PREFIX = 'https://test.fxempire.com/api/v1/en/stocks/chart/candles?Identifier=AAPL.XNAS&IdentifierType=Symbol&AdjustmentMethod=All&IncludeExtended=False&period=30&Precision=Minutes&';
const URL_SUFFIX = '%2023:59&_fields=ChartBars.StartDate,ChartBars.High,ChartBars.Low,ChartBars.StartTime,ChartBars.Open,ChartBars.Close,ChartBars.Volume';

const datesFormat = 'MM/DD/YYYY';

const cachedData = {};


function useChartData(selectedPeriod) {
  const [isLoading, setIsLoading] = useState(true);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const cacheKey = `${selectedPeriod.amount}-${selectedPeriod.units}`;
    if (cachedData[cacheKey]) {
      setChartData(cachedData[cacheKey]);
      setIsLoading(false);
      return;
    }
    async function asyncFunc() {
      setIsLoading(true);
      const startDate = moment().subtract(selectedPeriod.amount, selectedPeriod.units).format(datesFormat);
      const endDate = moment().format(datesFormat);
      const url = `${URL_PREFIX}StartTime=${startDate}&EndTime=${endDate}${URL_SUFFIX}`;
      const result = await fetch(url);
      const data = await result.json();
      cachedData[cacheKey] = data;
      setChartData(data);
      setIsLoading(false);
    }
    asyncFunc();
  }, [selectedPeriod]);

  return { isLoading, chartData };
}

export default useChartData;
