/**
 * 通用分页组件
 * 依赖：framework.css 中的 .pagination / .pg / .pg-info / .pg-size / .pg-ellipsis / .pg-jump / .pg-jump-input
 *
 * 用法：
 *   1. HTML 中放置空容器：<div class="pagination" id="paginationBar"></div>
 *   2. 初始化：var pg = new Pagination('paginationBar', { total: 100, onChange: function(page, size) { ... } });
 *   3. 数据变更后更新：pg.setTotal(newTotal);
 */

function Pagination(containerId, options) {
  this.container = document.getElementById(containerId);
  this.page = (options && options.current) || 1;
  this.size = (options && options.size) || 10;
  this.total = (options && options.total) || 0;
  this.onChange = (options && options.onChange) || function() {};
  this.sizeOptions = (options && options.sizeOptions) || [10, 20, 50];
  this._render();
}

Pagination.prototype.setTotal = function(total) {
  this.total = total;
  var maxPage = Math.ceil(total / this.size) || 1;
  if (this.page > maxPage) this.page = maxPage;
  this._render();
};

Pagination.prototype.setPage = function(page) {
  var maxPage = Math.ceil(this.total / this.size) || 1;
  if (page < 1) page = 1;
  if (page > maxPage) page = maxPage;
  this.page = page;
  this._render();
};

Pagination.prototype.getState = function() {
  return { page: this.page, size: this.size, total: this.total };
};

Pagination.prototype._goPage = function(p) {
  var maxPage = Math.ceil(this.total / this.size) || 1;
  if (p < 1 || p > maxPage) return;
  this.page = p;
  this._render();
  this.onChange(this.page, this.size);
};

Pagination.prototype._changeSize = function(val) {
  this.size = parseInt(val) || 10;
  this.page = 1;
  this._render();
  this.onChange(this.page, this.size);
};

Pagination.prototype._render = function() {
  if (!this.container) return;
  var total = this.total;
  var totalPages = Math.ceil(total / this.size) || 1;
  var page = this.page;
  var self = this;
  var html = '';

  // 总数
  html += '<span class="pg-info">共 ' + total + ' 条</span>';

  // 每页条数
  html += '<select class="pg-size">';
  for (var s = 0; s < this.sizeOptions.length; s++) {
    html += '<option value="' + this.sizeOptions[s] + '"' + (this.sizeOptions[s] === this.size ? ' selected' : '') + '>' + this.sizeOptions[s] + ' 条/页</option>';
  }
  html += '</select>';

  // 上一页
  html += '<button class="pg" data-action="prev"' + (page === 1 ? ' disabled' : '') + '>上一页</button>';

  // 页码（智能省略）
  var pages = [];
  if (totalPages <= 7) {
    for (var i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (page > 3) pages.push('...');
    var start = Math.max(2, page - 1);
    var end = Math.min(totalPages - 1, page + 1);
    for (var i = start; i <= end; i++) pages.push(i);
    if (page < totalPages - 2) pages.push('...');
    pages.push(totalPages);
  }
  for (var i = 0; i < pages.length; i++) {
    if (pages[i] === '...') {
      html += '<span class="pg-ellipsis">...</span>';
    } else {
      html += '<button class="pg' + (pages[i] === page ? ' active' : '') + '" data-page="' + pages[i] + '">' + pages[i] + '</button>';
    }
  }

  // 下一页
  html += '<button class="pg" data-action="next"' + (page === totalPages ? ' disabled' : '') + '>下一页</button>';

  // 跳转
  html += '<span class="pg-jump">前往 <input class="pg-jump-input" type="number" min="1" max="' + totalPages + '" value="' + page + '"> 页</span>';

  this.container.innerHTML = html;

  // 绑定事件
  var selectEl = this.container.querySelector('.pg-size');
  if (selectEl) {
    selectEl.addEventListener('change', function() { self._changeSize(this.value); });
  }

  var jumpInput = this.container.querySelector('.pg-jump-input');
  if (jumpInput) {
    jumpInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        var val = parseInt(this.value);
        if (val >= 1 && val <= totalPages) self._goPage(val);
      }
    });
  }

  var btns = this.container.querySelectorAll('.pg[data-page]');
  for (var b = 0; b < btns.length; b++) {
    btns[b].addEventListener('click', function() { self._goPage(parseInt(this.dataset.page)); });
  }

  var prevBtn = this.container.querySelector('.pg[data-action="prev"]');
  if (prevBtn) prevBtn.addEventListener('click', function() { self._goPage(page - 1); });

  var nextBtn = this.container.querySelector('.pg[data-action="next"]');
  if (nextBtn) nextBtn.addEventListener('click', function() { self._goPage(page + 1); });
};
