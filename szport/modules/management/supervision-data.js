// supervision-data.js — 工作督办数据（七阶段流程 V2.0）
(function() {
  'use strict';

  var SupervisionData = {

    // 统计卡片 — 对应 PRD §3.11.4.12 B「统计卡片展示」
    stats: { total: 28, draft: 2, pendingApproval: 3, pendingReceive: 2, executing: 5, pendingTransferConfirm: 1, pendingLiaisonReport: 2, pendingFeedbackReview: 3, pendingArchive: 2, archived: 6, overdue: 2 },

    // 任务类型字典 — 对应 PRD §3.11.4.7 步骤0「基础配置」
    taskTypes: [
      { code: 'daily', name: '日常任务', enabled: true },
      { code: 'special', name: '专项任务', enabled: true },
      { code: 'upper', name: '上级下达任务', enabled: true },
      { code: 'meeting', name: '安委会决议', enabled: true },
      { code: 'gov', name: '政府主管部门', enabled: false }
    ],

    // 督办对象单位
    units: ['集装箱码头公司', '危化品储运公司', '物流运输公司', '物业管理公司'],

    // 任务来源
    sources: ['安委会', '政府主管部门', '国资委', '集团本部', '本企业'],

    // 任务列表 — 覆盖所有状态
    taskList: [
      { id: 'sup-1', title: '落实集团安全生产大检查整改要求', type: '上级下达任务', priority: '紧急', priorityCls: 'priority-urgent', target: '集装箱码头公司', source: '集团本部', sourceCls: 'source-upper', executor: '张明（联络员）', deadline: '2026-06-20', status: '草稿', statusCls: 'tag-draft' },
      { id: 'sup-2', title: '危化品仓库消防隐患整改', type: '专项任务', priority: '重要', priorityCls: 'priority-high', target: '危化品储运公司', source: '本企业', sourceCls: 'source-local', executor: '—', deadline: '2026-06-10', status: '待审批', statusCls: 'tag-pending-approval' },
      { id: 'sup-3', title: '安全生产标准化建设达标验收', type: '日常任务', priority: '一般', priorityCls: 'priority-normal', target: '物流运输公司', source: '本企业', sourceCls: 'source-local', executor: '—', deadline: '2026-06-15', status: '待接收', statusCls: 'tag-pending-receive' },
      { id: 'sup-4', title: '上级安全督导检查问题整改', type: '上级下达任务', priority: '紧急', priorityCls: 'priority-urgent', target: '集装箱码头公司', source: '集团本部', sourceCls: 'source-upper', executor: '李强', deadline: '2026-05-20', status: '执行中', statusCls: 'tag-executing' },
      { id: 'sup-5', title: '特种设备定期检验整改落实', type: '日常任务', priority: '重要', priorityCls: 'priority-high', target: '危化品储运公司', source: '本企业', sourceCls: 'source-local', executor: '王伟（转派→赵磊）', deadline: '2026-05-25', status: '待转派人确认', statusCls: 'tag-transfer-confirm' },
      { id: 'sup-6', title: '港区道路交通安全整治', type: '专项任务', priority: '一般', priorityCls: 'priority-normal', target: '物流运输公司', source: '安委会', sourceCls: 'source-upper', executor: '陈华（联络员）', deadline: '2026-05-28', status: '待联络员上报', statusCls: 'tag-liaison-report' },
      { id: 'sup-7', title: '消防设施专项检查整改', type: '日常任务', priority: '重要', priorityCls: 'priority-high', target: '物业管理公司', source: '本企业', sourceCls: 'source-local', executor: '刘洋', deadline: '2026-05-18', status: '待反馈审核', statusCls: 'tag-feedback-review' },
      { id: 'sup-8', title: '应急预案修订与备案', type: '专项任务', priority: '一般', priorityCls: 'priority-normal', target: '集装箱码头公司', source: '政府主管部门', sourceCls: 'source-upper', executor: '周涛', deadline: '2026-05-12', status: '待归档', statusCls: 'tag-pending-archive' },
      { id: 'sup-9', title: '安全生产月活动落实', type: '专项任务', priority: '重要', priorityCls: 'priority-high', target: '物流运输公司', source: '国资委', sourceCls: 'source-upper', executor: '孙磊', deadline: '2026-04-30', status: '已归档', statusCls: 'tag-archived' },
      { id: 'sup-10', title: '危化品装卸作业安全管控', type: '上级下达任务', priority: '紧急', priorityCls: 'priority-urgent', target: '危化品储运公司', source: '集团本部', sourceCls: 'source-upper', executor: '何勇', deadline: '2026-05-10', status: '已逾期', statusCls: 'tag-overdue' }
    ],

    // 单位统计 — 对应 PRD §3.11.4.12 C「完成率统计」
    unitStats: [
      { name: '集装箱码头公司', total: 9, done: 5, executing: 2, overdue: 1, doneRate: '55.6%', overdueRate: '11.1%', doneCls: 'u-text-warning', overdueCls: 'u-text-error' },
      { name: '危化品储运公司', total: 7, done: 4, executing: 2, overdue: 1, doneRate: '57.1%', overdueRate: '14.3%', doneCls: 'u-text-warning', overdueCls: 'u-text-error' },
      { name: '物流运输公司', total: 6, done: 5, executing: 1, overdue: 0, doneRate: '83.3%', overdueRate: '0%', doneCls: 'u-text-success', overdueCls: 'u-text-success' },
      { name: '物业管理公司', total: 6, done: 3, executing: 2, overdue: 1, doneRate: '50.0%', overdueRate: '16.7%', doneCls: 'u-text-warning', overdueCls: 'u-text-error' }
    ],

    // 详情数据 — 时间线覆盖完整七阶段
    detailData: {
      'sup-1': {
        title: '落实集团安全生产大检查整改要求',
        basic: [
          ['任务类型', '上级下达任务'],
          ['督办对象', '集装箱码头公司'],
          ['来源', '集团本部'],
          ['当前执行人', '—'],
          ['截止日期', '2026-06-20'],
          ['状态', '草稿']
        ],
        desc: '集团安全生产大检查发现多项隐患，需各单位制定整改方案并限期落实。当前为草稿状态，待提交审批。',
        transferChain: [],
        timeline: [
          { status: 'active', time: '草稿中', event: '编辑督办任务', role: 'P07 安全工程师' }
        ]
      },
      'sup-2': {
        title: '危化品仓库消防隐患整改',
        basic: [
          ['任务类型', '专项任务'],
          ['督办对象', '危化品储运公司'],
          ['来源', '本企业'],
          ['当前执行人', '—'],
          ['截止日期', '2026-06-10'],
          ['状态', '待审批']
        ],
        desc: '危化品仓库消防设施老化，需限期整改更换。已提交审批，等待分管领导审批。',
        transferChain: [],
        timeline: [
          { status: 'done', time: '2026-05-20 09:00', event: 'P07 发起任务', role: 'P07 安全工程师' },
          { status: 'active', time: '待审批', event: 'P02 审批', role: 'P02 分管领导' }
        ]
      },
      'sup-3': {
        title: '安全生产标准化建设达标验收',
        basic: [
          ['任务类型', '日常任务'],
          ['督办对象', '物流运输公司'],
          ['来源', '本企业'],
          ['当前执行人', '—'],
          ['截止日期', '2026-06-15'],
          ['状态', '待接收']
        ],
        desc: '安全生产标准化建设验收在即，需物流运输公司落实各项达标要求。已审批通过，等待对象单位接收。',
        transferChain: [],
        timeline: [
          { status: 'done', time: '2026-05-15 10:00', event: 'P07 发起任务', role: 'P07 安全工程师' },
          { status: 'done', time: '2026-05-15 15:00', event: 'P02 审批通过', role: 'P02 分管领导' },
          { status: 'active', time: '待接收', event: '对象单位接收', role: 'P05 部门负责人' }
        ]
      },
      'sup-4': {
        title: '上级安全督导检查问题整改',
        basic: [
          ['任务类型', '上级下达任务'],
          ['督办对象', '集装箱码头公司'],
          ['来源', '集团本部'],
          ['当前执行人', '李强'],
          ['截止日期', '2026-05-20'],
          ['状态', '执行中']
        ],
        desc: '集团安全督导检查发现3项问题，要求限期整改。责任单位已制定整改方案，正在推进落实。',
        transferChain: [
          { from: '集团安办', to: '张明（联络员）', time: '2026-05-08 09:30', action: '接收任务' },
          { from: '张明（联络员）', to: '李强（安全员）', time: '2026-05-08 10:15', action: '转派至执行人' }
        ],
        timeline: [
          { status: 'done', time: '2026-05-07 14:00', event: '集团下发督办', role: 'P07 集团安办' },
          { status: 'done', time: '2026-05-08 09:30', event: '联络员接收', role: '张明（P07）' },
          { status: 'done', time: '2026-05-08 10:15', event: '转派至李强', role: '张明（联络员）' },
          { status: 'active', time: '进行中', event: '整改执行', role: '李强' }
        ]
      },
      'sup-5': {
        title: '特种设备定期检验整改落实',
        basic: [
          ['任务类型', '日常任务'],
          ['督办对象', '危化品储运公司'],
          ['来源', '本企业'],
          ['当前执行人', '赵磊（经转派）'],
          ['截止日期', '2026-05-25'],
          ['状态', '待转派人确认']
        ],
        desc: '执行人赵磊已提交反馈，等待转派人王伟确认后上报联络员。',
        transferChain: [
          { from: '陈华（联络员）', to: '王伟（部门负责人）', time: '2026-05-10 11:00', action: '转派至部门负责人' },
          { from: '王伟（部门负责人）', to: '赵磊（员工）', time: '2026-05-10 14:30', action: '转派至执行人' }
        ],
        timeline: [
          { status: 'done', time: '2026-05-08 09:00', event: 'P07 发起任务', role: 'P07 安全工程师' },
          { status: 'done', time: '2026-05-08 11:00', event: 'P02 审批通过', role: 'P02 分管领导' },
          { status: 'done', time: '2026-05-10 11:00', event: '联络员接收并转派', role: '陈华（联络员）' },
          { status: 'done', time: '2026-05-10 14:30', event: '王伟转派至赵磊', role: '王伟（P05）' },
          { status: 'done', time: '2026-05-20 16:00', event: '赵磊提交执行反馈', role: '赵磊（P08）' },
          { status: 'active', time: '待确认', event: '转派人确认', role: '王伟' }
        ]
      },
      'sup-6': {
        title: '港区道路交通安全整治',
        basic: [
          ['任务类型', '专项任务'],
          ['督办对象', '物流运输公司'],
          ['来源', '安委会'],
          ['当前执行人', '陈华（联络员）'],
          ['截止日期', '2026-05-28'],
          ['状态', '待联络员上报']
        ],
        desc: '安委会要求整治港区道路交通隐患，执行人已提交反馈，等待联络员确认上报。',
        transferChain: [
          { from: '孙琳（联络员）', to: '陈华（安全员）', time: '2026-05-12 09:30', action: '转派至执行人' }
        ],
        timeline: [
          { status: 'done', time: '2026-05-10 14:00', event: 'P07 发起任务', role: 'P07 安全工程师' },
          { status: 'done', time: '2026-05-10 16:00', event: 'P02 审批通过', role: 'P02 分管领导' },
          { status: 'done', time: '2026-05-12 09:00', event: '联络员接收', role: '孙琳（联络员）' },
          { status: 'done', time: '2026-05-12 09:30', event: '联络员转派', role: '孙琳' },
          { status: 'done', time: '2026-05-25 17:00', event: '执行人提交反馈', role: '陈华' },
          { status: 'active', time: '待上报', event: '联络员确认上报', role: '陈华（联络员）' }
        ]
      },
      'sup-7': {
        title: '消防设施专项检查整改',
        basic: [
          ['任务类型', '日常任务'],
          ['督办对象', '物业管理公司'],
          ['来源', '本企业'],
          ['当前执行人', '刘洋'],
          ['截止日期', '2026-05-18'],
          ['状态', '待反馈审核']
        ],
        desc: '执行人已提交反馈并经联络员确认上报，待分管领导审核。',
        transferChain: [],
        timeline: [
          { status: 'done', time: '2026-05-01 10:00', event: 'P07 发起任务', role: 'P07 安全工程师' },
          { status: 'done', time: '2026-05-01 15:00', event: 'P02 审批通过', role: 'P02 分管领导' },
          { status: 'done', time: '2026-05-02 09:00', event: '联络员接收', role: '孙琳（联络员）' },
          { status: 'done', time: '2026-05-15 17:00', event: '刘洋提交反馈', role: '刘洋（P08）' },
          { status: 'done', time: '2026-05-16 10:00', event: '联络员确认上报', role: '孙琳（联络员）' },
          { status: 'active', time: '待审核', event: '反馈审核', role: 'P02 分管领导' }
        ]
      },
      'sup-8': {
        title: '应急预案修订与备案',
        basic: [
          ['任务类型', '专项任务'],
          ['督办对象', '集装箱码头公司'],
          ['来源', '政府主管部门'],
          ['当前执行人', '周涛'],
          ['截止日期', '2026-05-12'],
          ['状态', '待归档']
        ],
        desc: '应急预案修订已完成，反馈审核通过，等待双方归档确认。',
        transferChain: [],
        timeline: [
          { status: 'done', time: '2026-04-20 10:00', event: 'P07 发起任务', role: 'P07 安全工程师' },
          { status: 'done', time: '2026-04-20 15:00', event: 'P02 审批通过', role: 'P02 分管领导' },
          { status: 'done', time: '2026-04-21 09:00', event: '联络员接收', role: '张明（联络员）' },
          { status: 'done', time: '2026-05-08 16:00', event: '周涛提交反馈', role: '周涛' },
          { status: 'done', time: '2026-05-09 10:00', event: '联络员确认上报', role: '张明' },
          { status: 'done', time: '2026-05-10 14:00', event: 'P02 反馈审核通过', role: 'P02 分管领导' },
          { status: 'active', time: '待归档', event: '双方归档', role: 'P07' }
        ]
      },
      'sup-9': {
        title: '安全生产月活动落实',
        basic: [
          ['任务类型', '专项任务'],
          ['督办对象', '物流运输公司'],
          ['来源', '国资委'],
          ['当前执行人', '孙磊'],
          ['截止日期', '2026-04-30'],
          ['状态', '已归档']
        ],
        desc: '安全生产月各项活动已落实完成，经反馈审核通过，双方归档。',
        transferChain: [
          { from: '集团联络员', to: '黄勇（联络员）', time: '2026-04-01 09:00', action: '接收任务' },
          { from: '黄勇（联络员）', to: '孙磊（安全员）', time: '2026-04-01 10:30', action: '转派至执行人' }
        ],
        timeline: [
          { status: 'done', time: '2026-03-28 14:00', event: 'P07 发起任务', role: 'P07 安全工程师' },
          { status: 'done', time: '2026-03-29 10:00', event: 'P02 审批通过', role: 'P02 分管领导' },
          { status: 'done', time: '2026-04-01 09:00', event: '联络员接收', role: '黄勇（联络员）' },
          { status: 'done', time: '2026-04-25 16:00', event: '孙磊提交反馈', role: '孙磊' },
          { status: 'done', time: '2026-04-26 09:00', event: '联络员确认上报', role: '黄勇' },
          { status: 'done', time: '2026-04-27 14:00', event: 'P02 反馈审核通过', role: 'P02 分管领导' },
          { status: 'done', time: '2026-04-28 10:00', event: '双方归档完成', role: 'P07' }
        ]
      },
      'sup-10': {
        title: '危化品装卸作业安全管控',
        basic: [
          ['任务类型', '上级下达任务'],
          ['督办对象', '危化品储运公司'],
          ['来源', '集团本部'],
          ['当前执行人', '何勇'],
          ['截止日期', '2026-05-10'],
          ['状态', '已逾期']
        ],
        desc: '逾期已触发自动催办（T+1天），当前为手动追加催办状态。',
        transferChain: [
          { from: '集团联络员', to: '陈华（联络员）', time: '2026-04-25 09:00', action: '接收任务' }
        ],
        timeline: [
          { status: 'done', time: '2026-04-24 10:00', event: '集团下发督办', role: 'P07 集团安办' },
          { status: 'done', time: '2026-04-25 09:00', event: '联络员接收', role: '陈华' },
          { status: 'done', time: '2026-05-11 08:00', event: '逾期1天自动催办', role: '系统' },
          { status: 'active', time: '已逾期', event: '待补办反馈', role: '何勇' }
        ]
      }
    }
  };

  window.SupervisionData = SupervisionData;
})();
