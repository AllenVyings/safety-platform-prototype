# 数据契约文档

> 本文档定义各模块数据结构，作为原型开发的数据契约。
> 创建时间：2026-04-23
> 版本：V1.0

---

## 一、领域小类管理 (domain-manage.html)

### 1.1 领域小类主数据

```typescript
interface DomainItem {
  id: string;              // 领域编码，如 'MANUFACTURING_001'
  name: string;            // 领域名称，如 '生产车间'
  industry: string;        // 所属行业编码，枚举值见 1.2
  industryName: string;    // 所属行业名称
  mode: string;            // 所属模式，枚举值见 1.3
  status: '0' | '1';       // 状态：0-停用，1-启用
  desc: string;            // 领域描述
  supervisors: Supervisor[];  // 监管单位列表
  checklists: Checklist[];    // 检查表列表
}
```

### 1.2 行业大类枚举

```typescript
type IndustryCode =
  | 'IND'    // 工业制造
  | 'CITY'   // 城市运行
  | 'CONS'   // 建设工程
  | 'CHEM'   // 危险化学品
  | 'TRANS'  // 交通运输
  | 'COMM'   // 公共场所
  | 'ENVI'   // 生态环境
  | 'OTHE';  // 其他
```

### 1.3 所属模式枚举

```typescript
type ModeCode =
  | 'basic'    // 基础模式
  | 'project'  // 项目模式
  | 'special'  // 专项模式
  | 'other';   // 其他模式
```

### 1.4 监管单位

```typescript
interface Supervisor {
  type: 'industry' | 'professional' | 'local';  // 单位类型
  name: string;                                  // 单位名称
  checklists: string[];                          // 已配置检查表名称列表（必填！）
}
```

**⚠️ 关键约束**：`checklists` 字段必填，空数组表示未配置，非空数组显示标签。

### 1.5 检查表

```typescript
interface Checklist {
  name: string;         // 检查表名称
  frequency: string;    // 检查频次，如 '每日1次'
  skipHoliday: boolean; // 是否跳过节假日
}
```

---

## 二、企业用户管理 (ent-user.html)

### 2.1 用户主数据

```typescript
interface EnterpriseUser {
  id: string;                    // 用户ID
  name: string;                  // 用户姓名
  account: string;               // 账号
  phone: string;                 // 联系电话
  title: string;                 // 职务
  level: string;                 // 管控层级
  safetyCode: 'green' | 'yellow' | 'red';  // 安全码颜色
  userStatus: '0' | '1';         // 启用状态（注意字段名是 userStatus）
  createTime: string;            // 创建时间
  enterpriseId: string;          // 关联企业ID（用于区划树联动）
  industry: string;              // 关联行业大类（用于领域树联动）
}
```

**⚠️ 关键约束**：
- 字段名是 `userStatus`，不是 `status`
- `enterpriseId` 和 `industry` 必填，用于组织树联动过滤

### 2.2 企业组织树节点

```typescript
interface EnterpriseTreeNode {
  id: string;           // 企业ID
  name: string;         // 企业名称
  type: 'district' | 'street' | 'enterprise';  // 节点类型
  children?: EnterpriseTreeNode[];  // 子节点
  count?: number;       // 关联用户数
}
```

---

## 三、政府用户管理 (gov-user.html)

### 3.1 用户主数据

```typescript
interface GovernmentUser {
  id: string;                    // 用户ID
  name: string;                  // 姓名
  account: string;               // 账号
  unit: string;                  // 单位
  department: string;            // 科室
  phone: string;                 // 手机
  title: string;                 // 职务
  userType: string;              // 用户类型
  roleType: string;              // 角色类型
  status: '0' | '1';             // 状态
  lastLogin: string;             // 最后登录时间
}
```

### 3.2 政府组织树节点

```typescript
interface GovernmentTreeNode {
  id: string;           // 组织ID
  name: string;         // 组织名称
  type: 'industry' | 'professional' | 'local';  // 单位类型
  children?: GovernmentTreeNode[];
  count?: number;
}
```

---

## 四、隐患库管理 (hazard-lib.html)

### 4.1 隐患主数据

```typescript
interface HazardItem {
  id: string;              // 隐患ID
  name: string;            // 隐患名称
  level: 'general' | 'major';  // 隐患级别：一般/重大
  category: string;        // 隐患类别
  domains: string[];       // 适用领域（多选）
  description: string;     // 隐患描述
  standards: string;       // 判定标准
  measures: string;        // 整改措施
  relatedItems: string[];  // 关联检查项
  relatedRegs: string[];   // 关联法规条款
  status: '0' | '1';       // 状态
}
```

