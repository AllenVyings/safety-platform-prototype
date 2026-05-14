/**
 * 安全码综合管理平台 V5.0 - 标注数据配置
 * key 为模块 ID（对应 data-module 属性和 menus.js 中的 id）
 */
var ANNOTATIONS_CONFIG = {

  // ========== 项目端 - 安全管控对象管理 ==========
  'enterprise/safety-control-object': [
    // ---- 左侧面板 & 树（始终可见）----
    {
      id: 'ent-sco-001',
      selector: '.panel-header',
      position: 'top-right',
      title: '左侧面板与管控对象树',
      category: '交互说明',
      categoryColor: 'info',
      description: '左树右表布局。左侧面板固定400px宽度，顶部统计卡片实时计算（项目码/区域/场所码/危险源数量），搜索框支持按名称模糊搜索，树支持展开/折叠。树节点操作按钮：+区域、+场所、+危险源。',
      prdRef: '6.4.4.4.3.5 页面布局规范'
    },
    {
      id: 'ent-sco-002',
      selector: '.tree-item[data-id="1"]',
      position: 'top-right',
      title: '新增区域/场所/危险源',
      category: '业务规则',
      categoryColor: 'warning',
      description: '区域可挂在项目码下或其他区域下，编码自动生成（{区域码}-R{序号}）。场所和危险源挂在区域或项目码下。保存场所/危险源时自动为所有有固定检查频次职务的人员生成扫码配置。',
      prdRef: '6.4.4.4.3.5 保存时自动化规则'
    },

    // ---- 项目码详情视图 ----
    {
      id: 'ent-sco-003',
      selector: '#view-project .card-header',
      position: 'top-right',
      title: '项目基本信息与四方责任体',
      category: '交互说明',
      categoryColor: 'info',
      description: '点击项目码节点显示项目基本信息、四方责任体、监管单位信息。项目码区域含二维码可下载/打印。四方责任体信息从项目信息管理模块同步，本模块只读展示。',
      prdRef: '6.4.4.4.2 数据模型'
    },
    {
      id: 'ent-sco-004',
      selector: '#view-project .party-table',
      position: 'top-right',
      title: '四方责任体自动注册',
      category: '业务规则',
      categoryColor: 'warning',
      description: '选择四方责任体时自动为负责人创建用户账号（is_auto_registered=1），自动注册账号权限受限，仅可查看本人信息。手动创建账号按角色分配权限。',
      prdRef: '6.4.3.6 业务规则 BR-12-02'
    },
    {
      id: 'ent-sco-005',
      selector: '#view-project .info-card:last-child .card-header',
      position: 'top-right',
      title: '监管单位信息',
      category: '交互说明',
      categoryColor: 'info',
      description: '监管单位信息从项目信息管理模块同步，本模块只读展示。包含行业监管、专业监管、属地监管三类。',
      prdRef: '6.4.4.4.2 数据模型'
    },

    // ---- 区域详情视图 ----
    {
      id: 'ent-sco-006',
      selector: '#view-region .card-header',
      position: 'top-right',
      title: '区域详情与对象列表',
      category: '交互说明',
      categoryColor: 'info',
      description: '点击区域节点显示区域基本信息和下级对象列表（场所/危险源）。区域编码自动生成，格式为{项目码}-R{序号}。可编辑、删除区域。',
      prdRef: '6.4.4.4.3.5 区域管理'
    },

    // ---- 场所详情视图 ----
    {
      id: 'ent-sco-007',
      selector: '#view-place .card-header',
      position: 'top-right',
      title: '场所详情与二维码',
      category: '交互说明',
      categoryColor: 'info',
      description: '点击场所节点显示场所详情，包含基础信息、二维码（可下载/打印）、专属检查表、扫码配置。场所编码格式为{区域码}-P{序号}。整改责任人和复核人为必填项。',
      prdRef: '6.4.4.4.3.5 场所管理'
    },
    {
      id: 'ent-sco-008',
      selector: '#placeScanConfigBody',
      position: 'top-right',
      title: '场所扫码配置表',
      category: '业务规则',
      categoryColor: 'warning',
      description: '保存场所时自动为所有有固定检查频次职务的人员生成扫码配置。有固定检查频次的职务对项目下所有管控对象均有检查职责。也可手动新增检查表配置。每条配置含责任单位、检查表名称、扫码责任人、检查频次、是否跳过节假日、完成规则。',
      prdRef: '6.4.4.4.3.5 保存时自动化规则'
    },

    // ---- 危险源详情视图 ----
    {
      id: 'ent-sco-009',
      selector: '#view-hazard .card-header',
      position: 'top-right',
      title: '危险源详情与二维码',
      category: '交互说明',
      categoryColor: 'info',
      description: '点击危险源节点显示危险源详情，包含基础信息、二维码（可下载/打印）、专属检查表、扫码配置。危险源编码格式为{区域码}-H{序号}。整改责任人和复核人为必填项。',
      prdRef: '6.4.4.4.3.5 危险源管理'
    },
    {
      id: 'ent-sco-010',
      selector: '#hazardScanConfigBody',
      position: 'top-right',
      title: '危险源扫码配置表',
      category: '业务规则',
      categoryColor: 'warning',
      description: '保存危险源时自动为所有有固定检查频次职务的人员生成扫码配置。有固定检查频次的职务对项目下所有管控对象均有检查职责。也可手动新增检查表配置。',
      prdRef: '6.4.4.4.3.5 保存时自动化规则'
    },

    // ---- 新增场所视图 ----
    {
      id: 'ent-sco-011',
      selector: '#view-add-place .card-header',
      position: 'top-right',
      title: '新增场所表单',
      category: '交互说明',
      categoryColor: 'info',
      description: '新增场所需填写基础信息（场所类型、名称、所属区域、状态、图片、整改责任人、复核人）和扫码配置。整改责任人和复核人通过级联选择器从项目用户中选择，联系电话自动带出。',
      prdRef: '6.4.4.4.3.5 场所新增'
    },
    {
      id: 'ent-sco-012',
      selector: '#exclusiveChecklistContent',
      position: 'top-right',
      title: '专属检查表（新增场所）',
      category: '业务规则',
      categoryColor: 'warning',
      description: '场所必须配置专属检查表。保存后系统自动为所有有固定检查频次职务的人员针对该场所生成扫码配置，检查表来源为专属检查表。专属检查表为必填项。',
      prdRef: '6.4.4.4.3.5 保存时自动化规则'
    },

    // ---- 新增危险源视图 ----
    {
      id: 'ent-sco-013',
      selector: '#view-add-hazard .card-header',
      position: 'top-right',
      title: '新增危险源表单',
      category: '交互说明',
      categoryColor: 'info',
      description: '新增危险源需填写基础信息（危险源类型、名称、所属区域、状态、图片、整改责任人、复核人）和扫码配置。危险源类型包括高处作业、临时用电、有限空间、起重吊装、动火作业、深基坑等。',
      prdRef: '6.4.4.4.3.5 危险源新增'
    },
    {
      id: 'ent-sco-014',
      selector: '#hazardChecklistContent',
      position: 'top-right',
      title: '专属检查表（新增危险源）',
      category: '业务规则',
      categoryColor: 'warning',
      description: '危险源必须配置专属检查表。保存后系统自动为所有有固定检查频次职务的人员针对该危险源生成扫码配置，检查表来源为专属检查表。专属检查表为必填项。',
      prdRef: '6.4.4.4.3.5 保存时自动化规则'
    },

    // ---- 新增场所/危险源视图 - 扫码配置区按钮 ----
    {
      id: 'ent-sco-015',
      selector: '#scanConfigTableBody',
      position: 'top-right',
      title: '扫码配置表格与新增按钮',
      category: '业务规则',
      categoryColor: 'warning',
      description: '"+新增检查表"按钮手动添加扫码配置。保存场所/危险源时，系统自动为所有有固定检查频次的职务生成扫码配置行（检查表来源为专属检查表），自动生成的配置也可手动编辑或删除。',
      prdRef: '6.4.4.4.3.5 保存时自动化规则'
    },

    // ---- 扫码配置弹窗（modal-scanConfig）----
    {
      id: 'ent-sco-016',
      selector: '#modal-scanConfig .modal-title',
      position: 'top-right',
      title: '扫码配置弹窗 - 责任配置',
      category: '交互说明',
      categoryColor: 'info',
      description: '政府侧配置的责任人（企业主要负责人、调度分拨员、隐患复核责任人）在项目端只读，不可修改。联系电话自动带出。下方检查表配置区域可新增/删除检查表，每条含检查表名称、检查频次、跳过节假日等。',
      prdRef: '6.4.4.4.3.5 扫码配置'
    },
    {
      id: 'ent-sco-017',
      selector: '#scanConfigChecklistList',
      position: 'top-right',
      title: '检查表配置区',
      category: '业务规则',
      categoryColor: 'warning',
      description: '每条检查表含检查表名称、检查频次、是否跳过节假日、完成规则。可删除已有检查表，点击"+新增检查表"打开新增检查表弹窗。检查频次支持日/周/月/季，完成规则分为"所有人都要完成"和"任意一人完成"。',
      prdRef: '6.4.4.4.3.5 检查表配置'
    },

    // ---- 删除区域弹窗（modal-deleteRegion）----
    {
      id: 'ent-sco-018',
      selector: '#modal-deleteRegion .alert-warning',
      position: 'top-right',
      title: '删除区域 - 对象迁移',
      category: '业务规则',
      categoryColor: 'danger',
      description: '删除区域前必须将区域下的场所和危险源迁移至其他区域或项目直属。迁移后对象编码保持不变，仅 parent_id 更新。若区域下无对象则可直接删除。删除操作不可恢复。',
      prdRef: '6.4.4.4.3.5 删除约束'
    },

    // ---- 专属检查表弹窗（modal-exclusiveChecklist）----
    {
      id: 'ent-sco-019',
      selector: '#modal-exclusiveChecklist .modal-title',
      position: 'top-right',
      title: '配置专属检查表弹窗',
      category: '交互说明',
      categoryColor: 'info',
      description: '配置管控对象的专属检查表，含基础信息（检查表名称、是否跳过节假日）和检查内容。检查内容可通过"检查库引用"从标准库导入，也可"+新增检查项"手动添加。专属检查表保存后，系统自动为其生成扫码配置。',
      prdRef: '6.4.4.4.3.5 专属检查表'
    },
    {
      id: 'ent-sco-020',
      selector: '#exclusiveCheckItemEmpty',
      position: 'top-right',
      title: '检查内容 - 检查库引用与新增',
      category: '业务规则',
      categoryColor: 'warning',
      description: '"检查库引用"按钮打开检查库选择弹窗，行业大类和领域小类根据项目配置自动带出，不可修改。引用后检查项自动填入，可继续手动调整。"+新增检查项"支持手动添加自定义检查项。',
      prdRef: '6.4.4.4.3.5 检查库引用'
    },

    // ---- 新增检查表弹窗（modal-addScanConfig）----
    {
      id: 'ent-sco-021',
      selector: '#scanConfigModalTitle',
      position: 'top-right',
      title: '新增检查表弹窗',
      category: '交互说明',
      categoryColor: 'info',
      description: '手动新增扫码配置检查表。需填写检查表名称、扫码责任人（通过级联选择器选择）、检查频次（每N日/周/月/季检查M次）、是否跳过节假日、完成规则。下方检查内容区域与专属检查表弹窗结构一致。',
      prdRef: '6.4.4.4.3.5 新增检查表'
    },
    {
      id: 'ent-sco-022',
      selector: '#scanResponsibleCascader',
      position: 'top-right',
      title: '扫码责任人级联选择器',
      category: '交互说明',
      categoryColor: 'info',
      description: '左侧为组织架构树（按四方责任体分组），右侧为用户列表。选择左侧节点后右侧显示该单位下的人员，支持多选。已选人员以标签形式展示在底部。扫码责任人必填，至少选择一人。',
      prdRef: '6.4.4.4.3.5 责任人选择'
    },

    // ---- 检查库引用弹窗（modal-scanCheckLib）----
    {
      id: 'ent-sco-023',
      selector: '#scanLibListContainer',
      position: 'top-right',
      title: '检查库引用弹窗',
      category: '业务规则',
      categoryColor: 'warning',
      description: '行业大类和领域小类根据项目信息自动带出，只读不可修改。检查库列表展示符合条件的标准检查表，勾选后点击"确定引用"导入到当前检查表中。引用后的检查项可编辑和删除。',
      prdRef: '6.4.4.4.3.5 检查库引用规则'
    },

    // ---- 新增/编辑场所视图 - 保存按钮 ----
    {
      id: 'ent-sco-024',
      selector: '#view-add-place .btn-primary[onclick="savePlace()"]',
      position: 'top-left',
      title: '保存场所按钮',
      category: '业务规则',
      categoryColor: 'warning',
      description: '点击保存后校验必填项（场所类型、名称、所属区域、整改责任人、复核人、专属检查表），校验通过后保存。保存时自动为所有有固定检查频次的职务生成扫码配置。新增场所编码自动生成。',
      prdRef: '6.4.4.4.3.5 保存逻辑'
    },

    // ---- 新增/编辑危险源视图 - 保存按钮 ----
    {
      id: 'ent-sco-025',
      selector: '#view-add-hazard .btn-primary[onclick="saveHazard()"]',
      position: 'top-left',
      title: '保存危险源按钮',
      category: '业务规则',
      categoryColor: 'warning',
      description: '点击保存后校验必填项（危险源类型、名称、所属区域、整改责任人、复核人、专属检查表），校验通过后保存。保存时自动为所有有固定检查频次的职务生成扫码配置。新增危险源编码自动生成。',
      prdRef: '6.4.4.4.3.5 保存逻辑'
    },

    // ---- 区域详情 - 编辑区域弹窗 ----
    {
      id: 'ent-sco-026',
      selector: '#modal-region .modal-title',
      position: 'top-right',
      title: '编辑区域弹窗',
      category: '交互说明',
      categoryColor: 'info',
      description: '编辑区域名称、排序号和状态。区域编码不可修改。状态改为停用后，该区域下的场所和危险源不影响已有扫码配置，但新增扫码配置时不会自动包含停用区域下的对象。',
      prdRef: '6.4.4.4.3.5 区域编辑'
    }
  ]

};
