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
  ],

  // ========== 企业端 - 安全管控对象管理（基础模式） ==========
  'enterprise/hazard-list': [
    {
      id: 'ent-hl-001',
      selector: '.tree-stats',
      position: 'top-right',
      title: '统计卡：企业码 / 场所码 / 危险源码',
      category: '交互说明',
      categoryColor: 'info',
      description: '基础模式只放 3 张统计卡：企业码、场所码、危险源码。没有项目码，也没有区域。当前示例数量为 1 / 5 / 2，与对象树节点数量一致。',
      prdRef: '6.3.5.3.1 对象树'
    },
    {
      id: 'ent-hl-002',
      selector: '.tree-body',
      position: 'top-right',
      title: '对象树：企业码为根，重点场所按领域小类分组',
      category: '业务规则',
      categoryColor: 'warning',
      description: '根节点是企业码。场所码、危险源码挂在企业码下；只有场所可以下挂危险源，从企业码新增的危险源与场所平级。重点场所先按领域小类分组，分组节点和重点场所都用星标。默认只展开一级。搜索命中子节点时展开父级。',
      prdRef: '6.3.5.3.1 / BR-ENT-OBJ-15 / BR-ENT-OBJ-17'
    },
    {
      id: 'ent-hl-003',
      selector: '#view-enterprise',
      position: 'top-right',
      title: '企业码详情只读，由左树驱动',
      category: '交互说明',
      categoryColor: 'info',
      description: '打开页面默认选中企业码。基础信息和监管单位只读，读取企业基本信息里的同一份数据，企业基本信息保存后这里一并更新。本模块不编辑企业主数据。右侧没有标题栏，也没有视图切换按钮，选中哪个树节点就显示哪一块详情。',
      prdRef: '6.3.5.3.4.1 / BR-ENT-OBJ-09 / BR-ENT-OBJ-10 / BR-ENT-OBJ-11'
    },
    {
      id: 'ent-hl-004',
      selector: '#enterpriseScanCard',
      position: 'top-right',
      title: '企业码扫码配置可编辑',
      category: '交互说明',
      categoryColor: 'info',
      description: '右上角蓝色「编辑」进入整张卡片的编辑态。企业主要负责人、调度分拨员、隐患复核责任人用下拉选择，电话随人员带出且只读。企业主要负责人和隐患复核责任人的电话必填。隐患复核责任人每一行都有删除，最后一行旁边还有新增。未选人的新行也可以删，只剩一行时不能再删。新增检查表和编辑检查表打开「自定义配置」。扫码责任人用两栏选人面板：左栏读企业组织架构管理的全量组织架构，整选部门（含下级）全员承担、不推送个人任务，勾个人则任务推送到移动端任务列表，部门和个人不能混选。检查项的添加会在该项下增加检查内容。确定后先写入本次编辑。检查表可删除。确认后写回只读态，关闭则放弃。',
      prdRef: '6.3.5.3.4.1 企业码扫码配置'
    },
    {
      id: 'ent-hl-005',
      selector: '#view-place',
      position: 'top-right',
      title: '场所码详情随节点变化',
      category: '示例数据',
      categoryColor: 'info',
      description: '点击不同场所，右侧名称、类型、场所码、整改责任人、电话、复核人、专属检查表和扫码配置跟着变。当前 5 个场所是示例数据。详情页不放检查表来源按钮，三种来源在新增场所弹窗里，弹窗字段待 PRD 补充。',
      prdRef: '6.3.5.3.4.2 场所码'
    },
    {
      id: 'ent-hl-006',
      selector: '#view-hazard',
      position: 'top-right',
      title: '危险源码详情随节点变化',
      category: '示例数据',
      categoryColor: 'info',
      description: '点击不同危险源，右侧名称、类型、危险源码、责任人、专属检查表和扫码配置跟着变。电动车充电区与危化品存储柜各自一套示例。检查表的编辑、删除可点。详情页不放检查表来源按钮，三种来源在新增危险源弹窗里，弹窗字段待补充。',
      prdRef: '6.3.5.3.4.3 危险源码'
    },
    {
      id: 'ent-hl-007',
      selector: '#view-keyplace',
      position: 'top-right',
      title: '重点场所：基本信息只读，检查表按来源分权限',
      category: '业务规则',
      categoryColor: 'warning',
      description: '重点场所的基本信息和二维码只读。政府配置的检查表不提供编辑和删除。企业自己的检查表可以新增、编辑、删除。新增和编辑的弹窗字段待 PRD 补充，当前点击只提示。',
      prdRef: '6.3.5.3.4.4 / BR-ENT-OBJ-05'
    }
  ],

  // ========== 企业端 - 检查记录管理 ==========
  'enterprise/check-records': [
    {
      id: 'ent-cr-001',
      selector: '#objectTree',
      position: 'top-right',
      title: '管控对象树对齐安全管控对象',
      category: '示例数据',
      categoryColor: 'info',
      description: '基础模式与安全管控对象的企业码树一致。项目模式与项目码树一致：项目码、区域、场所码、危险源码、按领域分组的重点场所。区域本身没有检查记录。不放统计卡，不放新增按钮。点分组只汇总该领域下的重点场所，点场所只含自己。',
      prdRef: '6.3.6.3.1 管控对象树'
    },
    {
      id: 'ent-cr-002',
      selector: '.filter-card',
      position: 'top-right',
      title: '筛选在当前树范围内生效',
      category: '示例数据',
      categoryColor: 'info',
      description: '检查表名称、管控对象、管控对象类型、检查类型、检查人、是否有隐患、开始时间至结束时间，点查询后同时生效。管控对象按名称包含匹配。空条件不限制。重置清空条件。基础模式的管控对象类型为企业、场所、危险源、重点场所；项目模式为项目、场所、危险源、重点场所。检查类型为企业自查、政府巡查。筛的是示例记录，尚未接真实检查数据。',
      prdRef: '6.3.6.3.2 筛选栏'
    },
    {
      id: 'ent-cr-003',
      selector: '#currentNode',
      position: 'top-right',
      title: '当前节点',
      category: '业务规则',
      categoryColor: 'info',
      description: '副标题写当前节点。企业码或项目码包含本级和下属对象。点区域只含该区域下的场所和危险源。',
      prdRef: '6.3.6.4 BR-ENT-CR-01'
    },
    {
      id: 'ent-cr-004',
      selector: '#recordTable',
      position: 'top-right',
      title: '检查记录列表（示例数据）',
      category: '示例数据',
      categoryColor: 'info',
      description: '一行是一次已提交检查。同一检查表可以有多条，按检查时间从新到旧。序号是当前页序号。表头和数据行高 48px。批量导出在列表卡片右上角，右边与列表对齐，顶部距卡片顶部 30px，导出当前筛选结果的全部记录，本期只提示条数。管控对象类型：企业蓝色、项目橙色，与领域监管一致；场所 #2EC9AD、危险源 #27D5E0，与统计卡同色；重点场所绿色。隐患总数为 0 时显示无隐患（绿色标签），否则显示有隐患（红色标签），已整改/隐患总数写 0/0。操作只有查看。本期没有新增自查，也没有整改跳转。',
      prdRef: '6.3.6.3.3 检查记录列表'
    },
    {
      id: 'ent-cr-005',
      selector: '#modal-check-detail .modal-dialog',
      position: 'top-right',
      title: '检查详情（检查项待接入）',
      category: '未接通功能',
      categoryColor: 'warning',
      description: '基础信息是左标签右内容。检查项明细为示例：序号、检查项、检查内容、结果、隐患类型、隐患描述、隐患等级。结果按该记录的隐患条数示意，有隐患为红色标签，无隐患为绿色标签。真实检查项尚未接入。',
      prdRef: '6.3.6.3.4 检查记录详情弹窗'
    }
  ],

  // ========== 企业端 - 隐患整改管理 ==========
  'enterprise/hazard-fix': [
    {
      id: 'ent-hf-001',
      selector: '.stats-row',
      position: 'top-right',
      title: '统计卡片区（示例数据）',
      category: '示例数据',
      categoryColor: 'info',
      description: '顶部横排 4 卡：隐患总数(12)=蓝色、待整改(3)=黄色、已整改(8)=绿色、已逾期(1)=红色。数值为静态硬编码示例，未接真实数据源。按 PRD §6.3.7.3.1 规格，待整改含待整改+整改中状态。',
      prdRef: '6.3.7.3.1 统计卡片区'
    },
    {
      id: 'ent-hf-002',
      selector: '.filter-card',
      position: 'top-right',
      title: '筛选栏（未接通功能）',
      category: '未接通功能',
      categoryColor: 'warning',
      description: '3 个筛选字段（整改状态/隐患等级/关键词）+ 查询/重置按钮 + 右上「+ 上报隐患」按钮。筛选逻辑已实现（getFilteredData），但查询/重置按钮仅 toast 提示未接通，上报隐患弹窗未接真实提交。',
      prdRef: '6.3.7.3.2 筛选栏'
    },
    {
      id: 'ent-hf-003',
      selector: '.table-wrap table',
      position: 'top-right',
      title: '隐患列表 8 列（示例数据）',
      category: '示例数据',
      categoryColor: 'info',
      description: '8 列表格：隐患编号(HD+日期+序号)、隐患描述、隐患等级(一般=橙/重大=红)、发现来源、整改期限、整改进度(4步时间轴)、状态、操作。12 条硬编码示例数据，包含待整改/整改中/待验收/已整改/已逾期各状态，未接后端。',
      prdRef: '6.3.7.3.3 隐患列表'
    },
    {
      id: 'ent-hf-004',
      selector: '.timeline',
      position: 'top-right',
      title: '整改进度时间轴（4 步）',
      category: '业务规则',
      categoryColor: 'warning',
      description: '行内 4 步时间轴：发现 → 整改 → 验收 → 闭环。已完成步骤 .done(绿色背景)，当前步骤 .current(蓝色背景)，未到步骤灰色。按 PRD §6.3.7.3.4 逻辑：待整改/整改中=整改 current，待验收=验收 current，已整改=全部 done，已逾期=整改 current 红色。',
      prdRef: '6.3.7.3.4 整改进度时间轴'
    },
    {
      id: 'ent-hf-005',
      selector: 'tbody .action-col',
      position: 'top-right',
      title: '操作按钮按状态动态显示',
      category: '业务规则',
      categoryColor: 'warning',
      description: '操作列按状态动态显示：整改中=填写整改/详情，待验收=申请验收/详情，已整改=查看详情，已逾期=立即整改(红色高亮)/详情。按钮已按规范渲染，但点击仅打开弹窗/toast，未接真实提交逻辑。',
      prdRef: '6.3.7.3.5 操作按钮逻辑'
    },
    {
      id: 'ent-hf-006',
      selector: '#modal-rectify .modal-dialog',
      position: 'top-right',
      title: '填写整改弹窗（未接通功能）',
      category: '未接通功能',
      categoryColor: 'warning',
      description: '600px 弹窗，7 个字段：整改措施*(必填)、整改结果*(必填)、整改完成日期*(必填)、整改责任人、整改投入(万元)、整改照片(最多5张)、备注。表单结构完整但提交按钮仅 toast 提示，未接后端。按 BR-ENT-HF-03 提交后应流转为「待验收」状态。',
      prdRef: '6.3.7.3.6 填写整改弹窗'
    },
    {
      id: 'ent-hf-007',
      selector: '#modal-recheck .modal-dialog',
      position: 'top-right',
      title: '申请验收弹窗（未接通功能）',
      category: '未接通功能',
      categoryColor: 'warning',
      description: '600px 弹窗，4 个字段：验收申请说明*(必填)、期望验收日期、联系方式、整改完成照片(最多5张)。表单结构完整但提交按钮仅 toast 提示。按 BR-ENT-HF-04 提交后应等待复核人验收。',
      prdRef: '6.3.7.3.7 申请验收弹窗'
    },
    {
      id: 'ent-hf-008',
      selector: '#modal-hazard-detail .modal-dialog',
      position: 'top-right',
      title: '隐患详情弹窗（示例数据）',
      category: '示例数据',
      categoryColor: 'info',
      description: '600px 弹窗，2 区域：①隐患信息(2列网格显示编号/等级/描述/来源/发现时间/整改期限)，②整改进度(纵向时间轴，圆点+文字+时间，4 节点：发现隐患/整改中/验收/闭环)。当前仅显示固定示例内容，未接 HD 编号动态回显。',
      prdRef: '6.3.7.3.8 隐患详情弹窗'
    },
    {
      id: 'ent-hf-009',
      selector: '#modal-report .modal-dialog',
      position: 'top-right',
      title: '上报隐患弹窗（未接通功能）',
      category: '未接通功能',
      categoryColor: 'warning',
      description: '600px 弹窗，5 个字段：隐患描述*(必填)、隐患等级*(必填，一般/重大)、发现来源*(必填，日常自查/政府检查/专项检查)、整改期限*(必填)、隐患照片(选填，最多5张)、备注。表单结构完整但提交按钮仅 toast 提示。按 BR-ENT-HF-07 用于企业自查发现的隐患主动上报。',
      prdRef: '6.3.7.4 BR-ENT-HF-07'
    }
  ],

  // ========== 企业端 - 隐患整改管理（V7.0.193 PC 查看+任务流转，整改在移动端） ==========
  'enterprise/hazard-reform': [
    {
      id: 'ent-hr-001',
      selector: '.stats-row',
      position: 'top-right',
      title: '统计卡片区',
      category: '交互说明',
      categoryColor: 'info',
      description: '横排 4 卡（隐患总数/已完成/未完成/整改率）随当前树节点与筛选实时变化。已完成=已整改；总数 0 时整改率显示 0%。PRD §6.3.7.3.1。',
      prdRef: '6.3.7.3.1 统计卡片区'
    },
    {
      id: 'ent-hr-002',
      selector: '.filter-card',
      position: 'top-right',
      title: '筛选栏',
      category: '交互说明',
      categoryColor: 'info',
      description: '4 个筛选：隐患描述（包含）、整改状态（全部/待整改/整改中/待验收/已整改/已逾期）、是否超期、发现时间区间。查询/重置均生效。隐患由移动端检查提交生成，本页无「上报隐患」入口。PRD §6.3.7.3.2。',
      prdRef: '6.3.7.3.2 筛选栏'
    },
    {
      id: 'ent-hr-003',
      selector: '#recordTable table',
      position: 'top-right',
      title: '隐患列表',
      category: '交互说明',
      categoryColor: 'info',
      description: '8 列（序号/描述/类型/等级/方式/责任人/状态/操作），行高 48px，按状态标签着色。管控对象树全量同源，点树节点后仅展示其范围内隐患。PRD §6.3.7.3.3。',
      prdRef: '6.3.7.3.3 隐患列表'
    },
    {
      id: 'ent-hr-004',
      selector: '.operation-col',
      position: 'top-right',
      title: '操作列（查看 + 流转）',
      category: '业务逻辑',
      categoryColor: 'success',
      description: '未闭环记录（待整改/整改中/待验收/已逾期）显示「查看｜流转」，已整改仅「查看」。流转=将当前节点任务转交其他处理人，状态不变；不提供填写整改/申请验收，整改在移动端完成（§6.5.11）。PRD §6.3.7.3.5 / V7.0.193。',
      prdRef: '6.3.7.3.5 操作按钮逻辑'
    },
    {
      id: 'ent-hr-008',
      selector: '#modal-hazard-transfer',
      position: 'top-right',
      title: '任务流转弹窗',
      category: '业务逻辑',
      categoryColor: 'success',
      description: '640px。隐患描述/当前节点/当前处理人只读；转交给用安全管控对象同款选人组件（触发框+双栏面板：左组织树搜索/停用部门隐藏/人数统计/部门名单行省略，右启用用户单选含手机号，组织数据与组织架构管理同源），面板在弹窗内原位展开、不遮挡下方流转原因；当前处理人置灰不可选，选中标签回显可×清除；流转原因必填≤200字。待整改/整改中/已逾期→隐患整改节点（改整改责任人），待验收→整改复核节点（改复核人）。提交后状态不变、列表即时刷新、详情流程当前节点追加流转留痕。PRD §6.3.7.3.10 / BR-ENT-HF-11。',
      prdRef: '6.3.7.3.10 任务流转弹窗'
    },
    {
      id: 'ent-hr-007',
      selector: '#modal-hazard-detail',
      position: 'top-right',
      title: '隐患详情弹窗',
      category: '交互说明',
      categoryColor: 'info',
      description: '1100px 只读。左三区（隐患信息/隐患整改/整改复核）始终展示，未到字段为「-」；右侧流程按实际流转追加节点（审批退回可多于四步），节点色板蓝/红/橙/绿，复核固定橙色。发生任务流转后当前节点卡片追加「流转记录」（时间 原→新：原因）。PRD §6.3.7.3.8。',
      prdRef: '6.3.7.3.8 隐患详情弹窗'
    },
    {
      id: 'ent-hr-009',
      selector: '#btnExport',
      position: 'top-right',
      title: '批量导出隐患记录',
      category: '业务逻辑',
      categoryColor: 'success',
      description: '「批量导出」内嵌于导出记录弹窗顶部工具条（标题行仅留导出记录入口），点击打开 600px 导出设置二级弹窗。三段排版：数据范围浅底信息条（计数主色加粗）+「补充筛选」蓝竖条小节（隐患等级/整改方式/整改人/复核人/检查分类两列）+照片开关独立整行（默认否，是=内嵌图片）。导出统一生成后台打包任务（不同步下载）：点「提交导出任务」建任务、二级弹窗关闭、导出记录列表即时新增行。xlsx 26 列按《安全码2.0系统导出模板设计文档》企业侧隐患记录模板（字典映射/政府人员单位后缀/表外检查内容「—」）。0 条置灰不创建。PRD §6.3.7.3.11 / BR-ENT-HF-12。',
      prdRef: '6.3.7.3.11 批量导出隐患记录'
    },
    {
      id: 'ent-hr-010',
      selector: '#btnTaskList',
      position: 'top-right',
      title: '导出记录（任务中心）',
      category: '业务逻辑',
      categoryColor: 'success',
      description: '列表标题行唯一导出入口，带未下载完成项红点计数（>99 显示 99+）。打开 760px 任务中心：顶部工具条（「批量导出」主按钮右对齐，开二级条件弹窗）+任务列表（文件名/范围单行省略悬停全称、条数、提交时间、状态、操作，固定列宽不换行，倒序）。状态机 排队中→打包中(进度)→已完成/失败；已完成可重复下载、失败可重试；全状态可删除（二次确认，进行中删除取消打包，已完成删除不影响已下载文件）；下载/删除后红点同步。任务 localStorage 持久化，刷新保留、未完成续跑。原型定时器模拟后台打包约 5s。PRD §6.3.7.3.12 / BR-ENT-HF-13。',
      prdRef: '6.3.7.3.12 导出记录'
    }
  ],

  // ========== 超管端 - 区域管理 ==========
  'super-admin/area-manage': [
    {
      id: 'sa-am-001',
      selector: '.page-container',
      position: 'top-right',
      title: '区域管理页面布局',
      category: '交互说明',
      categoryColor: 'info',
      description: '左右分栏布局：左侧区划树（280px）+ 右侧列表区。页面容器 padding 20px 四周统一。区划树 4 级结构（区→街道→社区→网格），默认展开到街道。',
      prdRef: '§6.1.10.9 区域管理'
    },
    {
      id: 'sa-am-002',
      selector: '#areaTree',
      position: 'top-right',
      title: '区划树与数据共享',
      category: '数据约束',
      categoryColor: 'success',
      description: '区划树数据从 district-data.js 的 STREETS 构建（南山区→9街道→111社区→网格）。层级标签彩色区分：区=蓝色、街道=绿色、社区=橙色、网格=紫色。支持搜索、展开/折叠。',
      prdRef: '§6.1.10.9.3.2 区划树'
    },
    {
      id: 'sa-am-003',
      selector: '.table-wrap',
      position: 'top-right',
      title: '区划列表表格',
      category: '交互说明',
      categoryColor: 'info',
      description: '8 列表格：区划名称/编码/层级/全路径/排序/状态/创建时间/操作。表头和单元格左对齐（覆盖 framework.css 默认 center）。操作列：编辑/删除。',
      prdRef: '§6.1.10.9.3.3 列表'
    },
    {
      id: 'sa-am-004',
      selector: '#areaModal .modal-dialog',
      position: 'top-right',
      title: '新增/编辑区划弹窗',
      category: '业务规则',
      categoryColor: 'warning',
      description: '弹窗宽度 520px。6 个字段：上级区划（只读）、区划名称（必填）、编码（自动生成）、层级（下拉）、排序号、备注。编码规则：区=REGION_ROOT.code+序号，街道=区code+序号，社区=街道code+序号，网格=社区code+序号。',
      prdRef: '§6.1.10.9.3.5 弹窗'
    },
    {
      id: 'sa-am-005',
      selector: '.tree-node-label',
      position: 'top-right',
      title: '右键菜单动态文案',
      category: '业务规则',
      categoryColor: 'warning',
      description: '右键菜单根据层级动态显示：区/街道/社区级显示"新增子节点"，网格级显示"新增同级"（网格无子级）。菜单项：新增子节点/新增同级、编辑、停用/启用、删除。',
      prdRef: '§6.1.10.9.3.4 右键菜单'
    }
  ],

  // ========== 超管端 - 企业用户管理 ==========
  'super-admin/ent-user': [
    {
      id: 'sa-eu-001',
      selector: '#orgTree',
      position: 'top-right',
      title: '区划树与数据共享',
      category: '数据约束',
      categoryColor: 'success',
      description: '区划树从 district-data.js 的 STREETS 构建（南山区→9街道→111社区→企业）。默认展开到街道级别（level 0=区, level 1=街道）。节点用户数从 allUsers 动态递归统计（computeNodeCounts）。',
      prdRef: '§6.1.3 企业用户管理'
    },
    {
      id: 'sa-eu-002',
      selector: '.stat-cards',
      position: 'top-right',
      title: '统计卡区',
      category: '验收标准',
      categoryColor: 'danger',
      description: '展示用户总数、启用、停用、待审批等关键指标。统计口径仅当前用户权限范围内的企业用户。',
      prdRef: '§6.1.3.3 统计卡'
    },
    {
      id: 'sa-eu-003',
      selector: '.filter-card',
      position: 'top-right',
      title: '筛选区',
      category: '交互说明',
      categoryColor: 'info',
      description: '按关键字、所属企业、角色、状态筛选。查询控件宽度 240px、高度 32px。默认提供查询+重置按钮。',
      prdRef: '§6.1.3.3 筛选区'
    },
    {
      id: 'sa-eu-004',
      selector: '#editModal',
      position: 'top-right',
      title: '新增/编辑用户弹窗',
      category: '业务规则',
      categoryColor: 'warning',
      description: '弹窗宽度 600px。字段：姓名、手机号、所属企业（下拉）、角色（主要负责人/安全管理人员/从业人员）、状态。手机号唯一性校验。',
      prdRef: '§6.1.3.4 新增/编辑'
    },
    {
      id: 'sa-eu-005',
      selector: '.table-wrap',
      position: 'top-right',
      title: '用户列表',
      category: '交互说明',
      categoryColor: 'info',
      description: '列：序号/姓名/手机号/所属企业/角色/状态/创建时间/操作。操作：编辑/详情/重置密码/停用/启用/删除。删除前校验用户是否有待办任务。',
      prdRef: '§6.1.3.3 列表'
    }
  ],

  // ========== 超管端 - 重点场所管理 ==========
  'super-admin/key-place': [
    {
      id: 'sa-kp-001',
      selector: '#placeModal .modal-header',
      position: 'top-right',
      title: '新增/编辑重点场所弹窗',
      category: '交互说明',
      categoryColor: 'info',
      description: '弹窗宽度 1100px，按基础信息、责任主体配置、扫码配置、扩展信息分区。各业务区块使用蓝灰层级底与页面背景区分，表格和输入内容保持白底以保证可读性。',
      prdRef: '§6.1.4.3 新增/编辑场所弹窗'
    },
    {
      id: 'sa-kp-002',
      selector: '#fRegionTrigger',
      position: 'top-right',
      title: '四级级联区划选择器',
      category: '业务规则',
      categoryColor: 'warning',
      description: '区划选择器支持 4 级级联（区→街道→社区→网格）。选社区后弹窗不关闭，显示网格列；选网格后弹窗关闭，标签显示完整路径（如"南山区 / 南山街道 / 北头社区 / 北头01"）。数据从 district-data.js 共享。',
      prdRef: '§6.1.4.3.7.2 区划选择'
    },
    {
      id: 'sa-kp-003',
      selector: '#placeResponsibilitySection',
      position: 'top-right',
      title: '责任主体配置（分支式设计）',
      category: '业务规则',
      categoryColor: 'warning',
      description: '分支式统一配置（V7.0.60+）：顶部分段选择器（企业方/政府方）始终可自由切换，与关联企业解耦。企业方：不设整改人下拉（显示引导文案），表格第三列=radio 单选隐患整改责任方，责任落到企业维度，具体人员由企业端安全管控对象管理配置。政府方：保留整改人下拉，取数源=当前登录单位（V7.0.62+，复用领域监管视角默认应急局），联动其「隐患责任配置」粒度——配到科室级默认"科室名（全员）"+全科可改选，配到人员级仅列已配置人员默认第一个，未配置默认为空不回退；表格第三列=✓ 扫码权限。保存时校验企业方须关联≥1家企业且仅1家责任方（BR-DOM-KP-34）。',
      prdRef: '§6.1.4.3.3.4 责任主体配置'
    },
    {
      id: 'sa-kp-004',
      selector: '#placeBasicSection',
      position: 'top-right',
      title: '基础信息区块层级',
      category: '验收标准',
      categoryColor: 'danger',
      description: '基础信息区为弹窗首个区块，场所名称为首项；区块不得使用与弹窗背景冲突的纯白底，需通过浅蓝灰底、边框和标题色条体现层级。',
      prdRef: '§6.1.4.3.3.1 区域一：基础信息'
    }
  ],

  // ========== 政府端 - 重点场所管理 ==========
  'government/key-place': [
    {
      id: 'gov-kp-001',
      selector: '#placeModal .modal-header',
      position: 'top-right',
      title: '新增/编辑重点场所弹窗',
      category: '交互说明',
      categoryColor: 'info',
      description: '政府端继承超管端重点场所新增/编辑交互。弹窗业务区块使用蓝灰层级底与页面背景区分，表格和输入内容保持白底以保证可读性。',
      prdRef: '§6.2.4.3 / §6.1.4.3 重点场所新增/编辑'
    },
    {
      id: 'gov-kp-002',
      selector: '#fRegionTrigger',
      position: 'top-right',
      title: '四级级联区划选择器',
      category: '业务规则',
      categoryColor: 'warning',
      description: '区划选择器支持 4 级级联（区→街道→社区→网格）。选社区后弹窗不关闭，显示网格列；选网格后弹窗关闭。数据从 district-data.js 共享，与超管端一致。',
      prdRef: '§6.2.4.3.7.2 区划选择'
    },
    {
      id: 'gov-kp-003',
      selector: '#placeResponsibilitySection',
      position: 'top-right',
      title: '责任主体配置（分支式设计）',
      category: '业务规则',
      categoryColor: 'warning',
      description: '分支式统一配置（V7.0.60+）：顶部类型选择器（企业方/政府方）可自由切换，与关联企业解耦。企业方整改不设整改人下拉（显示引导文案），从关联企业中单选责任方，责任落到企业维度，具体整改人员由企业端安全管控对象管理配置。政府方整改保留整改人下拉，取数源=当前登录单位（V7.0.62+，复用领域监管视角默认应急局），联动其「隐患责任配置」粒度——配到科室级默认"科室名（全员）"+全科可改选，配到人员级仅列已配置人员默认第一个，未配置默认为空不回退。保存时校验企业方须关联≥1家企业且仅1家责任方（BR-DOM-KP-34）。',
      prdRef: '§6.2.4.3.3.4 责任主体配置'
    },
    {
      id: 'gov-kp-004',
      selector: '#placeBasicSection',
      position: 'top-right',
      title: '基础信息区块层级',
      category: '验收标准',
      categoryColor: 'danger',
      description: '基础信息区为弹窗首个区块，场所名称为首项；区块不得使用与弹窗背景冲突的纯白底，需通过浅蓝灰底、边框和标题色条体现层级。',
      prdRef: '§6.1.4.3.3.1 区域一：基础信息'
    }
  ],

  // ========== 超管端 - 企业基本信息管理 ==========
  'super-admin/ent-manage': [
    {
      id: 'sa-ent-001',
      selector: '#breadcrumb',
      position: 'top-right',
      title: '页面布局与双树',
      category: '交互说明',
      categoryColor: 'info',
      description: '左树右表双栏布局。左侧导航树提供区划树与领域树两个 Tab，默认展示区划树并展开到街道节点；右侧自上而下为统计卡区、筛选区、列表工具栏、表格、分页区。两棵树 count 口径统一为企业数量。',
      prdRef: '6.1.3.3.1 列表页'
    },
    {
      id: 'sa-ent-002',
      selector: '.stat-cards',
      position: 'top-right',
      title: '统计卡区',
      category: '验收标准',
      categoryColor: 'danger',
      description: '顶部 4 列 grid 布局，展示企业总数、启用数、审批数、停用数。每个统计卡左侧带色条指示器（总计=主色、启用=成功色、审批=警告色、停用=灰色），数字 28px/700 突出，无 emoji 图标。',
      prdRef: '6.1.3.3.1 统计卡区'
    },
    {
      id: 'sa-ent-003',
      selector: '.filter-card',
      position: 'top-right',
      title: '筛选区',
      category: '交互说明',
      categoryColor: 'info',
      description: '字段名+中文全角冒号+控件结构，查询控件宽度统一 240px、高度 32px。默认提供查询+重置两个按钮，查询为主按钮、重置为次按钮。',
      prdRef: '6.1.3.3.1 筛选区 / 通用查询字段规范'
    },
    {
      id: 'sa-ent-004',
      selector: '.table-card',
      position: 'top-right',
      title: '企业列表',
      category: '业务规则',
      categoryColor: 'warning',
      description: '列顺序：复选框 / 序号 / 企业名称 / 统一社会信用代码 / 管理员账号 / 归属网格 / 主领域小类 / 经营地址 / 状态 / 注册时间 / 操作。操作列含编辑、详情、停用/启用、逻辑删除。企业状态仅启用/停用，待审核只作为审批单状态。',
      prdRef: '6.1.3.3.1 列表字段 / 6.0 企业状态规则'
    },
    {
      id: 'sa-ent-005',
      selector: '#addModal',
      position: 'top-right',
      title: '新增企业弹窗',
      category: '交互说明',
      categoryColor: 'info',
      description: '弹窗宽度 800px，单页表单布局，以分区标题分隔 3 区：基本信息、领域与监管、账号信息。modal-body 区域独立滚动。关联领域小类多选，第一个选择的领域小类默认作为主领域小类；监管单位由归属网格和领域小类配置自动计算，只读展示。',
      prdRef: '6.1.3.3.2 新增/编辑'
    },
    {
      id: 'sa-ent-006',
      selector: '#editModal',
      position: 'top-right',
      title: '编辑企业弹窗',
      category: '业务规则',
      categoryColor: 'warning',
      description: '编辑弹窗 2 区（基本信息、领域与监管），无账号信息区。统一社会信用代码不可修改（disabled）；归属网格不可修改（disabled），变更归属网格需走停用+新建流程。',
      prdRef: '6.1.3.3.2 新增与编辑差异'
    },
    {
      id: 'sa-ent-007',
      selector: '#auditModal',
      position: 'top-right',
      title: '审批单列表弹窗',
      category: '业务规则',
      categoryColor: 'warning',
      description: '标题显示当前待审批数量，如「审批单列表（3条待审批）」。列：企业名称、统一社会信用代码、申请类型（注册/企业名称变更/停用）、审批单状态（待审批/已通过/已驳回）、申请时间、操作（通过/驳回）。仅待审批状态可操作，驳回需填写原因。',
      prdRef: '6.1.3.3.4 审核流程'
    }
  ],

  // ========== 超管端 - 政府端组织架构管理 ==========
  'super-admin/gov-org': [
    {
      id: 'sa-go-001',
      selector: '#breadcrumb',
      position: 'top-right',
      title: '页面布局',
      category: '交互说明',
      categoryColor: 'info',
      description: '左树右表双栏布局。左侧组织树展示区→单位→科室 3 级（科室为末级，不可再下挂），右侧展示统计卡、单位/科室详情和操作区。组织树仅保留展开/收起全部按钮且右对齐。',
      prdRef: '6.1.1.3 页面设计'
    },
    {
      id: 'sa-go-002',
      selector: '.stat-cards',
      position: 'top-right',
      title: '统计卡区',
      category: '验收标准',
      categoryColor: 'danger',
      description: '展示单位数、科室数、账号数等关键指标。模拟数据仅保留南山区及指定单位，区级节点新增组织时锁定所属区划并隐藏上级组织字段。',
      prdRef: '6.1.1.3 统计卡'
    },
    {
      id: 'sa-go-003',
      selector: '#detailBody',
      position: 'top-right',
      title: '单位/科室详情',
      category: '交互说明',
      categoryColor: 'info',
      description: '详情区按选中节点类型动态切换字段。区节点新增组织时锁定所属区划；区级节点隐藏编辑、删除按钮。删除前强校验组织下是否有用户账号。',
      prdRef: '6.1.1.3 详情 / 6.1.1.4 业务规则'
    },
    {
      id: 'sa-go-004',
      selector: '#detailActions',
      position: 'top-right',
      title: '操作按钮',
      category: '业务规则',
      categoryColor: 'warning',
      description: '操作按钮按节点类型和权限互斥显示：新增下级、编辑、删除。删除需二次确认，且强校验组织下用户账号，存在账号时阻断并列举待办项。',
      prdRef: '6.1.1.4 业务规则 / 6.1.1.5 权限控制'
    }
  ],

  // ========== 超管端 - 人员账号管理 ==========
  'super-admin/gov-user': [
    {
      id: 'sa-gu-001',
      selector: '#breadcrumb',
      position: 'top-right',
      title: '页面布局',
      category: '交互说明',
      categoryColor: 'info',
      description: '左树右表双栏布局。左侧组织树同源 §6.1.1，右侧展示统计卡、筛选区、列表。支持新增/编辑/删除/详情/重置密码；审批列表 badge 显示待审批数，支持批量导入。',
      prdRef: '6.1.2.3 页面设计'
    },
    {
      id: 'sa-gu-002',
      selector: '.stat-cards',
      position: 'top-right',
      title: '统计卡区',
      category: '验收标准',
      categoryColor: 'danger',
      description: '展示人员总数、启用、停用、待审批等关键指标。统计卡样式与超管端企业基本信息一致：色条指示器、无 emoji、数字突出。',
      prdRef: '6.1.2.3 统计卡'
    },
    {
      id: 'sa-gu-003',
      selector: '.filter-card, .filter-bar',
      position: 'top-right',
      title: '筛选区',
      category: '交互说明',
      categoryColor: 'info',
      description: '按关键字、所属单位/科室、角色、状态等筛选。查询控件宽度高度统一，默认提供查询+重置按钮。',
      prdRef: '6.1.2.3 筛选区 / 通用查询字段规范'
    },
    {
      id: 'sa-gu-004',
      selector: '#editModal',
      position: 'top-right',
      title: '新增/编辑弹窗',
      category: '业务规则',
      categoryColor: 'warning',
      description: 'leaderId 在 openEditModal 回填，saveUser 双分支持久化。BR-GOV-10 onDeptChange 科室选择时管理部门默认勾选；BR-GOV-12 批量删除待办校验，blockedUsers 阻断并列举待办项。',
      prdRef: '6.1.2.4 业务规则 BR-GOV-10/12'
    },
    {
      id: 'sa-gu-005',
      selector: '#deleteModal',
      position: 'top-right',
      title: '删除二次确认',
      category: '业务规则',
      categoryColor: 'warning',
      description: '删除前强校验用户是否有待办任务（检查记录、隐患复核、审批单等），存在待办时阻断删除并列举待办项，避免账号删除导致业务数据孤立。',
      prdRef: '6.1.2.4 BR-GOV-12 批量删除待办校验'
    }
  ],

  // ========== 超管端 - 领域小类管理 ==========
  'super-admin/domain-manage': [
    {
      id: 'sa-dm-001',
      selector: '#breadcrumb',
      position: 'top-right',
      title: '页面布局',
      category: '交互说明',
      categoryColor: 'info',
      description: '领域小类管理按行业大类（工业制造、城市运行、建设工程、危险化学品、交通运输、公共场所、其他）组织，每个行业大类下挂载领域小类。支持业态模式（基础/项目/特殊/其他）配置。',
      prdRef: '6.1.5 功能概述'
    },
    {
      id: 'sa-dm-002',
      selector: '.domain-list, .domain-card',
      position: 'top-right',
      title: '领域小类列表',
      category: '业务规则',
      categoryColor: 'warning',
      description: '领域小类为政府端领域监管、企业端安全管控对象、检查库管理的上游数据源。业态模式=基础模式的领域小类用于企业基本信息关联；项目/特殊/其他模式对应不同管控对象类型。',
      prdRef: '6.1.5.2 业态模式与对象类型映射'
    },
    {
      id: 'sa-dm-003',
      selector: '#checklistModal',
      position: 'top-right',
      title: '检查表配置弹窗',
      category: '交互说明',
      categoryColor: 'info',
      description: '为领域小类配置检查表模板、检查周期（日/周/月/季度）、适用范围、责任人、责任科室。一个领域可配置多套检查表，默认频次对该领域全部管控对象生效，可单独覆盖。',
      prdRef: '6.1.5.x 检查表配置 / 6.2.2.3 Tab2 检查表配置'
    },
    {
      id: 'sa-dm-004',
      selector: '#checklistLibModal',
      position: 'top-right',
      title: '检查库管理',
      category: '业务规则',
      categoryColor: 'warning',
      description: '检查库为检查表模板的上游，支持动态表单配置（§6.1.5.9）。检查项支持单选/多选/文本/数值/图片等题型，检查表模板从检查库引用生成。',
      prdRef: '6.1.5.9 动态表单配置'
    },
    {
      id: 'sa-dm-005',
      selector: '#checkitemList',
      position: 'top-right',
      title: '检查项列表',
      category: '验收标准',
      categoryColor: 'danger',
      description: '检查项按分组组织，支持排序、启停、必填标记。检查项变更影响下游所有引用该模板的检查表配置和已生成的检查任务。',
      prdRef: '6.1.5.9 检查项管理'
    }
  ],

  // ========== 政府端 - 企业基本信息 ==========
  'government/ent-manage': [
    {
      id: 'gov-ent-001',
      selector: '#breadcrumb',
      position: 'top-right',
      title: '页面布局',
      category: '交互说明',
      categoryColor: 'info',
      description: '政府端企业基本信息用于管理本单位有权限的企业基础信息、经营信息、监管关系、安全码状态与风险等级。支持多维筛选、详情查看、新增企业、编辑企业、停用/逻辑删除、批量导入/导出、行业统计、高级查询。',
      prdRef: '6.2.7 功能概述'
    },
    {
      id: 'gov-ent-002',
      selector: '.stat-cards',
      position: 'top-right',
      title: '统计卡区',
      category: '验收标准',
      categoryColor: 'danger',
      description: '展示辖区企业总数、启用、待审批、停用等指标，仅统计本单位权限范围内的企业。统计卡样式与超管端一致。',
      prdRef: '6.2.7.3 统计卡'
    },
    {
      id: 'gov-ent-003',
      selector: '.filter-card, .filter-bar',
      position: 'top-right',
      title: '筛选区与高级查询',
      category: '交互说明',
      categoryColor: 'info',
      description: '基础筛选按企业名称、信用代码、归属网格、领域小类、状态等；高级查询支持按经营信息、监管关系、安全码色、风险等级等多维度组合查询。',
      prdRef: '6.2.7.3 筛选 / 高级查询'
    },
    {
      id: 'gov-ent-004',
      selector: '#addModal',
      position: 'top-right',
      title: '新增企业弹窗',
      category: '业务规则',
      categoryColor: 'warning',
      description: '政府端新增企业仅录入本单位权限范围内企业。弹窗分区与超管端一致（基本信息/领域与监管/账号信息），但监管单位按本单位职责范围自动计算。',
      prdRef: '6.2.7.3 新增/编辑'
    },
    {
      id: 'gov-ent-005',
      selector: '#auditModal',
      position: 'top-right',
      title: '审批单列表',
      category: '业务规则',
      categoryColor: 'warning',
      description: '政府端处理本单位权限范围内的审批单（注册、企业名称变更、停用）。审批通过/驳回与停用/逻辑删除文案对齐 §6.0 企业基本信息统一规则。',
      prdRef: '6.2.7.3 审核流程 / 6.0 统一规则'
    },
    {
      id: 'gov-ent-006',
      selector: '#archiveModal',
      position: 'top-right',
      title: '企业档案',
      category: '交互说明',
      categoryColor: 'info',
      description: '企业档案聚合展示企业基础信息、经营信息、关联领域小类、监管信息、账号信息、安全码档案、检查/隐患历史记录。政府端仅查看本辖区企业档案。',
      prdRef: '6.2.7.3 企业档案'
    }
  ],

  // ========== 政府端 - 组织架构管理 ==========
  'government/gov-org': [
    {
      id: 'gov-go-001',
      selector: '#breadcrumb',
      position: 'top-right',
      title: '页面布局',
      category: '交互说明',
      categoryColor: 'info',
      description: '政府端组织架构管理仅展示本单位及下级单位/科室，不可跨单位管理。左树右表布局，组织树同源超管端 §6.1.1 但按本单位权限过滤。',
      prdRef: '6.2.8.3 组织架构管理（政府端）'
    },
    {
      id: 'gov-go-002',
      selector: '.stat-cards',
      position: 'top-right',
      title: '统计卡区',
      category: '验收标准',
      categoryColor: 'danger',
      description: '展示本单位下级单位数、科室数、账号数。统计口径仅本单位权限范围内。',
      prdRef: '6.2.8.3 统计卡'
    },
    {
      id: 'gov-go-003',
      selector: '#detailBody',
      position: 'top-right',
      title: '单位/科室详情',
      category: '交互说明',
      categoryColor: 'info',
      description: '详情区按选中节点类型动态切换。政府端可编辑本单位及下级组织信息，但不可修改上级组织。删除前强校验组织下用户账号。',
      prdRef: '6.2.8.3 详情 / 6.2.8.4 业务规则'
    },
    {
      id: 'gov-go-004',
      selector: '#confirmModal',
      position: 'top-right',
      title: '删除二次确认',
      category: '业务规则',
      categoryColor: 'warning',
      description: '删除组织需二次确认，强校验组织下用户账号和业务数据。政府端仅可删除本单位下级空组织。',
      prdRef: '6.2.8.4 业务规则 / 6.0.6 删除规则'
    }
  ],

  // ========== 政府端 - 人员账号管理 ==========
  'government/gov-user': [
    {
      id: 'gov-gu-001',
      selector: '#breadcrumb',
      position: 'top-right',
      title: '页面布局',
      category: '交互说明',
      categoryColor: 'info',
      description: '政府端人员账号管理复用 §6.1.2 交互，4 分布局（组织树+统计卡+筛选+列表）。仅管理本单位及下级组织内的人员账号，支持新增/编辑/删除/详情/重置密码；审批列表 badge 显示待审批数，支持批量导入。',
      prdRef: '6.2.8.4 人员账号管理（政府端）'
    },
    {
      id: 'gov-gu-002',
      selector: '.stat-cards',
      position: 'top-right',
      title: '统计卡区',
      category: '验收标准',
      categoryColor: 'danger',
      description: '展示本单位人员总数、启用、停用、待审批。统计口径仅本单位权限范围内，组织树展示下级单位（含 toggleSubUnit 展开）。',
      prdRef: '6.2.8.4 统计卡'
    },
    {
      id: 'gov-gu-003',
      selector: '#editModal',
      position: 'top-right',
      title: '新增/编辑弹窗',
      category: '业务规则',
      categoryColor: 'warning',
      description: 'BR-GOV-USER-03 saveUser 用 ownOrg.name 兼容下级单位；GOV_ORG 扩展 subUnits（龙华/民治街道办事处含 3 科室），所属单位下拉补下级单位，_updateStats/renderTable 识别 sub-unit id 聚合用户。',
      prdRef: '6.2.8.4 BR-GOV-USER-03'
    },
    {
      id: 'gov-gu-004',
      selector: '#approvalModal',
      position: 'top-right',
      title: '审批列表',
      category: '业务规则',
      categoryColor: 'warning',
      description: '政府端审批列表处理本单位人员账号注册、变更、停用审批单。审批通过后账号生效，驳回需填写原因。',
      prdRef: '6.2.8.4 审核流程'
    },
    {
      id: 'gov-gu-005',
      selector: '#deleteModal',
      position: 'top-right',
      title: '删除二次确认',
      category: '业务规则',
      categoryColor: 'warning',
      description: '删除前强校验用户是否有待办任务（检查记录、隐患复核、审批单等），存在待办时阻断删除并列举待办项。政府端仅可删除本单位及下级组织内的人员账号。',
      prdRef: '6.2.8.4 BR-GOV-USER 删除校验'
    }
  ],

  // ========== 移动端 ==========
  'mobile/login': [
    {
      id: 'm-login-001',
      selector: '.login-tabs',
      position: 'top-right',
      title: '端类型切换',
      category: '交互说明',
      categoryColor: 'info',
      description: '登录页顶部 Tab 切换政府端/企业端。两端数据域完全隔离，切换需退出重登（不在设置页提供快捷切换）。政府端填写手机号+密码+验证码；企业端填写手机号+密码+验证码。',
      prdRef: '6.5.2 登录与注册'
    },
    {
      id: 'm-login-002',
      selector: '.login-card',
      position: 'top-right',
      title: '登录表单',
      category: '业务规则',
      categoryColor: 'warning',
      description: '登录卡片包含：账号/手机号输入框、密码输入框（带眼睛切换）、验证码输入框+图形验证码、登录按钮。登录按钮在三个字段都填写后激活（深蓝）。',
      prdRef: '6.5.2 登录与注册'
    },
    {
      id: 'm-login-003',
      selector: '#view-first-login',
      position: 'top-right',
      title: '首次登录改密',
      category: '业务规则',
      categoryColor: 'warning',
      description: '首次登录强制修改初始密码，需输入原密码+新密码+确认新密码，新密码不少于8位含数字字母组合。改密成功后跳转工作台。',
      prdRef: '6.5.2 BR-MOB-LOGIN-02 首次改密'
    }
  ],

  'mobile/workbench': [
    {
      id: 'm-wb-001',
      selector: '.wb-body',
      position: 'top-right',
      title: '工作台首页',
      category: '交互说明',
      categoryColor: 'info',
      description: '登录后默认首页。顶部显示企业名称+用户角色（主要负责人/安全管理人员/从业人员），下方统计今日待办（待排查/隐患待整改/超期任务）。常用功能入口4个。',
      prdRef: '6.3.2 工作台'
    },
    {
      id: 'm-wb-002',
      selector: '.wb-card',
      position: 'top-right',
      title: '功能卡片',
      category: '业务规则',
      categoryColor: 'warning',
      description: '包含常用功能、安全档案、安全知识库、监测预警等卡片模块。',
      prdRef: '6.3.2 功能入口'
    },
    {
      id: 'm-wb-003',
      selector: '.wb-grid',
      position: 'top-right',
      title: '常用功能',
      category: '业务规则',
      categoryColor: 'warning',
      description: '4个常用入口：码上排查（scan）、隐患排查（my-hazards）、任务管理（task-list）、安全管控对象（control-list）。按角色权限动态显示，从业人员隐藏任务管理。',
      prdRef: '6.3.2 功能入口'
    },
    {
      id: 'm-wb-004',
      selector: '#wbCommonGrid',
      position: 'top-right',
      title: 'Session 驱动工作台差异化（V1.2 新增）',
      category: '业务规则',
      categoryColor: 'warning',
      description: '工作台根据 session 的 portalType 和 mode 动态渲染：常用功能按模式差异化（other 模式显示巡查记录/问题上报/劝导记录），安全档案标题按端类型变化（监管档案/安全档案），other 模式隐藏安全知识库和监测预警。由 MobilePageConfig.getWorkbenchConfig() 提供数据。',
      prdRef: '重构方案 §3.5 other 模式特殊处理'
    }
  ],

  'mobile/scan': [
    {
      id: 'm-scan-001',
      selector: '.scan-frame',
      position: 'top-right',
      title: '扫码识别',
      category: '交互说明',
      categoryColor: 'info',
      description: '调起摄像头扫描安全码（企业码/场所码/危险源码/重点场所码）。识别成功后加载对应检查表，进入码上排查流程。',
      prdRef: '6.3.3 BR-INS-01 扫码触发检查'
    },
    {
      id: 'm-scan-002',
      selector: '.scan-types',
      position: 'top-right',
      title: '码类型识别',
      category: '业务规则',
      categoryColor: 'warning',
      description: '4种码类型：企业码（蓝）、场所码（绿）、危险源码（红）、重点场所码（橙）。扫码后 toast 提示"已识别X码，加载对应检查表"，跳转 check-list 页面。',
      prdRef: '6.3.3 BR-INS-01'
    }
  ],

  'mobile/check-list': [
    {
      id: 'm-cl-001',
      selector: '.cl-info-card',
      position: 'top-right',
      title: '检查信息',
      category: '交互说明',
      categoryColor: 'info',
      description: '显示当前管控对象（安全管控对象名称、位置信息）、检查时间（自动填充当前时间）、检查人。从来源码页面自动带入对象信息。',
      prdRef: '6.3.4 检查信息'
    },
    {
      id: 'm-cl-002',
      selector: '.cl-card',
      position: 'top-right',
      title: '检查表选择',
      category: '业务规则',
      categoryColor: 'warning',
      description: '列出该管控对象适用的检查表。系统推荐项标记"系统推荐"蓝色徽章。状态分待排查（yellow）/已排查（green，左侧绿色竖条）。点击卡片进入 check-execute 执行排查。',
      prdRef: '6.3.4 检查表推荐 BR-INS-02'
    }
  ],

  'mobile/check-execute': [
    {
      id: 'm-ce-001',
      selector: '.ce-header',
      position: 'top-right',
      title: '检查表执行',
      category: '交互说明',
      categoryColor: 'info',
      description: '按检查表逐项排查。每项可选合格/不合格/不适用。不合格项必填隐患描述+照片。所有项完成后提交。',
      prdRef: '6.3.5 检查执行'
    },
    {
      id: 'm-ce-002',
      selector: '.ce-submit',
      position: 'top-right',
      title: '提交检查记录',
      category: '业务规则',
      categoryColor: 'warning',
      description: '提交时校验必填项。存在不合格项自动生成隐患记录，进入隐患整改流程。全部合格则检查记录归档，更新码色计算数据。',
      prdRef: '6.3.5 BR-INS-03 自动转隐患'
    }
  ],

  'mobile/check-detail': [
    {
      id: 'm-cd-001',
      selector: '.cd-card',
      position: 'top-right',
      title: '检查记录详情',
      category: '交互说明',
      categoryColor: 'info',
      description: '查看历史检查记录详情：检查表名称、检查人、检查时间、各检查项结果（合格/不合格/不适用）、附件照片、备注。',
      prdRef: '6.3.6 检查记录详情'
    }
  ],

  'mobile/my-hazards': [
    {
      id: 'm-mh-001',
      selector: '.mh-bar',
      position: 'top-right',
      title: '隐患统计条',
      category: '交互说明',
      categoryColor: 'info',
      description: '顶部统计条显示我排查的隐患分布：待整改（red）、整改中（yellow）、已整改（green）。下方为隐患卡片列表。',
      prdRef: '6.3.7 隐患统计'
    },
    {
      id: 'm-mh-002',
      selector: '.mh-filter-chip',
      position: 'top-right',
      title: '状态筛选',
      category: '业务规则',
      categoryColor: 'warning',
      description: '状态筛选标签：待整改/整改中/已整改。点击切换显示对应状态隐患。待整改为 red（红色），整改中为 orange（橙色），已整改为 green（绿色）。',
      prdRef: '6.3.7 状态术语 BR-HAZ-01'
    },
    {
      id: 'm-mh-003',
      selector: '.mh-card',
      position: 'top-right',
      title: '隐患卡片',
      category: '业务规则',
      categoryColor: 'warning',
      description: '卡片显示隐患类型、安全管控对象、整改状态、整改期限。点击进入隐患详情。状态颜色与统计条一致。',
      prdRef: '6.3.7 隐患列表'
    }
  ],

  'mobile/hazard-detail': [
    {
      id: 'm-hd-001',
      selector: '#hazardInfoCard',
      position: 'top-right',
      title: '隐患基本信息',
      category: '交互说明',
      categoryColor: 'info',
      description: '隐患编号、隐患类型、隐患等级、发现时间、整改期限、整改责任人、隐患描述、隐患图片。PRD §6.5.11。',
      prdRef: '6.5.11 隐患详情与填写整改'
    },
    {
      id: 'm-hd-002',
      selector: '#hazardTimeline',
      position: 'top-right',
      title: '处理时间线',
      category: '业务规则',
      categoryColor: 'warning',
      description: '隐患发现→整改分配→整改中→整改完成→复核确认。已完成=绿点、当前=蓝点、未到=灰点；提交整改后「整改中」转完成、「整改完成」转当前。PRD §6.5.11。',
      prdRef: '6.5.11 隐患详情与填写整改'
    },
    {
      id: 'm-hd-003',
      selector: '#rectifyCard',
      position: 'top-right',
      title: '整改入口（移动端）',
      category: '业务逻辑',
      categoryColor: 'success',
      description: '移动端承接整改操作：整改状态标签 + 「填写整改」按钮。PC 端不提供整改入口。提交成功后状态变待验收，按钮区替换为已提交提示。PRD §6.5.11 / BR-ENT-HF-03。',
      prdRef: '6.5.11 隐患详情与填写整改'
    },
    {
      id: 'm-hd-004',
      selector: '#rectifyDrawer',
      position: 'top-right',
      title: '填写整改抽屉',
      category: '业务逻辑',
      categoryColor: 'success',
      description: '底部抽屉：整改措施、整改结果、整改完成日期（默认当天）必填；整改照片最多 5 张(JPG/PNG/WEBP，单张≤5MB)；备注选填。校验不通过字段红框提示；提交后状态→待验收、清除逾期。PRD §6.5.11 / BR-ENT-HF-03/06。',
      prdRef: '6.5.11 隐患详情与填写整改'
    }
  ],

  'mobile/hazard-stats': [
    {
      id: 'm-hs-001',
      selector: '.hs-card',
      position: 'top-right',
      title: '隐患统计',
      category: '交互说明',
      categoryColor: 'info',
      description: '统计当前用户负责的隐患：总数、待整改（red）、整改中（yellow）、待验收（blue）、已整改（green）。',
      prdRef: '6.3.9 隐患统计'
    },
    {
      id: 'm-hs-002',
      selector: '.hs-filter-bar',
      position: 'top-right',
      title: '隐患筛选',
      category: '业务规则',
      categoryColor: 'warning',
      description: '按状态筛选隐患列表：全部/待整改/整改中/待验收/已整改。',
      prdRef: '6.3.9 BR-HAZ-03 等级配色'
    }
  ],

  'mobile/task-list': [
    {
      id: 'm-tl-001',
      selector: '.tl-stat-row',
      position: 'top-right',
      title: '任务统计',
      category: '交互说明',
      categoryColor: 'info',
      description: '统计卡展示任务总数、待执行、执行中、已完成、已逾期；点击可快速筛选对应状态任务，已逾期统计卡红色高亮。',
      prdRef: '§6.2.4.9 移动端任务列表（执行端）'
    },
    {
      id: 'm-tl-002',
      selector: '.tl-card',
      position: 'top-right',
      title: '任务卡片',
      category: '业务规则',
      categoryColor: 'warning',
      description: '卡片显示任务标题、类型标签（履职任务/隐患整改/专项任务）、来源、管控对象、相对截止时间（今天/N天后/超期N天）、操作按钮；已逾期卡片红底背景强调。',
      prdRef: '§6.2.4.9 移动端任务列表（执行端）'
    }
  ],

  'mobile/enterprise-code': [
    {
      id: 'm-ec-001',
      selector: '.ec-code-card',
      position: 'top-right',
      title: '企业码详情',
      category: '交互说明',
      categoryColor: 'info',
      description: '显示企业基本信息：企业名称、统一社会信用代码、所属领域、审批单位、码色（green/yellow/red）。码色实时反映企业安全状况。',
      prdRef: '6.3.11 企业码'
    },
    {
      id: 'm-ec-002',
      selector: '#panel0',
      position: 'top-right',
      title: '安全管控统计',
      category: '业务规则',
      categoryColor: 'warning',
      description: '企业码下挂载场所码和危险源码。管控对象按码色统计（绿色/黄色/红色），码色按上下级关联计算（异常占比>20%码色变黄）。',
      prdRef: '6.3.11 BR-CODE-01 上下关联'
    },
    {
      id: 'm-ec-003',
      selector: '#homeEntityName',
      position: 'top-right',
      title: 'Session 驱动差异化（V1.2 新增）',
      category: '业务规则',
      categoryColor: 'warning',
      description: '首页根据 MobileSession 的 portalType 和 activeDomainId 动态渲染：政府端显示监管码+监管单位名称，企业端根据 mode（basic/project/special/other）显示企业码/项目码/场所码/管理码+企业名称。背景渐变、码边框颜色、统计数据、快捷入口均按模式差异化。由 js/mobile-page-config.js 提供配置数据。',
      prdRef: '重构方案 §3.3 页面差异化策略'
    }
  ],

  'mobile/place-code': [
    {
      id: 'm-pc-001',
      selector: '.pc-info',
      position: 'top-right',
      title: '场所码详情',
      category: '交互说明',
      categoryColor: 'info',
      description: '显示场所信息：场所名称、所属企业、位置、负责人、码色。顶部显示"上级：企业名称（企业码）"可点击返回上级。',
      prdRef: '6.3.12 场所码'
    },
    {
      id: 'm-pc-002',
      selector: '.pc-hazard-stats',
      position: 'top-right',
      title: '隐患统计',
      category: '业务规则',
      categoryColor: 'warning',
      description: '统计该场所下的隐患：待整改/整改中/已整改。状态术语统一使用"待整改"（非"未整改"）。点击查看隐患列表。',
      prdRef: '6.3.12 BR-HAZ-01 状态术语'
    }
  ],

  'mobile/hazard-code': [
    {
      id: 'm-hc-001',
      selector: '.hc-info',
      position: 'top-right',
      title: '危险源码详情',
      category: '交互说明',
      categoryColor: 'info',
      description: '显示危险源信息：名称、等级（重大/较大/一般）、R值、责任部门、所属场所、码色。顶部"上级：场所名称（场所码）"可点击返回。',
      prdRef: '6.3.13 危险源码'
    },
    {
      id: 'm-hc-002',
      selector: '.hc-meta',
      position: 'top-right',
      title: '危险源元数据',
      category: '业务规则',
      categoryColor: 'warning',
      description: '危险源等级标签：重大（red红色）、较大（orange）、一般（yellow）。R值反映风险分级。状态术语统一使用"待整改"。',
      prdRef: '6.3.13 BR-HAZ 等级配色'
    }
  ],

  'mobile/code-change': [
    {
      id: 'm-cc-001',
      selector: '.chart-section',
      position: 'top-right',
      title: '变码原因分布',
      category: '交互说明',
      categoryColor: 'info',
      description: '环形图展示变码原因占比：履职检查（green 50%）、隐患整改（yellow 30%）、上下关联（red 20%）。中心显示管控对象总数。',
      prdRef: '6.3.14 变码记录'
    },
    {
      id: 'm-cc-002',
      selector: '.m-tabs',
      position: 'top-right',
      title: '变码记录分类',
      category: '业务规则',
      categoryColor: 'warning',
      description: '3个Tab：履职检查、隐患整改、上下关联。每个Tab列出对应原因的变码记录，包含对象名称、责任人、超期情况、整改状态。状态术语"待整改"。',
      prdRef: '6.3.14 变码分类'
    }
  ],

  'mobile/control-list': [
    {
      id: 'm-ctrl-001',
      selector: '.cl-tabs',
      position: 'top-right',
      title: '管控对象树',
      category: '交互说明',
      categoryColor: 'info',
      description: '默认显示"对象"Tab：树形结构展示企业码（ent蓝色）→场所码（place绿色）→危险源码（hazard红色）→重点场所码（keyplace橙色）。点击树节点进入对应码详情。',
      prdRef: '6.3.15 安全管控对象'
    },
    {
      id: 'm-ctrl-002',
      selector: '.cl-sub-tab',
      position: 'top-right',
      title: '人员分类',
      category: '业务规则',
      categoryColor: 'warning',
      description: '"人员"Tab按 PRD 角色分类：主要负责人/安全管理人员/从业人员。每位人员显示姓名+岗位+角色。重点部位标记为"重点场所码"。',
      prdRef: '6.3.15 BR-MOB-CTRL 角色术语'
    },
    {
      id: 'm-ctrl-003',
      selector: '#listRootName',
      position: 'top-right',
      title: 'Session 驱动列表差异化（V1.2 新增）',
      category: '业务规则',
      categoryColor: 'warning',
      description: '列表页根据 session 动态调整：政府端显示全部管控对象（根节点=监管单位名称+监管码），企业端根据 activeDomainId 显示本企业/项目管控对象（根节点=企业名称+企业码/项目码/场所码）。搜索框 placeholder 也按模式变化。',
      prdRef: '重构方案 §3.3 页面差异化策略'
    }
  ],

  'mobile/profile': [
    {
      id: 'm-pf-001',
      selector: '.pf-header',
      position: 'top-right',
      title: '个人信息',
      category: '交互说明',
      categoryColor: 'info',
      description: '显示用户头像、姓名、角色标签（如"安全管理人员 · 创安电子科技"）、所属企业。角色按 PRD 术语：主要负责人/安全管理人员/从业人员。',
      prdRef: '6.3.16 个人中心'
    },
    {
      id: 'm-pf-002',
      selector: '.pf-safety-legend',
      position: 'top-right',
      title: '安全管控图例',
      category: '业务规则',
      categoryColor: 'warning',
      description: '安全管控对象统计图例：绿色/黄色/红色数量展示。',
      prdRef: '6.3.16 BR-HAZ-01 状态术语'
    },
    {
      id: 'm-pf-003',
      selector: '#profileRoleTag',
      position: 'top-right',
      title: 'Session 驱动所属单位（V1.2 新增）',
      category: '业务规则',
      categoryColor: 'warning',
      description: '"我的"页面角色标签根据 session 动态渲染：政府端显示"监管人员 · 区应急管理局"，企业端显示"安全管理人员 · 企业名称"。由 MobilePageConfig.getProfileConfig() 提供数据。',
      prdRef: '重构方案 §3.3 页面差异化策略'
    }
  ],

  'mobile/settings': [
    {
      id: 'm-st-001',
      selector: '.st-version',
      position: 'top-right',
      title: '版本信息',
      category: '交互说明',
      categoryColor: 'info',
      description: '显示当前系统版本："安全码管理平台 V7.0"。版本号与 PRD V7.0 保持一致。',
      prdRef: '6.3.17 版本信息'
    },
    {
      id: 'm-st-002',
      selector: '#accountSwitchItem',
      position: 'top-right',
      title: '账号切换（V1.2 新增）',
      category: '业务规则',
      categoryColor: 'warning',
      description: '企业端用户可绑定多个业务身份（领域小类）。点击后弹出底部弹窗展示身份列表，以领域小类名称为主体（如"商业综合体"），模式类型（企业/项目/其他）作为副标签。basic/project/other 平级互切，special 不在列表中。单身份用户自动隐藏此入口。切换前弹出确认弹窗防误操作。',
      prdRef: '重构方案 §2.4 账号切换机制'
    },
    {
      id: 'm-st-003',
      selector: '.st-list',
      position: 'top-right',
      title: '设置项',
      category: '业务规则',
      categoryColor: 'warning',
      description: '设置项：扫码、码变更记录、密码修改、账号切换、清除缓存、关于我们、退出登录。退出登录清除 session 并跳转登录页。',
      prdRef: '6.3.17 设置项'
    }
  ],

  'mobile/my-inspections': [
    {
      id: 'm-mi-001',
      selector: '.mi-list',
      position: 'top-right',
      title: '我的检查记录',
      category: '交互说明',
      categoryColor: 'info',
      description: '列出当前用户的检查记录：检查表名称、检查对象、检查时间、结果（合格/不合格）。点击查看检查详情。',
      prdRef: '6.3.18 我的检查'
    }
  ],

  'mobile/inspection-stats': [
    {
      id: 'm-is-001',
      selector: '.is-chart-row',
      position: 'top-right',
      title: '检查统计',
      category: '交互说明',
      categoryColor: 'info',
      description: '统计当前用户的检查情况：总检查次数、政府巡查、企业自查。支持按周/月/季度切换。',
      prdRef: '6.3.19 检查统计'
    }
  ],

  'mobile/ai-analysis': [
    {
      id: 'm-ai-001',
      selector: '.ai-card',
      position: 'top-right',
      title: 'AI 智能分析',
      category: '交互说明',
      categoryColor: 'info',
      description: 'AI 分析安全隐患趋势：高发隐患类型、高发场所、整改效率。提供风险预警和建议。基于历史检查+隐患数据建模。',
      prdRef: '6.3.20 AI分析'
    }
  ],

  'mobile/qr-preview': [
    {
      id: 'm-qr-001',
      selector: '.qr-card',
      position: 'top-right',
      title: '二维码预览',
      category: '交互说明',
      categoryColor: 'info',
      description: '预览安全码二维码：码类型（企业码/场所码/危险源码/重点场所码）、码色（green/yellow/red）、对象名称、扫码次数。支持下载/打印。',
      prdRef: '6.3.21 二维码预览'
    }
  ]

};
