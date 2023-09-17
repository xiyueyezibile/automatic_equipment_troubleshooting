import { Box, Center, Flex } from '@chakra-ui/react';
import * as echarts from 'echarts';
import ReactECharts from 'echarts-for-react';
import { Factory } from '../../types';
import { useEffect, useState } from 'react';

const Content = ({ currentID, factory }: { currentID: number; factory: Factory[] }) => {
  const [total, setTotal] = useState(0);
  const [fen1, setFen1] = useState<{
    id?: string;
    count?: number;
    children: { failure_type: string; failure_count: number }[];
  }>({ id: '1', count: 0, children: [{ failure_type: 'Failure', failure_count: 0 }] });
  const [fen2, setFen2] = useState<{
    id?: string;
    count?: number;
    children: { failure_type: string; failure_count: number }[];
  }>({ id: '1', count: 0, children: [{ failure_type: 'Failure', failure_count: 0 }] });
  const [fen3, setFen3] = useState<{
    id?: string;
    count?: number;
    children: { failure_type: string; failure_count: number }[];
  }>({ id: '1', count: 0, children: [{ failure_type: 'Failure', failure_count: 0 }] });
  const [fen4, setFen4] = useState<{
    id?: string;
    count?: number;
    children: { failure_type: string; failure_count: number }[];
  }>({ id: '1', count: 0, children: [{ failure_type: 'Failure', failure_count: 0 }] });
  const [ze, setZe] = useState<number[]>();
  // 配置项
  const pie = {
    title: {
      text: `工厂发生故障总数为 ${total}`,
      textStyle: {
        color: '#fff'
      },
      subtext: '不同车间发生故障占总次数比例',
      subtextStyle: {
        color: '#fff'
      }
    },
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        type: 'pie',
        data: factory.map((item, i) => {
          // console.log(fen1, fen2, fen3, fen4);

          return {
            value: i === 0 ? fen1.count : i === 1 ? fen2.count : i === 2 ? fen3.count : fen4.count,
            name: item.name
          };
        }),
        radius: '50%'
      }
    ]
  };
  const Xbar: { type: string; count: number }[] = [];
  fen1.children?.forEach((item) => {
    if (
      !Xbar.filter((it) => {
        if (!it) return false;
        return it.type === item.failure_type;
      })[0]
    ) {
      Xbar.push({ type: item.failure_type, count: item.failure_count });
    } else {
      Xbar.forEach((it) => {
        if (it.type === item.failure_type) {
          it.count += item.failure_count;
        }
      });
    }
  });
  fen2.children?.forEach((item) => {
    if (
      !Xbar.filter((it) => {
        if (!it) return false;
        return it.type === item.failure_type;
      })[0]
    ) {
      Xbar.push({ type: item.failure_type, count: item.failure_count });
    } else {
      Xbar.forEach((it) => {
        if (it.type === item.failure_type) {
          it.count += item.failure_count;
        }
      });
    }
  });
  fen3.children?.forEach((item) => {
    if (
      !Xbar.filter((it) => {
        if (!it) return false;
        return it.type === item.failure_type;
      })[0]
    ) {
      Xbar.push({ type: item.failure_type, count: item.failure_count });
    } else {
      Xbar.forEach((it) => {
        if (it.type === item.failure_type) {
          it.count += item.failure_count;
        }
      });
    }
  });
  fen4.children?.forEach((item) => {
    if (
      !Xbar.filter((it) => {
        if (!it) return false;
        return it.type === item.failure_type;
      })[0]
    ) {
      Xbar.push({ type: item.failure_type, count: item.failure_count });
    } else {
      Xbar.forEach((it) => {
        if (it.type === item.failure_type) {
          it.count += item.failure_count;
        }
      });
    }
  });
  // console.log(Xbar);

  const bar = {
    title: {
      text: '不同类型故障发生次数',
      left: 'center',
      textStyle: {
        color: '#fff'
      }
    },
    xAxis: {
      data:
        currentID === 9999
          ? Xbar.map((item) => item.type)
          : currentID % 10 === 0
          ? fen1.children.map((it) => it.failure_type)
          : currentID % 10 === 1
          ? fen2.children.map((it) => it.failure_type)
          : currentID % 10 === 2
          ? fen3.children.map((it) => it.failure_type)
          : fen4.children.map((it) => it.failure_type),
      splitLine: {
        show: false
      },
      nameTextStyle: {
        color: '#f4f4f4'
      },
      axisLine: {
        lineStyle: { color: '#f4f4f4' }
      },
      axisTick: {
        interval: 0
      },
      axisLabel: {
        interval: 0,
        rotate: 30
      }
    },
    yAxis: {
      splitLine: {
        show: false
      },
      nameTextStyle: {
        color: '#f4f4f4'
      },
      axisLine: {
        lineStyle: { color: '#f4f4f4' },
        show: true
      }
    },
    color: ['#fac858', '#91cc75'],
    series: [
      {
        type: 'bar',
        data:
          currentID === 9999
            ? Xbar.map((item) => item.count)
            : currentID % 10 === 0
            ? fen1.children.map((it) => it.failure_count)
            : currentID % 10 === 1
            ? fen2.children.map((it) => it.failure_count)
            : currentID % 10 === 2
            ? fen3.children.map((it) => it.failure_count)
            : fen4.children.map((it) => it.failure_count),
        colorBy: 'data'
      }
    ]
  };
  const category = {
    title:
      parseInt(currentID / 1000 + '') % 10 === 8
        ? {
            text: `${factory[currentID % 10].name}发生故障总数为 ${
              currentID % 10 === 0
                ? fen1.count
                : currentID % 10 === 1
                ? fen2.count
                : currentID % 10 === 2
                ? fen3.count
                : fen4.count
            }`,
            textStyle: {
              color: '#fff'
            },
            subtext: '工厂各月发生故障次数',
            subtextStyle: {
              color: '#fff'
            }
          }
        : {
            text: '工厂各月发生故障次数',
            textStyle: {
              color: '#fff'
            }
          },

    xAxis: {
      type: 'category',
      data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
      splitLine: {
        show: false
      },
      nameTextStyle: {
        color: '#f4f4f4'
      },
      axisTick: {
        interval: 0
      },
      axisLine: {
        lineStyle: { color: '#f4f4f4' }
      }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: false
      },
      nameTextStyle: {
        color: '#f4f4f4'
      },
      axisLine: {
        lineStyle: { color: '#f4f4f4' },
        show: true
      }
    },

    series: [
      {
        data: ze,
        type: 'line'
      }
    ]
  };
  const graph =
    parseInt(currentID / 1000 + '') % 10 === 8
      ? {
          title: {
            text: '流水线示意图',
            textStyle: {
              color: '#fff'
            }
          },
          tooltip: { trigger: 'item' },
          animationDurationUpdate: 1500,
          animationEasingUpdate: 'quinticInOut',
          series: [
            {
              type: 'graph',
              layout: 'none',
              symbolSize: 20,
              roam: true,
              label: {
                show: false
              },
              edgeSymbol: ['circle', 'arrow'],
              edgeSymbolSize: [4, 10],
              edgeLabel: {
                fontSize: 20
              },
              data: factory[currentID % 10].children
                .map((item, i) => {
                  return {
                    name: item.name,
                    x: 100 + i * 100,
                    y: 50 + parseInt(i / 5 + '') * 100
                  };
                })
                .slice(0, 10),
              // links: [],
              links: factory[currentID % 10].children
                .map((_, i, arr) => {
                  return {
                    source: arr[i].name,
                    target: arr[i + 1 === arr.length ? 0 : i + 1].name
                  };
                })
                .slice(0, 10),
              lineStyle: {
                opacity: 0.9,
                width: 2,
                curveness: 0
              }
            }
          ]
        }
      : undefined;
  useEffect(() => {
    if (currentID === 9999) {
      fetch('/api/aet/equipment-failure/total')
        .then((res) => res.json())
        .then((res) => {
          setTotal(res.data.count);
        });
      [
        { name: factory[0].name, value: 1 },
        { name: factory[1].name, value: 2 },
        { name: factory[2].name, value: 3 },
        { name: factory[3].name, value: 4 }
      ].map((item) => {
        fetch(`/api/aet/equipment-failure/workshop-type-count?workshopNumber=${item.value}`)
          .then((res) => res.json())
          .then((res) => {
            // console.log(res);
            let count = 0;
            res.forEach((item: { failure_count: number }) => {
              count += item.failure_count;
            });
            // console.log(count);

            switch (item.value) {
              case 1:
                setFen1({ id: item.name, count: count, children: res });
                break;
              case 2:
                setFen2({ id: item.name, count: count, children: res });
                break;
              case 3:
                setFen3({ id: item.name, count: count, children: res });
                break;
              case 4:
                setFen4({ id: item.name, count: count, children: res });
                break;
              default:
                break;
            }
          });
      });
      fetch('/api/aet/equipment-failure/factory-month-count')
        .then((res) => res.json())
        .then((res) => {
          // console.log(res);
          const f = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          res.forEach((item: { month: string; failure_count: number }) => {
            const W = {
              '01': 0,
              '02': 1,
              '03': 2,
              '04': 3,
              '05': 4,
              '06': 5,
              '07': 6,
              '08': 7,
              '09': 8,
              '10': 9,
              '11': 10,
              '12': 11
            };
            // @ts-ignore 11
            f[W[item.month.split('-')[1]]] += item.failure_count;
          });
          setZe(f);
        });
    } else if (currentID !== 0) {
      fetch(`/api/aet/equipment-failure/factory-month-count?workshopNumber=${(currentID % 10) + 1}`)
        .then((res) => res.json())
        .then((res) => {
          const f = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          res.forEach((item: { month: string; failure_count: number }) => {
            const W = {
              '01': 0,
              '02': 1,
              '03': 2,
              '04': 3,
              '05': 4,
              '06': 5,
              '07': 6,
              '08': 7,
              '09': 8,
              '10': 9,
              '11': 10,
              '12': 11
            };
            // @ts-ignore 11
            f[W[item.month.split('-')[1]]] += item.failure_count;
          });
          setZe(f);
        });
    }
    console.log('currentID', currentID);
  }, [currentID]);
  // console.log(currentID % 10, currentID);

  return (
    <Box w={'100%'}>
      {currentID === 9999 ? (
        <>
          <Flex justifyContent={'space-around'} flexWrap={'wrap'} w={'100%'} h={'50%'}>
            <ReactECharts key={1} style={{ width: 370, height: 200 }} option={pie} echarts={echarts} />
            <ReactECharts key={2} style={{ width: 400, height: 200 }} option={bar} echarts={echarts} />
          </Flex>
          <Flex justifyContent={'space-around'} flexWrap={'wrap'} w={'100%'} h={'50%'}>
            <ReactECharts key={1} style={{ width: 370, height: 200 }} option={category} echarts={echarts} />
            <ReactECharts key={2} style={{ width: 400, height: 200 }} option={bar} echarts={echarts} />
          </Flex>
        </>
      ) : undefined}
      {parseInt(currentID / 1000 + '') % 10 === 8 ? (
        <>
          <Flex justifyContent={'space-around'} flexWrap={'wrap'} w={'100%'} h={'50%'}>
            <ReactECharts key={1} style={{ width: 370, height: 200 }} option={category} echarts={echarts} />
            <ReactECharts key={2} style={{ width: 400, height: 200 }} option={bar} echarts={echarts} />
          </Flex>
          <ReactECharts style={{ width: 700, height: 200 }} option={graph} echarts={echarts} />
        </>
      ) : undefined}
      {currentID === 0 ? (
        <Center color={'#f4f4f4'} w={'100%'} h={'100%'}>
          这里什么都没有哦！
        </Center>
      ) : undefined}
    </Box>
  );
};

export default Content;
