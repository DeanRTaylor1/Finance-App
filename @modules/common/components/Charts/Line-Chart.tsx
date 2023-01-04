import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend
);
interface MetaData {
  '1. Information': string;
  '2. Symbol': string;
  '3. Last Refreshed': string;
  '4. Time Zone': string;
}

interface chartProps {
  stockDetails: MetaData;
  dates: string[];
  stockData: any;
  months: number;
}

const rawData = {
  'Meta Data': {
    '1. Information': 'Monthly Prices (open, high, low, close) and Volumes',
    '2. Symbol': 'VOO',
    '3. Last Refreshed': '2022-11-30',
    '4. Time Zone': 'US/Eastern',
  },
  'Monthly Time Series': {
    '2022-11-30': {
      '1. open': '358.5300',
      '2. high': '374.5900',
      '3. low': '338.9000',
      '4. close': '374.4900',
      '5. volume': '78828496',
    },
    '2022-10-31': {
      '1. open': '331.7900',
      '2. high': '357.9800',
      '3. low': '319.8700',
      '4. close': '354.9500',
      '5. volume': '99172672',
    },
    '2022-09-30': {
      '1. open': '361.1000',
      '2. high': '378.5100',
      '3. low': '328.1200',
      '4. close': '328.3000',
      '5. volume': '110074173',
    },
    '2022-08-31': {
      '1. open': '376.1200',
      '2. high': '396.8900',
      '3. low': '363.1100',
      '4. close': '363.1500',
      '5. volume': '82629491',
    },
    '2022-07-29': {
      '1. open': '346.1600',
      '2. high': '379.6600',
      '3. low': '341.0450',
      '4. close': '378.7900',
      '5. volume': '91517549',
    },
    '2022-06-30': {
      '1. open': '381.6100',
      '2. high': '383.7400',
      '3. low': '334.2400',
      '4. close': '346.8800',
      '5. volume': '118461474',
    },
    '2022-05-31': {
      '1. open': '378.7900',
      '2. high': '394.9250',
      '3. low': '349.7600',
      '4. close': '379.6800',
      '5. volume': '142808687',
    },
    '2022-04-29': {
      '1. open': '416.6800',
      '2. high': '420.8200',
      '3. low': '378.0000',
      '4. close': '378.7000',
      '5. volume': '109293081',
    },
    '2022-03-31': {
      '1. open': '400.0100',
      '2. high': '424.7200',
      '3. low': '381.6400',
      '4. close': '415.1700',
      '5. volume': '136782177',
    },
    '2022-02-28': {
      '1. open': '414.3400',
      '2. high': '421.1800',
      '3. low': '377.5000',
      '4. close': '401.3600',
      '5. volume': '178123502',
    },
    '2022-01-31': {
      '1. open': '437.9300',
      '2. high': '441.2600',
      '3. low': '386.8400',
      '4. close': '413.6900',
      '5. volume': '209277200',
    },
    '2021-12-31': {
      '1. open': '424.4700',
      '2. high': '440.3600',
      '3. low': '412.7700',
      '4. close': '436.5700',
      '5. volume': '142126854',
    },
    '2021-11-30': {
      '1. open': '423.1900',
      '2. high': '435.4100',
      '3. low': '418.6300',
      '4. close': '419.0600',
      '5. volume': '100053866',
    },
    '2021-10-29': {
      '1. open': '396.2262',
      '2. high': '422.5150',
      '3. low': '391.9600',
      '4. close': '422.1600',
      '5. volume': '93894175',
    },
    '2021-09-30': {
      '1. open': '416.0500',
      '2. high': '417.4400',
      '3. low': '394.3400',
      '4. close': '394.4000',
      '5. volume': '103248307',
    },
    '2021-08-31': {
      '1. open': '404.7800',
      '2. high': '416.5600',
      '3. low': '400.9200',
      '4. close': '415.0500',
      '5. volume': '81058621',
    },
    '2021-07-30': {
      '1. open': '394.3000',
      '2. high': '406.1300',
      '3. low': '387.9300',
      '4. close': '403.1500',
      '5. volume': '87866050',
    },
    '2021-06-30': {
      '1. open': '388.5000',
      '2. high': '394.4500',
      '3. low': '382.5200',
      '4. close': '393.5200',
      '5. volume': '68852165',
    },
    '2021-05-28': {
      '1. open': '385.5600',
      '2. high': '388.6800',
      '3. low': '372.1300',
      '4. close': '386.1300',
      '5. volume': '89691613',
    },
    '2021-04-30': {
      '1. open': '366.2000',
      '2. high': '386.7400',
      '3. low': '366.0300',
      '4. close': '383.5700',
      '5. volume': '77401939',
    },
    '2021-03-31': {
      '1. open': '354.5500',
      '2. high': '366.0500',
      '3. low': '341.9150',
      '4. close': '364.3000',
      '5. volume': '115909237',
    },
    '2021-02-26': {
      '1. open': '343.6300',
      '2. high': '362.3700',
      '3. low': '341.4000',
      '4. close': '349.5900',
      '5. volume': '65076646',
    },
    '2021-01-29': {
      '1. open': '345.0200',
      '2. high': '354.6450',
      '3. low': '335.3700',
      '4. close': '340.1800',
      '5. volume': '67318058',
    },
    '2020-12-31': {
      '1. open': '335.9200',
      '2. high': '344.3700',
      '3. low': '333.7700',
      '4. close': '343.6900',
      '5. volume': '62049300',
    },
    '2020-11-30': {
      '1. open': '303.3700',
      '2. high': '335.2000',
      '3. low': '300.6300',
      '4. close': '332.6400',
      '5. volume': '67765492',
    },
    '2020-10-30': {
      '1. open': '310.1600',
      '2. high': '325.2220',
      '3. low': '296.3700',
      '4. close': '299.8200',
      '5. volume': '62743173',
    },
    '2020-09-30': {
      '1. open': '321.8100',
      '2. high': '329.6700',
      '3. low': '295.0400',
      '4. close': '307.6500',
      '5. volume': '74318208',
    },
    '2020-08-31': {
      '1. open': '301.6500',
      '2. high': '322.8300',
      '3. low': '301.1300',
      '4. close': '321.0200',
      '5. volume': '61288229',
    },
    '2020-07-31': {
      '1. open': '284.3700',
      '2. high': '300.6200',
      '3. low': '283.9500',
      '4. close': '300.1000',
      '5. volume': '74664917',
    },
    '2020-06-30': {
      '1. open': '279.0700',
      '2. high': '297.3200',
      '3. low': '272.7700',
      '4. close': '283.4300',
      '5. volume': '98428161',
    },
    '2020-05-29': {
      '1. open': '262.1400',
      '2. high': '282.0400',
      '3. low': '253.9700',
      '4. close': '279.7500',
      '5. volume': '92403670',
    },
    '2020-04-30': {
      '1. open': '227.9200',
      '2. high': '271.0000',
      '3. low': '224.1300',
      '4. close': '267.1000',
      '5. volume': '148503528',
    },
    '2020-03-31': {
      '1. open': '274.0000',
      '2. high': '288.3200',
      '3. low': '200.5500',
      '4. close': '236.8200',
      '5. volume': '280853662',
    },
    '2020-02-28': {
      '1. open': '297.1200',
      '2. high': '311.5900',
      '3. low': '262.2500',
      '4. close': '271.7400',
      '5. volume': '99491729',
    },
    '2020-01-31': {
      '1. open': '297.2900',
      '2. high': '305.9200',
      '3. low': '294.3500',
      '4. close': '295.6900',
      '5. volume': '66578377',
    },
    '2019-12-31': {
      '1. open': '289.0300',
      '2. high': '297.5100',
      '3. low': '282.1000',
      '4. close': '295.8000',
      '5. volume': '56493484',
    },
    '2019-11-29': {
      '1. open': '280.0500',
      '2. high': '289.7800',
      '3. low': '279.9100',
      '4. close': '288.6500',
      '5. volume': '43805096',
    },
    '2019-10-31': {
      '1. open': '273.4400',
      '2. high': '279.6900',
      '3. low': '261.5900',
      '4. close': '278.5500',
      '5. volume': '52914243',
    },
    '2019-09-30': {
      '1. open': '266.8300',
      '2. high': '277.9800',
      '3. low': '265.6800',
      '4. close': '272.6000',
      '5. volume': '45908331',
    },
    '2019-08-30': {
      '1. open': '273.2800',
      '2. high': '276.2800',
      '3. low': '258.7000',
      '4. close': '268.6000',
      '5. volume': '76712465',
    },
    '2019-07-31': {
      '1. open': '272.4600',
      '2. high': '277.5500',
      '3. low': '270.3000',
      '4. close': '273.0800',
      '5. volume': '55504714',
    },
    '2019-06-28': {
      '1. open': '252.8300',
      '2. high': '272.7900',
      '3. low': '250.7700',
      '4. close': '269.1500',
      '5. volume': '48687588',
    },
    '2019-05-31': {
      '1. open': '270.6800',
      '2. high': '270.8700',
      '3. low': '252.7700',
      '4. close': '252.8700',
      '5. volume': '72319825',
    },
    '2019-04-30': {
      '1. open': '261.4600',
      '2. high': '270.4100',
      '3. low': '261.1900',
      '4. close': '270.0100',
      '5. volume': '41356493',
    },
    '2019-03-29': {
      '1. open': '257.8100',
      '2. high': '262.5900',
      '3. low': '250.3400',
      '4. close': '259.5400',
      '5. volume': '62971771',
    },
    '2019-02-28': {
      '1. open': '248.3100',
      '2. high': '258.6100',
      '3. low': '246.2000',
      '4. close': '256.0700',
      '5. volume': '57657355',
    },
    '2019-01-31': {
      '1. open': '226.1800',
      '2. high': '248.5300',
      '3. low': '223.9700',
      '4. close': '248.0100',
      '5. volume': '81248101',
    },
    '2018-12-31': {
      '1. open': '257.6500',
      '2. high': '257.7400',
      '3. low': '214.8300',
      '4. close': '229.8100',
      '5. volume': '128542134',
    },
    '2018-11-30': {
      '1. open': '249.6300',
      '2. high': '258.4400',
      '3. low': '241.7300',
      '4. close': '253.4800',
      '5. volume': '61115981',
    },
    '2018-10-31': {
      '1. open': '268.4600',
      '2. high': '269.4700',
      '3. low': '238.7900',
      '4. close': '248.7900',
      '5. volume': '91440664',
    },
    '2018-09-28': {
      '1. open': '266.3500',
      '2. high': '270.6700',
      '3. low': '263.4500',
      '4. close': '267.0500',
      '5. volume': '48733249',
    },
    '2018-08-31': {
      '1. open': '258.6400',
      '2. high': '268.0500',
      '3. low': '256.4800',
      '4. close': '266.7200',
      '5. volume': '49557399',
    },
    '2018-07-31': {
      '1. open': '247.5600',
      '2. high': '261.2500',
      '3. low': '247.3200',
      '4. close': '258.4000',
      '5. volume': '45590887',
    },
    '2018-06-29': {
      '1. open': '250.2300',
      '2. high': '256.7700',
      '3. low': '246.6300',
      '4. close': '249.5100',
      '5. volume': '54661028',
    },
    '2018-05-31': {
      '1. open': '242.4500',
      '2. high': '251.9400',
      '3. low': '237.9200',
      '4. close': '248.7900',
      '5. volume': '43982726',
    },
    '2018-04-30': {
      '1. open': '241.1900',
      '2. high': '249.2200',
      '3. low': '233.9200',
      '4. close': '242.9200',
      '5. volume': '57321176',
    },
    '2018-03-29': {
      '1. open': '249.5300',
      '2. high': '257.7100',
      '3. low': '237.5300',
      '4. close': '242.0800',
      '5. volume': '63874271',
    },
    '2018-02-28': {
      '1. open': '258.2900',
      '2. high': '260.1200',
      '3. low': '232.4200',
      '4. close': '249.3400',
      '5. volume': '88662613',
    },
    '2018-01-31': {
      '1. open': '246.1500',
      '2. high': '263.3700',
      '3. low': '245.7400',
      '4. close': '258.9900',
      '5. volume': '63556077',
    },
    '2017-12-29': {
      '1. open': '243.2500',
      '2. high': '248.0100',
      '3. low': '239.5200',
      '4. close': '245.2900',
      '5. volume': '44188882',
    },
    '2017-11-30': {
      '1. open': '237.0300',
      '2. high': '244.4000',
      '3. low': '234.8200',
      '4. close': '243.3500',
      '5. volume': '43297760',
    },
    '2017-10-31': {
      '1. open': '231.0000',
      '2. high': '236.8800',
      '3. low': '230.9100',
      '4. close': '236.1300',
      '5. volume': '33049401',
    },
    '2017-09-29': {
      '1. open': '227.7600',
      '2. high': '230.9000',
      '3. low': '224.9800',
      '4. close': '230.7600',
      '5. volume': '33379043',
    },
    '2017-08-31': {
      '1. open': '227.3000',
      '2. high': '228.6200',
      '3. low': '222.1200',
      '4. close': '227.3000',
      '5. volume': '37614775',
    },
    '2017-07-31': {
      '1. open': '223.0900',
      '2. high': '227.7800',
      '3. low': '220.7200',
      '4. close': '226.6400',
      '5. volume': '37713634',
    },
    '2017-06-30': {
      '1. open': '222.1400',
      '2. high': '225.7650',
      '3. low': '220.4191',
      '4. close': '222.0600',
      '5. volume': '43548871',
    },
    '2017-05-31': {
      '1. open': '219.1600',
      '2. high': '222.2400',
      '3. low': '216.1301',
      '4. close': '221.6700',
      '5. volume': '40645231',
    },
    '2017-04-28': {
      '1. open': '216.5100',
      '2. high': '219.8979',
      '3. low': '213.4700',
      '4. close': '218.6000',
      '5. volume': '39163153',
    },
    '2017-03-31': {
      '1. open': '218.9000',
      '2. high': '220.6600',
      '3. low': '212.6200',
      '4. close': '216.3500',
      '5. volume': '47635680',
    },
    '2017-02-28': {
      '1. open': '209.6200',
      '2. high': '217.8956',
      '3. low': '208.2300',
      '4. close': '217.0700',
      '5. volume': '35461170',
    },
    '2017-01-31': {
      '1. open': '206.6800',
      '2. high': '210.9000',
      '3. low': '205.5600',
      '4. close': '208.9700',
      '5. volume': '57281277',
    },
    '2016-12-30': {
      '1. open': '202.6800',
      '2. high': '209.7000',
      '3. low': '201.2400',
      '4. close': '205.3100',
      '5. volume': '52288794',
    },
    '2016-11-30': {
      '1. open': '195.5200',
      '2. high': '203.6920',
      '3. low': '191.3200',
      '4. close': '202.4000',
      '5. volume': '52717518',
    },
    '2016-10-31': {
      '1. open': '198.1800',
      '2. high': '198.9500',
      '3. low': '193.9200',
      '4. close': '195.1300',
      '5. volume': '33928914',
    },
    '2016-09-30': {
      '1. open': '199.5000',
      '2. high': '201.1500',
      '3. low': '194.1200',
      '4. close': '198.6900',
      '5. volume': '44972180',
    },
    '2016-08-31': {
      '1. open': '199.3300',
      '2. high': '201.5100',
      '3. low': '196.8800',
      '4. close': '199.5200',
      '5. volume': '43950860',
    },
    '2016-07-29': {
      '1. open': '192.0900',
      '2. high': '199.6000',
      '3. low': '189.9700',
      '4. close': '199.2800',
      '5. volume': '41943696',
    },
    '2016-06-30': {
      '1. open': '191.8800',
      '2. high': '194.9500',
      '3. low': '182.2700',
      '4. close': '192.2000',
      '5. volume': '61820387',
    },
    '2016-05-31': {
      '1. open': '189.8100',
      '2. high': '193.2700',
      '3. low': '185.9700',
      '4. close': '192.5400',
      '5. volume': '38143184',
    },
    '2016-04-29': {
      '1. open': '187.4000',
      '2. high': '193.4300',
      '3. low': '186.2600',
      '4. close': '189.2200',
      '5. volume': '42411514',
    },
    '2016-03-31': {
      '1. open': '178.8400',
      '2. high': '189.7200',
      '3. low': '178.3300',
      '4. close': '188.5600',
      '5. volume': '50006524',
    },
    '2016-02-29': {
      '1. open': '176.6100',
      '2. high': '180.3600',
      '3. low': '166.0500',
      '4. close': '177.3800',
      '5. volume': '54703609',
    },
    '2016-01-29': {
      '1. open': '183.7700',
      '2. high': '185.1150',
      '3. low': '165.9600',
      '4. close': '177.7500',
      '5. volume': '82600328',
    },
    '2015-12-31': {
      '1. open': '192.0500',
      '2. high': '193.4462',
      '3. low': '183.3100',
      '4. close': '186.9300',
      '5. volume': '62484546',
    },
    '2015-11-30': {
      '1. open': '190.9800',
      '2. high': '194.0600',
      '3. low': '185.3600',
      '4. close': '191.3700',
      '5. volume': '38628911',
    },
    '2015-10-30': {
      '1. open': '175.9700',
      '2. high': '192.0000',
      '3. low': '173.3500',
      '4. close': '190.5600',
      '5. volume': '38175215',
    },
    '2015-09-30': {
      '1. open': '177.1100',
      '2. high': '185.9900',
      '3. low': '171.3601',
      '4. close': '175.7100',
      '5. volume': '57336788',
    },
    '2015-08-31': {
      '1. open': '193.0000',
      '2. high': '193.7500',
      '3. low': '168.0800',
      '4. close': '181.1100',
      '5. volume': '75865612',
    },
    '2015-07-31': {
      '1. open': '190.6500',
      '2. high': '195.4600',
      '3. low': '187.1900',
      '4. close': '192.9500',
      '5. volume': '35082721',
    },
    '2015-06-30': {
      '1. open': '194.2300',
      '2. high': '195.5300',
      '3. low': '188.2400',
      '4. close': '188.8400',
      '5. volume': '32509149',
    },
    '2015-05-29': {
      '1. open': '191.9600',
      '2. high': '195.9500',
      '3. low': '189.5300',
      '4. close': '193.4900',
      '5. volume': '25759190',
    },
    '2015-04-30': {
      '1. open': '189.1700',
      '2. high': '194.7400',
      '3. low': '187.4700',
      '4. close': '191.1000',
      '5. volume': '30250181',
    },
    '2015-03-31': {
      '1. open': '193.3100',
      '2. high': '194.4700',
      '3. low': '187.1500',
      '4. close': '189.2000',
      '5. volume': '35630044',
    },
    '2015-02-27': {
      '1. open': '183.5000',
      '2. high': '194.6500',
      '3. low': '181.4700',
      '4. close': '193.2000',
      '5. volume': '30736282',
    },
    '2015-01-30': {
      '1. open': '189.2900',
      '2. high': '189.7200',
      '3. low': '182.0868',
      '4. close': '182.9900',
      '5. volume': '51626988',
    },
    '2014-12-31': {
      '1. open': '189.2900',
      '2. high': '191.6340',
      '3. low': '181.4400',
      '4. close': '188.4000',
      '5. volume': '49040173',
    },
    '2014-11-28': {
      '1. open': '185.2000',
      '2. high': '190.6300',
      '3. low': '183.4500',
      '4. close': '190.0300',
      '5. volume': '27698042',
    },
    '2014-10-31': {
      '1. open': '180.3400',
      '2. high': '185.0500',
      '3. low': '166.8500',
      '4. close': '184.9300',
      '5. volume': '47155466',
    },
    '2014-09-30': {
      '1. open': '184.3000',
      '2. high': '185.8400',
      '3. low': '179.7700',
      '4. close': '180.5900',
      '5. volume': '17064009',
    },
    '2014-08-29': {
      '1. open': '176.5200',
      '2. high': '184.1700',
      '3. low': '174.7000',
      '4. close': '183.9900',
      '5. volume': '23864300',
    },
    '2014-07-31': {
      '1. open': '179.8800',
      '2. high': '182.5000',
      '3. low': '176.9600',
      '4. close': '176.9600',
      '5. volume': '18901400',
    },
    '2014-06-30': {
      '1. open': '176.8300',
      '2. high': '180.5700',
      '3. low': '175.9440',
      '4. close': '179.4300',
      '5. volume': '19356700',
    },
    '2014-05-30': {
      '1. open': '172.5000',
      '2. high': '176.6900',
      '3. low': '170.4400',
      '4. close': '176.5500',
      '5. volume': '20604100',
    },
    '2014-04-30': {
      '1. open': '171.8700',
      '2. high': '173.8200',
      '3. low': '166.1121',
      '4. close': '172.5900',
      '5. volume': '27491700',
    },
    '2014-03-31': {
      '1. open': '169.1900',
      '2. high': '173.1890',
      '3. low': '168.3800',
      '4. close': '171.3500',
      '5. volume': '24621000',
    },
    '2014-02-28': {
      '1. open': '163.0200',
      '2. high': '171.4690',
      '3. low': '159.1800',
      '4. close': '170.6300',
      '5. volume': '24164200',
    },
    '2014-01-31': {
      '1. open': '168.5300',
      '2. high': '169.4300',
      '3. low': '162.0700',
      '4. close': '163.1800',
      '5. volume': '29636000',
    },
    '2013-12-31': {
      '1. open': '165.9500',
      '2. high': '169.2300',
      '3. low': '162.0100',
      '4. close': '169.1500',
      '5. volume': '31082700',
    },
    '2013-11-29': {
      '1. open': '161.2800',
      '2. high': '166.5100',
      '3. low': '160.1000',
      '4. close': '165.7000',
      '5. volume': '26113000',
    },
    '2013-10-31': {
      '1. open': '77.0200',
      '2. high': '162.6200',
      '3. low': '75.3600',
      '4. close': '160.8800',
      '5. volume': '59089200',
    },
    '2013-09-30': {
      '1. open': '75.6600',
      '2. high': '79.5200',
      '3. low': '74.9700',
      '4. close': '77.0000',
      '5. volume': '46964600',
    },
    '2013-08-30': {
      '1. open': '77.8400',
      '2. high': '78.3090',
      '3. low': '74.6700',
      '4. close': '74.8500',
      '5. volume': '29719000',
    },
    '2013-07-31': {
      '1. open': '73.8699',
      '2. high': '77.8068',
      '3. low': '73.3800',
      '4. close': '77.2300',
      '5. volume': '33382600',
    },
    '2013-06-28': {
      '1. open': '75.0300',
      '2. high': '76.0000',
      '3. low': '71.3300',
      '4. close': '73.3400',
      '5. volume': '52017600',
    },
    '2013-05-31': {
      '1. open': '72.9600',
      '2. high': '77.4260',
      '3. low': '72.3900',
      '4. close': '74.8400',
      '5. volume': '28131200',
    },
    '2013-04-30': {
      '1. open': '71.7000',
      '2. high': '73.1400',
      '3. low': '70.2900',
      '4. close': '73.1400',
      '5. volume': '37696800',
    },
    '2013-03-28': {
      '1. open': '69.1600',
      '2. high': '71.8100',
      '3. low': '68.8700',
      '4. close': '71.6400',
      '5. volume': '29218000',
    },
    '2013-02-28': {
      '1. open': '68.9900',
      '2. high': '70.1800',
      '3. low': '68.1100',
      '4. close': '69.4700',
      '5. volume': '33837600',
    },
    '2013-01-31': {
      '1. open': '66.4700',
      '2. high': '69.1000',
      '3. low': '66.2800',
      '4. close': '68.5600',
      '5. volume': '37857200',
    },
    '2012-12-31': {
      '1. open': '65.3700',
      '2. high': '66.6600',
      '3. low': '63.9000',
      '4. close': '65.1900',
      '5. volume': '23459000',
    },
    '2012-11-30': {
      '1. open': '64.8600',
      '2. high': '65.7900',
      '3. low': '61.6900',
      '4. close': '65.0000',
      '5. volume': '18781000',
    },
    '2012-10-31': {
      '1. open': '66.1500',
      '2. high': '67.3600',
      '3. low': '64.2700',
      '4. close': '64.6300',
      '5. volume': '15642200',
    },
    '2012-09-28': {
      '1. open': '64.5700',
      '2. high': '67.7900',
      '3. low': '64.1200',
      '4. close': '65.9200',
      '5. volume': '16113400',
    },
    '2012-08-31': {
      '1. open': '63.4400',
      '2. high': '65.4700',
      '3. low': '62.0400',
      '4. close': '64.6100',
      '5. volume': '16474800',
    },
    '2012-07-31': {
      '1. open': '62.4500',
      '2. high': '63.7300',
      '3. low': '60.6600',
      '4. close': '63.0300',
      '5. volume': '16965000',
    },
    '2012-06-29': {
      '1. open': '59.1700',
      '2. high': '62.6500',
      '3. low': '58.1715',
      '4. close': '62.2800',
      '5. volume': '15118800',
    },
    '2012-05-31': {
      '1. open': '63.9800',
      '2. high': '64.8000',
      '3. low': '59.2766',
      '4. close': '60.1200',
      '5. volume': '20885400',
    },
    '2012-04-30': {
      '1. open': '64.3700',
      '2. high': '65.0600',
      '3. low': '62.1100',
      '4. close': '63.9600',
      '5. volume': '19240200',
    },
    '2012-03-30': {
      '1. open': '62.8200',
      '2. high': '64.9199',
      '3. low': '61.4500',
      '4. close': '64.3700',
      '5. volume': '20129000',
    },
    '2012-02-29': {
      '1. open': '60.5000',
      '2. high': '63.1976',
      '3. low': '60.4300',
      '4. close': '62.5900',
      '5. volume': '10331200',
    },
    '2012-01-31': {
      '1. open': '58.4500',
      '2. high': '61.0000',
      '3. low': '57.8400',
      '4. close': '60.0200',
      '5. volume': '8812200',
    },
    '2011-12-30': {
      '1. open': '57.0700',
      '2. high': '59.0800',
      '3. low': '55.2200',
      '4. close': '57.4500',
      '5. volume': '15831000',
    },
    '2011-11-30': {
      '1. open': '55.7700',
      '2. high': '58.5100',
      '3. low': '53.1500',
      '4. close': '57.1500',
      '5. volume': '10076400',
    },
    '2011-10-31': {
      '1. open': '51.4100',
      '2. high': '59.1500',
      '3. low': '49.1200',
      '4. close': '57.3200',
      '5. volume': '16779600',
    },
    '2011-09-30': {
      '1. open': '55.8700',
      '2. high': '56.4000',
      '3. low': '51.1900',
      '4. close': '51.7600',
      '5. volume': '9141200',
    },
    '2011-08-31': {
      '1. open': '59.8900',
      '2. high': '59.9100',
      '3. low': '50.4600',
      '4. close': '55.8400',
      '5. volume': '18848800',
    },
    '2011-07-29': {
      '1. open': '60.3700',
      '2. high': '62.0500',
      '3. low': '58.7200',
      '4. close': '59.1000',
      '5. volume': '5953800',
    },
    '2011-06-30': {
      '1. open': '61.5200',
      '2. high': '61.5200',
      '3. low': '57.7700',
      '4. close': '60.3400',
      '5. volume': '5098400',
    },
    '2011-05-31': {
      '1. open': '62.7200',
      '2. high': '62.7200',
      '3. low': '60.0800',
      '4. close': '61.6700',
      '5. volume': '4909400',
    },
    '2011-04-29': {
      '1. open': '61.0600',
      '2. high': '62.4400',
      '3. low': '59.2201',
      '4. close': '62.4000',
      '5. volume': '4603600',
    },
    '2011-03-31': {
      '1. open': '61.1400',
      '2. high': '61.1500',
      '3. low': '57.3200',
      '4. close': '60.6200',
      '5. volume': '7732000',
    },
    '2011-02-28': {
      '1. open': '59.2400',
      '2. high': '61.6100',
      '3. low': '59.1900',
      '4. close': '60.8900',
      '5. volume': '5522000',
    },
    '2011-01-31': {
      '1. open': '57.9700',
      '2. high': '59.6100',
      '3. low': '57.7400',
      '4. close': '58.8500',
      '5. volume': '8803000',
    },
    '2010-12-31': {
      '1. open': '54.9600',
      '2. high': '57.8000',
      '3. low': '54.9400',
      '4. close': '57.5700',
      '5. volume': '3339400',
    },
    '2010-11-30': {
      '1. open': '54.4600',
      '2. high': '56.1500',
      '3. low': '53.7372',
      '4. close': '54.0900',
      '5. volume': '2139800',
    },
    '2010-10-29': {
      '1. open': '52.5400',
      '2. high': '54.6400',
      '3. low': '51.7500',
      '4. close': '54.1500',
      '5. volume': '1902200',
    },
  },
};

const LineChart: React.FC<chartProps> = ({
  stockDetails,
  stockData,
  dates,
  months,
}) => {
  const [prices, setPrices] = useState<string[] | null>(null);

  useEffect(() => {
    console.log(stockData, stockDetails, dates);
    let temp: any = [];
    for (const [key, value] of Object.entries(stockData)) {
      const item: any = value;
      temp.push(item['4. close']);
    }
    setPrices(temp);
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
  };
  const labels = dates
    .slice(dates.length - (months + 1), dates.length - 1)
    .map((datestring: string) => {
      return format(new Date(datestring), 'MMM/yy');
    });

  const data = {
    labels,
    datasets: [
      {
        label: `${stockDetails['2. Symbol']}`,
        data: prices
          ?.reverse()
          .slice(prices.length - (months + 1), prices.length - 1),
        borderColor: 'rgb(96,165,250)',
        fill: true,
        backgroundColor: 'rgba(96,165,250, 0.2)',
        tension: 0.15,
      },
    ],
  };

  console.log(stockDetails, dates, prices);
  return <Line options={options} data={data} />;
};

export default LineChart;