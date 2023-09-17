import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import {
  Alert,
  AlertIcon,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tooltip,
  Text,
  Box,
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Spinner
} from '@chakra-ui/react';
import { Status, Factory, FactoryChildren } from '../../types';
import { useEffect, useState } from 'react';

const Sidebar = ({ changeID, factory }: { changeID: Function; factory: Factory[] }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: enOpen, onOpen: open, onClose: enClose } = useDisclosure();
  const [message, setMessage] = useState<FactoryChildren[]>([]);
  const [currentMessage, setCurrentMessage] = useState<{ name: string; info: string } | null>(null);
  console.log(message, factory);

  const [model, setModel] = useState<{ name: string; info: string }>({
    name: '12',
    info: ''
  });
  let count = 0;
  const showModel = model.info
    .slice(1, model.info.length - 1)
    .split(',')
    .map((it) => {
      let t = '';
      for (let i = 0; i < count; i++) {
        t += '\t';
      }
      let at =
        t +
        it
          .replace('{', '{\n' + '\t' + t)
          .replace('}', '\n' + t.slice(0, t.length - 1) + '}')
          .replace('[', '[\n' + '\t' + '\t' + t)
          .replace(']', '\n' + t.slice(0, t.length - 1) + ']');
      for (let i = 0; i < it.length; i++) {
        if (it[i] === '{' || it[i] === '[') {
          count++;
        } else if (it[i] === '}' || it[i] === ']') {
          count--;
        }
      }

      return (
        <Text whiteSpace={'pre'}>
          {at}
          <br></br>
        </Text>
      );
    });
  const alertStatus: {
    name: string;
    data(data: any): BodyInit | null | undefined;
    id: number;
    text: string;
    status: Status;
  }[] = message
    .map((item) => {
      return {
        text: `${(item.info as string).split('"')[1].replace('\\', '')}:${(item.info as string)
          .split('"')[3]
          .replace('\\', '')} ${item.name}`,
        status: item.status,
        name: item.name,
        data: item.data
      };
    })
    .sort((a, b) => {
      let c = a.status === 'error' ? 1 : a.status === 'success' ? 3 : 2;
      let d = b.status === 'error' ? 1 : b.status === 'success' ? 3 : 2;
      return c - d;
    }) as {
    id: number;
    text: string;
    status: Status;
    name: string;
    data: any;
  }[];
  console.log(alertStatus, message);

  useEffect(() => {
    if (message.length !== 0) return;
    const f: FactoryChildren[] = [
      ...factory[0].children,
      ...factory[1].children,
      ...factory[2].children,
      ...factory[3].children
    ] as FactoryChildren[];
    setMessage(f.filter((it) => it.status !== 'success'));
  }, [message]);
  const AccordionItems = factory.map((item, itemi) => (
    <AccordionItem key={itemi}>
      {({ isExpanded }) => (
        <>
          <h2>
            <AccordionButton onClick={isExpanded ? undefined : changeID(itemi + 8000)}>
              <Box as="span" flex="1" textAlign="left">
                {item.name}车间
              </Box>
              {isExpanded ? <MinusIcon fontSize="12px" /> : <AddIcon fontSize="12px" />}
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Stack>
              {item.children.map((child, i) => (
                <Tooltip key={i} label={child.name}>
                  <Alert
                    status={child.status}
                    cursor={'pointer'}
                    onClick={() => {
                      setModel({ name: child.name, info: child.info as string });
                      onOpen();
                    }}
                    key={i + 1000}>
                    <Text color={'#121212'} overflow={'hidden'} textOverflow={'ellipsis'} whiteSpace={'nowrap'}>
                      {child.name}
                    </Text>
                  </Alert>
                </Tooltip>
              ))}
            </Stack>
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  ));
  return (
    <Tabs boxShadow={'base'} w={'30%'} minWidth={'150px'} h={'100vh'} overflow={'hidden'} isFitted>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent color={'#fff'} backgroundColor={'#253a7baa'}>
          <ModalHeader>{model ? model.name : ''}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{showModel}</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={enOpen} onClose={enClose}>
        <ModalOverlay />
        <ModalContent color={'#fff'} backgroundColor={'#253a7baa'}>
          <ModalHeader>{currentMessage ? currentMessage.name : <Spinner />}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{currentMessage ? currentMessage.info : <Spinner />}</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={enClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <TabList h={'10vh'} mb="1em">
        <Tab color={'#f4f4f4'}>消息</Tab>
        <Tab color={'#f4f4f4'} onClick={changeID(9999)}>
          工厂
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel padding={0} h={'90vh'} overflow={'auto'}>
          <Stack h={'100%'} marginLeft={'1vw'} marginRight={'1vw'} padding={0} spacing={2}>
            {alertStatus.map((item, i) => (
              <Tooltip key={i} label={item.text}>
                <Alert
                  status={item.status}
                  onClick={() => {
                    console.log('开始post');

                    fetch('/api/aet/equipment/getDetails', {
                      method: 'post',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(item.data)
                    })
                      .then((res) => res.json())
                      .then((res) => {
                        console.log(res);

                        setCurrentMessage({ name: item.name, info: res.data });
                      });
                    open();
                  }}
                  cursor={'pointer'}
                  key={item.id}>
                  <AlertIcon color={item.status === 'error' ? '#e53e3e' : '#dd6b20'} />
                  <Text overflow={'hidden'} color={'#121212'} textOverflow={'ellipsis'} whiteSpace={'nowrap'}>
                    {item.text}
                  </Text>
                </Alert>
              </Tooltip>
            ))}
          </Stack>
        </TabPanel>
        <TabPanel padding={0} h={'90vh'} overflow={'hidden'}>
          <Box overflow={'auto'} h={'80vh'}>
            <Stack
              h={'100%'}
              color={'#f4f4f4'}
              boxSizing={'border-box'}
              marginLeft={'1vw'}
              marginRight={'1vw'}
              padding={0}
              spacing={2}>
              <Accordion allowMultiple>{AccordionItems}</Accordion>
            </Stack>
          </Box>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default Sidebar;