---

## 五、法规库管理 (regulation-lib.html)

### 5.1 法规主数据

```typescript
interface RegulationItem {
  id: string;              // 法规ID
  name: string;            // 法规名称
  type: 'standard' | 'special' | 'custom';  // 法规类型
  issueUnit: string;       // 发布单位
  issueDate: string;       // 发布日期
  effectiveDate: string;   // 生效日期
  status: '0' | '1';       // 状态
  attachment: string;      // 附件URL
  clauses: RegulationClause[];  // 条款列表
}
```

### 5.2 法规条款

```typescript
interface RegulationClause {
  id: string;         // 条款ID
  number: string;     // 条款编号
  title: string;      // 条款标题
  content: string;    // 条款内容
}
```

---

## 六、检查库管理 (checklist-lib.html)

### 6.1 检查表主数据

```typescript
interface ChecklistItem {
  id: string;              // 检查表ID
  name: string;            // 检查表名称
  type: string;            // 检查表类型
  category: string;        // 所属分类
  frequency: string;       // 检查频次
  skipHoliday: boolean;    // 是否跳过节假日
  status: '0' | '1';       // 状态
  contents: CheckContent[];  // 检查内容列表
}
```

### 6.2 检查内容

```typescript
interface CheckContent {
  name: string;       // 内容名称
  standard: string;   // 检查标准
}
```

---

## 七、通用约束

### 7.1 状态枚举

```typescript
type Status = '0' | '1';  // 0-停用/禁用，1-启用/正常
```

### 7.2 安全码枚举

```typescript
type SafetyCode = 'green' | 'yellow' | 'red';
// green: 安全 (#52c41a)
// yellow: 警示 (#faad14)
// red: 危险 (#ff4d4f)
```

### 7.3 分页参数

```typescript
interface Pagination {
  current: number;    // 当前页码，从1开始
  pageSize: number;   // 每页条数，默认20
  total: number;      // 总条数
}
```

---

## 八、字段命名规范

| 场景 | 正确命名 | 错误示例 |
|------|----------|----------|
| 启用状态（企业用户） | `userStatus` | `status` |
| 启用状态（其他模块） | `status` | — |
| 安全码颜色 | `safetyCode` | `code` |
| 创建时间 | `createTime` | `createdAt` |
| 最后登录 | `lastLogin` | `lastLoginTime` |
| 监管单位检查表 | `checklists` | —（必填字段） |

---

## 九、关联关系

```
领域小类 (DomainItem)
  ├── supervisors[] → 监管单位配置
  │     └── checklists[] → 检查表名称（字符串数组）
  └── checklists[] → 检查表配置

企业用户 (EnterpriseUser)
  ├── enterpriseId → 区划树节点
  └── industry → 领域树节点（行业大类）

隐患 (HazardItem)
  ├── domains[] → 领域小类
  ├── relatedItems[] → 检查项
  └── relatedRegs[] → 法规条款

法规 (RegulationItem)
  └── clauses[] → 法规条款
```

---

## 十、校验规则

### 10.1 必填字段校验

| 模块 | 必填字段 |
|------|----------|
| 领域小类 | id, name, industry, mode, status |
| 监管单位 | type, name, checklists（必填，可为空数组） |
| 企业用户 | id, name, account, userStatus, enterpriseId, industry |
| 政府用户 | id, name, account, unit, status |
| 隐患 | id, name, level, status |
| 法规 | id, name, type, status |
| 检查表 | id, name, status |

### 10.2 数据完整性校验脚本

```javascript
// 校验监管单位数据完整性
function validateSupervisors(data) {
  data.forEach(item => {
    item.supervisors.forEach(sup => {
      if (!sup.checklists) {
        console.error(`[数据缺失] ${item.name} - ${sup.name} 缺少 checklists 字段`);
      }
    });
  });
}

// 校验用户数据关联字段
function validateUserRelations(users) {
  users.forEach(user => {
    if (!user.enterpriseId) {
      console.error(`[数据缺失] 用户 ${user.name} 缺少 enterpriseId 字段`);
    }
    if (!user.industry) {
      console.error(`[数据缺失] 用户 ${user.name} 缺少 industry 字段`);
    }
  });
}
```

---

**文档维护**：每次修改数据结构时，必须同步更新本文档。
