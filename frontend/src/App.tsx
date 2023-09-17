import Sidebar from './components/Sidebar';
import './App.css';
import Content from './components/Content';
import { Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Factory, FactoryChildren } from './types';

function App() {
  const [id, setId] = useState(0);
  const [factory, setFactory] = useState<Factory[]>([
    { name: 'A', children: [] },
    { name: 'B', children: [] },
    { name: 'C', children: [] },
    { name: 'D', children: [] }
  ]);

  useEffect(() => {
    fetch('/api/aet/equipment/getEquipment')
      .then((res) => res.json())
      .then((res) => {
        const f: Factory[] = [
          { name: 'A', children: [] },
          { name: 'B', children: [] },
          { name: 'C', children: [] },
          { name: 'D', children: [] }
        ];
        res.forEach((item: FactoryChildren) => {
          f[item.workshopNumber - 1].children.push({
            id: item.field2.split('"')[3].split('\\')[0],
            name: item.field2.split('"')[7].split('\\')[0],
            status: item.equipmentState === 0 ? 'success' : item.equipmentState === 1 ? 'warning' : 'error',
            info: item.field2,
            data: item
          });
        });

        setFactory(f);
      });
  }, []);
  return (
    <Flex w={'100vw'}>
      <Sidebar
        factory={factory}
        changeID={(id: number) => {
          return () => {
            setId(id);
          };
        }}
      />
      <Content factory={factory} currentID={id} />
    </Flex>
  );
}

export default App;
