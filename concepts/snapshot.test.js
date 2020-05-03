import { generateConfig, generateAnotherConfig } from './snapshot';
/* 
  snapshot 快照测试
    1.测试内容：
      对某部分代码内容保存一个快照；
      运行测试时，使用初始生成的快照和新生成的快照进行比对；
    2.适用场景：
      a.配置文件的测试;
      b.UI 组件的测试；

*/
describe('Snapshot test', () => {
  test('generateConfig test', () => {
    expect(generateConfig()).toMatchSnapshot({
      time: expect.any(Date),
    });
  });

  test('generateAnotherConfig test', () => {
    expect(generateAnotherConfig()).toMatchSnapshot();
  });
});
