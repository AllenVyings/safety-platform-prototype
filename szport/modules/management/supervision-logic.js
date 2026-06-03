// supervision-logic.js — 工作督办交互逻辑（七阶段流程 V2.0）
(function() {
  'use strict';

  var SupervisionLogic = {

    init: function() {
      this.bindActions();
    },

    bindActions: function() {
      var self = this;
      document.addEventListener('click', function(e) {
        var btn = e.target.closest('[data-action]');
        if (!btn) return;
        var action = btn.getAttribute('data-action');
        var param = btn.getAttribute('data-param');

        switch (action) {
          case 'switchTab':
            var name = String(param || '').replace(/'/g, '');
            self.switchTab(name, btn);
            break;
          case 'openSupervisionDetail':
            var id = String(param || '').replace(/'/g, '');
            self.openDetail(id);
            break;
          case 'showSupervisionList':
            setPageView('view-list', 'view-detail', 'list');
            break;
          case 'showAddTaskModal':
            self.showModal('modal-add-task');
            break;
          case 'showFeedbackModal':
            self.showModal('modal-feedback');
            break;
          case 'showUrgeModal':
            self.showModal('modal-urge');
            break;
          case 'showApprovalModal':
            self.showModal('modal-approval');
            break;
          case 'showTransferModal':
            self.showModal('modal-transfer');
            break;
          case 'showReviewModal':
            self.showModal('modal-review');
            break;
          case 'showArchiveModal':
            self.showModal('modal-archive');
            break;
          case 'saveTask':
            self.saveTask();
            break;
          case 'saveFeedback':
            self.saveFeedback();
            break;
          case 'saveUrge':
            self.saveUrge();
            break;
          case 'submitForApproval':
            self.submitForApproval(param);
            break;
          case 'approveTask':
            self.approveTask();
            break;
          case 'rejectTask':
            self.rejectTask();
            break;
          case 'acceptTask':
            showToast('已接收任务，进入执行阶段', 'success');
            break;
          case 'saveTransfer':
            self.saveTransfer();
            break;
          case 'confirmTransfer':
            showToast('转派人已确认，等待联络员上报', 'success');
            break;
          case 'confirmReport':
            showToast('联络员已确认上报，等待反馈审核', 'success');
            break;
          case 'approveFeedback':
            self.approveFeedback();
            break;
          case 'rejectFeedback':
            self.rejectFeedback();
            break;
          case 'archiveTask':
            showToast('已归档，流程结束', 'success');
            break;
          case 'filterTasks':
            self.filterTasks();
            break;
          case 'resetTaskFilter':
            self.resetTaskFilter();
            break;
          case 'exportData':
            showToast('导出功能开发中', 'info');
            break;
          case 'hideModal':
            if (param) {
              var mid = String(param).replace(/'/g, '');
              hideModal(mid);
            }
            break;
        }
      });
    },

    switchTab: function(name, clickedTab) {
      document.querySelectorAll('.tab-item').forEach(function(t) { t.classList.remove('active'); });
      document.querySelectorAll('.tab-content').forEach(function(t) { t.classList.remove('active'); });
      if (clickedTab) clickedTab.classList.add('active');
      var tab = document.getElementById('tab-' + name);
      if (tab) tab.classList.add('active');
    },

    openDetail: function(id) {
      var d = SupervisionData.detailData[id];
      if (!d) { showToast('详情数据暂未配置', 'info'); return; }
      document.getElementById('supervision-detail-title').textContent = d.title;
      document.getElementById('supervision-detail-basic').innerHTML = d.basic.map(function(r) {
        return '<div class="detail-row" style="display:flex;justify-content:space-between;padding:6px 0;font-size:var(--font-size-13);border-bottom:1px solid var(--border-light);"><span style="color:var(--text-secondary);">' + r[0] + '</span><span style="color:var(--text-primary);">' + r[1] + '</span></div>';
      }).join('');
      document.getElementById('supervision-detail-desc').textContent = d.desc;
      // 转派记录
      var chainEl = document.getElementById('supervision-detail-transfer');
      if (chainEl) {
        if (d.transferChain && d.transferChain.length > 0) {
          chainEl.innerHTML = d.transferChain.map(function(t) {
            return '<div class="transfer-step"><span class="transfer-from">' + t.from + '</span><span class="transfer-arrow">→</span><span class="transfer-to">' + t.to + '</span><span class="transfer-action">' + t.action + '</span><span class="transfer-time">' + t.time + '</span></div>';
          }).join('');
        } else {
          chainEl.innerHTML = '<div style="color:var(--text-description);font-size:var(--font-size-13);">无转派记录（直接执行）</div>';
        }
      }
      renderApprovalTimeline('supervision-detail-timeline', d.timeline);
      setPageView('view-list', 'view-detail', 'detail');
    },

    submitForApproval: function(id) {
      showConfirm('确认提交审批？提交后将由安全分管领导审批。', function() {
        showToast('已提交审批，等待 P02 审批', 'success');
      });
    },

    approveTask: function() {
      hideModal('modal-approval');
      showToast('审批通过，任务已下达至对象单位', 'success');
    },

    rejectTask: function() {
      var reason = document.getElementById('approval-reject-reason');
      if (!reason || !reason.value.trim()) { showToast('请填写驳回原因', 'error'); return; }
      hideModal('modal-approval');
      showToast('已驳回，任务退回草稿', 'success');
    },

    saveTransfer: function() {
      var target = document.getElementById('transfer-target');
      if (!target || !target.value) { showToast('请选择转派对象', 'error'); return; }
      hideModal('modal-transfer');
      showToast('已转派至 ' + target.value, 'success');
    },

    approveFeedback: function() {
      hideModal('modal-review');
      showToast('反馈审核通过，任务进入待归档', 'success');
    },

    rejectFeedback: function() {
      var reason = document.getElementById('review-reject-reason');
      if (!reason || !reason.value.trim()) { showToast('请填写驳回原因', 'error'); return; }
      hideModal('modal-review');
      showToast('反馈审核驳回，任务退回执行中', 'success');
    },

    saveTask: function() {
      var topicEl = document.getElementById('sup-topic');
      if (!topicEl || !topicEl.value.trim()) { showToast('请输入督办主题', 'error'); return; }
      var typeEl = document.getElementById('sup-type');
      if (!typeEl || !typeEl.value) { showToast('请选择任务类型', 'error'); return; }
      hideModal('modal-add-task');
      showToast('督办任务已保存为草稿', 'success');
    },

    saveFeedback: function() {
      var descEl = document.getElementById('fb-desc');
      if (!descEl || !descEl.value.trim()) { showToast('请输入执行情况说明', 'error'); return; }
      hideModal('modal-feedback');
      showToast('反馈已提交', 'success');
    },

    saveUrge: function() {
      hideModal('modal-urge');
      showToast('催办通知已发送', 'success');
    },

    showModal: function(id) {
      var existing = document.getElementById(id);
      if (existing) existing.remove();
      var div = document.createElement('div');
      var html = '';

      if (id === 'modal-add-task') {
        html = '<div class="modal-overlay" id="modal-add-task">' +
          '<div class="modal" style="width:640px;background:var(--bg-card);border-radius:var(--radius-lg);box-shadow:var(--shadow-lg);">' +
            '<div class="modal-header"><h3>新增督办任务</h3>' +
              '<button class="modal-close" data-action="hideModal" data-param="\'modal-add-task\'">' +
                '<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 1L13 13M13 1L1 13" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg></button></div>' +
            '<div class="modal-body">' +
              '<div class="form-group"><div class="form-label">任务类型 <span style="color:var(--danger)">*</span></div>' +
                '<div class="form-content"><select class="form-input form-select" id="sup-type" style="width:100%">' +
                  '<option value="">请选择</option>' + SupervisionData.taskTypes.filter(function(t) { return t.enabled; }).map(function(t) { return '<option value="' + t.code + '">' + t.name + '</option>'; }).join('') + '</select></div></div>' +
              '<div class="form-group"><div class="form-label">督办主题 <span style="color:var(--danger)">*</span></div>' +
                '<div class="form-content"><input class="form-input" id="sup-topic" placeholder="请输入督办主题" style="width:100%"></div></div>' +
              '<div style="display:flex;gap:12px;">' +
                '<div class="form-group" style="flex:1;"><div class="form-label">督办对象 <span style="color:var(--danger)">*</span></div>' +
                  '<div class="form-content"><select class="form-input form-select" id="sup-target" style="width:100%">' +
                    '<option value="">请选择</option>' + SupervisionData.units.map(function(u) { return '<option>' + u + '</option>'; }).join('') + '</select></div></div>' +
                '<div class="form-group" style="flex:1;"><div class="form-label">来源</div>' +
                  '<div class="form-content"><select class="form-input form-select" id="sup-source" style="width:100%">' +
                    '<option value="">请选择</option>' + SupervisionData.sources.map(function(s) { return '<option>' + s + '</option>'; }).join('') + '</select></div></div></div>' +
              '<div style="display:flex;gap:12px;">' +
                '<div class="form-group" style="flex:1;"><div class="form-label">优先级 <span style="color:var(--danger)">*</span></div>' +
                  '<div class="form-content"><select class="form-input form-select" id="sup-priority" style="width:100%">' +
                    '<option value="">请选择</option><option>紧急</option><option>重要</option><option>一般</option></select></div></div>' +
                '<div class="form-group" style="flex:1;"><div class="form-label">截止日期 <span style="color:var(--danger)">*</span></div>' +
                  '<div class="form-content"><input class="form-input" id="sup-deadline" type="date" style="width:100%"></div></div></div>' +
              '<div class="form-group"><div class="form-label">督办内容 <span style="color:var(--danger)">*</span></div>' +
                '<div class="form-content"><textarea class="form-input" id="sup-content" rows="4" placeholder="请输入督办内容..." style="width:100%;resize:vertical"></textarea></div></div>' +
              '<div class="form-group"><div class="form-label">附件</div>' +
                '<div class="form-content"><div class="upload-area">点击或拖拽上传附件（支持PDF/Word/图片）</div></div></div>' +
              '<div style="padding:8px 12px;background:var(--tag-warning-bg);border:1px solid var(--tag-warning-border);border-radius:var(--radius-sm);font-size:var(--font-size-12);color:var(--tag-warning-color);">' +
                '&#9888; 保存为草稿后需提交审批，P02 审批通过后任务方可下达。到期/逾期规则见 §3.11.4.9</div>' +
            '</div>' +
            '<div class="modal-footer">' +
              '<button class="btn btn-default" data-action="hideModal" data-param="\'modal-add-task\'">取消</button>' +
              '<button class="btn btn-default" data-action="saveTask">保存草稿</button></div>' +
          '</div></div>';

      } else if (id === 'modal-approval') {
        html = '<div class="modal-overlay" id="modal-approval">' +
          '<div class="modal" style="width:560px;background:var(--bg-card);border-radius:var(--radius-lg);box-shadow:var(--shadow-lg);">' +
            '<div class="modal-header"><h3>任务审批</h3>' +
              '<button class="modal-close" data-action="hideModal" data-param="\'modal-approval\'">' +
                '<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 1L13 13M13 1L1 13" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg></button></div>' +
            '<div class="modal-body">' +
              '<div class="form-group"><div class="form-label">审批意见</div>' +
                '<div class="form-content"><textarea class="form-input" rows="3" placeholder="请输入审批意见（选填）..." style="width:100%;resize:vertical"></textarea></div></div>' +
              '<div class="form-group"><div class="form-label">驳回原因 <span style="color:var(--danger)">*</span><span style="color:var(--text-description);font-weight:normal;">（驳回时必填）</span></div>' +
                '<div class="form-content"><textarea class="form-input" id="approval-reject-reason" rows="2" placeholder="驳回时请填写原因..." style="width:100%;resize:vertical"></textarea></div></div>' +
            '</div>' +
            '<div class="modal-footer">' +
              '<button class="btn btn-default" data-action="hideModal" data-param="\'modal-approval\'">取消</button>' +
              '<button class="btn btn-danger" data-action="rejectTask">驳回</button>' +
              '<button class="btn btn-primary" data-action="approveTask">审批通过</button></div>' +
          '</div></div>';

      } else if (id === 'modal-transfer') {
        html = '<div class="modal-overlay" id="modal-transfer">' +
          '<div class="modal" style="width:520px;background:var(--bg-card);border-radius:var(--radius-lg);box-shadow:var(--shadow-lg);">' +
            '<div class="modal-header"><h3>任务转派</h3>' +
              '<button class="modal-close" data-action="hideModal" data-param="\'modal-transfer\'">' +
                '<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 1L13 13M13 1L1 13" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg></button></div>' +
            '<div class="modal-body">' +
              '<div class="form-group"><div class="form-label">转派对象 <span style="color:var(--danger)">*</span></div>' +
                '<div class="form-content"><select class="form-input form-select" id="transfer-target" style="width:100%">' +
                  '<option value="">请选择转派对象</option>' +
                  '<optgroup label="部门负责人"><option>王伟（安全部）</option><option>刘洋（运营部）</option></optgroup>' +
                  '<optgroup label="项目负责人"><option>赵磊（港区改造项目）</option><option>孙磊（仓储项目）</option></optgroup>' +
                  '<optgroup label="员工"><option>何勇（安全员）</option><option>周涛（检查员）</option></optgroup>' +
                '</select></div></div>' +
              '<div class="form-group"><div class="form-label">转派说明</div>' +
                '<div class="form-content"><textarea class="form-input" rows="3" placeholder="请输入转派说明（选填）..." style="width:100%;resize:vertical"></textarea></div></div>' +
              '<div style="padding:8px 12px;background:var(--tag-info-bg);border:1px solid var(--tag-info-border);border-radius:var(--radius-sm);font-size:var(--font-size-12);color:var(--tag-info-color);">' +
                '&#128279; 转派后，执行人反馈需经转派人确认，再由联络员确认上报</div>' +
            '</div>' +
            '<div class="modal-footer">' +
              '<button class="btn btn-default" data-action="hideModal" data-param="\'modal-transfer\'">取消</button>' +
              '<button class="btn btn-primary" data-action="saveTransfer">确认转派</button></div>' +
          '</div></div>';

      } else if (id === 'modal-feedback') {
        html = '<div class="modal-overlay" id="modal-feedback">' +
          '<div class="modal" style="width:600px;background:var(--bg-card);border-radius:var(--radius-lg);box-shadow:var(--shadow-lg);">' +
            '<div class="modal-header"><h3>提交执行反馈</h3>' +
              '<button class="modal-close" data-action="hideModal" data-param="\'modal-feedback\'">' +
                '<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 1L13 13M13 1L1 13" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg></button></div>' +
            '<div class="modal-body">' +
              '<div class="form-group"><div class="form-label">执行情况说明 <span style="color:var(--danger)">*</span></div>' +
                '<div class="form-content"><textarea class="form-input" id="fb-desc" rows="5" placeholder="请详细描述执行情况..." style="width:100%;resize:vertical"></textarea></div></div>' +
              '<div class="form-group"><div class="form-label">佐证材料</div>' +
                '<div class="form-content"><div class="upload-area">点击或拖拽上传佐证材料（图片/文档）<div style="font-size:var(--font-size-11);margin-top:4px;">支持 JPG、PNG、PDF 格式</div></div></div></div>' +
              '<div style="padding:8px 12px;background:var(--tag-info-bg);border:1px solid var(--tag-info-border);border-radius:var(--radius-sm);font-size:var(--font-size-12);color:var(--tag-info-color);">' +
                '&#128279; 反馈提交后：经转派→转派人确认→联络员上报→P02审核；未转派→联络员确认上报→P02审核</div>' +
            '</div>' +
            '<div class="modal-footer">' +
              '<button class="btn btn-default" data-action="hideModal" data-param="\'modal-feedback\'">取消</button>' +
              '<button class="btn btn-primary" data-action="saveFeedback">提交反馈</button></div>' +
          '</div></div>';

      } else if (id === 'modal-review') {
        html = '<div class="modal-overlay" id="modal-review">' +
          '<div class="modal" style="width:560px;background:var(--bg-card);border-radius:var(--radius-lg);box-shadow:var(--shadow-lg);">' +
            '<div class="modal-header"><h3>反馈审核</h3>' +
              '<button class="modal-close" data-action="hideModal" data-param="\'modal-review\'">' +
                '<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 1L13 13M13 1L1 13" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg></button></div>' +
            '<div class="modal-body">' +
              '<div class="form-group"><div class="form-label">审核意见</div>' +
                '<div class="form-content"><textarea class="form-input" rows="3" placeholder="请输入审核意见（选填）..." style="width:100%;resize:vertical"></textarea></div></div>' +
              '<div class="form-group"><div class="form-label">驳回原因 <span style="color:var(--danger)">*</span><span style="color:var(--text-description);font-weight:normal;">（驳回时必填）</span></div>' +
                '<div class="form-content"><textarea class="form-input" id="review-reject-reason" rows="2" placeholder="驳回时请填写原因，执行人需重新提交反馈..." style="width:100%;resize:vertical"></textarea></div></div>' +
            '</div>' +
            '<div class="modal-footer">' +
              '<button class="btn btn-default" data-action="hideModal" data-param="\'modal-review\'">取消</button>' +
              '<button class="btn btn-danger" data-action="rejectFeedback">驳回</button>' +
              '<button class="btn btn-primary" data-action="approveFeedback">审核通过</button></div>' +
          '</div></div>';

      } else if (id === 'modal-archive') {
        html = '<div class="modal-overlay" id="modal-archive">' +
          '<div class="modal" style="width:440px;background:var(--bg-card);border-radius:var(--radius-lg);box-shadow:var(--shadow-lg);">' +
            '<div class="modal-header"><h3>归档确认</h3>' +
              '<button class="modal-close" data-action="hideModal" data-param="\'modal-archive\'">' +
                '<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 1L13 13M13 1L1 13" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg></button></div>' +
            '<div class="modal-body">' +
              '<div style="font-size:var(--font-size-14);color:var(--text-primary);margin-bottom:12px;">确认将该督办任务归档？归档后流程结束，数据纳入统计报表。</div>' +
              '<div style="padding:8px 12px;background:var(--tag-info-bg);border:1px solid var(--tag-info-border);border-radius:var(--radius-sm);font-size:var(--font-size-12);color:var(--tag-info-color);">' +
                '&#128279; 归档需发起方与执行方双方确认完成</div>' +
            '</div>' +
            '<div class="modal-footer">' +
              '<button class="btn btn-default" data-action="hideModal" data-param="\'modal-archive\'">取消</button>' +
              '<button class="btn btn-primary" data-action="archiveTask">确认归档</button></div>' +
          '</div></div>';

      } else if (id === 'modal-urge') {
        html = '<div class="modal-overlay" id="modal-urge">' +
          '<div class="modal" style="width:520px;background:var(--bg-card);border-radius:var(--radius-lg);box-shadow:var(--shadow-lg);">' +
            '<div class="modal-header"><h3>催办</h3>' +
              '<button class="modal-close" data-action="hideModal" data-param="\'modal-urge\'">' +
                '<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 1L13 13M13 1L1 13" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg></button></div>' +
            '<div class="modal-body">' +
              '<div style="padding:8px 12px;background:var(--tag-warning-bg);border:1px solid var(--tag-warning-border);border-radius:var(--radius-sm);font-size:var(--font-size-12);color:var(--tag-warning-color);margin-bottom:16px;">&#9888; 催办将同时通过所选方式通知责任人</div>' +
              '<div class="form-group"><div class="form-label">催办方式 <span style="color:var(--danger)">*</span></div>' +
                '<div class="form-content" style="display:flex;gap:16px;margin-top:6px;">' +
                  '<label style="display:flex;align-items:center;gap:6px;font-size:var(--font-size-13);cursor:pointer;"><input type="radio" name="urgeMethod" value="sms" checked> 短信</label>' +
                  '<label style="display:flex;align-items:center;gap:6px;font-size:var(--font-size-13);cursor:pointer;"><input type="radio" name="urgeMethod" value="wechat"> 企业微信</label>' +
                  '<label style="display:flex;align-items:center;gap:6px;font-size:var(--font-size-13);cursor:pointer;"><input type="radio" name="urgeMethod" value="all"> 全部</label></div></div>' +
              '<div class="form-group"><div class="form-label">催办说明</div>' +
                '<div class="form-content"><textarea class="form-input" id="urge-note" rows="4" placeholder="请输入催办说明（选填，不填则发送默认催办提醒）..." style="width:100%;resize:vertical"></textarea></div></div>' +
              '<div style="padding:8px 12px;background:var(--tag-info-bg);border:1px solid var(--tag-info-border);border-radius:var(--radius-sm);font-size:var(--font-size-12);color:var(--tag-info-color);">' +
                '&#128279; 系统已自动在逾期1天时发送催办，此次为手动追加催办</div>' +
            '</div>' +
            '<div class="modal-footer">' +
              '<button class="btn btn-default" data-action="hideModal" data-param="\'modal-urge\'">取消</button>' +
              '<button class="btn btn-primary" data-action="saveUrge">确认催办</button></div>' +
          '</div></div>';
      }

      if (!html) return;
      div.innerHTML = html;
      document.body.appendChild(div.firstElementChild);
      showModal(id);
    },

    filterTasks: function() {
      var container = document.getElementById('tab-tasks');
      if (!container) return;
      var inputs = container.querySelectorAll('.filter-field .form-input');
      var rows = container.querySelectorAll('.data-table tbody tr');
      rows.forEach(function(tr) {
        var show = true;
        inputs.forEach(function(inp) {
          if (!inp.value || inp.value === '全部') return;
          var found = false;
          tr.querySelectorAll('td').forEach(function(td) {
            if (td.textContent.indexOf(inp.value) !== -1) found = true;
          });
          if (!found) show = false;
        });
        tr.style.display = show ? '' : 'none';
      });
      showToast('筛选完成', 'success');
    },

    resetTaskFilter: function() {
      var container = document.getElementById('tab-tasks');
      if (!container) return;
      var inputs = container.querySelectorAll('.filter-field .form-input');
      inputs.forEach(function(el) {
        if (el.tagName === 'SELECT') el.selectedIndex = 0;
        else el.value = '';
      });
      var rows = container.querySelectorAll('.data-table tbody tr');
      rows.forEach(function(tr) { tr.style.display = ''; });
      showToast('筛选已重置', 'success');
    }
  };

  window.SupervisionLogic = SupervisionLogic;

  document.addEventListener('DOMContentLoaded', function() {
    SupervisionLogic.init();
  });
})();
