import Web3 from 'web3';
import Pooldao from '../Pooldao';

import { TEST_OPERATOR, TEST } from './testAccounts';

describe('operator', () => {
  let pooldao: Pooldao;
  const Ether = Math.pow(10, 18);

  beforeAll(async () => {
    jest.setTimeout(1000000);

    pooldao = new Pooldao({
      provider: new Web3.providers.HttpProvider('http://47.106.144.61:8545'),
      proxyAddress: '0x260Cf0651d02f8139754194Cd3D67CAde3B36b94'
    });

    await pooldao.init();
  });

  it('createOperator', async () => {
    const sendMethod = pooldao.operator.createOperator('哈哈哈哈1');

    const result = await sendMethod.send({
      from: TEST[7],
      gas: 1000000
    });

    console.log(result);
  });

  it('createNode', async () => {
    const result = await pooldao.operator.createNode('77777', 3, 15).send({
      from: TEST[7],
      gas: 1000000000
    });

    expect(result.status).toBe(true);
  });

  it.only('initNode', async () => {
    const result = await pooldao.operator
      .initNode(
        '2',
        '0x2222222111111111111111111111111111111111',
        '0x3333333222222222222222222222222222222222',
        '0x4444444333333333333333333333333333333333',
        '0x5555555444444444444444444444444444444444'
      )
      .send({
        value: 0.5 * Ether,
        from: TEST[8],
        gas: 1000000
      });

    console.log(result);
  });

  it('revoked', async () => {
    const contract = await pooldao.getNodeContract('18');
    const result = await pooldao.operator.revoked(contract).send({
      from: TEST_OPERATOR,
      gas: 1000000000
    });
    console.log(result);
  });

  it('startStaking', async () => {
    const contract = await pooldao.getNodeContract('15');
    const result = await pooldao.operator.startStaking(contract).send({
      from: TEST_OPERATOR,
      gas: 1000000000
    });
    console.log(result);
  });
});
